export interface MethodItem {
  id: string;
  name: {
    uz: string;
    ru: string;
    en: string;
  };
  icon: string;
  category: 'game' | 'social' | 'cognitive' | 'assessment';
  description: {
    uz: string;
    ru: string;
    en: string;
  };
}

export const TEACHING_METHODS: MethodItem[] = [
  {
    id: 'gamification',
    name: {
      uz: 'Geymifikatsiya (Gamification)',
      ru: 'Геймификация',
      en: 'Gamification',
    },
    icon: '🎯',
    category: 'game',
    description: {
      uz: 'Darsni ballar, darajalar va yutuqlar orqali rag‘batlantiruvchi o‘yinga aylantirish',
      ru: 'Превращение урока в игру с баллами, уровнями и достижениями',
      en: 'Turning the lesson into a game with points, levels, and badges',
    },
  },
  {
    id: 'educational_games',
    name: {
      uz: 'Ta’limiy o‘yinlar',
      ru: 'Обучающие игры',
      en: 'Educational Games',
    },
    icon: '🎮',
    category: 'game',
    description: {
      uz: 'Mavzuni mustahkamlovchi o‘quv o‘yinlari va musobaqalar',
      ru: 'Образовательные игры и соревнования для закрепления',
      en: 'Educational games and challenges reinforcing the topic',
    },
  },
  {
    id: 'puzzle',
    name: {
      uz: 'Boshqotirma & Pazl',
      ru: 'Головоломки и пазлы',
      en: 'Puzzle & Riddle',
    },
    icon: '🧩',
    category: 'cognitive',
    description: {
      uz: 'Mantiqiy zanjirlar, krossvord va vizual pazllar yordamida izlanish',
      ru: 'Поиск решений через логические цепи и головоломки',
      en: 'Logical chains, crosswords, and conceptual puzzle solving',
    },
  },
  {
    id: 'brainstorm',
    name: {
      uz: 'Aqliy hujum (Brainstorm)',
      ru: 'Мозговой штурм',
      en: 'Brainstorming',
    },
    icon: '🧠',
    category: 'cognitive',
    description: {
      uz: 'Yangi g‘oyalarni erkin va tezkorlik bilan o‘rtaga tashlash',
      ru: 'Свободный и быстрый сбор креативных идей',
      en: 'Rapid generation and pooling of creative ideas',
    },
  },
  {
    id: 'quiz',
    name: {
      uz: 'Tezkor viktorina (Quiz)',
      ru: 'Викторина / Квиз',
      en: 'Interactive Quiz',
    },
    icon: '❓',
    category: 'assessment',
    description: {
      uz: 'Kahoot/Quizizz uslubidagi interaktiv savol-javob',
      ru: 'Интерактивные вопросы в стиле викторины',
      en: 'Gamified quiz format to check comprehension',
    },
  },
  {
    id: 'competition',
    name: {
      uz: 'Guruhlararo musobaqa',
      ru: 'Командное соревнование',
      en: 'Team Competition',
    },
    icon: '🏆',
    category: 'social',
    description: {
      uz: 'Sinfni guruhlarga bo‘lib raqobat va hamkorlik muhitini yaratish',
      ru: 'Разделение класса на команды для здоровой конкуренции',
      en: 'Dividing class into teams for healthy rivalry and synergy',
    },
  },
  {
    id: 'group_work',
    name: {
      uz: 'Guruhlarda ishlash',
      ru: 'Групповая работа',
      en: 'Group Work',
    },
    icon: '👥',
    category: 'social',
    description: {
      uz: 'Kichik guruhlarda vazifalarni taqsimlab hal qilish',
      ru: 'Решение комплексных задач в малых группах',
      en: 'Collaborative problem solving in small teams',
    },
  },
  {
    id: 'pair_work',
    name: {
      uz: 'Juftlikda ishlash',
      ru: 'Работа в парах',
      en: 'Pair Work',
    },
    icon: '🤝',
    category: 'social',
    description: {
      uz: 'O‘zaro o‘rganish va tengdoshlar tomonidan tekshirish',
      ru: 'Взаимное обучение и взаимопроверка',
      en: 'Peer-to-peer learning and reciprocal evaluation',
    },
  },
  {
    id: 'role_play',
    name: {
      uz: 'Rollarga bo‘linish (Role Play)',
      ru: 'Ролевая игра',
      en: 'Role Play',
    },
    icon: '🎭',
    category: 'social',
    description: {
      uz: 'Vaziyatlarni jonlantirish va turli pozitsiyalardan qarash',
      ru: 'Разыгрывание ситуаций от лица экспертов или персонажей',
      en: 'Simulating scenarios and seeing from multiple viewpoints',
    },
  },
  {
    id: 'discussion',
    name: {
      uz: 'Munozara va bahs (Debate)',
      ru: 'Дискуссия и дебаты',
      en: 'Discussion & Debate',
    },
    icon: '💬',
    category: 'social',
    description: {
      uz: 'O‘z fikrini dalillar bilan asoslash va tanqidiy fikrlash',
      ru: 'Аргументированное отстаивание своей позиции',
      en: 'Evidence-based argumentation and critical reasoning',
    },
  },
  {
    id: 'problem_solving',
    name: {
      uz: 'Muammoli ta’lim (PBL)',
      ru: 'Проблемное обучение',
      en: 'Problem-Based Learning',
    },
    icon: '🔍',
    category: 'cognitive',
    description: {
      uz: 'Hayotiy real muammolarni ilmiy yondashuv bilan yechish',
      ru: 'Решение реальных жизненных и практических задач',
      en: 'Solving realistic, ill-structured authentic problems',
    },
  },
  {
    id: 'experiment',
    name: {
      uz: 'Tajriba & Laboratoriya',
      ru: 'Эксперимент и опыты',
      en: 'Hands-on Experiment',
    },
    icon: '🧪',
    category: 'cognitive',
    description: {
      uz: 'Amaliy sinov, gipoteza tekshirish va amaliy ko‘nikma',
      ru: 'Практические опыты и проверка гипотез',
      en: 'Empirical testing, hypothesis validation, and observation',
    },
  },
  {
    id: 'data_analysis',
    name: {
      uz: 'Ma’lumotlar tahlili',
      ru: 'Анализ данных',
      en: 'Data Analysis',
    },
    icon: '📊',
    category: 'cognitive',
    description: {
      uz: 'Jadvallar, grafiklar va statistikani o‘rganish',
      ru: 'Работа с таблицами, графиками и диаграммами',
      en: 'Interpreting charts, tables, numbers, and trends',
    },
  },
  {
    id: 'flashcards',
    name: {
      uz: 'Flesh-kartalar (Flashcards)',
      ru: 'Флеш-карточки',
      en: 'Flashcards System',
    },
    icon: '🃏',
    category: 'cognitive',
    description: {
      uz: 'Atamalar, formulalar va sanalarni tezkor eslab qolish',
      ru: 'Быстрое запоминание терминов, формул и дат',
      en: 'Fast retrieval practice for key terms, formulas, and facts',
    },
  },
  {
    id: 'random_question',
    name: {
      uz: 'Tasodifiy savollar charxi',
      ru: 'Колесо случайных вопросов',
      en: 'Random Question Wheel',
    },
    icon: '🎡',
    category: 'game',
    description: {
      uz: 'Tasodifiy o‘quvchini yoki qiyinlik darajasini tanlash',
      ru: 'Случайный выбор ученика или уровня сложности',
      en: 'Randomizer mechanism for unexpected engagement',
    },
  },
  {
    id: 'speed_challenge',
    name: {
      uz: 'Vaqt poygasi (Speed Challenge)',
      ru: 'Гонка со временем',
      en: 'Speed Challenge',
    },
    icon: '⏱️',
    category: 'game',
    description: {
      uz: 'Qisqa vaqt ichida eng ko‘p to‘g‘ri javob berish musobaqasi',
      ru: 'Максимум правильных ответов за ограниченное время',
      en: 'Beat the clock: maximum accuracy in timed sprints',
    },
  },
  {
    id: 'think_pair_share',
    name: {
      uz: 'O‘yla - Juftlashing - Bo‘lishing',
      ru: 'Подумай - Обсуди в паре - Поделись',
      en: 'Think-Pair-Share',
    },
    icon: '💡',
    category: 'social',
    description: {
      uz: 'Avval individual mulohaza, so‘ng sherik bilan, so‘ng umumiy sinf bilan',
      ru: 'Индивидуально, затем в паре, затем на весь класс',
      en: 'Individual reflection, dyadic discussion, whole-class synthesis',
    },
  },
  {
    id: 'repetition',
    name: {
      uz: 'Intervalli takrorlash',
      ru: 'Интервальное повторение',
      en: 'Spaced Repetition',
    },
    icon: '🔄',
    category: 'cognitive',
    description: {
      uz: 'Xotirani mustahkamlovchi tizimli qaytarish zanjiri',
      ru: 'Системное повторение ключевых опорных точек',
      en: 'Strategic retrieval schedules to counter the forgetting curve',
    },
  },
  {
    id: 'exit_ticket',
    name: {
      uz: 'Chiqish chiptasi (Exit Ticket)',
      ru: 'Выходной билет (Exit Ticket)',
      en: 'Exit Ticket',
    },
    icon: '🎯',
    category: 'assessment',
    description: {
      uz: 'Dars oxirida o‘zlashtirishni tekshirish uchun 2 daqiqalik mini-vazifa',
      ru: '2-минутный мини-опрос перед окончанием урока',
      en: '2-minute wrap-up reflection to gauge mastery before dismissal',
    },
  },
  {
    id: 'concept_map',
    name: {
      uz: 'Kontseptual xarita (Mind Map)',
      ru: 'Интеллект-карта',
      en: 'Concept Mind Map',
    },
    icon: '🗺️',
    category: 'cognitive',
    description: {
      uz: 'Tushunchalar o‘rtasidagi bog‘liqlikni vizual chizma shaklida ifodalash',
      ru: 'Визуализация связей между ключевыми понятиями',
      en: 'Visual clustering and structural relationships mapping',
    },
  },
  {
    id: 'case_study',
    name: {
      uz: 'Keys-stadi (Vaziyat tahlili)',
      ru: 'Кейс-метод',
      en: 'Case Study',
    },
    icon: '📚',
    category: 'cognitive',
    description: {
      uz: 'Aniq voqeilik yoki keysni tahlil qilib xulosalar chiqarish',
      ru: 'Анализ конкретной реальной ситуации с выводами',
      en: 'Deep-dive inquiry into a rich real-world scenario',
    },
  },
  {
    id: 'memory_game',
    name: {
      uz: 'Xotira mashqi (Memory Game)',
      ru: 'Игра на память',
      en: 'Memory Game',
    },
    icon: '🧠',
    category: 'game',
    description: {
      uz: 'Juft rasmlar, formulalar yoki atamalarni eslab qolish o‘yini',
      ru: 'Поиск парных понятий и тренировка визуальной памяти',
      en: 'Matching pairs and rapid recall training',
    },
  },
];
