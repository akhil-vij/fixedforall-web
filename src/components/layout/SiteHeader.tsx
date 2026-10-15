import Link from 'next/link';

import { header } from '@/content/site';

import { MainNav } from './MainNav';
import styles from './SiteHeader.module.css';

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link className={styles.wordmark} href="/">
          <span className={styles.mark} aria-hidden="true" />
          <span>{header.homeLabel}</span>
        </Link>
        <MainNav items={header.nav} cta={header.cta} menuButtonLabel={header.menuButton} />
      </div>
    </header>
  );
}
