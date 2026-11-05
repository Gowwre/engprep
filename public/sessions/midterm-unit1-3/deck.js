/* =========================================================
   EngPrep — Word Forms deck
   Content + interactions. No build step.
   ========================================================= */

// Practice item helper.
// P(section, ref, item, total, sentence, base, answer, slot, why, extra)
// `ref` is the number in the review sheet; `slot` is noun / adj / adv / verb.
const P = (section, ref, item, total, sentence, base, answer, slot, why, extra = {}) => ({
  type: "practice",
  section,
  ref,
  item,
  total,
  sentence,
  base,
  answer,
  slot,
  why,
  ...extra
});

const slides = [
  /* ---------- 01. Title ---------- */
  {
    type: "title",
    section: "Mở đầu",
    kicker: "EngPrep · Global Success 9 · Midterm 1",
    title: 'Từ <span class="marker">loại</span>',
    subtitle: "Một quy trình. Mọi từ. 90 phút.",
    meta: "Units 1–3 · Local community · City life · Healthy living",
    hint: "Nhấn → để bắt đầu",
    stamp: "90 phút"
  },

  /* ---------- 02. Goal ---------- */
  {
    type: "bullets",
    section: "Mục tiêu",
    title: "Sau 90 phút, em có thể...",
    bullets: [
      {
        tone: "noun",
        text: "Nhìn vị trí để biết chỗ trống cần <strong>danh từ, tính từ, trạng từ hay động từ</strong>."
      },
      {
        tone: "adj",
        text: "Tạo đúng dạng bằng <strong>hậu tố</strong> và <strong>tiền tố</strong>."
      },
      {
        tone: "verb",
        text: "Tránh <strong>5 bẫy</strong> mất điểm nhất trong đề."
      }
    ],
    note: "Không cần học thuộc 35 họ từ. Cần một quy trình em có thể dùng với bất kỳ từ nào."
  },

  /* ---------- 03. Warm-up ---------- */
  {
    type: "warmup",
    section: "Khởi động",
    title: "Ba câu, ba lỗi. Tìm và sửa.",
    items: [
      {
        wrong: "She is a <strong>success</strong> businesswoman.",
        right: "She is a <strong>successful</strong> businesswoman.",
        why: "Trước danh từ cần tính từ."
      },
      {
        wrong: "The film was very <strong>bored</strong>.",
        right: "The film was very <strong>boring</strong>.",
        why: "Bộ phim gây cảm giác → -ing."
      },
      {
        wrong: "He speaks English very <strong>good</strong>.",
        right: "He speaks English very <strong>well</strong>.",
        why: "Bổ nghĩa cho động từ → trạng từ."
      }
    ],
    note: "Đây là ba lỗi quen thuộc. Hôm nay mình sẽ có một quy trình để không đoán nữa."
  },

  /* ---------- 04. Diagnostic instructions ---------- */
  {
    type: "instructions",
    section: "Chẩn đoán",
    title: "Chẩn đoán: 10 câu, 8 phút",
    badge: "8 phút",
    steps: [
      "Chỉ viết <strong>từ còn thiếu</strong>. Không viết lại cả câu.",
      "Không mở sách, không dùng bảng từ.",
      "Không chắc thì đánh dấu <strong>?</strong> và làm tiếp.",
      "Mục tiêu không phải điểm số — mà là <strong>kiểu lỗi</strong> của em."
    ],
    note: "Làm nhanh. Nếu bí quá 20 giây, đánh dấu ? rồi chuyển câu."
  },

  /* ---------- 05–14. Diagnostic items ---------- */
  P(
    "Chẩn đoán", "1", 1, 10,
    "Winning the local recycling competition was her greatest ___ this year.",
    "achieve",
    "achievement",
    "noun",
    "<strong>greatest</strong> là tính từ, sau nó cần một danh từ. <em>achieve → achievement</em> (-ment)."
  ),
  P(
    "Chẩn đoán", "2", 2, 10,
    "“We can prevent illnesses by exercising regularly and eating nutritious food,” she said ___.",
    "optimist",
    "optimistically",
    "adv",
    "<strong>said</strong> là động từ, cần trạng từ bổ nghĩa. <em>optimist → optimistic → optimistically</em>."
  ),
  P(
    "Chẩn đoán", "3", 3, 10,
    "Parents should not ___ teenagers for making mistakes when they are learning to develop healthy habits.",
    "punishable",
    "punish",
    "verb",
    "<strong>should not</strong> + động từ nguyên mẫu. <em>punishable → punish</em>."
  ),
  P(
    "Chẩn đoán", "4", 4, 10,
    "The new public transport system was quite ___ because traffic jams remained a serious problem.",
    "effect",
    "ineffective",
    "adj",
    "<strong>was quite</strong> + tính từ. Nghĩa phủ định → <em>in- + effective = ineffective</em>."
  ),
  P(
    "Chẩn đoán", "5", 5, 10,
    "Teenagers felt ___ to exercise regularly and eat healthy food after their school launched a new health campaign.",
    "encourage",
    "encouraged",
    "adj",
    "<strong>felt</strong> + tính từ. Người cảm thấy → <em>-ed</em>: <em>encouraged</em>."
  ),
  P(
    "Chẩn đoán", "6", 6, 10,
    "The artisans ___ in preserving their traditional pottery-making techniques.",
    "success",
    "succeeded",
    "verb",
    "Chủ ngữ + động từ, thì quá khứ. <em>success → succeed → succeeded</em>."
  ),
  P(
    "Chẩn đoán", "7", 7, 10,
    "The teenagers waited ___ for the results of the school’s healthy living competition.",
    "anxiety",
    "anxiously",
    "adv",
    "<strong>waited</strong> + trạng từ. <em>anxiety → anxious → anxiously</em>."
  ),
  P(
    "Chẩn đoán", "8", 8, 10,
    "The local community project failed to meet residents’ ___ because it did not address their main concerns.",
    "expect",
    "expectations",
    "noun",
    "Sau sở hữu <strong>residents’</strong> cần danh từ; nghĩa số nhiều → <em>expectations</em>."
  ),
  P(
    "Chẩn đoán", "9", 9, 10,
    "The school hired several ___ to maintain and repair its computer systems.",
    "technique",
    "technicians",
    "noun",
    "<strong>several</strong> + danh từ đếm được số nhiều, chỉ người. <em>technique → technician → technicians</em>."
  ),
  P(
    "Chẩn đoán", "10", 10, 10,
    "The local government is ___ public facilities to improve the quality of life for local residents.",
    "enhance",
    "enhancing",
    "verb",
    "<strong>is</strong> + V-ing (hiện tại tiếp diễn). <em>enhance → enhancing</em>."
  ),

  /* ---------- 15. Error types ---------- */
  {
    type: "errorTypes",
    section: "Chẩn đoán",
    title: "Lỗi của em thuộc nhóm nào?",
    items: [
      { code: "S", name: "Slot", desc: "Chọn sai loại từ: cần tính từ nhưng chọn danh từ.", tone: "noun" },
      { code: "Suf", name: "Suffix", desc: "Biết loại từ nhưng chọn sai đuôi.", tone: "adj" },
      { code: "P", name: "Prefix", desc: "Bỏ sót nghĩa phủ định: un-, in-, im-, ir-, il-.", tone: "verb" },
      { code: "Sp", name: "Spelling", desc: "Biết dạng đúng nhưng viết sai chữ.", tone: "adv" },
      { code: "M", name: "Meaning", desc: "Chọn từ cùng họ nhưng khác nghĩa.", tone: "gold" }
    ],
    note: "Hầu hết lỗi là <strong>Slot</strong> hoặc <strong>Suffix</strong>. Đây là tin tốt: cả hai đều sửa được bằng quy trình."
  },

  /* ---------- 16. Routine ---------- */
  {
    type: "routine",
    section: "Quy trình",
    title: "Một quy trình: Vị trí → Hậu tố → Nghĩa → Kiểm tra",
    steps: [
      {
        no: "01",
        name: "Vị trí",
        en: "Slot",
        desc: "Chỗ trống cần gì? Danh từ, tính từ, trạng từ hay động từ?",
        tone: "noun"
      },
      {
        no: "02",
        name: "Hậu tố",
        en: "Suffix",
        desc: "Đuôi nào tạo ra loại từ đó? -tion, -ment, -ful, -ly...",
        tone: "adj"
      },
      {
        no: "03",
        name: "Nghĩa",
        en: "Sense",
        desc: "Có cần phủ định không? un-, in-, im-, il-, ir-, dis-.",
        tone: "verb"
      },
      {
        no: "04",
        name: "Kiểm tra",
        en: "Check",
        desc: "Số nhiều? Thì? Chính tả? Đọc lại cả câu.",
        tone: "adv"
      }
    ],
    note: "Nếu làm tốt bước 1, em đã loại được một nửa đáp án — kể cả khi không biết nghĩa của từ."
  },

  /* ---------- 17. Noun/verb frames ---------- */
  {
    type: "table",
    section: "Quy trình",
    title: "Danh từ hay động từ?",
    headers: ["Khung câu", "Cần điền", "Ví dụ"],
    rows: [
      [
        "<code>a/an/the + ___</code> (không có danh từ theo sau)",
        '<span class="word-class tone-noun">Danh từ</span>',
        "a <strong>success</strong>; the <strong>development</strong>"
      ],
      [
        "<code>___ + V</code> (chủ ngữ)",
        '<span class="word-class tone-noun">Danh từ</span>',
        "<strong>Pollution</strong> is harmful."
      ],
      [
        "<code>prep + ___</code>",
        '<span class="word-class tone-noun">Danh từ / V-ing</span>',
        "in <strong>preservation</strong>; good at <strong>swimming</strong>"
      ],
      [
        "<code>the + ___ + of</code>",
        '<span class="word-class tone-noun">Danh từ</span>',
        "the <strong>preservation</strong> of"
      ],
      [
        "<code>S + ___ + O</code>",
        '<span class="word-class tone-verb">Động từ</span>',
        "She <strong>succeeded</strong> in the exam."
      ],
      [
        "<code>modal / to / not + ___</code>",
        '<span class="word-class tone-verb">Động từ</span>',
        "should <strong>punish</strong>; decide <strong>to learn</strong>"
      ]
    ],
    note: "Nếu chỗ trống là “trung tâm” của cụm danh từ, nó cần danh từ. Nếu nó là hành động của chủ ngữ, nó cần động từ."
  },

  /* ---------- 18. Adjective/adverb frames ---------- */
  {
    type: "table",
    section: "Quy trình",
    title: "Tính từ hay trạng từ?",
    headers: ["Khung câu", "Cần điền", "Ví dụ"],
    rows: [
      [
        "<code>a/an/the/my + ___ + N</code>",
        '<span class="word-class tone-adj">Tính từ</span>',
        "a <strong>successful</strong> businessman"
      ],
      [
        "<code>be/look/feel/become + ___</code>",
        '<span class="word-class tone-adj">Tính từ</span>',
        "She felt <strong>encouraged</strong>."
      ],
      [
        "<code>more/most/very + ___</code>",
        '<span class="word-class tone-adj">Tính từ / Trạng từ</span>',
        "more <strong>effective</strong>; most <strong>carefully</strong>"
      ],
      [
        "<code>V + ___</code>",
        '<span class="word-class tone-adv">Trạng từ</span>',
        "waited <strong>anxiously</strong>"
      ],
      [
        "<code>___ + adj/adv</code>",
        '<span class="word-class tone-adv">Trạng từ</span>',
        "<strong>extremely</strong> careful"
      ]
    ],
    note: "Tính từ trả lời “thế nào?” cho danh từ. Trạng từ trả lời “như thế nào?” cho động từ, tính từ hoặc trạng từ khác."
  },

  /* ---------- 19. Suffixes ---------- */
  {
    type: "suffixes",
    section: "Quy trình",
    title: "Các đuôi từ cần nhớ.",
    groups: [
      {
        name: "Danh từ",
        tone: "noun",
        items: [
          "-tion / -sion*",
          "-ment*",
          "-ance / -ence*",
          "-ity / -ty*",
          "-ness*",
          "-er / -or",
          "-ist / -ian",
          "-ship",
          "-al",
          "-ing"
        ]
      },
      {
        name: "Tính từ",
        tone: "adj",
        items: [
          "-ful*",
          "-less*",
          "-ous*",
          "-ive*",
          "-able / -ible*",
          "-al",
          "-ic",
          "-ed",
          "-ing",
          "-y"
        ]
      },
      {
        name: "Trạng từ",
        tone: "adv",
        items: ["-ly*", "-ward(s)"]
      },
      {
        name: "Động từ",
        tone: "verb",
        items: ["-ize / -ise*", "-ify*", "-en*", "-ate"]
      }
    ],
    note: "Đừng học 33 hậu tố. Học 4 nhóm này, rồi đối chiếu với bảng họ từ khi cần. Các đuôi có gạch chân vàng là nhóm xuất hiện nhiều nhất."
  },

  /* ---------- 20. Prefixes ---------- */
  {
    type: "prefixes",
    section: "Quy trình",
    title: "Tiền tố phủ định: khớp chữ cái đầu.",
    mnemonic:
      "<strong>im-</strong> trước m/b/p · <strong>il-</strong> trước l · <strong>ir-</strong> trước r · <strong>in-</strong> các trường hợp còn lại",
    rows: [
      ["un-", "không, ngược lại", "unhappy · unhealthy · unreliable"],
      ["in-", "không", "incorrect · indirect · invisible"],
      ["im-", "không (trước m/b/p)", "impossible · impolite · impatient"],
      ["il-", "không (trước l)", "illegal · illogical"],
      ["ir-", "không (trước r)", "irregular · irresponsible"],
      ["dis-", "không, ngược lại", "disagree · disappear · dishonest"],
      ["non-", "không, phi", "non-stop · non-smoker"]
    ],
    note: "Tiền tố đổi nghĩa, không đổi loại từ. Hậu tố vẫn là thứ quyết định loại từ."
  },

  /* ---------- 21. Worked example 1 ---------- */
  {
    type: "steps",
    section: "Quy trình",
    title: "Cùng làm chậm.",
    sentence: "Winning the local recycling competition was her greatest ___ this year.",
    base: "achieve",
    steps: [
      ["Vị trí", "Sau <strong>greatest</strong> (tính từ) → cần danh từ."],
      ["Hậu tố", "<em>achieve → achievement</em> (-ment)."],
      ["Nghĩa", "Khẳng định, không cần tiền tố."],
      ["Kiểm tra", "Số ít; a-c-h-i-e-v-e-m-e-n-t."]
    ],
    answer: "achievement",
    tone: "noun",
    why: "Không dịch từ trước. Nhìn vị trí trước, chọn dạng sau."
  },

  /* ---------- 22. Worked example 2 ---------- */
  {
    type: "steps",
    section: "Quy trình",
    title: "Em làm tiếp.",
    sentence: "Students mustn’t believe ___ sources.",
    base: "reliable",
    steps: [
      ["Vị trí", "Trước <strong>sources</strong> (danh từ) → cần tính từ."],
      ["Hậu tố", "<em>rely → reliable</em> (-able)."],
      ["Nghĩa", "<strong>mustn’t</strong> → phủ định → <em>un-</em>."],
      ["Kiểm tra", "u-n-r-e-l-i-a-b-l-e."]
    ],
    answer: "unreliable",
    tone: "adj",
    why: "Đọc cả câu để bắt nghĩa phủ định — đừng chỉ nhìn từ gốc."
  },

  /* ---------- 23. Guided practice instructions ---------- */
  {
    type: "instructions",
    section: "Luyện tập",
    title: "Luyện tập có hướng dẫn: 10 câu",
    badge: "15 phút",
    steps: [
      "Trước khi viết, nói to: <strong>chỗ trống cần gì?</strong>",
      "Sau đó nói: <strong>đuôi nào?</strong> Rồi mới viết.",
      "Sai thì sửa <strong>bước</strong>, không chỉ sửa đáp án.",
      "Cô sẽ hỏi <strong>“why?”</strong> sau mỗi câu."
    ],
    note: "Câu trả lời mẫu: “It’s a noun because it comes after ‘the’ and before ‘of’.”"
  },

  /* ---------- 24–33. Guided practice items ---------- */
  P(
    "Luyện tập", "11", 1, 10,
    "The local community centre ___ several outdated facilities from its renovation plan to improve safety for residents.",
    "omit",
    "omitted",
    "verb",
    "Chủ ngữ + động từ, thì quá khứ. <em>omit → omitted</em> (gấp đôi t)."
  ),
  P(
    "Luyện tập", "12", 2, 10,
    "The new software helps users complete difficult tasks ___ and save time.",
    "effort",
    "effortlessly",
    "adv",
    "<strong>complete</strong> + trạng từ. <em>effort → effortless → effortlessly</em>."
  ),
  P(
    "Luyện tập", "13", 3, 10,
    "The bright lights in the shopping mall can be ___ for young children.",
    "distract",
    "distracting",
    "adj",
    "<strong>be</strong> + tính từ. Đèn gây cảm giác → <em>-ing</em>: <em>distracting</em>."
  ),
  P(
    "Luyện tập", "14", 4, 10,
    "Teenagers should maintain a ___ diet to support their physical and mental health.",
    "balance",
    "balanced",
    "adj",
    "Trước danh từ <strong>diet</strong> cần tính từ. <em>balance → balanced</em>."
  ),
  P(
    "Luyện tập", "15", 5, 10,
    "The local community showed its ___ to support disadvantaged families through regular volunteer activities.",
    "willingly",
    "willingness",
    "noun",
    "Sau sở hữu <strong>its</strong> cần danh từ. <em>willing → willingness</em>."
  ),
  P(
    "Luyện tập", "16", 6, 10,
    "School ___ help teenagers manage stress and improve their mental health.",
    "counsel",
    "counselors",
    "noun",
    "Chủ ngữ số nhiều chỉ người. <em>counsel → counselor → counselors</em>."
  ),
  P(
    "Luyện tập", "17", 7, 10,
    "Teachers should be ___ to students’ needs and provide support when they face difficulties.",
    "respond",
    "responsive",
    "adj",
    "<strong>be</strong> + tính từ. <em>respond → responsive</em>."
  ),
  P(
    "Luyện tập", "18", 8, 10,
    "Schools should provide extra ___ for teenagers who struggle with stress and anxiety.",
    "supportive",
    "support",
    "noun",
    "<strong>extra</strong> + danh từ. <em>supportive → support</em>."
  ),
  P(
    "Luyện tập", "19", 9, 10,
    "Her ___ helped her stay positive despite the challenges she faced at school.",
    "optimistic",
    "optimism",
    "noun",
    "Sau sở hữu <strong>her</strong> cần danh từ. <em>optimistic → optimism</em>."
  ),
  P(
    "Luyện tập", "20", 10, 10,
    "Teenagers can deal with ___ by sharing their concerns with trusted adults.",
    "anxious",
    "anxiety",
    "noun",
    "Sau giới từ <strong>with</strong> cần danh từ. <em>anxious → anxiety</em>."
  ),

  /* ---------- 34. Trap 1 ---------- */
  {
    type: "compare",
    section: "Bẫy đề",
    title: "Bẫy 1: -ed hay -ing?",
    rule: "Người cảm thấy → <strong>-ed</strong>. Vật/việc gây cảm giác → <strong>-ing</strong>.",
    rows: [
      {
        bad: "I am <strong>interesting</strong> in music.",
        good: "I am <strong>interested</strong> in music.",
        why: "Người cảm thấy → interested."
      },
      {
        bad: "The film was so <strong>bored</strong> that we fell asleep.",
        good: "The film was so <strong>boring</strong> that we fell asleep.",
        why: "Bộ phim gây cảm giác → boring."
      },
      {
        bad: "The bright lights can be <strong>distracted</strong> for children.",
        good: "The bright lights can be <strong>distracting</strong> for children.",
        why: "Đèn gây cảm giác → distracting."
      }
    ],
    note: "Mẹo: nếu chủ ngữ là vật/việc → -ing. Nếu chủ ngữ là người → -ed."
  },

  /* ---------- 35. Trap 2 ---------- */
  {
    type: "compare",
    section: "Bẫy đề",
    title: "Bẫy 2: danh từ hay tính từ trước danh từ?",
    rule: "Trước danh từ cần <strong>tính từ</strong>, không phải danh từ.",
    rows: [
      {
        bad: "He is a <strong>success</strong> businessman.",
        good: "He is a <strong>successful</strong> businessman.",
        why: "success là danh từ; successful là tính từ."
      },
      {
        bad: "Hue is a <strong>beauty</strong> city.",
        good: "Hue is a <strong>beautiful</strong> city.",
        why: "beauty là danh từ; beautiful là tính từ."
      },
      {
        bad: "She has a <strong>health</strong> lifestyle.",
        good: "She has a <strong>healthy</strong> lifestyle.",
        why: "health là danh từ; healthy là tính từ."
      }
    ],
    note: "Một danh từ có thể đứng trước danh từ khác (a shoe shop), nhưng nó mô tả loại, không mô tả tính chất. Đề từ loại thường cần tính từ."
  },

  /* ---------- 36. Trap 3 ---------- */
  {
    type: "compare",
    section: "Bẫy đề",
    title: "Bẫy 3: nghĩa đổi dạng.",
    rule: "<strong>affect</strong> = động từ (ảnh hưởng) · <strong>effect</strong> = danh từ (tác động). Tiền tố phủ định đổi nghĩa cả câu.",
    rows: [
      {
        bad: "The weather <strong>effects</strong> my mood.",
        good: "The weather <strong>affects</strong> my mood.",
        why: "Cần động từ → affect."
      },
      {
        bad: "Students mustn’t believe <strong>reliable</strong> sources.",
        good: "Students mustn’t believe <strong>unreliable</strong> sources.",
        why: "mustn’t → nghĩa phủ định → un-."
      },
      {
        bad: "It is <strong>possible</strong> to finish in one minute.",
        good: "It is <strong>impossible</strong> to finish in one minute.",
        why: "Nghĩa phủ định → im- (trước p)."
      }
    ],
    note: "Đọc cả câu để bắt “not”, “never”, “mustn’t”, “without”… — đó là tín hiệu cần tiền tố phủ định."
  },

  /* ---------- 37. Trap 4 ---------- */
  {
    type: "compare",
    section: "Bẫy đề",
    title: "Bẫy 4: không phải -ly nào cũng là trạng từ.",
    rule: "Một số từ trông giống trạng từ nhưng là tính từ. Một số trạng từ không có -ly.",
    compact: true,
    rows: [
      {
        bad: "She studies very <strong>hardly</strong>.",
        good: "She studies very <strong>hard</strong>.",
        why: "hard = chăm chỉ; hardly = hầu như không."
      },
      {
        bad: "He came <strong>lately</strong> yesterday.",
        good: "He came <strong>late</strong> yesterday.",
        why: "late = muộn; lately = gần đây."
      },
      {
        bad: "She speaks very <strong>friendly</strong>.",
        good: "She speaks <strong>in a friendly way</strong>.",
        why: "friendly là tính từ, không phải trạng từ."
      },
      {
        bad: "She sings very <strong>good</strong>.",
        good: "She sings very <strong>well</strong>.",
        why: "good = tính từ; well = trạng từ."
      }
    ],
    note: "Nhớ 4 cặp: hard/hardly, late/lately, friendly (adj), good/well."
  },

  /* ---------- 38. Trap 5 ---------- */
  {
    type: "spelling",
    section: "Bẫy đề",
    title: "Bẫy 5: biết dạng rồi — đừng mất điểm chính tả.",
    words: [
      { word: "achievement", hint: "achieve + ment" },
      { word: "maintenance", hint: "main + ten + ance" },
      { word: "omission", hint: "omit → omission (ss)" },
      { word: "arrival", hint: "arrive → arrival (bỏ e)" },
      { word: "preservation", hint: "preserve → preservation (bỏ e)" },
      { word: "reliability", hint: "reliable → reliability (ible → ibility)" }
    ],
    note: "Look – Cover – Write – Check. Viết lại mỗi từ 3 lần, kiểm tra từng chữ cái."
  },

  /* ---------- 39. Exam instructions ---------- */
  {
    type: "instructions",
    section: "Đề mẫu",
    title: "Đề mẫu: 12 phút",
    badge: "12 phút",
    steps: [
      "<strong>10 câu từ loại</strong> + <strong>2 câu dạng động từ</strong> + <strong>1 mục từ điển</strong>.",
      "Làm im lặng. Câu khó đánh dấu <strong>?</strong> rồi làm tiếp.",
      "Đây là đúng format bài kiểm tra giữa kỳ.",
      "Hết giờ mới quay lại câu đã đánh dấu."
    ],
    points: ["Word form + verb form: 1.5 điểm", "Dictionary: 0.5 điểm"],
    note: "Mục tiêu: làm đúng 8/10 câu từ loại. Nếu chậm, ưu tiên câu chắc chắn trước."
  },

  /* ---------- 40–49. Exam set ---------- */
  P(
    "Đề mẫu", "21A", 1, 10,
    "Many skilled local ___ from traditional craft villages gathered to exhibit their handmade items at the cultural festival.",
    "artistic",
    "artists",
    "noun",
    "Danh từ số nhiều chỉ người. <em>artistic → artist → artists</em>."
  ),
  P(
    "Đề mẫu", "21B", 2, 10,
    "The ancient town in Hoi An has a deep ___ on all foreign visitors with its old yellow houses.",
    "impress",
    "impression",
    "noun",
    "Sau <strong>a deep</strong> cần danh từ. <em>impress → impression</em>."
  ),
  P(
    "Đề mẫu", "22", 3, 10,
    "The old museum building was completely ___ after a modern lighting system was installed last month.",
    "electrify",
    "electrified",
    "adj",
    "<strong>was</strong> + tính từ/past participle. <em>electrify → electrified</em>."
  ),
  P(
    "Đề mẫu", "23", 4, 10,
    "Students should not depend too much on technology; they mustn’t believe ___ sources.",
    "reliable",
    "unreliable",
    "adj",
    "Nghĩa phủ định. <em>reliable → unreliable</em>."
  ),
  P(
    "Đề mẫu", "24", 5, 10,
    "Our school is launching a green campaign to encourage teenagers to ___ plastic bottles and paper every day.",
    "recycling",
    "recycle",
    "verb",
    "Sau <strong>to</strong> cần động từ nguyên mẫu. <em>recycling → recycle</em>."
  ),
  P(
    "Đề mẫu", "25", 6, 10,
    "The local authorities are taking strict actions to protect the environment and reduce industrial ___ in the river.",
    "pollute",
    "pollution",
    "noun",
    "Sau tính từ <strong>industrial</strong> cần danh từ. <em>pollute → pollution</em>."
  ),
  P(
    "Đề mẫu", "26", 7, 10,
    "Visiting the floating markets in the Mekong Delta is one of the most ___ experiences for teenagers during the summer vacation.",
    "attract",
    "attractive",
    "adj",
    "<strong>most</strong> + tính từ trước danh từ <strong>experiences</strong>. <em>attract → attractive</em>."
  ),
  P(
    "Đề mẫu", "27", 8, 10,
    "Skilled local ___ spend hours meticulously sewing traditional patterns onto silk Ao dai.",
    "embroider",
    "embroiderers",
    "noun",
    "Danh từ số nhiều chỉ người. <em>embroider → embroiderer → embroiderers</em>."
  ),
  P(
    "Đề mẫu", "28", 9, 10,
    "Many tourists are deeply ___ by the breathtaking natural landscapes and friendly people in Vietnam.",
    "impress",
    "impressed",
    "adj",
    "<strong>are</strong> + tính từ; người cảm thấy → <em>-ed</em>: <em>impressed</em>."
  ),
  P(
    "Đề mẫu", "29", 10, 10,
    "The government plans to build more ___ power stations to supply green energy for growing cities.",
    "electricity",
    "electric",
    "adj",
    "Trước danh từ <strong>power stations</strong> cần tính từ. <em>electricity → electric</em>."
  ),

  /* ---------- 50–51. Verb forms ---------- */
  P(
    "Đề mẫu", "VB1", 11, 12,
    "Mai decided ___ how to make conical hats because she wants the craft to be passed down.",
    "learn",
    "to learn",
    "verb",
    "Sau <strong>decide</strong> dùng <em>to-infinitive</em>: <em>decide to learn</em>.",
    { label: "Dạng động từ 1/2", formula: "decide + to V" }
  ),
  P(
    "Đề mẫu", "VB2", 12, 12,
    "While my mother ___ dinner, my father was watering the plants in the garden.",
    "cook",
    "was cooking",
    "verb",
    "Hai hành động song song trong quá khứ; <strong>while</strong> + quá khứ tiếp diễn: <em>was cooking</em>.",
    { label: "Dạng động từ 2/2", formula: "While + was/were + V-ing" }
  ),

  /* ---------- 52. Dictionary ---------- */
  {
    type: "dictionary",
    section: "Đề mẫu",
    title: "Mục từ điển: đọc ví dụ, chép đúng cụm.",
    entry: `
      <div class="entry-head">
        <span class="entry-word">facility</span>
        <span class="entry-pron">noun /fəˈsɪləti/</span>
      </div>
      <p class="entry-sense"><strong>1.</strong> [plural] buildings, services, equipment, etc. that are provided for a particular purpose</p>
      <ul class="entry-examples">
        <li>leisure/sports <strong>facilities</strong></li>
        <li>medical/recreational/educational <strong>facilities</strong></li>
        <li>shopping/banking/cooking <strong>facilities</strong></li>
        <li><strong>facilities for</strong> somebody/something</li>
        <li>The school is upgrading its outdoor play <strong>facilities</strong>.</li>
      </ul>
    `,
    tasks: [
      {
        sentence: "The school provides modern ___ students to study and practice English.",
        answer: "facilities for",
        why: "Cụm trong mục từ: facilities for somebody/something."
      },
      {
        sentence: "Good ___ can help people relax and spend their free time effectively.",
        answer: "leisure facilities / recreational facilities",
        why: "Cụm trong mục từ: leisure/sports facilities; recreational facilities."
      }
    ],
    note: "Chiến lược: đọc câu → dò ví dụ trong mục từ → chép đúng cụm, tối đa 3 từ. Đừng tự nghĩ ra cụm mới."
  },

  /* ---------- 53. Error log ---------- */
  {
    type: "errorLog",
    section: "Kiểm tra cuối",
    title: "Mã hoá lỗi sai.",
    codes: [
      { code: "S", name: "Slot" },
      { code: "Suf", name: "Suffix" },
      { code: "P", name: "Prefix" },
      { code: "Sp", name: "Spelling" },
      { code: "M", name: "Meaning" }
    ],
    rows: [
      ["Câu 4", "effective", "ineffective", "P", "Thiếu tiền tố phủ định"],
      ["Câu 8", "expectation", "expectations", "Sp", "Thiếu -s số nhiều"],
      ["Câu 13", "distracted", "distracting", "Suf", "Vật gây cảm giác → -ing"]
    ],
    note: "Làm lại 3 câu sai nhiều nhất. Hỏi: “Lần sau mình sẽ làm gì khác?”"
  },

  /* ---------- 54. Exit instructions ---------- */
  {
    type: "instructions",
    section: "Kiểm tra cuối",
    title: "Kiểm tra cuối: 10 câu, 8 phút",
    badge: "8 phút",
    steps: [
      "Như lúc đầu: chỉ viết <strong>từ còn thiếu</strong>.",
      "Không mở sách, không dùng bảng từ.",
      "Mục tiêu: <strong>8/10</strong>.",
      "So với chẩn đoán để thấy tiến bộ."
    ],
    note: "Nếu được 8+, quy trình đã chạy. Nếu chưa, mình biết chính xác bước nào cần sửa."
  },

  /* ---------- 55–64. Exit quiz ---------- */
  P(
    "Kiểm tra cuối", "30", 1, 10,
    "Finding a truly ___ friend who always supports you through difficult times is a great blessing.",
    "reliable",
    "reliable",
    "adj",
    "Trước danh từ <strong>friend</strong> cần tính từ. <em>rely → reliable</em>."
  ),
  P(
    "Kiểm tra cuối", "31", 2, 10,
    "Each region in Vietnam has its own unique culinary ___ that attract food lovers from all over the world.",
    "specialty",
    "specialties",
    "noun",
    "Danh từ số nhiều. <em>specialty → specialties</em> (y → ies)."
  ),
  P(
    "Kiểm tra cuối", "32", 3, 10,
    "Factories need to upgrade their machinery regularly to operate more ___ and minimize waste.",
    "produce",
    "productively",
    "adv",
    "<strong>operate</strong> + trạng từ. <em>produce → productive → productively</em>."
  ),
  P(
    "Kiểm tra cuối", "33", 4, 10,
    "The lotus flower is often chosen to ___ purity and elegance in traditional Vietnamese culture.",
    "symbol",
    "symbolize",
    "verb",
    "Sau <strong>to</strong> cần động từ nguyên mẫu. <em>symbol → symbolize</em>."
  ),
  P(
    "Kiểm tra cuối", "34", 5, 10,
    "Citizens must act ___ by sorting household waste before throwing it into collection bins.",
    "responsibility",
    "responsibly",
    "adv",
    "<strong>act</strong> + trạng từ. <em>responsible → responsibly</em>."
  ),
  P(
    "Kiểm tra cuối", "35", 6, 10,
    "Unchecked industrial waste has heavily ___ the local water sources over the past few years.",
    "pollute",
    "polluted",
    "verb",
    "<strong>has</strong> + past participle. <em>pollute → polluted</em>."
  ),
  P(
    "Kiểm tra cuối", "36", 7, 10,
    "Souvenirs at famous tourist spots are sometimes quite ___, so students often compare prices before buying gifts.",
    "price",
    "pricey",
    "adj",
    "<strong>are quite</strong> + tính từ. <em>price → pricey</em>."
  ),
  P(
    "Kiểm tra cuối", "37", 8, 10,
    "Many international travelers look forward to their safe ___ in Hanoi to explore the Old Quarter.",
    "arrive",
    "arrival",
    "noun",
    "Sau tính từ <strong>safe</strong> cần danh từ. <em>arrive → arrival</em>."
  ),
  P(
    "Kiểm tra cuối", "38", 9, 10,
    "The local community takes pride in the ___ of historical monuments and ancient temples.",
    "preserve",
    "preservation",
    "noun",
    "<strong>the + ___ + of</strong> → danh từ. <em>preserve → preservation</em>."
  ),
  P(
    "Kiểm tra cuối", "39", 10, 10,
    "Teachers always emphasize the importance of ___ discipline and order in school laboratories.",
    "maintain",
    "maintenance",
    "noun",
    "Trước danh từ <strong>discipline</strong> cần danh từ. <em>maintain → maintenance</em>."
  ),

  /* ---------- 65. Wrap-up ---------- */
  {
    type: "wrapup",
    section: "Tổng kết",
    title: "Trước khi về",
    scores: [
      { label: "Chẩn đoán", value: "__ / 10" },
      { label: "Kiểm tra cuối", value: "__ / 10" },
      { label: "Mục tiêu", value: "8 / 10", target: true }
    ],
    homework: [
      "<strong>10 câu đã sai</strong> (hoặc 10 câu mới từ đề cương) — 5 câu/ngày.",
      "<strong>5 thẻ họ từ</strong> mỗi ngày: word + 4 dạng + 1 ví dụ.",
      "<strong>Giải thích quy trình</strong> cho bố/mẹ tối nay.",
      "<strong>15 phút/ngày</strong> — chia 3 lần ngắn, đừng dồn một lần."
    ],
    note: "Không có buổi thứ hai trước bài thi — nên bài tập về nhà chính là buổi thứ hai. Làm đều 3 ngày."
  },

  /* ---------- 66. Closing ---------- */
  {
    type: "closing",
    section: "Tổng kết",
    title: "Ba câu hỏi. Mọi từ.",
    big: "Vị trí → Hậu tố → Nghĩa → Kiểm tra",
    note: "Không cần học thuộc 35 họ từ. Cần một quy trình em có thể tin. Chúc em thi tốt!"
  }
];

