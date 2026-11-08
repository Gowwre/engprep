# Content matrix — Round 0

Working matrix for the QuickReview, map-link and print rollout. Update as each round lands.

## Sheet inventory

| Sheet | Sections | Map -> detail | QuickReview tabs | Print target |
|---|---|---|---|---|
| tenses | map, timeline, tenses, compare, signals, traps, quiz | 12 cells -> 12 tense cards (already) | Công thức / Dấu hiệu / Bẫy | 2 pages |
| prepositions | map, rules, time, place, movement, collocations, traps, quiz | 4 cards -> 4 sections (already) | Quy tắc / Cụm cần nhớ / Bẫy | 2 pages |
| word-forms | map, rules, suffixes, prefixes, families, traps, quiz | 4 cards -> suffix filter groups (fix) | Dấu hiệu / Hậu tố / Bẫy | 2 pages |
| reading | map, strategy, types, connectors, sample, traps, quiz | 7 cards -> 7 table rows (fix) | 7 dạng câu / Cách làm / Bẫy | 2 pages |
| pronunciation | map, ed, s, vowels, stress, traps, quiz | 4 cards -> 4 sections (already) | -ed / -s / Trọng âm / Bẫy | 2 pages |
| sentence-transformation | map, formulas, verb-patterns, traps, quiz | 8 cards -> 8 table rows (fix) | Công thức / Mẫu động từ / Bẫy | 2 pages |
| vocabulary | map, collocations, topics, dictionary, traps, quiz | 4 cards -> 3 sections + filter presets (fix) | Nhóm cụm / Cụm động từ / Bẫy | 2 pages |
| cloze | map, strategy, grammar, vocabulary, sample, traps, quiz | 5 cards -> 2 sections with sub-anchors (fix) | 5 loại chỗ trống / 4 bước / Bẫy | 2 pages |
| signs | map, strategy, signs, communication, sample, traps, quiz | 4 cards -> 4 filter groups (fix) | 4 nhóm / Giao tiếp / Bẫy | 2 pages |
| grammar | map, connectors, relatives, comparisons, verb-patterns, quick-points, traps, quiz | 4+1 cards -> 5 sections (already) | 4 nhóm lõi / Mẫu câu / Bẫy | 2 pages |
| sentence-construction | map, word-order, strategy, dictionary, sample, traps, quiz | 2 cards -> 2 sections (already) | Trật tự từ / 4 bước / Bẫy | 2 pages |
| mock-exam | structure, strategy, exam | no map; structure table | Cấu trúc / Chiến lược / Bẫy | 2 pages |

## Deep-link work

### reading
Add IDs to the 7 rows in `#types`:
`types-main-idea`, `types-detail`, `types-vocab`, `types-reference`, `types-inference`, `types-true-false`, `types-cloze`.

### sentence-transformation
Add IDs to the 8 rows in `#formulas`:
`formulas-condition`, `formulas-wish`, `formulas-ving`, `formulas-since`, `formulas-so-such`, `formulas-phrasal`, `formulas-contrast`, `formulas-reported`.

### word-forms
Add hash targets before the suffix table:
`suffixes-noun`, `suffixes-adj`, `suffixes-verb`, `suffixes-adv`.
`initFilter` reads the hash and selects the matching tab.

### vocabulary
Add hash targets:
`collocations-fixed`, `collocations-phrasal`, `topics`, `dictionary`.
Map cards link to these; collocation links select the matching filter tab.

### signs
Add hash targets:
`signs-prohibition`, `signs-warning`, `signs-instruction`, `signs-information`.
Add a filter toolbar to the 20-row table; `initFilter` reads the hash.

### cloze
Add sub-anchors:
`cloze-grammar-grammar`, `cloze-grammar-connector`, `cloze-vocabulary-collocation`, `cloze-vocabulary-context`, `cloze-vocabulary-reference`.
Rewrite the 5 map cards to the matching sub-anchor.

## Consistency checklist

- [x] Signs map 4 groups == table tags (Giới hạn becomes a sub-label).
- [x] Prepositions copy: 8 hướng chính · 12 giới từ trong bảng.
- [x] Tenses hero CTA -> `#quick-review`, like every other sheet.
- [x] Process strip removed where it duplicates step cards.
- [x] Every map card has a unique destination or is not a link.
- [x] Every table wider than 700 px has `hint`.
- [x] Every quiz `reviewLinks` points to the new anchors.
- [x] Every section aside count matches the content.
- [x] Every sheet has the same QuickReview CTA row.
- [x] No “cheat sheet” in interface or print copy.

## Print checklist

- [x] 12 print routes.
- [x] 2 pages maximum.
- [x] Body ≥ 8.5 pt; captions ≥ 7.5 pt.
- [x] No orphan headings.
- [x] No page > 20% blank.
- [x] Current programme label.
- [x] Root PDFs replaced.
