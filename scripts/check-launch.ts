/**
 * Fails a production build while any launch-required config value is still TODO.
 *
 * "Production" means Vercel's production deployment (VERCEL_ENV=production) or LAUNCH=1
 * (`npm run check:launch`). Every other build only prints a warning, so CI and previews still pass.
 */
import { config, requiredForLaunch, TODO } from '../src/content/config.ts';

const missing = requiredForLaunch.filter((key) => config[key] === TODO);
const strict = process.env.VERCEL_ENV === 'production' || process.env.LAUNCH === '1';

if (missing.length === 0) {
  console.log('check-launch: all launch values are set.');
} else {
  const list = missing.map((key) => `  - ${key}`).join('\n');
  const message = `still TODO in src/content/config.ts:\n${list}`;
  if (strict) {
    console.error(`check-launch: production build blocked, ${message}`);
    process.exit(1);
  }
  console.warn(`check-launch: warning (not a production build), ${message}`);
}
