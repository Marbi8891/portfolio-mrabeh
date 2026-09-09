# ADR-008: Imports Processed Asynchronously, Never Inline in the HTTP Request

## Context

A single import can contain up to 100,000 findings (Section 17, 83). Parsing, normalizing, deduplicating, and enriching that volume of data cannot happen within a synchronous HTTP request without risking timeouts, blocking API capacity, and giving no progress visibility.

## Options

1. **Synchronous processing** — the upload endpoint parses and persists everything before responding.
2. **Asynchronous processing** — the endpoint stores the file and enqueues a job, responding immediately; a worker does the actual work.

## Decision

Option 2. `POST /api/v1/imports` returns `202 Accepted` with an `import_id`; all parsing/normalization/deduplication/enrichment happens in a Dramatiq worker job (`docs/JOBS_AND_IMPORTS.md` §3, per ADR-003).

## Reason

Section 34 explicitly prohibits processing large imports inside the request. Synchronous processing (option 1) would tie up an API worker/connection for the duration of parsing a potentially huge file, directly threatening the interactive-endpoint performance budgets (`docs/SCALABILITY.md` §4) for *every other* concurrent user, not just the one uploading. Async processing decouples import throughput from API responsiveness entirely — the two scale independently (worker count vs. API instance count), which is central to the "scale by adding compute" principle (`docs/SCALABILITY.md` §2).

## Idempotency requirement

Because jobs can be retried (worker crash, transient DB error — `docs/TEST_STRATEGY.md` §5), the import job must be safely re-runnable without duplicating findings. This is achieved via content-hash-based import identification and fingerprint-based upsert on findings (`docs/JOBS_AND_IMPORTS.md` §2, §5) — a direct consequence of choosing async processing, not an independent design choice.

## Tradeoffs

- The client doesn't get an immediate "success/failure" answer — it must poll or subscribe for `ImportJob` status. Accepted, and reflected directly in the UX partial-state design (`docs/UX_SPEC.md` §8).
- Requires building idempotent parsing/persistence logic, which is more work than a naive synchronous implementation. Accepted — this is required for correctness under retry regardless of sync/async, since network/client-side retries are possible even with synchronous processing.

## What would make us reconsider

No scenario anticipated — this is a hard scale requirement, not a preference.
