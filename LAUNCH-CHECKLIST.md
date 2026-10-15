# Launch checklist

Manual pass before fixedforall.com goes live. CI covers the automated checks; this covers what only
a person can judge. Test the production build (`npm run build && npm run serve`) or the Vercel
preview, on every page: home, accessibility statement, privacy, and a 404.

Record the date and any findings at the bottom. Problems found here become GitHub issues.

## Before testing

- [ ] `src/content/config.ts`: `bookingUrl` and `linkedinUrl` set (`npm run check:launch` passes)
- [ ] Price, photo, sample report and before/after settings are what you want at launch
- [ ] CI is green on `main`

## Keyboard only

- [ ] First Tab shows "Skip to content"; Enter moves to the main content
- [ ] Every link and button is reachable, in a sensible order, with a clearly visible focus ring
- [ ] Focus ring visible on the dark contact band and footer (it inverts to light)
- [ ] Mobile menu (narrow window): opens with Enter/Space, Escape closes it and focus returns to the
      Menu button; links follow the button
- [ ] Hero code card: a Tab stop only when it scrolls sideways (narrow window); arrow keys scroll it
- [ ] Nothing traps focus

## NVDA + Chrome (Windows)

- [ ] Page title read on load; headings list (NVDA+F7) shows one h1 and an h2 per section
- [ ] Landmarks: one banner, navigation "Main", main, contentinfo
- [ ] Hero code card announced as "Code changes in DatePicker.tsx" region; + / − readable
- [ ] Date-picker diagram: the sentence and the list of six pages are read; decorative parts aren't
- [ ] Sample report: headings, "Fix these first" read as a list, tags read as text
- [ ] Mobile menu button announces expanded / collapsed

## VoiceOver + Safari (macOS and iOS)

- [ ] Same checks as NVDA on macOS (rotor: headings, landmarks, links)
- [ ] iOS: swipe through the whole home page; menu opens and closes; booking link works

## Zoom and reflow

- [ ] 200% zoom: nothing cut off or overlapping
- [ ] 400% zoom (or a 320px-wide window): no sideways scrolling except inside the code card

## Display settings

- [ ] Forced colours (Windows High Contrast / Contrast themes): text readable, buttons and links
      distinguishable, focus ring visible
- [ ] Reduced motion (OS setting): no transitions

## Booking link

- [ ] Opens the booking tool in the same tab (or the link text says it opens a new tab)
- [ ] Booking a slot works with keyboard only
- [ ] Booking a slot works with a screen reader
- [ ] Problems found in the booking tool are listed under "Known limitations" in the accessibility
      statement

## After launch

- [ ] Accessibility statement shows the date tested
- [ ] `www.fixedforall.com` redirects to `fixedforall.com`
- [ ] Security headers present (securityheaders.com or browser dev tools)

## Record

| Date | Tester | Setup | Findings |
| ---- | ------ | ----- | -------- |
|      |        |       |          |
