import React from 'react';
import {
  LayoutDashboard,
  Sparkles,
  FileCode2,
  LayoutTemplate,
  History,
  Settings,
  HelpCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  PlayCircle,
} from 'lucide-react';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
  historyCount: number;
  onTryDemo: () => void;
  t: Record<string, string>;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onNavigate,
  isOpen,
  onClose,
  historyCount,
  onTryDemo,
  t,
}) => {
  const navItems = [
    {
      id: 'dashboard',
      label: t.navDashboard || 'Bosh sahifa',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: 'wizard',
      label: t.navWizard || 'Prompt Generator',
      icon: <Sparkles className="w-5 h-5" />,
      badge: 'Yangi',
      badgeColor: 'bg-indigo-500 text-white',
    },
    {
      id: 'preview',
      label: t.navPreview || 'Prompt Ko‘rinishi',
      icon: <FileCode2 className="w-5 h-5" />,
    },
    {
      id: 'templates',
      label: t.navTemplates || 'Tayyor Shablonlar',
      icon: <LayoutTemplate className="w-5 h-5" />,
      badge: '6 ta',
      badgeColor: 'bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300',
    },
    {
      id: 'history',
      label: t.navHistory || 'Tarix',
      icon: <History className="w-5 h-5" />,
      badge: historyCount > 0 ? `${historyCount}` : undefined,
      badgeColor: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300',
    },
    {
      id: 'settings',
      label: t.navSettings || 'Sozlamalar',
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed md:sticky top-0 md:top-16 z-40 h-full md:h-[calc(100vh-4rem)] w-64 border-r border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 transition-transform duration-300 flex flex-col justify-between p-4 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Mobile Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800 md:hidden">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-indigo-600" />
              <span className="font-bold text-sm">EDU PROMPT</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-indigo-600 dark:text-indigo-400' : 'opacity-70'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Pro Tips & Quick Demo */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              onTryDemo();
              onClose();
            }}
            className="w-full p-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-indigo-500/10 border border-amber-300/40 dark:border-amber-700/40 text-left hover:scale-[1.01] transition-transform cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-1">
              <PlayCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
                1-Klik Demo sinov
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
              Matematika bo‘yicha to‘liq dars promptini bir zumda sinab ko‘ring.
            </p>
          </button>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="font-semibold block text-slate-700 dark:text-slate-300 mb-0.5">
              💡 Foydali maslahat:
            </span>
            Tayyor promptni nusxalab, bevosita <strong>Claude.ai</strong> yoki <strong>aistudio.google.com</strong>ga yuboring.
          </div>
        </div>
      </aside>
    </>
  );
};
