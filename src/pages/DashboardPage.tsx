import React from 'react';
import { Hero } from '../components/Hero';
import { READY_TEMPLATES } from '../data/templates';
import { TemplateCard } from '../components/Templates/TemplateCard';
import { GeneratedPromptResult, LessonTemplate, Language } from '../types';
import {
  Sparkles,
  ArrowRight,
  History,
  FileCode2,
  BookOpen,
  Users,
  CheckCircle,
  Copy,
  Clock,
} from 'lucide-react';

interface DashboardPageProps {
  onStartWizard: () => void;
  onTryDemo: () => void;
  onViewTemplates: () => void;
  onApplyTemplate: (template: LessonTemplate) => void;
  onOpenPrompt: (item: GeneratedPromptResult) => void;
  recentPrompts: GeneratedPromptResult[];
  currentLang: Language;
  t: Record<string, string>;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onStartWizard,
  onTryDemo,
  onViewTemplates,
  onApplyTemplate,
  onOpenPrompt,
  recentPrompts,
  currentLang,
  t,
}) => {
  return (
    <div className="space-y-10 animate-fade-in pb-12">
      {/* Hero */}
      <Hero
        onStartWizard={onStartWizard}
        onTryDemo={onTryDemo}
        onViewTemplates={onViewTemplates}
        t={t}
      />

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">100%</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            Classroom-ready tayyorlik
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400">2 ta</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            Claude & Gemini arxitekturasi
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">12+</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            Maktab fanlari va metodlar
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">4 darajali</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            Differensial topshiriqlar
          </div>
        </div>
      </div>

      {/* Featured Templates */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>{t.quickStart || 'Ommabop Dars Shablonlari'}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              1-klik orqali to‘liq o‘quv rejasi parametrlarini yuklang:
            </p>
          </div>
          <button
            type="button"
            onClick={onViewTemplates}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Barchasini ko‘rish</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {READY_TEMPLATES.slice(0, 3).map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              currentLang={currentLang}
              onApply={onApplyTemplate}
              t={t}
            />
          ))}
        </div>
      </div>

      {/* Recent Prompts History if any */}
      {recentPrompts && recentPrompts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <History className="w-4 h-4 text-indigo-500" />
              <span>{t.recentPrompts || 'Yaqinda yaratilgan promptlar'}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {recentPrompts.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenPrompt(item)}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 cursor-pointer transition-all shadow-xs"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                    {item.subject} • {item.grade}-sinf
                  </span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">
                  {item.topic}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
                    {item.aiTarget.toUpperCase()}
                  </span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
                    Ochish <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
