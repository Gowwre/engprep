# EngPrep implementation plan

Status: complete. Rounds 0–8 are implemented, manually checked and committed one by one.

## Goal

Close the information-design gaps found in the cheat-sheet audit:

1. Give every sheet a true one-screen review layer.
2. Make map cards truthful: unique deep link or no link.
3. Make wide tables usable on mobile.
4. Fix the quiz and mock-exam learning loop.
5. Make the homepage offer two clear entry modes.
6. Make print/PDF a designed artifact, not a scaled web page.
7. Close consistency and accessibility gaps.

## Round map

| Round | Outcome | Exit gate |
|---|---|---|
| 0 | Contracts, content matrix, acceptance criteria | Docs committed |
| 1 | Shared primitives: QuickReview, tables, page nav, quiz, filter presets, QA | Component demos pass |
| 2 | QuickReview + maps on tenses, prepositions, word forms; print prototype | 3 sheets verified |
| 3 | QuickReview + maps on reading, cloze, sentence transformation, sentence construction | 7 sheets verified |
| 4 | QuickReview + maps on pronunciation, vocabulary, signs, grammar, mock exam; consistency pass | 12 sheets verified |
| 5 | Quiz/mock persistence, review, question map | Refresh/resume tests pass |
| 6 | Homepage: two modes, path, 12-rule grid, progress | Homepage verified |
| 7 | Print/PDF, accessibility, pronunciation audio | PDFs and a11y verified |
| 8 | QA, docs, release | Full matrix and build pass |

## Round 0 — contracts

### QuickReview contract

- Component: `src/components/QuickReview.astro`.
- Data: `src/data/quick-review.ts`.
- Shape: 3 tabs — rules/formulas, signals/method, traps.
- Budget: max 6 items per tab; each item ≤ 12 words.
- Mobile: only one panel visible; the block (tabs + panel + CTA) must fit one 390 × 844 viewport.
- Desktop: all 3 panels visible in 3 columns; tab controls hidden.
- Every sheet has a QuickReview immediately after the hero.
- Hero primary CTA points to `#quick-review`.

### Map link contract

- A clickable map card must target a unique anchor or a unique filter state.
- If it cannot, it is not a link and must not say “Xem …”.
- Target rows/sections get `scroll-margin-top` and a `:target` highlight.
- Filter presets use hash anchors: `#suffixes-noun`, `#collocations-phrasal`, `#signs-warning`.

### Mobile table contract

- At ≤ 980 px: table hint is visible and the table can scroll horizontally.
- First column stays visible while scrolling horizontally.
- At ≥ 981 px: tables fit and the header row is sticky.
- No key information exists only in a hidden column without a visible cue.

### Learning-loop contract

- After answering a quiz question, feedback is scrolled into view and focused.
- Final review includes the explanation.
- Hint tags can be hidden and the preference persists.
- Quiz and mock-exam answers persist locally and can be resumed.
- Mock exam has a 24-cell question map.

### Print contract

- Print is a dedicated route, not a print of the long web page.
- Max 2 A4 pages per sheet.
- Body text ≥ 8.5 pt; captions ≥ 7.5 pt. Never shrink below the floor — cut content.
- No orphan headings, no page with more than 20% empty space.
- Print uses current copy: “tờ”, not “cheat sheet”; current programme label, not “Unit 1–3”.

### Progress schema

```json
{
  "version": 1,
  "sheets": {
    "tenses": {
      "best": 10,
      "total": 12,
      "attempts": 2,
      "lastAt": "2026-11-08T10:00:00.000Z",
      "wrong": [2, 7]
    }
  },
  "mock": {
    "best": 18,
    "total": 24,
    "lastAt": "2026-11-08T10:30:00.000Z"
  }
}
```

Storage key: `engprep-progress-v1`. Existing `engprep-<slug>-best` keys migrate on first read.

### Decisions locked

- Signs: 4 groups; `Giới hạn` is a sub-label under `Hướng dẫn`.
- Prepositions: “8 hướng chính · 12 giới từ trong bảng”.
- Tenses hero CTA behaves like every other sheet: `#quick-review`.
- Pronunciation audio: Web Speech API, enhancement only, graceful fallback.
- Homepage path: 12 days, one sheet per day, 20–30 minutes/day.
- PDFs: all 12 generated, replacing the two root PDF files.
- Progress: local only; no account, no server.

## Round 1 — shared foundation

- `QuickReview` component + styles + tab script.
- `TableShell`: visible hint, first-column freeze, sticky header on desktop.
- `PageNav`: mobile “Mục lục” menu, active item auto-scroll.
- Quiz: feedback scroll/focus, explanations in review, hint toggle.
- Filter: selectable API + hash presets.
- QA: link/anchor checker.
- Focus ring token.

## Rounds 2–4 — content rollout

Two reference sheets first, then two batches of skill sheets. Each batch:

- QuickReview content.
- Map deep links.
- Filter presets.
- Remove duplicate process strips.
- Add filters where a long table has none.
- Update quiz review links.

## Round 5 — learning loop

- Persist quiz and mock answers.
- Resume prompt.
- Mock question map.
- Timer warnings.
- Progress store and migration.

## Round 6 — homepage

- Two modes: “Ôn theo tờ” / “Ôn theo lộ trình”.
- 12-day path.
- 12-rule grid.
- Ghost card CTAs.
- Progress indicators.
- Search/filter by sheet or skill.

## Round 7 — print and accessibility

- `src/pages/print/[slug].astro`.
- `PrintSheet` layout.
- `npm run pdf`.
- Focus contrast.
- Non-color annotation markers.
- Reduce hero entrance delay.
- Pronunciation speaker buttons.

## Round 8 — QA and release

- Link/anchor checker.
- 12 sheets × 390/768/1280 × light/dark.
- Quiz/mock/filter/print manual matrix.
- Lighthouse and build.
- Docs and deploy.

## Per-round rules

1. `npm run check` and `npm run build` must pass.
2. Manual screenshots at 390, 768 and 1280.
3. Light and dark themes checked on changed surfaces.
4. Commit at the end of the round.
5. No round starts before the previous round’s commit.

## Completed rounds

| Round | Commit |
|---|---|
| 0 | `c2f7b0a` |
| 1 | `14d1350` |
| 2 | `7d6deb3` |
| 3 | `418c47e` |
| 4 | `779c67a` |
| 5 | `8361ac2` |
| 6 | `e39f95b` |
| 7 | `5946483` |
| 8 | this commit |
