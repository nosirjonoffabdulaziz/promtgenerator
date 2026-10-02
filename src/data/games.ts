export interface GameItem {
  id: string;
  name: {
    uz: string;
    ru: string;
    en: string;
  };
  icon: string;
  badge: string;
  description: {
    uz: string;
    ru: string;
    en: string;
  };
  suitableFor: string;
}

export const CLASSROOM_GAMES: GameItem[] = [
  {
    id: 'quiz_battle',
    name: {
      uz: 'Viktorina Jangi (Quiz Battle)',
      ru: 'Битва викторин (Quiz Battle)',
      en: 'Quiz Battle',
    },
    icon: '⚔️',
    badge: 'Popular',
    description: {
      uz: '2 yoki undan ortiq guruh savollarga navbatma-navbat javob berib, ball to‘playdi',
      ru: 'Команды по очереди отвечают на вопросы и зарабатывают очки',
      en: 'Teams face off round-by-round answering high-stakes subject questions',
    },
    suitableFor: 'Barcha fanlar, takrorlash va mustahkamlash',
  },
  {
    id: 'jeopardy',
    name: {
      uz: 'Svoya Igra / Jeopardy uslubi',
      ru: 'Своя Игра (Jeopardy)',
      en: 'Jeopardy-Style Board',
    },
    icon: '🎯',
    badge: 'Strategic',
    description: {
      uz: 'Kategoriyalar va 100 dan 500 gacha balli savollar matritsasi',
      ru: 'Сетка категорий и вопросов разной стоимости от 100 до 500 очков',
      en: 'Grid of categories and tiered-point questions for tactical selection',
    },
    suitableFor: 'Mavzu yakuni va umumlashtirish',
  },
  {
    id: 'millionaire',
    name: {
      uz: 'Millioner shousi (Who Wants to Be a Millionaire)',
      ru: 'Кто хочет стать миллионером',
      en: 'Millionaire Challenge',
    },
    icon: '💰',
    badge: 'High Engagement',
    description: {
      uz: '15 ta qiyinlashib boruvchi savol, 50/50, sinfdan so‘rash va qo‘ng‘iroq imkoniyatlari',
      ru: '15 вопросов по возрастанию сложности с 3 подсказками (50/50, помощь зала)',
      en: 'Progressively harder ladder with lifeline hints (50:50, audience poll)',
    },
    suitableFor: 'Individual va guruh nazorati',
  },
  {
    id: 'escape_room',
    name: {
      uz: 'Sinfdan chiqish (Educational Escape Room)',
      ru: 'Образовательный Эскейп-рум',
      en: 'Educational Escape Room',
    },
    icon: '🔐',
    badge: 'Immersive',
    description: {
      uz: 'Har bir to‘g‘ri yechilgan topshiriq keyingi kod yoki eshikni ochadi',
      ru: 'Каждая решенная задача дает подсказку или код для открытия следующей двери',
      en: 'Solving rigorous academic clues unlocks codes to decipher the final riddle',
    },
    suitableFor: 'Matematika, Kimyo, Fizika, Informatika',
  },
  {
    id: 'treasure_hunt',
    name: {
      uz: 'Xazina izlash (Treasure Hunt / Quest)',
      ru: 'Охота за сокровищами (Квест)',
      en: 'Treasure Hunt Quest',
    },
    icon: '🗺️',
    badge: 'Active',
    description: {
      uz: 'Sinfdagi yoki ekrandagi topishmoqlar xaritasi bo‘ylab harakatlanish',
      ru: 'Пошаговое прохождение карты подсказок для нахождения главного ключа',
      en: 'Multi-clue academic trail where each correct answer provides the next coordinate',
    },
    suitableFor: 'Tarix, Geografiya, Biologiya',
  },
  {
    id: 'boss_battle',
    name: {
      uz: 'Boss jangi (Boss Battle)',
      ru: 'Битва с Боссом (Boss Battle)',
      en: 'Boss Battle',
    },
    icon: '👾',
    badge: 'Gamified',
    description: {
      uz: 'Butun sinf birlashib "Mega-muammo" yoki murakkab masalani mag‘lub etadi',
      ru: 'Класс объединяется против виртуального "Босса", отвечая без ошибок',
      en: 'Class combines health points and collaborative answers to defeat a tough challenge',
    },
    suitableFor: 'Murakkab mavzular va olimpiada darajasi',
  },
  {
    id: 'speed_round',
    name: {
      uz: 'Tezkor raund (Speed Round / Blitz)',
      ru: 'Блиц-раунд (Speed Round)',
      en: 'Speed Blitz Round',
    },
    icon: '⚡',
    badge: 'Fast-paced',
    description: {
      uz: '60 soniya ichida maksimal to‘g‘ri javob berish bo‘yicha poyga',
      ru: 'Гонка за 60 секунд на наибольшее количество правильных ответов',
      en: 'High-adrenaline 60-second burst of quick-fire verification queries',
    },
    suitableFor: 'Dars boshi (Warm-up) va refleksiyada',
  },
  {
    id: 'team_competition',
    name: {
      uz: 'Jamoaviy turnir (Team Competition)',
      ru: 'Командный турнир',
      en: 'Team Tournament',
    },
    icon: '🏆',
    badge: 'Teamwork',
    description: {
      uz: 'Sinf guruhlarga bo‘linib, ballar jadvali va yarim final/final bosqichida bellashadi',
      ru: 'Турнирная сетка с полуфиналами и финалами для команд класса',
      en: 'Structured tournament bracket with playoffs and cooperative roles',
    },
    suitableFor: 'Amaliy mashg‘ulotlar',
  },
  {
    id: 'educational_bingo',
    name: {
      uz: 'Ta’limiy Bingo (Educational Bingo)',
      ru: 'Образовательное Бинго',
      en: 'Educational Bingo',
    },
    icon: '🎰',
    badge: 'Fun',
    description: {
      uz: 'Har bir o‘quvchida 4x4 yoki 5x5 katakli terminlar kartasi, yechganlar o‘chiradi',
      ru: 'Карточки 4х4 или 5х5 с терминами, которые закрываются при ответе',
      en: 'Students mark grid terms or solutions as concepts are explained or discovered',
    },
    suitableFor: 'Chet tillari, biologiya, tarixiy sanalar',
  },
  {
    id: 'word_puzzle',
    name: {
      uz: 'So‘z va terminlar jumboqlari (Word Puzzle)',
      ru: 'Словесные головоломки',
      en: 'Term Word Puzzle',
    },
    icon: '🔤',
    badge: 'Vocabulary',
    description: {
      uz: 'Anagrammalar, rebuslar va yashiringan kalit so‘zni topish',
      ru: 'Анаграммы, ребусы и поиск зашифрованного ключевого понятия',
      en: 'Anagrams, deciphering cryptic clues, and key-term cryptograms',
    },
    suitableFor: 'Ona tili, Adabiyot, Chet tillari',
  },
  {
    id: 'matching_game',
    name: {
      uz: 'Moslashtirish o‘yini (Matching Pairs)',
      ru: 'Игра на соответствие',
      en: 'Matching Pairs',
    },
    icon: '🔗',
    badge: 'Foundational',
    description: {
      uz: 'Atamalarni ta’riflariga, formulalarni birliklarga to‘g‘ri bog‘lash',
      ru: 'Соединение терминов с определениями, величин с формулами',
      en: 'Connecting terms to definitions, formulas to units, causes to effects',
    },
    suitableFor: 'Barcha fanlar',
  },
  {
    id: 'memory_cards',
    name: {
      uz: 'Xotira kartalari (Memory Cards)',
      ru: 'Карточки памяти',
      en: 'Memory Cards',
    },
    icon: '🃏',
    badge: 'Visual',
    description: {
      uz: 'Orqasi o‘girilgan kartalardan juftliklarni ochish va izohlash',
      ru: 'Поиск парных закрытых карточек с объяснением правила',
      en: 'Flipping matching concept cards and verbalizing the rule',
    },
    suitableFor: 'Boshlang‘ich, chet tillari, kimyo elementlari',
  },
  {
    id: 'true_false_run',
    name: {
      uz: 'Rost yoki Yolg‘on harakati (True / False)',
      ru: 'Правда или Ложь',
      en: 'True / False Challenge',
    },
    icon: '⚖️',
    badge: 'Kinesthetic',
    description: {
      uz: 'Tasdiqlarga ko‘ra tezkor baholash, xato fikrlarni tuzatish',
      ru: 'Определение верности тезиса с мгновенным обоснованием ошибки',
      en: 'Rapid verification of misconceptions with rebuttal justification',
    },
    suitableFor: 'Barcha fanlar, tushunishni tekshirish',
  },
  {
    id: 'random_wheel',
    name: {
      uz: 'Sehrli baraban (Random Wheel)',
      ru: 'Колесо фортуны',
      en: 'Spin the Wheel',
    },
    icon: '🎡',
    badge: 'Surprise',
    description: {
      uz: 'Baraban aylanib kim javob berishi yoki qaysi savol tushishi aniqlanadi',
      ru: 'Вращение рулетки для определения категории или отвечающего',
      en: 'Dynamic wheel selection for surprise bonuses, modifiers, and tasks',
    },
    suitableFor: 'Jonli faollik va interaktiv dars',
  },
];
