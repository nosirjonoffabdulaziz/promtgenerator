import React from 'react';
import { TeacherLessonInput, ExerciseDifficulty, ExerciseType } from '../../types';
import { PenTool, Check, CheckCircle2 } from 'lucide-react';

interface Step5Props {
  formData: TeacherLessonInput;
  onChange: (fields: Partial<TeacherLessonInput>) => void;
  t: Record<string, string>;
}

export const Step5Exercises: React.FC<Step5Props> = ({ formData, onChange, t }) => {
  const difficulties: { id: ExerciseDifficulty; label: string; desc: string }[] = [
    { id: 'Easy', label: 'Oson (Poydevor)', desc: 'Asosiy tushunchalarni eslash va oddiy namunalar' },
    { id: 'Medium', label: 'O‘rta (Standart)', desc: 'Darslik darajasidagi mustaqil masalalar' },
    { id: 'Hard', label: 'Qiyin (Murakkab)', desc: 'Ko‘p bosqichli mantiqiy fikrlash talab etiladi' },
    { id: 'Mixed', label: 'Aralash (Balanslangan)', desc: 'Oson, o‘rta va qiyin mashqlarning muvozanati' },
    { id: 'Olympiad', label: 'Olimpiada darajasi', desc: 'Iqtidorli o‘quvchilar uchun chuqurlashtirilgan masala' },
  ];

  const counts = [5, 10, 15, 20, 30, 50];

  const exerciseTypeOptions: { id: ExerciseType; label: string; icon: string }[] = [
    { id: 'Problem solving', label: 'Masala yechish (Problem solving)', icon: '📐' },
    { id: 'Multiple choice', label: 'Ko‘p variantli test (Multiple choice)', icon: '🔘' },
    { id: 'Open question', label: 'Ochiq savol-javob (Open question)', icon: '💬' },
    { id: 'Matching', label: 'Moslashtirish (Matching)', icon: '🔗' },
    { id: 'Fill in the blank', label: 'Nuqtalar o‘rnini to‘ldirish (Fill in blank)', icon: '✏️' },
    { id: 'True/False', label: 'Rost / Yolg‘on (True/False)', icon: '⚖️' },
    { id: 'Practical task', label: 'Amaliy topshiriq (Practical task)', icon: '🧪' },
    { id: 'Creative task', label: 'Ijodiy topshiriq (Creative task)', icon: '🎨' },
    { id: 'Critical thinking', label: 'Tanqidiy fikrlash (Critical thinking)', icon: '🧠' },
    { id: 'Scenario based', label: 'Vaziyatli keys (Scenario based)', icon: '🏢' },
  ];

  const toggleType = (typeId: ExerciseType) => {
    const current = formData.exerciseTypes || [];
    const exists = current.includes(typeId);
    const updated = exists ? current.filter((t) => t !== typeId) : [...current, typeId];
    onChange({ exerciseTypes: updated });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Exercise Count */}
      <div>
        <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
          <PenTool className="w-4 h-4 text-indigo-500" />
          <span>{t.lblExerciseCount || 'Mashqlar soni'}</span>
        </label>
        <div className="flex flex-wrap gap-2.5">
          {counts.map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => onChange({ exerciseCount: count })}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                formData.exerciseCount === count
                  ? 'border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              {count} ta mashq
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
          {t.lblExerciseDifficulty || 'Mashqlar qiyinlik darajasi'}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {difficulties.map((diff) => {
            const isSelected = formData.exerciseDifficulty === diff.id;
            return (
              <div
                key={diff.id}
                onClick={() => onChange({ exerciseDifficulty: diff.id })}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-xs font-bold ${
                      isSelected
                        ? 'text-indigo-700 dark:text-indigo-300'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {diff.label}
                  </span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  {diff.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Exercise Types */}
      <div>
        <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
          {t.lblExerciseTypes || 'Mashq formatlari'}
        </label>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
          AI darsga kiritishi kerak bo‘lgan mashq turlarini tanlang ({formData.exerciseTypes?.length || 0} ta tanlandi):
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {exerciseTypeOptions.map((type) => {
            const isSelected = (formData.exerciseTypes || []).includes(type.id);
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => toggleType(type.id)}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20 font-semibold'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{type.icon}</span>
                  <span className="text-xs truncate">{type.label}</span>
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

      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
        <span>
          <strong>Kafolat:</strong> AI har bir mashq uchun bosqichma-bosqich yechim algoritmi va to‘liq javoblar kalitini (Answer Keys) chiqarib beradi.
        </span>
      </div>
    </div>
  );
};
