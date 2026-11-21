import type { ReactNode } from 'react';

import styles from './SectionHeading.module.css';

type Props = { id?: string; className?: string; children: ReactNode };

/** A section's h2, in the heading font. */
export function SectionHeading({ id, className, children }: Props) {
  return (
    <h2 id={id} className={[styles.heading, className].filter(Boolean).join(' ')}>
      {children}
    </h2>
  );
}
