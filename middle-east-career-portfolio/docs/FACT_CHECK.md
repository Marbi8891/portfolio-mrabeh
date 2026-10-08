# FACT_CHECK — Single source of truth for every published claim

> **Rule:** nothing reaches the public site, the CV or a recruiter message unless its row here is
> `CONFIRMED`. Every other status blocks publication. When in doubt, the claim stays out or is
> shown as `[TO VERIFY]` in drafts only.
>
> Last reviewed: 2026-10-08 (Phase 1, initial version). Owner of truth: Mrabeh Fathi.
> This repository is **public**: do not add phone numbers, ID numbers, salaries, home address or
> scans of documents to this file. Record *that* evidence exists and where it is kept privately.

## Status legend

| Status | Meaning | Can be published? |
|---|---|---|
| `CONFIRMED` | Stated by the owner **and** backed by evidence already reviewed (document, public repo, record). | Yes, in the wording given in the "Safe wording" column. |
| `STATED` | Stated by the owner in the Phase 1 brief, but details or evidence are still missing. | No. Needs the questions in the row answered first. |
| `REPO-ONLY` | Appears in the existing `mrabeh-portfolio` site/CV in this repo but was **not** in the Phase 1 brief. | No. The owner must reconfirm it for this portfolio. |
| `TO VERIFY` | Open question. No claim may be built on it. | No. |
| `CONFLICT` | Two sources disagree. | No, until resolved. |
| `DO NOT PUBLISH` | True, but private or risky to show publicly. | Never on the public site. |

Sources referenced below:

- **[BRIEF]** — Phase 1 project brief written by the owner (2026-10-08).
- **[REPO-CV]** — `mrabeh-portfolio/mrabeh-portfolio/public/cv-mrabeh-fathi.pdf` (Spanish CV generated in Sept 2026).
- **[REPO-ADR4]** — `mrabeh-portfolio/mrabeh-portfolio/docs/portfolio-v2/DECISIONS.md` ADR-004, which records employment dates taken from the owner's *informe de vida laboral* (July 2026). The document itself is not in the repo.
- **[REPO-SITE]** — data files and pages of the existing Spanish site (`src/data/*.ts`, `src/pages/*.tsx`).
- **[REPO-CODE]** — folders present in this repository (`nexaro/`, `tor-osint/`, `lab-scripts/`).

---

## 1. Identity and contact

| # | Claim | Status | Source | Safe wording / note | Open question |
|---|---|---|---|---|---|
| 1.1 | Name: Mrabeh Fathi | `CONFIRMED` | [BRIEF], [REPO-CV] | "Mrabeh Fathi" | Should the second surname (Boussayff, used in [REPO-CV]) appear on the English site? |
| 1.2 | Based in Madrid, Spain | `CONFIRMED` | [BRIEF], [REPO-CV] | "Based in Madrid, Spain" | — |
| 1.3 | GitHub: `Marbi8891` | `CONFIRMED` | Public GitHub account | github.com/Marbi8891 | — |
| 1.4 | LinkedIn: linkedin.com/in/mrabehfathi | `REPO-ONLY` | [REPO-CV] | — | Is this the profile to show? Is it in English? |
| 1.5 | Professional email | `REPO-ONLY` | [REPO-CV], [REPO-SITE] | — | Which address should Middle East recruiters use? Consider a dedicated address on your own domain. See `SECURITY.md` on email exposure. |
| 1.6 | Phone number | `DO NOT PUBLISH` | [REPO-CV] | Not on the public site. Only in the PDF CV sent directly, if you decide so. | Do you want a GCC-reachable number / WhatsApp on the CV? |
| 1.7 | Personal domain `mrabehfathi.com` | `REPO-ONLY` | [REPO-SITE] ADR-007 | — | Will this portfolio live on that domain, a subdomain, or a new one? |
| 1.8 | Availability ("Immediate") | `REPO-ONLY` | [REPO-SITE] About page | — | Current availability and notice period? |
| 1.9 | Willing to relocate to the GCC | `TO VERIFY` | — | — | Which countries? Open to on-site / rotation / camp-based roles? |
| 1.10 | Nationality / visa / work-permit status | `DO NOT PUBLISH` | — | Never on the public site. | Recruiters will ask; decide what goes in a direct CV only. |
| 1.11 | Driving licence (Spain / GCC) | `TO VERIFY` | — | — | Do you hold one? Valid for conversion in KSA/UAE? |

## 2. Saudi Arabia experience