/* =========================================================
   Rendering
   ========================================================= */

const stage = document.getElementById("stage");
const stageWrap = document.getElementById("stage-wrap");
const sectionLabel = document.getElementById("section-label");
const slideCounter = document.getElementById("slide-counter");
const progressBar = document.getElementById("progress-bar");
const hint = document.getElementById("hint");

const menu = document.getElementById("menu");
const menuList = document.getElementById("menu-list");
const menuClose = document.getElementById("menu-close");
const menuBtn = document.getElementById("menu-btn");
const menuFs = document.getElementById("menu-fs");

const timerBtn = document.getElementById("timer-btn");
const timerPop = document.getElementById("timer-pop");
const timerDisplay = document.getElementById("timer-display");
const timerStart = document.getElementById("timer-start");
const timerReset = document.getElementById("timer-reset");

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const fsBtn = document.getElementById("fs-btn");

let current = 0;
let menuOpen = false;

const sectionMeta = {
  "Mở đầu": "Tên bài, chủ đề, thời lượng.",
  "Mục tiêu": "Kết quả của buổi học.",
  "Khởi động": "Tìm lỗi, làm nóng.",
  "Chẩn đoán": "10 câu · 8 phút · phân loại lỗi.",
  "Quy trình": "Vị trí → Hậu tố → Nghĩa → Kiểm tra.",
  "Luyện tập": "10 câu có hướng dẫn.",
  "Bẫy đề": "5 lỗi mất điểm nhất.",
  "Đề mẫu": "10 từ loại + 2 động từ + 1 từ điển.",
  "Kiểm tra cuối": "10 câu · 8 phút · so sánh tiến bộ.",
  "Tổng kết": "Điểm, bài tập, lời dặn."
};

