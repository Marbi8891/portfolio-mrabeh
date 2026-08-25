# NEXARO — Test Strategy

## 1. Test pyramid (Section 84)

```
unit → integration → contract → E2E → security → load
```

Weighted toward the base — not everything is E2E. Most business-logic correctness (normalization, dedup, ARGOS, risk, decision rules, state transitions) is unit-tested; integration/E2E verify the pieces actually connect.

## 2. Unit tests (Section 85)

Priority areas, because they encode the product's actual intelligence and are where a silent bug is most damaging:
```
normalization        deduplication          ARGOS (risk_model.py)
decision rules         state transitions        authorization helpers
```
Every dimension of ARGOS-RISK-V1 and every priority band in the Decision Engine ([docs/RISK_MODEL.md](RISK_MODEL.md), [docs/DECISION_ENGINE.md](DECISION_ENGINE.md)) has explicit test cases, including the uncertainty (`score_min`/`score_max`) paths — not just the fully-evidenced happy path.

## 3. Integration tests (Section 86)

Against real dependencies, preferring containers in CI (e.g. `testcontainers`) over mocks where feasible:
```
PostgreSQL      Redis        object storage interface
job execution     imports
```
Includes the **query budget** tests from [docs/DATA_MODEL.md](DATA_MODEL.md#5-query-budget) — instrumented assertions that `GET /findings?limit=50` stays within its query-count budget, catching N+1 regressions in CI rather than in production.

## 4. Tenant isolation tests (Section 87 — mandatory, not optional)

Full detail in [docs/MULTITENANCY.md](MULTITENANCY.md#5-isolation-tests). Every tenant-scoped resource type has a cross-org access test asserting `404`/`403` as appropriate. This suite blocks merge — tenant isolation is the one property this product cannot ship with a regression in.

## 5. Failure injection (Section 88)

Simulated failures with a defined, tested degradation behavior for each:

| Failure | Expected behavior |
|---|---|
| NVD / EPSS / KEV unavailable | Enrichment marks the affected field stale/unknown, widens `score_min`/`score_max` range ([docs/RISK_MODEL.md](RISK_MODEL.md#2-uncertainty-unknown--zero)); no crash, no silent zero |
| Redis unavailable | New job enqueue fails loudly (5xx on the enqueueing request) rather than silently dropping; rate limiting fails closed or to a safe conservative default (decision to be finalized in implementation — never fails open to "no limit") |
| Worker crash mid-job | Job is retried per Dramatiq's retry/dead-letter handling ([docs/JOBS_AND_IMPORTS.md](JOBS_AND_IMPORTS.md#1-job-system-choice)); no partial/duplicate findings on retry (§2, idempotency) |
| DB transient error | Bounded retry at the connection-pool/query layer, then a clean 5xx — never a hung request |
| Corrupted import file | Parser rejects with a specific error surfaced on the `Import` record; does not crash the worker or affect other imports |
| Oversized import | Rejected before full load per the org limits ([docs/JOBS_AND_IMPORTS.md](JOBS_AND_IMPORTS.md#9-organization-limits)) |
| Duplicate import (same file resubmitted) | No duplicate findings — content-hash idempotency (§2) |
| Report generation failure | `Report` record shows failed status with reason; retryable; does not lose the underlying data |

## 6. Load testing (Section 79–80)

**Decision:** k6. Chosen over Locust for CI-friendliness (single static binary, no Python worker-process/gevent runtime to manage in CI), lower resource footprint at the target concurrency levels, and built-in threshold-based pass/fail gating that maps directly onto the Load Gates A–D in [docs/SCALABILITY.md](SCALABILITY.md#5-load-gates). Scripts live in `load-tests/`, versioned alongside the code they test. Not deferred to "the end of the project" (Section 79) — introduced as soon as there's an API to point it at (Phase 7).

## 7. Data-scale tests (Section 81)

Synthetic datasets generated at three sizes, exercising the same query paths at each:
```
100k findings     1M findings     5M findings
```
Testing: pagination, filters, aggregation, dashboard queries, deduplication, imports. A query that's fine at 100k and falls over at 5M is exactly the class of bug this catches before a real customer does.

## 8. Tenant scale test (Section 82)

Simulated **250 organizations, 1,000 users**, verifying isolation holds and performance stays within budget under realistic multi-tenant load (not just single-tenant load multiplied on paper).

## 9. Import scale test (Section 83)

Minimum case: a single import of **100,000 findings**. Must:
```
not block the API (202 returned promptly)
not exhaust worker memory
not duplicate findings on retry
report progress throughout
```

## 10. CI pipeline (Section 114)

```
lint (ruff, ESLint)
type check (mypy strict, TypeScript strict)
unit tests
integration tests
frontend build
backend build
dependency audit (pip-audit/safety, npm audit)
migration test (upgrade from prior schema version)
```
Full load tests run periodically (e.g. nightly/pre-release), not on every commit — they're too slow for the commit feedback loop, but they are not optional before a release is called scale-ready ([docs/SCALABILITY.md](SCALABILITY.md#7-capacity-review-discipline)).

## 11. Code quality gates (Section 113)

```
Backend:  ruff, mypy --strict, pytest
Frontend: ESLint, TypeScript strict, component/unit tests
```
Rules are not disabled to silence a structural problem — a failing lint/type rule is fixed at the root cause or the rule is deliberately reconsidered, never suppressed inline as a default move.
