# NEXARO — Decision Engine

## 1. Purpose

The Decision Engine answers the organization-specific question: **given this vulnerability's risk, on this asset, in this business, with these controls — how urgently should we act?** Its output is the **Organizational Priority**, always kept distinct from **Vulnerability Risk** (ARGOS's output — see [docs/RISK_MODEL.md](RISK_MODEL.md)). See [ADR-007](../adr/ADR-007-decision-engine-separation.md) for why these are architecturally separate modules, not one scoring function.

```
ARGOS Vulnerability Intelligence
            │
            ▼
    Vulnerability Risk

            +

      Asset Exposure

            +

      Business Impact

            +

     Control Context

            ↓

       DECISION ENGINE

            ↓

Organizational Priority
```

## 2. No magic score

Prohibited:

```python
final_risk = magic_formula(...)  # opaque, unexplained
```

Every input layer to the Decision Engine must produce, at minimum:

```
value          # the layer's contribution
evidence         # what data backed it
confidence         # how complete that evidence is
reason              # short human-readable justification
source                # which module/record produced it
```

The Decision Engine composes these into a priority **and a structured explanation**, stored together in `DecisionAssessment.explanation` ([docs/DATA_MODEL.md](DATA_MODEL.md)). If a decision can't be explained, it isn't produced.

## 3. Decision dimensions (V1)

| Dimension | Inputs | Source module |
|---|---|---|
| Vulnerability Intelligence | CVSS, EPSS, KEV → Vulnerability Risk | risk (ARGOS) |
| Asset Exposure | `internet_facing`, `environment`, `network_zone`, `service_exposure`, `external_accessibility` | assets |
| Business Context | `criticality`, `data_sensitivity`, `business_process`, `availability_requirement`, `revenue_dependency` | assets (extended context) |
| Controls | `network_segmentation`, `WAF`, `EDR`, `MFA`, `patch_status`, `compensating_controls` | assets (extended context) / remediation |

Not every organization will populate every field. **Unknown is preserved as Unknown** — it is never defaulted to "no control present" or "not exposed," both of which would bias priority in unpredictable directions. Instead, missing inputs widen the priority's uncertainty and are named explicitly in the explanation (Section 13; see `docs/RISK_MODEL.md` §2 for the analogous rule at the ARGOS layer).

## 4. Priority scale

```
P0 — IMMEDIATE
P1 — URGENT
P2 — HIGH
P3 — PLANNED
P4 — ROUTINE
```

Priority is a function of Vulnerability Risk **combined with** the three context layers — a high-risk CVE on an internet-facing, revenue-critical asset with no compensating controls can be P0, while the same CVE on an isolated, non-critical internal test asset may be P2–P3. The mapping from combined evidence to a discrete P0–P4 band is defined in the Decision Engine's rule table (implementation detail — the important architectural constraint is that the table's inputs are exactly the four dimensions above, each with evidence/confidence attached, and its output is always paired with an explanation).

## 5. Explainability example

```
P0

WHY?

• CISA KEV confirms known exploitation.
• EPSS exploitation probability is high.
• The affected asset is Internet-facing.
• The asset supports a critical production service.
• No compensating network control is documented.
```

Every bullet traces back to a specific field with its own evidence/confidence/source, per Section 2. This is rendered directly in the Finding Detail page ([docs/UX_SPEC.md](UX_SPEC.md#finding-detail)).

## 6. Unknown semantics

When a dimension has no data (e.g. no business context has been entered for an asset), the Decision Engine:
1. Computes priority using only known dimensions.
2. Reports what's missing and how much it could move the result — mirroring ARGOS's `score_min`/`score_max` at this layer (e.g. "Priority could rise from P2 to P0 if asset criticality is confirmed as Critical").
3. Never presents an Unknown-derived priority with the same confidence as a fully-evidenced one — the UI distinguishes them (see [docs/UX_SPEC.md](UX_SPEC.md#uncertainty-ux)).

## 7. Versioning

Like ARGOS, the Decision Engine's rule table is a named, versioned model (`DECISION-V1`), stored on every `DecisionAssessment`. Changing the rules produces a new version; existing history isn't silently rewritten, so organizations can see whether a priority changed because of new evidence or a model update.

## 8. Explicitly out of scope for V1

- No attack-graph or attack-path reasoning across multiple findings (Section 16).
- No ML-trained priority model — the rule table is deterministic and inspectable.
- No cross-organization benchmarking/scoring in V1.
