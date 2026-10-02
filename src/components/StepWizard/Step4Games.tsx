import React from 'react';
import { TeacherLessonInput } from '../../types';
import { CLASSROOM_GAMES } from '../../data/games';
import { Gamepad2, Wand2, Check } from 'lucide-react';

interface Step4Props {
  formData: TeacherLessonInput;
  onChange: (fields: Partial<TeacherLessonInput>) => void;
  t: Record<string, string>;
}

export const Step4Games: React.FC<Step4Props> = ({ formData, onChange, t }) => {
  const toggleGame = (id: string) => {
    const current = formData.selectedGames || [];
    const exists = current.includes(id);
    const updated = exists ? current.filter((g) => g !== id) : [...current, id];
    onChange({ selectedGames: updated, aiAutoSelectGame: false });
  };

  const handleAutoSelect = (checked: boolean) => {
    onChange({ aiAutoSelectGame: checked });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Auto AI game selection banner */}
      <div
        onClick={() => handleAutoSelect(!formData.aiAutoSelectGame)}
        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
          formData.aiAutoSelectGame
            ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/70 ring-2 ring-indigo-500/20'
            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20">
            <Wand2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{t.lblAiAutoGame || 'AI o‘zi mos o‘yin tanlasin'}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 font-semibold">
                Eng ommabop
              </span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              "{formData.subject}" va "{formData.topic || 'Mavzu'}" uchun eng yuqori qiziqish uyg‘otadigan o‘yin mexanikasini o‘zi loyihalaydi.
            </p>
          </div>
        </div>

        <input
          type="checkbox"
          checked={formData.aiAutoSelectGame}
          onChange={(e) => handleAutoSelect(e.target.checked)}
          className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-emerald-500" />
            <span>Sinf o‘yinlaridan bir yoki bir nechtasini tanlang:</span>
          </label>
          {formData.selectedGames?.length > 0 && !formData.aiAutoSelectGame && (
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
              {formData.selectedGames.length} ta o‘yin tanlandi
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CLASSROOM_GAMES.map((game) => {
            const isSelected = (formData.selectedGames || []).includes(game.id);
            const isDisabled = formData.aiAutoSelectGame;

            return (
              <div
                key={game.id}
                onClick={() => {
                  if (!isDisabled) toggleGame(game.id);
                }}
                className={`p-3.5 rounded-xl border transition-all text-left select-none relative ${
                  isDisabled
                    ? 'opacity-40 pointer-events-none border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900'
                    : isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/60 ring-2 ring-indigo-500/20 shadow-sm cursor-pointer'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{game.icon}</span>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        {game.name.uz}
                      </h5>
                      <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
                        {game.suitableFor}
                      </span>
                    </div>
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
                  {game.description.uz}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
