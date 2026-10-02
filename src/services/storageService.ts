import { TeacherLessonInput, GeneratedPromptResult, Language, QualityLevel, AITarget } from '../types';

const DRAFT_KEY = 'edu_prompt_engine_draft';
const HISTORY_KEY = 'edu_prompt_engine_history';
const THEME_KEY = 'edu_prompt_engine_theme';
const LANG_KEY = 'edu_prompt_engine_lang';
const SETTINGS_KEY = 'edu_prompt_engine_settings';

export interface AppSettings {
  defaultAITarget: AITarget;
  defaultQuality: QualityLevel;
  autoSaveDraft: boolean;
  soundFeedback: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  defaultAITarget: 'both',
  defaultQuality: 'expert',
  autoSaveDraft: true,
  soundFeedback: true,
};

export const INITIAL_FORM_DATA: TeacherLessonInput = {
  subject: 'Matematika',
  customSubject: '',
  topic: '',
  grade: 8,
  duration: 45,
  studentCount: 25,
  level: 'O‘rta',
  lessonFormat: 'Guruh',
  objectivesText: '',
  objectivePills: ['Bilim berish', 'Amaliyot', 'Mustahkamlash'],
  bloomTaxonomy: ['Knowledge', 'Understanding', 'Application'],
  aiAutoSelectMethods: false,
  selectedMethods: ['gamification', 'quiz', 'group_work'],
  aiAutoSelectGame: false,
  selectedGames: ['quiz_battle'],
  exerciseDifficulty: 'Mixed',
  exerciseCount: 10,
  exerciseTypes: ['Problem solving', 'Multiple choice', 'Matching'],
  test: {
    questionCount: 10,
    questionTypes: ['MCQ', 'Short answer'],
    difficulty: 'Mixed',
    hasGradingScale: true,
    gradingScale: [
      { range: '90-100', grade: "5 (A'lo)", description: 'Mavzuni to‘liq o‘zlashtirgan' },
      { range: '70-89', grade: '4 (Yaxshi)', description: 'Asosiy tushunchalarni biladi' },
      { range: '50-69', grade: '3 (Qoniqarli)', description: 'Yordam bilan bajara oladi' },
      { range: '0-49', grade: '2 (Qoniqarsiz)', description: 'Qayta o‘rganish talab etiladi' },
    ],
    includeExplanations: true,
  },
  homework: {
    type: 'Mixed',
    estimatedTimeMin: 25,
    difficulty: 'Medium',
    includeEvaluationCriteria: true,
    includeOptionalExtension: true,
  },
  review: {
    enabled: true,
    types: ['Previous lesson', 'Flashcards', 'Quick quiz'],
  },
  attendance: {
    enabled: true,
    workflowTypes: ['Attendance tracking', 'Participation'],
  },
  assessment: {
    methods: ['Points', 'Formative assessment', 'Rubric'],
    includeRubric: true,
  },
  includeDifferentiation: true,
  extraIdeas: '',
  aiTarget: 'both',
  qualityLevel: 'expert',
  appliedModifiers: [],
};

export const storageService = {
  // Drafts
  saveDraft(data: TeacherLessonInput): void {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save draft', e);
    }
  },

  getDraft(): TeacherLessonInput | null {
    try {
      const data = localStorage.getItem(DRAFT_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to parse draft', e);
    }
    return null;
  },

  clearDraft(): void {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (e) {
      console.error('Failed to clear draft', e);
    }
  },

  // History
  getHistory(): GeneratedPromptResult[] {
    try {
      const data = localStorage.getItem(HISTORY_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to parse history', e);
    }
    return [];
  },

  saveToHistory(item: GeneratedPromptResult): GeneratedPromptResult[] {
    try {
      const list = this.getHistory();
      // Unshift to front, prevent duplicate IDs
      const filtered = list.filter((i) => i.id !== item.id);
      const updated = [item, ...filtered].slice(0, 50); // Keep last 50
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Failed to save history item', e);
      return this.getHistory();
    }
  },

  deleteFromHistory(id: string): GeneratedPromptResult[] {
    try {
      const list = this.getHistory();
      const updated = list.filter((i) => i.id !== id);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Failed to delete history item', e);
      return this.getHistory();
    }
  },

  clearAllHistory(): void {
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (e) {
      console.error('Failed to clear history', e);
    }
  },

  // Language
  getLanguage(): Language {
    try {
      const lang = localStorage.getItem(LANG_KEY);
      if (lang === 'uz' || lang === 'ru' || lang === 'en') {
        return lang;
      }
    } catch (e) {
      console.error('Failed to get language', e);
    }
    return 'uz'; // Default Uzbek as requested
  },

  setLanguage(lang: Language): void {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {
      console.error('Failed to set language', e);
    }
  },

  // Theme
  getTheme(): 'dark' | 'light' {
    try {
      const theme = localStorage.getItem(THEME_KEY);
      if (theme === 'dark' || theme === 'light') {
        return theme;
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch (e) {
      console.error('Failed to get theme', e);
    }
    return 'dark'; // Premium dark mode default
  },

  setTheme(theme: 'dark' | 'light'): void {
    try {
      localStorage.setItem(THEME_KEY, theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.error('Failed to set theme', e);
    }
  },

  // Settings
  getSettings(): AppSettings {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      if (data) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
      }
    } catch (e) {
      console.error('Failed to get settings', e);
    }
    return DEFAULT_SETTINGS;
  },

  saveSettings(settings: AppSettings): void {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  },
};