function toneClass(tone) {
  return tone ? `tone-${tone}` : "";
}

function gapSentence(sentence) {
  return sentence.replace("___", '<span class="gap" aria-label="blank"></span>');
}

function slotChips(slot) {
  const items = [
    ["noun", "Noun"],
    ["adj", "Adj"],
    ["adv", "Adv"],
    ["verb", "Verb"]
  ];
  return items
    .map(
      ([key, label]) =>
        `<span class="slot-chip" data-target="${key === slot ? "true" : "false"}">${label}</span>`
    )
    .join("");
}

function renderPractice(slide) {
  const label = slide.label || `Câu ${slide.ref} · ${slide.item}/${slide.total}`;
  return `
    <div class="practice-slide">
      <div class="practice-top">
        <span class="practice-kicker">${label}</span>
        <div class="slot-chips">${slotChips(slide.slot)}</div>
      </div>
      ${slide.formula ? `<p class="formula">${slide.formula}</p>` : ""}
      <p class="sentence ${slide.sentence.length > 150 ? "is-long" : ""}">${gapSentence(slide.sentence)}</p>
      <p class="base-word">(${slide.base})</p>
      <button class="reveal-btn" type="button">Hiện đáp án <kbd>Enter</kbd></button>
      <div class="answer" data-reveal hidden>
        <p class="answer-word">${slide.answer}</p>
        <p class="answer-why"><strong>Vì sao:</strong> ${slide.why}</p>
      </div>
    </div>
  `;
}

