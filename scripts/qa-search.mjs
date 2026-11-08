#!/usr/bin/env node
/* Check the Pagefind index and the sheet-only search annotations. */

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');
const sheetsSource = readFileSync(path.join(root, 'src/data/sheets.ts'), 'utf8');
const slugs = [...sheetsSource.matchAll(/\bslug:\s*'([^']+)'/g)].map((match) => match[1]);

let failures = 0;

function fail(message) {
  failures += 1;
  console.error(`  ✗ ${message}`);
}

function readPage(relativePath) {
  return readFileSync(path.join(dist, relativePath), 'utf8');
}

const entryPath = path.join(dist, 'pagefind/pagefind-entry.json');
if (!existsSync(path.join(dist, 'pagefind/pagefind.js'))) {
  fail('dist/pagefind/pagefind.js is missing — run npm run build first.');
} else if (!existsSync(entryPath)) {
  fail('dist/pagefind/pagefind-entry.json is missing.');
} else {
  const entry = JSON.parse(readFileSync(entryPath, 'utf8'));
  const pageCount = Object.values(entry.languages ?? {}).reduce(
    (total, language) => total + (language.page_count ?? 0),
    0
  );

  if (pageCount !== slugs.length) {
    fail(`Pagefind indexed ${pageCount} pages; expected ${slugs.length} sheet pages.`);
  } else {
    console.log(`Pagefind index: ${pageCount} sheet pages.`);
  }
}

for (const slug of slugs) {
  try {
    const html = readPage(`${slug}/index.html`);
    const main = html.match(/<main[^>]*>/)?.[0] ?? '';

    if (!main.includes('data-pagefind-body')) {
      fail(`${slug}: missing data-pagefind-body on <main>.`);
    }

    if (!main.includes('data-pagefind-meta')) {
      fail(`${slug}: missing data-pagefind-meta on <main>.`);
    }

    const titleCount = (html.match(/data-pagefind-title=/g) ?? []).length;
    if (titleCount < 4) {
      fail(`${slug}: only ${titleCount} section title(s) for search.`);
    }
  } catch (error) {
    fail(`${slug}: cannot read built page (${error.message}).`);
  }
}

for (const relativePath of [
  'index.html',
  'design-system/index.html',
  'print/tenses/index.html',
  'og/tenses/index.html',
  'sessions/midterm-unit1-3/index.html'
]) {
  const file = path.join(dist, relativePath);
  if (!existsSync(file)) continue;

  const html = readFileSync(file, 'utf8');
  if (/<main[^>]*data-pagefind-body/.test(html)) {
    fail(`${relativePath}: must not be marked for search indexing.`);
  }
}

if (failures) {
  console.error(`\n${failures} search check(s) failed.`);
  process.exit(1);
}

console.log(`Checked ${slugs.length} sheet pages: search annotations look good.`);
