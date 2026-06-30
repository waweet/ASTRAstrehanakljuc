# Deployment

## Purpose

This deployment path prepares the static ASTRA Streha na ključ app for limited MVP testing
with a small group of users. It does not make the app production-ready and does not change
pricing behavior.

## Static app location

The public app files live in:

```text
app/
```

The test entry point is:

```text
/app/
```

The app is static HTML, CSS and JavaScript. Pricing logic remains in `src/` and is imported
by the static frontend. There is no backend, database, authentication, analytics, CRM, PDF
generation or server-side email sending.

## GitHub Pages deployment

The repository includes a GitHub Actions workflow:

```text
.github/workflows/pages.yml
```

The workflow runs on pushes to `main` and publishes the `app/` folder with official GitHub
Pages actions. It does not require repository secrets and does not install dependencies.

Before sharing the link with test users, confirm that GitHub Pages is configured to deploy
from GitHub Actions in the repository settings.

## Manual local test

Run the static server from the repository root:

```bash
npm start
```

Open:

```text
http://127.0.0.1:5173/app/
```

Recommended local checks:

```bash
npm test
git diff --check
curl -I http://127.0.0.1:5173/app/
curl -I http://127.0.0.1:5173/app/app.js
curl -I http://127.0.0.1:5173/app/styles.css
```

## Known limitations

- The inquiry flow uses `mailto:` plus a copy fallback.
- The app does not send email from a server.
- There is no backend, database, CRM, analytics or PDF generation.
- The estimate is informative and non-binding.
- Prices are confirmed only for limited MVP testing, not as a public final price list.
- Legal, GDPR/privacy and production release review are still pending.

## MVP test link checklist

- Confirm the deployed `/app/` URL loads.
- Confirm the calculator returns a price range, not a final offer.
- Confirm the result says the estimate is informative and non-binding.
- Confirm the inquiry flow shows the fallback panel after valid submit.
- Confirm the fallback includes the ASTRA email, subject and generated inquiry body.
- Tell test users that the estimate is informative and not a binding offer.
- Do not run paid ads before MVP feedback review.
- Collect feedback from 5-10 test users before starting the next feature PR.
