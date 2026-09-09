# ADR-006: ARGOS-RISK-V1 Weighted Model, Kept Independent of Tenancy

## Context

NEXARO needs a Vulnerability Risk score derived from CVSS, EPSS, and CISA KEV, that (a) doesn't double-count CVSS sub-metrics, (b) represents missing evidence honestly, and (c) can plausibly become a standalone product/API later (Section 7).

## Options for the scoring approach

1. **Weighted sum of three independent signal categories** (Technical Severity/CVSS, Known Threat Evidence/KEV, Exploit Probability/EPSS) — deterministic, versioned, explainable.
2. **Re-derive/re-weight CVSS sub-metrics** (AV, AC, PR, UI) as part of the score.
3. **ML-trained risk model** on historical exploitation data.

## Decision

Option 1: `ARGOS-RISK-V1` — Technical Severity 35 / Known Threat Evidence 35 / Exploit Probability 30, sourced respectively from CVSS / CISA KEV / EPSS, with an explicit `score_min`/`score_max` range when evidence is incomplete (`docs/RISK_MODEL.md`).

## Reason

Option 2 is explicitly rejected: AV/AC/PR/UI are already inputs to the CVSS base score that feeds Technical Severity — scoring them again would double-count the same evidence under a different label, inflating scores in a way that's hard to explain or justify (Section 8). Option 3 (ML) is rejected for V1 (Section 16) — a deterministic, auditable formula is a better fit for a product whose core promise is *explainability*; an ML model's "why" is fundamentally harder to render as the plain-language justification `docs/DECISION_ENGINE.md` §5 requires, and there's no training dataset of NEXARO's own outcomes yet to train on responsibly.

## Structural decision: ARGOS stays independent of `identity`/`organizations`/billing

ARGOS scores vulnerabilities, not organizations. Keeping the `risk` module free of dependencies on tenancy/billing/frontend (`docs/ARCHITECTURE.md` §4 dependency rules) is deliberate: it is what makes a future standalone ARGOS API (Section 7, Section 96) a matter of exposing an existing clean boundary, not extracting tangled logic later.

## Tradeoffs

- A fixed weighting (35/35/30) is a design choice, not empirically derived from NEXARO's own outcome data (none exists yet) — accepted for V1, with the model explicitly versioned (`ARGOS-RISK-V1`) so it can be revised without silently rewriting history.
- Uncertainty ranges (`score_min`/`score_max`) are more complex to render in UI than a single number — accepted as a deliberate product tradeoff; see `docs/UX_SPEC.md` §4 for why hiding uncertainty is treated as a defect, not a simplification.

## What would make us reconsider

Enough of NEXARO's own remediation/verification outcome data accumulates to empirically validate or adjust the weights — at which point a new named version (`ARGOS-RISK-V2`) is introduced alongside, not instead of, V1 history (`docs/RISK_MODEL.md` §6).
