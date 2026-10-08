# CLAUDE.md — middle-east-career-portfolio

Professional portfolio of **Mrabeh Fathi** for recruiters and hiring managers in Saudi Arabia,
UAE, Qatar, Kuwait, Bahrain and Oman. English is the master language; Arabic and Spanish come
later. The owner writes to you in Spanish — answer in Spanish; write repository content in
English.

## 1. The non-negotiable rule: never invent

Never invent or infer: employers, clients, job titles, dates, salaries, certifications,
degrees, skills used professionally, projects, results, metrics, languages or language levels,
international experience, or technologies used at work.

When information is missing:
1. Ask the owner.
2. If it cannot be resolved now, write `[TO VERIFY]`.
3. Never fill the gap with an assumption.

**Facts vs presentation.** You may improve the wording of a fact. You may not widen its scope.
- Fact: "I worked as an administrative assistant on a construction site in Saudi Arabia."
- ✅ "Administrative support in an international construction environment in Saudi Arabia."
- ❌ "Managed construction operations in Saudi Arabia."

Authority verbs (managed, led, supervised, directed, owned, oversaw) require a `CONFIRMED`
FACT_CHECK row that states that responsibility.

## 2. Source of truth

- `docs/FACT_CHECK.md` decides what may be published. Only `CONFIRMED` rows go live.
- Only the owner can change a status to `CONFIRMED`. You may propose; you never self-approve.
- Content found elsewhere in this repo (e.g. the Spanish site in `../mrabeh-portfolio/`) is `REPO-ONLY` until the owner reconfirms it for this portfolio.
- Master wording lives in `docs/PROFILE.md`, `EXPERIENCE.md`, `PROJECTS.md`, `SKILLS.md`. Targets and audience in `docs/MIDDLE_EAST_TARGET.md`.

## 3. Positioning

Do not position the owner as a "Cybersecurity Professional", "expert", "specialist" or
"senior". The positioning is the real combination: administration + international experience
(Saudi Arabia) + Arabic/Spanish/English + growing technology and cybersecurity profile. See the
headline analysis in `docs/PROFILE.md` §3.

Projects are evidence of skills, never jobs or commercial products, unless FACT_CHECK says so.

## 4. Technical stack and constraints

- Phase 1 (current): documentation, agents, commands. **No site code yet. No final visual design.**
- Phase 2 (proposed, see `docs/DECISIONS.md` ADR-002): Astro static output, no UI framework, no Tailwind, plain CSS with tokens and logical properties (RTL-ready). Do not add React, Next.js, Tailwind, analytics or any dependency without a new ADR approved by the owner.
- Deploy targets: Vercel (preferred), GitHub Pages, Hostinger — see `docs/DEPLOYMENT.md`.

## 5. Security

- Never commit secrets, tokens, `.env` files, phone numbers, ID documents, addresses or visa/nationality data. The repository is **public**.
- `private/` is git-ignored: CV drafts and company research go there.
- No third-party scripts; strict CSP (see `docs/SECURITY_ARCHITECTURE.md`).
- Do not link `lab-scripts/` or offensive tooling from the portfolio.

## 6. Design principles (for Phase 2)

Clarity, typography, hierarchy, accessibility (WCAG 2.2 AA), speed, mobile first, international
and professional look, concrete evidence. Avoid: heavy gradients, unnecessary animation,
"AI-generated portfolio" look, card overload, grandiose phrases, empty corporate copy, gamer or
exaggerated "hacker" aesthetics.

## 7. Workflow

- Work on a branch; open a pull request; the owner reviews before merge.
- Keep changes small. One topic per commit.
- Before any content change: `/check-facts`. Before release: `/check-security` and `/review-portfolio`.
- Agents live in `.claude/agents/`, commands in `.claude/commands/`. Open Claude Code **inside this folder** so they load.

| Need | Use |
|---|---|
| Profile/headline wording | `profile-agent` · `/review-profile` |
| Page copy | `content-agent` |
| Site structure/code (Phase 2) | `portfolio-agent` · `/review-portfolio` |
| CV | `cv-agent` · `/create-cv` |
| Market/company research | `research-agent` · `/research-company` |
| Fact and quality review | `review-agent` · `/check-facts` |
| Security | `security-agent` · `/check-security` |
| New or changed project | `/update-project` |
