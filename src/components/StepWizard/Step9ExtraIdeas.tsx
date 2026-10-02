import React from 'react';
import { TeacherLessonInput } from '../../types';
import { Lightbulb, Sparkles } from 'lucide-react';

interface Step9Props {
  formData: TeacherLessonInput;
  onChange: (fields: Partial<TeacherLessonInput>) => void;
  t: Record<string, string>;
}

export const Step9ExtraIdeas: React.FC<Step9Props> = ({ formData, onChange, t }) => {
  const exampleIdeas = [
    'Men darsni to‘liq interaktiv o‘yin shaklida o‘tkazmoqchiman.',
    'Amaliy laboratoriya tajribasi yoki ko‘rgazmali tajriba qo‘shilsin.',
    'O‘quvchilar 4 ta teng kuchli jamoada estafeta usulida bellashsin.',
    'Telefon orqali ishlaydigan (Kahoot yoki QR-kod) topshiriqlar bo‘lsin.',
    'Mavzu hozirgi zamonaviy sun’iy intellekt va real hayot bilan bog‘lansin.',
    'O‘quvchilar hayratlanishi uchun qiziqarli ilmiy paradoks bilan boshlansin.',
  ];

  const appendIdea = (idea: string) => {
    const current = formData.extraIdeas ? formData.extraIdeas.trim() + '\n' : '';
    onChange({ extraIdeas: current + '• ' + idea });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>{t.lblExtraIdeas || 'O‘zingizning g‘oya va talablaringizni yozing...'}</span>
          </label>
          <span className="text-xs text-slate-500 dark:text-slate-400">Ixtiyoriy, lekin juda tavsiya etiladi</span>
        </div>

        <textarea
          rows={6}
          value={formData.extraIdeas}
          onChange={(e) => onChange({ extraIdeas: e.target.value })}
          placeholder={
            t.lblExtraIdeasPlaceholder ||
            'Masalan: Men darsni jamoalar musobaqasi sifatida o‘tkazmoqchiman. Laboratoriya tajribasi qo‘shilsin. Doskada chiroyli sxemalar chizilsin. Hamma o‘quvchi jalb etilsin...'
          }
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
        />
      </div>

      {/* Quick click suggestions */}
      <div>
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          Tezkor g‘oya shablonlari (Bosing va matnga qo‘shing):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {exampleIdeas.map((idea, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => appendIdea(idea)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:bg-indigo-50 hover:border-indigo-300 dark:hover:bg-indigo-950/60 dark:hover:border-indigo-800 text-slate-700 dark:text-slate-300 text-left text-xs transition-all cursor-pointer"
            >
              + {idea}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
