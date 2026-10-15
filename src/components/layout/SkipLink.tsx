import styles from './SkipLink.module.css';

/** First focusable element on every page. Hidden until focused; targets <main id="main">. */
export function SkipLink() {
  return (
    <a className={styles.skipLink} href="#main">
      Skip to content
    </a>
  );
}
