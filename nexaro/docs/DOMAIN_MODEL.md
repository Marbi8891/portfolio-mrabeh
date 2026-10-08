# NEXARO — Domain Model

## 1. Core principle: Finding ≠ Vulnerability

A **Vulnerability** (e.g. `CVE-2026-XXXX`) is a single intelligence record. A **Finding** is that vulnerability observed on a specific asset. One vulnerability can produce many findings:

```
Vulnerability (CVE-2026-XXXX)
   ├── Finding on Asset A
   ├── Finding on Asset B
   └── Finding on Asset C
```

CVE intelligence (CVSS/EPSS/KEV) is fetched and cached **once per vulnerability**, never per finding — see [docs/JOBS_AND_IMPORTS.md](JOBS_AND_IMPORTS.md#argos-enrichment-at-scale). This is the single most important normalization decision in the system: it is what makes enrichment of millions of findings tractable.

## 2. Entities

| Entity | Owning module | Purpose |
|---|---|---|
| `Organization` | organizations | Tenant boundary. Everything sensitive belongs to one. |
| `User` | identity | A login identity, global (not org-scoped). |
| `Membership` | organizations | Join of `User` ↔ `Organization` with a `role`. |
| `Asset` | assets | A host/system/application the org cares about. |
| `Service` | assets | A network service on an asset (port/protocol/service name), the usual attachment point for findings. |
| `Vulnerability` | risk (ARGOS) | A CVE-level intelligence record: CVSS, EPSS, KEV, provenance. Org-independent. |
| `Finding` | findings | A vulnerability observed on an asset/service, from a specific source, with a lifecycle status. |
| `FindingEvidence` | findings | One piece of proof backing a finding (e.g. "seen by Nessus scan #123 on 2026-08-01"). A finding can have evidence from multiple scanners without becoming multiple findings. |
| `Import` | imports | A user-initiated upload/ingestion event. |
| `ImportJob` | imports | The async worker execution record for an `Import` (status, progress, error). |
| `RiskAssessment` | risk (ARGOS) | A snapshot of Vulnerability Risk (score, ceiling, evidence, model version) at a point in time. |
| `DecisionAssessment` | decisions | A snapshot of Organizational Priority for a finding (score/priority, inputs, explanation, model version). |
| `Remediation` | remediation | Tracked remediation work for one (or a grouped set of) finding(s). |
| `Verification` | verification | A verification event/attempt for a `Remediation`. |
| `APIKey` | identity | A credential for programmatic org access. |
| `UsageEvent` | organizations (or a thin shared "usage" concern) | A billable/measurable unit of API/platform use. |
| `AuditEvent` | audit | An append-only record of a sensitive state change. |

## 3. Relationships (narrative ERD — see [docs/DATA_MODEL.md](DATA_MODEL.md) for the full ERD with keys/indexes)

```
Organization 1─* Membership *─1 User
Organization 1─* Asset
Asset 1─* Service
Asset 1─* Finding
Service 0─1───* Finding
Vulnerability 1─* Finding
Finding 1─* FindingEvidence
Organization 1─* Import
Import 1─1 ImportJob
Import 1─* Finding (findings created/touched by this import)
Vulnerability 1─* RiskAssessment (history over time)
Finding 1─* DecisionAssessment (history over time)
Finding 0─* Remediation  (typically 1, but a remediation may batch several findings — see below)
Remediation 1─* Verification
Organization 1─* APIKey
Organization 1─* UsageEvent
Organization 1─* AuditEvent
```

`ASSUMPTION`: a `Remediation` can reference more than one `Finding` (e.g. "patch this package" fixes five findings at once) via a join table `RemediationFinding(remediation_id, finding_id)`, rather than being strictly 1:1. `VERIFY` during Phase 9 implementation whether V1 needs this or a 1:1 model is sufficient to start.

## 4. Vulnerability Intelligence storage (ARGOS-owned)

```
Vulnerability
  id
  cve_id
  cvss                    # value + vector + version, nullable
  epss                    # score + percentile + epss_date, nullable
  kev                     # LISTED | NOT_LISTED | UNKNOWN
  intelligence_updated_at
  source_snapshot          # raw provider payload references, for audit/debug
  risk_model_version        # which ARGOS-RISK-* version scored this
```

`Finding` rows reference `Vulnerability.id`; they never copy CVSS/EPSS/KEV values inline. This keeps intelligence single-sourced and makes re-scoring (a model version bump) a matter of recomputing `RiskAssessment`, not rewriting findings.

## 5. Asset

```
Asset
  id, organization_id
  name, hostname, ip_addresses
  asset_type
  environment
  internet_facing
  criticality
  data_sensitivity
  owner
  created_at, updated_at
```

Not all fields are mandatory. A field left blank is **Unknown**, and stays Unknown through Decision Engine reasoning ([docs/DECISION_ENGINE.md](DECISION_ENGINE.md#unknown-semantics)) — it is never defaulted to a value that implies false confidence.

## 6. Finding

```
Finding
  id, organization_id
  asset_id, service_id (nullable)
  vulnerability_id

  source, source_finding_id     # e.g. "nessus", scanner's own finding id — dedup input
  port, protocol, service

  first_seen_at, last_seen_at
  status                          # see lifecycle below
  fingerprint                     # stable dedup key — see docs/JOBS_AND_IMPORTS.md
```

## 7. Finding status lifecycle

```
DETECTED → TRIAGED → ASSIGNED → IN_PROGRESS → REMEDIATED → VERIFYING → RESOLVED
                                                                 └──→ REOPENED
DETECTED / TRIAGED / ASSIGNED / IN_PROGRESS / VERIFYING → ACCEPTED_RISK
any active state → FALSE_POSITIVE
REOPENED → back into ASSIGNED / IN_PROGRESS
```

Valid transitions are enforced in the `findings` module, not left to the UI or API caller. `REMEDIATED → RESOLVED` is only reachable through `VERIFYING` (Section 54 of the brief; see [docs/DECISION_ENGINE.md](DECISION_ENGINE.md) and the verification lifecycle diagram in [docs/JOBS_AND_IMPORTS.md](JOBS_AND_IMPORTS.md)). `ACCEPTED_RISK` and `FALSE_POSITIVE` both require a reason and generate an `AuditEvent`.

## 8. Two risk levels are never merged

- **Vulnerability Risk** — a property of the vulnerability + its evidence (ARGOS). Example: `82/100`.
- **Organizational Priority** — a property of this finding, in this org's context (Decision Engine). Example: `P0`.

These are stored as separate entities (`RiskAssessment` vs `DecisionAssessment`) with separate history, never collapsed into one field. See [docs/RISK_MODEL.md](RISK_MODEL.md) and [docs/DECISION_ENGINE.md](DECISION_ENGINE.md).
