/* =========================================================
   EngPrep — Phát âm & trọng âm
   Interactions: quiz
   ========================================================= */

import { initQuiz } from './lib/quiz.js';

const questions = [
  {
    tag: '-ed',
    q: 'Which word ends with /ɪd/?',
    options: ['played', 'watched', 'wanted', 'cleaned'],
    answer: 2,
    explain: '“Wanted” kết thúc bằng /t/ nên -ed đọc /ɪd/. played /d/, watched /t/, cleaned /d/.'
  },
  {
    tag: '-ed',
    q: 'Which word ends with /t/?',
    options: ['called', 'stopped', 'opened', 'listened'],
    answer: 1,
    explain: '“Stopped” kết thúc bằng /p/ (vô thanh) nên -ed đọc /t/. called, opened, listened đọc /d/.'
  },
  {
    tag: '-ed',
    q: 'Which word ends with /d/?',
    options: ['needed', 'washed', 'played', 'visited'],
    answer: 2,
    explain: '“Played” kết thúc bằng nguyên âm nên -ed đọc /d/. needed và visited đọc /ɪd/; washed đọc /t/.'
  },
  {
    tag: '-ed',
    q: 'Which word has a different -ed ending from the others?',
    options: ['laughed', 'watched', 'missed', 'decided'],
    answer: 3,
    explain: '“Decided” kết thúc bằng /d/ nên đọc /ɪd/. laughed, watched, missed đều kết thúc bằng âm vô thanh nên đọc /t/.'
  },
  {
    tag: '-s / -es',
    q: 'Which word ends with /ɪz/?',
    options: ['books', 'watches', 'plays', 'cats'],
    answer: 1,
    explain: '“Watches” kết thúc bằng /tʃ/ nên -es đọc /ɪz/. books /s/, plays /z/, cats /s/.'
  },
  {
    tag: '-s / -es',
    q: 'Which word ends with /s/?',
    options: ['dogs', 'goes', 'stops', 'reads'],
    answer: 2,
    explain: '“Stops” kết thúc bằng /p/ (vô thanh) nên -s đọc /s/. dogs, goes, reads đọc /z/.'
  },
  {
    tag: '-s / -es',
    q: 'Which word ends with /z/?',
    options: ['cats', 'months', 'plays', 'laughs'],
    answer: 2,
    explain: '“Plays” kết thúc bằng nguyên âm nên -s đọc /z/. cats và months đọc /s/; laughs đọc /s/.'
  },
  {
    tag: '-s / -es',
    q: 'Which word has a different -s ending from the others?',
    options: ['misses', 'washes', 'changes', 'makes'],
    answer: 3,
    explain: '“Makes” kết thúc bằng /k/ nên -s đọc /s/. misses, washes, changes đều đọc /ɪz/.'
  },
  {
    tag: 'Nguyên âm',
    q: 'Which word has the /iː/ sound?',
    options: ['sit', 'seat', 'ship', 'live'],
    answer: 1,
    explain: '“Seat” đọc /siːt/ với /iː/ dài. sit /sɪt/, ship /ʃɪp/, live /lɪv/ đều có /ɪ/ ngắn.'
  },
  {
    tag: 'Nguyên âm',
    q: 'Which word has the /æ/ sound?',
    options: ['cart', 'cat', 'mate', 'pen'],
    answer: 1,
    explain: '“Cat” đọc /kæt/. cart /kɑːt/, mate /meɪt/, pen /pen/.'
  },
  {
    tag: 'Nguyên âm',
    q: 'Which word has the /eɪ/ sound?',
    options: ['pen', 'pain', 'pet', 'met'],
    answer: 1,
    explain: '“Pain” đọc /peɪn/ với âm đôi /eɪ/. pen, pet, met đều có /e/ ngắn.'
  },
  {
    tag: 'Nguyên âm',
    q: 'Which word has the /ɪ/ sound?',
    options: ['seat', 'sheep', 'sit', 'leave'],
    answer: 2,
    explain: '“Sit” đọc /sɪt/. seat /siːt/, sheep /ʃiːp/, leave /liːv/ đều có /iː/ dài.'
  },
  {
    tag: 'Trọng âm',
    q: 'Which word is stressed on the second syllable?',
    options: ['TAble', 'aGO', 'DOCtor', 'HAPpy'],
    answer: 1,
    explain: '“aGO” /əˈɡəʊ/ nhấn âm 2. table, doctor, happy là danh từ/tính từ nên thường nhấn âm 1.'
  },
  {
    tag: 'Trọng âm',
    q: 'Which word is stressed on the first syllable?',
    options: ['beGIN', 'deCIDE', 'TEAcher', 'enJOY'],
    answer: 2,
    explain: '“TEAcher” /ˈtiːtʃə/ nhấn âm 1. begin, decide, enjoy là động từ nên thường nhấn âm 2.'
  },
  {
    tag: 'Trọng âm',
    q: 'In the word “decision”, which syllable is stressed?',
    options: ['The first syllable', 'The second syllable', 'The third syllable', 'The last syllable'],
    answer: 1,
    explain: '“Decision” đọc /dɪˈsɪʒ.ən/, nhấn âm 2: deCI-sion. -sion / -tion hút trọng âm vào âm tiết ngay trước nó.'
  },
  {
    tag: 'Trọng âm',
    q: 'Which word has a different stress pattern from the others?',
    options: ['BEAUtiful', 'ACCident', 'imPORtant', 'INteresting'],
    answer: 2,
    explain: '“imPORtant” /ɪmˈpɔːtənt/ nhấn âm 2; beautiful, accident, interesting đều nhấn âm 1.'
  }
];

initQuiz({
  questions,
  storageKey: 'engprep-pronunciation-best',
  resultCopy: (score, total) => {
    if (score === total) {
      return {
        title: 'Hoàn hảo, không sai câu nào!',
        message: 'Bạn đã nắm chắc quy tắc -ed, -s/-es, nguyên âm và trọng âm. Tự tin lấy trọn điểm câu 1–4 nhé.'
      };
    }

    if (score >= total - 2) {
      return {
        title: 'Rất tốt!',
        message: 'Chỉ còn vài chỗ cần xem lại. Đọc kỹ các câu sai và thử lại để đạt điểm tối đa.'
      };
    }

    if (score >= Math.ceil(total * 0.7)) {
      return {
        title: 'Khá ổn, cần chú ý vài chỗ.',
        message: 'Xem lại bảng -ed, -s/-es và các cặp nguyên âm. Khi làm bài, hãy đọc to trong đầu để nghe âm cuối.'
      };
    }

    return {
      title: 'Cần ôn thêm một vòng.',
      message: 'Đọc lại bốn nhóm âm, sau đó học bảng -ed, -s/-es và quy tắc trọng âm rồi làm lại bài kiểm tra.'
    };
  },
  reviewLinks: [{ href: '#map', label: 'Ôn lại bản đồ âm' }]
});
