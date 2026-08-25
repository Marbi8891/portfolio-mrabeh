# ADR-009: Self-Hosted Email/Password Auth for V1, Deferring SSO

## Context

NEXARO needs web authentication for individual users plus programmatic authentication (API keys) for the public API, at low operational cost for a single developer, without introducing insecure custom cryptography (Section 69).

## Options

1. **Self-hosted auth**: email + password, Argon2id hashing, HttpOnly/Secure/SameSite session cookies; separate API key mechanism for the API.
2. **Managed identity provider** (e.g. Auth0, Clerk, WorkOS) handling login, sessions, and possibly SSO.
3. **Self-hosted auth with SSO/OAuth support built in from V1.**

## Decision

Option 1 for V1. SSO/OAuth (option 3) is explicitly deferred (`docs/SECURITY_MODEL.md` §2, `docs/ROADMAP.md` §9) — not designed against yet, revisited when a customer segment actually needs it.

## Reason

The initial market (Section 1) — independent consultants, small MSPs, small IT teams — has no strong SSO requirement; that requirement grows with enterprise customers NEXARO is explicitly not targeting first (Section 4). A managed identity provider (option 2) removes some build effort but introduces a hard external dependency and recurring cost for a problem (basic email/password + session auth) that is well-understood and boundable in scope — Argon2id + secure cookie handling is not "custom cryptography" (Section 73 prohibits inventing crypto, not using well-established primitives correctly). Building it directly also keeps `User`/`Membership`/`APIKey` fully modeled in NEXARO's own domain from day one, which the `identity` module boundary (`docs/ARCHITECTURE.md` §4) already assumes.

API access uses a separate, purpose-built API key mechanism (prefix + hash, shown once — `docs/API_SPEC.md` §7) rather than reusing user passwords/sessions, since API and interactive-session authentication have different threat models (long-lived programmatic credential vs. short-lived browser session).

## Tradeoffs

- More auth code to build and maintain than delegating to a managed provider — accepted; the scope (password auth + sessions + API keys) is small and well-bounded.
- No SSO in V1 may be a blocker for some larger prospective customers — accepted as a deliberate consequence of the market prioritization in `docs/PRODUCT_SPEC.md`.

## What would make us reconsider

A real customer segment (MSP or 100+ employee prospect) blocks specifically on SSO — at which point SSO/OAuth becomes a scoped V2 addition, not a reason to rebuild the base auth system (managed-provider migration would be a separate, larger decision, revisited only if self-hosted auth itself becomes a maintenance burden).
