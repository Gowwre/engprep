/* =========================================================
   EngPrep — static search index
   Build the Pagefind index after Astro writes `dist/`, and
   serve the last built index while `astro dev` is running.
   ========================================================= */

import { createReadStream, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { close, createIndex } from 'pagefind';

const MIME = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pf_fragment': 'application/octet-stream',
  '.pf_index': 'application/octet-stream',
  '.pf_meta': 'application/octet-stream',
  '.txt': 'text/plain; charset=utf-8',
  '.wasm': 'application/wasm'
};

const EXCLUDE_SELECTORS = [
  '[aria-hidden="true"]',
  '.map-mobile',
  '.toolbar',
  '.empty-state',
  '.quiz-shell',
  '.quiz-best',
  '.qr-tabs',
  '.qr-foot',
  '.table-hint',
  '.section-aside',
  '.hero-actions',
  '.sr-only',
  'noscript'
];

function resolveOutDir(config) {
  const client = config?.build?.client;
  if (client) return client instanceof URL ? fileURLToPath(client) : client;
  const root = config.root instanceof URL ? fileURLToPath(config.root) : config.root;
  return path.join(root, config?.build?.outDir ?? 'dist');
}

function serveIndex(req, res, next, outDir, base) {
  const url = (req.url ?? '').split('?')[0];
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const prefixed = `${normalizedBase}pagefind/`;
  const bare = '/pagefind/';

  let relative = null;
  if (url.startsWith(prefixed)) relative = url.slice(prefixed.length);
  else if (url.startsWith(bare)) relative = url.slice(bare.length);
  else return next();

  if (!relative || relative.includes('\0')) return next();

  let decoded;
  try {
    decoded = decodeURIComponent(relative);
  } catch {
    return next();
  }

  const root = path.join(outDir, 'pagefind');
  const file = path.resolve(root, decoded);

  if (!file.startsWith(`${root}${path.sep}`)) return next();
  if (!existsSync(file) || !statSync(file).isFile()) return next();

  res.setHeader('Content-Type', MIME[path.extname(file)] ?? 'application/octet-stream');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'HEAD') {
    res.end();
    return;
  }

  createReadStream(file).pipe(res);
}

export default function searchIntegration() {
  return {
    name: 'engprep-search',
    hooks: {
      'astro:server:setup': ({ server, logger }) => {
        const outDir = resolveOutDir(server.config);
        const base = server.config.base || '/';

        logger.debug(`Serving Pagefind index from ${path.join(outDir, 'pagefind')}`);

        server.middlewares.use((req, res, next) => {
          serveIndex(req, res, next, outDir, base);
        });
      },

      'astro:build:done': async ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        const { index, errors } = await createIndex({
          excludeSelectors: EXCLUDE_SELECTORS
        });

        if (errors.length) {
          errors.forEach((error) => logger.warn(error));
        }

        if (!index) {
          throw new Error('Không tạo được chỉ mục tìm kiếm Pagefind.');
        }

        const added = await index.addDirectory({ path: outDir });
        if (added.errors.length) {
          added.errors.forEach((error) => logger.error(error));
          throw new Error('Pagefind không đánh chỉ mục được toàn bộ trang.');
        }

        const written = await index.writeFiles({
          outputPath: path.join(outDir, 'pagefind')
        });

        if (written.errors.length) {
          written.errors.forEach((error) => logger.error(error));
          throw new Error('Pagefind không ghi được chỉ mục tìm kiếm.');
        }

        await close();
        logger.info(
          `Đã tạo chỉ mục tìm kiếm tại ${path.relative(process.cwd(), written.outputPath)}/`
        );
      }
    }
  };
}
