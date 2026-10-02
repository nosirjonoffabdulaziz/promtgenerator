import React from 'react';
import { Sparkles, ArrowRight, PlayCircle, ShieldCheck, CheckCircle2, Zap, Layers, Award } from 'lucide-react';

interface HeroProps {
  onStartWizard: () => void;
  onTryDemo: () => void;
  onViewTemplates: () => void;
  t: Record<string, string>;
}

export const Hero: React.FC<HeroProps> = ({
  onStartWizard,
  onTryDemo,
  onViewTemplates,
  t,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-transparent border border-indigo-200/40 dark:border-indigo-800/40 p-6 sm:p-10 lg:p-12 mb-8 shadow-sm">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-indigo-500" />
          <span>Claude 3.5 Sonnet & Google AI Studio Gemini 2.5 uchun tayyor</span>
        </div>

        {/* Big Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          {t.heroTitle || 'AI bilan mukammal dars rejangizni yarating'}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          {t.heroSubtitle ||
            'Fan, mavzu va sinfni kiriting. EDU PROMPT ENGINE siz uchun Claude va Google AI Studio’da ishlatishga tayyor professional prompt yaratadi.'}
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <button
            type="button"
            onClick={onStartWizard}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>{t.heroCta || '🚀 Prompt yaratish'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onTryDemo}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-slate-800 dark:text-slate-200 font-bold text-sm shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <PlayCircle className="w-4 h-4 text-amber-500" />
            <span>{t.heroDemo || '🎯 Demo bilan sinash'}</span>
          </button>

          <button
            type="button"
            onClick={onViewTemplates}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
          >
            <span>Tayyor shablonlar (6 ta)</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200/60 dark:border-slate-800/80 text-left text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>100% Amaliy savol va javoblar</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Zap className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Minutma-minut vaqt rejasi</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Layers className="w-4 h-4 text-blue-500 shrink-0" />
            <span>4 bosqichli differensiatsiya</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Award className="w-4 h-4 text-purple-500 shrink-0" />
            <span>Interaktiv o‘yinlar va rubrika</span>
          </div>
        </div>
      </div>
    </div>
  );
};
