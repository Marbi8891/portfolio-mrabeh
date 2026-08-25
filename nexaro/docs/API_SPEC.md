# NEXARO — REST API Design

## 1. Versioning

All routes under `/api/v1/`. A breaking change ships as `/api/v2/` alongside `/api/v1/`, not an in-place break. See [ADR-010](../adr/ADR-010-api-versioning.md).

## 2. Core endpoints (V1)

```
POST   /api/v1/imports
GET    /api/v1/imports/{id}

GET    /api/v1/assets
POST   /api/v1/assets
GET    /api/v1/assets/{id}

GET    /api/v1/findings
GET    /api/v1/findings/{id}
PATCH  /api/v1/findings/{id}            # status transitions

GET    /api/v1/vulnerabilities/{cve}

POST   /api/v1/risk/prioritize          # on-demand decision recompute for a finding

POST   /api/v1/remediations
GET    /api/v1/remediations/{id}
PATCH  /api/v1/remediations/{id}

POST   /api/v1/verifications

GET    /api/v1/reports
POST   /api/v1/reports

GET    /api/v1/audit-events
```

Every route (except health checks) requires authentication and resolves to exactly one `organization_id`, enforced at the query layer (Section 25 — see [docs/MULTITENANCY.md](MULTITENANCY.md)).

## 3. Contract separation (Section 49)

Three distinct models, never conflated:

```
Database model (SQLAlchemy)   — internal, never serialized directly
Domain model                    — module-internal business objects
API schema (Pydantic)             — what actually crosses the wire, versioned with the route
```

A `Finding` API schema, for example, is a deliberate, versioned projection — it does not mirror every database column, and adding a DB column never silently changes the API response.

## 4. Pagination

Cursor-based on all collections (Section 44; keys defined in [docs/DATA_MODEL.md](DATA_MODEL.md#4-pagination)):

```
GET /api/v1/findings?limit=50&cursor=<opaque>

{
  "data": [ ... up to 50 items ... ],
  "next_cursor": "<opaque-or-null>"
}
```

`limit` is capped server-side (`ASSUMPTION`: max 200) regardless of what's requested. No endpoint returns an unbounded array.

## 5. Error model

Consistent structured errors:

```json
{
  "error": {
    "code": "FINDING_NOT_FOUND",
    "message": "Finding not found.",
    "request_id": "req_01H..."
  }
}
```

`request_id` matches the structured log correlation id ([docs/OBSERVABILITY.md](OBSERVABILITY.md)) so a user-reported error can be traced directly to server logs. Tenant-isolation failures return `404`, not `403` — presence/absence of a cross-tenant resource is not distinguishable to the caller (Section 25).

## 6. Idempotency

`POST /api/v1/imports` and other creating endpoints accept an optional `Idempotency-Key` header; a repeated request with the same key and org returns the original result rather than creating a duplicate. This is separate from, and in addition to, the job-level idempotency in [docs/JOBS_AND_IMPORTS.md](JOBS_AND_IMPORTS.md#2-idempotency) — this one protects against client-side retries of the HTTP call itself (e.g. a timed-out upload retried by the client).

## 7. API keys (Section 50)

```
nexaro_test_...
nexaro_live_...
```

Stored as `prefix` (shown in UI for identification) + `secret_hash` (Argon2id or equivalent, never reversible) + `organization_id` + `created_at` + `last_used_at` + `revoked_at`. The full secret is shown exactly once, at creation, and never retrievable again. Revocation is immediate (checked on every request, not cached beyond the rate-limit TTL).

## 8. Rate limiting vs. billable usage (Section 51)

Two distinct, independently-tracked concepts:

```
request rate      — e.g. 100 requests/minute per API key, enforced via Redis (sliding window)
billable usage       — e.g. ARGOS enrichment operations, tracked via UsageEvent
```

`100 requests/minute` does **not** imply `100 billable enrichments` — most reads are cache hits and cost nothing billable; the two counters are separate from day one so metering can be introduced later without an API contract change.

## 9. Organization limits

Per-org limits (concurrent imports, upload size, findings per import, report jobs, API rate) are enforced at the API/job layer as described in [docs/JOBS_AND_IMPORTS.md](JOBS_AND_IMPORTS.md#9-organization-limits), returning `429` with a structured error when exceeded.

## 10. Performance budgets

See [docs/SCALABILITY.md](SCALABILITY.md#performance-budgets) for the authoritative table; summarized here for the endpoints above:

| Endpoint | p95 target |
|---|---|
| `GET /findings` (50 rows) | < 300–500 ms |
| `GET /findings/{id}` | < 500 ms |
| `POST /imports` | < 500 ms (before async processing starts) |
| Dashboard/summary endpoints | < 1 s |
