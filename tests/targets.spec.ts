import { expect, test } from '@playwright/test';

import { open } from './helpers';
import { routes } from './routes';

const MIN_HEIGHT = 44;

for (const route of routes) {
  test(`${route.name}: standalone links and buttons are at least ${MIN_HEIGHT}px tall`, async ({
    page,
  }) => {
    await open(page, route);

    const tooSmall = await page.evaluate((min) => {
      const controls = [...document.querySelectorAll<HTMLElement>('a[href], button')];
      return controls
        .filter((el) => {
          if (el.getClientRects().length === 0) return false; // not rendered (closed menu)
          // Standalone: the link is the whole text of its block. Links inside a sentence are
          // exempt (WCAG 2.5.8 inline exception).
          const block = el.parentElement?.closest('p, li, div, nav, footer, header, main, body');
          return block?.textContent?.trim() === el.textContent?.trim();
        })
        .map((el) => ({
          text: (el.textContent ?? '').trim().slice(0, 40),
          height: Math.round(el.getBoundingClientRect().height),
        }))
        .filter(({ height }) => height < min);
    }, MIN_HEIGHT);

    expect(tooSmall, 'controls under the minimum height').toEqual([]);
  });
}
