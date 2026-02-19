---
name: loquent-docs-git-workflow
description: Use when starting a documentation session, creating branches, committing changes, or opening pull requests in the loquent-docs repository. Enforces branch-based workflow with PR review before merging to main.
---

# Loquent Docs Git Workflow

**Never commit directly to `main`.** All work happens on a branch and reaches `main` through a pull request. For full details, read `AGENT-WORKFLOW.md`.

## Session Start

```bash
git checkout main
git pull origin main
git checkout -b docs/<scope>-<description>
```

### Branch naming: `docs/<scope>-<description>`

| Segment | Rules |
|---------|-------|
| `docs/` | Required prefix |
| `<scope>` | Docs section: `getting-started`, `agents`, `calls`, etc. Use `multi` for cross-section changes |
| `<description>` | 2-4 hyphenated words with a verb: `add-`, `update-`, `rewrite-`, `fix-` |

All lowercase, hyphens only, max 60 characters. Never reuse branch names.

## Commits

- Small, focused commits. One logical unit per commit.
- Prefix with `docs:`. Imperative mood. Max 72 characters.

```
docs: add sign-up page with screenshots
docs: update agent config screenshot after UI change
docs: fix alt text on buy-number screenshots
```

## Push and PR

```bash
git push -u origin <branch-name>
gh pr create --title "<title>" --body "<body>"
```

### PR title

- Max 70 characters. Start with `docs:`. Describe what the PR **delivers**.

### PR body structure

```markdown
## Summary

- <Pages added, updated, or removed>
- <Screenshots captured or refreshed>
- <Structural changes (new sections, sidebar updates)>

## Pages affected

- `src/content/docs/path/to/page.mdx` — <one-line description>

## Screenshots

<Blob URLs of new/updated screenshots, or "No screenshot changes">
```

- Summary: 1-5 bullet points. No paragraphs.
- List every affected MDX file.
- List every screenshot blob URL for reviewer verification.

## After Merge

Do not delete the remote branch. GitHub auto-deletes after merge. Next session: start from `git checkout main && git pull origin main`.

## Red Flags

| If you catch yourself doing this... | Stop and correct |
|--------------------------------------|-----------------|
| Committing to `main` | Check out a new branch immediately |
| One giant commit at the end | Break into logical units |
| Branch name without `docs/` prefix | Rename with `git branch -m` |
| PR without screenshot URLs | Add them before submitting |
| Pushing without a PR | Create the PR with `gh pr create` |
