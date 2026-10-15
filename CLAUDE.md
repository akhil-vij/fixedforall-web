# Fixed for All: website

Marketing site for Fixed for All, Akhil Vij's accessibility consultancy. Next.js App Router with
`output: 'export'`: static HTML only. The site is the first proof of the service, so it must pass
its own accessibility audit.

## Where things are

- `src/content/config.ts`: settings (email, bookingUrl, linkedinUrl, checkPrice, sampleReportUrl,
  beforeAfter, analytics). `TODO` values block production builds (`scripts/check-launch.ts`).
- `src/content/home.ts`: all home page copy. `src/content/pages/*.mdx`: accessibility statement and
  privacy. Components never hard-code copy.
- `src/styles/tokens.css`: the only file with raw colours. Palette layer, then role layer.
  Components use role tokens only (stylelint enforces this).
- `src/styles/globals.css`: reset, `[data-surface]` surfaces, the focus ring, reduced motion.
- `src/components/{layout,sections,ui}`: one component per file, with a co-located `.module.css`.
- `design/`: the design package, for reference only. Never import from it or reuse `support.js`.
  Source of truth: `FixedForAll-Final.dc.html` (page), `FixedForAll-States.dc.html` (focus
  states, open mobile menu), `CHANGELOG.md` (rationale).
- `scripts/`: TypeScript run directly by Node 22 (type stripping, so erasable syntax only).
  `csp.ts` (post-build CSP), `serve.ts` (Vercel-like static server), `check-links.ts`,
  `check-launch.ts`.
- `tests/`: Playwright. `routes.ts` lists every page; add new pages there and every test covers
  them.

## Commands

```sh
npm run dev          # dev server (no CSP meta; use build + serve to check CSP)
npm run build        # launch check, next build, then CSP meta injected into out/*.html
npm run serve        # serve out/ like Vercel at http://localhost:4321
npm run lint         # ESLint (jsx-a11y strict), Stylelint, Prettier check
npm run typecheck
npm run check:html   # html-validate on out/
npm run check:links  # crawl out/, internal links and #fragments must resolve
npm test             # Playwright against out/ (build first)
npm run ci           # everything CI runs, in order
```

Node 22 (`.nvmrc`). On macOS 12 Playwright's bundled Chromium doesn't run, so the config uses the
installed Google Chrome there automatically.

## Rules that don't bend

- WCAG 2.2 AA. Axe at 1440, 390 and 320px must report zero violations; any violation fails CI.
- No server code: no API routes, server actions, middleware or Vercel-only features.
- No cookies, no tracking, no overlays or widgets, no embedded booking iframe.
- One `h1`; `h2` per section; `h3` inside. One `header`, labelled `nav`, one `main`, one `footer`.
- Focus: double ring from `globals.css` (`:focus-visible`). Don't override it per component; set
  `data-surface` on the container instead, so the gap matches the background (the band inverts).
- Targets at least 44px (`--target-min`) for standalone links and buttons, footer links included.
- Numbers in running text use the body font (Atkinson). Mono only where the design uses it as a
  style (code card, labels, card meta lines). Big proof numbers stay in Source Serif 4. This
  overrides the prototype, which swapped figures to mono inside sentences.
- No inline `style` attributes and no inline scripts of our own: the CSP hashes what Next emits,
  and the CSP test fails on any violation.
- Copy in `src/content/`, never in components. Optional content (sample report PDF, before/after
  card, photo) renders only when its value or file exists; no placeholders on the live site.

## Workflow

- Plan and progress: GitHub Milestones and Issues. One issue per PR (`Closes #n`); CI must pass.
  Open decisions are labelled `decision: Akhil`.
- Commits: `feat:`, `fix:`, `test:`, `docs:`, `chore:`, with the issue number.
