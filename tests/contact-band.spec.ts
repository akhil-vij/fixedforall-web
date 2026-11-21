import { expect, test } from '@playwright/test';

import { config } from '../src/content/config';
import { open } from './helpers';
import { routes } from './routes';

const home = routes.find((route) => route.name === 'home')!;
const bookingIsEmail = config.bookingUrl.startsWith('mailto:');

test('Contact band: one booking action, and email offered once', async ({ page }) => {
  await open(page, home);
  const band = page.locator('#contact');

  await expect(band.getByRole('heading', { level: 2 })).toHaveText(/^Book 20 minutes/);
  const button = band.getByRole('link', {
    name: bookingIsEmail ? 'Email to book a call' : 'Book a 20-minute call',
  });
  await expect(button).toHaveAttribute('href', config.bookingUrl);

  if (bookingIsEmail) {
    // The button already opens an email: the address is plain text, not a second link.
    await expect(band.getByRole('link')).toHaveCount(1);
    await expect(band.getByText(config.email, { exact: true })).toBeVisible();
  } else {
    await expect(band.getByRole('link', { name: `Or email ${config.email}` })).toHaveAttribute(
      'href',
      `mailto:${config.email}`,
    );
  }
});

test('Contact band: focus ring inverts on the dark band', async ({ page }) => {
  await open(page, home);
  const button = page.locator('#contact a').first();
  await button.focus();
  const shadow = await button.evaluate((el) => getComputedStyle(el).boxShadow);
  // Gap in the band colour (rgb(20, 53, 45)), ring in paper (rgb(250, 248, 243)).
  expect(shadow).toContain('rgb(20, 53, 45)');
  expect(shadow).toContain('rgb(250, 248, 243)');
});
