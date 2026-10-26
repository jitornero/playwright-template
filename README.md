# Playwright Template

A lightweight Playwright + TypeScript automation starter using Page Object Model (POM) and GitHub Actions.

## Requirements

- Node.js 22+
- npm

## Quick start

```bash
npm install
npx playwright install chromium
npm test
```

Additional commands:

```bash
npm run typecheck
npm run test:headed
npm run test:ui
npm run test:report
```

Commit the generated `package-lock.json` after installing dependencies, then change CI from `npm install` to `npm ci` for reproducible builds.

## Structure

- `pages/`: page objects for page-specific selectors and reusable user actions
- `tests/`: independently executable scenarios and assertions
- `playwright.config.ts`: Chromium configuration and reporting
- `.github/workflows/`: CI for PRs and merges to `main`

## Demo test

The login test uses [SauceDemo](https://www.saucedemo.com/) and its public demo account (`standard_user` / `secret_sauce`). It verifies navigation to the inventory page.

**Never commit private credentials.** Use environment variables and GitHub Actions secrets for sensitive environments.

## Principles

- Keep tests readable and focused on behavior.
- Encapsulate page-specific selectors in POM without needless abstraction.
- Favor accessible locators and Playwright auto-waiting over CSS paths and fixed waits.
- Keep tests independent for parallel execution.
- Introduce fixtures, helpers and additional layers only as they become useful.

## Continuous integration

GitHub Actions type-checks and runs the Chromium test on pull requests to `main`, merges/pushes to `main`, and manual dispatch. Reports and traces are uploaded on failure. No secrets are required for the public demo.

## Reuse

Use **Use this template** on GitHub to create an independent repository and replace the example app and tests.

MIT licensed. See [LICENSE](LICENSE).
