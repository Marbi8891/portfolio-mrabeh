---
description: Full pre-release review of the portfolio — facts, content quality, SEO, accessibility, performance and security
argument-hint: "[page or section — optional]"
---

Scope: "$ARGUMENTS" (if empty: the whole portfolio).

Run, in this order, and collect results:
1. `review-agent` — facts and wording across docs and `src/content/`.
2. `portfolio-agent` — build, routes vs docs/ARCHITECTURE.md §2, metadata per docs/SEO.md, heading structure, alt text, contrast/focus issues, client JS present, mobile layout at 360 px.
3. `security-agent` — checklist in docs/SECURITY_ARCHITECTURE.md.

Report a single prioritised list (Blocker / Should fix / Nice to have) with file:line. Do not fix anything without approval. Summary for the owner in Spanish.
