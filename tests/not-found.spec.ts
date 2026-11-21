import { expect, test } from '@playwright/test';

import { open } from './helpers';
import { routes } from './routes';

const notFound = routes.find((route) => route.status === 404)!;

test('404: not indexed, one h1, and a way home', async ({ page }) => {
  await open(page, notFound);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('This page doesn’t exist.');
  await expect(
    page.getByRole('main').getByRole('link', { name: 'Back to the home page' }),
  ).toHaveAttribute('href', '/');
});
