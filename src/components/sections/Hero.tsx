import { ButtonLink } from '@/components/ui/ButtonLink';
import { PullRequestCard } from '@/components/ui/PullRequestCard';
import { hero } from '@/content/home';
import { bookingCta } from '@/content/site';
import { anchors, sectionHref } from '@/lib/anchors';

import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <h1 className={styles.headline}>{hero.headline}</h1>
          <p className={styles.subheadline}>{hero.subheadline}</p>
          <div className={styles.actions}>
            <ButtonLink href={bookingCta.href}>{bookingCta.label}</ButtonLink>
            <ButtonLink href={sectionHref(anchors.report)} variant="secondary">
              {hero.secondaryCta}
            </ButtonLink>
          </div>
        </div>
        <PullRequestCard className={styles.card} pullRequest={hero.pullRequest} />
      </div>
    </section>
  );
}
