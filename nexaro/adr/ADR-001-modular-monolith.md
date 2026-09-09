# ADR-001: Modular Monolith over Microservices

## Context

NEXARO is built and maintained by a single developer initially, targeting up to 1,000 users, 250+ organizations, and millions of findings. The system has clear internal boundaries (identity, assets, findings, ARGOS, decisions, remediation, verification, reports, audit) that could plausibly be separate services.

## Options

1. **Microservices** — each module as an independently deployed service with its own database and API.
2. **Modular monolith** — one deployable backend, internally divided into modules with enforced boundaries (owned entities, public service interface, dependency rules).
3. **Unstructured monolith** — one codebase with no enforced internal boundaries.

## Decision

Modular monolith (option 2). One deployable API process and one worker process, sharing a codebase organized as described in `docs/ARCHITECTURE.md`.

## Reason

Microservices' benefits — independent scaling, independent deployment, fault isolation — are not needed at this scale and are expensive for one developer to operate (N services × deployment pipelines, service discovery, distributed tracing, network-boundary error handling, data consistency across service boundaries). A modular monolith gets the maintainability benefit of clear boundaries (option 2 vs. 3) without the operational cost of network boundaries between every module (option 2 vs. 1). Scaling to 1,000 users is reachable by running more instances of the same monolith (`docs/SCALABILITY.md`), which does not require splitting it into services.

ARGOS is kept internally independent of `identity`/`organizations`/billing specifically so it can be extracted later (into its own service or public API) without a redesign — see ADR-006 — but that extraction is deferred until there's a concrete reason (e.g. proven independent scaling need, or a decision to sell ARGOS as a standalone product).

## Tradeoffs

- A bug in one module can, in principle, affect the whole process (no hard fault isolation) — mitigated by tests, typed interfaces between modules, and the dependency rules in `docs/ARCHITECTURE.md`.
- All modules currently share one deploy cadence — accepted, since a single developer benefits more from one deployment pipeline than from independent release trains.

## What would make us reconsider

A specific module (most likely ARGOS) is proven, with real metrics, to need independent scaling or deployment cadence that the monolith can't provide — not a hypothetical future need.
