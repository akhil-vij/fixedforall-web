import { expect, test } from '@playwright/test';

import { open } from './helpers';
import { routes } from './routes';

for (const route of routes) {
  test(`${route.name}: no Content Security Policy violations`, async ({ page }) => {
    const consoleMessages: string[] = [];
    page.on('console', (message) => {
      if (/content security policy/i.test(message.text())) consoleMessages.push(message.text());
    });
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    await page.addInitScript(() => {
      const w = window as unknown as { cspViolations: string[] };
      w.cspViolations = [];
      document.addEventListener('securitypolicyviolation', (event) => {
        w.cspViolations.push(`${event.violatedDirective} blocked ${event.blockedURI || 'inline'}`);
      });
    });

    await open(page, route);
    await page.waitForLoadState('networkidle');

    const meta = page.locator('meta[http-equiv="Content-Security-Policy"]');
    await expect(meta, 'the post-build CSP step ran').toHaveCount(1);

    const violations = await page.evaluate(
      () => (window as unknown as { cspViolations: string[] }).cspViolations,
    );
    expect(violations, 'securitypolicyviolation events').toEqual([]);
    expect(consoleMessages, 'CSP messages in the console').toEqual([]);
    expect(pageErrors, 'uncaught errors').toEqual([]);
  });
}
