# EngPrep language guide

## The rule

- **Vietnamese is the interface.** Navigation, cards, page titles, section headings, buttons, feedback, meta descriptions.
- **English is the subject.** Example sentences, target words, grammar formulas, phonetics, exam keywords.
- **One Vietnamese name per sheet.** The same name is used in the header nav, cards, page H1, footer, meta, and OG.
- **The English exam term is a tag, not a title.** It appears in the card number (`03 / WORD FORMS`), the OG kicker, or as a gloss on first mention.
- **Gloss English terms on first mention.** Example: `cụm từ cố định (collocations)`, `đọc lướt (skim)`, `đọc quét (scan)`, `câu ước (wish)`.
- **Exam parts are Vietnamese in the interface.** Use `Phần VI`; `Part VI` only as an English tag.
- **The product object is `tờ`.** Do not use `cheat sheet` in interface copy.

## Sheet names

| # | Header nav, hero mini-cards (short) | Resource cards, footer, OG (full) | English tag |
|---|---|---|---|
| 01 | 12 thì | 12 thì | Tenses |
| 02 | Giới từ | Giới từ | Prepositions |
| 03 | Từ loại | Từ loại | Word forms |
| 04 | Đọc hiểu | Đọc hiểu | Reading comprehension |
| 05 | Phát âm | Phát âm & trọng âm | Pronunciation & stress |
| 06 | Viết lại câu | Viết lại câu | Sentence transformation |
| 07 | Từ vựng | Từ vựng & cụm từ | Vocabulary & collocations |
| 08 | Điền khuyết | Điền khuyết | Cloze & gap-fill |
| 09 | Biển báo | Biển báo & giao tiếp | Signs, notices & communication |
| 10 | Ngữ pháp | Ngữ pháp cốt lõi | Grammar essentials |
| 11 | Sắp xếp câu | Sắp xếp câu | Sentence construction / Part VI |
| 12 | Thi thử | Thi thử | Mini exam |

The short name is for the header nav and the homepage hero mini-cards. The full name is for the resource cards, the footer, and OG. They are the same name, not two different names.

## Preferred terms

| Avoid in the interface | Use |
|---|---|
| cheat sheet | tờ, tờ ôn |
| word forms | từ loại (the sheet); dạng từ (the form students choose) |
| reading | đọc hiểu |
| pronunciation / stress | phát âm / trọng âm |
| rewriting / sentence transformation | viết lại câu |
| vocabulary / collocations | từ vựng / cụm từ cố định |
| phrasal verbs | cụm động từ |
| cloze / gap-fill / gap | điền khuyết / chỗ trống |
| signs, notices | biển báo, thông báo |
| communication | giao tiếp |
| grammar | ngữ pháp |
| word order | trật tự từ |
| sentence construction | sắp xếp câu |
| mini exam | thi thử |
| Part VI | Phần VI |
| skim / scan | đọc lướt / đọc quét |

## Headings

Use Vietnamese for headings and labels. English is allowed inside headings only when it is the target form being taught, preferably with a Vietnamese label:

- `Chỗ trống ngữ pháp`, not `Grammar gap`
- `Cụm từ cố định`, not `Collocation`
- `Từ nối`, not `Connectors`
- `Nguyên âm`, not `Vowels`
- `Sắp xếp câu`, not `Rearrange`
- `Cấm`, `Cảnh báo`, `Hướng dẫn`, `Thông tin`, not `Prohibition`, `Warning`, `Instruction`, `Information`
- `Câu ước (Wish)`, `Câu điều kiện (If / Unless)`, `Câu gián tiếp (Reported speech)`
- `Thì hiện tại đơn` with `Present Simple` as a secondary span, not the other way round.

Formulas and examples stay English:

- `S + have/has + V3/ed`
- `I have visited Hue three times.`
- `NO PARKING`
- `watched /t/`

## Meta titles

Format:

```
{Tên tiếng Việt} — Tờ ôn thi lớp 9 | EngPrep
```

Examples:

- `12 thì tiếng Anh — Tờ ôn thi lớp 9 | EngPrep`
- `Từ loại — Tờ ôn thi lớp 9 | EngPrep`
- `Đọc hiểu — Tờ ôn thi lớp 9 | EngPrep`
- `Sắp xếp câu — Tờ ôn thi lớp 9 | EngPrep`

Do not add parenthetical English names to meta titles. The English term is already in the card number and the page content.

## Checklist for a new sheet

1. Add the Vietnamese short name and full name to `src/data/sheets.ts`.
2. Add the English tag to `cardNo` only.
3. Write the meta title in the format above.
4. Write the H1 in Vietnamese; use the English term only as a secondary label or gloss.
5. Write section labels in Vietnamese.
6. Gloss any English term on first mention.
7. Use `Phần VI`, not `Part VI`, in buttons, leads, and body copy.
8. Check the card, header nav, footer, page H1, OG, and meta all use the same Vietnamese name.
