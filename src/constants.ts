
export const ADMIN_TG_ID = "123456789"; // Replace with actual Admin ID

export const SUBJECTS = [
  { id: 'math', name: 'Математика', emoji: '🧮' },
  { id: 'algebra', name: 'Алгебра', emoji: '📐' },
  { id: 'geometry', name: 'Геометрия', emoji: '📏' },
  { id: 'russian', name: 'Русский язык', emoji: '🇷🇺' },
  { id: 'literature', name: 'Литература', emoji: '📚' },
  { id: 'biology', name: 'Биология', emoji: '🧬' },
  { id: 'zoology', name: 'Зоология', emoji: '🦁' },
  { id: 'anatomy', name: 'Анатомия', emoji: '🫀' },
  { id: 'chemistry', name: 'Химия', emoji: '🧪' },
  { id: 'physics', name: 'Физика', emoji: '⚛️' },
  { id: 'english', name: 'Английский', emoji: '🇬🇧' },
  { id: 'french', name: 'Французский', emoji: '🇫🇷' },
];

export const EXAMS = [
  { id: 'oge', name: 'ОГЭ (9 класс)', emoji: '📝' },
  { id: 'ege', name: 'ЕГЭ (11 класс)', emoji: '🎓' },
  { id: 'vpr', name: 'ВПР (4-10 класс)', emoji: '📋' },
];

// ── ВПР: предметы по классам ──────────────────────────────────────────
export const VPR_SUBJECTS: Record<number, { id: string; name: string; emoji: string }[]> = {
  4: [
    { id: 'vpr_rus_4', name: 'Русский язык', emoji: '🇷🇺' },
    { id: 'vpr_math_4', name: 'Математика', emoji: '🧮' },
    { id: 'vpr_okr_4', name: 'Окружающий мир', emoji: '🌍' },
    { id: 'vpr_read_4', name: 'Литературное чтение', emoji: '📖' },
    { id: 'vpr_eng_4', name: 'Английский язык', emoji: '🇬🇧' },
  ],
  5: [
    { id: 'vpr_rus_5', name: 'Русский язык', emoji: '🇷🇺' },
    { id: 'vpr_math_5', name: 'Математика', emoji: '🧮' },
    { id: 'vpr_hist_5', name: 'История', emoji: '📜' },
    { id: 'vpr_bio_5', name: 'Биология', emoji: '🧬' },
    { id: 'vpr_lit_5', name: 'Литература', emoji: '📚' },
  ],
  6: [
    { id: 'vpr_rus_6', name: 'Русский язык', emoji: '🇷🇺' },
    { id: 'vpr_math_6', name: 'Математика', emoji: '🧮' },
    { id: 'vpr_hist_6', name: 'История', emoji: '📜' },
    { id: 'vpr_soc_6', name: 'Обществознание', emoji: '⚖️' },
    { id: 'vpr_bio_6', name: 'Биология', emoji: '🧬' },
    { id: 'vpr_geo_6', name: 'География', emoji: '🌍' },
    { id: 'vpr_lit_6', name: 'Литература', emoji: '📚' },
  ],
  7: [
    { id: 'vpr_rus_7', name: 'Русский язык', emoji: '🇷🇺' },
    { id: 'vpr_math_7', name: 'Математика', emoji: '🧮' },
    { id: 'vpr_phys_7', name: 'Физика', emoji: '⚛️' },
    { id: 'vpr_bio_7', name: 'Биология', emoji: '🧬' },
    { id: 'vpr_geo_7', name: 'География', emoji: '🌍' },
    { id: 'vpr_hist_7', name: 'История', emoji: '📜' },
    { id: 'vpr_soc_7', name: 'Обществознание', emoji: '⚖️' },
    { id: 'vpr_inf_7', name: 'Информатика', emoji: '💻' },
    { id: 'vpr_eng_7', name: 'Английский язык', emoji: '🇬🇧' },
    { id: 'vpr_lit_7', name: 'Литература', emoji: '📚' },
  ],
  8: [
    { id: 'vpr_rus_8', name: 'Русский язык', emoji: '🇷🇺' },
    { id: 'vpr_math_8', name: 'Математика', emoji: '🧮' },
    { id: 'vpr_phys_8', name: 'Физика', emoji: '⚛️' },
    { id: 'vpr_chem_8', name: 'Химия', emoji: '🧪' },
    { id: 'vpr_bio_8', name: 'Биология', emoji: '🧬' },
    { id: 'vpr_geo_8', name: 'География', emoji: '🌍' },
    { id: 'vpr_hist_8', name: 'История', emoji: '📜' },
    { id: 'vpr_soc_8', name: 'Обществознание', emoji: '⚖️' },
    { id: 'vpr_inf_8', name: 'Информатика', emoji: '💻' },
    { id: 'vpr_lit_8', name: 'Литература', emoji: '📚' },
  ],
  10: [
    { id: 'vpr_rus_10', name: 'Русский язык', emoji: '🇷🇺' },
    { id: 'vpr_math_10', name: 'Математика', emoji: '🧮' },
    { id: 'vpr_chem_10', name: 'Химия', emoji: '🧪' },
    { id: 'vpr_hist_10', name: 'История', emoji: '📜' },
    { id: 'vpr_soc_10', name: 'Обществознание', emoji: '⚖️' },
  ],
  11: [
    { id: 'vpr_geo_11', name: 'География', emoji: '🌍' },
    { id: 'vpr_phys_11', name: 'Физика', emoji: '⚛️' },
    { id: 'vpr_chem_11', name: 'Химия', emoji: '🧪' },
    { id: 'vpr_hist_11', name: 'История', emoji: '📜' },
    { id: 'vpr_eng_11', name: 'Английский язык', emoji: '🇬🇧' },
  ],
};

