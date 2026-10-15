import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SkipLink } from '@/components/layout/SkipLink';
import { config } from '@/content/config';
import { site } from '@/content/site';
import '@/styles/tokens.css';
import '@/styles/globals.css';

import { fontVariables } from './fonts';

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: site.title,
  description: site.description,
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#faf8f3',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <SkipLink />
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
