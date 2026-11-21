/**
 * Site settings Akhil can change without touching components.
 *
 * `TODO` marks a value that must be set before launch: production builds on Vercel fail while any
 * required value is still `TODO` (see scripts/check-launch.ts).
 */

export const TODO = 'TODO';

export type Image = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type BeforeAfter = {
  before: Image;
  after: Image;
};

export type SiteConfig = {
  siteUrl: string;
  email: string;
  /**
   * Link to the booking page. Always a link, never an embedded iframe. Until a booking tool is
   * chosen (#17) this is an email link; the header button then reads "Email to book a call".
   */
  bookingUrl: string;
  linkedinUrl: string;
  /** Akhil's personal website, linked from About. Hidden while null. */
  websiteUrl: string | null;
  /** Shown as "from {checkPrice}" on the Accessibility Check card. */
  checkPrice: string;
  /** The "Download the sample report (PDF)" link is hidden while this is null. */
  sampleReportUrl: string | null;
  /** The "Before and after" Work card is hidden while this is null. */
  beforeAfter: BeforeAfter | null;
  /** Cookie-free Vercel Web Analytics. */
  analytics: boolean;
};

export const config: SiteConfig = {
  siteUrl: 'https://fixedforall.com',
  email: 'hello@fixedforall.com',
  bookingUrl: 'mailto:hello@fixedforall.com?subject=20-minute%20call',
  linkedinUrl: 'https://www.linkedin.com/in/akhil-vij-50b68085',
  websiteUrl: 'https://akhilvij.com/',
  checkPrice: '€1,200',
  sampleReportUrl: null,
  beforeAfter: null,
  analytics: false,
};

/** Values that must not be `TODO` in a production build. */
export const requiredForLaunch = ['bookingUrl', 'linkedinUrl'] as const;

export function isSet(value: string | null | undefined): value is string {
  return Boolean(value) && value !== TODO;
}
