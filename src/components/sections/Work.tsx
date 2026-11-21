import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { config } from '@/content/config';
import { work } from '@/content/home';
import { anchors } from '@/lib/anchors';

import styles from './Work.module.css';

const headingId = 'work-heading';

export function Work() {
  const { beforeAfter } = config;
  return (
    <section id={anchors.work} className={styles.section} aria-labelledby={headingId}>
      <div className={styles.inner}>
        <SectionLabel>{work.label}</SectionLabel>
        <SectionHeading id={headingId} className={styles.heading}>
          {work.heading}
        </SectionHeading>
        <ul className={styles.cards}>
          {work.items.map((item) => (
            <li key={item.heading} className={styles.card}>
              <h3 className={styles.cardHeading}>{item.heading}</h3>
              <p className={styles.text}>{item.text}</p>
            </li>
          ))}
          {beforeAfter && (
            <li className={styles.card}>
              <h3 className={styles.cardHeading}>{work.beforeAfter.heading}</h3>
              <p className={styles.text}>{work.beforeAfter.text}</p>
              <div className={styles.shots}>
                {(
                  [
                    [work.beforeAfter.beforeLabel, beforeAfter.before],
                    [work.beforeAfter.afterLabel, beforeAfter.after],
                  ] as const
                ).map(([label, image]) => (
                  <figure key={label} className={styles.shot}>
                    {/* A plain img: next/image adds an inline style, which the CSP forbids. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className={styles.shotImage}
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                    />
                    <figcaption className={styles.shotLabel}>{label}</figcaption>
                  </figure>
                ))}
              </div>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
