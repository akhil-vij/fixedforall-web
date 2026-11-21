/** All home page copy. Edit text here; components only handle layout. */

import { config } from './config';

export type CodeLine = {
  /** Line number shown in the gutter. */
  number: number;
  /** Context lines are unchanged; removed and added lines get − and + and their row colour. */
  kind: 'context' | 'removed' | 'added';
  /** The code after the − / + column, indentation included. */
  code: string;
};

export const hero = {
  headline: 'Accessibility, fixed at the source.',
  subheadline:
    'I find and fix accessibility problems in the shared components your whole product is built from, so every page gets better at once and stays that way. For teams preparing for the European Accessibility Act.',
  // The primary button is the booking link, shared with the header (site.ts, bookingCta).
  secondaryCta: 'See a sample report',
  /** The illustrative merged pull request beside the headline. */
  pullRequest: {
    label: 'Example pull request (illustrative)',
    title: 'DatePicker: make trigger keyboard-operable',
    number: '#412',
    status: 'Merged',
    file: 'src/components/DatePicker.tsx',
    codeLabel: 'Code changes in DatePicker.tsx',
    lines: [
      { number: 41, kind: 'context', code: '<label>Check-in date</label>' },
      { number: 42, kind: 'removed', code: '<div onClick={open}>' },
      { number: 42, kind: 'added', code: '<button type="button"' },
      { number: 43, kind: 'added', code: '  aria-expanded={isOpen}' },
      { number: 44, kind: 'added', code: '  onClick={open}>' },
      { number: 45, kind: 'context', code: '  {formatted}' },
      { number: 46, kind: 'removed', code: '</div>' },
      { number: 46, kind: 'added', code: '</button>' },
    ] satisfies CodeLine[],
    footer: '6 pages affected · tested: keyboard · NVDA · VoiceOver · 200% zoom',
  },
};

/** The proof row under the hero. */
export const proof = {
  label: 'Experience',
  items: [
    {
      figure: '25+',
      text: 'enterprise products made accessible through one shared design system at Informatica',
    },
    {
      figure: '30+',
      text: 'brands on one travel platform at Agoda, where every fix reached every brand',
    },
    { figure: '12+', text: 'years building large web products' },
  ],
};

export const whyNow = {
  label: '01 — Why now',
  heading: 'Why this matters now',
  points: [
    {
      heading: 'The law applies now.',
      text: 'Since June 2025, the European Accessibility Act covers online shops, banking, travel booking and many consumer apps.',
    },
    {
      heading: 'Scanners only catch part of it.',
      text: 'Automated tools find roughly a third of real problems. Can someone finish your checkout with only a keyboard? Does a screen reader announce errors? That takes a person.',
    },
    {
      heading: 'Widgets don’t fix code.',
      text: 'Overlay tools hide problems instead of fixing them. German testing centres (BIK) no longer give their test seal to sites that rely on them.',
    },
  ],
};

export const howItWorks = {
  label: '02 — How it works',
  heading: 'Fix it once. Fixed for all.',
  intro:
    'Most accessibility problems live in a handful of shared components. Fix those, and every page that uses them is fixed.',
  /** The "one date picker, six pages" illustration. The drawn parts are decorative; this is the text. */
  diagram: {
    componentLabel: 'Shared component',
    componentName: 'Date picker',
    // Inside the decorative mock-up of the date picker.
    mockLabel: 'Check-in date',
    mockValue: '12 Mar 2026',
    componentNote:
      'Couldn’t be opened with a keyboard. Fixed in one pull request, then tested by hand: keyboard, screen reader, 200% zoom.',
    pagesHeading: 'Used on 6 pages',
    pagesNote: 'The same blocker on every page. One pull request, all six fixed.',
    pages: ['Search', 'Results', 'Checkout', 'Confirmation', 'Account', 'Support'],
    pageStatus: 'Fixed',
    caption:
      'One change in the date picker, reviewed by your team as a pull request, reaches every page that uses it.',
  },
  steps: [
    {
      label: 'Step 1',
      heading: 'Check.',
      text: 'I scan your key pages and test the main user journeys by hand: keyboard only, screen reader, zoom.',
    },
    {
      label: 'Step 2',
      heading: 'Fix.',
      text: 'I fix problems in your shared components and code, as normal pull requests your team reviews.',
    },
    {
      label: 'Step 3',
      heading: 'Keep it fixed.',
      text: 'I add simple checks to your release process and give your team a short training, so problems don’t creep back.',
    },
  ],
};

export const services = {
  label: '03 — Services',
  heading: 'Services',
  items: [
    {
      kicker: 'Most teams start here',
      // The recommended starting point: its kicker is in the accent colour.
      highlight: true,
      name: 'Accessibility Check',
      text: 'Your main user journeys, scanned and tested by hand. A plain-English report with what to fix first.',
      meta: `2–3 days · from ${config.checkPrice}`,
    },
    {
      kicker: 'After the Check',
      highlight: false,
      name: 'Fix Sprint',
      text: 'I fix your shared components and key journeys, and train your team.',
      meta: '1–4 weeks · quoted after the Check',
    },
    {
      kicker: 'For software companies',
      highlight: false,
      name: 'Independent Accessibility Report',
      text: 'For when your customers ask for one (often called an ACR or VPAT). An honest, independent report, which buyers trust more than one a company writes about itself.',
      meta: 'Quoted per product',
    },
  ],
};

export type FindingMethod = 'hand' | 'scan';

