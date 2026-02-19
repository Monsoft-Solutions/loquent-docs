# Documentation Standards Guide

This guide governs how user-facing documentation is written for the Loquent docs site (`loquent-docs`). Follow every rule. No exceptions.

---

## 1. Voice & Tone

- Write in **second person** ("you"), **present tense** ("click", not "clicked").
- Be direct. Say what to do, then why — never the reverse.
- No filler phrases: remove "simply", "just", "easily", "please note that", "it should be noted", "in order to".
- No hedging: remove "might", "could", "may want to", "you can try".
- Assume the reader is a competent professional who wants to get things done.

---

## 2. Page Structure

### Frontmatter

Every `.mdx` file starts with YAML frontmatter:

```yaml
---
title: Page Title Here
description: One sentence. What the reader learns or accomplishes.
---
```

- `title` — Title case, max 60 characters.
- `description` — Sentence case, max 160 characters. No period at the end.

### Heading Hierarchy

- **H2 (`##`)** — Major sections. Use action-oriented phrasing ("Create an agent", not "Agent creation").
- **H3 (`###`)** — Subsections within an H2.
- **Never skip levels** (no H4 under H2).
- **Never use H1** — Starlight renders the `title` frontmatter as H1.

### Section Length

- Max **15 lines** of prose per section before a heading, screenshot, code block, or table breaks it up.
- If a section grows beyond this, split it.

---

## 3. Screenshot Protocol

Screenshots are **mandatory** for any page that describes a UI flow. Every action the user takes in the app must have a corresponding screenshot.

### Taking Screenshots

Use the **Playwright MCP tools** to capture screenshots from the live app.

#### Login Flow

1. Load credentials from `.claude-cred` at the project root (key-value pairs, one per line).
2. Navigate to the app URL from `LOQUENT_APP_URL`.
3. Authenticate using `LOQUENT_EMAIL` and `LOQUENT_PASSWORD`.
4. Wait for the dashboard to load before proceeding.

```
# .claude-cred format
LOQUENT_EMAIL=user@example.com
LOQUENT_PASSWORD=password123
LOQUENT_APP_URL=https://app.loquent.io
```

#### Capture Rules

- Use `browser_take_screenshot` after each meaningful UI state.
- Capture the **full viewport** unless documenting a specific element (use `ref` for element screenshots).
- Wait for loading states to resolve before capturing.
- If a page has animations, wait for them to settle.

### Uploading Screenshots

Screenshots are stored in **Vercel Blob** (not committed to git). Use the upload script after capturing a screenshot locally:

```bash
./scripts/upload-screenshot.sh <local-file> <destination-path>
```

Example:
```bash
./scripts/upload-screenshot.sh src/assets/screenshots/getting-started/sign-up-form.png getting-started/sign-up-form.png
# Output: https://wxaijzyufbt0o3u0.public.blob.vercel-storage.com/getting-started/sign-up-form.png
```

The script:
1. Reads `BLOB_READ_WRITE_TOKEN` from `.claude-cred`.
2. Uploads the file to Vercel Blob with public access.
3. Prints the public URL to stdout.
4. Deletes the local file.

### Blob Pathname Convention

```
{section}/{page-slug}-{descriptor}.png
```

Examples:
- `getting-started/welcome-dashboard-overview.png`
- `agents/create-agent-form.png`
- `agents/create-agent-voice-tab.png`

Rules:
- All lowercase, hyphens only.
- `{section}` matches the docs directory name.
- `{page-slug}` matches the `.mdx` filename (without extension).
- `{descriptor}` describes what the screenshot shows.
- Format: **PNG only**.

### Referencing in MDX

Use plain `<img>` tags with the blob URL (no imports needed):

```mdx
<img src="https://wxaijzyufbt0o3u0.public.blob.vercel-storage.com/getting-started/sign-up-form.png" alt="The Loquent sign-up form" />
```

- Every image **must** have a descriptive `alt` attribute.
- `alt` describes what the user sees, not what the image "is" (write "The agent list showing three active agents", not "Screenshot of agent list").

---

## 4. Content Rules

