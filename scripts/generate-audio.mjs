#!/usr/bin/env node
/**
 * Generate the core EngPrep word audio with the TTSMaker API v2.
 *
 * The word list lives in `src/data/tts-words.json` (278 core items). For every
 * item this script creates one MP3, downloads it into `public/audio/tts/` and
 * writes the build-time manifest `src/data/tts-audio.json`.
 *
 * The site is static, so the API key must never reach the browser. Generated
 * files are committed and the browser only reads local MP3s. Items without an
 * MP3 fall back to the Web Speech API.
 *
 * Usage:
 *   TTSMAKER_API_KEY=... npm run audio
 *   npm run audio -- --force
 *   npm run audio -- --dry-run
 *   npm run audio -- --list-voices
 *   npm run audio -- --status
 *
 * Environment (a local .env file is loaded automatically):
 *   TTSMAKER_API_KEY       required to create new audio
 *   TTSMAKER_VOICE_ID      voice id (default 1480)
 *   TTSMAKER_AUDIO_SPEED   speech speed 0.5–2.0 (default 0.9)
 *   TTSMAKER_HIGH_QUALITY  1 for high quality, 0 for standard (default 1)
 *   TTSMAKER_API_BASE      override the API host
 *   TTSMAKER_QPS_DELAY     ms between API calls (default 1200; API allows 1 QPS)
 */
import { readFile, stat, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalizeTtsText, ttsSlug } from '../src/lib/tts.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const outDir = join(root, 'public', 'audio', 'tts');
const wordsPath = join(root, 'src', 'data', 'tts-words.json');
const manifestPath = join(root, 'src', 'data', 'tts-audio.json');

const args = new Set(process.argv.slice(2));
const force = args.has('--force');
const dryRun = args.has('--dry-run');
const listVoices = args.has('--list-voices');
const statusOnly = args.has('--status');
const help = args.has('--help') || args.has('-h');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function envNumber(name, fallback) {
  const raw = process.env[name];
  if (raw === undefined || raw === '') return fallback;
  const value = Number(raw);
  if (!Number.isFinite(value)) {
    throw new Error(`${name} must be a number, got “${raw}”.`);
  }
  return value;
}

function printHelp() {
  console.log(`Generate TTSMaker audio for the core word list.

Usage:
  npm run audio                 generate missing MP3s
  npm run audio -- --force      regenerate every MP3
  npm run audio -- --dry-run    list words/files without calling the API
  npm run audio -- --list-voices
  npm run audio -- --status

Environment:
  TTSMAKER_API_KEY       TTSMaker Pro/Studio API key (required to create audio)
  TTSMAKER_VOICE_ID      voice id (default 1480)
  TTSMAKER_AUDIO_SPEED   speech speed 0.5–2.0 (default 0.9)
  TTSMAKER_HIGH_QUALITY  1 = high quality, 0 = standard (default 1)
  TTSMAKER_API_BASE      API base URL (default https://api.ttsmaker.com/v2)
  TTSMAKER_QPS_DELAY     delay between API calls in ms (default 1200)

The key is only used by this Node script. Generated MP3s and the manifest
are committed, so the deployed site never needs the key.`);
}

async function loadEnv() {
  try {
    process.loadEnvFile(join(root, '.env'));
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw new Error(`Could not read .env: ${error.message}`);
    }
  }
}

function apiKey() {
  return process.env.TTSMAKER_API_KEY?.trim() ?? '';
}

function apiBase() {
  return (process.env.TTSMAKER_API_BASE || 'https://api.ttsmaker.com/v2').replace(/\/+$/, '');
}

