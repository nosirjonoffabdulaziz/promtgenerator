export type Language = 'uz' | 'ru' | 'en';

export type QualityLevel = 'quick' | 'standard' | 'advanced' | 'expert';

export type AITarget = 'claude' | 'google-ai-studio' | 'both';

export type StudentLevel = 'Boshlang‘ich' | 'O‘rta' | 'Yaxshi' | 'Kuchli' | 'Aralash';

export type LessonFormat = 'Individual' | 'Juftlik' | 'Guruh' | 'Butun sinf' | 'Aralash';

export type ExerciseDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Mixed' | 'Olympiad';

export type ExerciseType = 
  | 'Multiple choice'
  | 'Open question'
  | 'Matching'
  | 'Fill in the blank'
  | 'True/False'
  | 'Problem solving'
  | 'Practical task'
  | 'Creative task'
  | 'Critical thinking'
  | 'Scenario based';

export type TestQuestionType = 'MCQ' | 'True/False' | 'Short answer' | 'Open answer' | 'Mixed';

export type HomeworkType = 
  | 'Standard'
  | 'Creative'
  | 'Practical'
  | 'Research'
  | 'Project'
  | 'Family activity'
  | 'Digital'
  | 'Mixed';

export interface GradingScaleItem {
  range: string;
  grade: string;
  description: string;
}

export interface TestConfig {
  questionCount: number;
  questionTypes: TestQuestionType[];
  difficulty: ExerciseDifficulty;
  hasGradingScale: boolean;
  gradingScale: GradingScaleItem[];
  includeExplanations: boolean;
}

export interface HomeworkConfig {
  type: HomeworkType;
  estimatedTimeMin: number;
  difficulty: ExerciseDifficulty;
  includeEvaluationCriteria: boolean;
  includeOptionalExtension: boolean;
}

export interface ReviewConfig {
  enabled: boolean;
  types: string[]; // 'Previous lesson', 'Current lesson', 'Weekly review', 'Exam review', 'Flashcards', 'Quick quiz', 'Spaced repetition'
}

export interface AttendanceConfig {
  enabled: boolean;
  workflowTypes: string[]; // 'Attendance tracking', 'Late students', 'Absent students', 'Participation', 'Homework check'
}

export interface AssessmentConfig {
  methods: string[]; // 'Points', 'Percentage', 'Rubric', 'Stars', 'Badges', 'Competition score', 'Formative assessment', 'Summative assessment'
  includeRubric: boolean;
}

export interface TeacherLessonInput {
  id?: string;
  title?: string;
  createdAt?: string;

  // Step 1: Basic info
  subject: string;
  customSubject?: string;
  topic: string;
  grade: number;
  duration: number; // minutes
  studentCount: number;
  level: StudentLevel;
  lessonFormat: LessonFormat;

  // Step 2: Objectives
  objectivesText: string;
  objectivePills: string[];
  bloomTaxonomy: string[];

  // Step 3: Methods
  aiAutoSelectMethods: boolean;
  selectedMethods: string[];

  // Step 4: Game
  aiAutoSelectGame: boolean;
  selectedGames: string[];

  // Step 5: Exercises
  exerciseDifficulty: ExerciseDifficulty;
  exerciseCount: number;
  exerciseTypes: ExerciseType[];

  // Step 6: Test
  test: TestConfig;

  // Step 7: Homework
  homework: HomeworkConfig;

  // Step 8: Review & Assessment & Attendance & Differentiation
  review: ReviewConfig;
  attendance: AttendanceConfig;
  assessment: AssessmentConfig;
  includeDifferentiation: boolean; // Level A (Support), Level B (Standard), Level C (Advanced), Level D (Olympiad)

  // Step 9: Extra ideas
  extraIdeas: string;

  // Step 10: AI Target & Quality
  aiTarget: AITarget;
  qualityLevel: QualityLevel;

  // Modifiers applied
  appliedModifiers?: string[];
}

export interface GeneratedPromptResult {
  id: string;
  createdAt: string;
  subject: string;
  topic: string;
  grade: number;
  aiTarget: AITarget;
  qualityLevel: QualityLevel;
  claudePrompt?: string;
  googleAIPrompt?: string;
  inputData: TeacherLessonInput;
}

export interface LessonTemplate {
  id: string;
  subject: string;
  icon: string;
  badge: string;
  topic: string;
  grade: number;
  duration: number;
  studentCount?: number;
  description: {
    uz: string;
    ru: string;
    en: string;
  };
  sampleInput: Partial<TeacherLessonInput>;
}

export interface SmartSuggestion {
  methods: string[];
  game: string;
  assessment: string;
  tip: string;
}
