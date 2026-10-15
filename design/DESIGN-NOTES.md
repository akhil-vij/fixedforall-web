# Fixed for All — design package

## Start here
- `Fixed for All - Final.dc.html` — the final deliverable: the page at 1440 and 390, the states board (keyboard focus, open mobile menu, proof-row fallback) and the change log, on one canvas.
- `FixedForAll-Final.dc.html` — the final page itself. Open directly; it reflows from 1440 down to 320px.
- `FixedForAll-States.dc.html` — states board.
- `FixedForAll-A11yCheck.dc.html` — live axe-core check of the final page at 1440 and 390 (result: 0 violations at both widths).
- `CHANGELOG.md` — what changed from 1a to final, and why.
- `DESIGN-NOTES.md` (below) — the five directions, their palettes and type, and the accessibility reasoning behind each.
- `Fixed for All - Artboards.dc.html` — the earlier comparison canvas of all five directions.
- `support.js` — runtime the pages need; keep it next to them.

---

# Fixed for All — design directions

Five directions for the Fixed for All one-page site (Akhil Vij, accessibility fixes at the component level, EU/EAA audience). All five use the same copy and section order; they differ in stance, palette, type and the metaphor that carries the "fix it once, fixed for all" idea.

## Files

- `Fixed for All - Artboards.dc.html` — comparison canvas: every direction at 1440 (desktop) and 390 (mobile). Open this first.
- `FixedForAll.dc.html` — **1a Engineer's report**
- `FixedForAll-2a-Manifesto.dc.html` — **2a Manifesto**
- `FixedForAll-2b-PullRequest.dc.html` — **2b Pull request**
- `FixedForAll-2c-PlainService.dc.html` — **2c Plain service**
- `FixedForAll-2d-Human.dc.html` — **2d Human**
- `support.js` — runtime the pages need; keep it next to them.

Each page is one responsive layout. Open any `.dc.html` directly in a browser and resize it: the layout reflows down to 390px, which is also how it behaves at 200% zoom. Fonts load from Google Fonts.

## What every direction shares (the accessibility floor)

These are not stylistic choices; they are the baseline every option meets, because the site itself is the first proof of the service.

- Text contrast ≥ 4.5:1 everywhere, including secondary text and text on coloured bands. Several options exceed AAA (7:1) for body copy.
- Body text 18–19px; nothing rendered below 14px (labels), 16px for anything you need to read.
- Visible keyboard focus on every link, button and field, drawn with a 2–4px ring with offset so it survives on any background. A "Skip to content" link is the first focusable element.
- Click/tap targets ≥ 44px tall; nav links and footer links are padded to 44px.
- Headings in order (one h1, h2 per section, h3 inside). Landmarks: header, nav with labels, main, footer. Decorative bars, arrows and glyphs are `aria-hidden`.
- Links are distinguishable without colour (underline, or clearly a button).
- Layout reflows at any width; no fixed heights on text boxes; no horizontal scrolling at 390px (the only exception is the code diff in 2b, which scrolls on its own and is announced as a region).
- `prefers-reduced-motion` turns off the few hover transitions.
- Form fields have visible labels, correct `type` and `autocomplete`.
- Placeholders are marked `[placeholder — …]` wherever content is unconfirmed (prices, company names, photo, PDF).

## 1a — Engineer's report

**Idea.** A well-set engineer's report. Calm, editorial, credible. The site looks like the deliverable: a document that has been checked.

**Palette.** Paper `#FAF8F3` · panel `#F2EEE6` · ink `#1C1B18` · secondary `#5B5950` · rules `#DDD8CE` / `#D6D0C4` · green (actions, "fixed") `#1E6B5A`, hover `#17564A` · contact band `#14352D` with `#FAF8F3` / `#C5D3CC` text.

**Type.** Headlines: Source Serif 4 (600). Body: Atkinson Hyperlegible (400/700). Code, labels and report details: IBM Plex Mono.

**Why it suits an accessibility product.** Atkinson Hyperlegible was designed by the Braille Institute for low-vision readers: distinct letterforms (I/l/1, O/0), open apertures. Warm paper with near-black ink keeps contrast at roughly 15:1 without the glare of pure white on pure black, which some dyslexic and light-sensitive readers find tiring. One accent colour, used only for actions and the word "fixed", means colour never has to carry meaning on its own. The report card shows the actual output, with "tested by hand" vs "scanned" tags, so the evidence of manual testing is visible before anyone reads a word about it. Focus states are shown statically on the skip link and hero button as a quiet demonstration.

**Risk.** The calmest of the five; may feel reserved for a founder-led brand that wants to stand out.

## 2a — Manifesto

**Idea.** A placard. Big statements, thick rules, square corners, one highlighter. "Fix it once. Fixed for all." as the whole hero.

**Palette.** White `#FFFFFF` · ink `#0A0A0A` · highlighter yellow `#FFD60A` (always with black text on it) · secondary `#3D3D3D`. Black bands for "Why now" and contact, with pure white text.

**Type.** Archivo throughout (400/700/900). Display at 900 with tight tracking; body at 19px.

