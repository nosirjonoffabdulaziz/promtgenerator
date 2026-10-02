import React from 'react';
import { TeacherLessonInput } from '../../types';
import { TEACHING_METHODS } from '../../data/methods';
import { Wand2, Check, Sparkles } from 'lucide-react';

interface Step3Props {
  formData: TeacherLessonInput;
  onChange: (fields: Partial<TeacherLessonInput>) => void;
  t: Record<string, string>;
}

export const Step3Methods: React.FC<Step3Props> = ({ formData, onChange, t }) => {
  const toggleMethod = (id: string) => {
    const current = formData.selectedMethods || [];
    const exists = current.includes(id);
    const updated = exists ? current.filter((m) => m !== id) : [...current, id];
    onChange({ selectedMethods: updated, aiAutoSelectMethods: false });
  };

  const handleAutoSelect = (checked: boolean) => {
    onChange({ aiAutoSelectMethods: checked });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Auto AI selection banner */}
      <div
        onClick={() => handleAutoSelect(!formData.aiAutoSelectMethods)}
        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
          formData.aiAutoSelectMethods
            ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/70 ring-2 ring-indigo-500/20'
            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/20">
            <Wand2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{t.lblAiAutoMethods || 'AI o‘zi eng mos metodlarni tanlasin'}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-semibold">
                Smart Pedagog
              </span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Tanlangan fan, mavzu, sinf (${formData.grade}-sinf) va maqsadlar asosida ideal metodologik zanjirni shakllantiradi.
            </p>
          </div>
        </div>

        <input
          type="checkbox"
          checked={formData.aiAutoSelectMethods}
          onChange={(e) => handleAutoSelect(e.target.checked)}
          className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Yoki quyidagi metodlardan o‘zingiz tanlang ({formData.selectedMethods?.length || 0} ta tanlandi):
          </label>
          {formData.selectedMethods?.length > 0 && !formData.aiAutoSelectMethods && (
            <button
              type="button"
              onClick={() => onChange({ selectedMethods: [] })}
              className="text-xs text-rose-500 hover:underline cursor-pointer"
            >
              Tanlovni tozalash
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TEACHING_METHODS.map((method) => {
            const isSelected = (formData.selectedMethods || []).includes(method.id);
            const isDisabled = formData.aiAutoSelectMethods;

            return (
              <div
                key={method.id}
                onClick={() => {
                  if (!isDisabled) toggleMethod(method.id);
                }}
                className={`p-3.5 rounded-xl border transition-all text-left select-none ${
                  isDisabled
                    ? 'opacity-40 pointer-events-none border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900'
                    : isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/60 ring-2 ring-indigo-500/20 shadow-sm cursor-pointer'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{method.icon}</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                      {method.name.uz}
                    </span>
                  </div>
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {method.description.uz}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
