# Loquent Docs

User documentation for [Loquent](https://loquent.io), the AI-powered communications platform. This site is built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build), and every page is written, screenshotted, and maintained by an AI agent — no human writes docs.

**Live site:** [docs.loquent.io](https://docs.loquent.io)

---

## How it works

Documentation is fully automated. After each deployment of the [main Loquent app](https://github.com/Monsoft-Solutions/loquent-app), a Claude Code agent runs against this repository to bring the docs in sync with the latest UI:

1. **Logs into the live app** using credentials stored in `.claude-cred`
2. **Navigates each feature flow** using Playwright MCP tools
3. **Captures screenshots** of every meaningful UI state
4. **Uploads screenshots** to Vercel Blob storage (not committed to git)
5. **Writes or updates MDX pages** following the rules in [`WRITING-DOCS.md`](./WRITING-DOCS.md)
6. **Pushes a branch and opens a PR** to `main` following the rules in [`AGENT-WORKFLOW.md`](./AGENT-WORKFLOW.md)
7. **PR is reviewed and merged**, triggering a Vercel deployment

The result: docs that always match the product, with pixel-accurate screenshots, written in a consistent voice — maintained at zero human cost.

## Architecture

```
loquent-docs/
├── src/content/docs/       # MDX documentation pages
├── src/components/         # Custom Astro components
├── src/styles/             # Custom CSS (Inter + JetBrains Mono)
├── scripts/
│   ├── upload-screenshot.sh  # Upload a screenshot to Vercel Blob
│   └── upload-blob.mjs       # Node.js uploader (used by the shell script)
├── WRITING-DOCS.md         # Documentation standards the agent follows
├── AGENT-WORKFLOW.md       # Git branching and PR workflow the agent follows
└── .claude-cred            # Agent credentials (gitignored)
```

### Screenshot pipeline

Screenshots are stored in [Vercel Blob](https://vercel.com/docs/storage/vercel-blob), not in git. This keeps the repo lean and avoids bloating history with binary diffs.

The agent workflow for a new screenshot:

```bash
# 1. Capture via Playwright MCP (browser_take_screenshot)
# 2. Upload to Vercel Blob
./scripts/upload-screenshot.sh src/assets/screenshots/agents/create-agent-form.png agents/create-agent-form.png
# → https://wxaijzyufbt0o3u0.public.blob.vercel-storage.com/agents/create-agent-form.png

# 3. Reference in MDX with a plain <img> tag
# <img src="https://wxaijzyufbt0o3u0.public.blob.vercel-storage.com/agents/create-agent-form.png" alt="..." />
```

### Writing standards

Every page follows the rules in [`WRITING-DOCS.md`](./WRITING-DOCS.md):

- Second person, present tense, no filler
- Action-oriented headings ("Create an agent", not "Agent creation")
- Mandatory screenshots for every UI flow
- Descriptive `alt` text on every image
- Max 15 lines of prose before a visual break
- Starlight callouts used sparingly (max 2 per page)

## Agent credentials

The agent reads credentials from **`.claude-cred`** at the project root. This file is gitignored and must be created manually on any machine that runs the doc-writing agent.

```
LOQUENT_EMAIL=<email for app login>
LOQUENT_PASSWORD=<password for app login>
LOQUENT_APP_URL=https://app.loquent.io
BLOB_READ_WRITE_TOKEN=<vercel blob read-write token>
```

| Variable | Purpose |
|----------|---------|
| `LOQUENT_EMAIL` | Email to authenticate with the Loquent app |
| `LOQUENT_PASSWORD` | Password for the Loquent app |
| `LOQUENT_APP_URL` | Base URL of the Loquent app |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token for uploading screenshots |

## Local development

```bash
pnpm install
pnpm dev        # Start dev server at localhost:4321
pnpm build      # Production build to dist/
pnpm preview    # Preview the production build
```

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro](https://astro.build) |
| Docs theme | [Starlight](https://starlight.astro.build) |
| Screenshot storage | [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) |
| Hosting | [Vercel](https://vercel.com) |
| Doc-writing agent | [Claude Code](https://claude.com/claude-code) |
| Browser automation | [Playwright MCP](https://github.com/anthropics/mcp) |

## License

Proprietary. Copyright Monsoft Solutions.