async function readJson(path, fallback) {
  try {
    return JSON.parse(await readFile(path, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return fallback;
    throw new Error(`Could not read ${path}: ${error.message}`);
  }
}

async function fileSize(path) {
  try {
    const info = await stat(path);
    return info.isFile() ? info.size : 0;
  } catch {
    return 0;
  }
}

function safeFilename(name) {
  return typeof name === 'string' && /^[a-z0-9][a-z0-9._-]*\.mp3$/i.test(name) && !name.includes('..');
}

function planTasks(items, previousManifest) {
  const usedNames = new Set(Object.values(previousManifest).filter(safeFilename));
  const tasks = [];

  for (const item of items) {
    const key = normalizeTtsText(item.text);
    let file = safeFilename(previousManifest[key]) ? previousManifest[key] : '';

    if (!file) {
      const base = ttsSlug(item.text) || 'audio';
      file = `${base}.mp3`;
      let suffix = 2;
      while (usedNames.has(file)) {
        file = `${base}-${suffix++}.mp3`;
      }
    }

    usedNames.add(file);
    tasks.push({
      key,
      display: item.text,
      file,
      path: join(outDir, file)
    });
  }

  return tasks;
}

async function request(path, options = {}) {
  const url = `${apiBase()}${path}`;
  let lastError;

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    let response;

    try {
      response = await fetch(url, options);
    } catch (error) {
      lastError = error;
      await sleep(800 * attempt);
      continue;
    }

    if (response.status === 429) {
      lastError = new Error('TTSMaker rate limit reached (HTTP 429).');
      await sleep(1200 * attempt);
      continue;
    }

    if (response.status >= 500) {
      lastError = new Error(`TTSMaker HTTP ${response.status}.`);
      await sleep(1000 * attempt);
      continue;
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(`TTSMaker HTTP ${response.status}${data?.msg ? `: ${data.msg}` : ''}`);
    }

    if (!data || Number(data.error_code) !== 0) {
      const summary = data?.error_summary || 'UNKNOWN_ERROR';
      const message = data?.msg || 'TTSMaker returned an unknown error.';
      throw new Error(`${summary}: ${message}`);
    }

    return data;
  }

  throw new Error(`TTSMaker request failed: ${lastError?.message ?? 'unknown error'}`);
}

async function showVoices() {
  if (!apiKey()) throw new Error('TTSMAKER_API_KEY is required for --list-voices.');

  const data = await request(
    `/get-voice-list?language=en&api_key=${encodeURIComponent(apiKey())}`
  );
  const voices = data.voices_detailed_list ?? [];

  console.log(`English voices (${voices.length}):\n`);
  for (const voice of voices) {
    console.log(`${String(voice.id).padEnd(6)} ${String(voice.text_characters_limit).padEnd(7)} ${voice.name}`);
  }
  console.log('\nSet TTSMAKER_VOICE_ID to the id you want.');
}

async function showStatus() {
  if (!apiKey()) throw new Error('TTSMAKER_API_KEY is required for --status.');

  const data = await request(`/get-token-status?api_key=${encodeURIComponent(apiKey())}`);
  const account = data.account_status ?? {};
  const reset = account.subscription_next_reset_timestamp
    ? new Date(account.subscription_next_reset_timestamp * 1000).toISOString()
    : 'unknown';

  console.log(`Account: ${data.user_email ?? 'unknown'}`);
  console.log(`Plan: ${account.subscription_period ?? 'unknown'}`);
  console.log(`Quota: ${Number(account.quota_characters ?? 0).toLocaleString('en-US')} characters`);
  console.log(`Used: ${Number(account.characters_used ?? 0).toLocaleString('en-US')} characters`);
  console.log(`Available: ${Number(account.available_quota ?? 0).toLocaleString('en-US')} characters`);
  console.log(`Next reset: ${reset}`);
}

async function createOrder(text, voiceId, speed, highQuality) {
  return request('/create-tts-order', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      api_key: apiKey(),
      text,
      voice_id: voiceId,
      audio_format: 'mp3',
      audio_speed: speed,
      audio_volume: 1,
      audio_pitch: 1,
      audio_high_quality: highQuality,
      text_paragraph_pause_time: 0,
      emotion_style_key: '',
      emotion_intensity: 1
    })
  });
}

async function downloadAudio(order, destination) {
  const candidates = [order.audio_download_url, order.audio_download_backup_url].filter(Boolean);

  if (candidates.length === 0) {
    throw new Error('TTSMaker did not return a download URL.');
  }

  let lastError;

  for (const url of candidates) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`download HTTP ${response.status}`);
      }

      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 512) {
        throw new Error(`download was suspiciously small (${bytes.length} bytes)`);
      }

      await writeFile(destination, bytes);
      return bytes.length;
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(`Could not download the MP3: ${lastError?.message ?? 'unknown error'}`);
}

