# Security Policy

## Scope

This repository holds a static personal portfolio (no server, no database, no user accounts)
and its documentation. Relevant issues include: leaked secrets or personal data, unsafe
headers/CSP on the deployed site, vulnerable dependencies, and links to malicious content.

## Reporting

Please **do not open a public issue** for security problems. Use GitHub's
[private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability)
on this repository ("Security" tab → "Report a vulnerability").

You can expect an acknowledgement within 7 days. This is a personal project with no bug
bounty.

## Practices

- No secrets are required or stored. `.env*` files are git-ignored.
- Personal data is limited to what `docs/FACT_CHECK.md` marks as publishable.
- No third-party scripts; strict Content Security Policy.
- Dependencies kept minimal and audited in CI.

Details: [docs/SECURITY_ARCHITECTURE.md](docs/SECURITY_ARCHITECTURE.md).
