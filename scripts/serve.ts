/**
 * Serves out/ the way Vercel does, so tests run against the real static export:
 * clean URLs (/privacy -> privacy.html), 404.html for unknown paths, and the headers from
 * vercel.json. No dependencies, so it behaves the same on every machine.
 *
 * Usage: node scripts/serve.ts            (PORT defaults to 4321)
 */
import { createReadStream } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { createServer, type Server } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'out');

const CONTENT_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
};

type HeaderRule = { source: string; headers: { key: string; value: string }[] };

async function loadHeaderRules(): Promise<{ pattern: RegExp; headers: HeaderRule['headers'] }[]> {
  const vercel = JSON.parse(await readFile(path.join(ROOT, 'vercel.json'), 'utf8')) as {
    headers?: HeaderRule[];
  };
  // vercel.json sources here only use "(.*)" wildcards, so a direct translation is enough.
  return (vercel.headers ?? []).map((rule) => ({
    pattern: new RegExp(`^${rule.source.replaceAll('(.*)', '.*')}$`),
    headers: rule.headers,
  }));
}

async function isFile(file: string): Promise<boolean> {
  try {
    return (await stat(file)).isFile();
  } catch {
    return false;
  }
}

async function resolveFile(urlPath: string): Promise<string | null> {
  const relative = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.(\/|\\|$))+/, '');
  const base = path.join(OUT_DIR, relative);
  if (!base.startsWith(OUT_DIR)) return null;
  const candidates = urlPath.endsWith('/')
    ? [path.join(base, 'index.html')]
    : [base, `${base}.html`, path.join(base, 'index.html')];
  for (const candidate of candidates) {
    if (await isFile(candidate)) return candidate;
  }
  return null;
}

export async function startServer(port: number): Promise<Server> {
  const rules = await loadHeaderRules();

  const server = createServer(async (req, res) => {
    const urlPath = new URL(req.url ?? '/', 'http://localhost').pathname;
    for (const rule of rules) {
      if (rule.pattern.test(urlPath)) {
        for (const { key, value } of rule.headers) res.setHeader(key, value);
      }
    }

    const file = await resolveFile(urlPath);
    const target = file ?? path.join(OUT_DIR, '404.html');
    res.statusCode = file ? 200 : 404;
    res.setHeader(
      'Content-Type',
      CONTENT_TYPES[path.extname(target)] ?? 'application/octet-stream',
    );
    createReadStream(target)
      .on('error', () => res.end())
      .pipe(res);
  });

  await new Promise<void>((resolve) => server.listen(port, '127.0.0.1', resolve));
  return server;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 4321);
  await startServer(port);
  console.log(`Serving out/ at http://localhost:${port}`);
}
