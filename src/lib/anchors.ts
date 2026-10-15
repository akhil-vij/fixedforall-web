/** Ids of the home page sections, shared by the sections and every link that points at them. */
export const anchors = {
  how: 'how',
  services: 'services',
  report: 'report',
  work: 'work',
  about: 'about',
  faq: 'faq',
  contact: 'contact',
} as const;

export type Anchor = (typeof anchors)[keyof typeof anchors];

/** A link to a home page section that works from every page. */
export function sectionHref(anchor: Anchor): string {
  return `/#${anchor}`;
}
