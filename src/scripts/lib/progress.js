/* Shared local progress store. No account, no server. */

const STORAGE_KEY = 'engprep-progress-v1';
const VERSION = 1;

export function emptyProgress() {
  return { version: VERSION, sheets: {}, mock: null };
}

export function readProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== VERSION) return emptyProgress();
    return {
      version: VERSION,
      sheets: parsed.sheets && typeof parsed.sheets === 'object' ? parsed.sheets : {},
      mock: parsed.mock ?? null
    };
  } catch (error) {
    return emptyProgress();
  }
}

export function writeProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    /* Progress is a nice-to-have. */
  }
}

export function getSheetProgress(slug) {
  return readProgress().sheets[slug] ?? null;
}

export function recordSheetResult(slug, score, total, wrong = []) {
  const progress = readProgress();
  const previous = progress.sheets[slug] ?? {};
  progress.sheets[slug] = {
    best: Math.max(previous.best ?? 0, score),
    total,
    attempts: (previous.attempts ?? 0) + 1,
    lastAt: new Date().toISOString(),
    wrong
  };
  writeProgress(progress);
  return progress.sheets[slug];
}

export function migrateSheetBest(slug, score, total) {
  if (!score) return;
  const progress = readProgress();
  if (progress.sheets[slug]) return;
  progress.sheets[slug] = {
    best: score,
    total,
    attempts: 0,
    lastAt: null,
    wrong: []
  };
  writeProgress(progress);
}

export function recordMockResult(score, total) {
  const progress = readProgress();
  const previous = progress.mock ?? {};
  progress.mock = {
    best: Math.max(previous.best ?? 0, score),
    total,
    attempts: (previous.attempts ?? 0) + 1,
    lastAt: new Date().toISOString()
  };
  writeProgress(progress);
}
