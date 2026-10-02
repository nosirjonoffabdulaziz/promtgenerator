import React from 'react';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { TeacherLessonInput } from '../types';
import { TEACHING_METHODS } from '../data/methods';
import { CLASSROOM_GAMES } from '../data/games';

interface SmartSuggestionsProps {
  formData: TeacherLessonInput;
  onApplySuggestions: (updated: Partial<TeacherLessonInput>) => void;
  t: Record<string, string>;
}

export const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({
  formData,
  onApplySuggestions,
  t,
}) => {
  const { subject, topic, grade } = formData;
  if (!subject && !topic) return null;

  // Compute smart suggestions based on subject, topic, grade
  const subjectLower = (subject || '').toLowerCase();

  let recommendedMethods: string[] = ['gamification', 'quiz', 'group_work'];
  let recommendedGame = 'quiz_battle';
  let recommendedAssessment = 'Formative quiz (5 savol) + Doska rubrikasi';
  let pedagogyTip = 'Ushbu mavzuda o‘quvchilar passiv tinglovchi bo‘lib qolmasligi uchun jamoaviy bellashuv juda samarali.';

  if (subjectLower.includes('matematik') || subjectLower.includes('algebra') || subjectLower.includes('geometr')) {
    recommendedMethods = ['problem_solving', 'gamification', 'competition', 'quiz'];
    recommendedGame = 'quiz_battle';
    recommendedAssessment = '5 ta differensial tenglama va qadamli yechim rubrikasi';
    pedagogyTip = 'Hisoblash xatolarini kamaytirish uchun guruhlarda bir-birining ishini tekshirish (Peer-review) metodidan foydalaning.';
  } else if (subjectLower.includes('fizik') || subjectLower.includes('kimyo')) {
    recommendedMethods = ['experiment', 'problem_solving', 'concept_map', 'pair_work'];
    recommendedGame = 'escape_room';
    recommendedAssessment = 'Formulalar va tajriba xulosasi bo‘yicha 4 ta tahliliy savol';
    pedagogyTip = 'Formula va abstrakt qonunlarni kundalik maishiy turmushdagi aniq tajribalar bilan bog‘lab tushuntiring.';
  } else if (subjectLower.includes('biologiy') || subjectLower.includes('tabiat')) {
    recommendedMethods = ['concept_map', 'educational_games', 'flashcards', 'exit_ticket'];
    recommendedGame = 'matching_game';
    recommendedAssessment = 'Organoidlar va jarayonlarni xaritaga joylashtirish testi';
    pedagogyTip = 'Biologik jarayonlarni qadam-baqadam animatsion metafora bilan tushuntirish yodda qolishni 3 barobar oshiradi.';
  } else if (subjectLower.includes('informatik') || subjectLower.includes('dastur')) {
    recommendedMethods = ['problem_solving', 'speed_challenge', 'pair_work', 'gamification'];
    recommendedGame = 'boss_battle';
    recommendedAssessment = 'Sikllar xatosini (Bug) topish va kodni optimallashtirish testi';
    pedagogyTip = 'Nazariyani qisqa tutib, 70% vaqtni kompyuterda jonli kod yozish va natijani ko‘rishga bag‘ishlang.';
  } else if (subjectLower.includes('ingliz') || subjectLower.includes('til') || subjectLower.includes('rus')) {
    recommendedMethods = ['role_play', 'pair_work', 'think_pair_share', 'flashcards'];
    recommendedGame = 'speed_round';
    recommendedAssessment = 'Haqiqiy hayotiy vaziyatdagi 2 daqiqalik juftlik dialogi';
    pedagogyTip = 'Grammatik qoidani yodlatmasdan, o‘quvchini dialogda real kontekst orqali gapirtiring.';
  }

  const handleApply = () => {
    onApplySuggestions({
      aiAutoSelectMethods: false,
      selectedMethods: recommendedMethods,
      aiAutoSelectGame: false,
      selectedGames: [recommendedGame],
    });
  };

  const getMethodName = (id: string) => {
    const m = TEACHING_METHODS.find((item) => item.id === id);
    return m ? m.name.uz : id;
  };

  const getGameName = (id: string) => {
    const g = CLASSROOM_GAMES.find((item) => item.id === id);
    return g ? g.name.uz : id;
  };

  return (
    <div className="p-5 mb-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-purple-500/10 border border-indigo-200/50 dark:border-indigo-800/50 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20 shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              {t.smartSuggestionsTitle || '💡 AI Tavsiyalari'}
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800">
                {subject || 'Dars'} • {grade}-sinf
              </span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              {pedagogyTip}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleApply}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer"
        >
          <Check className="w-4 h-4" />
          <span>{t.btnUseSuggestions || 'Tavsiyalarni qo‘llash'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 pt-3 border-t border-indigo-100/60 dark:border-indigo-900/40 text-xs">
        <div className="bg-white/70 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
          <span className="font-semibold text-slate-500 dark:text-slate-400 block mb-1">
            🎯 Tavsiya etilgan metodlar:
          </span>
          <div className="flex flex-wrap gap-1">
            {recommendedMethods.map((id) => (
              <span
                key={id}
                className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-medium"
              >
                {getMethodName(id)}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white/70 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
          <span className="font-semibold text-slate-500 dark:text-slate-400 block mb-1">
            🎮 Eng mos o‘yin:
          </span>
          <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-semibold">
            {getGameName(recommendedGame)}
          </span>
        </div>

        <div className="bg-white/70 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
          <span className="font-semibold text-slate-500 dark:text-slate-400 block mb-1">
            📊 Baholash formati:
          </span>
          <span className="text-slate-700 dark:text-slate-300 font-medium leading-snug">
            {recommendedAssessment}
          </span>
        </div>
      </div>
    </div>
  );
};
