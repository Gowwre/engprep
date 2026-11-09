/**
 * Shared helpers for TTSMaker audio.
 *
 * These run in both Node (scripts/generate-audio.mjs) and the browser
 * (src/scripts/tts-audio.js), so keep them free of DOM and Node APIs.
 */

/** Canonical lookup key for a word or phrase. */
export function normalizeTtsText(text) {
  return String(text ?? '')
    .normalize('NFC')
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/** Stable, filesystem-safe filename stem for a word or phrase. */
export function ttsSlug(text) {
  return normalizeTtsText(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}
