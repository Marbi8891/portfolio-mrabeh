# NEXARO — UX Information Architecture

## 1. Navigation (Section 57)

```
Overview · Findings · Assets · Imports · Remediation · History · API · Settings
```

No decorative charts on Overview for their own sake (Section 57) — every element on the home screen answers a question the user actually has.

## 2. Home / Overview (Section 58)

Central question: **What requires attention now?**

```
P0 items
P1 items
Overdue remediations
Findings with incomplete intelligence (ARGOS still enriching / stale)
Reopened findings
```

This is a work queue, not a KPI dashboard. Anything that doesn't help answer "what requires attention now" doesn't belong here.

## 3. Finding Detail (Section 59)

The single most information-dense page in the product — must clearly show, in this order:

```
Finding                      (asset, status, source, first/last seen)
  Asset                        (context: criticality, exposure, environment)
  Vulnerability
    ARGOS Intelligence            CVSS · EPSS · KEV
    Vulnerability Risk               (score_min–score_max, per docs/RISK_MODEL.md)

  Asset Exposure                    (docs/DECISION_ENGINE.md inputs)
  Business Context
  Controls

  Organizational Priority             P0–P4
  WHY                                    (explanation bullets, docs/DECISION_ENGINE.md §5)

  Remediation                          (owner, due date, status, recommended action)
  Verification                           (method, result, verifier, timestamp)
  Evidence                                (FindingEvidence list — which scanners, when)
```

The **WHY** section is not optional decoration — it is the product's core value proposition rendered directly (Section 59, [docs/DECISION_ENGINE.md](DECISION_ENGINE.md#5-explainability-example)).

## 4. Uncertainty UX (Section 60)

When evidence is incomplete, the UI never collapses to a single confident-looking number. It shows the range and names what's missing:

```
63 ───────────────────────── 98
Effective                 Ceiling
P1                        P0
```

```
Missing CISA KEV intelligence
Provider timeout
Up to 35 points unresolved
```

This mirrors the `score_min`/`score_max` model in [docs/RISK_MODEL.md](RISK_MODEL.md#2-uncertainty-unknown--zero) and the Decision Engine's unknown semantics ([docs/DECISION_ENGINE.md](DECISION_ENGINE.md#6-unknown-semantics)). Hiding uncertainty is treated as a product defect, not a simplification.

## 5. Accessibility (Section 61)

Target: **WCAG 2.2 AA**. State never relies on color alone — every status/priority indicator pairs color with an icon and a text label (e.g. "P0 — Immediate," not just a red dot). Keyboard navigability and screen-reader labeling apply across all interactive views, including the Finding Detail's dense layout above.

## 6. Design system (Section 62)

```
professional · minimal · information-dense where useful
```

Explicitly avoiding hacker-aesthetic cliché (green-on-black terminal styling, skulls, etc.) — conceptual inspiration: Linear, GitHub, Sentry, and comparable modern security/dev tooling. Density is earned by information value (e.g. the Finding Detail page), not applied uniformly — Overview stays sparse and queue-like (§2).

## 7. Theming (Section 63)

Dark, light, and system-preference modes supported. Dark may be the primary/default visual identity, but light is not an afterthought — both meet the same AA contrast requirements.

## 8. Loading / partial / error states (Section 126 of the process, applied here)

Every data-bearing view defines explicit states, not just a spinner-then-content binary:
```
loading            — skeleton, not a blocking full-page spinner where avoidable
partial            — e.g. finding loaded, ARGOS intelligence still enriching (shown as its own sub-state, not blocking the rest of the page)
empty              — e.g. no findings yet, with a clear next action (import)
error              — with request_id shown/available for support, per docs/API_SPEC.md
```
The "partial" state matters specifically because ARGOS enrichment is asynchronous ([docs/JOBS_AND_IMPORTS.md](JOBS_AND_IMPORTS.md)) — a freshly imported finding legitimately exists before its intelligence is fully populated, and the UI must represent that honestly rather than showing a misleadingly complete-looking page.
