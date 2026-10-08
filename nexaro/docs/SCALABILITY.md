# NEXARO — Scalability & Capacity Strategy

## 1. Capacity targets (Section 17 — engineering targets, not commercial claims until validated per §7 below)

```
Registered users:            1,000+
Organizations:                250+
Concurrent interactive users:  200
Concurrent API requests:        100+
Assets:                          1,000,000
Active findings:                   5,000,000
Unique vulnerability records:        250,000+
Single import:                         100,000 findings
Concurrent imports:                      20 platform-wide
```

## 2. Scaling principle (Section 18)

**NEXARO scales by adding compute, not by rewriting application logic.** Going from 10 → 100 → 1,000 users requires: additional API instances, additional workers, larger DB/Redis resources. It does not require a backend rewrite. This is a direct consequence of:
- A **stateless API** (Section 23) — any instance can serve any request; horizontal scaling is just "run more of them" behind the load balancer.
- **Async workers** decoupled from the request path via Redis-backed jobs — worker count scales independently of API instance count, matched to job volume (imports, enrichment, reports) rather than user count.
- **PostgreSQL as the only source of truth** — one place to scale vertically (bigger managed instance) and optimize (indexes, query budget) rather than a distributed-state problem.

## 3. No overprovisioning (Section 19)

Design for 1,000. Pay for 10 initially.

```
Day 1                              At scale (same code)
──────────────────────────         ──────────────────────────
API        x1                      Load Balancer
Worker     x1                      API        x3-5
PostgreSQL small                   Worker     xN
Redis small                        Managed PostgreSQL
Object Storage                     Managed Redis
                                    Object Storage
```

See the deployment diagrams in [docs/ARCHITECTURE.md](ARCHITECTURE.md#5-deployment-architecture).

## 4. Performance budgets

| Endpoint class | p95 target |
|---|---|
| Interactive endpoints (general) | < 500 ms |
| Dashboard/summary | < 1 s |
| `POST /imports` (before async processing) | < 500 ms |
| Async import completion (100k findings) | Not bounded synchronously — bounded by "stays responsive, progress visible, retryable" (Section 65), not a fixed wall-clock target |

Jobs are explicitly allowed to take a while, as long as: the HTTP request returns quickly, progress is visible (`ImportJob.findings_processed`/`findings_total`), the job is retryable without duplication, and the rest of the system remains responsive during processing (Section 65).

## 5. Load gates (Section 80)

Run against `load-tests/` ([docs/TEST_STRATEGY.md](TEST_STRATEGY.md#load-testing)), each a pass/fail gate before considering the corresponding scale "reached":

| Gate | Concurrency | Duration/threshold |
|---|---|---|
| A | 25 concurrent users | 5 minutes, 0 unexpected errors |
| B | 50 concurrent users | p95 < 400 ms |
| C | 100 concurrent users | p95 < 500 ms, error rate < 1% |
| D | 200 concurrent users | p95 < 750 ms, error rate < 1% |

Plus a stress test run past Gate D to observe **where and how** the system degrades (Section 80) — the failure mode itself (e.g. DB connection pool exhaustion vs. worker queue backup) must be identified and documented, not just the breaking point.

## 6. Data-scale tests (Section 81)

Synthetic datasets at 100k / 1M / 5M findings, testing pagination, filters, aggregation, dashboard queries, deduplication, and imports at each scale — not just at the smallest size. Detailed in [docs/TEST_STRATEGY.md](TEST_STRATEGY.md#data-scale-tests).

## 7. Capacity review discipline (Section 111, 118)

No release claims "scalable to N" without evidence. Every major release answers:

```
How many findings tested?         How many assets tested?
How many organizations tested?      What concurrency?
What p95?                             What DB size?
Where did degradation begin?
```

"V1 is ready for 1,000 users" requires **all** of: load tests passed (§5), data-scale tests passed (§6), tenant tests passed ([docs/MULTITENANCY.md](MULTITENANCY.md#5-isolation-tests)), async import test passed ([docs/TEST_STRATEGY.md](TEST_STRATEGY.md#import-scale-test)), DB query review passed ([docs/DATA_MODEL.md](DATA_MODEL.md#5-query-budget)), and resource metrics documented ([docs/OBSERVABILITY.md](OBSERVABILITY.md)). A design that looks correct is not sufficient (Section 118) — "product done" also does not mean "enterprise done" (Section 119); NEXARO V1 does not claim "enterprise-grade" or "mission-critical" without separate evidence.

## 8. Connection pooling (Section 67)

PostgreSQL access goes through connection pooling from day one (SQLAlchemy's pool, sized to the API/worker process count). The design leaves room to add PgBouncer later without a domain-layer change — it is not installed by default in V1 unless load testing shows connection-count pressure at the target concurrency.
