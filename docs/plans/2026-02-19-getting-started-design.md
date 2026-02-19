# Getting Started Section Design

**Date:** 2026-02-19
**Status:** Approved

## Overview

Create a three-page Getting Started section that walks new users from account creation to a working AI voice agent with a phone number.

## Approach

Linear Quickstart Flow — three focused pages, one concept each, linked sequentially. Follows the one-concept-per-page rule from WRITING-DOCS.md.

## Information Architecture

```
Getting Started
  ├── Welcome          (existing — light rewrite to link into the flow)
  ├── Sign Up          (new — sign-up.mdx)
  ├── Create an Agent  (new — create-agent.mdx)
  └── Buy a Phone Number (new — buy-number.mdx)
```

### File Paths

- `src/content/docs/getting-started/sign-up.mdx`
- `src/content/docs/getting-started/create-agent.mdx`
- `src/content/docs/getting-started/buy-number.mdx`

### Screenshot Paths

- `src/assets/screenshots/getting-started/sign-up-*.png`
- `src/assets/screenshots/getting-started/create-agent-*.png`
- `src/assets/screenshots/getting-started/buy-number-*.png`

## Page Designs

### Page 1: Sign Up (`sign-up.mdx`)

- **title:** "Sign Up"
- **description:** "Create your Loquent account to start building AI-powered voice agents."

**Sections:**

1. **Go to the sign-up page** — Direct user to app.loquent.io. Screenshot: the sign-up form.
2. **Create your account** — Enter email, choose password. Screenshot: filled form.
3. **Explore the dashboard** — Brief orientation of what you see after sign-up. Screenshot: dashboard. Next-step callout linking to Create an Agent.

### Page 2: Create an Agent (`create-agent.mdx`)

- **title:** "Create an Agent"
- **description:** "Set up your first AI voice agent to handle inbound or outbound calls."

**Sections:**

1. **Open the Agents page** — Navigate to Agents section. Screenshot: agents list.
2. **Create a new agent** — Click create, fill in details (name, voice, prompt, model). Screenshots: creation form.
3. **Configure agent behavior** — Detailed settings walkthrough. Screenshot: configuration options.
4. **Save and test** — Save the agent. Screenshot: saved confirmation. Next-step callout linking to Buy a Phone Number.

### Page 3: Buy a Phone Number (`buy-number.mdx`)

- **title:** "Buy a Phone Number"
- **description:** "Purchase a phone number and assign your agent to start handling calls."

**Sections:**

1. **Open Phone Numbers** — Navigate to Phone Numbers section. Screenshot: phone numbers page.
2. **Buy a number** — Purchase flow: area code selection, number type. Screenshot: number selection UI.
3. **Assign an agent** — Assign the agent from the previous step. Screenshot: agent assignment.
4. **Make a test call** — Call the number to verify. Note on what to expect. Completion callout.

## Constraints

- All pages follow WRITING-DOCS.md standards (voice, tone, structure, screenshot protocol).
- Screenshots captured live from app.loquent.io using Playwright with credentials from `.claude-cred`.
- Every image has descriptive alt text and uses Astro image imports.
- All pages registered in `astro.config.mjs` sidebar.
- Existing `welcome.mdx` updated to link into the sign-up page as the first step.

## Authentication Details

- Self-service sign-up at app.loquent.io
- Email + password authentication
- User lands on dashboard after account creation (no onboarding wizard, no email verification step)
