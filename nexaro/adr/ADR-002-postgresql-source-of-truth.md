# ADR-002: PostgreSQL as Single Source of Truth

## Context

NEXARO needs durable storage for organizations, assets, findings, vulnerabilities, remediation, and audit data, at a target scale of millions of findings and up to a million assets, with no sharding planned for V1.

## Options

1. **PostgreSQL, single database, no sharding.**
2. **PostgreSQL with sharding/partitioning by organization from day one.**
3. **Polyglot persistence** — e.g. a document store for findings, a relational store for org/billing data.
4. **Database-per-organization.**

## Decision

Single PostgreSQL database (option 1), designed from the start for millions of rows (indexing strategy in `docs/DATA_MODEL.md`), with table partitioning left as a documented future option rather than a day-1 requirement.

## Reason

Postgres comfortably handles the target scale (5M findings, 1M assets, 250k vulnerabilities) with correct indexing and cursor pagination — this is well within single-instance Postgres capability, not a distributed-database-scale problem. Sharding (option 2) and database-per-tenant (option 4) are explicitly rejected by the design brief (Section 42) and would multiply operational complexity (migrations, backups, connection management) for a scale that doesn't need it. Polyglot persistence (option 3) adds a second system with its own consistency and operational model for no demonstrated benefit — relational modeling fits this domain (foreign keys between findings/assets/vulnerabilities/remediation are core to the product, not incidental).

## Tradeoffs

- All read/write load concentrates on one database — mitigated by connection pooling (`docs/SCALABILITY.md` §8), read-query budgets (`docs/DATA_MODEL.md` §5), and the option to add read replicas or PgBouncer later without a domain-layer change.
- Vertical scaling of a single Postgres instance has a ceiling — accepted, since the target scale (5M findings) is well under where that ceiling would bind for a properly indexed schema.

## What would make us reconsider

Data-scale load tests (`docs/TEST_STRATEGY.md` §7) at the 5M-finding tier show query latency budgets can't be met even after indexing/partitioning work — at that point, table partitioning by organization or time is the first escalation, not a new database technology.