export const report = {
  label: '04 — What you get',
  heading: 'A report your team can act on',
  paragraphs: [
    'Every Check ends with a short report: a one-line summary, problems grouped by how badly they block people, and the five fixes to do first. Each finding says whether a scanner found it or a person did.',
    'You also get a spreadsheet of every issue, and tickets ready to import into Jira.',
  ],
  /** Shown only when config.sampleReportUrl is set. */
  downloadLabel: 'Download the sample report (PDF)',
  /** The illustrative first page of a report. */
  sample: {
    label: 'Sample report, page 1 (illustrative)',
    title: 'Accessibility Check · Sample report',
    page: 'Page 1 of 14 · illustrative',
    summaryHeading: 'Summary',
    summary: '12 problems found on 6 key screens. 4 block users completely.',
    impactHeading: 'By impact on users',
    // The bars are drawn from these counts; the counts are the text.
    impact: [
      { label: 'Blocks users completely', count: 4 },
      { label: 'Makes tasks much harder', count: 5 },
      { label: 'Minor friction', count: 3 },
    ],
    fixFirstHeading: 'Fix these first',
    fixFirst: [
      { text: 'Checkout “Continue” button has no accessible name', method: 'hand' },
      { text: 'Date picker can’t be used with a keyboard', method: 'hand' },
      { text: 'Form errors aren’t announced to screen readers', method: 'hand' },
      { text: 'Price text contrast is 3.1:1, needs 4.5:1', method: 'scan' },
      { text: 'Focus is lost when the cookie dialog closes', method: 'hand' },
    ] satisfies { text: string; method: FindingMethod }[],
    methods: {
      scan: { tag: 'Scanned automatically', detail: 'axe-core across the 6 screens' },
      hand: {
        tag: 'Tested by hand',
        detail: 'keyboard · NVDA + Chrome · VoiceOver + Safari · 200% zoom',
      },
    } satisfies Record<FindingMethod, { tag: string; detail: string }>,
  },
};

export const work = {
  label: '05 — Work',
  heading: 'Where this has worked before',
  items: [
    {
      heading: 'Informatica: one design system, 25+ products.',
      text: 'Built accessibility (WCAG 2.1 AA) into the company-wide component library, a requirement for enterprise and government sales.',
    },
    {
      heading: 'Agoda: one platform, 30+ brands.',
      text: 'On a shared codebase behind 30+ partner brands, every fix reached every brand. Built a tool that turns audit reports into ready-to-review fixes: about 60% fixed in the first pass, about 85% a strong starting point, all reviewed by engineers.',
    },
  ],
  /** Shown only when config.beforeAfter is set. */
  beforeAfter: {
    heading: 'Before and after: my own product.',
    text: 'A real scan, the fixes, and the result.',
    beforeLabel: 'Before',
    afterLabel: 'After',
  },
};

export const howIWork = {
  label: '06 — How I work',
  heading: 'Plain terms, real fixes',
  // Each point: a bold lead, then the rest of the sentence.
  points: [
    { lead: 'Real fixes in your code.', rest: 'No widgets, no overlays.' },
    { lead: 'Every change tested by a person', rest: 'with a keyboard and a screen reader.' },
    { lead: 'Honest reports.', rest: 'If something only partly works, the report says so.' },
    {
      lead: 'Working hours that overlap with yours:',
      rest: '10:00–14:00 CET every working day, replies the same day.',
    },
    { lead: 'Clear contracts in English,', rest: 'with data-protection terms for EU clients.' },
  ],
};

export const about = {
  label: '07 — About',
  heading: 'Hi, I’m Akhil.',
  body: 'I’m a staff engineer with 12+ years building large web products. I’ve spent years making accessibility work at scale, in design systems used by dozens of products. I’m based in India and work with teams across Europe.',
  // Each link shows only when its URL is set in config.ts.
  linkedinLabel: 'LinkedIn profile',
  websiteLabel: 'Personal website',
  caption: {
    name: 'Akhil Vij',
    text: 'Staff engineer, 12+ years. Based in India, working with teams across Europe. 10:00–14:00 CET overlap, replies the same working day.',
  },
  /**
   * Shown when public/akhil.webp exists. Empty alt: the caption beside it already names Akhil.
   * Describe the photo here only if it shows something the caption doesn't.
   */
  photo: { src: '/akhil.webp', alt: '', width: 840, height: 1050 },
};

export const faq = {
  label: '08 — FAQ',
  heading: 'Questions I get asked',
  items: [
    {
      question: 'Will this make us compliant?',
      answer:
        'No one can honestly guarantee that. I test against WCAG 2.1/2.2 AA, the standard the EU law points to, fix what’s broken, and tell you plainly where you stand.',
    },
    {
      question: 'Do you use AI?',
      answer:
        'I use tools to work faster, but every fix is written into your code, reviewed and tested by a person.',
    },
    {
      question: 'Does the EAA apply to us?',
      answer:
        'Very small service businesses (under 10 staff and under €2M turnover) are exempt. Most others selling to EU consumers are covered. Happy to check on a call.',
    },
    {
      question: 'What do you need from us?',
      answer:
        'Access to a test version of your site and, for fixes, your code repository or a way to send pull requests.',
    },
  ],
};

export const contact = {
  heading: 'Book 20 minutes. Bring your website, and I’ll test it live with you.',
  line: 'A real look by a person, not a scanner. No sales pitch.',
  // The button is the booking link (site.ts, bookingCta). With a booking tool, email is offered as
  // a second link; while booking is by email, the address is shown as text instead.
  emailLink: `Or email ${config.email}`,
  emailText: config.email,
};