// ── ОГЭ: предметы (9 класс) ──────────────────────────────────────────
export const OGE_SUBJECTS = [
  { id: 'oge_rus', name: 'Русский язык', emoji: '🇷🇺' },
  { id: 'oge_math', name: 'Математика', emoji: '🧮' },
  { id: 'oge_phys', name: 'Физика', emoji: '⚛️' },
  { id: 'oge_chem', name: 'Химия', emoji: '🧪' },
  { id: 'oge_bio', name: 'Биология', emoji: '🧬' },
  { id: 'oge_hist', name: 'История', emoji: '📜' },
  { id: 'oge_soc', name: 'Обществознание', emoji: '⚖️' },
  { id: 'oge_inf', name: 'Информатика', emoji: '💻' },
  { id: 'oge_eng', name: 'Английский язык', emoji: '🇬🇧' },
  { id: 'oge_geo', name: 'География', emoji: '🌍' },
  { id: 'oge_lit', name: 'Литература', emoji: '📚' },
];

// ── ЕГЭ: предметы (11 класс) ─────────────────────────────────────────
export const EGE_SUBJECTS = [
  { id: 'ege_rus', name: 'Русский язык', emoji: '🇷🇺' },
  { id: 'ege_math_base', name: 'Математика (база)', emoji: '🧮' },
  { id: 'ege_math_prof', name: 'Математика (профиль)', emoji: '📐' },
  { id: 'ege_phys', name: 'Физика', emoji: '⚛️' },
  { id: 'ege_chem', name: 'Химия', emoji: '🧪' },
  { id: 'ege_bio', name: 'Биология', emoji: '🧬' },
  { id: 'ege_hist', name: 'История', emoji: '📜' },
  { id: 'ege_soc', name: 'Обществознание', emoji: '⚖️' },
  { id: 'ege_inf', name: 'Информатика', emoji: '💻' },
  { id: 'ege_eng', name: 'Английский язык', emoji: '🇬🇧' },
  { id: 'ege_geo', name: 'География', emoji: '🌍' },
  { id: 'ege_lit', name: 'Литература', emoji: '📚' },
];

export const PRESCHOOL_SECTIONS = [
  { id: 'ps_math', name: 'Математика (счёт и цифры)', emoji: '🔢' },
  { id: 'ps_russian', name: 'Русский язык (буквы и звуки)', emoji: '🅰️' },
  { id: 'ps_literature', name: 'Литература (сказки и стихи)', emoji: '📖' },
  { id: 'ps_reading', name: 'Учимся читать', emoji: '📕' },
  { id: 'ps_writing', name: 'Учимся писать', emoji: '✏️' },
];

export const LEARNING_MODES = [
  { id: 'explain', name: 'Объясни тему', desc: 'Простое объяснение сложных вещей' },
  { id: 'solve_with_me', name: 'Реши со мной', desc: 'Пошаговый разбор задачи' },
  { id: 'training', name: 'Тренировка', desc: '5-10 заданий для практики' },
  { id: 'check_solution', name: 'Проверка решения', desc: 'Найдем ошибки вместе' },
  { id: 'exam_prep', name: 'Подготовка к к/р', desc: 'План и практика' },
];

export const GOALS = [
  'Подтянуть оценки',
  'Подготовиться к экзаменам',
  'Изучить новую тему',
  'Помощь с ДЗ',
  'Общее развитие',
  'Другое'
];
