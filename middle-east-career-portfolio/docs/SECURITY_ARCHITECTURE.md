# SECURITY_ARCHITECTURE

Security is designed in from Phase 1. The site is static, so most risk comes from **what is
published** (personal data, secrets, misleading claims) rather than from server code.

## 1. Threat model (short)

| Asset | Threat | Control |
|---|---|---|
| Owner's personal data | Over-exposure (phone, address, ID, visa status) harvested by scrapers/scammers | FACT_CHECK `DO NOT PUBLISH` status; no phone on site; PDF reviewed before upload |
| Email address | Spam / phishing | Dedicated contact address; no plain address in HTML if possible (see §5) |
| Reputation | Inaccurate or inflated claims discovered by an employer | Fact gating (ADR-005); review agent |
| Visitors | XSS / injected third-party scripts | No user input, no third-party scripts, strict CSP |
| Repository | Leaked secrets, sensitive history | `.gitignore`, `.claude/settings.json` deny list, secret scanning, history review |
| Recruiter trust | Offensive-security tooling at first glance | `lab-scripts/` not linked from the portfolio |

## 2. Content Security Policy (target)

```text
default-src 'self';
script-src 'self';
style-src 'self';
img-src 'self' data:;
font-src 'self';
connect-src 'self';
object-src 'none';
base-uri 'self';
form-action 'none';
frame-ancestors 'none';
upgrade-insecure-requests
```

- No `'unsafe-inline'`: Astro must be configured to emit styles as files (no inline `<style>`/`<script>`); verify in `dist/`.
- `form-action 'none'` while there is no form (ADR-006).
- On GitHub Pages this policy goes in a `<meta>` tag (without `frame-ancestors`, which meta does not support).

## 3. Security headers (Vercel / Hostinger)

| Header | Value |
|---|---|
| `Content-Security-Policy` | as §2 |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` (add `preload` only after deliberate decision) |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), interest-cohort=()` |
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `X-Frame-Options` | `DENY` (legacy fallback for `frame-ancestors`) |

Do **not** set `X-XSS-Protection` (deprecated; the existing Spanish site still does).

## 4. Checklist by topic (from the brief)

| Topic | Rule |
|---|---|
| XSS | No user input; content is Markdown authored by the owner; never use `set:html` with external data. |
| Forms | None in v1 (ADR-006). Any future form: server-side validation, rate limit, honeypot, no secrets client-side, privacy notice. |
| Email exposure | See §5. |
| Dependencies | Only `astro` + `@astrojs/sitemap`. `npm ci` with lockfile; `npm audit` in CI; Dependabot weekly. Pin versions. |
| JavaScript | No client JS on content pages. Any island must be justified in DECISIONS.md. |
| CSP | §2; verified on the deployed site with browser dev tools / an observatory scan. |
| Security headers | §3. |
| External links | `rel="noopener noreferrer"` on `target="_blank"`; prefer same-tab links; HTTPS only; review link targets each release. |
| Generated content | AI-drafted text is a draft: it passes `/check-facts` and owner review before merge. |
| Public files | Everything in `public/` is public. Review CV PDF metadata; no drafts, no scans of certificates, no ID documents. |
| Secrets | None needed for a static site. Never commit tokens; `.env*` ignored and denied to Claude. |
| `.env` | Only `.env.example` may be committed, with placeholder values. |
| Git history | Before making a repo public or splitting it (ADR-001), scan history (`gitleaks detect` or GitHub secret scanning). A secret ever committed is rotated, not just deleted. |

## 5. Email exposure options

| Option | Trade-off |
|---|---|
| Plain `mailto:` | Best UX, most spam. |
| Address rendered as text with a dedicated alias | Good balance — **recommended**: create an alias only for this portfolio and filter it. |
| JS-obfuscated address | Needs JS and CSP exception; weak against modern scrapers. Not recommended. |
| Contact via LinkedIn only | No spam, but some recruiters prefer email. |

## 6. Findings about the existing repository (not changed in Phase 1)

- The public Spanish CV PDF (`mrabeh-portfolio/.../public/cv-mrabeh-fathi.pdf`) contains a mobile phone number. Decide whether that is intended.
- `lab-scripts/lab_reverse_shell.py` is in a repo linked from CVs. It is documented and restricted to private IPs, but recruiters and HR screeners will not read that. Consider moving it to a separate repository.
- The existing `_headers` uses `X-XSS-Protection` (deprecated) and `'unsafe-inline'` for styles.
