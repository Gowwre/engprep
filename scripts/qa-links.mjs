#!/usr/bin/env node
/* Check built pages for duplicate IDs and broken local anchors. */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const files = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path);
    else if (entry === 'index.html') files.push(path);
  }
}

walk(dist);

let failures = 0;

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  const uniqueDuplicates = [...new Set(duplicates)];
  const idSet = new Set(ids);
  const anchors = [...html.matchAll(/\bhref="#([^"]*)"/g)].map((match) => match[1]);
  const missing = [...new Set(anchors.filter((anchor) => anchor && !idSet.has(anchor)))];

  if (uniqueDuplicates.length || missing.length) {
    failures += 1;
    console.error(`\n${relative(dist, file)}`);
    if (uniqueDuplicates.length) console.error(`  duplicate ids: ${uniqueDuplicates.join(', ')}`);
    if (missing.length) console.error(`  missing anchors: ${missing.map((id) => `#${id}`).join(', ')}`);
  }
}

if (failures) {
  console.error(`\n${failures} page(s) failed.`);
  process.exit(1);
}

console.log(`Checked ${files.length} pages: no duplicate ids or broken local anchors.`);
