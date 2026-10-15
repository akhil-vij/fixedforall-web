import os from 'node:os';

import { defineConfig, devices } from '@playwright/test';

const PORT = 4321;
const CI = Boolean(process.env.CI);
// Playwright's bundled Chromium doesn't run on macOS 12 (Darwin 21) or older, so use the installed
// Google Chrome there. CI (Ubuntu) uses the bundled Chromium.
const OLD_MACOS = os.platform() === 'darwin' && Number(os.release().split('.')[0]) <= 21;

// Tests run against the built static export (npm run build), served the way Vercel serves it.
export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: CI,
  retries: 0,
  reporter: CI ? [['github'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node scripts/serve.ts',
    url: `http://localhost:${PORT}`,
    env: { PORT: String(PORT) },
    reuseExistingServer: !CI,
  },
  projects: [
    // Pure checks on the token file; no browser pages needed.
    { name: 'tokens', testMatch: /tokens\..*\.spec\.ts/ },
    ...[
      { name: 'desktop-1440', width: 1440, height: 900 },
      { name: 'mobile-390', width: 390, height: 844 },
      { name: 'mobile-320', width: 320, height: 640 },
    ].map(({ name, width, height }) => ({
      name,
      testIgnore: /tokens\..*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width, height },
        ...(OLD_MACOS && { channel: 'chrome' }),
      },
    })),
  ],
});
