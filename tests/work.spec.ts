import { expect, test } from '@playwright/test';

import { config } from '../src/content/config';
import { open } from './helpers';
import { routes } from './routes';

const home = routes.find((route) => route.name === 'home')!;

test('Work: named cards; Before and after only when its screenshots are set', async ({ page }) => {
  await open(page, home);
  const work = page.locator('#work');
  await expect(work.getByRole('heading', { level: 3, name: /^Informatica/ })).toBeVisible();
  await expect(work.getByRole('heading', { level: 3, name: /^Agoda/ })).toBeVisible();
  await expect(work.getByRole('heading', { level: 3, name: /^Before and after/ })).toHaveCount(
    config.beforeAfter ? 1 : 0,
  );
});

test('How I work: five points as a list', async ({ page }) => {
  await open(page, home);
  const section = page.locator('section', {
    has: page.getByRole('heading', { level: 2, name: 'Plain terms, real fixes' }),
  });
  await expect(section.getByRole('listitem')).toHaveCount(5);
});
