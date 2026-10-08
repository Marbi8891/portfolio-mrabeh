# Contributing

This is a personal portfolio. Contributions come from the owner and from Claude Code agents
working on the owner's behalf. External pull requests are not expected; typo reports are
welcome as issues.

## Workflow

1. Create a branch: `feat/…`, `content/…`, `fix/…`, `docs/…`, `security/…`.
2. Make a small, single-topic change.
3. Content changes: update `docs/FACT_CHECK.md` first, then wording (see `docs/CONTENT_UPDATES.md`).
4. Run `/check-facts`; for releases also `/check-security` and `/review-portfolio`.
5. Open a pull request. The owner reviews and merges.

## Commit messages

[Conventional Commits](https://www.conventionalcommits.org/):
`docs: add SEO plan`, `content(experience): confirm Saudi Arabia dates`,
`security: tighten CSP`, `feat(site): add projects page`.

## Content rules

- Never invent facts. Unknown → `[TO VERIFY]`.
- English master first; translations only from approved English.
- No authority verbs (managed, led, supervised) without a confirmed fact.
- No personal data beyond what FACT_CHECK marks as publishable.

## Code rules (Phase 2)

- No new dependency without an ADR in `docs/DECISIONS.md`.
- No client-side JavaScript on content pages without an ADR.
- Semantic HTML, WCAG 2.2 AA, logical CSS properties.
