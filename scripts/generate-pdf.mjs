#!/usr/bin/env node
/* Render every /print/<slug>/ route to public/pdf/<slug>.pdf. */

import { createServer } from 'node:http';
import { createReadStream, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { extname, join, normalize } from 'node:path';

const execFileAsync = promisify(execFile);
const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');
const outDir = join(root, 'public/pdf');
const basePath = '/engprep/';

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
};

function findChrome() {
  if (process.env.CHROME_BIN) return process.env.CHROME_BIN;
  return 'google-chrome-stable';
}

const server = createServer((req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname.startsWith(basePath)) pathname = pathname.slice(basePath.length - 1);
    if (pathname.endsWith('/')) pathname += 'index.html';
    const filePath = normalize(join(dist, pathname));
    if (!filePath.startsWith(dist) || !existsSync(filePath) || !statSync(filePath).isFile()) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': mime[extname(filePath)] ?? 'application/octet-stream' });
    createReadStream(filePath).pipe(res);
  } catch {
    res.writeHead(500);
    res.end('Server error');
  }
});

await new Promise((resolve, reject) => {
  server.once('error', reject);
  server.listen(0, '127.0.0.1', resolve);
});

const port = server.address().port;
const printRoot = join(dist, 'print');
const slugs = readdirSync(printRoot).filter((entry) => statSync(join(printRoot, entry)).isDirectory()).sort();
mkdirSync(outDir, { recursive: true });

const chrome = findChrome();
console.log(`Rendering ${slugs.length} print sheets...`);

try {
  for (const slug of slugs) {
    const output = join(outDir, `${slug}.pdf`);
    await execFileAsync(
      chrome,
      [
        '--headless',
        '--disable-gpu',
        '--no-first-run',
        '--no-default-browser-check',
        '--no-pdf-header-footer',
        '--run-all-compositor-stages-before-draw',
        '--virtual-time-budget=4000',
        `--print-to-pdf=${output}`,
        `http://127.0.0.1:${port}${basePath}print/${slug}/`
      ],
      { stdio: 'ignore', timeout: 60_000 }
    );
    let pages = '?';
    try {
      const { stdout } = await execFileAsync('pdfinfo', [output], { timeout: 10_000 });
      const match = stdout.match(/^Pages:\s+(\d+)/m);
      if (match) pages = match[1];
    } catch {
      /* pdfinfo is optional. */
    }
    console.log(`  ${slug.padEnd(24)} ${pages} page(s)`);
  }
} finally {
  await new Promise((resolve) => server.close(resolve));
}

console.log(`Wrote PDFs to public/pdf/.`);
