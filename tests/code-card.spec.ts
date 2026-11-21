import { expect, test } from '@playwright/test';

import { open } from './helpers';
import { routes } from './routes';

const home = routes.find((route) => route.name === 'home')!;

test.describe('hero code card', () => {
  test('is a named region', async ({ page }) => {
    await open(page, home);
    await expect(
      page.getByRole('region', { name: 'Code changes in DatePicker.tsx' }),
    ).toBeVisible();
  });

  test('is a Tab stop only while it scrolls sideways', async ({ page }) => {
    await open(page, home);
    const region = page.getByRole('region', { name: 'Code changes in DatePicker.tsx' });
    const overflows = await region.evaluate((el) => el.scrollWidth > el.clientWidth);
    const width = page.viewportSize()!.width;

    if (width === 320) expect(overflows, 'overflows at 320px').toBe(true);
    if (width === 1440) expect(overflows, 'fits at 1440px').toBe(false);

    if (overflows) {
      await expect(region).toHaveAttribute('tabindex', '0');
      await region.focus();
      await page.keyboard.press('ArrowRight');
      await expect.poll(() => region.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
    } else {
      await expect(region).not.toHaveAttribute('tabindex');
    }
  });

  test('becomes a Tab stop when the window narrows', async ({ page }) => {
    test.skip(page.viewportSize()!.width !== 1440, 'resizes from the wide layout');
    await open(page, home);
    const region = page.getByRole('region', { name: 'Code changes in DatePicker.tsx' });
    await expect(region).not.toHaveAttribute('tabindex');
    await page.setViewportSize({ width: 320, height: 640 });
    await expect(region).toHaveAttribute('tabindex', '0');
  });

  test('removed and added lines are marked as deletions and insertions', async ({ page }) => {
    await open(page, home);
    const region = page.getByRole('region', { name: 'Code changes in DatePicker.tsx' });
    await expect(region.locator('del')).toHaveCount(2);
    await expect(region.locator('ins')).toHaveCount(4);
    await expect(region.locator('del').first()).toHaveText(/^− /);
    await expect(region.locator('ins').first()).toHaveText(/^\+ /);
  });
});
