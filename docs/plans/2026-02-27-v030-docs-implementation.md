# Loquent 0.3.0 Documentation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Write documentation for all new features in Loquent 0.3.0, organized into 3 phases.

**Architecture:** One MDX page per feature. Each page follows the pattern: short intro paragraph → screenshots → sections with tables → Related pages. Screenshots are taken from the live app, uploaded to Vercel Blob, and embedded with `<img>` tags. Sidebar is updated in `astro.config.mjs` after each phase.

**Tech Stack:** Astro + Starlight, MDX, Vercel Blob for screenshots, Playwright for screenshot capture, pnpm for dev server.

**Reference Skills:** `writing-loquent-docs` (voice, structure, screenshots), `loquent-docs-git-workflow` (branching, commits, PRs)

---

## Before Starting

Read credentials from `.claude-cred` at the project root:
```
LOQUENT_EMAIL=...
LOQUENT_PASSWORD=...
LOQUENT_APP_URL=...
BLOB_READ_WRITE_TOKEN=...
```

Screenshot upload command:
```bash
./scripts/upload-screenshot.sh <local-file> <destination-path>
# Example: ./scripts/upload-screenshot.sh /tmp/feed.png messaging/messaging-feed.png
# Returns the public Blob URL to embed in MDX
```

MDX page structure (follow exactly):
```mdx
---
title: Page Title
description: One sentence describing the page
---

One paragraph intro — what this is and how to get to it.

<img src="BLOB_URL" alt="Descriptive alt text with UI details" />

## Section heading

Content.

## Related pages

- [Page Name](/slug) — one-line description
```

---

## Phase 1 — SMS Messaging + Contact Intelligence

**Branch:** `docs/multi-v030-phase1-sms-contacts`

```bash
git checkout main
git pull origin main
git checkout -b docs/multi-v030-phase1-sms-contacts
```

---

### Task 1: Messaging Feed page

**Files:**
- Create: `src/content/docs/messaging/messaging-feed.mdx`
- Modify: `astro.config.mjs` (add Messaging section to sidebar)

**Step 1: Explore the feature in the app**

Log into the app using credentials from `.claude-cred`. Navigate to the Messaging section (`/messaging`). Understand:
- The contact list sidebar
- The unified feed (calls + SMS together, date-grouped)
- The filter bar (All / Calls / Messages tabs)
- What inbound vs outbound messages look like
- How to navigate between contacts

**Step 2: Take screenshots**

Capture at minimum:
1. The full Messaging page with a contact selected showing the feed
2. The filter bar in focus (All / Calls / Messages tabs)

Save to `/tmp/`:
```
/tmp/messaging-feed-full.png
/tmp/messaging-feed-filter.png
```

**Step 3: Upload screenshots**

```bash
./scripts/upload-screenshot.sh /tmp/messaging-feed-full.png messaging/messaging-feed.png
./scripts/upload-screenshot.sh /tmp/messaging-feed-filter.png messaging/messaging-feed-filter.png
```

Note the returned Blob URLs.

**Step 4: Write the MDX page**

Create `src/content/docs/messaging/messaging-feed.mdx`:

```mdx
---
title: Messaging Feed
description: View and navigate your unified communication feed of calls and SMS messages
---

Click **Messaging** in the sidebar. The left panel shows all contacts you have exchanged messages or calls with. Click any contact to open their communication feed — a chronological view of every call and SMS message, grouped by date.

<img src="BLOB_URL_1" alt="Messaging page with contact list on the left and a feed on the right showing call cards and SMS bubbles grouped by date" />

## Filter the feed

Use the filter bar above the feed to focus on a specific type of communication:

| Filter | Shows |
|--------|-------|
| **All** | Calls and SMS messages together |
| **Calls** | Call cards only |
| **Messages** | SMS messages only |

<img src="BLOB_URL_2" alt="Filter bar showing All, Calls, and Messages tabs with All selected" />

## Message bubbles

Inbound messages (received) appear on the left. Outbound messages (sent) appear on the right in amber.

## Call cards

Calls appear inline in the feed alongside messages. Each card shows the call direction, duration, and date. Click a call card to open [Call Details](/calls/call-details).

## Related pages

- [Send an SMS](/messaging/send-sms) — compose and send a message to a contact
- [Contact Details](/contacts/contact-details) — view the full contact profile
```

Replace `BLOB_URL_1` and `BLOB_URL_2` with the actual uploaded URLs.

**Step 5: Add Messaging section to sidebar**

In `astro.config.mjs`, add a new `Messaging` section before the `Calls` section:

```js
{
  label: 'Messaging',
  items: [
    { label: 'Messaging Feed', slug: 'messaging/messaging-feed' },
  ],
},
```

**Step 6: Preview**

```bash
pnpm dev
```

Open `http://localhost:4321/messaging/messaging-feed` and verify:
- Page renders with no errors
- Screenshots display
- Sidebar shows the new Messaging section
- Links work

**Step 7: Commit**

```bash
git add src/content/docs/messaging/messaging-feed.mdx astro.config.mjs
git commit -m "docs: add messaging feed page"
```

---

### Task 2: Send an SMS page

**Files:**
- Create: `src/content/docs/messaging/send-sms.mdx`
- Modify: `astro.config.mjs` (add to Messaging section)

