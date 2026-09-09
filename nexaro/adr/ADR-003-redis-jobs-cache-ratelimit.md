# ADR-003: Redis for Jobs, Cache, and Rate Limiting; Dramatiq as the Worker Framework

## Context

NEXARO needs: an async job queue for imports/enrichment/reports (Section 34), a cache for hot ARGOS intelligence lookups, and distributed rate limiting across multiple API instances. It must not rely on in-process memory for any of this (Section 23).

## Options for the queue/cache substrate

1. **Redis** for jobs + cache + rate limiting.
2. **Kafka** for jobs (as a durable log), separate cache layer.
3. **Database-backed queue** (Postgres `SKIP LOCKED` job table), separate cache layer.

## Decision

Redis (option 1), serving three distinct roles — job broker, cache, rate-limit counters — as one piece of infrastructure.

## Reason

Kafka (option 2) is explicitly rejected (Section 35) — there is no streaming/replay requirement in this system, only task dispatch; Kafka would add an entire operational discipline (partitions, consumer groups, broker cluster) for a need Redis already satisfies more simply. A Postgres-backed queue (option 3) avoids adding infrastructure but couples job throughput to the primary database's write capacity and doesn't provide the sub-millisecond cache/rate-limit lookups Redis gives for free — and NEXARO already needs a cache and rate-limit store regardless of the queue choice, so Redis ends up necessary either way. Consolidating all three roles onto Redis is one piece of infrastructure to run and monitor instead of two.

## Options for the worker framework

| Option | Retry | Scheduling | Visibility | Operational cost |
|---|---|---|---|---|
| Celery | Mature | Mature (beat) | Mature (Flower) | High — separate beat process, larger config surface |
| RQ | Basic | Needs `rq-scheduler` add-on | Good | Low |
| **Dramatiq** | **Built-in, with backoff** | Simple, no separate beat process | Good | **Low** |

## Decision (worker framework)

**Dramatiq.**

## Reason

Satisfies retry, scheduled jobs, visibility, and failure handling (Section 35's explicit checklist) with the fewest moving parts. Celery is the most feature-complete but its operational surface (separate beat process, broker/backend config, historical fragility at small scale) is disproportionate to NEXARO's needs. RQ is simpler but its retry/backoff story requires more manual code, and NEXARO leans on retries heavily (external API calls in ARGOS enrichment, Section 66). Dramatiq's built-in retry middleware directly serves the idempotency and bounded-retry requirements in `docs/JOBS_AND_IMPORTS.md`.

## Tradeoffs

- Redis carrying three roles means a Redis outage affects jobs, cache, and rate limiting simultaneously — mitigated by designing each role's failure mode explicitly (`docs/TEST_STRATEGY.md` §5: job enqueue fails loudly, rate limiting fails closed, cache miss falls through to Postgres).
- Dramatiq has a smaller ecosystem/community than Celery — accepted; the feature set actually needed is fully covered.

## What would make us reconsider

A proven need for durable event replay (not just task dispatch) would revisit Kafka; a proven need for Celery-specific tooling (e.g. complex workflow chaining Dramatiq can't express cleanly) would revisit the worker framework choice.
