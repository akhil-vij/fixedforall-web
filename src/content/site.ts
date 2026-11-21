import { anchors, sectionHref } from '@/lib/anchors';

import { config, isSet } from './config';
import { hero } from './home';

/** Page-level metadata and the copy shared by every page (header, footer). */
export const site = {
  name: 'Fixed for All',
  title: 'Fixed for All: accessibility fixed at the source',
  description: hero.subheadline,
};

/** The main call to action: the header button, the hero's primary button and the contact band. */
/** True while the booking link is an email address rather than a booking tool (#17). */
export const bookingIsEmail = config.bookingUrl.startsWith('mailto:');

export const bookingCta = {
  // While the booking link is an email address, say so: the button opens an email, not a calendar.
  label: bookingIsEmail ? 'Email to book a call' : 'Book a 20-minute call',
  // Until the booking link is set (preview builds only), send people to the contact band.
  href: isSet(config.bookingUrl) ? config.bookingUrl : sectionHref(anchors.contact),
};

export const header = {
  homeLabel: site.name,
  menuButton: 'Menu',
  nav: [
    { label: 'How it works', href: sectionHref(anchors.how) },
    { label: 'Services', href: sectionHref(anchors.services) },
    { label: 'Work', href: sectionHref(anchors.work) },
    { label: 'About', href: sectionHref(anchors.about) },
    { label: 'FAQ', href: sectionHref(anchors.faq) },
  ],
  cta: bookingCta,
};

type FooterLink = { label: string; href: string };

export const footer = {
  links: [
    { label: config.email, href: `mailto:${config.email}` },
    ...(isSet(config.linkedinUrl) ? [{ label: 'LinkedIn', href: config.linkedinUrl }] : []),
    // The accessibility statement and privacy pages add their links here when they're built (#10, #11).
  ] satisfies FooterLink[],
  // Build-time year: the site is static, and is rebuilt on every change.
  copyright: `© ${new Date().getFullYear()} Fixed for All · Akhil Vij`,
};

/** The 404 page. Wording from the design agent's frame (design/FixedForAll-404.dc.html). */
export const notFound = {
  title: `Page not found · ${site.name}`,
  label: 'Error 404',
  heading: 'This page doesn’t exist.',
  text: 'The link may be out of date, or the address may have been mistyped.',
  homeLink: 'Back to the home page',
};
