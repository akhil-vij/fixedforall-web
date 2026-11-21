import { ButtonLink } from '@/components/ui/ButtonLink';
import { StandaloneLink } from '@/components/ui/StandaloneLink';
import { config } from '@/content/config';
import { contact } from '@/content/home';
import { bookingCta, bookingIsEmail } from '@/content/site';
import { anchors } from '@/lib/anchors';

import styles from './ContactBand.module.css';

const headingId = 'contact-heading';

/** The dark closing band: one call to action. Focus rings invert via data-surface="band". */
export function ContactBand() {
  return (
    <section
      id={anchors.contact}
      className={styles.section}
      aria-labelledby={headingId}
      data-surface="band"
    >
      <div className={styles.inner}>
        <h2 id={headingId} className={styles.heading}>
          {contact.heading}
        </h2>
        <div className={styles.side}>
          <p className={styles.line}>{contact.line}</p>
          <div className={styles.actions}>
            <ButtonLink href={bookingCta.href} variant="onBand">
              {bookingCta.label}
            </ButtonLink>
            {bookingIsEmail ? (
              // The button already opens an email; the address is here to copy (selects in one click).
              <p className={styles.email}>{contact.emailText}</p>
            ) : (
              <StandaloneLink className={styles.emailLink} href={`mailto:${config.email}`}>
                {contact.emailLink}
              </StandaloneLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
