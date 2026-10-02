import React from 'react';
import { TeacherLessonInput, HomeworkType, ExerciseDifficulty } from '../../types';
import { Home, Clock, Sparkles } from 'lucide-react';

interface Step7Props {
  formData: TeacherLessonInput;
  onChange: (fields: Partial<TeacherLessonInput>) => void;
  t: Record<string, string>;
}

export const Step7Homework: React.FC<Step7Props> = ({ formData, onChange, t }) => {
  const currentHw = formData.homework || {
    type: 'Mixed',
    estimatedTimeMin: 25,
    difficulty: 'Medium',
    includeEvaluationCriteria: true,
    includeOptionalExtension: true,
  };

  const homeworkTypes: { id: HomeworkType; label: string; icon: string; desc: string }[] = [
    { id: 'Standard', label: 'Standart mashqlar', icon: '📖', desc: 'Darslikdagi masalalar va qoidalarni mustahkamlash' },
    { id: 'Creative', label: 'Ijodiy vazifa', icon: '🎨', desc: 'Hikoya, illyustratsiya yoki o‘z masalasini tuzish' },
    { id: 'Practical', label: 'Amaliy tadqiqot', icon: '🧪', desc: 'Uy sharoitida o‘lchash, tajriba yoki kuzatuv' },
    { id: 'Research', label: 'Kichik tadqiqot', icon: '🔍', desc: 'Qo‘shimcha manbalardan ma’lumot to‘plash' },
    { id: 'Project', label: 'Mini-loyiha', icon: '🚀', desc: 'Taqdimot, poster yoki model yaratish' },
    { id: 'Family activity', label: 'Oila bilan faoliyat', icon: '👨‍👩‍👧', desc: 'Ota-ona yoki aka-uka bilan muloqot va o‘yin' },
    { id: 'Digital', label: 'Raqamli topshiriq', icon: '💻', desc: 'Onlayn simulyator, kod yozish yoki video ko‘rish' },
    { id: 'Mixed', label: 'Aralash (Gibrid)', icon: '🔄', desc: 'Nazariya + kichik amaliy ijodiy qism' },
  ];

  const updateHw = (updates: Partial<typeof currentHw>) => {
    onChange({
      homework: {
        ...currentHw,
        ...updates,
      },
    });
  };

  const times = [15, 20, 25, 30, 45, 60];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Homework Type */}
      <div>
        <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
          <Home className="w-4 h-4 text-indigo-500" />
          <span>{t.lblHomeworkType || 'Uy vazifasi turi'}</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {homeworkTypes.map((hw) => {
            const isSelected = currentHw.type === hw.id;
            return (
              <div
                key={hw.id}
                onClick={() => updateHw({ type: hw.id })}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                }`}
              >
                <div className="text-xl mb-1">{hw.icon}</div>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">
                  {hw.label}
                </h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  {hw.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Estimated Time */}
      <div>
        <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-500" />
          <span>{t.lblHomeworkTime || 'Mo‘ljallangan bajarish vaqti'}</span>
        </label>
        <div className="flex flex-wrap gap-2.5">
          {times.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => updateHw({ estimatedTimeMin: time })}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                currentHw.estimatedTimeMin === time
                  ? 'border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              {time} daqiqa
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-3 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={currentHw.includeEvaluationCriteria}
            onChange={(e) => updateHw({ includeEvaluationCriteria: e.target.checked })}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
          />
          <div>
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {t.lblHomeworkEvaluation || 'Baholash mezonlari (Rubrika)ni qo‘shish'}
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              O‘quvchiga vazifa qanday baholanishini aniq tushuntiruvchi rubrika yaratiladi.
            </p>
          </div>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={currentHw.includeOptionalExtension}
            onChange={(e) => updateHw({ includeOptionalExtension: e.target.checked })}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
          />
          <div>
            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>{t.lblHomeworkExtension || 'Qiziquvchilar uchun ixtiyoriy kengaytirilgan vazifa'}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Mavzuni chuqur o‘rganishni istagan iqtidorli o‘quvchilar uchun bonusli topshiriq.
            </p>
          </div>
        </label>
      </div>
    </div>
  );
};
