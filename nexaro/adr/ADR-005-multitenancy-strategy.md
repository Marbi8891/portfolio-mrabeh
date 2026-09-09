# ADR-005: Shared-Schema Multi-Tenancy with Row-Level `organization_id` Scoping

## Context

NEXARO must isolate 250+ organizations' data from each other, at up to 1,000 users, while remaining operable by a single developer (Section 24–25).

## Options

1. **Shared database, shared schema, `organization_id` column on every tenant-scoped row**, enforced at the application query layer.
2. **Shared database, schema-per-tenant.**
3. **Database-per-tenant.**
4. **Row-level security (RLS) in PostgreSQL as the primary isolation mechanism.**

## Decision

Option 1, with isolation enforced at three layers (application, query, tests — `docs/MULTITENANCY.md` §3), not relying on any single layer.

## Reason

Database-per-tenant (option 3) and schema-per-tenant (option 2) multiply migrations, connection pools, and backup/restore operations by the organization count — infeasible for one developer at 250+ orgs and explicitly rejected by the design brief (Section 42). Row-level scoping with `organization_id` is the simplest mechanism that meets the actual requirement at this scale, provided it's enforced consistently — which is why the design mandates three enforcement layers rather than trusting the column alone.

Postgres RLS (option 4) was considered as an additional, database-enforced backstop. It's not adopted as the *primary* mechanism for V1 because it adds a second place (policies) where tenant logic must be kept in sync with application logic, and the three-layer enforcement plus mandatory isolation tests (`docs/MULTITENANCY.md` §5, `docs/TEST_STRATEGY.md` §4) already gives strong, testable guarantees. RLS remains a candidate defense-in-depth addition, not a replacement for the application-layer checks — see "what would make us reconsider" below.

## Tradeoffs

- Isolation depends on consistent application-layer discipline (centralized repository/query-builder pattern, `docs/MULTITENANCY.md` §3) rather than being structurally guaranteed by separate databases — mitigated by mandatory, CI-blocking cross-tenant tests.
- A single large database serves all tenants — noisy-neighbor risk, mitigated by per-org limits (`docs/JOBS_AND_IMPORTS.md` §9).

## What would make us reconsider

A specific compliance requirement (from a real customer, not hypothetical) mandates physical data separation per tenant — at which point database-per-tenant would be scoped for that customer segment specifically, not applied platform-wide. Alternatively, if a tenant-isolation test failure or incident ever occurs in production, adding Postgres RLS as a second enforcement layer becomes the immediate next step.
