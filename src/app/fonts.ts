import { Atkinson_Hyperlegible, IBM_Plex_Mono, Source_Serif_4 } from 'next/font/google';

// next/font downloads these at build time and serves them from our own domain: visitors' browsers
// never contact Google. The design uses no italics, so only upright styles are loaded.

export const atkinson = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-atkinson',
});

export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-mono',
});

export const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-source-serif',
});

export const fontVariables = [atkinson.variable, plexMono.variable, sourceSerif.variable].join(' ');
