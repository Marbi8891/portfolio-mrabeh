# ADR-010: URL Path API Versioning from V1

## Context

NEXARO's REST API is intended to be a first-class product surface, not an afterthought (Section 96) — the platform may eventually be offered as ARGOS API / NEXARO Risk API / NEXARO Prioritization API. It needs a versioning strategy that lets the contract evolve without breaking existing integrations.

## Options

1. **URL path versioning** — `/api/v1/`, `/api/v2/` served side by side.
2. **Header-based versioning** — a single URL, version selected via an `Accept`/custom header.
3. **No explicit versioning** — evolve the API in place, relying on additive-only changes.

## Decision

Option 1: every route under `/api/v1/` from the start (Section 48).

## Reason

Path versioning is the most operationally simple to reason about, log, route, and document — a `NEEDS_HUMAN` reading a request log or an API doc immediately sees which contract version is in play, and the reverse proxy/API framework can route `/v1` and `/v2` to different handlers trivially if needed. Header-based versioning (option 2) is more "correct" in a REST-purist sense but adds friction for API consumers (small teams, consultants — `docs/PRODUCT_SPEC.md` personas) who are used to path-based versioning from most APIs they already integrate with. "No explicit versioning" (option 3) is rejected outright — it works only under a discipline of strictly additive changes forever, which is fragile for a product still actively shaping its domain model (Section 27) in the first year.

Schemas are kept separate from database and domain models (`docs/API_SPEC.md` §3) specifically so a `v1` contract can be held stable even as internal models evolve — versioning the URL is the outer layer of a contract-stability strategy that starts with that separation.

## Tradeoffs

- Running two API versions side by side eventually means maintaining two schema surfaces temporarily during a migration — accepted as the standard cost of any versioning strategy; deferred until a `v2` is actually needed.

## What would make us reconsider

No scenario anticipated for V1 — this is a low-risk, conventional choice matching Section 48's explicit direction.
