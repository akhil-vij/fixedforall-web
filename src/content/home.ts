/** All home page copy. Edit text here; components only handle layout. */

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

export const whyNow = {
  label: '01 — Why now',
  heading: 'Why this matters now',
};

export const howItWorks = {
  label: '02 — How it works',
  heading: 'Fix it once. Fixed for all.',
};

export const services = {
  label: '03 — Services',
  heading: 'Services',
};

export const report = {
  label: '04 — What you get',
  heading: 'A report your team can act on',
};

export const work = {
  label: '05 — Work',
  heading: 'Where this has worked before',
};

export const howIWork = {
  label: '06 — How I work',
  heading: 'Plain terms, real fixes',
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
};
