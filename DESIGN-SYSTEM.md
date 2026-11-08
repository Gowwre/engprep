# EngPrep design system

**Bản 1.0** · Hướng thiết kế đã chốt: giấy ấm, mực đậm, viền rõ, bóng lệch và một họ màu accent cho mỗi tờ.

Trang tham chiếu sống: `/design-system/` (chỉ chạy trong site, `noindex`).

## 1. Kiến trúc

| Tầng | File | Trách nhiệm |
|---|---|---|
| Font | `src/styles/fonts.css` | `@font-face`, self-hosted |
| Tokens | `src/styles/tokens.css` | Palette, semantic alias, accent role, type/space/radius/shadow/motion/layout, dark + print |
| Base | `src/styles/base.css` | Reset, document, selection, focus, container, skip link, reduced motion |
| Site | `src/styles/styles.css` | Header/footer, hero, section, page nav, quiz shell, tense map/timeline |
| UI | `src/styles/ui.css` | Primitive dùng chung: nút, badge, chip, card, callout, map card, table |
| Figures | `src/styles/figures.css` | Khung sơ đồ dùng chung |
| Page | `src/styles/<slug>.css` | Chỉ phần đặc thù của route |

`src/styles/global.css` import theo thứ tự: **fonts → tokens → base → ui → styles → figures**. CSS riêng của trang import sau `global.css`.

## 2. Màu

### 2.1. Palette

Các token gốc giữ tên đã dùng từ đầu: `--paper`, `--paper-deep`, `--surface`, `--surface-2`, `--ink`, `--muted`, `--line`, `--border-strong`, `--shadow`, `--dot`.

Mỗi tờ có một họ accent gồm ba giá trị:

```css
--jade      /* mực accent */
--jade-bg   /* nền nhạt */
--jade-line /* viền */
```

Các họ hiện có: `jade`, `clay`, `indigo`, `plum`, `teal`, `olive`, `cocoa`, `slate`, `berry`, `graphite`, `cobalt`, `gold`.

Ngoài ra: `success` / `success-bg`, `danger` / `danger-bg`, `gold` / `gold-bg` / `gold-ink`, `code-*`, `note-bg` / `note-ink` (sticky note), `clay-contrast` (chữ trên nền clay).

### 2.2. Semantic alias

Dùng alias khi viết component mới:

```css
--color-canvas            /* nền trang */
--color-surface           /* mặt thẻ */
--color-surface-sunken    /* vùng lõm */
--color-text              /* chữ chính */
--color-text-muted        /* chữ phụ */
--color-rule              /* đường kẻ */
--color-rule-strong       /* viền đậm */
--color-focus             /* focus ring */
--color-success / --color-danger
--color-code-bg / --color-code-text
```

### 2.3. Accent role

Không hard-code màu của tờ. Đặt `data-accent` trên khối cha:

```astro
<section class="map-grid" data-accent="prep">
  <article class="map-card">…</article>
</section>
```

Bên trong, các primitive tự dùng `var(--accent)`, `var(--accent-bg)`, `var(--accent-line)`.

Mapping nằm ở `src/styles/tokens.css` và `src/lib/accents.ts`:

| data-accent | Tờ |
|---|---|
| `tenses` | 12 thì |
| `prep` | Giới từ |
| `word` | Từ loại |
| `reading` | Đọc hiểu |
| `sound` | Phát âm |
| `write` | Viết lại câu |
| `vocab` | Từ vựng |
| `cloze` | Điền khuyết |
| `signs` | Biển báo |
| `grammar` | Ngữ pháp |
| `sentence` | Sắp xếp câu |
| `mock` | Thi thử |

`src/lib/accents.ts` giữ thêm giá trị hex cho ảnh Open Graph.

### 2.4. Dark và print

- Dark mode chỉ override palette trong `[data-theme="dark"]`; semantic alias và accent role tự theo.
- Print override palette trong `@media print`; shadow chuyển thành `transparent`, nền trắng, accent đậm hơn.
- Không viết lại màu cho dark/print trong CSS trang. Nếu thiếu, bổ sung token.

## 3. Kiểu chữ

| Token | Cỡ | Dùng cho |
|---|---|---|
| `--font-size-2xs` | 11px | nhãn phụ, folio |
| `--font-size-xs` | 12px | badge, caption nhỏ |
| `--font-size-sm` | 13px | nhãn bảng, chú thích |
| `--font-size-md` | 14px | nội dung bảng, ghi chú |
| `--font-size-base` | 15px | mô tả thẻ |
| `--font-size-lg` | 16px | thân bài, nút |
| `--font-size-xl` | 18px | tiêu đề nhỏ |
| `--font-size-2xl` | 20px | tiêu đề thẻ |
| `--font-size-3xl` | 24px | tiêu đề mục |
| `--font-size-4xl` | 28px | tiêu đề lớn |
| `--font-size-5xl`–`7xl` | 32–48px | hero / display |

Gia đình: `--font-display` (Lora), `--font-body` (Be Vietnam Pro), `--font-mono` (Roboto Mono).

Dòng chữ: `--leading-none/tight/snug/normal/relaxed/loose`. Theo dõi chữ: `--tracking-tight/snug/normal/wide/wider/widest`.

Quy ước: tiêu đề dùng display; nội dung dùng body; công thức, nhãn bảng và số liệu dùng mono. Không thêm font thứ tư.

## 4. Khoảng cách, bo góc, bóng