**Step 1: Explore the feature**

In the Messaging view, find the compose bar at the bottom of the feed. Understand:
- Where the compose bar is located
- What fields/buttons it has
- What happens after sending (message appears in feed)
- Whether you can send to any contact or only ones with phone numbers

**Step 2: Take screenshot**

```
/tmp/messaging-compose.png   — the compose bar / send flow
```

**Step 3: Upload screenshot**

```bash
./scripts/upload-screenshot.sh /tmp/messaging-compose.png messaging/send-sms.png
```

**Step 4: Write the MDX page**

Create `src/content/docs/messaging/send-sms.mdx`:

```mdx
---
title: Send an SMS
description: Compose and send an outbound SMS message to a contact
---

Open a contact in the [Messaging Feed](/messaging/messaging-feed). Type your message in the compose bar at the bottom of the feed and press **Send** or hit Enter.

<img src="BLOB_URL" alt="Compose bar at the bottom of the messaging feed with a text input and Send button" />

## What happens after sending

The message appears in the feed immediately as an outbound message (right-aligned, amber background). Delivery status updates automatically via Twilio.

## Related pages

- [Messaging Feed](/messaging/messaging-feed) — navigate your full communication history
```

**Step 5: Update sidebar**

Add to the Messaging section in `astro.config.mjs`:

```js
{ label: 'Send an SMS', slug: 'messaging/send-sms' },
```

**Step 6: Preview and verify**

```bash
pnpm dev
```

Open `http://localhost:4321/messaging/send-sms`.

**Step 7: Commit**

```bash
git add src/content/docs/messaging/send-sms.mdx astro.config.mjs
git commit -m "docs: add send sms page"
```

---

### Task 3: Rewrite Contact Details page

**Files:**
- Modify: `src/content/docs/contacts/contact-details.mdx` (full rewrite)

The existing page describes the old single-column layout. The new CRM-style layout has three independently scrolling columns.

**Step 1: Explore the feature**

Navigate to a contact in the app. Understand the new 3-column layout:
- **Left sidebar:** avatar, quick actions (call, message), tags, phone numbers, email addresses
- **Center timeline:** unified feed of calls, notes, and todos with filter bar (All / Calls / Notes / Todos), date-grouped
- **Right panel:** notes and todos

**Step 2: Take screenshots**

```
/tmp/contact-details-full.png     — full 3-column layout
/tmp/contact-details-timeline.png — center timeline with filter bar
```

**Step 3: Upload screenshots**

```bash
./scripts/upload-screenshot.sh /tmp/contact-details-full.png contacts/contact-details-v2.png
./scripts/upload-screenshot.sh /tmp/contact-details-timeline.png contacts/contact-details-timeline.png
```

**Step 4: Rewrite the MDX page**

Replace the entire content of `src/content/docs/contacts/contact-details.mdx`:

```mdx
---
title: Contact Details
description: View a contact's full profile, activity timeline, notes, tags, and communication history
---

Click any contact in the Contacts list to open their details. The Contact Details page uses a three-column layout: a profile sidebar on the left, an activity timeline in the center, and panels for notes and to-dos on the right.

<img src="BLOB_URL_1" alt="Contact Details page with three columns: left sidebar showing avatar, tags, and phone numbers; center timeline showing calls and notes; right panel showing notes" />

## Left sidebar

The sidebar shows the contact's avatar, name, and quick-action buttons for calling or messaging. Below that:

- **Tags** — labels assigned to this contact. Click a tag to edit or remove it, or click **+ Add Tag** to assign a new one. See [Contact Tags](/contacts/contact-tags).
- **Phone Numbers** — all numbers linked to this contact. Click **+ Add Phone** to add another.
- **Email Addresses** — all emails linked to this contact. Click **+ Add Email** to add another.

## Activity timeline

The center column shows a chronological feed of all activity for this contact: calls, notes, and to-dos grouped by date.

<img src="BLOB_URL_2" alt="Activity timeline filter bar showing All, Calls, Notes, and Todos tabs above a date-grouped list of activity cards" />

Use the filter bar to focus on a specific type:

| Filter | Shows |
|--------|-------|
| **All** | Calls, notes, and to-dos together |
| **Calls** | Call cards only |
| **Notes** | Notes only (manual and AI-generated) |
| **Todos** | To-do items only |

## Right panel

The right panel provides quick access to the contact's [notes](/contacts/contact-notes) and [to-dos](/todos/manage-todos) without scrolling the timeline.

## Edit a contact's name

Click the **First Name** or **Last Name** fields in the sidebar to edit them inline. Changes save automatically.

## Delete a contact

Scroll to the bottom of the left sidebar and click **Delete**. This permanently removes the contact and all linked phone numbers and email addresses.

## Related pages

- [Contact Notes](/contacts/contact-notes) — add and view notes on this contact
- [Contact Tags](/contacts/contact-tags) — assign tags for filtering and AI auto-tagging
- [Contact Memory](/contacts/contact-memory) — how agents remember this contact across calls
- [Add a Phone Number](/contacts/add-phone-number) — link a phone number for caller identification
- [Add an Email Address](/contacts/add-email-address) — link an email for automated messages
```

**Step 5: Preview**

