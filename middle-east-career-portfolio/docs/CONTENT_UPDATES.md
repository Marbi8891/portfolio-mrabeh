# CONTENT_UPDATES — How to change what the portfolio says

## Golden path

1. **Fact first.** Add or update the row in `docs/FACT_CHECK.md`. Set it to `CONFIRMED` only when you (the owner) confirm it and the evidence exists. Add a changelog line.
2. **Master wording.** Update the English wording in `PROFILE.md`, `EXPERIENCE.md`, `PROJECTS.md` or `SKILLS.md`.
3. **Site content** (Phase 2). Edit the matching file in `src/content/**/en/` and list the FACT_CHECK row ids in its `fact_check` field.
4. **Check.** Run `/check-facts` (and `/review-portfolio` for larger changes).
5. **Translate** (later). Update `ar/` and `es/` from the new English version; set `translated_from` to the commit.
6. **CV.** If the change affects the CV, run `/create-cv` and review the PDF.
7. **Pull request.** Small PR, preview URL, owner approves, merge → deploy.

## Common tasks

| Task | Command | Files |
|---|---|---|
| Confirm or correct a fact | `/check-facts` | `docs/FACT_CHECK.md` |
| Add a new project | `/update-project <name>` | `docs/PROJECTS.md`, `src/content/projects/en/` |
| Review the profile wording | `/review-profile` | `docs/PROFILE.md` |
| Tailor CV for a role | `/create-cv <role or job ad>` | `private/cv/` (git-ignored drafts) |
| Research a company before applying | `/research-company <company>` | `private/research/<company>.md` (git-ignored) |
| Security pass before release | `/check-security` | whole repo |

## Things that always need the owner

- Changing any status to `CONFIRMED`.
- Publishing a new employer, client or project name.
- Anything about visa, nationality, salary or personal documents.
- Approving Arabic and Spanish translations.
