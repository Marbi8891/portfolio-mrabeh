# NEXARO — Product Specification (V1)

## 1. What NEXARO is

NEXARO turns security findings into clear, explainable remediation priorities.

It is a **Vulnerability Intelligence, Risk Decision & Remediation** platform. It does not discover vulnerabilities itself — it ingests results from tools organizations already run (scanners, SBOM tools, cloud security tools), and answers the question those tools leave unanswered: **what should we fix first, and why?**

## 2. Product boundaries

NEXARO **is**:
- A destination for findings exported from third-party scanners and tools.
- A normalization, deduplication, and enrichment layer over those findings (via ARGOS).
- A decision layer that turns technical risk + business context into an explainable organizational priority.
- A remediation and verification tracker with an audit trail.
- A small, affordable, API-friendly, multi-tenant SaaS.

NEXARO **is not**:
- A scanner. It does not perform network scanning, agent-based detection, or active exploitation.
- A SIEM, SOAR, EDR, CNAPP, CSPM, ASM platform, or GRC/compliance suite.
- A vulnerability database competing with NVD/MITRE on completeness.
- An enterprise platform competing head-on with Tenable, Qualys, Rapid7, Wiz, CrowdStrike, or Microsoft Defender. Those tools are, and remain, **data sources**.

## 3. Non-goals (V1)

Explicitly out of scope — see [docs/ROADMAP.md](ROADMAP.md) for what may become V2+:

```
SIEM · SOAR · EDR · full scanner · cloud CNAPP · CSPM · ASM platform
full GRC · full compliance suite · attack graph · attack-path engine
mobile apps · ML risk model · generative-AI core decisions
100 integrations · multi-region · Kubernetes · Kafka · service mesh
CQRS · event sourcing
```

None of these are needed to serve 1,000 users with millions of findings. Anything on this list that "merely looks like architecture for 100,000 users" is postponed, per the anti-overengineering check.

## 4. Personas

| Persona | Context | Primary need |
|---|---|---|
| **Independent security consultant** | Runs scans for multiple small clients, reports manually today. | Fast way to turn scanner output into a prioritized, explainable client report. |
| **Small MSP/MSSP analyst** | Manages vulnerability data for many small tenants. | Multi-org workspace, low per-org overhead, API for automation. |
| **Small IT/security team member** (20–500 employee org) | Owns patching but is buried in scanner CSVs and spreadsheets. | One place that says what to fix first without needing a data science background. |
| **Engineering/IT owner (remediation assignee)** | Receives tickets, not raw CVE dumps. | Clear, non-technical-enough explanation of why something is urgent, and a way to mark it done with evidence. |
| **Founder/CTO of a small company** | No dedicated security hire. | Confidence that "the important stuff" isn't slipping through, at a price a small company can justify. |

## 5. Primary workflows (V1)

1. **Onboard** — create an organization, invite teammates with a role (OWNER/ADMIN/ANALYST/VIEWER).
2. **Bring in assets** — import or manually register hosts/services with available business context (criticality, internet-facing, data sensitivity).
3. **Import findings** — upload scanner output (CSV/JSON generic, Nmap XML, later OpenVAS/Nessus) or push via API.
4. **Normalize & deduplicate** — the system reconciles findings across scanners and asset re-scans into stable records.
5. **Enrich** — ARGOS attaches CVSS, EPSS, and CISA KEV intelligence to the underlying vulnerabilities, with explicit uncertainty where data is missing.
6. **Add context** — analysts fill in or import asset/business context (exposure, criticality, controls) as it becomes available; missing context stays "Unknown," never silently zero.
7. **Prioritize** — the Decision Engine combines vulnerability risk, asset exposure, business impact, and controls into an Organizational Priority (P0–P4) with a plain-language "why."
8. **Remediate** — assign an owner, due date, and recommended action; track status through a defined lifecycle.
9. **Verify** — resolution requires evidence (manual note, rescan import, or asset state update) before a finding can be marked resolved.
10. **Report & audit** — generate reports for stakeholders/clients; every sensitive state change is captured in an append-only audit log.

This is the complete loop from Section 117 of the design brief and is the Definition of V1 (see [docs/ROADMAP.md](ROADMAP.md#definition-of-v1)).

## 6. V1 functional scope

```
Authentication · Organizations · Users · Assets · Findings · Vulnerabilities
ARGOS · Imports · Normalization · Deduplication · Decision Engine
Remediation · Verification · Reports · REST API · Web UI · Audit Log
```

Each has an owning module described in [docs/ARCHITECTURE.md](ARCHITECTURE.md#module-map).

## 7. Positioning

NEXARO wins on **clarity, correlation, context, prioritization, simplicity, and price** — not on scanner coverage, CVE database size, or integration count. It is affordable, explainable, tool-neutral, API-friendly, and small-team friendly.

Product language to use: *"NEXARO turns security findings into clear, explainable remediation priorities."* Avoid "Tenable killer," "all-in-one cybersecurity platform," "AI-powered everything," or unearned claims like "enterprise-grade" / "bank-grade" without evidence (see [docs/TEST_STRATEGY.md](TEST_STRATEGY.md) for what evidence means).

## 8. Commercial shape (design-only, not activated in V1 build)

Domain is prepared for usage metering (`UsageEvent`) and future plan tiers (Free/Solo/Starter/Pro/Team/MSP/API), without wiring a billing provider or gating basic intelligence behind paywalls. NEXARO charges for **scale, automation, collaboration, API access, history, integrations, and managed infrastructure** — never for withholding a correct priority. Pricing, licensing, and open-core structure are `NEEDS_HUMAN` decisions tracked in [docs/ROADMAP.md](ROADMAP.md#needs_human-decisions).
