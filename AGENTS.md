# AGENTS.md - ASTRA Streha na ključ

## Project identity

This repository contains a webapp for **ASTRA group d.o.o.**.

The webapp is intended for:

* fast indicative turnkey roof quote calculation,
* lead capture,
* additional inquiry generation,
* marketing support.

The product must always communicate that generated prices are **informative estimates**, not binding offers.

The app must never present an automatically calculated number as a final commercial offer.

---

## Strategic roles

* **Human owner:** ASTRA / David
* **Strategic orchestrator:** Tetti
* **Execution agent:** GPT-5.5 coder or equivalent coding agent

The human owner defines the business goal, product direction, pricing assumptions, risk tolerance and merge/release decisions.

Tetti defines product structure, architecture direction, task slicing, acceptance criteria and review questions.

The execution agent implements scoped coding tasks, runs commands, tests the result, commits changes and reports evidence.

---

## Core product rules

1. Do not present any calculated number as a final offer.
2. Always use a price range, not a single binding price.
3. Always state that the estimate is informative and non-binding.
4. Pricing logic must be isolated from UI.
5. Pricing values must live in configuration files, not hard-coded visual components.
6. Lead capture must be simple, clear and conversion-oriented.
7. Do not add external services without explicit approval.
8. Do not invent ASTRA group legal claims, guarantees, certificates, references or contact data.
9. User-facing Slovenian copy must be clear, professional and not overly sales-heavy.
10. Do not create fake final offer documents.
11. Do not imply that ASTRA has inspected the roof before a human actually reviews the inquiry.
12. Do not imply guaranteed availability, fixed delivery time or final price without explicit approval.

---

## Technical rules

1. Keep each task PR-sized.
2. Prefer simple architecture until a real backend is required.
3. Add or update tests when pricing logic changes.
4. Avoid unnecessary dependencies.
5. Do not commit secrets, API keys, private customer data or production credentials.
6. Do not change unrelated files.
7. Update documentation when behavior changes.
8. Use semantic, readable names.
9. Validate user input defensively.
10. Keep the app accessible:

* explicit labels,
* visible focus states,
* readable contrast,
* responsive layout,
* understandable error messages.

11. Keep pricing logic testable without browser UI.
12. Keep generated inquiry text readable and structured.
13. Prefer boring, maintainable code over clever abstractions.
14. Do not migrate stack or architecture without an explicit architecture PR.

---

## Current stack

Initial prototype:

* Static HTML/CSS/JavaScript
* Pricing engine as plain JavaScript module
* Pricing config as plain JavaScript module
* Node.js built-in test runner

Future stack may be changed only through an explicit architecture PR.

Possible future stack decisions may include:

* backend API,
* database,
* admin dashboard,
* CRM/email integration,
* PDF generation,
* analytics,
* deployment pipeline.

None of these may be added silently inside a feature PR.

---

## Agent permissions and autonomy

The execution coding agent is expected to operate with high autonomy inside a dedicated, isolated and rebuildable development VM or sandbox.

The agent has permission to:

* install local development tools,
* use root or passwordless sudo inside the VM,
* run package managers,
* start local development servers,
* run tests,
* inspect git status and diffs,
* create git branches,
* switch git branches,
* stage files,
* commit changes,
* push feature branches,
* prepare pull requests if the environment supports it.

The agent must not ask the human to perform routine setup, dependency installation, testing or git commands.

If a required runtime tool is missing, the agent should install or bootstrap it inside the VM and report the exact commands used.

The project truth is Git and the remote repository, not the local VM.

All durable work must be committed to Git.

---

## Main branch and release authority

The agent may create, commit and push feature branches.

The agent must never:

* push directly to `main`,
* merge its own work,
* force-push shared branches,
* delete remote branches,
* rewrite git history unless explicitly instructed,
* make release decisions.

Merge and release decisions belong to the human owner.

---

## Forbidden actions

The execution agent must not:

* merge directly to `main`,
* push directly to `main`,
* remove the informative-price disclaimer,
* replace the pricing engine with UI-only calculation,
* add tracking scripts before approval,
* add paid APIs before approval,
* add a database before the need is confirmed,
* add real email sending before approval,
* add authentication before approval,
* add external services before approval,
* create a fake final offer PDF,
* use production secrets,
* access production data,
* modify production infrastructure,
* change CI/CD secrets,
* force-push shared branches,
* delete remote branches,
* rewrite git history unless explicitly instructed,
* commit generated build artifacts unless the project explicitly requires them,
* expand scope without approval.

---

## Pricing rules

Pricing must remain configurable.

The app may calculate:

* indicative base price,
* lower and upper estimate range,
* roof complexity multipliers,
* access difficulty multipliers,
* optional work items,
* disclaimers.

The app must not calculate:

* final binding offer,
* legally binding contract price,
* guaranteed final cost,
* final work schedule,
* final material order.

Any pricing change must be easy to review.

When pricing logic changes:

* update tests,
* update pricing documentation,
* explain what changed,
* explain remaining assumptions.

---

## Lead capture rules

Lead capture must remain simple and useful.

The lead form should collect only necessary data, such as:

* name,
* email,
* phone,
* location,
* roof description,
* uploaded photos if supported,
* consent for ASTRA to respond to the inquiry.

