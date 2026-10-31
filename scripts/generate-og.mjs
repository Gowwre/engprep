#!/usr/bin/env node
/**
 * Render the 1200×630 Open Graph cards from the static /og/<slug>/ routes.
 *
 * Usage: npm run og
 * Requires: a production build (the npm script builds first), Chrome/Chromium,
 * and ImageMagick's `magick` for 2× downsampling. Without ImageMagick the
 * screenshots are captured at 1× and are still valid 1200×630 PNGs.
 */
import { execFile, execFileSync } from 'node:child_process';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { copyFile, mkdir, readdir, rm, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, sep } from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const execFileAsync = promisify(execFile);

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const ogRoot = join(dist, 'og');
const outDir = join(root, 'public', 'og');
const tmpDir = join(root, '.og-tmp');
const basePath = '/engprep';
const port = Number(process.env.OG_PORT ?? 4325);

const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.woff2', 'font/woff2'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8']
]);

function hasCommand(command) {
  try {
    execFileSync('which', [command], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function findChrome() {
  if (process.env.CHROME_BIN) {
    return process.env.CHROME_BIN;
  }

  for (const command of ['google-chrome-stable', 'google-chrome', 'chromium', 'chromium-browser']) {
    if (hasCommand(command)) {
      return command;
    }
  }

  throw new Error('Chrome/Chromium not found. Set CHROME_BIN to the browser executable.');
}

if (!existsSync(ogRoot)) {
  throw new Error('dist/og not found. Run `npm run build` before generating OG images.');
}

const slugs = (await readdir(ogRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort((a, b) => (a === 'home' ? -1 : b === 'home' ? 1 : a.localeCompare(b)));

await mkdir(outDir, { recursive: true });
await mkdir(tmpDir, { recursive: true });

const server = createServer((request, response) => {
  try {
    const requestUrl = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`);
    const pathname = decodeURIComponent(requestUrl.pathname);

    if (!pathname.startsWith(`${basePath}/`)) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }

    let filePath = join(dist, pathname.slice(basePath.length + 1));

    if (!filePath.startsWith(`${dist}${sep}`) && filePath !== dist) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }

    if (pathname.endsWith('/')) {
      filePath = join(filePath, 'index.html');
    }

    if (!existsSync(filePath) || !statSync(filePath).isFile()) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }

    response.writeHead(200, {
      'Content-Type': mimeTypes.get(extname(filePath).toLowerCase()) ?? 'application/octet-stream'
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(500);
    response.end('Server error');
  }
});

await new Promise((resolve, reject) => {
  server.once('error', reject);
  server.listen(port, '127.0.0.1', resolve);
});

const chrome = findChrome();
const scale = hasCommand('magick') ? 2 : 1;
const origin = `http://127.0.0.1:${port}${basePath}`;

console.log(`Rendering ${slugs.length} OG cards at ${scale}×...`);

try {
  for (const slug of slugs) {
    const screenshot = join(tmpDir, `${slug}${scale === 2 ? '@2x' : ''}.png`);
    const output = join(outDir, `${slug}.png`);

    await execFileAsync(
      chrome,
      [
        '--headless',
        '--disable-gpu',
        '--hide-scrollbars',
        '--no-first-run',
        '--no-default-browser-check',
        '--run-all-compositor-stages-before-draw',
        `--force-device-scale-factor=${scale}`,
        '--window-size=1200,630',
        '--virtual-time-budget=3000',
        `--screenshot=${screenshot}`,
        `${origin}/og/${slug}/`
      ],
      { stdio: 'ignore', timeout: 60_000 }
    );

    if (scale === 2) {
      await execFileAsync(
        'magick',
        [
          screenshot,
          '-resize',
          '1200x630!',
          '-strip',
          '-define',
          'png:compression-level=9',
          output
        ],
        { stdio: 'ignore', timeout: 60_000 }
      );
    } else {
      await copyFile(screenshot, output);
    }

    await copyFile(output, join(ogRoot, `${slug}.png`));
    const { size } = await stat(output);
    console.log(`  ${slug.padEnd(24)} ${String(Math.round(size / 1024)).padStart(4)} KB`);
  }
} finally {
  await new Promise((resolve) => server.close(resolve));
  await rm(tmpDir, { recursive: true, force: true });
}

console.log(`Wrote ${slugs.length} PNGs to public/og/.`);
