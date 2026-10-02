import React from 'react';
import { Language, AITarget, QualityLevel } from '../types';
import { AppSettings } from '../services/storageService';
import { Settings, Globe, Moon, Sun, Cpu, ShieldCheck, Database, KeyRound, Sparkles } from 'lucide-react';

interface SettingsPageProps {
  settings: AppSettings;
  onUpdateSettings: (updates: Partial<AppSettings>) => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onClearAllData: () => void;
  t: Record<string, string>;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  settings,
  onUpdateSettings,
  currentLang,
  onLanguageChange,
  theme,
  onToggleTheme,
  onClearAllData,
  t,
}) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-fade-in">
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
          Konfiguratsiya
        </span>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-500" />
          <span>{t.navSettings || 'Tizim Sozlamalari'}</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Til, interfeys mavzusi va standart AI sozlamalarini boshqaring.
        </p>
      </div>

      {/* Language & Theme */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-indigo-500" />
          <span>Til va Vizual interfeys</span>
        </h3>

        {/* Language buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
              Dastur tili
            </span>
            <span className="text-[11px] text-slate-500">Standart til: O‘zbek tili</span>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => onLanguageChange('uz')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                currentLang === 'uz'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              🇺🇿 O‘zbekcha
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('ru')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                currentLang === 'ru'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              🇷🇺 Русский
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                currentLang === 'en'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        {/* Theme toggle */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
              Tungi / Kunduzgi rejim (Theme)
            </span>
            <span className="text-[11px] text-slate-500">Hozirgi: {theme === 'dark' ? 'Qorong‘i (Dark)' : 'Yorug‘ (Light)'}</span>
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold cursor-pointer"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Kunduzgi rejimga o‘tish</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-600" />
                <span>Tungi rejimga o‘tish</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Defaults */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-500" />
          <span>Birlamchi AI Tanlovi</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {(['both', 'claude', 'google-ai-studio'] as AITarget[]).map((tgt) => (
            <button
              key={tgt}
              type="button"
              onClick={() => onUpdateSettings({ defaultAITarget: tgt })}
              className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                settings.defaultAITarget === tgt
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20'
                  : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {tgt === 'both' ? 'Ikkala AI (Tavsiya)' : tgt === 'claude' ? 'Claude' : 'Google AI Studio'}
            </button>
          ))}
        </div>
      </div>

      {/* Architecture Readiness Overview (Future Ready Architecture - Rule 40) */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900/40 border border-indigo-200/50 dark:border-indigo-800/60 space-y-3">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Kelajak uchun tayyor arxitektura (Future-Ready EdTech Modular Architecture)</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Ushbu dastur MVP bosqichida to‘liq avtonom ishlaydi (hech qanday tashqi API kalit talab etilmaydi). Modulli arxitektura orqali kelgusida quyidagilarni oson integratsiya qilishga 100% tayyor:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-700 dark:text-slate-300 pt-1">
          <div className="p-2 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
            🔥 Firebase Auth & Firestore
          </div>
          <div className="p-2 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
            🤖 Direct Gemini / Claude API
          </div>
          <div className="p-2 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
            🏫 Maktab va o‘qituvchi akkauntlari
          </div>
          <div className="p-2 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
            📊 Sinf tahlili va real baholar
          </div>
          <div className="p-2 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
            📄 Avtomatik PDF & Word eksport
          </div>
          <div className="p-2 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
            🎯 O‘quvchi portali va QR viktorinalar
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="p-6 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 flex items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold text-rose-800 dark:text-rose-300">
            Barcha lokal ma’lumotlarni tozalash
          </h4>
          <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-0.5">
            Saqlangan qoralamalar va promptlar tarixini o‘chiradi.
          </p>
        </div>
        <button
          type="button"
          onClick={onClearAllData}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer"
        >
          Tozalash
        </button>
      </div>
    </div>
  );
};
