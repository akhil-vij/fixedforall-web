import { expect, test } from '@playwright/test';

import { open } from './helpers';
import { routes } from './routes';

const home = routes.find((route) => route.name === 'home')!;

test('About: the greeting comes before the portrait in reading order', async ({ page }) => {
  await open(page, home);
  const about = page.locator('#about');
  const heading = about.getByRole('heading', { level: 2, name: 'Hi, I’m Akhil.' });
  const caption = about.getByText('Akhil Vij', { exact: true });

  const headingFirstInDom = await heading.evaluate(
    (h, c) => Boolean(h.compareDocumentPosition(c!) & Node.DOCUMENT_POSITION_FOLLOWING),
    await caption.elementHandle(),
  );
  expect(headingFirstInDom, 'heading precedes the caption in the DOM').toBe(true);

  const headingBox = (await heading.boundingBox())!;
  const captionBox = (await caption.boundingBox())!;
  const width = page.viewportSize()!.width;
  if (width < 760) {
    expect(captionBox.y, 'narrow: portrait sits below the text').toBeGreaterThan(headingBox.y);
  } else {
    expect(captionBox.x, 'wide: portrait sits left of the text').toBeLessThan(headingBox.x);
  }
});

test('About: LinkedIn and personal website links', async ({ page }) => {
  await open(page, home);
  const about = page.locator('#about');
  await expect(about.getByRole('link', { name: 'LinkedIn profile' })).toHaveAttribute(
    'href',
    /^https:\/\/www\.linkedin\.com\/in\//,
  );
  await expect(about.getByRole('link', { name: 'Personal website' })).toHaveAttribute(
    'href',
    /^https:\/\//,
  );
});

test('FAQ: every answer is visible, one h3 per question', async ({ page }) => {
  await open(page, home);
  const faq = page.locator('#faq');
  await expect(faq.locator('details, [aria-expanded]')).toHaveCount(0);
  const questions = faq.getByRole('heading', { level: 3 });
  await expect(questions).toHaveCount(4);
  for (const answer of await faq.locator('h3 + p').all()) {
    await expect(answer).toBeVisible();
  }
});
