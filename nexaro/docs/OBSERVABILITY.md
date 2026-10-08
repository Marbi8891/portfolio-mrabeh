# NEXARO — Observability

## 1. From V1, not bolted on later (Section 75)

```
structured logs (JSON)
request_id / job_id correlation
organization_id on log lines where applicable
error tracking (e.g. Sentry-compatible)
metrics
```

No sensitive information in logs — see [docs/SECURITY_MODEL.md](SECURITY_MODEL.md#10-logging-hygiene) for the exact exclusion list (passwords, secrets, tokens, raw file contents).

## 2. Metrics (Section 76)

| Category | Metrics |
|---|---|
| API | request count, error rate, p50/p95/p99 latency (per route) |
| Database | connection pool usage, slow query count/log |
| Jobs | queue depth, job duration, job failure count (per job type: import/enrichment/report) |
| ARGOS | cache hit rate (critical — validates the "enrich once per CVE" design in [docs/JOBS_AND_IMPORTS.md](JOBS_AND_IMPORTS.md#6-argos-enrichment-at-scale)) |
| Throughput | imports processed, findings processed |
| Infrastructure | CPU, RAM, disk (per API/worker/DB/Redis component) |

These are the inputs to the capacity-review discipline in [docs/SCALABILITY.md](SCALABILITY.md#7-capacity-review-discipline) — "scalable" is a claim backed by these numbers, not an assertion.

## 3. Health endpoints (Section 77)

```
GET /live      — process is alive (no dependency checks; used for restart decisions)
GET /ready       — dependencies (DB, Redis) are reachable and ready to serve traffic
```

Deliberately distinct: a process can be alive but not ready (e.g. DB briefly unreachable) — `/live` failing should trigger a restart, `/ready` failing should pull the instance out of the load balancer rotation without restarting it.

## 4. Correlation

Every log line and error report carries `request_id` (HTTP) or `job_id` (async), and `organization_id` where the context has one. The API error model ([docs/API_SPEC.md](API_SPEC.md#5-error-model)) returns `request_id` to the client, so a support conversation ("I got an error") can be traced directly to the matching server-side log entry.

## 5. Backups (Section 78)

```
Automated PostgreSQL backups (managed provider's continuous/point-in-time backup, or scheduled dumps if self-managed)
Object storage durability (provider-native — S3/R2/MinIO all provide this)
Documented restore procedure
```

**A backup that has never been restored doesn't count.** A periodic restore test (`ASSUMPTION`: quarterly, onto a scratch environment, verifying the app boots against the restored data) is part of the operational routine, not a one-time setup step. `NEEDS_HUMAN`: exact cadence and who owns running it, once there's an operations calendar to attach it to.

## 6. What's explicitly not logged

Passwords, password hashes, API key secrets (only prefixes), session tokens, full uploaded file contents, and any field flagged as sensitive in [docs/DATA_MODEL.md](DATA_MODEL.md). Log scrubbing is enforced at the logging middleware level, not left to call-site discipline alone.
