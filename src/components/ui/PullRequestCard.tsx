import type { CodeLine } from '@/content/home';

import { CodeRegion } from './CodeRegion';
import styles from './PullRequestCard.module.css';

type PullRequest = {
  label: string;
  title: string;
  number: string;
  status: string;
  file: string;
  codeLabel: string;
  lines: CodeLine[];
  footer: string;
};

const prefix: Record<CodeLine['kind'], string> = { context: ' ', removed: '−', added: '+' };

/**
 * An illustrative merged pull request with a short diff. Removed and added lines are <del> and
 * <ins>, so screen readers that report edits say so, as well as reading the − / + prefix.
 */
export function PullRequestCard({
  pullRequest,
  className,
}: {
  pullRequest: PullRequest;
  className?: string;
}) {
  return (
    <article
      className={[styles.card, className].filter(Boolean).join(' ')}
      aria-label={pullRequest.label}
      data-surface="card"
    >
      <div className={styles.titleBar}>
        <p className={styles.title}>
          {pullRequest.title} <span className={styles.number}>{pullRequest.number}</span>
        </p>
        <span className={styles.status}>{pullRequest.status}</span>
      </div>
      <p className={styles.file}>{pullRequest.file}</p>
      <CodeRegion label={pullRequest.codeLabel}>
        {pullRequest.lines.map((line, i) => {
          const code = `${prefix[line.kind]} ${line.code}`;
          return (
            <div key={i} className={`${styles.row} ${styles[line.kind]}`}>
              <span className={styles.lineNumber}>{line.number}</span>
              {line.kind === 'removed' ? (
                <del className={styles.code}>{code}</del>
              ) : line.kind === 'added' ? (
                <ins className={styles.code}>{code}</ins>
              ) : (
                <span className={styles.code}>{code}</span>
              )}
            </div>
          );
        })}
      </CodeRegion>
      <p className={styles.footer}>{pullRequest.footer}</p>
    </article>
  );
}
