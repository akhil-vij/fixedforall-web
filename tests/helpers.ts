import { expect, type Page } from '@playwright/test';

import type { Route } from './routes';

/** Opens a route, checks its status code, and waits until fonts and layout-dependent state settle. */
export async function open(page: Page, route: Route) {
  const response = await page.goto(route.path);
  expect(response?.status(), `status for ${route.path}`).toBe(route.status);
  await page.evaluate(() => document.fonts.ready);
  // Scroll regions decide whether they're a Tab stop after hydrating (CodeRegion).
  await page.waitForFunction(() => !document.querySelector('[data-overflow="pending"]'));
}

/** The axe tags every page must pass. */
export const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
