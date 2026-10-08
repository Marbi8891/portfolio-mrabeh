---
description: Check every claim in the given files (default: docs/ and site content) against docs/FACT_CHECK.md
argument-hint: "[path or glob — optional]"
---

Use the `review-agent` subagent to fact-check: "$ARGUMENTS" (if empty: docs/ src/content/ (if it exists)).

Then:
1. Show the claim table (claim | file:line | FACT_CHECK row | verdict | fix).
2. List every `[TO VERIFY]` still present and whether it sits in publishable content.
3. List the questions the owner must answer to unblock publication, grouped by FACT_CHECK section, in Spanish.

Do not change any FACT_CHECK status to CONFIRMED. If the owner answers questions in this conversation, propose the exact FACT_CHECK edits and apply them only after they say yes.
