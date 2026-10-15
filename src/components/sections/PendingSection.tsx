import type { Anchor } from '@/lib/anchors';

import styles from './PendingSection.module.css';

type Props = { id?: Anchor; heading: string };

/**
 * Stand-in for a home page section that isn't built yet: just its anchor and heading, so links
 * and the heading outline work. Each section issue replaces one; delete this file with the last.
 */
export function PendingSection({ id, heading }: Props) {
  return (
    <section id={id} className={styles.section} aria-label={heading}>
      <h2>{heading}</h2>
    </section>
  );
}
