# Fixed for All — change log, 1a → final

Base: **1a Engineer's report** (`FixedForAll.dc.html`). Final: `FixedForAll-Final.dc.html`. Review canvas: `Fixed for All - Final.dc.html` (1440, 390, states board, this log). States board: `FixedForAll-States.dc.html`.

## Kept from 1a, unchanged
Palette, type (Source Serif 4 / Atkinson Hyperlegible / IBM Plex Mono), section order and copy; the "one date picker, six pages fixed" diagram; the sample report card with "Tested by hand" / "Scanned automatically" tags; the double focus ring that inverts to a light ring on the dark contact band.

## Borrowed

**Hero: merged pull-request card (from 2b).** Right of the headline, sub-headline and buttons. Re-skinned in 1a's style: white card with border, 1a's dark code panel `#1C1B18` for the diff, green "Merged" pill. Title line, short diff and footer kept. Contrast fixed: every piece of text in the card is ≥ 4.5:1 — line numbers `#C5BFB2` measure 6.8:1 on the added rows, 7.2:1 on the removed rows, 8.2:1 on plain rows; added text 7.8:1, removed text 6.7:1. `+` / `−` prefixes kept so changes don't rely on colour. The diff is a labelled, keyboard-focusable region because it scrolls horizontally at 320px. The code snippet in the How-it-works date-picker card was removed to avoid repetition; its "tested by hand: keyboard, screen reader, 200% zoom" line stays.

**Proof numbers row (from 2a).** Directly under the hero, in 1a's style: Source Serif 4 numerals, thin rules, Atkinson descriptions. Marked `[placeholder — pending permission to name companies and confirm figures]`. The hero's "Previously built accessibility into…" line is removed. Fallback without company names ("25+ enterprise products · one design system", "30+ brands · one shared platform", "12+ years") is available via the `proofNames` tweak and shown on the states board.

**Portrait with caption card (from 2d), in About.** Larger 4:5 portrait placeholder with an overlapping caption card: "Akhil Vij — Staff engineer, 12+ years. Based in India, working with teams across Europe. 10:00–14:00 CET overlap, replies the same working day." The About heading now reads "Hi, I'm Akhil."; the paragraph is unchanged apart from dropping the now-duplicate name.

## Fixes
- Page title "Fixed for All: accessibility fixed at the source" and `lang="en"` on the html element (set on load; the review canvases set their own titles).
- Standalone links are ≥ 44px tall: "Download the sample report (PDF)", "LinkedIn profile", "Or book a 20-minute call", the skip link, and all footer links. Nav links were already 44px.
- Figures containing zeros no longer use Atkinson's slashed zero: proof numerals in Source Serif 4; prices, hours, years and percentages (€1,200, 10:00–14:00, 2025, 2026, 200%, 60%, 30+, "under 10 staff") in IBM Plex Mono. Body text stays in Atkinson.
- "[shown: … focus state]" notes and the static focus demos removed from the page; keyboard focus states now live on the states board.
- One call-to-action wording everywhere: "Book a 20-minute call".
- No logos; company names appear in text only and remain marked as placeholders.
- Field and button outlines ≥ 3:1 against their background kept (inputs: paper on dark green; secondary button and Menu button: 2px ink border; primary: green 6:1 on paper).

## Automated check
axe-core 4.10.3, tags wcag2a / wcag2aa / wcag21a / wcag21aa / wcag22aa, run on the final page at 1440 (desktop layout) and 390 (mobile layout):
- 1440: 0 violations · 21 rules passed · 0 best-practice notes. Page-level rules passed: document-title, html-has-lang, html-lang-valid, bypass (skip link), landmark-one-main, page-has-heading-one.
- 390: 0 violations · 21 rules passed · 0 best-practice notes · same page-level passes.
- "Needs manual review" (not failures): colour contrast on the striped placeholder boxes, which axe cannot measure over a gradient — the text is `#5B5950` on the lighter stripe `#F2EEE6`, 6.1:1 — and, at 390, one paragraph that was outside the viewport while scanning (ink `#1C1B18` on paper `#FAF8F3`, 15:1).
- The check runs live in `FixedForAll-A11yCheck.dc.html`; open it to re-run.

## Still placeholders
Company names and figures · Accessibility Check price (from €1,200) · portrait photo · sample report PDF · before/after screenshots · LinkedIn URL · form backend.
