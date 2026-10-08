# DEPLOYMENT

> Applies from Phase 2, once the Astro site exists. The build always produces a static `dist/`
> folder; only the way it is uploaded and how headers are set differ per host.

## Build

```bash
npm ci
npm run check:facts   # scripts/check-facts.mjs — must pass
npm run build         # astro build → dist/
npm run preview       # local check of dist/
```

Set the production URL in `astro.config.mjs` (`site: "https://<domain>"`) — canonical URLs,
sitemap and Open Graph depend on it.

## Option A — Vercel (recommended)

1. Import the repository in Vercel; framework preset **Astro**; root directory = this folder (or repo root after ADR-001 split).
2. Build command `npm run build`, output `dist`.
3. Security headers come from `vercel.json` (see SECURITY_ARCHITECTURE.md §3).
4. Each pull request gets a preview URL — use it for owner review before merging.
5. Custom domain: add in Vercel → Domains, then DNS records at the registrar.

## Option B — GitHub Pages

1. Repository → Settings → Pages → Source: **GitHub Actions**.
2. Workflow `.github/workflows/pages.yml` using the official `withastro/action` + `actions/deploy-pages`.
3. If served at `https://marbi8891.github.io/<repo>/`, set `base: "/<repo>"` in `astro.config.mjs`. Not needed with a custom domain.
4. **Limitation:** GitHub Pages cannot send custom HTTP headers. CSP is delivered via `<meta http-equiv="Content-Security-Policy">` in the layout; `frame-ancestors`, HSTS preload control and `X-Content-Type-Options` are not available. Acceptable for a static portfolio, but Vercel is preferred.

## Option C — Hostinger (shared hosting)

1. `npm run build` locally or in CI.
2. Upload the **contents** of `dist/` to `public_html/` (File Manager, FTP/SFTP, or Hostinger's Git deployment pointed at a branch containing the built files).
3. `public/.htaccess` is copied into `dist/` by the build and sets security headers, HTTPS redirect and the custom 404 (Hostinger runs LiteSpeed, which reads `.htaccess`).
4. Enable the free SSL certificate in hPanel before turning on the HTTPS redirect.
5. Never upload `node_modules/`, `.env` or the repository's `.git/`.

## Pre-deploy checklist

- [ ] `/check-facts` passes — no non-CONFIRMED references, no `[TO VERIFY]` in `dist/`.
- [ ] `/check-security` passes.
- [ ] CV PDF in `public/cv/` matches the approved FACT_CHECK and has no phone number unless the owner decided otherwise; PDF metadata (author, software) reviewed.
- [ ] `site` URL correct; `sitemap-index.xml` and `robots.txt` reachable.
- [ ] Open Graph image renders (test with a link preview tool).
- [ ] Mobile check at 360 px and 390 px widths.
