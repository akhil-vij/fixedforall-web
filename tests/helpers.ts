import { expect, type Page } from '@playwright/test';

import type { Route } from './routes';

/** Opens a route, checks its status code, and waits for web fonts so layout is final. */
export async function open(page: Page, route: Route) {
  const response = await page.goto(route.path);
  expect(response?.status(), `status for ${route.path}`).toBe(route.status);
  await page.evaluate(() => document.fonts.ready);
}
