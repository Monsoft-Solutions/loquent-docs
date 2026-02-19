# CLAUDE.md — loquent-docs

This is the documentation site for [Loquent](https://loquent.io), an AI-powered communications platform. Documentation is written and maintained entirely by AI agents.

## Mandatory Skills

Before doing any work in this repo, load and follow these skills:

- **writing-loquent-docs** — Writing standards, page structure, screenshot protocol, formatting rules
- **loquent-docs-git-workflow** — Branching strategy, commit discipline, PR creation

These skills are non-negotiable. Every agent session must follow them.

## Credentials

All credentials live in `.claude-cred` at the project root (gitignored). Read it as key-value pairs, one per line.

| Variable | Purpose |
|----------|---------|
| `LOQUENT_EMAIL` | App login email |
| `LOQUENT_PASSWORD` | App login password |
| `LOQUENT_APP_URL` | Base URL of the Loquent app |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token for screenshot uploads |

## Key Commands

```bash
pnpm dev          # Dev server at localhost:4321
pnpm build        # Production build
./scripts/upload-screenshot.sh <file> <dest>  # Upload screenshot to Vercel Blob
```

## Reference Docs

- `WRITING-DOCS.md` — Full documentation standards (expanded version of the writing skill)
- `AGENT-WORKFLOW.md` — Full git workflow guide (expanded version of the workflow skill)
