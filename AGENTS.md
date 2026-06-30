# AGENTS.md - ASTRA Streha na ključ

## Project identity

This repository contains a webapp for **ASTRA group d.o.o.** for an indicative turnkey roof quote calculator and lead capture funnel.

The product must always communicate that generated prices are **informative estimates**, not binding offers.

## Strategic roles

- Human owner: ASTRA / David.
- Strategic orchestrator: Tetti.
- Execution agent: GPT-5.5 coder or equivalent coding agent.

## Core product rules

1. Do not present any calculated number as a final offer.
2. Always use a price range, not a single binding price.
3. Pricing logic must be isolated from UI.
4. Pricing values must live in configuration files, not hard-coded visual components.
5. Lead capture must be simple and conversion-oriented.
6. Do not add external services without explicit approval.
7. Do not invent ASTRA group legal claims, guarantees, certificates, references or contact data.
8. User-facing Slovenian copy must be clear, professional and not overly sales-heavy.

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
10. Keep the app accessible: labels, focus states, contrast and responsive layout.

## Current stack

Initial prototype:

- Static HTML/CSS/JavaScript.
- Pricing engine as plain JavaScript module.
- Node.js built-in test runner.

Future stack may be changed only through an explicit architecture PR.

## Definition of done

A task is done only when:

- requested behavior is implemented,
- scope has not expanded silently,
- tests pass,
- docs are updated if needed,
- limitations are reported,
- next recommended PR is stated.

## Required final report format

Every coding-agent run must end with:

```markdown
## Summary

## Files changed

## Commands run

## Tests and evidence

## Not done / limitations

## Risks

## Suggested next PR
```

## Forbidden actions

- Do not merge directly to main.
- Do not remove the informative-price disclaimer.
- Do not replace the pricing engine with UI-only calculation.
- Do not add tracking scripts before approval.
- Do not add paid APIs before approval.
- Do not add a database before the need is confirmed.
- Do not create a fake final offer PDF.
