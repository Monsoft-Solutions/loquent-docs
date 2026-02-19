# Getting Started Section Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create three documentation pages (Sign Up, Create an Agent, Buy a Phone Number) with live screenshots that walk new users through onboarding.

**Architecture:** Three MDX pages under `src/content/docs/getting-started/`, each with Playwright-captured screenshots stored in `src/assets/screenshots/getting-started/`. Pages link sequentially. Existing `welcome.mdx` updated to funnel into the flow. Sidebar registered in `astro.config.mjs`.

**Tech Stack:** Astro Starlight, MDX, Playwright MCP (for screenshots)

**Standards:** All content must follow `WRITING-DOCS.md` — second person, present tense, action-oriented headings, no filler, bold for UI elements, screenshots with alt text, max 15 lines prose per section, max 2 callouts per page.

**Credentials:** `.claude-cred` at project root contains `LOQUENT_EMAIL=claude@email.com`, `LOQUENT_PASSWORD=@demo12345`, `LOQUENT_APP_URL=https://app.loquent.io`

---

### Task 1: Set Up Screenshot Infrastructure

**Files:**
- Create directory: `src/assets/screenshots/getting-started/`

**Step 1: Create the screenshots directory**

Run:
```bash
mkdir -p src/assets/screenshots/getting-started
```

**Step 2: Log into the Loquent app via Playwright**

Use Playwright MCP tools:
1. Navigate to `https://app.loquent.io`
2. Take a snapshot to find the login form fields
3. Fill in the email field with `claude@email.com`
4. Fill in the password field with `@demo12345`
5. Click the sign-in / log-in button
6. Wait for the dashboard to load
7. Take a snapshot to confirm successful login

**Step 3: Verify login succeeded**

Take a screenshot after dashboard loads. Confirm you see the main navigation (Agents, Phone Numbers, etc.).

---

### Task 2: Capture Sign-Up Page Screenshots

**Files:**
- Create: `src/assets/screenshots/getting-started/sign-up-form.png`
- Create: `src/assets/screenshots/getting-started/sign-up-dashboard.png`

**Step 1: Navigate to the sign-up page**

1. Navigate to `https://app.loquent.io` (or find the sign-up URL from the login page)
2. Look for a "Sign up" or "Create account" link
3. Take a snapshot to identify the sign-up form

**Step 2: Capture the sign-up form**

Take a screenshot of the sign-up page showing the empty form. Save as:
```
src/assets/screenshots/getting-started/sign-up-form.png
```

**Step 3: Capture the dashboard after login**

Navigate back to the dashboard (log in if needed). Take a screenshot showing the main dashboard view. Save as:
```
src/assets/screenshots/getting-started/sign-up-dashboard.png
```

---

### Task 3: Write the Sign-Up Page

**Files:**
- Create: `src/content/docs/getting-started/sign-up.mdx`

**Step 1: Write sign-up.mdx**

Create the file with this structure (adapt content to match what was observed in the actual UI during screenshot capture):

```mdx
---
title: Sign Up
description: Create your Loquent account to start building AI-powered voice agents
---

import signUpForm from '../../../assets/screenshots/getting-started/sign-up-form.png';
import dashboard from '../../../assets/screenshots/getting-started/sign-up-dashboard.png';

## Go to the sign-up page

Open [app.loquent.io](https://app.loquent.io) in your browser. Click **Sign Up** to create a new account.

<img src={signUpForm.src} alt="The Loquent sign-up form with email and password fields" />

## Create your account

Enter your email address and choose a password. Click **Sign Up** to create your account.

After signing up, you land on the dashboard — the central hub for managing your agents and phone numbers.

<img src={dashboard.src} alt="The Loquent dashboard showing the main navigation and overview" />

## Explore the dashboard

The dashboard gives you access to all Loquent features. From here you can:

- **Agents** — Create and manage AI voice agents
- **Phone Numbers** — Buy numbers and assign agents to them
- **Call History** — Review past conversations

:::tip
Ready to build your first voice agent? Continue to [Create an Agent](/getting-started/create-agent/).
:::
```

**Important:** Adapt the copy based on the actual UI observed during screenshot capture. The above is a template — use the real button labels, form fields, and navigation items you see in the app.

**Step 2: Verify the file renders**

Run:
```bash
cd /Users/monsoft_solutions/monsoft/projects/loquent/loquent-docs && npx astro build 2>&1 | tail -20
```

Expected: Build succeeds with no errors.

**Step 3: Commit**

```bash
git add src/content/docs/getting-started/sign-up.mdx src/assets/screenshots/getting-started/sign-up-*.png
git commit -m "docs: add sign-up getting started page with screenshots"
```

---

### Task 4: Capture Create Agent Screenshots

