import { footer } from '@/content/site';

import styles from './SiteFooter.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer} data-surface="band">
      <div className={styles.inner}>
        <ul className={styles.links}>
          {footer.links.map((link) => (
            <li key={link.href}>
              <a className={styles.link} href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className={styles.copyright}>{footer.copyright}</p>
      </div>
    </footer>
  );
}