```bash
pnpm dev
```

Open `http://localhost:4321/contacts/contact-details`.

**Step 6: Commit**

```bash
git add src/content/docs/contacts/contact-details.mdx
git commit -m "docs: rewrite contact details page for CRM-style layout"
```

---

### Task 4: Contact Notes page

**Files:**
- Create: `src/content/docs/contacts/contact-notes.mdx`
- Modify: `astro.config.mjs` (add to Contacts section)

**Step 1: Explore the feature**

On the Contact Details page, find the notes system:
- Where to add a note (compose area or button)
- What a manual note looks like vs an AI-generated note (labeled "AI Agent")
- How markdown renders (bold, bullet points, code blocks)
- How to edit and delete a note
- Whether notes appear in the timeline

**Step 2: Take screenshots**

```
/tmp/contact-notes-list.png    — notes panel or timeline showing a mix of manual and AI notes
/tmp/contact-notes-add.png     — adding/composing a note
```

**Step 3: Upload screenshots**

```bash
./scripts/upload-screenshot.sh /tmp/contact-notes-list.png contacts/contact-notes.png
./scripts/upload-screenshot.sh /tmp/contact-notes-add.png contacts/contact-notes-add.png
```

**Step 4: Write the MDX page**

Create `src/content/docs/contacts/contact-notes.mdx`:

```mdx
---
title: Contact Notes
description: Add, edit, and view notes on a contact, including AI-generated interaction summaries
---

Notes let you record information about a contact that persists across calls and sessions. Open a [contact's details](/contacts/contact-details), then find the Notes section in the right panel or the activity timeline.

<img src="BLOB_URL_1" alt="Notes panel showing two notes: one labeled 'AI Agent' with a structured call summary and one manual note with plain text" />

## Add a note

Click **+ Add Note**, type your note, and click **Save**. Notes support full Markdown — use `**bold**`, `- bullet lists`, or ` ```code blocks``` `.

<img src="BLOB_URL_2" alt="Note compose area with a text input field and Save and Cancel buttons" />

## Edit a note

Click the edit icon on any note you authored. Make your changes and click **Save**.

:::tip
You can only edit notes you created. AI-generated notes are read-only.
:::

## Delete a note

Click the delete icon on any note you authored. This cannot be undone.

## AI-generated notes

After each call, Loquent automatically creates a note labeled **AI Agent** with a structured summary:

- **Summary** — what the call was about
- **Key Points** — important details mentioned
- **Next Steps** — any follow-up actions identified

These notes appear in the timeline and in the right panel. They cannot be edited or deleted.

## Related pages

- [Contact Details](/contacts/contact-details) — the full contact profile and activity timeline
- [Contact Memory](/contacts/contact-memory) — how the AI builds a memory of this contact over time
```

**Step 5: Update sidebar**

Add to the Contacts section in `astro.config.mjs`:

```js
{ label: 'Contact Notes', slug: 'contacts/contact-notes' },
```

**Step 6: Preview and verify**

```bash
pnpm dev
```

**Step 7: Commit**

```bash
git add src/content/docs/contacts/contact-notes.mdx astro.config.mjs
git commit -m "docs: add contact notes page"
```

---

### Task 5: Contact Tags page

**Files:**
- Create: `src/content/docs/contacts/contact-tags.mdx`
- Modify: `astro.config.mjs` (add to Contacts section)

**Step 1: Explore the feature**

Find the tags system:
- Where org tags are created (likely Settings or a Tags management area)
- How to assign a tag to a contact (left sidebar on Contact Details)
- How to filter the Contacts list by tag
- What AI auto-tagging looks like (a note appears after each call with suggested tags)

**Step 2: Take screenshots**

```
/tmp/contact-tags-contact.png  — tags displayed on a contact (left sidebar)
/tmp/contact-tags-filter.png   — contacts list filtered by a tag
```

**Step 3: Upload screenshots**

```bash
./scripts/upload-screenshot.sh /tmp/contact-tags-contact.png contacts/contact-tags.png
./scripts/upload-screenshot.sh /tmp/contact-tags-filter.png contacts/contact-tags-filter.png
```

**Step 4: Write the MDX page**

Create `src/content/docs/contacts/contact-tags.mdx`:

```mdx
---
title: Contact Tags
description: Create color-coded tags and assign them to contacts for filtering and AI-powered categorization
---

Tags are color-coded labels you create for your organization and assign to any contact. Use them to segment your contacts, filter the Contacts list, and help the AI categorize callers automatically.

<img src="BLOB_URL_1" alt="Contact Details left sidebar showing two color-coded tags — 'VIP' in green and 'Follow Up' in amber — below the contact name" />

## Create a tag

Tags are managed at the organization level. To create a new tag:

1. Go to **Settings → General** (or the Tags section if available).
2. Enter a tag name and choose a color.
3. Click **Save**. The tag is now available to assign to any contact.

## Assign a tag to a contact

Open a contact's [details page](/contacts/contact-details). In the left sidebar, click **+ Add Tag** and select a tag from the list.

## Remove a tag from a contact

Click the tag in the left sidebar and select **Remove**.

## Filter contacts by tag

On the Contacts list, use the tag filter to show only contacts with a specific tag.

<img src="BLOB_URL_2" alt="Contacts list with a tag filter showing only contacts tagged 'VIP'" />

## AI auto-tagging

After each call, Loquent analyzes the conversation and automatically applies relevant tags to the contact. A note labeled **AI Agent** appears in the timeline listing which tags were applied, suggested, or flagged as outdated.

:::tip
Review AI tag suggestions after the first few calls to refine your tag library. The AI improves as it learns your organization's patterns.
:::

## Related pages

- [Contact Details](/contacts/contact-details) — view and manage a contact's full profile
- [Contact Memory](/contacts/contact-memory) — how agents build context about each contact
```

