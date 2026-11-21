import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { howIWork } from '@/content/home';

import styles from './HowIWork.module.css';

const headingId = 'how-i-work-heading';

export function HowIWork() {
  return (
    <section className={styles.section} aria-labelledby={headingId} data-surface="panel">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <SectionLabel>{howIWork.label}</SectionLabel>
          <SectionHeading id={headingId}>{howIWork.heading}</SectionHeading>
        </div>
        <ul className={styles.points}>
          {howIWork.points.map((point) => (
            <li key={point.lead} className={styles.point}>
              <strong>{point.lead}</strong> {point.rest}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