**Files:**
- Create: `src/assets/screenshots/getting-started/create-agent-list.png`
- Create: `src/assets/screenshots/getting-started/create-agent-form.png`
- Create: `src/assets/screenshots/getting-started/create-agent-config.png`
- Create: `src/assets/screenshots/getting-started/create-agent-saved.png`

**Step 1: Navigate to the Agents page**

1. Click on **Agents** in the navigation
2. Take a snapshot to see the agents list
3. Take a screenshot. Save as: `src/assets/screenshots/getting-started/create-agent-list.png`

**Step 2: Open the agent creation form**

1. Click the "Create Agent" or "New Agent" button
2. Take a snapshot to identify all form fields
3. Take a screenshot of the creation form. Save as: `src/assets/screenshots/getting-started/create-agent-form.png`

**Step 3: Capture configuration options**

1. Explore the agent configuration — look for tabs or sections (voice settings, model selection, prompt/instructions)
2. Take a screenshot showing the configuration. Save as: `src/assets/screenshots/getting-started/create-agent-config.png`

**Step 4: Save and capture confirmation**

1. Fill in minimal agent details and save (or find an existing saved agent)
2. Take a screenshot of the saved state. Save as: `src/assets/screenshots/getting-started/create-agent-saved.png`

**Note:** Document all form fields, labels, tabs, and options you observe. These will be needed to write accurate documentation in Task 5.

---

### Task 5: Write the Create Agent Page

**Files:**
- Create: `src/content/docs/getting-started/create-agent.mdx`

**Step 1: Write create-agent.mdx**

Create the file with this structure (adapt content to match the actual UI observed during Task 4):

```mdx
---
title: Create an Agent
description: Set up your first AI voice agent to handle inbound or outbound calls
---

import agentList from '../../../assets/screenshots/getting-started/create-agent-list.png';
import agentForm from '../../../assets/screenshots/getting-started/create-agent-form.png';
import agentConfig from '../../../assets/screenshots/getting-started/create-agent-config.png';
import agentSaved from '../../../assets/screenshots/getting-started/create-agent-saved.png';

## Open the Agents page

Click **Agents** in the sidebar. The Agents page displays all your voice agents.

<img src={agentList.src} alt="The Agents page showing a list of configured voice agents" />

## Create a new agent

Click **Create Agent**. Fill in the required fields:

| Field | Required | Description |
|-------|----------|-------------|
| Name  | Yes      | A display name for the agent |
| Voice | Yes      | The text-to-speech voice the agent uses |
| Prompt | Yes     | Instructions that define how the agent handles calls |
| Model | Yes      | The AI model powering the agent |

<img src={agentForm.src} alt="The agent creation form with name, voice, prompt, and model fields" />

## Configure agent behavior

[Describe the configuration options observed in the UI — tabs, advanced settings, etc.]

<img src={agentConfig.src} alt="Agent configuration options showing [describe what's visible]" />

## Save the agent

Click **Save**. Your agent appears in the agents list and is ready to be assigned to a phone number.

<img src={agentSaved.src} alt="The saved agent displayed in the agents list with active status" />

:::tip
Your agent needs a phone number to receive calls. Continue to [Buy a Phone Number](/getting-started/buy-number/).
:::
```

**Important:** Replace all placeholder text (especially `[bracketed sections]`) with actual UI details observed during screenshot capture.

**Step 2: Verify the file renders**

Run:
```bash
cd /Users/monsoft_solutions/monsoft/projects/loquent/loquent-docs && npx astro build 2>&1 | tail -20
```

Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/content/docs/getting-started/create-agent.mdx src/assets/screenshots/getting-started/create-agent-*.png
git commit -m "docs: add create agent getting started page with screenshots"
```

---

### Task 6: Capture Buy Phone Number Screenshots

**Files:**
- Create: `src/assets/screenshots/getting-started/buy-number-list.png`
- Create: `src/assets/screenshots/getting-started/buy-number-search.png`
- Create: `src/assets/screenshots/getting-started/buy-number-assign.png`

**Step 1: Navigate to the Phone Numbers page**

1. Click on **Phone Numbers** in the navigation
2. Take a snapshot and screenshot. Save as: `src/assets/screenshots/getting-started/buy-number-list.png`

**Step 2: Open the buy number flow**

1. Click "Buy Number" or equivalent button
2. Take a snapshot to see the number selection UI (area codes, number types)
3. Take a screenshot. Save as: `src/assets/screenshots/getting-started/buy-number-search.png`

**Step 3: Capture the agent assignment UI**

1. Find where agents are assigned to numbers (may be during purchase or after)
2. Take a snapshot and screenshot. Save as: `src/assets/screenshots/getting-started/buy-number-assign.png`

**Note:** Document the full purchase flow, available options, and assignment mechanism for Task 7.

---

### Task 7: Write the Buy Phone Number Page

**Files:**
- Create: `src/content/docs/getting-started/buy-number.mdx`

**Step 1: Write buy-number.mdx**

Create the file with this structure (adapt to match actual UI from Task 6):

```mdx
---
title: Buy a Phone Number
description: Purchase a phone number and assign your agent to start handling calls
---

