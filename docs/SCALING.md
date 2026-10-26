# Scaling Guide

> **Reference only — not an implementation plan for this repository.** This document describes optional patterns a team may consider when adapting the Playwright template to a growing project. The example directories, files and configurations below do **not** exist in this starter and should not be added solely because they appear here. Adopt only what is justified by real project needs.

This template is intentionally small: one test, one page object, one config. This guide explains what the minimum a Playwright project needs and what to consider as the project grows. The principle is simple: **add a layer when the pain shows up, not before.**

## 1. The minimum a project needs

| Piece | Purpose |
| --- | --- |
| `playwright.config.ts` | baseURL, projects, retries, reporters, trace. One place for runner behavior. |
| `tests/*.spec.ts` | Independent scenarios that can run in parallel. |
| `pages/*.ts` | Page objects for page-specific locators and actions; assertions kept in tests. |
| `tsconfig.json` + `typecheck` script | Catches type errors before a browser is launched. |
| Pinned Playwright version + lockfile | Reproducible npm installs; match the CI container version. |
| CI on pull requests | Detects broken tests before merging; blocking merges additionally requires branch protection. |
| `.gitignore` for outputs and secrets | No `test-results/`, `playwright-report/` or `.env` in the repo. |
| `.env.example` *(optional)* | Documents environment variables without exposing values when projects need configuration. |
| README with how to run | Clone and run in a few commands. |

Deliberately left out at this stage: lint, formatter, custom fixtures, component layer, utilities, external test data, multiple browsers, git hooks. Each is useful when it addresses a real need.

## 2. Growth stages (illustrative, not prescriptive)

The test counts below are **orientation only**, not thresholds requiring architectural changes.

### Stage 0 · Starter (1–10 tests, 1 person)

What this template has today: config, `tests/`, `pages/`, lockfile and basic CI.

### Stage 1 · Order (10–50 tests, 1–3 people)

Consider:

- `fixtures/`: a `test.extend` that provides reused page objects when repeated initialization becomes noisy.
- `test-data/` and environment variables for different environments and test users.
- Reusing authentication with `storageState` (while isolating users, roles and mutable sessions across parallel tests).
- ESLint with `eslint-plugin-playwright` and a formatter (Prettier or Biome).
- Tags (`@smoke`, `@regression`) and `--grep` to run subsets.

**Trigger:** repetitive setup or shared conventions make individual tests harder to maintain.

### Stage 2 · Layers (50–200 tests, a team)

Consider:

- `components/` for repeated widgets (table, modal, toast, menu).
- `api/` helpers to create and clean up data without going through the UI.
- `utils/` for dates, IDs, files.
- Feature-based organization in `pages/` and `tests/`, when navigation becomes difficult.
- More browsers, sharding in CI, pre-commit checks (lint-staged).
- CODEOWNERS and a pull request template.

**Trigger:** duplicated behavior across pages, difficult navigation, or costly maintenance; line counts alone are not decisive.

### Stage 3 · Platform (200+ tests, several teams)

Consider:

- File-type naming conventions (for example `.page.ts`, `.component.ts`, `.util.ts`) and optional path aliases.
- Custom lint rules and naming checks.
- Test-management and reporting integration (JUnit, dashboards).
- Per-environment config, managed secrets and release tags.
- Written conventions in `docs/`.

**Trigger:** several teams need enforced standards and centralized integration, rather than conventions that live only in people's memory.

## 3. Reference structures (examples only — do not create these in this template)

### Possible Stage 2 layout

~~~text
repo/
├── .github/workflows/
├── src/
│   ├── pages/
│   │   ├── login.page.ts
│   │   └── checkout/
│   │       └── cart.page.ts
│   ├── components/        # reusable widgets
│   │   ├── table.ts
│   │   └── modal.ts
│   ├── fixtures/
│   │   └── index.ts       # test.extend with page objects
│   ├── api/               # data setup/teardown via API
│   ├── test-data/         # users, factories
│   └── utils/
├── tests/
│   ├── auth.setup.ts      # optional storageState setup
│   ├── smoke/
│   └── regression/
├── .env.example
├── playwright.config.ts
└── eslint / prettier / tsconfig
~~~

Grouping tests by feature and filtering by tags is equally valid; separating `smoke/` and `regression/` is **not** required.

### Possible Stage 3 layout (large project)

~~~text
repo/
├── source/
│   ├── tests/             # specs grouped by feature or suite
│   ├── pages/             # page objects grouped by feature
│   ├── components/        # reusable UI widgets
│   ├── steps/             # reusable cross-page flows, only if valuable
│   ├── apis/              # API clients for setup/teardown
│   ├── utilities/         # helpers + shared types
│   └── resources/         # data, files, snapshots
├── .config/               # eslint, prettier, tooling scripts
├── eslint-custom-plugin/  # project-specific lint rules
├── .husky/                # git hooks
├── docs/                  # conventions and guides
├── reports/
└── playwright.config.ts
~~~

A Steps layer is optional: introduce one to encapsulate meaningful reusable flows, **not** solely to wrap page-object methods.

## 4. This template vs. a large project

| Aspect | This template | Possible large project |
| --- | --- | --- |
| Size | 1 spec, 1 page object | Hundreds of files across pages, components, steps, utilities |
| Folders | `pages/`, `tests/` at the root | Optional `source/` grouping, split by responsibility |
| Naming | `LoginPage.ts` | Explicit suffix by file type |
| Pages | Flat | Grouped by feature; shared base only if justified |
| Reuse | Minimal | Components, reusable flows and API helpers |
| Imports | Relative paths | Optional path aliases |
| Config | Fixed baseURL, one browser | Multiple browsers/environments when needed |
| Data and secrets | Public demo credentials | Managed secrets and domain-specific test data |
| Code quality | `tsc --noEmit` | Lint, formatter and appropriate static analysis |
| CI | One workflow | Parallel jobs, shards, reports and integrations as needed |
| Process | README | CODEOWNERS, PR templates and written conventions |

## 5. Possible next steps when adapting this template

These are **suggestions for future adopters**, not tasks to implement in `playwright-template` now:

1. Add `.env.example` and read `BASE_URL` from the environment when environments differ.
2. Add a second page object and test when additional user flows justify it.
3. Add custom fixtures and `storageState` when repetitive setup and authentication become costly.
4. Add `eslint-plugin-playwright` and formatting rules when multiple contributors need consistent conventions.

**Bottom line:** keep the starter minimal. Treat the proposed structures as a reference, not a checklist or mandatory roadmap.
