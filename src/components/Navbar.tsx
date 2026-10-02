import React from 'react';
import { Language } from '../types';
import {
  Sun,
  Moon,
  Sparkles,
  Globe,
  Menu,
  X,
  History,
  LayoutTemplate,
  Sliders,
  PlayCircle,
  FileCode2,
} from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  activePage: string;
  onNavigate: (page: string) => void;
  onTryDemo: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  t: Record<string, string>;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  theme,
  onToggleTheme,
  activePage,
  onNavigate,
  onTryDemo,
  onToggleSidebar,
  isSidebarOpen,
  t,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            aria-label="Menyu"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                EDU PROMPT ENGINE
              </span>
              <span className="hidden sm:block text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-wider uppercase">
                EdTech AI Prompt Architecture
              </span>
            </div>
          </button>
        </div>

        {/* Center Quick Nav for desktop */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activePage === 'dashboard'
                ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.navDashboard || 'Bosh sahifa'}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('wizard')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activePage === 'wizard'
                ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.navWizard || 'Prompt Generator'}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('templates')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activePage === 'templates'
                ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.navTemplates || 'Shablonlar'}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('history')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activePage === 'history'
                ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.navHistory || 'Tarix'}
          </button>
        </nav>

        {/* Right Tools: Demo, Lang, Theme */}
        <div className="flex items-center gap-2">
          {/* Demo Button */}
          <button
            type="button"
            onClick={onTryDemo}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 text-xs font-bold transition-all cursor-pointer"
            title="Matematika (Kvadrat tenglamalar) tayyor demo ma’lumotlari bilan sinash"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>{t.heroDemo || '🎯 Demo'}</span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => onLanguageChange('uz')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentLang === 'uz'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              UZ
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('ru')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentLang === 'ru'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              RU
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentLang === 'en'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              EN
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label={t.toggleTheme || 'Mavzuni almashtirish'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