function renderTitle(slide) {
  return `
    <div class="title-slide">
      <p class="eyebrow">${slide.kicker}</p>
      <h1>${slide.title}</h1>
      <p class="title-sub">${slide.subtitle}</p>
      <div class="word-chain">
        <span class="chain-item tone-verb">succeed</span>
        <span class="chain-arrow">→</span>
        <span class="chain-item tone-noun">success</span>
        <span class="chain-arrow">→</span>
        <span class="chain-item tone-adj">successful</span>
        <span class="chain-arrow">→</span>
        <span class="chain-item tone-adv">successfully</span>
      </div>
      <p class="title-meta">${slide.meta}</p>
      <p class="title-hint">${slide.hint}</p>
      ${slide.stamp ? `<div class="stamp">${slide.stamp}</div>` : ""}
    </div>
  `;
}

function renderBullets(slide) {
  return `
    <div class="goal-slide">
      <p class="eyebrow">${slide.section}</p>
      <h2>${slide.title}</h2>
      <div class="bullet-grid">
        ${slide.bullets
          .map(
            (b, i) => `
          <div class="bullet-card ${toneClass(b.tone)}">
            <span class="bullet-no">0${i + 1}</span>
            <p>${b.text}</p>
          </div>`
          )
          .join("")}
      </div>
      <p class="note">${slide.note}</p>
    </div>
  `;
}

