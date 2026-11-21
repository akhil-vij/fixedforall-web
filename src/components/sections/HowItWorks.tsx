import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { howItWorks } from '@/content/home';
import { anchors } from '@/lib/anchors';

import styles from './HowItWorks.module.css';

const headingId = 'how-heading';

export function HowItWorks() {
  const { diagram } = howItWorks;
  return (
    <section id={anchors.how} className={styles.section} aria-labelledby={headingId}>
      <div className={styles.inner}>
        <SectionLabel>{howItWorks.label}</SectionLabel>
        <SectionHeading id={headingId} className={styles.heading}>
          {howItWorks.heading}
        </SectionHeading>
        <p className={styles.intro}>{howItWorks.intro}</p>

        <figure className={styles.diagram} data-surface="panel">
          <div className={styles.diagramBody}>
            <div className={styles.component} data-surface="page">
              <p className={styles.componentLabel}>{diagram.componentLabel}</p>
              <p className={styles.componentName}>{diagram.componentName}</p>
              {/* A drawing of the date picker: decorative, the text around it says what it is. */}
              <div className={styles.mock} aria-hidden="true">
                <span className={styles.mockLabel}>{diagram.mockLabel}</span>
                <span className={styles.mockField}>
                  <span>{diagram.mockValue}</span>
                  <span className={styles.mockArrow}>▾</span>
                </span>
              </div>
              <p className={styles.note}>{diagram.componentNote}</p>
            </div>

            <div className={styles.pagesColumn}>
              <div>
                <p className={styles.pagesHeading}>{diagram.pagesHeading}</p>
                <p className={styles.pagesNote}>{diagram.pagesNote}</p>
              </div>
              <ul className={styles.pages}>
                {diagram.pages.map((page) => (
                  <li key={page} className={styles.page} data-surface="page">
                    <span className={styles.pageName}>{page}</span>
                    {/* Skeleton lines and a field: a sketch of a page, decorative. */}
                    <span className={styles.skeleton} aria-hidden="true">
                      <span className={styles.line} />
                      <span className={styles.line} />
                      <span className={styles.field} />
                    </span>
                    <span className={styles.status}>
                      <span aria-hidden="true">✓ </span>
                      {diagram.pageStatus}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <figcaption className={styles.caption}>{diagram.caption}</figcaption>
        </figure>

        <ol className={styles.steps}>
          {howItWorks.steps.map((step) => (
            <li key={step.label} className={styles.step}>
              <p className={styles.stepLabel}>{step.label}</p>
              <h3 className={styles.stepHeading}>{step.heading}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
