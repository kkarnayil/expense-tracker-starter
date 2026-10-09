---
name: deploy
description: Deploy the expense tracker to staging - run lint and tests, build for production, then push the built dist/ to the `staging` branch of the `staging` git remote. Use when the user asks to deploy, ship, or push to staging.
disable-model-invocation: true
---

# Deploy to staging

Run these steps in order from the project root. **Stop at the first failure**,
show the user the failing output, and do not continue to later steps. Never
skip or weaken a check to get a deploy through.

## 1. Preflight

- `git remote get-url staging` must succeed. If it doesn't, stop and tell the
  user to add one: `git remote add staging <url-of-a-repo-they-own>`. Do not
  push to `origin` (it is the course author's repo).
- Run `git status --porcelain`. If there are uncommitted changes, tell the user
  the build will include them and ask whether to continue.
- Note the current commit for the deploy message: `git rev-parse --short HEAD`.

## 2. Tests

1. `npm run lint` - must exit 0.
2. If `package.json` has a `test` script, run `npm test` (non-watch, e.g.
   `npm test -- --run` for Vitest) - must exit 0. If there is no `test`
   script, say so in the report ("no tests configured, lint only") and continue.

## 3. Production build

`npm run build` - must exit 0 and produce `dist/index.html`. The chunk-size
warning from Vite is not a failure.

## 4. Push to staging

`dist/` is gitignored, so publish it as its own commit on the `staging`
branch (the branch holds only the built site, like a `gh-pages` branch).
Bash:

```bash
url=$(git remote get-url staging)
sha=$(git rev-parse --short HEAD)
cd dist
rm -rf .git
git init -q -b staging
git add -A
git commit -q -m "Deploy $sha to staging"
git push -f "$url" staging
rm -rf .git
```

The push is a force push by design: each deploy replaces the staging branch
with the latest build. It never touches `main` or any other branch.

## 5. Report

Tell the user: the commit deployed, whether tests ran or only lint, the build
size from the Vite output, and the remote + branch pushed to. If anything
failed, report which step and the error output instead.
