import type { ReactNode } from 'react';

import styles from './SectionLabel.module.css';

/** The small mono label above a section heading, such as "07 — About". */
export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className={styles.label}>{children}</p>;
}