**Why it suits an accessibility product.** The highest contrast of the five (21:1 body text, both ways) and the largest type: headlines up to 148px, numerals to 120px, and body 19px minimum. Yellow is used only as a background behind black text (≈14:1), never as text, so it reads for every kind of colour vision. Structure is carried by weight and 3–4px rules rather than by colour or shadow, which survives high-contrast modes and greyscale. The tone matches the service's stance against overlays: it is unapologetic that accessibility is done in code. Big, flat, legible shapes are also friendlier to zoom and to low-vision users than fine hairlines.

**Risk.** Loud. Some compliance buyers may read it as marketing rather than engineering.

## 2b — Pull request

**Idea.** Speak to the engineers who will merge the work. The hero is a merged PR with a real diff; the method is a dependency tree (one component → six pages); the report is a terminal-like output panel.

**Palette.** Background `#101418` · panels `#171C22` · borders `#2A313A` / `#3A424D` · text `#E8ECF1` and `#C9D1D9` · muted `#A3ADB8` · green `#35C27A` (buttons, with `#0B1F15` text) and `#7EE2A8` (links, additions) · removals `#FF9E96`.

**Type.** IBM Plex Sans (headlines, body) with IBM Plex Mono (nav, labels, code, report).

**Why it suits an accessibility product.** Dark themes are a genuine access need for photophobia, migraine and some low-vision conditions, and this one is tuned for it: not pure black (reduces halation of light text), text at ≈12–15:1, muted text still ≥ 7:1, and the green link colour at ≈10:1. Diff colours are backed up by `+`/`−` prefixes, so additions and removals do not rely on red/green perception. Showing actual code and a PR flow tells technical buyers precisely what they get (fixes in their repo, reviewed by their team), which is the service's main differentiator against overlays and audit-only vendors. Focus rings use the bright green on dark, which is clearly visible.

**Risk.** Less welcoming to non-technical stakeholders (compliance, product). Dark UIs also reduce readability for some dyslexic readers, so a light-mode toggle would be the first follow-up.

## 2c — Plain service

**Idea.** An official guidance document: numbered sections, a contents list, tables where data belongs in tables, no cards, no shadows, no decoration. Trust through plainness.

**Palette.** White `#FFFFFF` · ink `#0B0C0C` · secondary `#505A5F` · rules `#B1B4B6` · panel `#F3F2F1` · link blue `#1A4FBF`, hover `#0B2E7A` · focus yellow `#FFDD00` with a black ring.

**Type.** Source Sans 3 (400/600/700). Body 19px; measure capped at 760px.

**Why it suits an accessibility product.** This is the pattern public-sector digital services use because it tests well with the widest range of users: left-aligned text on a 60–70 character measure, universally-recognised blue underlined links, a yellow-and-black focus style that is visible on anything, and structure expressed in real HTML (ol/ul, table with caption, th scope) so screen readers get the same structure sighted users see. The services and "fix these first" tables give compliance and procurement readers the facts without interpretation. A contents list up front helps screen-reader and keyboard users navigate a long page. Nothing depends on colour, shadow, or hover.

**Risk.** Intentionally un-designed; least memorable as a brand. Works best if the audience is predominantly compliance/legal.

## 2d — Human

**Idea.** A person you can call. Leads with "Hi, I'm Akhil", a portrait, and his working hours; the method is shown as friendly chips; cards and buttons are soft. Warmth as trust.

**Palette.** Cream `#FFF8F0` · ink `#2A211C` · body `#4A3F38` · muted `#6B5E55` · panel `#F6E9DB` · borders `#E8D8C6` · clay `#B8431F`, hover `#9A3618` · contact band `#3B2A22` with `#FFF8F0` / `#F0E4D6` text.

**Type.** Figtree throughout (400/500/700/800).

**Why it suits an accessibility product.** Accessibility work is ultimately about people, and this option says so with the first word. Warm, low-glare backgrounds (cream rather than white) and generous radii lower visual stress; body text still sits at ≈13:1 and the clay accent at ≈5.7:1 on cream, so warmth does not cost contrast. Pills and large rounded targets (48–54px) are easy for motor-impaired and touch users. The hero caption card foregrounds practical access to Akhil himself (time-zone overlap, same-day replies), which matters to small teams without an accessibility specialist. Step numbers, checkmarks and badges are always paired with words.

**Risk.** Reads as a solo freelancer; may undersell the enterprise scale (25+ products, 30+ brands) that 1a and 2a make prominent.

## Choosing

- Primary audience is **engineering**: 2b, or 1a with the diff hero from 2b.
- Primary audience is **compliance / procurement**: 2c, or 1a with 2c's tables.
- Founder-led brand that must **stand out**: 2a, possibly softened.
- Smaller clients buying a **person**: 2d.
- Mixed audience, safest default: 1a.

Any two can be combined; the copy and section structure are identical so parts move between options cleanly.

## Open items (all marked in the designs)

Company names and figures (Informatica, Agoda, 25+/30+/60%/85%) pending permission · price for the Accessibility Check · sample report PDF · portrait photo · before/after screenshots · LinkedIn URL · form backend.