The app must clearly explain that submitted information is used to respond to the inquiry.

Do not overbuild legal text.

Do not invent final GDPR/privacy-policy wording unless explicitly requested.

A placeholder privacy-policy link is acceptable only if clearly marked as a placeholder or future step.

---

## Slovenian copy rules

User-facing Slovenian text should be:

* clear,
* professional,
* practical,
* direct,
* not overly sales-heavy,
* understandable to a non-technical homeowner.

Avoid exaggerated claims such as:

* “najcenejša streha”,
* “garantirano najboljša cena”,
* “končna ponudba v 2 minutah”,
* “100 % točna cena”,
* “takojšnja uradna ponudba”.

Preferred wording:

* “informativna ocena”,
* “okvirni razpon cene”,
* “nezavezujoč izračun”,
* “za natančno ponudbo je potreben pregled podatkov”,
* “pošljite povpraševanje za nadaljnji pregled”.

---

## Definition of done

A task is done only when:

* requested behavior is implemented,
* scope has not expanded silently,
* tests pass,
* app can run locally,
* relevant manual smoke test is performed,
* docs are updated if needed,
* limitations are reported,
* risks are reported,
* next recommended PR is stated,
* final worktree is clean,
* feature branch is committed,
* feature branch is pushed if remote access is available.

---

## Required final report format

Every coding-agent run must end with:

```markdown
## Summary

## Files changed

## Commands run

## Git actions performed

## Tests and evidence

## Manual smoke test

## Not done / limitations

## Risks

## Suggested next PR
```

---

## Required evidence

The execution agent must report actual evidence.

Do not write “tests passed” unless tests were actually run.

If tests could not be run, explain:

* why they could not run,
* what was checked instead,
* what must be verified next.

For every completed PR, report:

* branch name,
* commit hash,
* commands run,
* test output summary,
* manual smoke test result,
* changed files,
* limitations,
* risks.

---

## Work-order discipline

Every task should be treated as a bounded work order.

The agent must:

* read the work order,
* inspect relevant files,
* avoid unrelated changes,
* implement only the requested scope,
* run tests,
* perform a manual smoke test,
* commit changes,
* push the feature branch if possible,
* report evidence.

The agent must not silently start the next PR.

The agent must not add features only because they seem useful.

If the work order is ambiguous, make the smallest reasonable interpretation and report the assumption.

---

## Security and privacy

Never commit:

* `.env` files with real secrets,
* API keys,
* passwords,
* private customer data,
* production credentials,
* personal documents,
* real customer inquiries unless anonymized.

Use fake/test data in tests and examples.

Do not connect to production systems unless explicitly instructed.

Do not add analytics, pixels, cookies, CRM tools or third-party scripts without approval.

---

## Documentation rules

Update documentation when behavior changes.

Relevant documentation may include:

* `README.md`,
* `docs/PRODUCT_BRIEF.md`,
* `docs/PRICING_MODEL.md`,
* `docs/NEXT_STEPS.md`,
* task files under `tasks/`.

Documentation must not overclaim readiness.

Use clear readiness language:

* prototype,
* MVP,
* informative calculator,
* lead capture draft,
* not production-ready,
* production requirements still pending.

---

## Testing rules

Pricing logic must be tested.

Tests should cover:

* valid simple roof calculation,
* complex roof calculation,
* invalid inputs,
* unknown configuration values,
* comparison between simple and complex scenarios,
* lower and upper estimate range behavior.

When UI behavior changes, add lightweight tests if practical.

Do not add heavy testing dependencies unless clearly justified.

Manual smoke testing is required for user-facing changes.

---

## Pull request size

Prefer small, reviewable PRs.

A good PR should usually contain one of:

* one UI/UX improvement,
* one pricing model improvement,
* one validation improvement,
* one documentation improvement,
* one architecture/setup improvement,
* one backend integration slice,
* one deployment slice.

Avoid mixed PRs that combine:

* visual redesign,
* pricing changes,
* backend changes,
* legal copy,
* analytics,
* deployment.

Split those into separate PRs.

---

## Default branch naming

Use descriptive feature branches.

Examples:

* `feat/pr-002-form-ux-gdpr`
* `feat/pr-003-responsive-polish`
* `feat/pr-004-lead-email-template`
* `feat/pr-005-pricing-config-admin`
* `feat/pr-006-backend-lead-storage`
* `fix/calculator-invalid-area`
* `docs/update-pricing-assumptions`

---

## Commit message style

Use concise, descriptive commit messages.

Examples:

* `Stabilize initial roof quote MVP`
* `Improve quote form UX and consent flow`
* `Add responsive polish for quote form`
* `Document pricing assumptions`
* `Add lead inquiry email template`

Do not use vague commit messages such as:

* `fix`
* `changes`
* `update`
* `stuff`
* `final`

---

## Production readiness

The app is not production-ready until explicitly approved by the human owner.

Before production, the project likely needs:

* confirmed ASTRA contact data,
* confirmed pricing assumptions,
* reviewed GDPR/privacy wording,
* reviewed legal disclaimers,
* real inquiry delivery flow,
* deployment target,
* domain configuration,
* analytics decision,
* spam protection decision,
* backup/export decision if data is stored,
* final manual QA.

Do not claim production readiness unless a release work order explicitly says so.
