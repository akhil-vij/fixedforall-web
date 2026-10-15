import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // eslint-config-next already registers the jsx-a11y plugin with a few rules; turn on the strict set.
  { rules: jsxA11y.flatConfigs.strict.rules },
  globalIgnores([
    '.next/**',
    'out/**',
    'design/**',
    'next-env.d.ts',
    'playwright-report/**',
    'test-results/**',
  ]),
]);
