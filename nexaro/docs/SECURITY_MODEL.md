# NEXARO — Security Model

Baseline: OWASP ASVS mindset, OWASP API Security Top 10, secure defaults, least privilege (Section 68). No formal compliance is claimed without validation (audits, pen tests) — see [docs/ROADMAP.md](ROADMAP.md#needs_human-decisions).

## 1. Threat model (summary)

| Actor | Goal | Primary mitigations |
|---|---|---|
| Unauthenticated attacker | Access another org's data | Auth required on every route; tenant checks at the query layer (§4) |
| Authenticated user, wrong org | Read/modify another org's `Finding`/`Asset`/etc. via guessed/enumerated IDs | Every query scoped by `organization_id` derived from the session/API key, never from the request path/body alone (§4) |
| Malicious upload | Exploit the import pipeline (zip bomb, XML entity expansion, path traversal, oversized payload) | §6 |
| Compromised/leaked API key | Abuse org's API quota, exfiltrate data | Key prefix/hash storage, instant revocation, rate limiting, `last_used_at` visibility for anomaly detection |
| Insider (legit user) | Escalate role, hide actions | RBAC role checks server-side; sensitive actions always audit-logged (§7) |
| Dependency compromise | Supply-chain vulnerability in a Python/JS package | §8 |

## 2. Authentication (Section 69)

**Decision:** self-hosted email + password auth for the web app, Argon2id password hashing, session cookies. API access uses API keys (not user passwords). See [ADR-009](../adr/ADR-009-authentication-strategy.md) for the build-vs-managed-provider tradeoff.

- Passwords: Argon2id, no legacy/reversible hashing, no in-house crypto primitives (Section 73).
- Session cookies: `HttpOnly`, `Secure`, `SameSite=Lax` (or `Strict` where UX allows), CSRF protection on state-changing web routes (Section 70).
- No sensitive tokens in `localStorage`.
- SSO/OAuth: explicitly deferred past V1 (adds a real integration surface not needed for the initial small-team/consultant market) — tracked in [docs/ROADMAP.md](ROADMAP.md).

## 3. Authorization (Section 71)

Every endpoint checks, in order:
1. **Authentication** — valid session or API key.
2. **Organization membership** — the actor belongs to the org the resource claims to belong to.
3. **Role/permission** — the actor's role (`OWNER`/`ADMIN`/`ANALYST`/`VIEWER`) permits the action (see [docs/MULTITENANCY.md](MULTITENANCY.md#rbac)).
4. **Resource ownership** — the specific resource actually belongs to that org (not just "an org the user is in," but *the* org referenced).

This order matters: step 4 is what prevents the "confused deputy" failure mode of trusting a resource ID without re-verifying its tenant.

## 4. Tenant isolation as a security control

Detailed fully in [docs/MULTITENANCY.md](MULTITENANCY.md). Summary of the security-relevant rule: application code never trusts an `organization_id` supplied by the client (query param, body, or otherwise) as authorization — it derives the acting org from the authenticated session/API key and filters every query by it. Tested explicitly (Section 87) with cross-org access attempts expected to return `404`.

## 5. Secrets (Section 72)

Never committed to the repo. Environment variables / secrets manager only. `.env.example` ships with placeholder keys and no real values. CI and production secrets are managed outside version control (concrete provider is a `NEEDS_HUMAN` / deployment-time decision — see [docs/DEPLOYMENT.md](DEPLOYMENT.md)).

## 6. Upload security (Section 47)

Scanner file uploads are treated as untrusted input:

| Risk | Mitigation |
|---|---|
| Oversized payload | Enforced max upload size (§ org limits in [docs/JOBS_AND_IMPORTS.md](JOBS_AND_IMPORTS.md#9-organization-limits)), rejected before full read into memory |
| Zip bombs | Decompression size/ratio limits enforced during parsing, not after full extraction |
| XML entity expansion (XXE) | XML parsers (Nmap/OpenVAS/Nessus) configured with external entity resolution **disabled**; no DTD processing |
| Path traversal | Parsed content never used to construct filesystem paths; all storage keys are server-generated UUIDs |
| Wrong/spoofed content type | Validate declared size, extension, and content-type together; parser-level format validation before trusting structure |
| Executing uploaded content | Never — uploads are parsed as data only, never executed, imported as code, or passed to a shell |

Raw uploaded files live in object storage, never on a shared local filesystem the API/worker processes also serve from.

## 7. Audit logging (Section 56)

Sensitive state changes generate an `AuditEvent` (append-only, organization-scoped, actor + action + target + metadata + timestamp — schema in [docs/DATA_MODEL.md](DATA_MODEL.md)):

```
finding status changed          risk accepted
finding marked false positive     remediation reassigned
API key created                     API key revoked
role changed
```

Audit events are never mutated or deleted except as part of a full, deliberate organization deletion (Section 108).

## 8. Dependency security (Section 74)

CI runs a dependency audit (`pip-audit`/`safety` for Python, `npm audit` for the frontend) on every build ([docs/TEST_STRATEGY.md](TEST_STRATEGY.md#ci)). Major-version upgrades require passing tests before merge — never automated blindly.

## 9. Transport & at-rest (Section 73)

TLS required in production (enforced at the reverse proxy). Encryption-at-rest relies on the managed database/object-storage provider's native capability — NEXARO does not implement custom cryptography. No exceptions.

## 10. Logging hygiene

Structured logs (Section 75) never include: passwords, password hashes, raw API key secrets, session tokens, or full uploaded file contents. Only identifiers (`request_id`, `organization_id`, `user_id`, `job_id`) and operational metadata are logged.
