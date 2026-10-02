import React from 'react';
import { GeneratedPromptResult } from '../types';
import { PromptPreview } from '../components/PromptPreview/PromptPreview';
import { Sparkles, ArrowRight, PlayCircle } from 'lucide-react';

interface PreviewPageProps {
  currentResult: GeneratedPromptResult | null;
  onModify: (modifierKey: string) => void;
  onRegenerate: () => void;
  onStartWizard: () => void;
  onTryDemo: () => void;
  onToast: (type: 'success' | 'warning' | 'error' | 'info', msg: string) => void;
  t: Record<string, string>;
}

export const PreviewPage: React.FC<PreviewPageProps> = ({
  currentResult,
  onModify,
  onRegenerate,
  onStartWizard,
  onTryDemo,
  onToast,
  t,
}) => {
  if (!currentResult) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto shadow-md">
          <Sparkles className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Hozircha faol prompt mavjud emas
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            Dars parametrlarini kiritib yangi prompt generatsiya qiling yoki bir marta bosish orqali namunaviy demodan foydalaning.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onStartWizard}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <span>🚀 Yangi prompt yaratish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onTryDemo}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold text-xs hover:border-indigo-400 transition-all cursor-pointer"
          >
            <PlayCircle className="w-4 h-4 text-amber-500" />
            <span>🎯 Namunaviy demo bilan ko‘rish</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-12 animate-fade-in">
      <PromptPreview
        result={currentResult}
        onModify={onModify}
        onRegenerate={onRegenerate}
        onToast={onToast}
        t={t}
      />
    </div>
  );
};
