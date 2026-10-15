/**
 * Crawls the built site from the home page and checks every link, including #fragment targets.
 *
 * Broken internal links fail. Broken external links are reported as warnings only: third-party
 * sites go down or block crawlers, and that shouldn't break our build.
 */
import type { AddressInfo } from 'node:net';

import { check, LinkState } from 'linkinator';

import { startServer } from './serve.ts';

const server = await startServer(0);
const { port } = server.address() as AddressInfo;
const origin = `http://127.0.0.1:${port}`;

try {
  const result = await check({
    path: `${origin}/`,
    recurse: true,
    checkFragments: true,
    // mailto: links can't be fetched.
    linksToSkip: ['^mailto:'],
    timeout: 15_000,
    retryErrors: true,
    retryErrorsCount: 2,
  });

  const broken = result.links.filter((link) => link.state === LinkState.BROKEN);
  const internal = broken.filter((link) => link.url.startsWith(origin));
  const external = broken.filter((link) => !link.url.startsWith(origin));
  const checked = result.links.filter((link) => link.state !== LinkState.SKIPPED).length;

  const describe = (link: (typeof broken)[number]) =>
    `  ${link.status ?? 'error'}  ${link.url.replace(origin, '')}  (on ${link.parent?.replace(origin, '') ?? '?'})`;

  for (const link of external)
    console.warn(`check-links: warning, external link broken:\n${describe(link)}`);

  if (internal.length > 0) {
    console.error(`check-links: ${internal.length} broken internal link(s):`);
    for (const link of internal) console.error(describe(link));
    process.exitCode = 1;
  } else {
    console.log(`check-links: ${checked} links checked, no broken internal links.`);
  }
} finally {
  server.close();
}
