# PROJECTS — Technology evidence record

> Projects are **evidence of skills**, not jobs. None of them is a commercial product, client
> engagement or employment unless FACT_CHECK says so (today: none is).
>
> Every project shown on the site needs: a public link (repo, demo or write-up), a factual
> status, and a "what I did" line. Numbers (tests, rules, users) are quoted only after being
> re-checked against the source on the day of publication.

## Labels used on the site

| Label | Meaning |
|---|---|
| `Personal project` | Built on own initiative, outside work. |
| `Academic project` | Built as part of DAW/DAM coursework. |
| `Lab` | Training environment, never touching third-party systems. |
| `Design stage` | Documented design, no working code. |

## Inventory

| Project | Label | Status | Public evidence | Show on portfolio? | FACT_CHECK |
|---|---|---|---|---|---|
| OWASP Web Auditor | Personal project | Active, public, MIT | github.com/Marbi8891/owasp-web-auditor | ✅ Yes — flagship technical evidence | 6.1 |
| NEXARO | Personal project · Design stage | Design package complete, no application code | `nexaro/` in this repo | ✅ Yes — as architecture/design work, clearly labelled | 6.2 |
| tor-osint (OSINT lab tool) | Personal project · Lab | Python CLI + local web UI, test suite | `tor-osint/` in this repo | ⚠️ Yes, framed carefully (see below) | 6.4 |
| Python Learning Dashboard | `[TO VERIFY]` | `[TO VERIFY]` | `[TO VERIFY]` | Pending link | 6.5 |
| E-commerce (DAW) | Academic project | `[TO VERIFY]` | `[TO VERIFY]` | Pending link | 6.6 |
| Cybersecurity labs | Lab | `[TO VERIFY]` | `[TO VERIFY]` (platform profile / write-ups) | Pending | 6.7 |
| `lab-scripts/` | Lab | Two helper scripts | `lab-scripts/` in this repo | ❌ No — reverse-shell helper is a poor first impression for HR/recruiters | 6.7 |
| CLAW, Golytics, Netseer, SYNAPSE, SIGMA 43, Calculadora | — | No public evidence | none | ❌ Not until a repo/demo exists | 6.8 |

## Project notes (draft copy, English)

### OWASP Web Auditor — `Personal project`
- **What it is:** a passive web security posture scanner written in TypeScript. It reviews HTTPS, security headers, cookies, CSP, HSTS, TLS certificate and DNS records of a domain and reports findings with severity. It never sends attack payloads.
- **Why it matters for recruiters:** shows secure-coding practice, testing discipline and OWASP knowledge in code that anyone can inspect.
- **Numbers:** the Spanish site quotes 19 rules / 492 tests (verified 2026-09-09). Re-verify before quoting.

### NEXARO — `Personal project · Design stage`
- **What it is:** design package for a platform that turns security-scanner findings into explained remediation priorities (architecture, data model, risk model, security model, 10 ADRs).
- **Must say:** "design stage — no application code yet."
- **Must not say:** company, product, customers, founder of NEXARO TECH S.L. (FACT_CHECK 6.3).

### tor-osint — `Personal project · Lab`
- **What it is:** local Python tool that collects content from an explicitly listed set of sources via Tor, stores it as evidence (SQLite, SHA-256), extracts indicators (IOCs), and produces HTML reports. Redacts credentials. Does not crawl, log in or interact.
- **Framing for the Gulf:** present as "OSINT methodology and secure data handling in Python". Avoid dark-web imagery and wording; some recruiters/HR screeners will react to ".onion" without context. Consider showing it lower on the page with a clear "lab / research methodology" label.
- **Open:** does this correspond to the "OSINT investigations" in the brief, or is there something else? (FACT_CHECK 6.4)

## What the projects page needs per project (Phase 2 schema)

```yaml
title:        # string
label:        # Personal project | Academic project | Lab | Design stage
status:       # active | completed | design | archived
summary:      # 1–2 sentences, plain English
what_i_did:   # list of concrete contributions
stack:        # technologies actually used in this project
links:        # repo / demo / write-up — at least one required
fact_check:   # FACT_CHECK row id, must be CONFIRMED to build
verified_on:  # date numbers were last re-checked
```
