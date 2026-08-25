# ADR-004: S3-Compatible Object Storage for Files

## Context

NEXARO handles user-uploaded scanner files (potentially large — up to the org limit, `docs/JOBS_AND_IMPORTS.md` §9), generated reports, and evidence attachments. These must not live in PostgreSQL or on a shared local filesystem the API/worker processes serve from.

## Options

1. **S3-compatible object storage** (AWS S3, Cloudflare R2, or self-hosted MinIO), interfaced generically.
2. **PostgreSQL `bytea`/large objects.**
3. **Local/network filesystem on the application servers.**

## Decision

S3-compatible object storage (option 1), accessed through a single internal interface so the concrete provider is swappable.

## Reason

Storing large binary files in Postgres (option 2) bloats the database, complicates backups, and works against the "PostgreSQL is metadata, not blobs" principle in `docs/DATA_MODEL.md`. A local/network filesystem (option 3) doesn't survive horizontal scaling of API/worker instances cleanly (every instance needs the same files) and lacks the durability guarantees a managed object store provides out of the box. An S3-compatible interface keeps the choice of concrete provider reversible — MinIO locally (`docs/DEPLOYMENT.md` §1), any S3-compatible provider in production — without changing application code.

## Tradeoffs

- Adds one more piece of infrastructure beyond Postgres/Redis — accepted, since storing large files anywhere else has worse tradeoffs (above).
- Requires care around upload security (zip bombs, XXE, oversized payloads — `docs/SECURITY_MODEL.md` §6) since files pass through the application before/while being stored.

## What would make us reconsider

Nothing currently anticipated — this is a low-risk, well-understood pattern. Would only revisit if a specific provider's S3-compatibility proves insufficient for a needed feature (e.g. specific lifecycle/versioning behavior).