function renderWarmup(slide) {
  return `
    <div class="warmup-slide">
      <p class="eyebrow">${slide.section}</p>
      <h2>${slide.title}</h2>
      <div class="warmup-list">
        ${slide.items
          .map(
            (item, i) => `
          <div class="warmup-item">
            <span class="warmup-no">0${i + 1}</span>
            <div>
              <p class="warmup-wrong">${item.wrong}</p>
              <div class="warmup-fix" data-reveal hidden>
                <p class="warmup-right">${item.right}</p>
                <p class="warmup-why">${item.why}</p>
              </div>
            </div>
          </div>`
          )
          .join("")}
      </div>
      <button class="reveal-btn" type="button">Hiện đáp án <kbd>Enter</kbd></button>
      <p class="note">${slide.note}</p>
    </div>
  `;
}

function renderInstructions(slide) {
  return `
    <div class="instructions-slide">
      <div class="instruction-head">
        <div>
          <p class="eyebrow">${slide.section}</p>
          <h2>${slide.title}</h2>
        </div>
        ${slide.badge ? `<div class="big-badge">${slide.badge}</div>` : ""}
      </div>
      <ol class="instruction-list">
        ${slide.steps
          .map(
            (step, i) => `
          <li>
            <span class="step-no">0${i + 1}</span>
            <p>${step}</p>
          </li>`
          )
          .join("")}
      </ol>
      ${
        slide.points
          ? `<div class="points">${slide.points
              .map((p) => `<span class="point-chip">${p}</span>`)
              .join("")}</div>`
          : ""
      }
      <p class="note">${slide.note}</p>
    </div>
  `;
}

