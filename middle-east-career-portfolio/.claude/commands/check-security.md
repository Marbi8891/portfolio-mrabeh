---
description: Security review of the repository and built site (secrets, personal data, CSP, headers, dependencies, links, public files, git history)
argument-hint: "[path — optional]"
---

Use the `security-agent` subagent on "$ARGUMENTS" (if empty: the whole repository and dist/ if present).

Report findings ranked Critical / High / Medium / Low with file:line, impact and the proposed fix. State which checks could not run. Never rewrite git history or push; if a secret is found, tell the owner to rotate it first. Summary in Spanish.
