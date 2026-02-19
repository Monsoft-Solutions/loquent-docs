# Agent Workflow Guide

This guide governs how the doc-writing agent operates in this repository. Follow every rule. No exceptions.

---

## 1. Branch Strategy

**Never commit directly to `main`.** All documentation work happens on a dedicated branch and reaches `main` through a pull request.

### Starting a session

1. Check out `main` and pull the latest changes:
   ```bash
   git checkout main
   git pull origin main
   ```
2. Create a new branch from `main`:
   ```bash
   git checkout -b <branch-name>
   ```

### Branch naming

Use this format:

```
docs/<scope>-<description>
```

| Segment | Rules |
|---------|-------|
| `docs/` | Always prefix with `docs/`. Every branch in this repo is documentation work. |
| `<scope>` | The docs section being changed: `getting-started`, `agents`, `calls`, etc. Use `multi` if the change spans multiple sections. |
| `<description>` | 2–4 hyphenated words describing what changes. Use verbs: `add-`, `update-`, `rewrite-`, `fix-`. |

Examples:
- `docs/getting-started-add-sign-up-page`
- `docs/agents-update-voice-settings`
- `docs/multi-refresh-all-screenshots`
- `docs/getting-started-fix-broken-images`

Rules:
- All lowercase, hyphens only.
- Max 60 characters total.
- Never reuse a branch name. If a branch was merged or deleted, pick a new name.

---

## 2. Making Changes

### Commit discipline

- Make **small, focused commits** as you work. Do not save everything for a single commit at the end.
- Each commit should represent one logical unit of work (e.g., "add sign-up page screenshots", "write sign-up page content").
- Write commit messages in imperative mood, lowercase, max 72 characters:
  ```
  docs: add sign-up page with screenshots
  docs: update agent config screenshot after UI change
  docs: fix alt text on buy-number screenshots
  ```
- Prefix every commit message with `docs:`.

### Screenshot workflow

1. Capture the screenshot via Playwright MCP tools.
2. Upload to Vercel Blob using the upload script:
   ```bash
   ./scripts/upload-screenshot.sh <local-file> <destination-path>
   ```
3. Use the returned URL in the MDX `<img>` tag.
4. The script deletes the local file automatically after upload.

Refer to [`WRITING-DOCS.md`](./WRITING-DOCS.md) for screenshot naming conventions, capture rules, and MDX referencing patterns.

---

## 3. Pushing and Creating a Pull Request

### Push the branch

```bash
git push -u origin <branch-name>
```

### Create a pull request

Use the GitHub CLI to create the PR:

```bash
gh pr create --title "<title>" --body "<body>"
```

#### PR title

- Max 70 characters.
- Start with `docs:` prefix.
- Describe what the PR delivers, not what you did.

Examples:
- `docs: add getting started sign-up page`
- `docs: refresh all agent screenshots after UI redesign`
- `docs: add buy phone number walkthrough`

#### PR body

Every PR body must follow this structure:

```markdown
## Summary

- <What pages were added, updated, or removed>
- <What screenshots were captured or refreshed>
- <Any structural changes (new sections, sidebar updates, etc.)>

## Pages affected

- `src/content/docs/path/to/page.mdx` — <brief description of change>

## Screenshots

<List new or updated screenshots with their blob URLs, or "No screenshot changes" if none>
```

Rules:
- The summary must have **1–5 bullet points**. No paragraphs.
- Every affected MDX file must be listed with a one-line description of the change.
- If screenshots were uploaded, list the blob URLs so reviewers can verify them.

---

## 4. After the PR is Merged

Do **not** delete the remote branch manually. GitHub is configured to auto-delete branches after merge.

If you start a new session after a merge, always begin from step 1: check out `main`, pull, create a new branch.

---

## 5. Complete Example

A full session from start to finish:

```bash
# 1. Start from main
git checkout main
git pull origin main

# 2. Create a branch
git checkout -b docs/getting-started-add-sign-up-page

# 3. Do the work (capture screenshots, write MDX, etc.)
#    ... agent captures screenshots via Playwright ...
./scripts/upload-screenshot.sh src/assets/screenshots/getting-started/sign-up-form.png getting-started/sign-up-form.png
#    ... agent writes the MDX page ...

# 4. Commit as you go
git add src/content/docs/getting-started/sign-up.mdx
git commit -m "docs: add sign-up page with form and dashboard screenshots"

# 5. Push
git push -u origin docs/getting-started-add-sign-up-page

# 6. Open PR
gh pr create \
  --title "docs: add getting started sign-up page" \
  --body "## Summary

- Add sign-up page covering account creation and dashboard overview
- Upload 2 screenshots: sign-up form, dashboard after login

## Pages affected

- \`src/content/docs/getting-started/sign-up.mdx\` — new page

## Screenshots

- https://wxaijzyufbt0o3u0.public.blob.vercel-storage.com/getting-started/sign-up-form.png
- https://wxaijzyufbt0o3u0.public.blob.vercel-storage.com/getting-started/sign-up-dashboard.png"
```