| # | Claim | Status | Source | Safe wording / note | Open question |
|---|---|---|---|---|---|
| 2.1 | Worked in Saudi Arabia | `CONFIRMED` | [BRIEF], [REPO-ADR4] | "Professional experience in Saudi Arabia" | — |
| 2.2 | Dates: 05/01/2025 – 05/03/2025 | `CONFLICT` | [REPO-ADR4] (vida laboral); [REPO-CV] says "Jan–Mar 2025" | Do not show dates yet. | Is this the full period? Was any part of the stay employed by a non-Spanish entity (which would not appear in the *vida laboral*)? |
| 2.3 | Employer: OSSA | `REPO-ONLY` | [REPO-ADR4], [REPO-CV] | — | Exact legal name of the employer? Spanish or Saudi entity? Was it a subcontractor? |
| 2.4 | Project: NEOM – Trojena, Tabuk | `REPO-ONLY` | [REPO-CV], [REPO-SITE] | — | Are you allowed to name the client/project publicly (confidentiality clauses are common on giga-projects)? |
| 2.5 | Job title | `TO VERIFY` | [BRIEF] example uses "auxiliar administrativo de obra"; [REPO-CV] says "Apoyo administrativo" | — | Exact title on the contract? |
| 2.6 | Administrative / site environment | `STATED` | [BRIEF] | Draft: "Administrative support in an international construction environment in Saudi Arabia." | Confirm wording. |
| 2.7 | Workforce documentation | `STATED` | [BRIEF] | — | Which documents (onboarding files, IDs, permits, training records, site access)? |
| 2.8 | Timekeeping | `STATED` | [BRIEF] | — | Daily/weekly timesheets? Which tool (Excel, SAP, other)? Did you prepare or only record them? |
| 2.9 | Contracts and documentation | `STATED` | [BRIEF] | — | Employment contracts, subcontractor documents, or both? Prepare, file or track? |
| 2.10 | Reports | `STATED` | [BRIEF] | — | What reports, how often, for whom? |
| 2.11 | HR / site coordination | `STATED` | [BRIEF] | Keep as "support", never "managed", until confirmed. | What exactly did you coordinate and with whom? |
| 2.12 | Arabic–Spanish translation | `STATED` | [BRIEF] | — | Oral, written, or both? Between which teams? |
| 2.13 | International construction environment | `STATED` | [BRIEF] | — | Nationalities / languages on site (only if you want to mention it)? |
| 2.14 | Workforce of approx. 40–60 workers | `STATED` | [BRIEF] | — | Is 40–60 the number of workers whose documentation you handled, or the site total? Publish only once clear. |
| 2.15 | PRL / CAE tasks in Saudi Arabia | `TO VERIFY` | Not in [BRIEF] experience list | Do not link PRL/CAE to Saudi Arabia. | Did any safety-documentation work happen there? |

## 3. Other experience (Spain)

All of these come from the existing Spanish CV, not from the Phase 1 brief. They are relevant
(especially construction administration) but must be reconfirmed.

| # | Claim | Status | Source | Open question |
|---|---|---|---|---|
| 3.1 | Construcciones Sánchez Domínguez – Sando, administrative support, 17/10/2023 – 15/12/2023 | `REPO-ONLY` | [REPO-ADR4], [REPO-CV] | Tasks? Was this where PRL/CAE work happened? |
| 3.2 | Ayuntamiento de Leganés, administrative management, 30/04/2021 – 29/10/2021 | `REPO-ONLY` | [REPO-ADR4], [REPO-CV] | Tasks; type of contract (employment plan, internship)? |
| 3.3 | Agencia Local de Empleo, administrative support, 15/12/2017 – 14/06/2018 | `REPO-ONLY` | [REPO-ADR4], [REPO-CV] | Which municipality? |
| 3.4 | Fundación COCEMFE, La Rueca, Coolaboro, Contesta Teleservicios ("short placements") | `REPO-ONLY` | [REPO-CV] | Employment or internships? Dates? Worth including? |
| 3.5 | PRL experience | `STATED` | [BRIEF] (professional area) | Where, when, what tasks? Any PRL training certificate (e.g. basic level 50/60 h)? |
| 3.6 | CAE experience (coordinación de actividades empresariales) | `STATED` | [BRIEF] (professional area) | Where, when? Which platform (e.g. CTAIMA, Metacontratas, Dokify, other)? |
| 3.7 | Construction administration | `STATED` | [BRIEF] | Beyond Saudi Arabia and Sando, any other site? |
| 3.8 | HR documentation / workers' documentation | `STATED` | [BRIEF] | Where, besides Saudi Arabia? |
| 3.9 | Operations | `STATED` | [BRIEF] (professional area) | Which concrete tasks support this label? Otherwise it stays as a *target role*, not an experience claim. |

## 4. Education and training

| # | Claim | Status | Source | Open question |
|---|---|---|---|---|
| 4.1 | CFGM Gestión Administrativa | `STATED` | [BRIEF] | Centre, completion year, completed (title obtained)? Not present in [REPO-CV]. |
| 4.2 | DAW (Desarrollo de Aplicaciones Web) | `STATED` | [BRIEF], [REPO-CV] says "DAW/DAM, FP Aspasia, Leganés, in progress" | In progress or completed? Expected completion date? |
| 4.3 | DAM (Desarrollo de Aplicaciones Multiplataforma) | `REPO-ONLY` | [REPO-CV], owner profile says "student of DAM and DAW" | Studying both simultaneously? Same centre? |
| 4.4 | AI and Cybersecurity training | `STATED` | [BRIEF] | Provider, hours, year, certificate? |
| 4.5 | Blue Team training | `STATED` | [BRIEF] | Provider, hours, year, certificate? |
| 4.6 | Red Team training | `STATED` | [BRIEF] | Provider, hours, year, certificate? Present as "training", never as offensive-security experience. |
| 4.7 | SAP Logistics / MM | `STATED` | [BRIEF]; also mentioned in [REPO-SITE] AUDIT | Provider, hours, year, certificate? Official SAP certification or course? |
| 4.8 | eJPT (in progress) | `REPO-ONLY` | [REPO-CV] | Still in progress? Exam date? Never show as obtained until passed. |
| 4.9 | PCAP (in progress) | `REPO-ONLY` | [REPO-CV] | Still in progress? |
| 4.10 | "Additional technology and cybersecurity training" | `TO VERIFY` | [BRIEF] | List each item with provider and year, or drop it. |

