# Bản in và PDF

## Nguyên tắc

- Bản in là một sản phẩm riêng, không phải bản in của trang web dài.
- Mỗi tờ tối đa 2 trang A4; hiện tại tất cả là 1 trang.
- Body ≥ 8.5pt, caption ≥ 7.5pt. Không giảm cỡ chữ để nhồi nội dung.
- Không để heading mồ côi hoặc trang trống quá 20%.
- Dùng copy hiện tại: “tờ”, “Global Success 9”, không dùng “cheat sheet” hay “Unit 1–3”.

## Cấu trúc

Mỗi bản in gồm:

1. Header: tên tờ, lead ngắn, stamp.
2. Ba cột Ôn nhanh: công thức/quy tắc, dấu hiệu/cách làm, bẫy.
3. “Ba bước dùng tờ này”.
4. “Ghi chú của bạn”.
5. Footer: metadata, URL bản đầy đủ, số trang.

## Render

```bash
npm run pdf
```

Script `scripts/generate-pdf.mjs`:

- build site;
- chạy static server nội bộ;
- dùng Chrome headless `--print-to-pdf` cho từng route `/print/<slug>/`;
- ghi `public/pdf/<slug>.pdf`;
- kiểm tra số trang bằng `pdfinfo` nếu có.

Cần Chrome/Chromium. Đặt `CHROME_BIN` nếu Chrome không nằm trong `PATH`.

## Kiểm tra

- Mỗi PDF đúng 1 trang (hoặc tối đa 2).
- Chữ đọc được ở 100% mà không cần zoom.
- Không có heading mồ côi.
- Không có trang trắng.
- Soát lại `public/pdf/` và hai file PDF gốc của 12 thì / Giới từ sau khi đổi nội dung.