function renderErrorTypes(slide) {
  return `
    <div class="error-types-slide">
      <p class="eyebrow">${slide.section}</p>
      <h2>${slide.title}</h2>
      <div class="error-grid">
        ${slide.items
          .map(
            (item) => `
          <div class="error-card ${toneClass(item.tone)}">
            <span class="error-code">${item.code}</span>
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
          </div>`
          )
          .join("")}
      </div>
      <p class="note">${slide.note}</p>
    </div>
  `;
}

function renderRoutine(slide) {
  return `
    <div class="routine-slide">
      <p class="eyebrow">${slide.section}</p>
      <h2>${slide.title}</h2>
      <div class="routine-grid">
        ${slide.steps
          .map(
            (step) => `
          <div class="routine-card ${toneClass(step.tone)}">
            <span class="routine-no">${step.no}</span>
            <h3>${step.name}<em>${step.en}</em></h3>
            <p>${step.desc}</p>
          </div>`
          )
          .join("")}
      </div>
      <p class="note">${slide.note}</p>
    </div>
  `;
}

function renderTable(slide) {
  return `
    <div class="table-slide">
      <p class="eyebrow">${slide.section}</p>
      <h2>${slide.title}</h2>
      <table class="frame-table">
        <thead>
          <tr>${slide.headers.map((h) => `<th>${h}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${slide.rows
            .map(
              (row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`
            )
            .join("")}
        </tbody>
      </table>
      <p class="note">${slide.note}</p>
    </div>
  `;
}

function renderSuffixes(slide) {
  return `
    <div class="suffix-slide">
      <p class="eyebrow">${slide.section}</p>
      <h2>${slide.title}</h2>
      <div class="suffix-grid">
        ${slide.groups
          .map(
            (group) => `
          <div class="suffix-col ${toneClass(group.tone)}">
            <h3>${group.name}</h3>
            <div class="suffix-chips">
              ${group.items
                .map((item) => {
                  const star = item.endsWith("*");
                  const text = star ? item.slice(0, -1) : item;
                  return `<span class="suffix-chip${star ? " is-star" : ""}">${text}</span>`;
                })
                .join("")}
            </div>
          </div>`
          )
          .join("")}
      </div>
      <p class="note">${slide.note}</p>
    </div>
  `;
}

function renderPrefixes(slide) {
  return `
    <div class="prefix-slide">
      <p class="eyebrow">${slide.section}</p>
      <h2>${slide.title}</h2>
      <div class="mnemonic">${slide.mnemonic}</div>
      <table class="prefix-table">
        <thead>
          <tr><th>Tiền tố</th><th>Nghĩa</th><th>Ví dụ</th></tr>
        </thead>
        <tbody>
          ${slide.rows
            .map(
              (row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`
            )
            .join("")}
        </tbody>
      </table>
      <p class="note">${slide.note}</p>
    </div>
  `;
}

function renderSteps(slide) {
  return `
    <div class="steps-slide-inner ${toneClass(slide.tone)}">
      <p class="eyebrow">${slide.section}</p>
      <h2>${slide.title}</h2>
      <p class="sentence ${slide.sentence.length > 130 ? "is-long" : ""}">${gapSentence(slide.sentence)}</p>
      <p class="base-word">(${slide.base})</p>
      <button class="reveal-btn" type="button">Hiện cách làm <kbd>Enter</kbd></button>
      <div class="steps-reveal" data-reveal hidden>
        <div class="steps-grid">
          ${slide.steps
            .map(
              (step, i) => `
            <div class="step-card">
              <span class="step-no">0${i + 1}</span>
              <h3>${step[0]}</h3>
              <p>${step[1]}</p>
            </div>`
            )
            .join("")}
        </div>
        <div class="answer">
          <p class="answer-word">${slide.answer}</p>
          <p class="answer-why">${slide.why}</p>
        </div>
      </div>
    </div>
  `;
}

function renderCompare(slide) {
  return `
    <div class="compare-slide">
      <p class="eyebrow">${slide.section}</p>
      <h2>${slide.title}</h2>
      <p class="rule">${slide.rule}</p>
      <div class="compare-list${slide.compact ? " is-compact" : ""}">
        ${slide.rows
          .map(
            (row) => `
          <div class="compare-row">
            <div class="compare-bad">
              <span class="badge badge-bad">Sai</span>
              <p>${row.bad}</p>
            </div>
            <div class="compare-good">
              <span class="badge badge-good">Đúng</span>
              <p>${row.good}</p>
            </div>
            <p class="compare-why">${row.why}</p>
          </div>`
          )
          .join("")}
      </div>
      <p class="note">${slide.note}</p>
    </div>
  `;
}

function renderSpelling(slide) {
  return `
    <div class="spelling-slide">
      <p class="eyebrow">${slide.section}</p>
      <h2>${slide.title}</h2>
      <div class="spelling-grid">
        ${slide.words
          .map(
            (w) => `
          <div class="spelling-card">
            <p class="spelling-word">${w.word}</p>
            <p class="spelling-hint">${w.hint}</p>
          </div>`
          )
          .join("")}
      </div>
      <div class="spelling-method">
        <span>Look</span><span>Cover</span><span>Write</span><span>Check</span>
      </div>
      <p class="note">${slide.note}</p>
    </div>
  `;
}

function renderDictionary(slide) {
  return `
    <div class="dictionary-slide">
      <p class="eyebrow">${slide.section}</p>
      <h2>${slide.title}</h2>
      <div class="dictionary-grid">
        <div class="dictionary-entry">${slide.entry}</div>
        <div class="dictionary-tasks">
          ${slide.tasks
            .map(
              (task, i) => `
            <div class="dict-task">
              <p class="dict-sentence"><strong>${i + 1}.</strong> ${gapSentence(task.sentence)}</p>
              <div class="dict-answer" data-reveal hidden>
                <strong>${task.answer}</strong>
                <span>${task.why}</span>
              </div>
            </div>`
            )
            .join("")}
          <button class="reveal-btn" type="button">Hiện đáp án <kbd>Enter</kbd></button>
        </div>
      </div>
      <p class="note">${slide.note}</p>
    </div>
  `;
}

function renderErrorLog(slide) {
  return `
    <div class="error-log-slide">
      <p class="eyebrow">${slide.section}</p>
      <h2>${slide.title}</h2>
      <div class="code-row">
        ${slide.codes
          .map(
            (c) => `<span class="code-chip"><strong>${c.code}</strong> ${c.name}</span>`
          )
          .join("")}
      </div>
      <table class="error-table">
        <thead>
          <tr><th>Câu</th><th>Em viết</th><th>Đúng</th><th>Mã</th><th>Vì sao</th></tr>
        </thead>
        <tbody>
          ${slide.rows
            .map(
              (row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`
            )
            .join("")}
        </tbody>
      </table>
      <p class="note">${slide.note}</p>
    </div>
  `;
}

function renderWrapup(slide) {
  return `
    <div class="wrapup-slide">
      <p class="eyebrow">${slide.section}</p>
      <h2>${slide.title}</h2>
      <div class="score-row">
        ${slide.scores
          .map(
            (s) => `
          <div class="score-card${s.target ? " score-target" : ""}">
            <span>${s.label}</span>
            <strong>${s.value}</strong>
          </div>`
          )
          .join("")}
      </div>
      <div class="homework">
        <h3>Bài tập về nhà — 3 ngày</h3>
        <ul>${slide.homework.map((h) => `<li>${h}</li>`).join("")}</ul>
      </div>
      <p class="note">${slide.note}</p>
    </div>
  `;
}

function renderClosing(slide) {
  return `
    <div class="closing-slide">
      <p class="eyebrow">${slide.section}</p>
      <h2>${slide.title}</h2>
      <p class="closing-big">${slide.big}</p>
      <p class="closing-note">${slide.note}</p>
    </div>
  `;
}

function renderBody(slide) {
  switch (slide.type) {
    case "title":
      return renderTitle(slide);
    case "bullets":
      return renderBullets(slide);
    case "warmup":
      return renderWarmup(slide);
    case "instructions":
      return renderInstructions(slide);
    case "practice":
      return renderPractice(slide);
    case "errorTypes":
      return renderErrorTypes(slide);
    case "routine":
      return renderRoutine(slide);
    case "table":
      return renderTable(slide);
    case "suffixes":
      return renderSuffixes(slide);
    case "prefixes":
      return renderPrefixes(slide);
    case "steps":
      return renderSteps(slide);
    case "compare":
      return renderCompare(slide);
    case "spelling":
      return renderSpelling(slide);
    case "dictionary":
      return renderDictionary(slide);
    case "errorLog":
      return renderErrorLog(slide);
    case "wrapup":
      return renderWrapup(slide);
    case "closing":
      return renderClosing(slide);
    default:
      return `<p class="note">Unknown slide type: ${slide.type}</p>`;
  }
}

function slideClass(slide) {
  const classes = ["slide", `slide-${slide.type}`];
  if (slide.slot) classes.push(toneClass(slide.slot));
  if (slide.tone) classes.push(toneClass(slide.tone));
  return classes.join(" ");
}

function buildDeck() {
  slides.forEach((slide, index) => {
    const el = document.createElement("section");
    el.className = slideClass(slide);
    el.dataset.index = String(index);
    el.dataset.section = slide.section || "";
    el.innerHTML = `<div class="slide-body">${renderBody(slide)}</div>`;
    stage.appendChild(el);
  });
}

/* =========================================================
   Navigation
   ========================================================= */

function go(index) {
  const next = Math.max(0, Math.min(slides.length - 1, index));
  if (next === current) return;

  const slidesEls = Array.from(stage.children);
  slidesEls[current]?.classList.remove("is-active");
  current = next;
  slidesEls[current].classList.add("is-active");
  updateHud();
}

function updateHud() {
  sectionLabel.textContent = slides[current].section || "";
  slideCounter.textContent = `${current + 1} / ${slides.length}`;
  progressBar.style.width = `${((current + 1) / slides.length) * 100}%`;

  menuList.querySelectorAll(".menu-row").forEach((row) => {
    row.classList.toggle("is-current", row.dataset.section === slides[current].section);
  });
}

function activeSlide() {
  return stage.children[current];
}

function revealCurrent() {
  const slide = activeSlide();
  if (!slide || slide.classList.contains("is-revealed")) return false;

  const revealables = slide.querySelectorAll("[data-reveal]");
  if (!revealables.length) return false;

  slide.classList.add("is-revealed");
  revealables.forEach((el) => {
    el.hidden = false;
  });
  slide.querySelectorAll(".reveal-btn").forEach((btn) => {
    btn.hidden = true;
  });
  return true;
}

function onEnter() {
  if (!revealCurrent()) go(current + 1);
}

/* =========================================================
   Menu
   ========================================================= */

function buildMenu() {
  const sections = [];
  slides.forEach((slide, index) => {
    let section = sections.find((item) => item.name === slide.section);
    if (!section) {
      section = { name: slide.section, start: index, end: index };
      sections.push(section);
    } else {
      section.end = index;
    }
  });

  menuList.innerHTML = sections
    .map(
      (section, index) => `
      <button class="menu-row" type="button" data-index="${section.start}" data-section="${section.name}">
        <span class="menu-no">${String(index + 1).padStart(2, "0")}</span>
        <span class="menu-name">${section.name}</span>
        <span class="menu-range">${section.start + 1}–${section.end + 1}</span>
        <span class="menu-desc">${sectionMeta[section.name] || ""}</span>
      </button>`
    )
    .join("");

  menuList.querySelectorAll(".menu-row").forEach((row) => {
    row.addEventListener("click", () => {
      go(Number(row.dataset.index));
      closeMenu();
    });
  });
}

function openMenu() {
  menu.hidden = false;
  menuOpen = true;
  updateHud();
  menuClose.focus();
}

function closeMenu() {
  menu.hidden = true;
  menuOpen = false;
}

/* =========================================================
   Timer
   ========================================================= */

let timerSeconds = 0;
let timerTotal = 0;
let timerInterval = null;
let timerRunning = false;

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function updateTimerUI() {
  const text = formatTime(timerSeconds);
  timerDisplay.textContent = text;
  timerBtn.textContent = `⏱ ${text}`;
  timerBtn.classList.toggle("is-running", timerRunning && timerSeconds > 0);
  timerBtn.classList.toggle(
    "is-done",
    timerSeconds === 0 && timerTotal > 0 && !timerRunning
  );
  timerStart.textContent = timerRunning ? "Tạm dừng" : "Bắt đầu";
}

function stopTimer() {
  timerRunning = false;
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  updateTimerUI();
}

function startTimer() {
  if (timerRunning) {
    stopTimer();
    return;
  }
  if (timerSeconds <= 0) return;

  timerRunning = true;
  timerInterval = setInterval(() => {
    timerSeconds -= 1;
    if (timerSeconds <= 0) {
      timerSeconds = 0;
      stopTimer();
    }
    updateTimerUI();
  }, 1000);
  updateTimerUI();
}

function setTimer(minutes) {
  stopTimer();
  timerTotal = minutes * 60;
  timerSeconds = timerTotal;
  updateTimerUI();
}

function resetTimer() {
  stopTimer();
  timerSeconds = 0;
  timerTotal = 0;
  updateTimerUI();
}

/* =========================================================
   Fullscreen + scaling
   ========================================================= */

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.().catch(() => {});
  } else {
    document.exitFullscreen?.();
  }
}

function fitStage() {
  const scale = Math.min(stageWrap.clientWidth / 1600, stageWrap.clientHeight / 900);
  document.documentElement.style.setProperty("--scale", String(scale));
}

/* =========================================================
   Events
   ========================================================= */

document.addEventListener("keydown", (event) => {
  if (menuOpen) {
    if (event.key === "Escape" || event.key === "m" || event.key === "M") {
      event.preventDefault();
      closeMenu();
    }
    return;
  }

  switch (event.key) {
    case "ArrowRight":
    case "PageDown":
    case " ":
      event.preventDefault();
      go(current + 1);
      break;
    case "ArrowLeft":
    case "PageUp":
      event.preventDefault();
      go(current - 1);
      break;
    case "Home":
      event.preventDefault();
      go(0);
      break;
    case "End":
      event.preventDefault();
      go(slides.length - 1);
      break;
    case "Enter":
      event.preventDefault();
      onEnter();
      break;
    case "m":
    case "M":
      event.preventDefault();
      openMenu();
      break;
    case "f":
    case "F":
      event.preventDefault();
      toggleFullscreen();
      break;
    case "Escape":
      closeMenu();
      break;
    default:
      break;
  }
});

stage.addEventListener("click", (event) => {
  const button = event.target.closest(".reveal-btn");
  if (button) revealCurrent();
});

prevBtn.addEventListener("click", () => go(current - 1));
nextBtn.addEventListener("click", () => go(current + 1));
menuBtn.addEventListener("click", openMenu);
menuClose.addEventListener("click", closeMenu);
menuFs.addEventListener("click", toggleFullscreen);
fsBtn.addEventListener("click", toggleFullscreen);

menu.addEventListener("click", (event) => {
  if (event.target === menu) closeMenu();
});

timerBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  timerPop.hidden = !timerPop.hidden;
});

