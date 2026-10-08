# ARCHITECTURE

> Phase 1 delivers documentation, agents and commands only. The `src/` tree below is the
> **proposal** for Phase 2 and does not exist yet. Decisions are justified in
> [`DECISIONS.md`](DECISIONS.md).

## 1. Repository layout

```text
middle-east-career-portfolio/
├── README.md                 # What this is, how to run, how to deploy
├── CLAUDE.md                 # Rules for Claude Code (never invent, fact gating, workflow)
├── CONTRIBUTING.md           # Workflow, commits, content rules
├── SECURITY.md               # Security policy + how to report
├── LICENSE                   # Code MIT, content all rights reserved
├── .gitignore
├── .claude/
│   ├── settings.json         # Denies reading .env / secrets
│   ├── agents/               # profile, content, portfolio, cv, research, review, security
│   └── commands/             # /check-facts, /review-profile, /create-cv, …
├── docs/
│   ├── FACT_CHECK.md         # ⭐ single source of truth for claims
│   ├── PROFILE.md            # master profile + headline analysis
│   ├── EXPERIENCE.md
│   ├── PROJECTS.md
│   ├── SKILLS.md
│   ├── MIDDLE_EAST_TARGET.md
│   ├── ARCHITECTURE.md       # this file
│   ├── DECISIONS.md          # ADRs
│   ├── DEPLOYMENT.md
│   ├── SECURITY_ARCHITECTURE.md
│   ├── SEO.md
│   └── CONTENT_UPDATES.md
│
│   ── Phase 2 (proposed) ──────────────────────────────────────────
├── package.json              # astro, @astrojs/sitemap — nothing else
├── astro.config.mjs          # site URL, i18n (en default, ar, es), sitemap
├── scripts/
│   └── check-facts.mjs       # fails build on non-CONFIRMED refs or "[TO VERIFY]"
├── src/
│   ├── content.config.ts     # Zod schemas: experience, projects, education
│   ├── content/
│   │   ├── experience/en/*.md
│   │   ├── projects/en/*.md
│   │   └── education/en/*.md
│   ├── i18n/                 # ui strings: en.json (ar.json, es.json later)
│   ├── layouts/
│   │   └── BaseLayout.astro  # <head>: title, description, canonical, OG, X, hreflang, JSON-LD, lang/dir
│   ├── components/           # Header, Footer, ExperienceEntry, ProjectEntry, Evidence
│   ├── pages/                # one file per route (see §2)
│   └── styles/
│       ├── tokens.css
│       └── base.css          # logical properties → RTL-ready
├── public/
│   ├── robots.txt
│   ├── favicon.svg
│   ├── og/default.png
│   ├── cv/mrabeh-fathi-cv-en.pdf
│   ├── fonts/                # self-hosted WOFF2 (Latin + Arabic)
│   ├── _headers              # Netlify/Cloudflare-style (optional)
│   └── .htaccess             # Hostinger (Apache/LiteSpeed) headers
├── vercel.json               # security headers for Vercel
└── .github/workflows/
    ├── ci.yml                # build + fact check + link check
    └── pages.yml             # optional GitHub Pages deploy
```

## 2. Routes (English)

| # | Section | Route | Purpose |
|---|---|---|---|
| 1 | Home | `/` | Answers the six recruiter questions in one screen + links to evidence |
| 2 | About | `/about` | Short narrative (PROFILE §4) |
| 3 | Experience | `/experience` | All confirmed roles, newest first |
| 4 | Saudi Arabia Experience | `/experience/saudi-arabia` | Detailed in-country entry; key page for GCC searches |
| 5 | Cybersecurity | `/cybersecurity` | Training + security projects, honest level |
| 6 | Technology & Development | `/technology` | DAW/DAM, Python, web, tooling |
| 7 | Projects | `/projects` | Evidence list (PROJECTS.md), each with public link |
| 8 | Skills | `/skills` | Evidence-based skill table (SKILLS.md) |
| 9 | Education | `/education` | Formal education + training |
| 10 | Languages | `/languages` | Levels on a recognised scale |
| 11 | CV | `/cv` | Summary + PDF download |
| 12 | Contact | `/contact` | Channels, availability, locations open to |
| — | 404 | `/404` | — |

If Skills, Education and Languages are thin once facts are confirmed, they can merge into one
`/qualifications` page; decide in Phase 2 with real content in hand.

Arabic and Spanish mirror the same routes under `/ar/` and `/es/`.

## 3. Content flow

```text
Owner confirms facts ──► docs/FACT_CHECK.md (CONFIRMED)
                               │
                 docs/PROFILE, EXPERIENCE, PROJECTS, SKILLS (master English wording)
                               │
                 src/content/**/en/*.md  (fact_check: ["2.6"])
                               │
           scripts/check-facts.mjs ──✗──► build fails (non-confirmed or [TO VERIFY])
                               │ ✓
                         astro build ──► dist/ (static HTML/CSS, no JS)
                               │
                 Vercel  │  GitHub Pages  │  Hostinger
```

## 4. Non-functional targets

| Area | Target |
|---|---|
| Performance | Lighthouse ≥ 95 all categories on mobile; no client JS on content pages |
| Accessibility | WCAG 2.2 AA: semantic landmarks, contrast, focus styles, skip link, `lang`/`dir` set |
| Mobile | Single-column layout first; readable at 360 px width |
| SEO | One H1 per page, unique title/description, canonical, hreflang, sitemap |
| Security | CSP `default-src 'self'`, no inline scripts, no third-party origins (see SECURITY_ARCHITECTURE.md) |
| Maintainability | Content in Markdown; one layout; ≤ 2 runtime-free dependencies |
