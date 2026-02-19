---
name: writing-loquent-docs
description: Use when writing, editing, or reviewing any MDX documentation page in the loquent-docs repository. Covers voice, structure, screenshots, formatting, and anti-patterns.
---

# Writing Loquent Docs

Every documentation page follows the rules in `WRITING-DOCS.md`. This skill is the quick reference. For full details, read the complete guide.

## Voice & Tone

- Second person ("you"), present tense ("click", not "clicked").
- Direct. Say what to do, then why.
- No filler: "simply", "just", "easily", "please note that", "in order to".
- No hedging: "might", "could", "may want to", "you can try".

## Page Structure

```yaml
---
title: Title Case, Max 60 Chars
description: Sentence case, max 160 chars, no period
---
```

- **H2** for major sections (action-oriented: "Create an agent").
- **H3** for subsections. Never skip levels. Never use H1.
- Max **15 lines** of prose before a visual break (heading, screenshot, table, code block).

## Screenshot Protocol

Screenshots are **mandatory** for UI flows. Every user action needs a screenshot.

### Capture

1. Read credentials from `.claude-cred` (`LOQUENT_EMAIL`, `LOQUENT_PASSWORD`, `LOQUENT_APP_URL`).
2. Log in via Playwright MCP tools. Wait for dashboard.
3. Use `browser_take_screenshot` after each meaningful UI state.
4. Wait for loading/animations to settle before capturing.

### Upload

```bash
./scripts/upload-screenshot.sh <local-file> <destination-path>
```

The script uploads to Vercel Blob, prints the public URL, and deletes the local file.

### Blob pathname: `{section}/{page-slug}-{descriptor}.png`

All lowercase, hyphens only. `{section}` = docs directory name. `{page-slug}` = MDX filename. PNG only.

### MDX reference

```mdx
<img src="https://wxaijzyufbt0o3u0.public.blob.vercel-storage.com/getting-started/sign-up-form.png" alt="Descriptive alt text" />
```

No imports. Plain `<img>` tags. Every image **must** have `alt` text describing what the user sees.

## Content Rules

| Rule | Detail |
|------|--------|
| Lead with UI | Describe what the user sees, then what to do |
| One concept per page | One feature or workflow per `.mdx` file |
| Action headings | "Create an agent", not "Agent creation" |
| Tables over lists | For comparisons and field definitions |
| Callouts sparingly | Max 2 per page. Never nest. Never put steps inside. |
| **Bold** for UI elements | **Save**, **Agents**, **Settings** |
| `Code` for values | `production`, `astro.config.mjs`, `LOQUENT_EMAIL` |

## Anti-Patterns

Do **not**: start with "In this guide you will learn...", write paragraphs longer than 4 sentences, use passive voice, add screenshots without alt text, reference internal code/APIs, use "click here" link text, nest callouts, document features that don't exist yet, add emoji.

## File Conventions

- Files: all lowercase, hyphens, max 3 words. Name after the action or noun.
- Every new page must be added to the sidebar in `astro.config.mjs`.
- Screenshots stored in Vercel Blob. Local `src/assets/screenshots/` is temporary only.