**Step 5: Update sidebar**

```js
{ label: 'Contact Tags', slug: 'contacts/contact-tags' },
```

**Step 6: Preview and verify**

```bash
pnpm dev
```

**Step 7: Commit**

```bash
git add src/content/docs/contacts/contact-tags.mdx astro.config.mjs
git commit -m "docs: add contact tags page"
```

---

### Task 6: Contact Memory page

**Files:**
- Create: `src/content/docs/contacts/contact-memory.mdx`
- Modify: `astro.config.mjs` (add to Contacts section)

**Step 1: Explore the feature**

Find where contact memory shows up:
- Is there a visible "Memory" section on the Contact Details page?
- What does the AI-maintained memory note look like?
- Is there any UI showing when memory was last updated?
- Look for how memory affects agent behavior (injected context before calls)

**Step 2: Take screenshot**

```
/tmp/contact-memory.png   — the memory note or memory section on a contact
```

**Step 3: Upload screenshot**

```bash
./scripts/upload-screenshot.sh /tmp/contact-memory.png contacts/contact-memory.png
```

**Step 4: Write the MDX page**

Create `src/content/docs/contacts/contact-memory.mdx`:

```mdx
---
title: Contact Memory
description: Understand how Loquent builds and uses a persistent memory of each contact across calls
---

Contact Memory is a single AI-maintained summary of everything Loquent has learned about a contact from their call history. It updates automatically after every call and is injected into the agent's context before the first word of the next conversation — so your agent can greet returning callers by name, remember past preferences, and pick up where the last call left off.

<img src="BLOB_URL" alt="Contact Details page showing a Memory section with an AI-generated summary of the contact's history and preferences" />

## How memory is built

After each call, Loquent's AI reads the interaction note for that call and synthesizes it into the contact's existing memory. The result is a single, continuously updated note — not a growing list of summaries.

## What memory contains

Memory typically includes:
- The contact's name (if mentioned during calls)
- Recurring topics, preferences, or concerns
- Unresolved issues or outstanding follow-ups
- Any context the agent should know before answering

## How agents use memory

Before connecting a call, Loquent injects the contact's memory into the agent's system context. The agent uses this to personalize its greeting and behavior without you having to configure anything.

:::tip
Memory improves over time. After 3–5 calls with a contact, agents will noticeably recognize returning callers and reference past interactions.
:::

## Related pages

- [Contact Notes](/contacts/contact-notes) — the per-call interaction notes that feed into memory
- [Contact Details](/contacts/contact-details) — the full contact profile
```

**Step 5: Update sidebar**

```js
{ label: 'Contact Memory', slug: 'contacts/contact-memory' },
```

**Step 6: Preview and verify**

```bash
pnpm dev
```

**Step 7: Commit**

```bash
git add src/content/docs/contacts/contact-memory.mdx astro.config.mjs
git commit -m "docs: add contact memory page"
```

---

### Task 7: Push Phase 1 branch and open PR

**Step 1: Push branch**

```bash
git push -u origin docs/multi-v030-phase1-sms-contacts
```

**Step 2: Open PR**

```bash
gh pr create \
  --title "docs: add SMS messaging section and contact intelligence pages" \
  --body "$(cat <<'EOF'
## Summary

- Add Messaging section with Messaging Feed and Send an SMS pages
- Rewrite Contact Details page for new CRM-style 3-column layout
- Add Contact Notes page covering manual and AI-generated notes
- Add Contact Tags page covering tag management and AI auto-tagging
- Add Contact Memory page explaining persistent agent context

## Pages affected

- `src/content/docs/messaging/messaging-feed.mdx` — new
- `src/content/docs/messaging/send-sms.mdx` — new
- `src/content/docs/contacts/contact-details.mdx` — rewrite
- `src/content/docs/contacts/contact-notes.mdx` — new
- `src/content/docs/contacts/contact-tags.mdx` — new
- `src/content/docs/contacts/contact-memory.mdx` — new
- `astro.config.mjs` — add Messaging section, add 4 pages to Contacts section

## Screenshots

[List uploaded Blob URLs here]
EOF
)"
```

---

## Phase 2 — AI Agent Configuration

**Branch:** `docs/agents-v030-phase2-agent-config`

```bash
git checkout main
git pull origin main
git checkout -b docs/agents-v030-phase2-agent-config
```

---

### Task 8: Instruction Builder page

**Files:**
- Create: `src/content/docs/agents/instruction-builder.mdx`
- Modify: `astro.config.mjs` (add Agents section to sidebar)

**Step 1: Explore the feature**

