import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

import { WCAG_TAGS } from './helpers';

const NARROW = 760;

const menuButton = (page: Page) => page.getByRole('button', { name: 'Menu' });
// By id, not role: a closed menu is display:none, so it is (correctly) not in the accessibility tree.
const nav = (page: Page) => page.locator('nav#main-nav');
const firstLink = (page: Page) => nav(page).getByRole('link', { name: 'How it works' });

/** Tabs from the top of the page until the Menu button has focus. */
async function tabToMenuButton(page: Page) {
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('Tab');
    if (await menuButton(page).evaluate((el) => el === document.activeElement)) return;
  }
  throw new Error('Menu button not reached with Tab');
}

test.describe('wide screens', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < NARROW, 'wide layout only');

  test('nav is inline and there is no Menu button', async ({ page }) => {
    await page.goto('/');
    await expect(menuButton(page)).toBeHidden();
    await expect(firstLink(page)).toBeVisible();
  });
});

test.describe('mobile menu', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) >= NARROW, 'narrow layout only');

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('starts closed, with the button controlling the nav', async ({ page }) => {
    const button = menuButton(page);
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(button).toHaveAttribute('aria-controls', 'main-nav');
    await expect(nav(page)).toHaveAttribute('aria-label', 'Main');
    await expect(nav(page)).toBeHidden();
  });

  test('opens with Enter; the next Tab goes to the first menu link', async ({ page }) => {
    await tabToMenuButton(page);
    await page.keyboard.press('Enter');

    await expect(menuButton(page)).toHaveAttribute('aria-expanded', 'true');
    await expect(firstLink(page)).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(firstLink(page)).toBeFocused();
  });

  test('Space toggles it open and closed', async ({ page }) => {
    await tabToMenuButton(page);
    await page.keyboard.press('Space');
    await expect(menuButton(page)).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Space');
    await expect(menuButton(page)).toHaveAttribute('aria-expanded', 'false');
    await expect(nav(page)).toBeHidden();
  });

  test('Escape closes it and returns focus to the button', async ({ page }) => {
    await tabToMenuButton(page);
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Escape');

    await expect(menuButton(page)).toHaveAttribute('aria-expanded', 'false');
    await expect(menuButton(page)).toBeFocused();
    await expect(nav(page)).toBeHidden();
  });

  test('no focus trap: Tab moves past the last menu item into the page', async ({ page }) => {
    await tabToMenuButton(page);
    await page.keyboard.press('Enter');
    const stops = await nav(page).locator('a').count();
    for (let i = 0; i < stops + 1; i++) await page.keyboard.press('Tab');

    const insideNav = await nav(page).evaluate((el) => el.contains(document.activeElement));
    expect(insideNav).toBe(false);
  });

  test('choosing a link closes the menu', async ({ page }) => {
    await menuButton(page).click();
    await firstLink(page).click();
    await expect(menuButton(page)).toHaveAttribute('aria-expanded', 'false');
    await expect(page).toHaveURL(/#how$/);
  });

  test('no axe violations with the menu open', async ({ page }) => {
    await menuButton(page).click();
    await expect(firstLink(page)).toBeVisible();
    const { violations } = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    expect(violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });

  test('open menu causes no sideways scrolling', async ({ page }) => {
    await menuButton(page).click();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
