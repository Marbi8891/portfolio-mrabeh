# NEXARO — V1 Design Package

*Affordable Vulnerability Intelligence, Risk Decision & Remediation. Architecture-First · Modular Monolith · 1 → 1,000 Users · Millions of Findings.*

## 1. Executive summary

NEXARO turns security findings into clear, explainable remediation priorities. It does not scan — it ingests results from scanners and tools organizations already run, normalizes and deduplicates them, enriches the underlying CVEs with vulnerability intelligence (ARGOS), and combines that with asset exposure, business context, and existing controls to answer one question: **what should we fix first, and why?**

This package is the complete pre-implementation design for V1: architecture, domain model, data model, risk model, decision engine, API, security model, multi-tenancy, scalability strategy, jobs/imports pipeline, UX information architecture, observability, deployment, test strategy, and a 12-month roadmap — plus 10 Architecture Decision Records. [Phase 0](PHASE_0_FINDINGS.md) confirmed the workspace has no prior NEXARO/ARGOS code to preserve; everything below is designed from a clean slate, built for one developer to implement and maintain.

**No application code has been written.** Per the design brief's own process (Section 130), implementation does not start until this package is reviewed.

## 2. Product boundaries & non-goals

- [PRODUCT_SPEC.md](docs/PRODUCT_SPEC.md) — what NEXARO is/is not, personas, primary workflows, V1 functional scope, positioning.
- Non-goals and out-of-V1-scope items are also tracked centrally in [ROADMAP.md §9](docs/ROADMAP.md#9-explicitly-out-of-v1-tracked-as-future-roadmap-only-section-16).

## 3. Architecture

- [ARCHITECTURE.md](docs/ARCHITECTURE.md) — system context, container architecture, module map, dependency rules, internal events, deployment scaling diagrams, rejected alternatives ("why not X").

## 4. Domain & data

- [DOMAIN_MODEL.md](docs/DOMAIN_MODEL.md) — entities, Finding ≠ Vulnerability, status lifecycle, the two-risk-levels rule.
- [DATA_MODEL.md](docs/DATA_MODEL.md) — full ERD, keys/constraints, index strategy, pagination, query budgets, retention & deletion.

## 5. Intelligence & decisioning

- [RISK_MODEL.md](docs/RISK_MODEL.md) — ARGOS-RISK-V1 (35/35/30 weighting), uncertainty (`UNKNOWN != ZERO`), provenance, EPSS/KEV freshness, model versioning.
- [DECISION_ENGINE.md](docs/DECISION_ENGINE.md) — no-magic-score rule, four decision dimensions, P0–P4 priority scale, explainability example, unknown semantics.

## 6. Pipeline

- [JOBS_AND_IMPORTS.md](docs/JOBS_AND_IMPORTS.md) — Redis + Dramatiq choice, idempotency, import pipeline sequence diagram, dedup fingerprinting, ARGOS enrichment-at-scale, global timeouts, remediation/verification lifecycle state diagram, organization limits.

## 7. API

- [API_SPEC.md](docs/API_SPEC.md) — REST endpoints, versioning, schema separation, cursor pagination, error model, idempotency keys, API keys, rate limiting vs. billable usage, performance budgets.

## 8. Security & tenancy

- [SECURITY_MODEL.md](docs/SECURITY_MODEL.md) — threat model, authentication, authorization order, secrets, upload security, audit logging, dependency security, logging hygiene.
- [MULTITENANCY.md](docs/MULTITENANCY.md) — Organization as tenant unit, isolation strategy and its three enforcement layers, RBAC, mandatory isolation tests.

## 9. UX

- [UX_SPEC.md](docs/UX_SPEC.md) — navigation, Overview ("what requires attention now"), Finding Detail layout, uncertainty UX, accessibility (WCAG 2.2 AA), design system, theming, loading/partial/error states.

## 10. Operability

- [OBSERVABILITY.md](docs/OBSERVABILITY.md) — structured logs, metrics, health endpoints, correlation IDs, backups/restore testing.
- [DEPLOYMENT.md](docs/DEPLOYMENT.md) — local docker-compose stack, production deployment (no fixed provider), no Kubernetes in V1, migration safety, deployment checklist.
- [SCALABILITY.md](docs/SCALABILITY.md) — capacity targets, "scale by adding compute" principle, no overprovisioning, performance budgets, load gates A–D, capacity review discipline.

## 11. Quality

- [TEST_STRATEGY.md](docs/TEST_STRATEGY.md) — test pyramid, unit/integration/tenant-isolation/failure-injection tests, load testing (k6), data-scale and tenant-scale and import-scale tests, CI pipeline, code quality gates.

## 12. Decisions

- [ADR-001](adr/ADR-001-modular-monolith.md) — Modular monolith over microservices.
- [ADR-002](adr/ADR-002-postgresql-source-of-truth.md) — PostgreSQL as single source of truth, no sharding.
- [ADR-003](adr/ADR-003-redis-jobs-cache-ratelimit.md) — Redis for jobs/cache/rate-limit; Dramatiq as worker framework.
- [ADR-004](adr/ADR-004-object-storage.md) — S3-compatible object storage.
- [ADR-005](adr/ADR-005-multitenancy-strategy.md) — Shared-schema multi-tenancy with row-level scoping.
- [ADR-006](adr/ADR-006-argos-risk-model.md) — ARGOS-RISK-V1 model, kept tenant-independent.
- [ADR-007](adr/ADR-007-decision-engine-separation.md) — Decision Engine separated from ARGOS.
- [ADR-008](adr/ADR-008-async-imports.md) — Imports processed asynchronously.
- [ADR-009](adr/ADR-009-authentication-strategy.md) — Self-hosted auth for V1, SSO deferred.
- [ADR-010](adr/ADR-010-api-versioning.md) — URL path API versioning.

## 13. Roadmap, risks, open questions

- [ROADMAP.md](docs/ROADMAP.md) — Definition of V1, 12-phase implementation plan with dependency graph, illustrative 12-month pacing, quality gates, pilot criteria, technical risks, open questions (`VERIFY`), and the `NEEDS_HUMAN` decision list.

## 14. Design success criteria — answered

Every question the design brief requires an answer to (Section 135), with its answer's location:

| Question | Answered in |
|---|---|
| What does NEXARO do / not do? | [PRODUCT_SPEC.md](docs/PRODUCT_SPEC.md) |
| How does a finding enter the system? | [JOBS_AND_IMPORTS.md §3](docs/JOBS_AND_IMPORTS.md#3-import-pipeline) |
| How is it normalized / deduplicated? | [JOBS_AND_IMPORTS.md §4–5](docs/JOBS_AND_IMPORTS.md#5-deduplication) |
| How is a CVE enriched? | [JOBS_AND_IMPORTS.md §6](docs/JOBS_AND_IMPORTS.md#6-argos-enrichment-at-scale), [RISK_MODEL.md](docs/RISK_MODEL.md) |
| How is risk represented? | [RISK_MODEL.md](docs/RISK_MODEL.md) |
| How is business context added? | [DECISION_ENGINE.md §3](docs/DECISION_ENGINE.md#3-decision-dimensions-v1) |
| How is priority calculated? | [DECISION_ENGINE.md](docs/DECISION_ENGINE.md) |
| How is uncertainty represented? | [RISK_MODEL.md §2](docs/RISK_MODEL.md#2-uncertainty-unknown--zero), [DECISION_ENGINE.md §6](docs/DECISION_ENGINE.md#6-unknown-semantics), [UX_SPEC.md §4](docs/UX_SPEC.md#4-uncertainty-ux) |
| How is remediation tracked? | [JOBS_AND_IMPORTS.md §8](docs/JOBS_AND_IMPORTS.md#8-remediation-lifecycle) |
| How is resolution verified? | [JOBS_AND_IMPORTS.md §8](docs/JOBS_AND_IMPORTS.md#8-remediation-lifecycle) |
| How are tenants isolated? | [MULTITENANCY.md](docs/MULTITENANCY.md) |
| How does it scale from 10 to 1,000 users? | [SCALABILITY.md](docs/SCALABILITY.md), [ARCHITECTURE.md §5](docs/ARCHITECTURE.md#5-deployment-architecture) |
| What happens when Redis fails? | [TEST_STRATEGY.md §5](docs/TEST_STRATEGY.md#5-failure-injection-section-88) |
| What happens when NVD fails? | [RISK_MODEL.md §2](docs/RISK_MODEL.md#2-uncertainty-unknown--zero), [JOBS_AND_IMPORTS.md §7](docs/JOBS_AND_IMPORTS.md#7-global-timeouts-section-66) |
| What happens with a 100k-finding import? | [ADR-008](adr/ADR-008-async-imports.md), [TEST_STRATEGY.md §9](docs/TEST_STRATEGY.md#9-import-scale-test-section-83) |
| Where is each type of data stored? | [DATA_MODEL.md](docs/DATA_MODEL.md), [ARCHITECTURE.md §3](docs/ARCHITECTURE.md#3-container-architecture) |
| How is the system tested? | [TEST_STRATEGY.md](docs/TEST_STRATEGY.md) |
| How is it deployed? | [DEPLOYMENT.md](docs/DEPLOYMENT.md) |
| What belongs to V2 instead of V1? | [ROADMAP.md §9](docs/ROADMAP.md#9-explicitly-out-of-v1-tracked-as-future-roadmap-only-section-16) |

## 15. What's next

Per [ROADMAP.md §2](docs/ROADMAP.md#2-implementation-phases-section-116), implementation begins at **Phase 1 (ARGOS stable)**, only after this package has been reviewed. The `NEEDS_HUMAN` list in [ROADMAP.md §8](docs/ROADMAP.md#8-needs_human-decisions-section-133) does not block that start.
