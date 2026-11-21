import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { whyNow } from '@/content/home';

import styles from './WhyNow.module.css';

const headingId = 'why-now-heading';

export function WhyNow() {
  return (
    <section className={styles.section} aria-labelledby={headingId} data-surface="panel">
      <div className={styles.inner}>
        <SectionLabel>{whyNow.label}</SectionLabel>
        <SectionHeading id={headingId} className={styles.heading}>
          {whyNow.heading}
        </SectionHeading>
        <div className={styles.points}>
          {whyNow.points.map((point) => (
            <div key={point.heading} className={styles.point}>
              <h3 className={styles.pointHeading}>{point.heading}</h3>
              <p className={styles.pointText}>{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
