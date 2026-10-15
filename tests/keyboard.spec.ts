import { expect, test, type Page } from '@playwright/test';

import { open } from './helpers';
import { routes } from './routes';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]';

/** Marks every Tab stop in DOM order and records how it looks before it has focus. */
async function markTabStops(page: Page): Promise<number> {
  return page.evaluate((selector) => {
    const stops = [...document.querySelectorAll<HTMLElement>(selector)].filter((el) => {
      if (el.tabIndex < 0 || el.closest('[inert]')) return false;
      const style = getComputedStyle(el);
      return style.visibility !== 'hidden' && el.getClientRects().length > 0;
    });
    stops.forEach((el, i) => {
      const style = getComputedStyle(el);
      el.dataset.tabStop = String(i);
      el.dataset.blurredLook = `${style.boxShadow}|${style.outlineStyle}|${style.outlineColor}`;
    });
    return stops.length;
  }, FOCUSABLE);
}

for (const route of routes) {
  test.describe(route.name, () => {
    test('skip link is the first Tab stop and moves focus to main', async ({ page }) => {
      await open(page, route);
      await page.keyboard.press('Tab');

      const skip = page.getByRole('link', { name: 'Skip to content' });
      await expect(skip).toBeFocused();
      await expect(skip).toBeInViewport();

      await page.keyboard.press('Enter');
      await expect(page.locator('main#main')).toBeFocused();

      const mainHasTabStops = await page
        .locator('main')
        .evaluate((main, selector) => main.querySelector(selector) !== null, FOCUSABLE);
      if (mainHasTabStops) {
        await page.keyboard.press('Tab');
        const insideMain = await page.evaluate(
          () => document.activeElement?.closest('main') !== null,
        );
        expect(insideMain, 'the Tab after the skip link lands inside main').toBe(true);
      }
    });

    test('Tab reaches every interactive element in DOM order with a visible focus change', async ({
      page,
    }) => {
      await open(page, route);
      expect(
        await page.locator('[tabindex]:not([tabindex="0"]):not([tabindex^="-"])').count(),
        'no positive tabindex',
      ).toBe(0);

      const count = await markTabStops(page);
      const visited: string[] = [];

      for (let i = 0; i < count; i++) {
        await page.keyboard.press('Tab');
        const focused = page.locator(':focus');
        const state = await focused.evaluate((el: HTMLElement) => {
          const style = getComputedStyle(el);
          return {
            stop: el.dataset.tabStop ?? `unmarked <${el.tagName.toLowerCase()}>`,
            label: (el.getAttribute('aria-label') ?? el.textContent ?? '').trim().slice(0, 40),
            changed:
              `${style.boxShadow}|${style.outlineStyle}|${style.outlineColor}` !==
              el.dataset.blurredLook,
          };
        });
        visited.push(state.stop);
        expect(state.changed, `focus on "${state.label}" changes how it looks`).toBe(true);
        await expect(focused, `"${state.label}" is on screen when focused`).toBeInViewport();
      }

      expect(visited, 'Tab order matches DOM order').toEqual(
        Array.from({ length: count }, (_, i) => String(i)),
      );
    });
  });
}
