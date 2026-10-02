/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  TeacherLessonInput,
  GeneratedPromptResult,
  LessonTemplate,
  Language,
  QualityLevel,
} from './types';
import { storageService, INITIAL_FORM_DATA, AppSettings } from './services/storageService';
import { generateLessonPrompt } from './services/promptGenerator';
import { TRANSLATIONS } from './data/translations';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ToastContainer, ToastMessage } from './components/Toast';
import { Modal } from './components/Modal';

import { DashboardPage } from './pages/DashboardPage';
import { WizardPage } from './pages/WizardPage';
import { PreviewPage } from './pages/PreviewPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  // Localization
  const [currentLang, setCurrentLang] = useState<Language>(() => storageService.getLanguage());
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.uz;

  // Theme
  const [theme, setTheme] = useState<'dark' | 'light'>(() => storageService.getTheme());

  // Settings
  const [settings, setSettings] = useState<AppSettings>(() => storageService.getSettings());

  // Navigation
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Form State with Auto-Restore from Draft
  const [formData, setFormData] = useState<TeacherLessonInput>(() => {
    const draft = storageService.getDraft();
    return draft || INITIAL_FORM_DATA;
  });

  // History & Active Generated Result
  const [history, setHistory] = useState<GeneratedPromptResult[]>(() => storageService.getHistory());
  const [currentResult, setCurrentResult] = useState<GeneratedPromptResult | null>(() => {
    const list = storageService.getHistory();
    return list.length > 0 ? list[0] : null;
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals
  const [isConfirmClearOpen, setIsConfirmClearOpen] = useState(false);

  // Initialize theme class on mount
  useEffect(() => {
    storageService.setTheme(theme);
  }, [theme]);

  // Auto-save form draft on change
  useEffect(() => {
    if (settings.autoSaveDraft && formData) {
      storageService.saveDraft(formData);
    }
  }, [formData, settings.autoSaveDraft]);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    storageService.setLanguage(lang);
  };

  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    storageService.setTheme(next);
  };

  const handleUpdateFormData = (updates: Partial<TeacherLessonInput>) => {
    setFormData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  // Reset form to defaults
  const handleResetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    storageService.clearDraft();
    addToast('info', 'Forma tozalandi');
  };

  // Generate Prompt Engine Core Action
  const handleGenerate = () => {
    if (!formData.subject || (formData.subject === 'Boshqa fan' && !formData.customSubject?.trim())) {
      addToast('warning', t.alertRequiredFields || '⚠️ Iltimos, fan, mavzu va sinfni kiriting.');
      return;
    }
    if (!formData.topic || !formData.topic.trim()) {
      addToast('warning', t.alertRequiredFields || '⚠️ Iltimos, fan, mavzu va sinfni kiriting.');
      return;
    }

    try {
      const { claudePrompt, googleAIPrompt } = generateLessonPrompt(formData);

      const newResult: GeneratedPromptResult = {
        id: 'prompt_' + Date.now(),
        createdAt: new Date().toISOString(),
        subject: formData.subject === 'Boshqa fan' && formData.customSubject ? formData.customSubject : formData.subject,
        topic: formData.topic,
        grade: formData.grade,
        aiTarget: formData.aiTarget || 'both',
        qualityLevel: formData.qualityLevel || 'expert',
        claudePrompt,
        googleAIPrompt,
        inputData: { ...formData },
      };

      setCurrentResult(newResult);
      const updatedHistory = storageService.saveToHistory(newResult);
      setHistory(updatedHistory);

      setActivePage('preview');
      addToast('success', t.alertPromptGenerated || '🎉 Professional AI Prompt tayyor!');
    } catch (err) {
      console.error('Generation error', err);
      addToast('error', 'Prompt yaratishda xatolik yuz berdi.');
    }
  };

  // Apply Prompt Modifier (Ko‘proq o‘yinlar, Qiyinlashtirish, etc.)
  const handleApplyModifier = (modifierKey: string) => {
    if (!currentResult) return;

    const currentModifiers = currentResult.inputData.appliedModifiers || [];
    const exists = currentModifiers.includes(modifierKey);
    const updatedModifiers = exists
      ? currentModifiers.filter((m) => m !== modifierKey)
      : [...currentModifiers, modifierKey];

    const updatedInput: TeacherLessonInput = {
      ...currentResult.inputData,
      appliedModifiers: updatedModifiers,
    };

    // Regenerate with the booster modifier
    const { claudePrompt, googleAIPrompt } = generateLessonPrompt(updatedInput);

    const updatedResult: GeneratedPromptResult = {
      ...currentResult,
      claudePrompt,
      googleAIPrompt,
      inputData: updatedInput,
    };

    setCurrentResult(updatedResult);
    const updatedHistory = storageService.saveToHistory(updatedResult);
    setHistory(updatedHistory);

    addToast('success', `✨ Modifikator qo‘llanildi: ${modifierKey}`);
  };

  // Regenerate current result
  const handleRegenerateCurrent = () => {
    if (!currentResult) return;
    handleGenerate();
  };

  // Try Demo Action (Rule 41)
  const handleTryDemo = () => {
    const demoData: TeacherLessonInput = {
      subject: 'Matematika',
      topic: 'Kvadrat tenglamalar va diskriminant usuli',
      grade: 9,
      duration: 45,
      studentCount: 25,
      level: 'Aralash',
      lessonFormat: 'Guruh',
      objectivesText: 'O‘quvchilar kvadrat tenglamaning diskriminant formulasini erkin hisoblaydi, ildizlar sonini aniqlaydi va formuladan foydalanib to‘liq yechim topadi.',
      objectivePills: ['Bilim berish', 'Amaliyot', 'Mustahkamlash'],
      bloomTaxonomy: ['Knowledge', 'Understanding', 'Application', 'Analysis'],
      aiAutoSelectMethods: false,
      selectedMethods: ['gamification', 'group_work', 'quiz', 'problem_solving'],
      aiAutoSelectGame: false,
      selectedGames: ['quiz_battle'],
      exerciseDifficulty: 'Mixed',
      exerciseCount: 10,
      exerciseTypes: ['Problem solving', 'Multiple choice', 'Matching'],
      test: {
        questionCount: 10,
        questionTypes: ['MCQ', 'Short answer'],
        difficulty: 'Mixed',
        hasGradingScale: true,
        gradingScale: [
          { range: '90-100', grade: "5 (A'lo)", description: 'Barcha ildizlarni to‘g‘ri topdi' },
          { range: '70-89', grade: '4 (Yaxshi)', description: 'Tushunchani yaxshi egallagan' },
          { range: '50-69', grade: '3 (Qoniqarli)', description: 'Formulada adashadi' },
          { range: '0-49', grade: '2 (Qoniqarsiz)', description: 'Qo‘shimcha dars kerak' },
        ],
        includeExplanations: true,
      },
      homework: {
        type: 'Standard',
        estimatedTimeMin: 25,
        difficulty: 'Medium',
        includeEvaluationCriteria: true,
        includeOptionalExtension: true,
      },
      review: {
        enabled: true,
        types: ['Previous lesson', 'Quick quiz'],
      },
      attendance: {
        enabled: true,
        workflowTypes: ['Attendance tracking', 'Participation'],
      },
      assessment: {
        methods: ['Points', 'Formative assessment', 'Rubric'],
        includeRubric: true,
      },
      includeDifferentiation: true,
      extraIdeas: 'Students should compete in teams. Guruhlar orasida qiziqarli algebraik estafeta o‘tkazilsin.',
      aiTarget: 'both',
      qualityLevel: 'expert',
      appliedModifiers: [],
    };

    setFormData(demoData);
    storageService.saveDraft(demoData);

    // Generate prompt right away
    const { claudePrompt, googleAIPrompt } = generateLessonPrompt(demoData);
    const demoResult: GeneratedPromptResult = {
      id: 'demo_' + Date.now(),
      createdAt: new Date().toISOString(),
      subject: demoData.subject,
      topic: demoData.topic,
      grade: demoData.grade,
      aiTarget: 'both',
      qualityLevel: 'expert',
      claudePrompt,
      googleAIPrompt,
      inputData: demoData,
    };

    setCurrentResult(demoResult);
    const updatedHistory = storageService.saveToHistory(demoResult);
    setHistory(updatedHistory);

    setActivePage('preview');
    addToast('success', '🎯 Matematika (9-sinf) demo darsi muvaffaqiyatli yuklandi!');
  };

  // Apply Template
  const handleApplyTemplate = (template: LessonTemplate) => {
    const updated: TeacherLessonInput = {
      ...INITIAL_FORM_DATA,
      ...template.sampleInput,
    };
    setFormData(updated);
    storageService.saveDraft(updated);
    setActivePage('wizard');
    addToast('info', `"${template.topic}" shabloni formaga yuklandi`);
  };

  // Open prompt from history
  const handleOpenFromHistory = (item: GeneratedPromptResult) => {
    setCurrentResult(item);
    if (item.inputData) {
      setFormData(item.inputData);
    }
    setActivePage('preview');
  };

  // Delete from history
  const handleDeleteFromHistory = (id: string) => {
    const updated = storageService.deleteFromHistory(id);
    setHistory(updated);
    if (currentResult?.id === id) {
      setCurrentResult(updated.length > 0 ? updated[0] : null);
    }
    addToast('info', 'Prompt tarixdan o‘chirildi');
  };

  // Clear all history
  const handleClearAllHistory = () => {
    storageService.clearAllHistory();
    setHistory([]);
    setCurrentResult(null);
    addToast('info', 'Barcha tarix tozalandi');
  };

  // Clear all data (Settings)
  const handleClearAllData = () => {
    storageService.clearDraft();
    storageService.clearAllHistory();
    setFormData(INITIAL_FORM_DATA);
    setHistory([]);
    setCurrentResult(null);
    setIsConfirmClearOpen(false);
    addToast('info', 'Barcha lokal ma’lumotlar tozalandi');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Top Navbar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        activePage={activePage}
        onNavigate={(p) => setActivePage(p)}
        onTryDemo={handleTryDemo}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        t={t}
      />

      {/* Layout wrapper: Sidebar + Main Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Sidebar */}
        <Sidebar
          activePage={activePage}
          onNavigate={(p) => setActivePage(p)}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          historyCount={history.length}
          onTryDemo={handleTryDemo}
          t={t}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activePage === 'dashboard' && (
            <DashboardPage
              onStartWizard={() => setActivePage('wizard')}
              onTryDemo={handleTryDemo}
              onViewTemplates={() => setActivePage('templates')}
              onApplyTemplate={handleApplyTemplate}
              onOpenPrompt={handleOpenFromHistory}
              recentPrompts={history}
              currentLang={currentLang}
              t={t}
            />
          )}

          {activePage === 'wizard' && (
            <WizardPage
              formData={formData}
              onChangeFormData={handleUpdateFormData}
              onGenerate={handleGenerate}
              onReset={handleResetForm}
              onToast={addToast}
              t={t}
            />
          )}

          {activePage === 'preview' && (
            <PreviewPage
              currentResult={currentResult}
              onModify={handleApplyModifier}
              onRegenerate={handleRegenerateCurrent}
              onStartWizard={() => setActivePage('wizard')}
              onTryDemo={handleTryDemo}
              onToast={addToast}
              t={t}
            />
          )}

          {activePage === 'templates' && (
            <TemplatesPage
              onApplyTemplate={handleApplyTemplate}
              currentLang={currentLang}
              t={t}
            />
          )}

          {activePage === 'history' && (
            <HistoryPage
              history={history}
              onOpen={handleOpenFromHistory}
              onDelete={handleDeleteFromHistory}
              onClearAll={handleClearAllHistory}
              onToast={addToast}
              t={t}
            />
          )}

          {activePage === 'settings' && (
            <SettingsPage
              settings={settings}
              onUpdateSettings={(updates) => {
                const updated = { ...settings, ...updates };
                setSettings(updated);
                storageService.saveSettings(updated);
                addToast('success', 'Sozlamalar saqlandi');
              }}
              currentLang={currentLang}
              onLanguageChange={handleLanguageChange}
              theme={theme}
              onToggleTheme={handleToggleTheme}
              onClearAllData={() => setIsConfirmClearOpen(true)}
              t={t}
            />
          )}
        </main>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmClearOpen}
        onClose={() => setIsConfirmClearOpen(false)}
        title="Ma’lumotlarni tozalash"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600 dark:text-slate-300">
            Haqiqatan ham saqlangan barcha qoralamalar va dars promptlari tarixini o‘chirib yubormoqchimisiz? Ushbu amalni ortga qaytarib bo‘lmaydi.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsConfirmClearOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Bekor qilish
            </button>
            <button
              type="button"
              onClick={handleClearAllData}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold"
            >
              Ha, hammasini tozalash
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
