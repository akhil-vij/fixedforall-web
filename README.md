# fixedforall.com

The website for Fixed for All. A static Next.js site: plain HTML files, no server code.

## Run it

Requires Node 22 (`nvm use`).

```sh
npm install
npm run dev            # http://localhost:3000
```

To see exactly what visitors get (including the Content Security Policy):

```sh
npm run build && npm run serve    # http://localhost:4321
```

## Edit text and settings

- **Settings** (email, booking link, LinkedIn, price, sample report, before/after):
  `src/content/config.ts`. Values marked `TODO` must be filled in before launch; the production
  deploy fails until they are.
- **Home page text**: `src/content/home.ts`.
- **Accessibility statement and privacy pages**: `src/content/pages/*.mdx` (Markdown).
- **Photo**: put `akhil.webp` in `public/`. The About section shows it when the file exists.

## Checks

`npm run ci` runs everything GitHub Actions runs: lint, typecheck, build, HTML validation, link
check, and the Playwright tests (axe accessibility checks, keyboard, layout, CSP and colour
contrast at 1440, 390 and 320px). See `LAUNCH-CHECKLIST.md` for the manual pass before launch.

## Deploy

Vercel deploys `main`. `vercel.json` treats the site as plain static files (`out/`), so it can move
to any static host unchanged; only the headers in `vercel.json` would need re-creating there.