Navigate to an agent's configuration page. Find the Instruction Builder:
- Where the instruction text editor lives
- The AI generation flow (describe your agent → get instructions)
- The edit toolbar (Improve, Add Personality, Add Examples, Fix Issues buttons)
- The diff view (Current vs Original tabs)
- The custom edit input ("make it more formal")

**Step 2: Take screenshots**

```
/tmp/instruction-builder-main.png    — the main instruction editor with toolbar
/tmp/instruction-builder-diff.png    — the diff view (Current vs Original)
/tmp/instruction-builder-generate.png — the AI generation flow or generate button
```

**Step 3: Upload screenshots**

```bash
./scripts/upload-screenshot.sh /tmp/instruction-builder-main.png agents/instruction-builder.png
./scripts/upload-screenshot.sh /tmp/instruction-builder-diff.png agents/instruction-builder-diff.png
./scripts/upload-screenshot.sh /tmp/instruction-builder-generate.png agents/instruction-builder-generate.png
```

**Step 4: Write the MDX page**

Create `src/content/docs/agents/instruction-builder.mdx`:

```mdx
---
title: Instruction Builder
description: Write, generate, and refine your agent's instructions using AI-assisted tools
---

Agent instructions tell your agent how to behave — what to say, what to avoid, and how to handle different caller situations. Open an agent and click the **Instructions** tab to access the Instruction Builder.

<img src="BLOB_URL_1" alt="Instruction Builder showing a large text editor with agent instructions and a toolbar with Improve, Add Personality, Add Examples, and Fix Issues buttons" />

## Generate instructions with AI

If you're starting from scratch, describe your agent in plain language and click **Generate**. Loquent's AI writes a complete set of instructions based on your description.

<img src="BLOB_URL_3" alt="Generate instructions input with a text field prompting the user to describe their agent and a Generate button" />

## Edit with the toolbar

Once you have instructions, use the toolbar to refine them with one click:

| Action | What it does |
|--------|-------------|
| **Improve** | Rewrites for clarity, structure, and effectiveness |
| **Add Personality** | Adds warmth, tone, and conversational style |
| **Add Examples** | Inserts example conversations for common scenarios |
| **Fix Issues** | Identifies and resolves ambiguous or conflicting instructions |

Each action preserves undo history — press Ctrl+Z to revert.

## Custom edit

Type a free-form instruction in the custom edit field to guide the AI with your own direction:

- "Make it more formal"
- "Remove the upsell section"
- "Add instructions for handling Spanish-speaking callers"

## Compare with original

Click the **Original** tab to see the instructions as they were before your edits. Click **Current** to return to your latest version.

<img src="BLOB_URL_2" alt="Instruction Builder showing two tabs — Current and Original — with a diff highlighting added and removed lines" />

## Enhance with org data

Click **Enhance with org data** to weave your [organization profile](/agents/organization-profile) — business name, hours, services, and location — directly into the instructions. This requires your organization profile to be filled out first.

## Related pages

- [Organization Profile](/agents/organization-profile) — provide org context that feeds into instruction generation
- [Tool Configuration](/agents/tool-configuration) — configure what tools your agent can use
```

**Step 5: Add Agents section to sidebar**

In `astro.config.mjs`, add a new `Agents` section before `Knowledge`:

```js
{
  label: 'Agents',
  items: [
    { label: 'Instruction Builder', slug: 'agents/instruction-builder' },
  ],
},
```

**Step 6: Preview and verify**

```bash
pnpm dev
```

**Step 7: Commit**

```bash
git add src/content/docs/agents/instruction-builder.mdx astro.config.mjs
git commit -m "docs: add instruction builder page"
```

---

### Task 9: Organization Profile page

**Files:**
- Create: `src/content/docs/agents/organization-profile.mdx`
- Modify: `astro.config.mjs` (add to Agents section)

**Step 1: Explore the feature**

Navigate to Settings → General (or wherever the org profile form lives). Find:
- All fields: business name, industry, timezone, address, description, website, phone, email, business hours
- The "Save" flow
- How it connects to the Instruction Builder ("Enhance with org data" button)

**Step 2: Take screenshot**

```
/tmp/org-profile.png   — the full organization profile form
```

**Step 3: Upload screenshot**

```bash
./scripts/upload-screenshot.sh /tmp/org-profile.png agents/organization-profile.png
```

**Step 4: Write the MDX page**

Create `src/content/docs/agents/organization-profile.mdx`:

```mdx
---
title: Organization Profile
description: Fill out your business details so agents can reference them in conversations
---

The Organization Profile stores your business details in Loquent. Agents can reference this information during calls, and the [Instruction Builder](/agents/instruction-builder) uses it to generate accurate, context-aware instructions.

Go to **Settings → General** to fill out your profile.

<img src="BLOB_URL" alt="Organization Profile form showing fields for Business Name, Industry, Timezone, Address, Description, Website, Phone, Email, and Business Hours" />

## Profile fields

| Field | Description |
|-------|-------------|
| **Business Name** | Your organization's name as agents should say it |
| **Industry** | Your business category (used to tailor agent tone) |
| **Timezone** | Used to interpret business hours correctly |
| **Address** | Physical location agents can share with callers |
| **Description** | A short overview of what your business does |
| **Website** | Your public website URL |
| **Phone** | Your main business phone number |
| **Email** | Your main business email address |
| **Business Hours** | Days and hours when your business is open |

Click **Save** after making changes.

## Using org data in instructions

Once your profile is filled out, open the [Instruction Builder](/agents/instruction-builder) and click **Enhance with org data**. Loquent weaves your business name, hours, services, and location directly into your agent's instructions so it can answer questions about your business accurately.

## Related pages

- [Instruction Builder](/agents/instruction-builder) — generate and refine agent instructions using org data
```

