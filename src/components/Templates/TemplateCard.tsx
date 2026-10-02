import React from 'react';
import { LessonTemplate, Language } from '../../types';
import { ArrowRight, Clock, Users, Award } from 'lucide-react';

interface TemplateCardProps {
  template: LessonTemplate;
  currentLang: Language;
  onApply: (template: LessonTemplate) => void;
  t: Record<string, string>;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  currentLang,
  onApply,
  t,
}) => {
  const desc = template.description[currentLang] || template.description.uz;

  return (
    <div className="flex flex-col justify-between p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all hover:shadow-md group">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
              {template.icon}
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                {template.subject}
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {template.topic}
              </h3>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 shrink-0">
            {template.badge}
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          {desc}
        </p>

        {/* Info pills */}
        <div className="flex flex-wrap items-center gap-2 mb-4 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
            <Award className="w-3 h-3 text-indigo-500" />
            {template.grade}-sinf
          </span>
          <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
            <Clock className="w-3 h-3 text-indigo-500" />
            {template.duration} daqiqa
          </span>
          <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
            <Users className="w-3 h-3 text-indigo-500" />
            Interaktiv
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onApply(template)}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 hover:bg-indigo-600 hover:text-white text-indigo-600 dark:text-indigo-300 font-bold text-xs transition-all cursor-pointer"
      >
        <span>{t.btnApplyTemplate || 'Shablonni qo‘llash'}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
