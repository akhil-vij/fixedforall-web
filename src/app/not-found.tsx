import type { Metadata } from 'next';

import { StandaloneLink } from '@/components/ui/StandaloneLink';

export const metadata: Metadata = {
  title: 'Page not found · Fixed for All',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <h1>Page not found</h1>
      <p>This page doesn’t exist, or it has moved.</p>
      <p>
        <StandaloneLink href="/">Go to the home page</StandaloneLink>
      </p>
    </>
  );
}
