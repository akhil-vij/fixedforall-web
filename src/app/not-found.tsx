import type { Metadata } from 'next';

import { SectionLabel } from '@/components/ui/SectionLabel';
import { StandaloneLink } from '@/components/ui/StandaloneLink';
import { notFound } from '@/content/site';

import styles from './not-found.module.css';

// Next.js adds <meta name="robots" content="noindex"> to the 404 page itself.
export const metadata: Metadata = {
  title: notFound.title,
};

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <SectionLabel>{notFound.label}</SectionLabel>
        <h1 className={styles.heading}>{notFound.heading}</h1>
        <p className={styles.text}>{notFound.text}</p>
        <p className={styles.home}>
          <StandaloneLink className={styles.homeLink} href="/">
            {notFound.homeLink}
          </StandaloneLink>
        </p>
      </div>
    </div>
  );
}
