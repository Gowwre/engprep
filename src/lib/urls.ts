const base = import.meta.env.BASE_URL;

/**
 * Build an internal URL that respects Astro's configured `base`.
 * `sitePath()` returns the home page; `sitePath('tenses/')` returns the sheet URL.
 */
export function sitePath(path = ''): string {
  return `${base}${path.replace(/^\/+/, '')}`;
}
