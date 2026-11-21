'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

import styles from './CodeRegion.module.css';

/**
 * A dark code panel that scrolls sideways on narrow screens. It's a Tab stop only while it
 * overflows, so keyboard users can scroll it with the arrow keys without meeting an extra stop
 * when there's nothing to scroll.
 *
 * The server-rendered HTML keeps it focusable, so it can be scrolled without JavaScript too.
 * `data-overflow` is "pending" until it has been measured (the tests wait for that).
 */
export function CodeRegion({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [overflow, setOverflow] = useState<'pending' | 'yes' | 'no'>('pending');

  useEffect(() => {
    const region = ref.current;
    if (!region) return;
    const measure = () => setOverflow(region.scrollWidth > region.clientWidth ? 'yes' : 'no');
    const observer = new ResizeObserver(measure);
    observer.observe(region);
    measure();
    return () => observer.disconnect();
  }, []);

  return (
    // A <section> with a name is a region landmark: "Code changes in DatePicker.tsx".
    <section
      ref={ref}
      aria-label={label}
      // Focusable unless measured as not overflowing.
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={overflow === 'no' ? undefined : 0}
      className={styles.region}
      data-surface="code"
      data-overflow={overflow}
    >
      <div className={styles.lines}>{children}</div>
    </section>
  );
}
