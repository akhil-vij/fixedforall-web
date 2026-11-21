import Link from 'next/link';
import type { ComponentProps } from 'react';

import styles from './StandaloneLink.module.css';

type Props = ComponentProps<typeof Link>;

/** An underlined text link that stands on its own line: 44px tall target. */
export function StandaloneLink({ className, ...rest }: Props) {
  return <Link className={[styles.link, className].filter(Boolean).join(' ')} {...rest} />;
}