function formatBytes(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function main() {
  if (help) {
    printHelp();
    return;
  }

  await loadEnv();

  if (listVoices) {
    await showVoices();
    return;
  }

  if (statusOnly) {
    await showStatus();
    return;
  }

  const voiceId = envNumber('TTSMAKER_VOICE_ID', 1480);
  const speed = envNumber('TTSMAKER_AUDIO_SPEED', 0.9);
  const highQuality = envNumber('TTSMAKER_HIGH_QUALITY', 1);
  const qpsDelay = envNumber('TTSMAKER_QPS_DELAY', 1200);

  if (!Number.isInteger(voiceId) || voiceId <= 0) {
    throw new Error('TTSMAKER_VOICE_ID must be a positive integer.');
  }
  if (speed < 0.5 || speed > 2) {
    throw new Error('TTSMAKER_AUDIO_SPEED must be between 0.5 and 2.0.');
  }
  if (highQuality !== 0 && highQuality !== 1) {
    throw new Error('TTSMAKER_HIGH_QUALITY must be 0 or 1.');
  }
  if (qpsDelay < 0) {
    throw new Error('TTSMAKER_QPS_DELAY must be zero or greater.');
  }

  const wordList = await readJson(wordsPath, null);
  if (!wordList || !Array.isArray(wordList.items) || wordList.items.length === 0) {
    throw new Error(`No items found in ${wordsPath}.`);
  }

  const items = wordList.items.filter((item) => typeof item.text === 'string' && item.text.trim());
  const previousManifest = await readJson(manifestPath, {});
  const tasks = planTasks(items, previousManifest);
  const sizes = new Map();

  for (const task of tasks) {
    sizes.set(task.file, await fileSize(task.path));
  }

  const missing = tasks.filter((task) => force || sizes.get(task.file) === 0);

  if (dryRun) {
    console.log(`[dry-run] ${tasks.length} words, ${tasks.length - missing.length} MP3 present, ${missing.length} to generate.`);
    for (const task of tasks) {
      const state = missing.includes(task) ? 'missing' : 'present';
      console.log(`  ${task.display} → audio/tts/${task.file} (${state})`);
    }
    return;
  }

  console.log(
    `TTSMaker audio: ${tasks.length} words, ${tasks.length - missing.length} MP3 present, ${missing.length} to generate.`
  );

  if (missing.length > 0) {
    if (!apiKey()) {
      throw new Error(
        'TTSMAKER_API_KEY is not set. Add it to .env or the environment, then run `npm run audio` again. ' +
          'Existing MP3s can still be reused without a key.'
      );
    }

    await mkdir(outDir, { recursive: true });

    for (let index = 0; index < missing.length; index += 1) {
      const task = missing[index];
      const label = `[${index + 1}/${missing.length}] ${task.display}`;

      try {
        const order = await createOrder(task.display, voiceId, speed, highQuality);
        const bytes = await downloadAudio(order, task.path);
        const quota = order.account_status?.available_quota;
        const quotaSuffix = quota === undefined ? '' : ` · ${Number(quota).toLocaleString('en-US')} chars left`;
        console.log(`${label} → ${task.file} (${formatBytes(bytes)})${quotaSuffix}`);
      } catch (error) {
        if (error.message.includes('VOICE_ID_ERROR')) {
          throw new Error(
            `${error.message}\nRun \`npm run audio -- --list-voices\` to choose a valid English voice id.`
          );
        }
        throw error;
      }

      if (index < missing.length - 1 && qpsDelay > 0) {
        await sleep(qpsDelay);
      }
    }
  }

  const manifest = {};
  for (const task of tasks) {
    manifest[task.key] = task.file;
  }

  const sorted = Object.fromEntries(
    Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b))
  );

  await writeFile(manifestPath, `${JSON.stringify(sorted, null, 2)}\n`);
  console.log(`Manifest: ${tasks.length} entries → src/data/tts-audio.json`);
}

main().catch((error) => {
  console.error(`\nTTSMaker audio error: ${error.message}`);
  process.exitCode = 1;
});