**Step 5: Update sidebar**

```js
{ label: 'Organization Profile', slug: 'agents/organization-profile' },
```

**Step 6: Preview and verify**

```bash
pnpm dev
```

**Step 7: Commit**

```bash
git add src/content/docs/agents/organization-profile.mdx astro.config.mjs
git commit -m "docs: add organization profile page"
```

---

### Task 10: Tool Configuration page

**Files:**
- Create: `src/content/docs/agents/tool-configuration.mdx`
- Modify: `astro.config.mjs` (add to Agents section)

**Step 1: Explore the feature**

On an agent's configuration page, find the Tool Configuration section:
- What tools are available: Transfer Call, Lookup Caller, Query Knowledge
- How each tool is configured (what fields appear per tool)
- Whether tools can be enabled/disabled per agent

**Step 2: Take screenshot**

```
/tmp/tool-config.png   — tool configuration panel showing the available tools
```

**Step 3: Upload screenshot**

```bash
./scripts/upload-screenshot.sh /tmp/tool-config.png agents/tool-configuration.png
```

**Step 4: Write the MDX page**

Create `src/content/docs/agents/tool-configuration.mdx`:

```mdx
---
title: Tool Configuration
description: Configure which tools your agent can use and how each tool behaves
---

Tools extend what your agent can do during a call. Each tool is configured per agent, so different agents can have different capabilities. Open an agent and click the **Tools** tab to configure them.

<img src="BLOB_URL" alt="Tool Configuration panel showing three tools: Transfer Call, Lookup Caller, and Query Knowledge, each with their own configuration fields" />

## Available tools

### Transfer Call

Lets the agent hand off an active call to a human phone number mid-conversation. See [Cold Transfer](/calls/cold-transfer) for how this works from the caller's perspective.

| Setting | Description |
|---------|-------------|
| **Transfer Number** | The phone number to redirect calls to |
| **Announcement** | Message the agent says before transferring |

### Lookup Caller

Lets the agent query your CRM integration during a call to retrieve caller information. Requires [Integrations](/settings/settings#integrations) to be configured.

### Query Knowledge

Lets the agent search your [knowledge base](/knowledge/knowledge-base) to answer questions during a call.

## Related pages

- [Instruction Builder](/agents/instruction-builder) — write the instructions that govern when tools are used
- [Cold Transfer](/calls/cold-transfer) — how the transfer call tool works end-to-end
- [Knowledge Base](/knowledge/knowledge-base) — manage the content agents can search
```

**Step 5: Update sidebar**

```js
{ label: 'Tool Configuration', slug: 'agents/tool-configuration' },
```

**Step 6: Preview and verify**

```bash
pnpm dev
```

**Step 7: Commit**

```bash
git add src/content/docs/agents/tool-configuration.mdx astro.config.mjs
git commit -m "docs: add tool configuration page"
```

---

### Task 11: Push Phase 2 branch and open PR

**Step 1: Push branch**

```bash
git push -u origin docs/agents-v030-phase2-agent-config
```

**Step 2: Open PR**

```bash
gh pr create \
  --title "docs: add Agents section with instruction builder, org profile, and tool config" \
  --body "$(cat <<'EOF'
## Summary

- Add Agents sidebar section
- Add Instruction Builder page covering AI generation, edit toolbar, diff view, and org data integration
- Add Organization Profile page covering all fields and connection to instruction builder
- Add Tool Configuration page covering Transfer Call, Lookup Caller, and Query Knowledge tools

## Pages affected

- `src/content/docs/agents/instruction-builder.mdx` — new
- `src/content/docs/agents/organization-profile.mdx` — new
- `src/content/docs/agents/tool-configuration.mdx` — new
- `astro.config.mjs` — add Agents section

## Screenshots

[List uploaded Blob URLs here]
EOF
)"
```

---

## Phase 3 — Calls, Dashboard, Settings

**Branch:** `docs/multi-v030-phase3-calls-dashboard`

```bash
git checkout main
git pull origin main
git checkout -b docs/multi-v030-phase3-calls-dashboard
```

---

### Task 12: Cold Transfer page

**Files:**
- Create: `src/content/docs/calls/cold-transfer.mdx`
- Modify: `astro.config.mjs` (add to Calls section)

**Step 1: Explore the feature**

Understand how cold transfer works — this is an agent-side behavior, so look at:
- How the agent decides to transfer (instruction-driven)
- What the caller hears during transfer
- Whether there's any UI on the calls page showing transfers
- How to configure the transfer number (Tool Configuration)

**Step 2: Take screenshot**

```
/tmp/cold-transfer.png   — a call in the calls list or call details showing a transfer, OR the tool config for transfer
```

**Step 3: Upload screenshot**

