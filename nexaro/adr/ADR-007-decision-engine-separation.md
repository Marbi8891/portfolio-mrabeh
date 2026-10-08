# ADR-007: Decision Engine as a Separate Layer from ARGOS

## Context

NEXARO must produce an Organizational Priority (P0–P4) that reflects not just a vulnerability's inherent risk, but the specific asset's exposure, the business impact, and existing controls (Section 10–11). It must never conflate "how bad is this CVE" with "how urgently should *this org* act."

## Options

1. **One combined scoring function** — ARGOS ingests asset/business/control context directly and outputs a single number used as both risk and priority.
2. **Two separate layers** — ARGOS outputs Vulnerability Risk (tenant-independent); a distinct Decision Engine combines that with Asset Exposure, Business Context, and Controls (all tenant-specific) to output Organizational Priority.

## Decision

Option 2, with `RiskAssessment` (ARGOS) and `DecisionAssessment` (Decision Engine) stored as separate, independently versioned entities (`docs/DOMAIN_MODEL.md` §8).

## Reason

Section 10 is explicit that these are different concepts and must never be merged — a CVE scoring 82/100 is a fact about the CVE; whether that translates to P0 or P3 depends entirely on which asset it's on and that org's context, and can legitimately differ across findings of the *same* CVE. Combining them into one function (option 1) would also break ARGOS's tenant-independence (ADR-006) — asset/business context is inherently organization-scoped, so folding it into ARGOS would immediately couple the vulnerability-intelligence engine to tenancy, undermining its future extractability. Separating them also means a Decision Engine rule change (e.g. adjusting how much internet-facing exposure matters) doesn't require re-deriving Vulnerability Risk, and vice versa.

## No magic score

Within the Decision Engine itself, every input layer must produce `value + evidence + confidence + reason + source` (Section 12, `docs/DECISION_ENGINE.md` §2) — an opaque `final_risk = f(...)` is explicitly disallowed. This is a direct consequence of the product's core promise being explainability, not just a score.

## Tradeoffs

- Two assessments to store, version, and reason about instead of one — accepted; the alternative (one merged score) is unauditable and violates the product's explainability requirement.
- Requires the Decision Engine to explicitly handle cases where context is missing (Unknown ≠ absence of risk) — handled via the same min/max-style reasoning as ARGOS (`docs/DECISION_ENGINE.md` §6).

## What would make us reconsider

No scenario currently anticipated — this separation is foundational to the product thesis (Section 10), not an implementation detail subject to revision based on scale or performance.
