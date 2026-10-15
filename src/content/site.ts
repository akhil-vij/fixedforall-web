import { anchors, sectionHref } from '@/lib/anchors';

import { config, isSet } from './config';
import { hero } from './home';

/** Page-level metadata and the copy shared by every page (header, footer). */
export const site = {
  name: 'Fixed for All',
  title: 'Fixed for All: accessibility fixed at the source',
  description: hero.subheadline,
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
  cta: {
    label: 'Book a 20-minute call',
    // Until the booking link is set (preview builds only), send people to the contact band.
    href: isSet(config.bookingUrl) ? config.bookingUrl : sectionHref(anchors.contact),
  },
};