```bash
./scripts/upload-screenshot.sh /tmp/cold-transfer.png calls/cold-transfer.png
```

**Step 4: Write the MDX page**

Create `src/content/docs/calls/cold-transfer.mdx`:

```mdx
---
title: Cold Transfer
description: Let your agent hand off an active call to a human phone number mid-conversation
---

Cold transfer lets your AI agent redirect an active call to a human team member while the call is in progress. The caller is transferred without the agent staying on the line — hence "cold."

<img src="BLOB_URL" alt="Tool Configuration panel showing the Transfer Call tool with a Transfer Number field and Announcement field" />

## How it works

1. During a call, the agent determines (based on its instructions) that a human should take over.
2. The agent plays an announcement to the caller: "Let me transfer you to a team member."
3. The agent waits for the announcement to finish, then redirects the call to the configured transfer number.
4. The caller is connected to the human. The agent disconnects.

The caller ID shown to the human receiving the transfer is your Loquent number.

## Set up a transfer number

1. Open an agent and click the **Tools** tab.
2. Enable the **Transfer Call** tool.
3. Enter the phone number to transfer calls to and an optional announcement message.
4. Click **Save**.

See [Tool Configuration](/agents/tool-configuration) for full details.

## Instruct your agent to transfer

In your agent's instructions, tell it when to offer a transfer:

> "If the caller asks to speak to a person, or if you cannot resolve their issue after two attempts, offer to transfer them to our team."

See [Instruction Builder](/agents/instruction-builder) for how to write and refine instructions.

## Related pages

- [Tool Configuration](/agents/tool-configuration) — configure the transfer number and announcement
- [End Call Tool](/calls/end-call) — let the agent hang up instead of transferring
```

**Step 5: Update sidebar**

Add to the Calls section in `astro.config.mjs`:

```js
{ label: 'Cold Transfer', slug: 'calls/cold-transfer' },
```

**Step 6: Preview and verify**

```bash
pnpm dev
```

**Step 7: Commit**

```bash
git add src/content/docs/calls/cold-transfer.mdx astro.config.mjs
git commit -m "docs: add cold transfer page"
```

---

### Task 13: End Call Tool page

**Files:**
- Create: `src/content/docs/calls/end-call.mdx`
- Modify: `astro.config.mjs` (add to Calls section)

**Step 1: Explore the feature**

Find the End Call tool in agent configuration:
- Is it a toggle/enable switch, or always available?
- Any configuration options?
- What the agent says before hanging up

**Step 2: Take screenshot**

```
/tmp/end-call-tool.png   — tool configuration showing the End Call tool
```

**Step 3: Upload screenshot**

```bash
./scripts/upload-screenshot.sh /tmp/end-call-tool.png calls/end-call.png
```

**Step 4: Write the MDX page**

Create `src/content/docs/calls/end-call.mdx`:

```mdx
---
title: End Call Tool
description: Let your agent hang up calls programmatically when a conversation is complete
---

The End Call tool lets your AI agent hang up a call when the conversation is naturally complete. Without this tool, the agent waits for the caller to hang up first.

<img src="BLOB_URL" alt="Tool Configuration panel showing the End Call tool toggle" />

## Enable the End Call tool

1. Open an agent and click the **Tools** tab.
2. Enable the **End Call** tool.
3. Click **Save**.

## Instruct your agent to end calls

In your agent's instructions, tell it when to end the call:

> "When you have answered the caller's question and there is nothing left to discuss, thank them and end the call."

Without this instruction, the agent will have the tool available but may not use it consistently. See [Instruction Builder](/agents/instruction-builder) for how to write instructions.

## Related pages

- [Cold Transfer](/calls/cold-transfer) — hand off a call to a human instead of ending it
- [Tool Configuration](/agents/tool-configuration) — manage all tools for an agent
```

**Step 5: Update sidebar**

```js
{ label: 'End Call Tool', slug: 'calls/end-call' },
```

**Step 6: Preview and verify**

```bash
pnpm dev
```

**Step 7: Commit**

```bash
git add src/content/docs/calls/end-call.mdx astro.config.mjs
git commit -m "docs: add end call tool page"
```

---

### Task 14: Filter by Date page (Dashboard)

**Files:**
- Create: `src/content/docs/dashboard/filter-by-date.mdx`
- Modify: `astro.config.mjs` (add Dashboard section to sidebar)

**Step 1: Explore the feature**

Navigate to the Dashboard (home page) and the Call History page. Find the date range picker:
- Available presets: Today, Yesterday, Last 7 Days, Last 30 Days, Last 90 Days, All Time
- Custom date range section
- Whether the filter applies to both the dashboard and call listing simultaneously

**Step 2: Take screenshots**

```
/tmp/date-filter-picker.png   — the popover date picker open with presets visible
/tmp/date-filter-active.png   — dashboard or calls list with a filter applied
```

**Step 3: Upload screenshots**

```bash
./scripts/upload-screenshot.sh /tmp/date-filter-picker.png dashboard/filter-by-date.png
./scripts/upload-screenshot.sh /tmp/date-filter-active.png dashboard/filter-by-date-active.png
```

**Step 4: Write the MDX page**

Create `src/content/docs/dashboard/filter-by-date.mdx`:

