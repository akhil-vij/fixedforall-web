import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StandaloneLink } from '@/components/ui/StandaloneLink';
import { config, isSet } from '@/content/config';
import { report, type FindingMethod } from '@/content/home';
import { anchors } from '@/lib/anchors';

import styles from './Report.module.css';

const headingId = 'report-heading';

function MethodTag({ method }: { method: FindingMethod }) {
  return (
    <span className={method === 'hand' ? styles.tagHand : styles.tagScan}>
      {report.sample.methods[method].tag}
    </span>
  );
}

export function Report() {
  const { sample } = report;
  const total = sample.impact.reduce((sum, row) => sum + row.count, 0);

  return (
    <section
      id={anchors.report}
      className={styles.section}
      aria-labelledby={headingId}
      data-surface="panel"
    >
      <div className={styles.inner}>
        <div className={styles.text}>
          <SectionLabel>{report.label}</SectionLabel>
          <SectionHeading id={headingId} className={styles.heading}>
            {report.heading}
          </SectionHeading>
          {report.paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
          {isSet(config.sampleReportUrl) && (
            <p className={styles.download}>
              <StandaloneLink href={config.sampleReportUrl}>{report.downloadLabel}</StandaloneLink>
            </p>
          )}
        </div>

        <article className={styles.sample} aria-label={sample.label} data-surface="card">
          <div className={styles.sampleHeader}>
            <span>{sample.title}</span>
            <span>{sample.page}</span>
          </div>

          <div>
            <h3 className={styles.label}>{sample.summaryHeading}</h3>
            <p className={styles.summary}>{sample.summary}</p>
          </div>

          <div>
            <h3 className={styles.label}>{sample.impactHeading}</h3>
            <ul className={styles.impact}>
              {sample.impact.map((row) => (
                <li key={row.label} className={styles.impactRow}>
                  <span className={styles.impactLabel}>{row.label}</span>
                  <span className={styles.impactCount}>{row.count}</span>
                  {/* The count is the text; the bar only draws it. SVG attributes, not inline
                      styles, so the CSP allows it. */}
                  <svg className={styles.bar} aria-hidden="true" focusable="false">
                    <rect className={styles.barTrack} width="100%" height="100%" rx="5" />
                    <rect
                      className={styles.barValue}
                      width={`${Math.round((row.count / total) * 100)}%`}
                      height="100%"
                      rx="5"
                    />
                  </svg>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.label}>{sample.fixFirstHeading}</h3>
            <ol className={styles.fixes}>
              {sample.fixFirst.map((fix, i) => (
                <li key={fix.text} className={styles.fix}>
                  <span className={styles.fixNumber}>{i + 1}</span>
                  <span className={styles.fixText}>
                    {fix.text}
                    {/* Keeps the finding and its tag apart when read aloud. */}
                    <span className="visually-hidden">, </span>
                  </span>
                  <MethodTag method={fix.method} />
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.legend}>
            {(['scan', 'hand'] as const).map((method) => (
              <p key={method} className={styles.legendRow}>
                <MethodTag method={method} />
                <span className="visually-hidden">: </span>
                <span>{sample.methods[method].detail}</span>
              </p>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