> Middle East note: GCC employers and visa processes often require **attested** qualifications.
> Record which titles you can get attested (Spain → embassy) — see `MIDDLE_EAST_TARGET.md`.

## 5. Languages

| # | Claim | Status | Source | Open question |
|---|---|---|---|---|
| 5.1 | Arabic | `CONFIRMED` (language) / `TO VERIFY` (level) | [BRIEF]; [REPO-CV] says native | Native speaker? Written Modern Standard Arabic level? Which dialect? (Matters for formal correspondence in the Gulf.) |
| 5.2 | Spanish | `CONFIRMED` (language) / `TO VERIFY` (level) | [BRIEF]; [REPO-CV] says native | — |
| 5.3 | English | `CONFIRMED` (language) / `TO VERIFY` (level) | [BRIEF] | — |
| 5.4 | TOEIC 950 | `REPO-ONLY` | [REPO-CV], [REPO-SITE] | Year taken? Listening & Reading only, or also Speaking & Writing? Certificate available? |
| 5.5 | TOEFL iBT 102/120 | `REPO-ONLY` | [REPO-CV] | Year taken? (TOEFL scores are reported as valid for 2 years.) |

## 6. Technology projects

| # | Project | Status | Evidence | Safe wording | Open question |
|---|---|---|---|---|---|
| 6.1 | OWASP Web Auditor | `CONFIRMED` (exists, public) | Public repo `github.com/Marbi8891/owasp-web-auditor`; evidence table in `mrabeh-portfolio/.../docs/portfolio-v2/owasp-web-auditor-evidence.md` | "Personal open-source project: passive web security posture scanner (TypeScript)." | Re-check test/rule counts on the repo before quoting any number. |
| 6.2 | NEXARO | `CONFIRMED` (design only) | `nexaro/` folder in this repo: design package, 10 ADRs, README states *no application code written* | "Personal project: architecture and design package for a vulnerability-prioritisation platform (design stage, no code yet)." | Has implementation started since? |
| 6.3 | NEXARO TECH, S.L. | `TO VERIFY` | [REPO-SITE] says "name reserved at the Registro Mercantil Central" | Do not publish as a company or "founder" role. A name reservation is not an incorporated company. | Is the company incorporated? If not, keep NEXARO as a personal project only. |
| 6.4 | OSINT investigations | `TO VERIFY` | `tor-osint/` folder in this repo (local CLI lab tool with 13 test modules) | Show `tor-osint` as a **lab tool**, not as investigations. | What "OSINT investigations" are meant? Real targets must never be published. |
| 6.5 | Python Learning Dashboard | `TO VERIFY` | Not found in this repo | — | Repo link? What does it do? Status? |
| 6.6 | E-commerce DAW project | `TO VERIFY` | Not found in this repo | Academic project, never "client". | Repo link? Course module? Individual or team work? |
| 6.7 | Cybersecurity labs | `TO VERIFY` | `lab-scripts/` folder (two helper scripts, private-IP-only) | — | Which platforms (TryHackMe, Hack The Box, other)? Public profile or write-ups? Recommend **not** featuring `lab-scripts/` to recruiters (reverse-shell helper). |
| 6.8 | CLAW Framework, Golytics, Netseer, SYNAPSE/INTEL-LINK, SIGMA 43, Calculadora Financiera Pro | `TO VERIFY` | Listed on the Spanish site with no repository or demo; flagged in `AUDIT.md` §2 | Excluded from this portfolio. The Spanish site is untouched. | Only include any of them if you can share a repo or demo. |
| 6.9 | Conceptual commercial cases (LexForma, Nexo Clínica, Atlas CAE) | `DO NOT PUBLISH` | [REPO-SITE] `commercialCases.ts` — explicitly "not real clients" | Not relevant to a recruiter-facing portfolio. | — |

## 7. Skills

Self-assessed levels exist in [REPO-SITE] `skills.ts` (e.g. Python: Intermediate; SQL, TS/JS,
Java, Bash, Linux, Git: Basic; Docker, C: Learning). They are `REPO-ONLY` until reconfirmed.
See `SKILLS.md` for the evidence-based skill model used in this portfolio.

## 8. Changelog

| Date | Change | By |
|---|---|---|
| 2026-10-08 | Initial version from Phase 1 brief + existing repo content. | Claude (review pending by owner) |
