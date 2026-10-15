import type { AnchorHTMLAttributes } from 'react';

import styles from './ButtonLink.module.css';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: 'primary' | 'secondary' | 'onBand';
  size?: 'default' | 'compact';
  /** Full width of its container. */
  block?: boolean;
};

/** A link styled as a button. Use for navigation; use <button> for actions. */
export function ButtonLink({
  variant = 'primary',
  size = 'default',
  block = false,
  className,
  children,
  ...rest
}: Props) {
  const classes = [
    styles.button,
    styles[variant],
    size === 'compact' && styles.compact,
    block && styles.block,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a className={classes} {...rest}>
      {children}
    </a>
  );
}
