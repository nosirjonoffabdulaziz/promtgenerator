import React, { useState } from 'react';
import { TeacherLessonInput } from '../types';
import { SmartSuggestions } from '../components/SmartSuggestions';
import { Step1BasicInfo } from '../components/StepWizard/Step1BasicInfo';
import { Step2Objectives } from '../components/StepWizard/Step2Objectives';
import { Step3Methods } from '../components/StepWizard/Step3Methods';
import { Step4Games } from '../components/StepWizard/Step4Games';
import { Step5Exercises } from '../components/StepWizard/Step5Exercises';
import { Step6Test } from '../components/StepWizard/Step6Test';
import { Step7Homework } from '../components/StepWizard/Step7Homework';
import { Step8Assessment } from '../components/StepWizard/Step8Assessment';
import { Step9ExtraIdeas } from '../components/StepWizard/Step9ExtraIdeas';
import { Step10AITarget } from '../components/StepWizard/Step10AITarget';
import {
  ChevronRight,
  ChevronLeft,
  Rocket,
  RotateCcw,
  Sparkles,
  BookOpen,
  Target,
  Wand2,
  Gamepad2,
  PenTool,
  HelpCircle,
  Home,
  BarChart3,
  Lightbulb,
  Cpu,
} from 'lucide-react';

interface WizardPageProps {
  formData: TeacherLessonInput;
  onChangeFormData: (fields: Partial<TeacherLessonInput>) => void;
  onGenerate: () => void;
  onReset: () => void;
  onToast: (type: 'success' | 'warning' | 'error' | 'info', msg: string) => void;
  t: Record<string, string>;
}

export const WizardPage: React.FC<WizardPageProps> = ({
  formData,
  onChangeFormData,
  onGenerate,
  onReset,
  onToast,
  t,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { number: 1, title: t.step1Title || 'Asosiy', icon: <BookOpen className="w-4 h-4" /> },
    { number: 2, title: t.step2Title || 'Maqsad', icon: <Target className="w-4 h-4" /> },
    { number: 3, title: t.step3Title || 'Metodlar', icon: <Wand2 className="w-4 h-4" /> },
    { number: 4, title: t.step4Title || 'O‘yin', icon: <Gamepad2 className="w-4 h-4" /> },
    { number: 5, title: t.step5Title || 'Mashqlar', icon: <PenTool className="w-4 h-4" /> },
    { number: 6, title: t.step6Title || 'Test', icon: <HelpCircle className="w-4 h-4" /> },
    { number: 7, title: t.step7Title || 'Uy vazifa', icon: <Home className="w-4 h-4" /> },
    { number: 8, title: t.step8Title || 'Baholash', icon: <BarChart3 className="w-4 h-4" /> },
    { number: 9, title: t.step9Title || 'G‘oyalar', icon: <Lightbulb className="w-4 h-4" /> },
    { number: 10, title: t.step10Title || 'AI Target', icon: <Cpu className="w-4 h-4" /> },
  ];

  const validateStep1 = (): boolean => {
    if (!formData.subject || (formData.subject === 'Boshqa fan' && !formData.customSubject?.trim())) {
      onToast('warning', t.alertRequiredFields || '⚠️ Iltimos, fan, mavzu va sinfni kiriting.');
      return false;
    }
    if (!formData.topic || !formData.topic.trim()) {
      onToast('warning', t.alertRequiredFields || '⚠️ Iltimos, fan, mavzu va sinfni kiriting.');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) {
      return;
    }
    if (currentStep < 10) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepClick = (stepNumber: number) => {
    if (stepNumber > 1 && !validateStep1()) {
      return;
    }
    setCurrentStep(stepNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalGenerate = () => {
    if (!validateStep1()) {
      setCurrentStep(1);
      return;
    }
    onGenerate();
  };

  const progressPercentage = Math.round((currentStep / 10) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in">
      {/* Wizard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
            Bosqich {currentStep} / 10 • {progressPercentage}% yakunlandi
          </span>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            {steps[currentStep - 1].title}
          </h2>
        </div>

        {/* Quick Progress Bar */}
        <div className="flex items-center gap-3">
          <div className="w-36 h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <button
            type="button"
            onClick={onReset}
            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title={t.btnReset || 'Formani tozalash'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step Selector Ribbon */}
      <div className="overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5 min-w-max p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
          {steps.map((st) => {
            const isCurrent = currentStep === st.number;
            const isCompleted = currentStep > st.number;

            return (
              <button
                key={st.number}
                type="button"
                onClick={() => handleStepClick(st.number)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs ring-1 ring-slate-200 dark:ring-slate-700'
                    : isCompleted
                    ? 'text-emerald-700 dark:text-emerald-400 hover:bg-white/60'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
              >
                <span>{st.icon}</span>
                <span>{st.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Smart Suggestions card (show in early steps if topic/subject is entered) */}
      {(currentStep === 1 || currentStep === 2 || currentStep === 3) && (
        <SmartSuggestions
          formData={formData}
          onApplySuggestions={onChangeFormData}
          t={t}
        />
      )}

      {/* Wizard Step Content Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        {currentStep === 1 && (
          <Step1BasicInfo
            formData={formData}
            onChange={onChangeFormData}
            t={t}
          />
        )}
        {currentStep === 2 && (
          <Step2Objectives
            formData={formData}
            onChange={onChangeFormData}
            t={t}
          />
        )}
        {currentStep === 3 && (
          <Step3Methods
            formData={formData}
            onChange={onChangeFormData}
            t={t}
          />
        )}
        {currentStep === 4 && (
          <Step4Games
            formData={formData}
            onChange={onChangeFormData}
            t={t}
          />
        )}
        {currentStep === 5 && (
          <Step5Exercises
            formData={formData}
            onChange={onChangeFormData}
            t={t}
          />
        )}
        {currentStep === 6 && (
          <Step6Test
            formData={formData}
            onChange={onChangeFormData}
            t={t}
          />
        )}
        {currentStep === 7 && (
          <Step7Homework
            formData={formData}
            onChange={onChangeFormData}
            t={t}
          />
        )}
        {currentStep === 8 && (
          <Step8Assessment
            formData={formData}
            onChange={onChangeFormData}
            t={t}
          />
        )}
        {currentStep === 9 && (
          <Step9ExtraIdeas
            formData={formData}
            onChange={onChangeFormData}
            t={t}
          />
        )}
        {currentStep === 10 && (
          <Step10AITarget
            formData={formData}
            onChange={onChangeFormData}
            onGenerate={handleFinalGenerate}
            t={t}
          />
        )}

        {/* Step Navigation Footer */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={handlePrev}
            className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold transition-all cursor-pointer ${
              currentStep === 1
                ? 'opacity-30 pointer-events-none'
                : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{t.btnPrev || 'Ortga'}</span>
          </button>

          <div className="flex items-center gap-2">
            {currentStep < 10 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>{t.btnNext || 'Keyingisi'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalGenerate}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs font-extrabold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Rocket className="w-4 h-4" />
                <span>{t.btnGenerate || 'PROMPT YARATISH'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
