# DECISIONS — Architecture Decision Records

Format: context → options → decision → consequences. Status: `PROPOSED` (awaiting owner),
`ACCEPTED`, `SUPERSEDED`.

---

## ADR-001 — Where the project lives

- **Status:** PROPOSED
- **Context:** The brief asks for a new project `middle-east-career-portfolio`. The existing public repo `Marbi8891/portfolio-mrabeh` already hosts the Spanish site (`mrabeh-portfolio/`), NEXARO, `tor-osint` and lab scripts. The Spanish site serves a different audience (Spanish clients and employers, Spanish language).
- **Options:** (a) rewrite the Spanish site; (b) new folder in this repo; (c) new dedicated repository.
- **Decision:** (b) for Phase 1: a self-contained folder `middle-east-career-portfolio/` with its own README, CLAUDE.md, `.claude/` and docs. Nothing in `mrabeh-portfolio/` is modified.
- **Consequences:** Zero risk to the live Spanish site. Recommended next step: move the folder to its own repository before Phase 2 (`git subtree split --prefix=middle-east-career-portfolio`), because a dedicated repo makes GitHub Pages/Vercel setup, CI and the recruiter-facing GitHub page cleaner. Claude Code must be opened **inside this folder** so it picks up `.claude/agents` and `.claude/commands`.

## ADR-002 — Static site generator: Astro (no UI framework)

- **Status:** PROPOSED
- **Context:** 12 pages, mostly text; English first, Arabic (RTL) and Spanish later; strong SEO; strict security; deploy to Vercel, GitHub Pages and Hostinger; must stay easy to edit.

| Criterion | Plain HTML/CSS/JS | Astro (static, no UI framework) | Next.js |
|---|---|---|---|
| JS shipped to visitor | 0 | 0 by default | React runtime on every page |
| Shared layout (header, footer, meta) | Copy-pasted in 12 files (×3 languages = 36) | One layout component | One layout component |
| Content in Markdown with schema validation | No | Yes (content collections + Zod) | Possible, more setup |
| i18n routing + RTL | Manual | Built-in i18n routing | Built-in, but server-oriented |
| Sitemap | Manual | Official integration | Plugin / manual |
| Output | Static files | Static files (`dist/`) | Static export loses features (image optimisation, middleware, headers) |
| Hostinger shared hosting | Yes | Yes (upload `dist/`) | Only with static export |
| Dependencies / attack surface | None | Small (Astro + sitemap) | Large |
| Learning value for a DAW student | High | High (HTML-first, components) | High, but overkill here |

- **Decision:** Astro, static output, no React/Vue/Svelte, no Tailwind.
- **Why not plain HTML:** acceptable for a one-language, one-page site. With 12 pages × 3 languages, duplicated `<head>` metadata and navigation becomes the main source of errors (wrong canonical, stale hreflang, broken links). Astro keeps the *output* identical to hand-written HTML while removing duplication.
- **Why not Next.js:** solves problems this site does not have (server rendering, API routes, dynamic data) and its static export disables part of what it is chosen for.
- **Consequences:** Node.js needed only at build time. The visitor receives plain HTML + CSS. Revisit only if a real dynamic need appears.

## ADR-003 — Styling: plain CSS with design tokens

- **Status:** PROPOSED
- **Decision:** One `tokens.css` (colours, spacing, type scale) + `base.css`. CSS logical properties (`margin-inline-start`, `padding-inline`) everywhere so the Arabic RTL version works by setting `dir="rtl"` only. No CSS framework.
- **Consequences:** Small CSS, no build plugin, easy to read. Visual design is deferred to Phase 2 (brief: no final design yet).

## ADR-004 — English master content, translations later

- **Status:** PROPOSED
- **Decision:** English is the master. `docs/*.md` hold the approved facts; site content lives in `src/content/<collection>/en/`. Arabic and Spanish files are created only from an approved English version and record which version they translate (`translated_from: <git commit>`). No automatic translation is published without owner review — especially Arabic, which recruiters will judge directly.
- **URLs:** `/` (en), `/ar/`, `/es/`; `hreflang` alternates in the shared layout.

## ADR-005 — Fact gating at build time

- **Status:** PROPOSED
- **Decision:** Each content entry declares the FACT_CHECK row(s) it relies on (`fact_check: ["2.6", "2.7"]`). A small Node script runs before `astro build` and fails the build if (1) any referenced row is not `CONFIRMED`, or (2) the built HTML contains `[TO VERIFY]`.
- **Consequences:** The "never invent" rule is enforced by tooling, not memory.

## ADR-006 — No contact form in v1

- **Status:** PROPOSED
- **Context:** A form needs a backend or third-party service (spam handling, personal-data processing, extra CSP origins, secrets). The existing Spanish site already went through a Formspree placeholder → mailto → Resend function cycle.
- **Decision:** v1 offers LinkedIn + email link + CV download. Revisit a form only if recruiters ask for it.
- **Consequences:** No server code, no secrets, no GDPR processor for v1.

## ADR-007 — No third-party scripts, self-hosted fonts

- **Status:** PROPOSED
- **Decision:** No analytics, tag managers, chat widgets or Google Fonts in v1. Fonts (Latin + Arabic) are self-hosted WOFF2. If analytics is later needed, prefer a cookieless, privacy-first option and document it here.
- **Consequences:** CSP can be `default-src 'self'`; no cookie banner needed.

## ADR-008 — Hosting target

- **Status:** PROPOSED
- **Decision:** Build once, deploy the same `dist/` anywhere. Primary recommendation: **Vercel** (free tier, custom headers via `vercel.json`, preview deployments per PR). GitHub Pages and Hostinger remain supported (see `DEPLOYMENT.md`), with the caveat that GitHub Pages cannot send custom security headers.