import numberList from '../../../assets/screenshots/getting-started/buy-number-list.png';
import numberSearch from '../../../assets/screenshots/getting-started/buy-number-search.png';
import numberAssign from '../../../assets/screenshots/getting-started/buy-number-assign.png';

## Open Phone Numbers

Click **Phone Numbers** in the sidebar. This page lists all your purchased phone numbers.

<img src={numberList.src} alt="The Phone Numbers page showing purchased numbers and their assigned agents" />

## Buy a number

Click **Buy Number**. Search for available numbers by area code or region.

<img src={numberSearch.src} alt="The number search interface showing available phone numbers" />

[Describe the selection process based on what was observed — area code filter, number type, pricing, etc.]

## Assign an agent

Select the agent you created in the previous step and assign it to your new number.

<img src={numberAssign.src} alt="The agent assignment dropdown showing available agents for the phone number" />

[Describe the assignment flow based on the actual UI.]

## Make a test call

Call your new number from any phone. Your agent picks up and responds based on the prompt you configured.

:::tip
You're all set! Your AI voice agent is live and handling calls. Explore the dashboard to monitor call history and fine-tune your agent's behavior.
:::
```

**Step 2: Verify the file renders**

Run:
```bash
cd /Users/monsoft_solutions/monsoft/projects/loquent/loquent-docs && npx astro build 2>&1 | tail -20
```

Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/content/docs/getting-started/buy-number.mdx src/assets/screenshots/getting-started/buy-number-*.png
git commit -m "docs: add buy phone number getting started page with screenshots"
```

---

### Task 8: Update Welcome Page and Sidebar

**Files:**
- Modify: `src/content/docs/getting-started/welcome.mdx`
- Modify: `astro.config.mjs:23-30` (sidebar configuration)

**Step 1: Update welcome.mdx**

Replace the current content with:

```mdx
---
title: Welcome
description: Get started with the Loquent AI communications platform
---

Loquent is an AI-powered communications platform that helps you manage and automate voice conversations at scale. Create intelligent voice agents, assign them phone numbers, and start handling calls — all from a single dashboard.

## Get started in three steps

1. **[Sign Up](/getting-started/sign-up/)** — Create your Loquent account
2. **[Create an Agent](/getting-started/create-agent/)** — Build your first AI voice agent
3. **[Buy a Phone Number](/getting-started/buy-number/)** — Assign your agent and go live

## Learn more

- Explore the platform at [app.loquent.io](https://app.loquent.io)
- Read the [developer docs](https://dev-docs.loquent.io) for API and integration details
```

**Step 2: Update the sidebar in astro.config.mjs**

Replace the sidebar array (lines 23-30) with:

```js
sidebar: [
  {
    label: 'Getting Started',
    items: [
      { label: 'Welcome', slug: 'getting-started/welcome' },
      { label: 'Sign Up', slug: 'getting-started/sign-up' },
      { label: 'Create an Agent', slug: 'getting-started/create-agent' },
      { label: 'Buy a Phone Number', slug: 'getting-started/buy-number' },
    ],
  },
],
```

**Step 3: Verify full build**

Run:
```bash
cd /Users/monsoft_solutions/monsoft/projects/loquent/loquent-docs && npx astro build 2>&1 | tail -20
```

Expected: Build succeeds with all 5 pages (landing + 4 getting-started pages).

**Step 4: Commit**

```bash
git add src/content/docs/getting-started/welcome.mdx astro.config.mjs
git commit -m "docs: update welcome page and sidebar with getting started flow"
```

---

### Task 9: Visual Review

**Step 1: Start the dev server**

Run:
```bash
cd /Users/monsoft_solutions/monsoft/projects/loquent/loquent-docs && npx astro dev
```

**Step 2: Review each page in the browser**

Use Playwright to navigate to each page and verify:
1. `http://localhost:4321/getting-started/welcome/` — links work, numbered steps visible
2. `http://localhost:4321/getting-started/sign-up/` — screenshots render, copy is accurate
3. `http://localhost:4321/getting-started/create-agent/` — screenshots render, table displays correctly
4. `http://localhost:4321/getting-started/buy-number/` — screenshots render, callout at end

Check for:
- All screenshots load and display at correct size
- Navigation between pages works (sidebar + inline links)
- No broken images or links
- Copy follows WRITING-DOCS.md standards

**Step 3: Fix any issues found during review**

**Step 4: Final commit if changes were made**

```bash
git add -A
git commit -m "docs: fix visual review issues in getting started section"
```
