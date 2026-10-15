'use client';

import { useEffect, useRef, useState } from 'react';

import { ButtonLink } from '@/components/ui/ButtonLink';

import styles from './MainNav.module.css';

type Link = { label: string; href: string };

type Props = {
  items: Link[];
  cta: Link;
  menuButtonLabel: string;
};

const NAV_ID = 'main-nav';

/**
 * The main nav. Wide screens show it inline; narrow screens show a Menu button that opens it below
 * the header. Not a modal: no focus trap, and the links follow the button in DOM order.
 */
export function MainNav({ items, cta, menuButtonLabel }: Props) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      const focus = document.activeElement;
      const focusInMenu = focus === buttonRef.current || navRef.current?.contains(focus);
      setOpen(false);
      // Only pull focus back if it was in the menu; don't yank it from elsewhere on the page.
      if (focusInMenu) buttonRef.current?.focus();
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={styles.menuButton}
        aria-expanded={open}
        aria-controls={NAV_ID}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        {menuButtonLabel}
      </button>
      <nav ref={navRef} id={NAV_ID} aria-label="Main" className={styles.nav} data-open={open}>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.href}>
              <a className={styles.link} href={item.href} onClick={close}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <ButtonLink className={styles.cta} href={cta.href} size="compact" onClick={close}>
          {cta.label}
        </ButtonLink>
      </nav>
    </>
  );
}
