import React from 'react';
import { TeacherLessonInput, TestQuestionType, ExerciseDifficulty, GradingScaleItem } from '../../types';
import { HelpCircle, Check, Plus, Trash2 } from 'lucide-react';

interface Step6Props {
  formData: TeacherLessonInput;
  onChange: (fields: Partial<TeacherLessonInput>) => void;
  t: Record<string, string>;
}

export const Step6Test: React.FC<Step6Props> = ({ formData, onChange, t }) => {
  const currentTest = formData.test || {
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
  };

  const questionCounts = [5, 10, 15, 20, 25];

  const questionTypes: { id: TestQuestionType; label: string; icon: string }[] = [
    { id: 'MCQ', label: 'Test variantlari (MCQ A,B,C,D)', icon: '🔘' },
    { id: 'True/False', label: 'Rost / Yolg‘on (True/False)', icon: '⚖️' },
    { id: 'Short answer', label: 'Qisqa javobli savol', icon: '📝' },
    { id: 'Open answer', label: 'Kengaytirilgan ochiq javob', icon: '💬' },
    { id: 'Mixed', label: 'Aralash formatlar', icon: '🔀' },
  ];

  const difficulties: ExerciseDifficulty[] = ['Easy', 'Medium', 'Hard', 'Mixed'];

  const updateTestConfig = (updates: Partial<typeof currentTest>) => {
    onChange({
      test: {
        ...currentTest,
        ...updates,
      },
    });
  };

  const toggleQuestionType = (qType: TestQuestionType) => {
    const current = currentTest.questionTypes || [];
    const exists = current.includes(qType);
    const updated = exists ? current.filter((t) => t !== qType) : [...current, qType];
    updateTestConfig({ questionTypes: updated });
  };

  const updateGradingRow = (index: number, field: keyof GradingScaleItem, value: string) => {
    const list = [...(currentTest.gradingScale || [])];
    if (list[index]) {
      list[index] = { ...list[index], [field]: value };
      updateTestConfig({ gradingScale: list });
    }
  };

  const addGradingRow = () => {
    const list = [...(currentTest.gradingScale || [])];
    list.push({ range: '0-30', grade: 'Qo‘shimcha', description: 'Yangi mezon' });
    updateTestConfig({ gradingScale: list });
  };

  const removeGradingRow = (index: number) => {
    const list = [...(currentTest.gradingScale || [])].filter((_, i) => i !== index);
    updateTestConfig({ gradingScale: list });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Question count */}
      <div>
        <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-indigo-500" />
          <span>{t.lblTestCount || 'Test savollari soni'}</span>
        </label>
        <div className="flex flex-wrap gap-2.5">
          {questionCounts.map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => updateTestConfig({ questionCount: count })}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                currentTest.questionCount === count
                  ? 'border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              {count} ta savol
            </button>
          ))}
        </div>
      </div>

      {/* Question types */}
      <div>
        <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
          {t.lblTestTypes || 'Savol formatlari'}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {questionTypes.map((q) => {
            const isSelected = (currentTest.questionTypes || []).includes(q.id);
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => toggleQuestionType(q.id)}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20 font-semibold'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{q.icon}</span>
                  <span className="text-xs">{q.label}</span>
                </div>
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
          {t.lblTestDifficulty || 'Test qiyinligi'}
        </label>
        <div className="flex flex-wrap gap-2.5">
          {difficulties.map((diff) => (
            <button
              key={diff}
              type="button"
              onClick={() => updateTestConfig({ difficulty: diff })}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                currentTest.difficulty === diff
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Customizable Grading Scale */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {t.lblGradingScale || 'Baholash shkalasi va mezonlari'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              O‘quvchilar natijalarini baholash mezonlarini o‘zingiz moslashtiring:
            </p>
          </div>
          <button
            type="button"
            onClick={addGradingRow}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-semibold cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Qator qo‘shish</span>
          </button>
        </div>

        <div className="space-y-2">
          {currentTest.gradingScale?.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={item.range}
                onChange={(e) => updateGradingRow(idx, 'range', e.target.value)}
                placeholder="Foiz (90-100)"
                className="w-24 px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
              <input
                type="text"
                value={item.grade}
                onChange={(e) => updateGradingRow(idx, 'grade', e.target.value)}
                placeholder="Baho / Daraja"
                className="w-28 px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
              />
              <input
                type="text"
                value={item.description}
                onChange={(e) => updateGradingRow(idx, 'description', e.target.value)}
                placeholder="Tavsif yoki mezon"
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
              {currentTest.gradingScale.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeGradingRow(idx)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition-colors cursor-pointer"
                  title="O‘chirish"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
