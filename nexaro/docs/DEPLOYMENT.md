# NEXARO — Deployment Model

## 1. Local development (Section 90)

```bash
docker compose up
```

Services:
```
web        # React/Vite dev build
api        # FastAPI
worker     # Dramatiq worker (same backend codebase, different entrypoint)
postgres
redis
object storage emulator   # e.g. MinIO, for local S3-compatible testing
```

One command, no external accounts required, to get a fully working stack locally — this is a deliberate constraint so a single developer can iterate without cloud dependencies in the loop.

## 2. Production deployment (Section 91)

No single provider is fixed in the design. The architecture requires:

```
managed PostgreSQL      (e.g. RDS, Cloud SQL, Neon, Supabase, Railway Postgres — any)
managed Redis                (e.g. ElastiCache, Upstash, Railway Redis — any)
S3-compatible object storage    (S3, Cloudflare R2, or self-hosted MinIO)
container hosting                  (any platform that runs the API/worker/web containers — Railway, Fly.io, ECS, a plain VM with docker compose, etc.)
```

Concrete provider selection is a `NEEDS_HUMAN` decision (cost, existing familiarity, budget — Section 133), tracked in [docs/ROADMAP.md](ROADMAP.md#needs_human-decisions). The application code has no provider-specific dependency baked in beyond "S3-compatible API" and "PostgreSQL wire protocol," so this choice is reversible.

## 3. No Kubernetes in V1 (Section 92)

Explicitly rejected for the 1,000-user target absent a benchmark proving the need. A load balancer + N container instances (via whatever the chosen host provides — managed container service or plain docker compose on a couple of VMs) reaches the [docs/SCALABILITY.md](SCALABILITY.md) targets without the operational overhead of running a Kubernetes control plane for a one-developer team. Revisit only if benchmarks show autoscaling/multi-region needs the current model can't meet.

## 4. Scaling path (same code, more compute)

```
Day 1: API x1, Worker x1, small managed DB/Redis
  ↓ (add instances, no code change)
API x3-5 behind a load balancer, Worker xN sized to job volume, larger managed DB/Redis
```

Matches [docs/ARCHITECTURE.md](ARCHITECTURE.md#5-deployment-architecture) and [docs/SCALABILITY.md](SCALABILITY.md#2-scaling-principle).

## 5. Migrations (Section 89)

Alembic. Production migrations must be **forward-safe**:
- No destructive migration (dropping a column/table still read by the currently-deployed code version) ships in the same deploy as the code change that stops using it — drop only after the reading code has been fully rolled out.
- Every migration is tested as an upgrade from the previous production schema version in CI ([docs/TEST_STRATEGY.md](TEST_STRATEGY.md#ci)), not just "applies cleanly on an empty DB."

## 6. Configuration & secrets

Environment-variable driven (`.env.example` documents required keys with placeholder values, never real secrets — [docs/SECURITY_MODEL.md](SECURITY_MODEL.md#5-secrets)). Production secrets live in the host platform's secrets manager or environment configuration, never in the repo.

## 7. Deployment checklist (what "ready to deploy" means)

```
migrations tested as upgrade from prior schema
health checks (/live, /ready) wired to the platform's restart/routing logic
structured logging + error tracking connected
backups configured and restore-tested (docs/OBSERVABILITY.md)
secrets set via platform config, not committed
rate limiting / org limits active (Redis reachable)
object storage bucket/credentials configured
TLS terminated at the reverse proxy
```
