# MVP test plan

## Purpose

Validate whether the current ASTRA Streha na ključ static MVP is understandable, credible and useful for limited real-user testing.

The test must confirm that users understand the calculator result as an informative and non-binding estimate. It must not be interpreted as a final offer, guaranteed price or legally binding quote.

## Test audience

- 5 to 10 people.
- At least 2 non-technical homeowners.
- At least 1 construction or roofing person.
- At least 1 ASTRA/internal reviewer.

## Test scenarios

1. Simple roof with normal access.
2. Roof renovation with removal and waste.
3. Difficult access or manual material carry.
4. Roof with chimneys and roof windows.
5. Roof with exact gutter and downpipe lengths.
6. User submits inquiry through the current `mailto:` flow.

## What to observe

- Can the tester complete the calculator without help?
- Which fields cause hesitation or wrong input?
- Does the tester understand the result as an informative range?
- Does the tester notice that the estimate is non-binding?
- Does the tester understand that a precise offer requires ASTRA review?
- Does the `mailto:` inquiry contain enough useful information for ASTRA?
- Does mobile layout remain usable on a real phone?
- Does the estimate feel plausible or surprising for the chosen scenario?

## Feedback questions

- Was the form understandable?
- Were any terms unclear?
- Did the estimate feel credible?
- Was it clear that the estimate is not final?
- Was the form too long?
- Would you send the inquiry?
- What information was missing?
- Which field felt unnecessary?

## Pass / fail criteria

Pass criteria:

- User can complete calculator without help.
- User understands result is informative.
- Inquiry email is generated correctly.
- ASTRA can understand the email content.
- No obvious price shock from confirmed values.

Fail criteria:

- User thinks it is a final offer.
- User cannot complete form.
- User does not understand key fields.
- Email is unusable.
- Price range is clearly misleading for typical cases.

## Known limitations

- The app is static and has no backend.
- Inquiry delivery depends on the user's local email client through `mailto:`.
- Photos are not uploaded through the app.
- Some line items use configured allowances instead of exact measured quantities.
- Pricing values are confirmed only for limited MVP testing, not for a final public price list.
- Legal, GDPR and privacy wording still require final review before public advertising.
- No analytics are installed, so observations must be recorded manually.

## Test log template

```text
Tester:
Role:
Device:
Scenario:
Roof area:
Selected options:
Estimate range:
Did user complete without help:
Did user understand non-binding estimate:
Was mailto generated correctly:
Confusing fields:
Missing information:
Price credibility notes:
ASTRA reviewer notes:
Pass/fail:
Follow-up action:
```
