import { existsSync } from 'node:fs';
import path from 'node:path';

/**
 * Whether a file exists in public/. Runs at build time (the site is a static export), so optional
 * content like the portrait appears once its file is added, with no placeholder before that.
 */
export function publicFileExists(src: string): boolean {
  return existsSync(path.join(process.cwd(), 'public', src));
}
