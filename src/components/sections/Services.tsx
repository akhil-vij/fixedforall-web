import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { services } from '@/content/home';
import { anchors } from '@/lib/anchors';

import styles from './Services.module.css';

const headingId = 'services-heading';

export function Services() {
  return (
    <section id={anchors.services} className={styles.section} aria-labelledby={headingId}>
      <div className={styles.inner}>
        <SectionLabel>{services.label}</SectionLabel>
        <SectionHeading id={headingId} className={styles.heading}>
          {services.heading}
        </SectionHeading>
        <ul className={styles.cards}>
          {services.items.map((item) => (
            <li key={item.name} className={styles.card} data-surface="card">
              <p className={item.highlight ? styles.kickerHighlight : styles.kicker}>
                {item.kicker}
              </p>
              <h3 className={styles.name}>{item.name}</h3>
              <p className={styles.text}>{item.text}</p>
              <p className={styles.meta}>{item.meta}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
