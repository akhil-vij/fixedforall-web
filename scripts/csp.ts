/**
 * Post-build step: adds a Content-Security-Policy <meta> tag to every exported HTML page.
 *
 * Next.js puts inline <script> tags in its HTML, so a plain `script-src 'self'` would block the
 * page from working. Instead, this hashes each page's own inline scripts and styles and allows
 * exactly those. It runs as part of `npm run build`, so the hashes always match the content.
 *
 * Directives a <meta> CSP can't carry (frame-ancestors) are sent as a header from vercel.json.
 */
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OUT_DIR = path.resolve(import.meta.dirname, '..', 'out');
const META_PATTERN = /<meta http-equiv="Content-Security-Policy" content="[^"]*"\s*\/?>/;
const JS_TYPES = new Set(['', 'text/javascript', 'application/javascript', 'module']);

function sha256(text: string): string {
  return `'sha256-${createHash('sha256').update(text, 'utf8').digest('base64')}'`;
}

function attribute(attrs: string, name: string): string | undefined {
  const match = new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i').exec(
    attrs,
  );
  return match ? (match[1] ?? match[2] ?? match[3]) : undefined;
}

function decodeEntities(value: string): string {
  return value
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&');
}

function buildPolicy(html: string): string {
  const scriptHashes = new Set<string>();
  const styleHashes = new Set<string>();
  const styleAttrHashes = new Set<string>();

  for (const [, attrs = '', body = ''] of html.matchAll(
    /<script\b([^>]*)>([\s\S]*?)<\/script>/gi,
  )) {
    const type = (attribute(attrs, 'type') ?? '').toLowerCase();
    if (attribute(attrs, 'src') === undefined && JS_TYPES.has(type) && body.length > 0) {
      scriptHashes.add(sha256(body));
    }
  }
  for (const [, body = ''] of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    styleHashes.add(sha256(body));
  }
  // style="" attributes (next/image adds one) need 'unsafe-hashes' plus a hash of each value.
  for (const [, value = ''] of html.matchAll(/<[a-z][^>]*?\sstyle="([^"]*)"/gi)) {
    styleAttrHashes.add(sha256(decodeEntities(value)));
  }

  const styleSources = [...styleHashes];
  if (styleAttrHashes.size > 0) styleSources.push("'unsafe-hashes'", ...styleAttrHashes);

  return [
    "default-src 'self'",
    ["script-src 'self'", ...scriptHashes].join(' '),
    ["style-src 'self'", ...styleSources].join(' '),
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
}

function injectPolicy(html: string): string {
  const withoutOld = html.replace(META_PATTERN, '');
  const meta = `<meta http-equiv="Content-Security-Policy" content="${buildPolicy(withoutOld)}"/>`;
  // Right after the charset declaration, so the charset stays in the first 1024 bytes and the
  // policy comes before any script or style.
  const charset = /<meta charset="utf-8"\s*\/?>/i.exec(withoutOld);
  if (charset) {
    const end = charset.index + charset[0].length;
    return withoutOld.slice(0, end) + meta + withoutOld.slice(end);
  }
  const head = /<head[^>]*>/i.exec(withoutOld);
  if (!head) throw new Error('No <head> found');
  const end = head.index + head[0].length;
  return withoutOld.slice(0, end) + meta + withoutOld.slice(end);
}

async function main() {
  const files = (await readdir(OUT_DIR, { recursive: true }))
    .filter((file) => file.endsWith('.html'))
    .map((file) => path.join(OUT_DIR, file));

  if (files.length === 0) throw new Error(`No HTML files in ${OUT_DIR}. Run next build first.`);

  for (const file of files) {
    const html = await readFile(file, 'utf8');
    await writeFile(file, injectPolicy(html));
  }
  console.log(`csp: added a Content-Security-Policy to ${files.length} HTML files.`);
}

await main();
