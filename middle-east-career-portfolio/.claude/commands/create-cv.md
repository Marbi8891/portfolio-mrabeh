---
description: Create an English CV draft (general or tailored to a role / job ad) from CONFIRMED facts only
argument-hint: "[target role, company or pasted job ad — optional]"
---

Target: "$ARGUMENTS" (if empty: general GCC CV (administration + technology)).

1. Use the `cv-agent` subagent to produce the draft in `private/cv/` (git-ignored).
2. Then use the `review-agent` subagent on the draft.
3. Tell the owner (in Spanish): where the draft is, which `[TO VERIFY]` items block sending it, which personal-data decisions they must make (phone, nationality, photo, visa status), and which job-ad requirements the CV deliberately does NOT claim because they are not confirmed.