### Lead with What the User Sees

Start each page or section by describing the UI the reader is looking at, then explain what to do.

**Good:**
> The Agents page shows a table of all your agents. Each row displays the agent name, status, and assigned phone number.

**Bad:**
> Agents are a core concept in Loquent. An agent represents a virtual assistant that handles calls.

### One Concept per Page

Each `.mdx` file covers **one** feature or workflow. If you find yourself writing "see also" links mid-page, split the content.

### Action-Oriented Headings

Headings tell the reader what they will **do**, not what they will **learn about**.

| Do this | Not this |
|---------|----------|
| Create an agent | Agent creation |
| Configure voice settings | Voice settings overview |
| Connect a phone number | Phone number configuration |
| Test your first call | Testing calls |

---

## 5. Formatting

### Callouts

Use Starlight's built-in callout syntax:

```mdx
:::note
Supplementary information the reader might find useful.
:::

:::tip
A shortcut, best practice, or time-saving suggestion.
:::

:::caution
Something that could cause problems if ignored.
:::

:::danger
An action that is irreversible or could break the system.
:::
```

- Use callouts **sparingly** — max 2 per page.
- Never put critical steps inside a callout. Steps belong in the main flow.

### Tables Over Lists

When comparing options or showing field definitions, use a table.

```mdx
| Field | Required | Description |
|-------|----------|-------------|
| Name  | Yes      | Display name for the agent |
| Voice | Yes      | The TTS voice the agent uses |
| Greeting | No   | First message spoken when a call connects |
```

### Code Blocks

- Use code blocks for **exact values** the user must type or paste.
- Always specify the language: ` ```json `, ` ```bash `, etc.
- Keep code blocks short (under 20 lines). If longer, explain what to change and show only the relevant snippet.

### Bold & Inline Code

- **Bold** for UI element names: **Save**, **Agents**, **Settings**.
- `Inline code` for values, file names, environment variables: `production`, `astro.config.mjs`, `LOQUENT_EMAIL`.

---

## 6. Anti-Patterns

Do **not** do any of the following:

| Anti-pattern | Why |
|-------------|-----|
| Start with "In this guide you will learn..." | Wastes the reader's time. Jump to content. |
| Write paragraphs longer than 4 sentences | Walls of text are skipped. Break them up. |
| Use passive voice | "The agent is created" → "Create the agent". |
| Add screenshots without alt text | Accessibility violation. |
| Reference internal code or APIs | This is user docs, not developer docs. |
| Use "click here" as link text | Use descriptive link text: "see [agent configuration](/agents/configure/)". |
| Nest callouts | One level only. Never a callout inside a callout. |
| Document features that don't exist yet | Only document what's live in the app today. |
| Add emoji to headings or body text | Keep it professional. |
| Write "Note:" or "Important:" in plain text | Use the `:::note` or `:::caution` callout syntax instead. |

---

## 7. File Conventions

### Directory Structure

```
src/content/docs/
├── index.mdx                    # Landing page (splash template)
├── getting-started/
│   ├── welcome.mdx
│   ├── create-account.mdx
│   └── first-call.mdx
├── agents/
│   ├── overview.mdx
│   ├── create-agent.mdx
│   └── configure-voice.mdx
└── calls/
    ├── overview.mdx
    ├── inbound-calls.mdx
    └── call-history.mdx
```

### File Naming

- All lowercase, hyphens for spaces.
- Max 3 words in the filename.
- Name files after the **action** or **noun** they cover: `create-agent.mdx`, `call-history.mdx`.

### Sidebar Registration

Every new page **must** be added to the sidebar in `astro.config.mjs`:

```js
sidebar: [
  {
    label: 'Section Name',
    items: [
      { label: 'Page Title', slug: 'section/page-slug' },
    ],
  },
],
```

The `slug` matches the file path under `src/content/docs/` without the extension.

### Asset Directory

Screenshots are stored in Vercel Blob. When capturing new screenshots, save them temporarily to `src/assets/screenshots/{section}/`, then upload using the upload script. The local file is deleted automatically after upload.
