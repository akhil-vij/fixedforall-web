import { expect, test } from '@playwright/test';

import { open } from './helpers';
import { routes } from './routes';

const home = routes.find((route) => route.name === 'home')!;

test('How it works: the diagram has a text equivalent and real lists', async ({ page }) => {
  await open(page, home);
  const section = page.locator('#how');
  const figure = section.locator('figure');

  await expect(figure.locator('figcaption')).toHaveText(
    /One change in the date picker, reviewed by your team as a pull request, reaches every page that uses it/,
  );

  // The six page names are a list; the sketches inside them are hidden from assistive tech.
  const pages = figure.getByRole('list').getByRole('listitem');
  await expect(pages).toHaveCount(6);
  await expect(figure.getByRole('listitem').first()).toContainText('Search');

  // Nothing drawn is exposed: every decorative part sits inside aria-hidden.
  const exposedDrawings = await figure.evaluate(
    (el) =>
      [...el.querySelectorAll('[class*="mock"], [class*="skeleton"]')].filter(
        (part) => !part.closest('[aria-hidden="true"]'),
      ).length,
  );
  expect(exposedDrawings, 'decorative parts outside aria-hidden').toBe(0);

  // Steps: an ordered list of three, each with an h3.
  const steps = section.locator('ol > li');
  await expect(steps).toHaveCount(3);
  for (const step of await steps.all()) {
    await expect(step.getByRole('heading', { level: 3 })).toHaveCount(1);
  }
});
