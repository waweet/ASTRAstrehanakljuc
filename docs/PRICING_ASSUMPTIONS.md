# Pricing assumptions catalog

## Purpose

This document is an internal review catalog for ASTRA group d.o.o. pricing assumptions.

It separates values that are already active in the MVP calculator from expanded roof-work assumptions that are documented only for review. The expanded items are not active in the calculator and must not be shown as confirmed ASTRA prices.

All values are placeholder assumptions. They are not market prices, not confirmed ASTRA prices and not production-ready. ASTRA must review and approve assumptions before they are used publicly or moved into the calculator.

PR-005 used the owner-provided spreadsheet `astra_cenik_poenostavljen_AI_v6.xlsx` as an input source for the expanded review catalog. The spreadsheet itself is not committed to the repository. Its source notes identify `AI_Gradbeni_Sistem_CENIK_v6(4).ods` and a preparation date of 30.06.2026.

The machine-readable review file is:

```text
docs/pricing-assumptions.csv
```

## Status legend

- `active in calculator` - the assumption is currently represented in `src/pricing-config.js` and used by `src/pricing-engine.js`.
- `review only - not yet active in calculator` - the assumption is documented for ASTRA review only and does not affect the live estimate.

## Active calculator assumptions

The current calculator uses placeholder values for:

- base roof covering rates by selected covering system,
- roof shape complexity multipliers,
- access difficulty multipliers,
- roof pitch multipliers,
- flashing/detail complexity multipliers,
- chimney unit cost,
- roof window unit cost,
- existing roof removal cost,
- waste handling cost,
- insulation cost,
- gutters/basic flashing cost,
- estimate low/high range factors,
- minimum project value.

These values remain configurable in `src/pricing-config.js`. They are active only as informative MVP assumptions and must be reviewed by ASTRA before production use.

## Review-only expanded assumptions

The following groups list possible future pricing inputs and line items. They are not active in the calculator in PR-005.

Future PRs may move approved assumptions into `src/pricing-config.js`, but only after ASTRA review and with tests for any new calculation logic.

The CSV also includes:

- source spreadsheet pricing rows from the `Cenik` sheet,
- orientation-only m² package rows from the `Paketi m2` sheet,
- rows from the `Manjka v AI` sheet where the source workbook says a price is not yet available.

Rows copied from the spreadsheet remain `review only - not yet active in calculator`, even when the spreadsheet has a numeric value.

## Roof layers

Review-only assumptions for roof layer composition:

- paroprepustna folija,
- parna zapora,
- deskanje / opaž,
- OSB plošče,
- strešne letve,
- kontra letve,
- prezračevalni sloj,
- toplotna izolacija med špirovci,
- toplotna izolacija nad špirovci,
- sekundarna kritina,
- zaščitna mrežica proti insektom pri prezračevanju.

Status: `review only - not yet active in calculator`.

## Structural timber

Review-only assumptions for timber structure work:

- novi špirovci / tramovi,
- zamenjava poškodovanih tramov,
- ojačitev obstoječega ostrešja,
- kapna lega,
- sleme / slemenska lega,
- impregnacija lesa,
- manjša mizarska popravila.

Status: `review only - not yet active in calculator`.

## Roofing elements

Review-only assumptions for roof covering and finishing elements:

- osnovna kritina,
- slemenjaki / sleme,
- krajnik / krajna kritina,
- kapni zaključek,
- grebenska kritina,
- zračniki na strehi,
- prezračevalni element slemena,
- preboji skozi streho,
- tesnjenje prebojev,
- snegolovi,
- strešne stopnice,
- pohodna rešetka / dimnikarska pot.

Status: `review only - not yet active in calculator`.

## Sheet-metal work

Review-only assumptions for sheet-metal work:

- žleb,
- vertikalna odtočna cev,
- žlota,
- kapna obroba,
- čelna / vetrna obroba,
- zidna obroba,
- dimniška obroba,
- obroba strešnega okna,
- zaključek pri frčadi,
- pločevinasta zaščita atike,
- lovilec vode / kotliček,
- kolena in spojni elementi.

Status: `review only - not yet active in calculator`.

## Removal, waste, access and site setup

Review-only assumptions for removal, waste handling, access and site setup:

- demontaža obstoječe kritine,
- demontaža letev,
- demontaža stare pločevine,
- odvoz odpadnega materiala,
- ročni prenos materiala,
- otežen dostop,
- postavitev gradbišča,
- zaščita okolice,
- oder,
- dvižna košara,
- avtodvigalo,
- delo na višini,
- dodatna zaščita pri zahtevnem naklonu.

Status: `review only - not yet active in calculator`.

## Approval checklist

For each row in `docs/pricing-assumptions.csv`, ASTRA should decide one of:

- keep,
- change,
- remove,
- needs supplier quote,
- needs ASTRA confirmation.

Recommended review fields:

| Item | Keep | Change | Remove | Needs supplier quote | Needs ASTRA confirmation | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Pricing assumption row |  |  |  |  |  |  |

## Future implementation notes

- Keep approved pricing values in `src/pricing-config.js`.
- Keep calculation logic in `src/pricing-engine.js`.
- Add tests for every new active pricing factor or line item.
- Keep the result as an informative range, not a final offer.
- Do not activate review-only assumptions until ASTRA confirms values and business rules.
- If future pricing becomes too detailed for the static app, create a separate architecture PR before adding backend or admin tooling.