```mdx
---
title: Filter by Date
description: Filter your dashboard and call history by a date range using presets or a custom picker
---

The date filter lets you focus your dashboard metrics and call history on a specific time period. Click the date range selector at the top of the **Dashboard** or **Calls** page to open the picker.

<img src="BLOB_URL_1" alt="Date range picker popover showing preset options: Today, Yesterday, Last 7 Days, Last 30 Days, Last 90 Days, All Time, and a Custom Range section with start and end date inputs" />

## Preset ranges

| Preset | Shows data from |
|--------|----------------|
| **Today** | Midnight to now |
| **Yesterday** | The previous full day |
| **Last 7 Days** | The past 7 days including today |
| **Last 30 Days** | The past 30 days including today |
| **Last 90 Days** | The past 90 days including today |
| **All Time** | Every call since your account was created |

Click a preset to apply it immediately. An active checkmark indicates the current selection.

## Custom date range

In the **Custom Range** section, enter a start date and end date to define your own period. The filter applies as soon as you confirm.

<img src="BLOB_URL_2" alt="Dashboard with a 'Last 7 Days' filter active, showing updated call count and trend metrics" />

## Where the filter applies

The date filter applies to both the **Dashboard** summary metrics and the **Call History** list simultaneously. Switching between the two pages retains your selection.

## Related pages

- [Call History](/calls/call-history) — view the filtered list of calls
```

**Step 5: Add Dashboard section to sidebar**

In `astro.config.mjs`, add a new `Dashboard` section:

```js
{
  label: 'Dashboard',
  items: [
    { label: 'Filter by Date', slug: 'dashboard/filter-by-date' },
  ],
},
```

**Step 6: Preview and verify**

```bash
pnpm dev
```

**Step 7: Commit**

```bash
git add src/content/docs/dashboard/filter-by-date.mdx astro.config.mjs
git commit -m "docs: add filter by date page for dashboard"
```

---

### Task 15: Update Settings page

**Files:**
- Modify: `src/content/docs/settings/settings.mdx`

Two additions to the existing page:

1. **Phone number friendly names** — inside the Telephony section or a new sub-section
2. **Organization hours** — inside the General section (the org profile now includes hours)

**Step 1: Explore the feature**

In Settings, find:
- Where friendly names for phone numbers appear (likely Telephony tab or a Phone Numbers section)
- What the field looks like and how it's saved
- Whether org hours appear in the General tab or a separate Profile tab

**Step 2: Take screenshots (only if the UI changed)**

```
/tmp/settings-telephony-new.png   — Telephony tab showing friendly name field (if different from existing screenshot)
/tmp/settings-general-new.png     — General tab showing org hours (if different from existing screenshot)
```

**Step 3: Upload screenshots (if new screenshots taken)**

```bash
./scripts/upload-screenshot.sh /tmp/settings-telephony-new.png settings/settings-telephony-v2.png
./scripts/upload-screenshot.sh /tmp/settings-general-new.png settings/settings-general-v2.png
```

**Step 4: Edit the settings page**

In `src/content/docs/settings/settings.mdx`:

- In the **Telephony** section, add a **Phone number friendly names** sub-section explaining that owned numbers can have human-readable labels and where to set them.
- In the **General** section, update the field table to include the expanded org profile fields (business hours, etc.) now that org profile is a full-featured form.

Update the General section table to reference the new Organization Profile fields. Point to the [Organization Profile](/agents/organization-profile) page for full details.

**Step 5: Preview and verify**

```bash
pnpm dev
```

Open `http://localhost:4321/settings/settings`. Verify changes render correctly.

**Step 6: Commit**

```bash
git add src/content/docs/settings/settings.mdx
git commit -m "docs: update settings page for org profile and phone friendly names"
```

---

### Task 16: Push Phase 3 branch and open PR

**Step 1: Push branch**

```bash
git push -u origin docs/multi-v030-phase3-calls-dashboard
```

**Step 2: Open PR**

```bash
gh pr create \
  --title "docs: add calls, dashboard, and settings updates for v0.3.0" \
  --body "$(cat <<'EOF'
## Summary

- Add Cold Transfer page explaining agent-side call handoff to humans
- Add End Call Tool page explaining programmatic hangup
- Add Dashboard section with Filter by Date page
- Update Settings page for organization profile expansion and phone number friendly names

## Pages affected

- `src/content/docs/calls/cold-transfer.mdx` — new
- `src/content/docs/calls/end-call.mdx` — new
- `src/content/docs/dashboard/filter-by-date.mdx` — new
- `src/content/docs/settings/settings.mdx` — updated
- `astro.config.mjs` — add Dashboard section, add 2 pages to Calls section

## Screenshots

[List uploaded Blob URLs here]
EOF
)"
```

---

## Summary

| Phase | Branch | Pages | PRs |
|-------|--------|-------|-----|
| 1 | `docs/multi-v030-phase1-sms-contacts` | 6 (2 new Messaging, 3 new + 1 rewrite Contacts) | #1 |
| 2 | `docs/agents-v030-phase2-agent-config` | 3 (new Agents section) | #2 |
| 3 | `docs/multi-v030-phase3-calls-dashboard` | 3 new + 1 update | #3 |
| **Total** | 3 branches | **13 pages** | **3 PRs** |
