import { expect, test } from '@playwright/test';

import { open } from './helpers';
import { routes } from './routes';

for (const route of routes) {
  test(`${route.name}: no sideways scrolling`, async ({ page }) => {
    await open(page, route);
    // The hero code card scrolls inside its own region, so it never widens the page.
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(
      scrollWidth,
      `page is ${scrollWidth}px wide in a ${clientWidth}px viewport`,
    ).toBeLessThanOrEqual(clientWidth);
  });
}
