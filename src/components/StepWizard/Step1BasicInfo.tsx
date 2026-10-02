import React from 'react';
import { TeacherLessonInput, StudentLevel, LessonFormat } from '../../types';
import { PREDEFINED_SUBJECTS } from '../../data/subjects';
import { BookOpen, Users, Clock, Layers, Award } from 'lucide-react';

interface Step1Props {
  formData: TeacherLessonInput;
  onChange: (fields: Partial<TeacherLessonInput>) => void;
  t: Record<string, string>;
}

export const Step1BasicInfo: React.FC<Step1Props> = ({ formData, onChange, t }) => {
  const isCustomSubject = !PREDEFINED_SUBJECTS.some((s) => s.name.uz === formData.subject);

  const studentLevels: { id: StudentLevel; label: string; desc: string }[] = [
    { id: 'Boshlang‘ich', label: 'Boshlang‘ich', desc: 'Ko‘proq ko‘rgazmalilik va sodda tushuntirish kerak' },
    { id: 'O‘rta', label: 'O‘rta', desc: 'Standart darslik darajasida o‘zlashtiradi' },
    { id: 'Yaxshi', label: 'Yaxshi', desc: 'Mustaqil amaliy mashqlarni bajara oladi' },
    { id: 'Kuchli', label: 'Kuchli', desc: 'Murakkab va nostandart masalalarga qiziqadi' },
    { id: 'Aralash', label: 'Aralash', desc: 'Sinfda kuchli va zaif o‘quvchilar birgalikda' },
  ];

  const lessonFormats: { id: LessonFormat; label: string; icon: string }[] = [
    { id: 'Individual', label: 'Individual (Yakka)', icon: '👤' },
    { id: 'Juftlik', label: 'Juftlikda ishlash', icon: '👥' },
    { id: 'Guruh', label: 'Kichik guruhlarda', icon: '🏆' },
    { id: 'Butun sinf', label: 'Butun sinf bilan frontal', icon: '🏫' },
    { id: 'Aralash', label: 'Aralash (Gibrid)', icon: '🔄' },
  ];

  const durations = [20, 30, 40, 45, 60, 80, 90];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Subject Selection */}
      <div>
        <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-500" />
          <span>{t.lblSubject || 'Fan'} *</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 mb-3">
          {PREDEFINED_SUBJECTS.map((sub) => {
            const isSelected = formData.subject === sub.name.uz;
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => {
                  onChange({
                    subject: sub.name.uz,
                    customSubject: '',
                    // auto pick a suggested topic if empty
                    topic: formData.topic ? formData.topic : sub.suggestedTopics[0] || '',
                  });
                }}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 text-xs font-semibold cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span className="text-xl">{sub.icon}</span>
                <span className="truncate">{sub.name.uz}</span>
              </button>
            );
          })}
        </div>

        {/* Custom Subject Option */}
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => onChange({ subject: 'Boshqa fan' })}
            className={`text-xs px-3 py-1.5 rounded-lg border font-medium cursor-pointer ${
              formData.subject === 'Boshqa fan'
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300'
                : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            + {t.lblCustomSubject || 'Boshqa fan kiritish'}
          </button>

          {formData.subject === 'Boshqa fan' && (
            <input
              type="text"
              value={formData.customSubject || ''}
              onChange={(e) => onChange({ customSubject: e.target.value })}
              placeholder="Masalan: Astronomiya, Chizmachilik, Musiqa..."
              className="flex-1 text-xs px-3 py-2 rounded-xl border border-indigo-400 dark:border-indigo-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          )}
        </div>
      </div>

      {/* Topic */}
      <div>
        <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
          {t.lblTopic || 'Dars mavzusi'} *
        </label>
        <input
          type="text"
          value={formData.topic}
          onChange={(e) => onChange({ topic: e.target.value })}
          placeholder={t.lblTopicPlaceholder || 'Masalan: Kvadrat tenglamalar va diskriminant usuli'}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
        />
        {/* Quick suggested topics for current subject */}
        {(() => {
          const currentSub = PREDEFINED_SUBJECTS.find((s) => s.name.uz === formData.subject);
          if (!currentSub) return null;
          return (
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mr-1">
                Tavsiya mavzular:
              </span>
              {currentSub.suggestedTopics.map((topicItem) => (
                <button
                  key={topicItem}
                  type="button"
                  onClick={() => onChange({ topic: topicItem })}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/60 dark:hover:text-indigo-300 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  {topicItem}
                </button>
              ))}
            </div>
          );
        })()}
      </div>

      {/* Grade and Duration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Grade */}
        <div>
          <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-500" />
            <span>{t.lblGrade || 'Sinf'} (1-11) *</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => onChange({ grade: g })}
                className={`w-10 h-10 rounded-xl font-bold text-xs flex items-center justify-center border transition-all cursor-pointer ${
                  formData.grade === g
                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-500" />
            <span>{t.lblDuration || 'Dars davomiyligi'}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {durations.map((dur) => (
              <button
                key={dur}
                type="button"
                onClick={() => onChange({ duration: dur })}
                className={`px-3.5 py-2 rounded-xl font-semibold text-xs border transition-all cursor-pointer ${
                  formData.duration === dur
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                {dur} daqiqa
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Student count & Level */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-500" />
            <span>{t.lblStudentCount || 'O‘quvchilar soni'}</span>
          </label>
          <input
            type="number"
            min={1}
            max={100}
            value={formData.studentCount}
            onChange={(e) => onChange({ studentCount: parseInt(e.target.value) || 25 })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-500" />
            <span>{t.lblStudentLevel || 'O‘quvchilar darajasi'}</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {studentLevels.map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => onChange({ level: lvl.id })}
                className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                  formData.level === lvl.id
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lesson Format */}
      <div>
        <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
          {t.lblLessonFormat || 'Dars formati'}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {lessonFormats.map((fmt) => (
            <button
              key={fmt.id}
              type="button"
              onClick={() => onChange({ lessonFormat: fmt.id })}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                formData.lessonFormat === fmt.id
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20 font-bold'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 text-xs font-medium'
              }`}
            >
              <div className="text-xl mb-1">{fmt.icon}</div>
              <div className="text-xs truncate">{fmt.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
