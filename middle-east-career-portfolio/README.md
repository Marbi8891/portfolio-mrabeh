# middle-east-career-portfolio

Professional portfolio of **Mrabeh Fathi**, aimed at recruiters and hiring managers in the
GCC (Saudi Arabia, United Arab Emirates, Qatar, Kuwait, Bahrain, Oman).

The profile combines administration and documentation work — including experience in Saudi
Arabia — with Arabic, Spanish and English, and a growing technical track in web development,
Python and cybersecurity.

> **Status: Phase 1 — foundations.** This folder contains the fact base, architecture,
> decisions and Claude Code agents. The website itself is built in Phase 2. Nothing here is
> published yet.

## Principle

Every claim on the site must be backed by a `CONFIRMED` entry in
[`docs/FACT_CHECK.md`](docs/FACT_CHECK.md). Missing information is marked `[TO VERIFY]`,
never guessed.

## Documentation

| File | Purpose |
|---|---|
| [docs/FACT_CHECK.md](docs/FACT_CHECK.md) | What is confirmed and what still needs verification |
| [docs/PROFILE.md](docs/PROFILE.md) | Master profile and headline analysis |
| [docs/EXPERIENCE.md](docs/EXPERIENCE.md) | Experience, facts separated from wording |
| [docs/PROJECTS.md](docs/PROJECTS.md) | Technology projects used as evidence |
| [docs/SKILLS.md](docs/SKILLS.md) | Evidence-based skills |
| [docs/MIDDLE_EAST_TARGET.md](docs/MIDDLE_EAST_TARGET.md) | Target countries, roles, audience, SEO intents |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Repository layout, routes, content flow |
| [docs/DECISIONS.md](docs/DECISIONS.md) | Architecture Decision Records |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Vercel, GitHub Pages, Hostinger |
| [docs/SECURITY_ARCHITECTURE.md](docs/SECURITY_ARCHITECTURE.md) | Threat model, CSP, headers, checklist |
| [docs/SEO.md](docs/SEO.md) | Metadata, sitemap, structured data |
| [docs/CONTENT_UPDATES.md](docs/CONTENT_UPDATES.md) | How to update content safely |

## Planned stack (Phase 2)

[Astro](https://astro.build) with static output, no client-side framework, plain CSS. The
visitor receives plain HTML and CSS. Rationale in [ADR-002](docs/DECISIONS.md#adr-002--static-site-generator-astro-no-ui-framework).

## Working with Claude Code

Open Claude Code in this folder. Agents are in `.claude/agents/`, commands in
`.claude/commands/`:

`/check-facts` · `/review-profile` · `/review-portfolio` · `/check-security` ·
`/update-project` · `/create-cv` · `/research-company`

## License

Code: MIT. Content (text, CV, images): all rights reserved. See [LICENSE](LICENSE).
