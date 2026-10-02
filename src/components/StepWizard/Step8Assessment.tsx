import React from 'react';
import { TeacherLessonInput } from '../../types';
import { RotateCcw, ClipboardCheck, BarChart3, Star, Check } from 'lucide-react';

interface Step8Props {
  formData: TeacherLessonInput;
  onChange: (fields: Partial<TeacherLessonInput>) => void;
  t: Record<string, string>;
}

export const Step8Assessment: React.FC<Step8Props> = ({ formData, onChange, t }) => {
  const reviewOptions = [
    { id: 'Previous lesson', label: 'Oldingi darsni takrorlash' },
    { id: 'Current lesson', label: 'Ushbu dars yakuni xulosasi' },
    { id: 'Weekly review', label: 'Haftalik mavzular takrori' },
    { id: 'Exam review', label: 'Imtihonga tayyorgarlik takrori' },
    { id: 'Flashcards', label: 'Flesh-kartalar bilan qaytarish' },
    { id: 'Quick quiz', label: '3 daqiqalik ekspress viktorina' },
    { id: 'Spaced repetition', label: 'Intervalli takrorlash algoritmi' },
  ];

  const attendanceOptions = [
    { id: 'Attendance tracking', label: 'Tezkor davomat yo‘riqnomasi' },
    { id: 'Late students', label: 'Kechikkanlarni faoliyatga tez jalb qilish' },
    { id: 'Participation', label: 'Darsdagi faollikni hisobga olish' },
    { id: 'Homework check', label: 'Uyga vazifani tezkor tekshirish' },
  ];

  const assessmentOptions = [
    { id: 'Points', label: 'Ballar tizimi (10-100 ball)' },
    { id: 'Percentage', label: 'Foizli baholash (%)' },
    { id: 'Rubric', label: 'Kriteriyali rubrika (Descriptors)' },
    { id: 'Stars', label: 'Yulduzchalar va stikerlar (Boshlang‘ich)' },
    { id: 'Badges', label: 'Gamifikatsiya nishonlari (Badges)' },
    { id: 'Competition score', label: 'Turnir jadvali reytingi' },
    { id: 'Formative assessment', label: 'Formatlashtiruvchi baholash' },
    { id: 'Summative assessment', label: 'Yakuniy baholash (Summative)' },
  ];

  const toggleReview = (id: string) => {
    const current = formData.review?.types || [];
    const exists = current.includes(id);
    const updated = exists ? current.filter((item) => item !== id) : [...current, id];
    onChange({
      review: {
        ...formData.review,
        enabled: true,
        types: updated,
      },
    });
  };

  const toggleAttendance = (id: string) => {
    const current = formData.attendance?.workflowTypes || [];
    const exists = current.includes(id);
    const updated = exists ? current.filter((item) => item !== id) : [...current, id];
    onChange({
      attendance: {
        ...formData.attendance,
        enabled: true,
        workflowTypes: updated,
      },
    });
  };

  const toggleAssessment = (id: string) => {
    const current = formData.assessment?.methods || [];
    const exists = current.includes(id);
    const updated = exists ? current.filter((item) => item !== id) : [...current, id];
    onChange({
      assessment: {
        ...formData.assessment,
        methods: updated,
        includeRubric: formData.assessment?.includeRubric ?? true,
      },
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Differentiated Learning Spotlight */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-200 dark:border-indigo-800">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-md">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {t.lblDifferentiation || '🌟 Differensial ta’lim (4 darajali topshiriqlar)'}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                AI sinfdagi barcha o‘quvchilar uchun alohida darajalangan topshiriqlar tuzadi:
              </p>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={formData.includeDifferentiation}
              onChange={(e) => onChange({ includeDifferentiation: e.target.checked })}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
            />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Faol</span>
          </label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3 pt-3 border-t border-indigo-100 dark:border-indigo-900/50 text-[11px]">
          <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
            <strong className="text-blue-600 dark:text-blue-400 block font-bold mb-0.5">LEVEL A (Support)</strong>
            <span>Zaif o‘quvchilarga ko‘mak va qadamli shablon</span>
          </div>
          <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
            <strong className="text-emerald-600 dark:text-emerald-400 block font-bold mb-0.5">LEVEL B (Standard)</strong>
            <span>O‘rta o‘zlashtiruvchilar uchun dastur talabi</span>
          </div>
          <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
            <strong className="text-amber-600 dark:text-amber-400 block font-bold mb-0.5">LEVEL C (Advanced)</strong>
            <span>Kuchli o‘quvchilar uchun tahliliy topshiriq</span>
          </div>
          <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
            <strong className="text-purple-600 dark:text-purple-400 block font-bold mb-0.5">LEVEL D (Olympiad)</strong>
            <span>Iqtidorli va olimpiada qatnashchilari uchun</span>
          </div>
        </div>
      </div>

      {/* Review System */}
      <div>
        <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-indigo-500" />
          <span>{t.lblReviewSystem || '🔄 Takrorlash tizimi'}</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {reviewOptions.map((opt) => {
            const isSelected = (formData.review?.types || []).includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleReview(opt.id)}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20 font-semibold'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Assessment System */}
      <div>
        <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-indigo-500" />
          <span>{t.lblAssessmentSystem || '📊 Baholash usullari'}</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {assessmentOptions.map((opt) => {
            const isSelected = (formData.assessment?.methods || []).includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleAssessment(opt.id)}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20 font-semibold'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Attendance System */}
      <div>
        <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
          <ClipboardCheck className="w-4 h-4 text-indigo-500" />
          <span>{t.lblAttendanceSystem || '📋 Davomat va sinf intizomi ish tartibi'}</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {attendanceOptions.map((opt) => {
            const isSelected = (formData.attendance?.workflowTypes || []).includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleAttendance(opt.id)}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20 font-semibold'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
