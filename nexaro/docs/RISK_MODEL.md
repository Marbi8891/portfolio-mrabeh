# NEXARO — Risk Model (ARGOS)

ARGOS is NEXARO's Vulnerability Intelligence engine. It scores **vulnerabilities**, not organizational priority (see [docs/DECISION_ENGINE.md](DECISION_ENGINE.md) for the layer that adds business/asset context). ARGOS is deliberately independent of users, organizations, billing, subscriptions, and the frontend (Section 7) — see [ADR-006](../adr/ADR-006-argos-risk-model.md) for why, and how this enables a future standalone ARGOS API.

## 1. Model: ARGOS-RISK-V1

```
Technical Severity       35
Known Threat Evidence    35
Exploit Probability      30
────────────────────────────
TOTAL                   100
```

| Dimension | Source | Weight |
|---|---|---|
| Technical Severity | CVSS (base score, normalized to 0–35) | 35 |
| Known Threat Evidence | CISA KEV (binary-ish: listed vs not) | 35 |
| Exploit Probability | EPSS (probability, normalized to 0–30) | 30 |

**Rule:** never re-score CVSS sub-metrics (AV, AC, PR, UI) independently — they are already inside the CVSS base score. Scoring them again would double-count the same signal under a different name. Technical Severity is CVSS, full stop.

The score (`RiskAssessment.score_min`/`score_max`) is a property of the **Vulnerability**, computed once and cached — not recomputed per finding (see [docs/JOBS_AND_IMPORTS.md](JOBS_AND_IMPORTS.md#argos-enrichment-at-scale)).

## 2. Uncertainty: `UNKNOWN != ZERO`

If a source is missing or stale, ARGOS does **not** treat the missing dimension as 0. It reports a range:

```
score_min  — computed treating all missing evidence as absent (conservative floor)
score_max  — computed treating all missing evidence as maximally severe (ceiling)
```

Example: CVSS and KEV are known, EPSS fetch failed/never ran:

```
Effective risk: 63   (score_min — what we can currently prove)
Risk ceiling:   98   (score_max — what it could be if EPSS turns out high)
```

The Decision Engine and UI must always surface **both** numbers when they differ — see [docs/DECISION_ENGINE.md](DECISION_ENGINE.md#unknown-semantics) and [docs/UX_SPEC.md](UX_SPEC.md#uncertainty-ux). Collapsing to a single point value (`score = 63`) is a modeling error: it silently claims certainty that doesn't exist and would understate risk for anything still enriching.

## 3. Provenance

Every `Vulnerability` intelligence field is stored with:

```
source            # "nvd", "first-epss", "cisa-kev"
retrieved_at       # when NEXARO fetched it
effective_at        # the date the source claims the value is valid for
model_version        # which ARGOS-RISK-* version last scored this
```

This is what lets the system explain *why* a score is what it is, and lets a future model version be applied retroactively and compared against history (`RiskAssessment` rows are append-only per Vulnerability, per [docs/DATA_MODEL.md](DATA_MODEL.md#6-retention--deletion)).

## 4. EPSS freshness

EPSS scores change daily. Stored fields:

```
score
percentile
epss_date       # the date FIRST published this score for
retrieved_at
```

Scores from incompatible dates are never silently blended — a `RiskAssessment` computed from an `epss_date` older than a configured staleness threshold (`ASSUMPTION`: 7 days for V1, `VERIFY` against FIRST's actual publication cadence) is itself flagged stale, which widens the uncertainty range rather than being treated as current.

## 5. KEV catalog

```
single catalog fetch/cache (scheduled job)
      ↓
local index (CVE → listed/not)
      ↓
per-CVE lookup, O(1) against the local index
```

The full CISA KEV catalog is fetched and cached on a schedule (`ASSUMPTION`: every 6 hours — small catalog, changes infrequently), never re-fetched per CVE lookup. States: `LISTED`, `NOT_LISTED`, `UNKNOWN` (catalog fetch itself failed/stale — this is different from "confirmed not listed" and must not be conflated with it).

## 6. Model versioning

`ARGOS-RISK-V1` is an explicit, named version stored on every `RiskAssessment` and every `Vulnerability`. A future `ARGOS-RISK-V2` (e.g. adjusted weights, an added dimension) is:
- A new named model version, computed alongside (not overwriting) V1 history.
- Never silently swapped in — organizations should be able to see when their priorities shifted because of a model change vs. new evidence.

## 7. What ARGOS explicitly does not do (V1)

- No machine-learning risk model (Section 16 — out of scope for V1; the weighted model above is fully deterministic and auditable).
- No generative-AI-produced scores.
- No re-implementation of CVSS temporal/environmental scoring beyond what's needed to avoid double counting — environmental context (asset exposure, business impact, controls) is deliberately handled one layer up, in the Decision Engine, not folded into ARGOS.
