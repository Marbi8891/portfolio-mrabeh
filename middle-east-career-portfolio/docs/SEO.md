# SEO plan

> Search intents and page mapping are in `MIDDLE_EAST_TARGET.md` §5. This file defines the
> technical SEO that the shared layout must implement in Phase 2.

## Per-page metadata (BaseLayout props)

| Element | Rule |
|---|---|
| `<title>` | `<Page topic> — Mrabeh Fathi` · ≤ 60 characters · unique |
| `meta description` | 140–160 characters, factual, written for humans, unique |
| `link rel="canonical"` | Absolute URL from `site` + path, no trailing duplicates |
| `hreflang` | `en`, `ar`, `es`, `x-default` (→ en) once translations exist |
| `html lang` / `dir` | `en`/`ltr`, `ar`/`rtl`, `es`/`ltr` |
| Open Graph | `og:type`, `og:title`, `og:description`, `og:url`, `og:image` (1200×630), `og:locale` |
| X / Twitter | `twitter:card=summary_large_image`, title, description, image |
| Headings | One H1 per page; logical H2/H3 |

## Files

- `sitemap-index.xml` via `@astrojs/sitemap` (excludes 404).
- `robots.txt`: allow all, link to sitemap. Nothing secret relies on robots (it is public).

## Structured data (JSON-LD)

| Page | Type | Only with confirmed facts |
|---|---|---|
| Home / About | `Person` (`name`, `url`, `sameAs` GitHub/LinkedIn, `knowsLanguage`, `address.addressLocality = Madrid`) | `jobTitle` only after headline is approved |
| Home | `WebSite` | — |
| Project pages | `SoftwareSourceCode` (`codeRepository`, `programmingLanguage`) | only public repos |
| CV | `ProfilePage` | — |

Never include phone, birth date, nationality or `alumniOf` entries that are not CONFIRMED.

## Anti-patterns

- Keyword lists in footers or hidden text.
- Repeating "Saudi Arabia" in every heading.
- Claiming job titles in `jobTitle` that the owner has not held.
- Separate thin pages per country ("Jobs in Qatar") without real content.
