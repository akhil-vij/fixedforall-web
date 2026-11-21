import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StandaloneLink } from '@/components/ui/StandaloneLink';
import { config, isSet } from '@/content/config';
import { about } from '@/content/home';
import { anchors } from '@/lib/anchors';
import { publicFileExists } from '@/lib/public-file';

import styles from './About.module.css';

const headingId = 'about-heading';

export function About() {
  const hasPhoto = publicFileExists(about.photo.src);
  const links = [
    isSet(config.linkedinUrl) && { label: about.linkedinLabel, href: config.linkedinUrl },
    isSet(config.websiteUrl) && { label: about.websiteLabel, href: config.websiteUrl },
  ].filter((link) => link !== false);

  return (
    <section id={anchors.about} className={styles.section} aria-labelledby={headingId}>
      <div className={styles.inner}>
        {/* Text first in the DOM, so on narrow screens the greeting comes before the portrait. */}
        <div className={styles.text}>
          <SectionLabel>{about.label}</SectionLabel>
          <SectionHeading id={headingId} className={styles.heading}>
            {about.heading}
          </SectionHeading>
          <p className={styles.body}>{about.body}</p>
          {links.length > 0 && (
            <ul className={styles.links}>
              {links.map((link) => (
                <li key={link.href}>
                  <StandaloneLink href={link.href}>{link.label}</StandaloneLink>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={hasPhoto ? styles.portrait : styles.portraitTextOnly}>
          {hasPhoto && (
            // A plain img: next/image adds an inline style, which the CSP forbids. The file is
            // already sized, so there's nothing for the image optimiser to do in a static export.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className={styles.photo}
              src={about.photo.src}
              alt={about.photo.alt}
              width={about.photo.width}
              height={about.photo.height}
            />
          )}
          <div className={styles.caption} data-surface={hasPhoto ? 'card' : 'panel'}>
            <p className={styles.captionName}>{about.caption.name}</p>
            <p className={styles.captionText}>{about.caption.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
