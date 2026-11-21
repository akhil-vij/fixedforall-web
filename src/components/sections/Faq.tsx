import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { faq } from '@/content/home';
import { anchors } from '@/lib/anchors';

import styles from './Faq.module.css';

const headingId = 'faq-heading';

/** Every answer is visible: no disclosure widgets to open. */
export function Faq() {
  return (
    <section id={anchors.faq} className={styles.section} aria-labelledby={headingId}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <SectionLabel>{faq.label}</SectionLabel>
          <SectionHeading id={headingId}>{faq.heading}</SectionHeading>
        </div>
        <div className={styles.items}>
          {faq.items.map((item) => (
            <div key={item.question} className={styles.item}>
              <h3 className={styles.question}>{item.question}</h3>
              <p className={styles.answer}>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