timerPop.addEventListener("click", (event) => {
  event.stopPropagation();
});

document.addEventListener("click", () => {
  if (!timerPop.hidden) timerPop.hidden = true;
});

timerStart.addEventListener("click", startTimer);
timerReset.addEventListener("click", resetTimer);

timerPop.querySelectorAll("[data-min]").forEach((button) => {
  button.addEventListener("click", () => {
    setTimer(Number(button.dataset.min));
  });
});

/* Touch swipe */
let touchStartX = null;
stage.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.touches[0]?.clientX ?? null;
  },
  { passive: true }
);
stage.addEventListener(
  "touchend",
  (event) => {
    if (touchStartX === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX;
    const delta = endX - touchStartX;
    if (Math.abs(delta) > 45) {
      if (delta < 0) go(current + 1);
      else go(current - 1);
    }
    touchStartX = null;
  },
  { passive: true }
);

window.addEventListener("resize", fitStage);
document.addEventListener("fullscreenchange", fitStage);

/* =========================================================
   Init
   ========================================================= */

buildDeck();
buildMenu();
stage.children[0].classList.add("is-active");
updateHud();
updateTimerUI();
fitStage();

if (document.fonts?.ready) {
  document.fonts.ready.then(fitStage);
}

setTimeout(() => hint.classList.add("is-hidden"), 8000);
