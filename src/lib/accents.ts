import type { Sheet } from '../data/sheets';

export type AccentName = Sheet['accent'];

export interface AccentTheme {
  /** Palette name used by the CSS custom properties. */
  name: string;
  label: string;
  /** Static values for contexts that cannot read CSS variables (OG images). */
  hex: {
    main: string;
    bg: string;
    line: string;
  };
}

/**
 * One accent family per sheet. The screen uses the `data-accent`
 * attribute and inherits --accent, --accent-bg and --accent-line
 * from tokens.css. The hex values mirror the light theme for the
 * Open Graph renderer.
 */
export const accents: Record<AccentName, AccentTheme> = {
  tenses: {
    name: 'clay',
    label: 'Clay',
    hex: { main: '#b0472a', bg: '#f8e6dd', line: '#ecc3b2' }
  },
  prep: {
    name: 'jade',
    label: 'Jade',
    hex: { main: '#1f6b4f', bg: '#e4efe7', line: '#b9d6c5' }
  },
  word: {
    name: 'indigo',
    label: 'Indigo',
    hex: { main: '#40538f', bg: '#e7eaf6', line: '#c3cae6' }
  },
  reading: {
    name: 'gold',
    label: 'Gold',
    hex: { main: '#775400', bg: '#fbf1d3', line: '#e0a92f' }
  },
  sound: {
    name: 'plum',
    label: 'Plum',
    hex: { main: '#7a3f6b', bg: '#f2e4ee', line: '#d8b8cf' }
  },
  write: {
    name: 'teal',
    label: 'Teal',
    hex: { main: '#1d6b68', bg: '#e2f0ee', line: '#b8d8d3' }
  },
  vocab: {
    name: 'olive',
    label: 'Olive',
    hex: { main: '#5f6b2a', bg: '#eef1dc', line: '#cfd7a8' }
  },
  cloze: {
    name: 'cocoa',
    label: 'Cocoa',
    hex: { main: '#7a5230', bg: '#f0e6da', line: '#d9c2a9' }
  },
  signs: {
    name: 'slate',
    label: 'Slate',
    hex: { main: '#3d5a6c', bg: '#e6eef2', line: '#bfd2dc' }
  },
  grammar: {
    name: 'berry',
    label: 'Berry',
    hex: { main: '#8a3d52', bg: '#f4e4e8', line: '#ddb8c2' }
  },
  sentence: {
    name: 'graphite',
    label: 'Graphite',
    hex: { main: '#4b555c', bg: '#e9edf0', line: '#c6d0d6' }
  },
  mock: {
    name: 'cobalt',
    label: 'Cobalt',
    hex: { main: '#285a9e', bg: '#e5edf8', line: '#bfd1ea' }
  }
};

export const accentNames = Object.keys(accents) as AccentName[];
