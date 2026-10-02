export interface SubjectItem {
  id: string;
  name: {
    uz: string;
    ru: string;
    en: string;
  };
  icon: string;
  color: string;
  suggestedTopics: string[];
}

export const PREDEFINED_SUBJECTS: SubjectItem[] = [
  {
    id: 'matematika',
    name: {
      uz: 'Matematika',
      ru: 'Математика',
      en: 'Mathematics',
    },
    icon: '📐',
    color: 'from-blue-500 to-indigo-600',
    suggestedTopics: [
      'Kvadrat tenglamalar',
      'Pifagor teoremasi',
      'Kasrlar ustida amallar',
      'Hosila va uning tatbiqlari',
      'Funksiya va uning grafigi',
    ],
  },
  {
    id: 'fizika',
    name: {
      uz: 'Fizika',
      ru: 'Физика',
      en: 'Physics',
    },
    icon: '⚡',
    color: 'from-amber-500 to-orange-600',
    suggestedTopics: [
      'Nyuton qonunlari',
      'Arximed kuchi',
      'Optika va yorug‘lik sinishi',
      'Elektr toki va Om qonuni',
      'Kinetik va potensial energiya',
    ],
  },
  {
    id: 'kimyo',
    name: {
      uz: 'Kimyo',
      ru: 'Химия',
      en: 'Chemistry',
    },
    icon: '🧪',
    color: 'from-emerald-500 to-teal-600',
    suggestedTopics: [
      'Mendeleyev davriy jadvali',
      'Kimyoviy bog‘lanish turlari',
      'Oksidlanish-qaytarilish reaksiyalari',
      'Kislotalar va asoslar',
      'Organik kimyoga kirish',
    ],
  },
  {
    id: 'biologiya',
    name: {
      uz: 'Biologiya',
      ru: 'Биология',
      en: 'Biology',
    },
    icon: '🧬',
    color: 'from-green-500 to-emerald-600',
    suggestedTopics: [
      'Fotosintez jarayoni',
      'Hujayra tuzilishi va organoidlari',
      'Genetika va Mendel qonunlari',
      'Inson qon aylanish tizimi',
      'Ekosistema va oziq zanjiri',
    ],
  },
  {
    id: 'informatika',
    name: {
      uz: 'Informatika',
      ru: 'Информатика',
      en: 'Informatics / CS',
    },
    icon: '💻',
    color: 'from-cyan-500 to-blue-600',
    suggestedTopics: [
      'Algoritm tushunchasi va turlari',
      'Python dasturlash: Sikllar (for, while)',
      'Sun’iy intellekt asoslari',
      'Ma’lumotlar bazasi va SQL',
      'Kiberxavfsizlik qoidalari',
    ],
  },
  {
    id: 'ingliz-tili',
    name: {
      uz: 'Ingliz tili',
      ru: 'Английский язык',
      en: 'English Language',
    },
    icon: '🇬🇧',
    color: 'from-rose-500 to-pink-600',
    suggestedTopics: [
      'Present Perfect vs Past Simple',
      'Conditional Sentences (0, 1, 2, 3)',
      'Debating and Persuasive Speaking',
      'Vocabulary: Climate Change & Technology',
      'Reading Comprehension & Critical Analysis',
    ],
  },
  {
    id: 'ona-tili',
    name: {
      uz: 'Ona tili',
      ru: 'Родной язык',
      en: 'Native Language',
    },
    icon: '📝',
    color: 'from-violet-500 to-purple-600',
    suggestedTopics: [
      'Murakkab qo‘shma gaplar',
      'So‘z turkumlari tasnifi',
      'Orfoepiya va imlo qoidalari',
      'Uslubiyat va badiiy nutq',
      'Fonetik o‘zgarishlar',
    ],
  },
  {
    id: 'adabiyot',
    name: {
      uz: 'Adabiyot',
      ru: 'Литература',
      en: 'Literature',
    },
    icon: '📖',
    color: 'from-red-500 to-rose-600',
    suggestedTopics: [
      'Alisher Navoiy "Xamsa" asari tahlili',
      'Abdulla Qodiriy "O‘tkan kunlar" romani',
      'Badiiy tasvir vositalari (metafora, tashbeh)',
      'She’riy vaznlar va qofiya turlari',
      'Jahon adabiyoti durdonalari',
    ],
  },
  {
    id: 'tarix',
    name: {
      uz: 'Tarix',
      ru: 'История',
      en: 'History',
    },
    icon: '🏛️',
    color: 'from-yellow-500 to-amber-600',
    suggestedTopics: [
      'Amir Temur davlati va diplomatiyasi',
      'Buyuk Ipak yo‘li va sivilizatsiyalar',
      'Sharq Renessansi olimlari',
      'Ikkinchi jahon urushi sabablari va oqibatlari',
      'O‘zbekiston mustaqilligi yillari',
    ],
  },
  {
    id: 'geografiya',
    name: {
      uz: 'Geografiya',
      ru: 'География',
      en: 'Geography',
    },
    icon: '🌍',
    color: 'from-teal-500 to-cyan-600',
    suggestedTopics: [
      'Yer sharining ichki tuzilishi va litosfera',
      'Iqlim mintaqalari va ob-havo',
      'Jahon okeani va uning resurslari',
      'O‘zbekistonning tabiiy boyliklari',
      'Demografiya va jahon aholisi',
    ],
  },
  {
    id: 'boshlangich',
    name: {
      uz: 'Boshlang‘ich ta’lim',
      ru: 'Начальные классы',
      en: 'Primary Education',
    },
    icon: '🎒',
    color: 'from-fuchsia-500 to-pink-600',
    suggestedTopics: [
      'Ko‘paytirish jadvali sirlari',
      'Tabiat fasllari va jonivorlar hayoti',
      'Chiroyli va to‘g‘ri yozuv qoidalari',
      'Ertaklar qahramonlari tahlili',
      'Mantiqiy topishmoqlar va matematik o‘yinlar',
    ],
  },
  {
    id: 'rus-tili',
    name: {
      uz: 'Rus tili',
      ru: 'Русский язык',
      en: 'Russian Language',
    },
    icon: '🇷🇺',
    color: 'from-blue-600 to-indigo-700',
    suggestedTopics: [
      'Падежи имен существительных',
      'Глаголы движения',
      'Диалогическая речь: В магазине и путешествии',
      'Сложноподчиненные предложения',
      'Культура и обычаи',
    ],
  },
];
