import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { open } from './helpers';
import { routes } from './routes';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

for (const route of routes) {
  test(`${route.name}: no axe violations`, async ({ page }) => {
    await open(page, route);
    const { violations } = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

    const report = violations
      .map(
        (v) =>
          `${v.id} (${v.impact}): ${v.help}\n${v.nodes.map((n) => `  ${n.target.join(' ')}`).join('\n')}`,
      )
      .join('\n\n');
    expect(violations, report).toEqual([]);
  });
}
