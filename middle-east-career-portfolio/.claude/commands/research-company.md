---
description: Research a company (GCC presence, projects, matching roles) before applying
argument-hint: "<company name> [country]"
---

Company: $ARGUMENTS

Use the `research-agent` subagent. Produce `private/research/<company-slug>.md` with:
- What the company does and where it operates in the GCC (sourced, dated).
- Current or recent projects relevant to the owner's profile (construction, administration, technology).
- Open or typical roles that match the owner's CONFIRMED facts (link to the FACT_CHECK rows), and roles that do not match yet and why.
- Relevance of Arabic/Spanish (e.g. Spanish parent company, Spanish-speaking partners) — only if sourced.
- Localisation constraints that may affect the matching roles in that country.
- Sources with access dates.

Finish with a short Spanish summary for the owner: fit, risks, suggested angle for the CV.
