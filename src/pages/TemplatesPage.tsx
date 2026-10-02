import React, { useState } from 'react';
import { READY_TEMPLATES } from '../data/templates';
import { TemplateCard } from '../components/Templates/TemplateCard';
import { LessonTemplate, Language } from '../types';
import { LayoutTemplate, Search, Filter } from 'lucide-react';

interface TemplatesPageProps {
  onApplyTemplate: (template: LessonTemplate) => void;
  currentLang: Language;
  t: Record<string, string>;
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({
  onApplyTemplate,
  currentLang,
  t,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const subjectsList = ['all', ...Array.from(new Set(READY_TEMPLATES.map((t) => t.subject)))];

  const filteredTemplates = READY_TEMPLATES.filter((tpl) => {
    const matchesSearch =
      tpl.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || tpl.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
            Kutubxona
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-indigo-500" />
            <span>{t.navTemplates || 'Tayyor Dars Shablonlari'}</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Har xil fanlar bo‘yicha oldindan sozlangan metodologik parametrlar to‘plami.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder || 'Qidirish...'}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Filter by Subject chips */}
      <div className="flex flex-wrap items-center gap-2">
        {subjectsList.map((sub) => (
          <button
            key={sub}
            type="button"
            onClick={() => setSelectedSubject(sub)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedSubject === sub
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
            }`}
          >
            {sub === 'all' ? (t.filterAll || 'Barcha fanlar') : sub}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            currentLang={currentLang}
            onApply={onApplyTemplate}
            t={t}
          />
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="p-12 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          Mos shablon topilmadi. Qidiruv so‘zini o‘zgartiring yoki o‘zingiz noldan yangi prompt yarating!
        </div>
      )}
    </div>
  );
};
