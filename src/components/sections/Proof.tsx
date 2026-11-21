import { proof } from '@/content/home';

import styles from './Proof.module.css';

/** The proof row under the hero: a big figure in the heading font, then what it counts. */
export function Proof() {
  return (
    <section className={styles.section} aria-label={proof.label}>
      <ul className={styles.items}>
        {proof.items.map((item) => (
          <li key={item.figure} className={styles.item}>
            <span className={styles.figure}>{item.figure}</span>{' '}
            <span className={styles.text}>{item.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