- Khoảng cách: lưới 4px, token `--space-1` = 4px … `--space-20` = 80px.
- Bo góc: `--radius-xs` 4px → `--radius-4xl` 24px, `--radius-pill`, `--radius-round`.
- Bóng: `--shadow-xs` 2px → `--shadow-2xl` 7px (offset, không blur), `--shadow-accent`, `--shadow-focus`, `--shadow-pop`.
- Viền: `--border-width`, `--border-width-strong`, `--border-width-accent`, `--border-width-feature`.
- Chuyển động: `--duration-fast` 150ms, `--duration-normal` 200ms, `--duration-slow` 280ms; `--ease-standard`, `--ease-out`.
- Layout: `--container-max`, `--gutter`, `--header-h`, `--page-nav-height`, `--z-*`.

## 5. Primitive

### Nút

```astro
<a class="btn btn-primary">Bắt đầu ôn</a>
<a class="btn btn-ghost">Xem bản đồ</a>
<a class="btn btn-ghost btn-small">In tờ này</a>
<button class="icon-btn" aria-label="…">…</button>
```

- Chỉ một `btn-primary` trong một vùng nhìn.
- Nút disabled dùng thuộc tính `disabled` hoặc `aria-disabled="true"`.

### Badge

```astro
<span class="badge badge--accent">12 thì</span>
<span class="badge badge--gold">Bẫy đề</span>
<span class="badge badge--success">Đúng</span>
<span class="badge badge--danger">Sai</span>
<span class="badge">Trung tính</span>
```

`badge--accent` lấy màu từ khối cha có `data-accent`.

### Chip

```astro
<div class="chip-row">
  <span class="chip">at 7 p.m.</span>
  <span class="chip">on Monday</span>
</div>
```

### Card

```astro
<article class="card">…</article>          <!-- viền trên accent -->
<article class="card card--flat">…</article>
<article class="card card--wash">…</article>
```

### Callout

```astro
<div class="callout callout--note">
  <div>
    <p class="callout-title">Ghi nhớ</p>
    <p>…</p>
  </div>
</div>
```

Biến thể: `callout--note` (jade), `--tip` (gold), `--warn` (clay), `--success`, `--danger`.

### Map card

```astro
<div class="map-grid">
  <a class="map-card" data-accent="tenses" href="#…">
    <p class="map-kicker">01 · Thì</p>
    <h3>Mốc thời gian</h3>
    <p class="map-rule">…</p>
    <div class="map-chips"><span>before</span><span>now</span></div>
    <span class="map-link">Xem sơ đồ →</span>
  </a>
</div>
```

Base (padding, viền, bóng, hover, active) nằm trong `ui.css`. CSS trang chỉ giữ biến thể accent, `min-height`, cỡ tiêu đề và nội dung đặc thù.

### Bảng

```astro
<TableShell wrapperClass="table-shell" tableClass="data-table prep-table" caption="…">
  …
</TableShell>
```

- `table-shell`: khung, bo góc, bóng, cuộn ngang.
- `data-table`: width, header, ô, đường kẻ, row cuối.
- Class trang (`prep-table`, …) chỉ giữ `min-width`, độ rộng cột, code, hover.

### Empty state

```astro
<EmptyState … />
```

Primitive `.empty-state` nằm trong `ui.css`; nội dung lấy từ component.

## 6. Component cấp site

Các component Astro giữ phần cấu trúc và copy, không lặp CSS:

`SectionHead`, `TableShell`, `FilterToolbar`, `EmptyState`, `QuizPanel`, `TrapCard`, `SignalCard`, `TenseCard`, `WordFamilyCard`, `StepCard`, `FigurePanel`, `StudyStackVisual`, `ClueCard`, `CommunicationCard`.

Quy ước: component chỉ render class; style dùng chung nằm trong `styles.css` hoặc `ui.css`.

## 7. Quy ước khi thêm mới

1. **Không hard-code hex, radius, shadow, font-size mới** trong CSS trang. Dùng token hoặc thêm token vào `tokens.css`.
2. **Accent theo tờ**, không theo component. Đặt `data-accent` ở khối cha.
3. **Ưu tiên primitive** trước khi viết CSS mới. Nếu một mẫu lặp ở từ hai trang, đưa vào `ui.css`.
4. **Không đặt style dùng chung trong CSS route.** Class dùng ở nhiều trang phải nằm trong `styles.css` / `ui.css`.
5. **Dark mode và print là bắt buộc.** Kiểm tra cả hai sau khi thêm component.
6. **Giữ đúng ngôn ngữ**: giao diện tiếng Việt, nội dung tiếng Anh là chủ thể. Xem `LANGUAGE.md`.

## 8. Thêm một accent mới

1. Thêm họ màu vào `:root` và `[data-theme="dark"]` trong `tokens.css`.
2. Thêm selector `[data-accent="<tên>"]` với `--accent`, `--accent-bg`, `--accent-line`.
3. Thêm hex tương ứng vào `src/lib/accents.ts` cho OG.
4. Thêm vào union `accent` trong `src/data/sheets.ts` nếu là tờ mới.
5. Kiểm tra `/design-system/` và trang có accent mới ở cả light/dark.

## 9. Kiểm tra

```bash
npm run check
npm run build
npm run preview
```

Kiểm tra thêm:

- `/design-system/` ở light và dark.
- Một trang có map card và một trang có bảng.
- In A4 (Ctrl/Cmd + P): không bóng, nền trắng, bảng không tràn.
- Keyboard: skip link, focus ring, nút, filter, quiz.
