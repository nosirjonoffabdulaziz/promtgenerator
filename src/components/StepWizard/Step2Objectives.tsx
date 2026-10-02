import React from 'react';
import { TeacherLessonInput } from '../../types';
import { Target, Sparkles, Plus, Check } from 'lucide-react';

interface Step2Props {
  formData: TeacherLessonInput;
  onChange: (fields: Partial<TeacherLessonInput>) => void;
  t: Record<string, string>;
}

export const Step2Objectives: React.FC<Step2Props> = ({ formData, onChange, t }) => {
  const quickPills = [
    'Bilim berish',
    'Tushuntirish',
    'Amaliyot',
    'Mustahkamlash',
    'Takrorlash',
    'Imtihonga tayyorlash',
    'Olimpiadaga tayyorlash',
    'Nazorat',
  ];

  const bloomDimensions = [
    { id: 'Knowledge', name: 'Bilish (Knowledge)', desc: 'Faktlar, formulalar va asosiy terminlarni eslash' },
    { id: 'Understanding', name: 'Tushunish (Understanding)', desc: 'Mazmunini o‘z so‘zlari bilan tushuntirib bera olish' },
    { id: 'Application', name: 'Qo‘llash (Application)', desc: 'Yangi masalalar va vaziyatlarda amaliy qo‘llash' },
    { id: 'Analysis', name: 'Tahlil (Analysis)', desc: 'Qismlarga ajratish, taqqoslash va qonuniyatlarni topish' },
    { id: 'Evaluation', name: 'Baholash (Evaluation)', desc: 'Qarorlar qabul qilish, xatolarni aniqlash va baho berish' },
    { id: 'Creation', name: 'Yaratish (Creation)', desc: 'Yangi yechim, model yoki ijodiy mahsulot ishlab chiqish' },
  ];

  const togglePill = (pill: string) => {
    const current = formData.objectivePills || [];
    const exists = current.includes(pill);
    const updated = exists ? current.filter((p) => p !== pill) : [...current, pill];
    onChange({ objectivePills: updated });
  };

  const toggleBloom = (dimId: string) => {
    const current = formData.bloomTaxonomy || [];
    const exists = current.includes(dimId);
    const updated = exists ? current.filter((d) => d !== dimId) : [...current, dimId];
    onChange({ bloomTaxonomy: updated });
  };

  const insertObjectiveTemplate = (templateText: string) => {
    const current = formData.objectivesText ? formData.objectivesText + ' ' : '';
    onChange({ objectivesText: current + templateText });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Main Textarea */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-500" />
            <span>{t.lblObjectivesText || 'Dars oxirida o‘quvchi nimani bilishi yoki bajara olishi kerak?'}</span>
          </label>
          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> SMART maqsad
          </span>
        </div>

        <textarea
          rows={4}
          value={formData.objectivesText}
          onChange={(e) => onChange({ objectivesText: e.target.value })}
          placeholder={`Masalan: O‘quvchi mavzuning asosiy formulasini yoddan aytadi, diskriminantni xatosiz hisoblaydi va guruhda murakkab masalani mustaqil yechadi...`}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
        />

        {/* Quick insertion chips */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Namuna iboralar:
          </span>
          <button
            type="button"
            onClick={() => insertObjectiveTemplate('Mavzuning asosiy mohiyatini chuqur tushunib yetish;')}
            className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
          >
            + Mohiyatini tushunish
          </button>
          <button
            type="button"
            onClick={() => insertObjectiveTemplate('Amaliy formulalarni mustaqil masalalarga to‘g‘ri tatbiq eta olish;')}
            className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
          >
            + Amaliyotda qo‘llash
          </button>
          <button
            type="button"
            onClick={() => insertObjectiveTemplate('Mantiqiy xulosalar chiqarish va jamoada o‘z fikrini himoya qilish;')}
            className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
          >
            + Fikrni himoya qilish
          </button>
        </div>
      </div>

      {/* Quick Objective Pills */}
      <div>
        <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
          {t.lblObjectivePills || 'Tezkor maqsad yo‘nalishlari'}
        </label>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
          Kerakli yo‘nalishlarni tanlang. AI bularni ilmiy ta’limiy maqsadlar tizimiga avtomatik aylantiradi.
        </p>

        <div className="flex flex-wrap gap-2.5">
          {quickPills.map((pill) => {
            const isSelected = (formData.objectivePills || []).includes(pill);
            return (
              <button
                key={pill}
                type="button"
                onClick={() => togglePill(pill)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                {isSelected ? <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> : <Plus className="w-3.5 h-3.5 opacity-60" />}
                <span>{pill}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bloom's Taxonomy Dimensions */}
      <div>
        <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
          {t.lblBloomTaxonomy || 'Bloom taksonomiyasi darajalari'}
        </label>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
          Dars qaysi tafakkur bosqichlarini rivojlantirishi kerakligini belgilang:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {bloomDimensions.map((dim) => {
            const isSelected = (formData.bloomTaxonomy || []).includes(dim.id);
            return (
              <div
                key={dim.id}
                onClick={() => toggleBloom(dim.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/60 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-xs font-bold ${
                      isSelected
                        ? 'text-indigo-700 dark:text-indigo-300'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {dim.name}
                  </span>
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center ${
                      isSelected
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  {dim.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
