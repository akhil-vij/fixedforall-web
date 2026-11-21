import { expect, test } from '@playwright/test';

import { config } from '../src/content/config';
import { open } from './helpers';
import { routes } from './routes';

const home = routes.find((route) => route.name === 'home')!;

test('Services: three cards, the Check priced from config', async ({ page }) => {
  await open(page, home);
  const services = page.locator('#services');
  await expect(services.getByRole('heading', { level: 3 })).toHaveCount(3);
  await expect(services).toContainText(`from ${config.checkPrice}`);
});

test('Sample report: headings, a list of fixes, text counts and tags', async ({ page }) => {
  await open(page, home);
  const sample = page.getByRole('article', { name: 'Sample report, page 1 (illustrative)' });

  await expect(sample.getByRole('heading', { level: 3 })).toHaveText([
    'Summary',
    'By impact on users',
    'Fix these first',
  ]);
  await expect(sample.locator('ol > li')).toHaveCount(5);
  await expect(sample.locator('ol > li').first()).toContainText('Tested by hand');

  // The bars only draw the counts, which are text.
  for (const bar of await sample.locator('svg').all()) {
    await expect(bar).toHaveAttribute('aria-hidden', 'true');
  }
  await expect(sample.getByText('Blocks users completely')).toBeVisible();
});

test('Sample report PDF link shows only when a URL is set', async ({ page }) => {
  await open(page, home);
  const link = page.getByRole('link', { name: 'Download the sample report (PDF)' });
  await expect(link).toHaveCount(config.sampleReportUrl ? 1 : 0);
});
