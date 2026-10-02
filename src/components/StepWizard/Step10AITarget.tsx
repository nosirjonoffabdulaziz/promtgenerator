import React from 'react';
import { TeacherLessonInput, AITarget, QualityLevel } from '../../types';
import { Bot, Cpu, Zap, Flame, Gem, Sparkles, Rocket } from 'lucide-react';

interface Step10Props {
  formData: TeacherLessonInput;
  onChange: (fields: Partial<TeacherLessonInput>) => void;
  onGenerate: () => void;
  t: Record<string, string>;
}

export const Step10AITarget: React.FC<Step10Props> = ({
  formData,
  onChange,
  onGenerate,
  t,
}) => {
  const aiTargets: {
    id: AITarget;
    title: string;
    model: string;
    desc: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      id: 'claude',
      title: 'Anthropic Claude',
      model: 'Claude 3.5 Sonnet / Opus',
      desc: 'Chuqur pedagogik asoslash, kognitiv yondashuv, mulohazali rubrika va XML-tegli tuzilma.',
      icon: <Bot className="w-6 h-6 text-amber-500" />,
      color: 'hover:border-amber-500',
    },
    {
      id: 'google-ai-studio',
      title: 'Google AI Studio',
      model: 'Gemini 2.5 Flash / Pro',
      desc: 'Modulli struktura, o‘qituvchining jonli replikalari, sinf o‘yinlari va jadvalli aniq tizim.',
      icon: <Cpu className="w-6 h-6 text-blue-500" />,
      color: 'hover:border-blue-500',
    },
    {
      id: 'both',
      title: 'Ikkala Platforma (BOTH)',
      model: 'Claude + Google AI Studio',
      desc: 'Har ikki AI dvigateli uchun alohida optimallashtirilgan ikkita to‘liq professional prompt generatsiyasi.',
      icon: <Sparkles className="w-6 h-6 text-indigo-500" />,
      color: 'hover:border-indigo-500',
    },
  ];

  const qualityLevels: {
    id: QualityLevel;
    title: string;
    badge: string;
    desc: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'quick',
      title: '⚡ Tezkor (Quick)',
      badge: 'Tezkor tayyorlov',
      desc: 'Qisqa va ixcham prompt. Shoshilinch darslar uchun eng muhim bosqichlar.',
      icon: <Zap className="w-4 h-4 text-emerald-500" />,
    },
    {
      id: 'standard',
      title: 'Standart (Standard)',
      badge: 'To‘liq dars',
      desc: 'Klassik dars rejasi, mashqlar va test savollari.',
      icon: <Sparkles className="w-4 h-4 text-blue-500" />,
    },
    {
      id: 'advanced',
      title: '🔥 Ilg‘or (Advanced)',
      badge: 'Interaktiv',
      desc: 'Interaktiv o‘yinlar, differensial topshiriqlar va metodik tahlil.',
      icon: <Flame className="w-4 h-4 text-orange-500" />,
    },
    {
      id: 'expert',
      title: '💎 Ekspert (Expert)',
      badge: 'Tavsiya etiladi',
      desc: 'Maksimal darajada batafsil, hech qanday quruq gaplarsiz, to‘liq dars ssenariysi.',
      icon: <Gem className="w-4 h-4 text-purple-500" />,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* AI Target Selector */}
      <div>
        <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
          {t.lblAiTarget || 'Qaysi AI platformasi uchun optimallashtirilsin?'} *
        </label>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Har bir AI modelining o‘ziga xos arxitekturasi va eng yaxshi javob berish uslubi hisobga olinadi:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {aiTargets.map((target) => {
            const isSelected = formData.aiTarget === target.id;
            return (
              <div
                key={target.id}
                onClick={() => onChange({ aiTarget: target.id })}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left select-none relative ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/60 ring-2 ring-indigo-500/20 shadow-md'
                    : `border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 ${target.color}`
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">{target.icon}</div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {target.title}
                    </h4>
                    <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                      {target.model}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {target.desc}
                </p>
                {isSelected && (
                  <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
                    Tanlandi
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quality Level Selector */}
      <div>
        <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
          {t.lblQualityLevel || 'Prompt sifati va tafsilot darajasi'}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {qualityLevels.map((lvl) => {
            const isSelected = formData.qualityLevel === lvl.id;
            return (
              <div
                key={lvl.id}
                onClick={() => onChange({ qualityLevel: lvl.id })}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/60 ring-2 ring-indigo-500/20 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    {lvl.icon}
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                      {lvl.title}
                    </h5>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  {lvl.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Card before generation */}
      <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            Tayyor parametrlar qisqacha:
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {formData.subject} • {formData.grade}-sinf • "{formData.topic || 'Mavzu'}" • {formData.duration} daqiqa • {formData.studentCount} o‘quvchi ({formData.level})
          </p>
        </div>

        <button
          type="button"
          onClick={onGenerate}
          className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <Rocket className="w-5 h-5" />
          <span>{t.btnGenerate || '🚀 PROFESSIONAL PROMPT YARATISH'}</span>
        </button>
      </div>
    </div>
  );
};
