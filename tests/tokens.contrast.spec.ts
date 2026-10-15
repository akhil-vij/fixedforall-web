/**
 * Checks contrast for every text and UI pairing the design uses, straight from tokens.css.
 *
 * axe only measures what is on screen when it runs, so it misses hover colours, focus rings and
 * the code card's tinted rows. This catches a bad token change before any page renders.
 * Semi-transparent colours (the code card's row tints) are blended over their surface first.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

import { expect, test } from '@playwright/test';

type Rgba = { r: number; g: number; b: number; a: number };

const css = readFileSync(path.resolve(import.meta.dirname, '../src/styles/tokens.css'), 'utf8');
const declarations = new Map(
  [...css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(([, name = '', value = '']) => [
    name,
    value.trim(),
  ]),
);

function resolve(token: string, seen: string[] = []): string {
  if (seen.includes(token)) throw new Error(`Circular token: ${[...seen, token].join(' -> ')}`);
  const value = declarations.get(token);
  if (value === undefined) throw new Error(`Unknown token ${token}`);
  const reference = /^var\((--[\w-]+)\)$/.exec(value);
  return reference ? resolve(reference[1] ?? '', [...seen, token]) : value;
}

function parseColour(value: string): Rgba {
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value);
  if (hex) {
    const digits = hex[1] ?? '';
    const full = digits.length === 3 ? [...digits].map((d) => d + d).join('') : digits;
    return {
      r: parseInt(full.slice(0, 2), 16),
      g: parseInt(full.slice(2, 4), 16),
      b: parseInt(full.slice(4, 6), 16),
      a: 1,
    };
  }
  const rgb = /^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)\s*(?:[/,]\s*([\d.]+)(%?))?\s*\)$/i.exec(
    value,
  );
  if (rgb) {
    const alpha = rgb[4] === undefined ? 1 : Number(rgb[4]) / (rgb[5] === '%' ? 100 : 1);
    return { r: Number(rgb[1]), g: Number(rgb[2]), b: Number(rgb[3]), a: alpha };
  }
  throw new Error(`Can't parse colour "${value}"`);
}

/** Alpha-composites a colour over an opaque backdrop. */
function blend(top: Rgba, backdrop: Rgba): Rgba {
  const mix = (t: number, b: number) => Math.round(t * top.a + b * (1 - top.a));
  return { r: mix(top.r, backdrop.r), g: mix(top.g, backdrop.g), b: mix(top.b, backdrop.b), a: 1 };
}

function luminance({ r, g, b }: Rgba): number {
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(a: Rgba, b: Rgba): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (light + 0.05) / (dark + 0.05);
}

/** Resolves a background token to an opaque colour, blending over `over` if it is translucent. */
function background(token: string, over?: string): Rgba {
  const colour = parseColour(resolve(token));
  if (colour.a === 1) return colour;
  if (!over) throw new Error(`${token} is translucent: give the surface it sits on`);
  return blend(colour, background(over));
}

type Pair = { fg: string; bg: string; over?: string; min: number; use: string };

const TEXT = 4.5;
const UI = 3;
const surfaces = ['--surface-page', '--surface-panel', '--surface-card'];

const pairs: Pair[] = [
  // Body and secondary text, links, accent labels on every light surface
  ...surfaces.flatMap((bg) => [
    { fg: '--text', bg, min: TEXT, use: 'body text, link hover' },
    { fg: '--text-secondary', bg, min: TEXT, use: 'secondary text, labels' },
    { fg: '--link', bg, min: TEXT, use: 'links' },
    { fg: '--accent', bg, min: TEXT, use: '"Most teams start here", "✓ Fixed"' },
    { fg: '--focus-ring', bg, min: UI, use: 'focus ring against its gap' },
    { fg: '--control-border', bg, min: UI, use: 'secondary button and Menu button border' },
  ]),
  {
    fg: '--control-border',
    bg: '--control-hover',
    min: UI,
    use: 'secondary button border on hover',
  },
  { fg: '--text', bg: '--control-hover', min: TEXT, use: 'secondary button text on hover' },

  // Primary buttons
  { fg: '--action-text', bg: '--action', min: TEXT, use: 'primary button' },
  { fg: '--action-text', bg: '--action-hover', min: TEXT, use: 'primary button on hover' },
  { fg: '--action', bg: '--surface-page', min: UI, use: 'primary button against the page' },

  // Report tags
  { fg: '--text-on-ink', bg: '--text', min: TEXT, use: '"Tested by hand" tag' },

  // Contact band and footer
  { fg: '--text-on-band', bg: '--surface-band', min: TEXT, use: 'band text and links' },
  { fg: '--text-on-band-muted', bg: '--surface-band', min: TEXT, use: 'band secondary text' },
  { fg: '--link-on-band-hover', bg: '--surface-band', min: TEXT, use: 'band link hover' },
  { fg: '--focus-ring-on-band', bg: '--surface-band', min: UI, use: 'focus ring on the band' },
  { fg: '--action-on-band-text', bg: '--action-on-band', min: TEXT, use: 'button on the band' },
  {
    fg: '--action-on-band-text',
    bg: '--action-on-band-hover',
    min: TEXT,
    use: 'button on the band, hover',
  },
  {
    fg: '--action-on-band',
    bg: '--surface-band',
    min: UI,
    use: 'button on the band against the band',
  },

  // Hero code card: plain, removed and added rows
  { fg: '--text-code', bg: '--surface-code', min: TEXT, use: 'code text' },
  {
    fg: '--text-code-line-number',
    bg: '--surface-code',
    min: TEXT,
    use: 'line numbers, plain rows',
  },
  {
    fg: '--text-code-line-number',
    bg: '--surface-code-removed',
    over: '--surface-code',
    min: TEXT,
    use: 'line numbers, removed rows',
  },
  {
    fg: '--text-code-line-number',
    bg: '--surface-code-added',
    over: '--surface-code',
    min: TEXT,
    use: 'line numbers, added rows',
  },
  {
    fg: '--text-code-removed',
    bg: '--surface-code-removed',
    over: '--surface-code',
    min: TEXT,
    use: 'removed code',
  },
  {
    fg: '--text-code-added',
    bg: '--surface-code-added',
    over: '--surface-code',
    min: TEXT,
    use: 'added code',
  },
  {
    fg: '--focus-ring-on-code',
    bg: '--surface-code',
    min: UI,
    use: 'focus ring inside the code card',
  },
];

test.describe('token contrast', () => {
  for (const pair of pairs) {
    const label = `${pair.fg} on ${pair.bg}${pair.over ? ` over ${pair.over}` : ''}`;
    test(`${label} ≥ ${pair.min}:1 (${pair.use})`, () => {
      const bg = background(pair.bg, pair.over);
      const fg = parseColour(resolve(pair.fg));
      const ratio = contrast(fg.a === 1 ? fg : blend(fg, bg), bg);
      expect(ratio, `${label} is ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(pair.min);
    });
  }

  test('blending works: a translucent tint over the code surface is not measured as ~1:1', () => {
    const tinted = background('--surface-code-added', '--surface-code');
    expect(tinted).not.toEqual(parseColour(resolve('--surface-code')));
    expect(contrast(parseColour(resolve('--text-code-added')), tinted)).toBeGreaterThan(4.5);
  });
});
