import React, { useState } from 'react';
import {
  Copy,
  Check,
  Download,
  Printer,
  RotateCw,
  Sparkles,
  Gamepad2,
  Brain,
  BookOpen,
  FileText,
  Trophy,
  Smile,
  Flame,
} from 'lucide-react';

interface PromptActionsProps {
  onCopy: () => void;
  onDownloadTxt: () => void;
  onDownloadMd: () => void;
  onPrintPdf: () => void;
  onRegenerate: () => void;
  onApplyModifier: (modifierKey: string) => void;
  appliedModifiers: string[];
  t: Record<string, string>;
  copied: boolean;
}

export const PromptActions: React.FC<PromptActionsProps> = ({
  onCopy,
  onDownloadTxt,
  onDownloadMd,
  onPrintPdf,
  onRegenerate,
  onApplyModifier,
  appliedModifiers,
  t,
  copied,
}) => {
  const modifiers = [
    { key: 'interactive', label: t.modInteractive || '✨ Ko‘proq interaktivlik', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { key: 'games', label: t.modGames || '🎮 Ko‘proq o‘yinlar', icon: <Gamepad2 className="w-3.5 h-3.5" /> },
    { key: 'harder', label: t.modHarder || '🧠 Qiyinlashtirish', icon: <Brain className="w-3.5 h-3.5" /> },
    { key: 'exercises', label: t.modExercises || '📚 Mashqlarni ko‘paytirish', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { key: 'tests', label: t.modTests || '📝 Testlarni ko‘paytirish', icon: <FileText className="w-3.5 h-3.5" /> },
    { key: 'competition', label: t.modCompetition || '🏆 Musobaqa qo‘shish', icon: <Trophy className="w-3.5 h-3.5" /> },
    { key: 'simplify', label: t.modSimplify || '👶 Soddalashtirish', icon: <Smile className="w-3.5 h-3.5" /> },
    { key: 'advanced', label: t.modAdvanced || '🔥 Chuqurlashtirish', icon: <Flame className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-4">
      {/* Primary Action Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Big Copy Button */}
        <button
          type="button"
          onClick={onCopy}
          className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md cursor-pointer ${
            copied
              ? 'bg-emerald-600 text-white shadow-emerald-600/30'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? (t.btnCopied || '✅ Nusxalandi!') : (t.btnCopyPrompt || '📋 Promptni nusxalash')}</span>
        </button>

        {/* Export & Regenerate Group */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onRegenerate}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
            title={t.btnRegenerate || 'Qayta yaratish'}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{t.btnRegenerate || 'Qayta yaratish'}</span>
          </button>

          <button
            type="button"
            onClick={onDownloadTxt}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>TXT</span>
          </button>

          <button
            type="button"
            onClick={onDownloadMd}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Markdown (.md)</span>
          </button>

          <button
            type="button"
            onClick={onPrintPdf}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t.btnDownloadPdf || 'Chop etish / PDF'}</span>
          </button>
        </div>
      </div>

      {/* Quick Modifier Badges */}
      <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800/80">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2.5">
          🎯 Promptni darhol takomillashtirish va kuchaytirish tugmalari:
        </span>
        <div className="flex flex-wrap gap-2">
          {modifiers.map((mod) => {
            const isActive = appliedModifiers.includes(mod.key);
            return (
              <button
                key={mod.key}
                type="button"
                onClick={() => onApplyModifier(mod.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  isActive
                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300'
                }`}
              >
                {mod.icon}
                <span>{mod.label}</span>
                {isActive && <Check className="w-3 h-3 ml-0.5" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
