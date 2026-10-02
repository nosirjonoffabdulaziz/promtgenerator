import React, { useState } from 'react';
import { GeneratedPromptResult, AITarget, TeacherLessonInput } from '../../types';
import { PromptActions } from './PromptActions';
import {
  Copy,
  Check,
  Code,
  Eye,
  FileCheck2,
  Bot,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';

interface PromptPreviewProps {
  result: GeneratedPromptResult;
  onModify: (modifierKey: string) => void;
  onRegenerate: () => void;
  onToast: (type: 'success' | 'warning' | 'error' | 'info', msg: string) => void;
  t: Record<string, string>;
}

export const PromptPreview: React.FC<PromptPreviewProps> = ({
  result,
  onModify,
  onRegenerate,
  onToast,
  t,
}) => {
  // Tabs: 'claude' | 'google-ai-studio' | 'both'
  const [activeTab, setActiveTab] = useState<'claude' | 'google-ai-studio' | 'both'>(
    result.aiTarget === 'claude'
      ? 'claude'
      : result.aiTarget === 'google-ai-studio'
      ? 'google-ai-studio'
      : 'both'
  );

  const [viewMode, setViewMode] = useState<'formatted' | 'raw'>('formatted');
  const [copied, setCopied] = useState(false);

  // Determine current active text based on tab
  const getActiveText = (): string => {
    if (activeTab === 'claude') {
      return result.claudePrompt || result.googleAIPrompt || '';
    } else if (activeTab === 'google-ai-studio') {
      return result.googleAIPrompt || result.claudePrompt || '';
    } else {
      // Both
      if (result.claudePrompt && result.googleAIPrompt) {
        return `================================================================================
# EDU PROMPT ENGINE - IKKALA AI PLATFORMASI UCHUN PROMPTLAR
# Fan: ${result.subject} | Mavzu: ${result.topic} | Sinf: ${result.grade}-sinf
================================================================================

---
### 1. CLAUDE UCHUN PROMPT (Anthropic Claude 3.5 Sonnet / Opus)
---
${result.claudePrompt}

---
### 2. GOOGLE AI STUDIO UCHUN PROMPT (Gemini 2.5 Flash / Pro)
---
${result.googleAIPrompt}`;
      }
      return result.claudePrompt || result.googleAIPrompt || '';
    }
  };

  const activeText = getActiveText();

  // Metrics
  const charCount = activeText.length;
  const wordCount = activeText.split(/\s+/).filter(Boolean).length;
  const lineCount = activeText.split('\n').length;
  const estimatedTokens = Math.round(wordCount * 1.35);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeText);
    setCopied(true);
    onToast('success', t.toastCopySuccess || '✅ Prompt nusxalandi! Endi uni Claude yoki Google AI Studio’ga joylashtiring.');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([activeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `EDU_PROMPT_${result.subject}_${result.grade}sinf.txt`;
    link.click();
    URL.revokeObjectURL(url);
    onToast('info', 'TXT fayl yuklab olindi');
  };

  const handleDownloadMd = () => {
    const blob = new Blob([activeText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `EDU_PROMPT_${result.subject}_${result.grade}sinf.md`;
    link.click();
    URL.revokeObjectURL(url);
    onToast('info', 'Markdown (.md) fayl yuklab olindi');
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner info */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-900/90 via-purple-900/90 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold">
                {result.subject}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold">
                {result.grade}-sinf
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/80 text-white text-xs font-semibold">
                {result.qualityLevel.toUpperCase()} LEVEL
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {result.topic}
            </h2>
            <p className="text-xs text-indigo-200 mt-1">
              Yaratilgan vaqt: {new Date(result.createdAt).toLocaleString('uz-UZ')} • Dars formati: {result.inputData?.lessonFormat} • {result.inputData?.duration} daqiqa
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl text-center border border-white/10">
              <div className="text-lg font-bold">{wordCount.toLocaleString()}</div>
              <div className="text-[10px] text-indigo-200">So‘z</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl text-center border border-white/10">
              <div className="text-lg font-bold">~{estimatedTokens.toLocaleString()}</div>
              <div className="text-[10px] text-indigo-200">Token</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Toolbar */}
      <PromptActions
        onCopy={handleCopy}
        onDownloadTxt={handleDownloadTxt}
        onDownloadMd={handleDownloadMd}
        onPrintPdf={handlePrintPdf}
        onRegenerate={onRegenerate}
        onApplyModifier={onModify}
        appliedModifiers={result.inputData?.appliedModifiers || []}
        t={t}
        copied={copied}
      />

      {/* Tabs and View Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        {/* Model Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('claude')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'claude'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.tabClaude || 'Claude'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('google-ai-studio')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'google-ai-studio'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-blue-500" />
            <span>{t.tabGoogleAI || 'Google AI Studio'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('both')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'both'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>{t.tabCombined || 'Birlashtirilgan (Ikkalasi)'}</span>
          </button>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setViewMode('formatted')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
              viewMode === 'formatted'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.formattedView || 'Formatlangan'}</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('raw')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
              viewMode === 'raw'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>{t.rawText || 'Xom matn (Raw)'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Box */}
      <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        {/* Floating Quick Copy button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-900 text-white text-xs font-semibold backdrop-blur-md transition-all shadow-md cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Nusxalandi' : 'Nusxalash'}</span>
          </button>
        </div>

        {viewMode === 'raw' ? (
          <textarea
            readOnly
            value={activeText}
            rows={26}
            className="w-full p-6 font-mono text-xs text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-950/70 focus:outline-none resize-y leading-relaxed"
          />
        ) : (
          <div className="p-6 md:p-8 space-y-6 text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans overflow-x-auto">
            {/* Formatted markdown rendering with styled elements */}
            <div className="prose dark:prose-invert max-w-none">
              {activeText.split('\n\n').map((block, idx) => {
                const trimmed = block.trim();
                if (!trimmed) return null;

                if (trimmed.startsWith('# ')) {
                  return (
                    <h1
                      key={idx}
                      className="text-xl md:text-2xl font-black text-indigo-600 dark:text-indigo-400 pb-2 border-b border-indigo-200 dark:border-indigo-900/50 mt-6 first:mt-0"
                    >
                      {trimmed.replace('# ', '')}
                    </h1>
                  );
                } else if (trimmed.startsWith('## ')) {
                  return (
                    <h2
                      key={idx}
                      className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mt-5 pb-1 border-b border-slate-200 dark:border-slate-800"
                    >
                      {trimmed.replace('## ', '')}
                    </h2>
                  );
                } else if (trimmed.startsWith('### ')) {
                  return (
                    <h3
                      key={idx}
                      className="text-base font-bold text-indigo-700 dark:text-indigo-300 mt-4"
                    >
                      {trimmed.replace('### ', '')}
                    </h3>
                  );
                } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                  return (
                    <ul key={idx} className="space-y-1.5 pl-5 list-disc text-xs sm:text-sm">
                      {trimmed.split('\n').map((li, lIdx) => (
                        <li key={lIdx} className="leading-relaxed">
                          {renderInlineMarkdown(li.replace(/^[-*]\s+/, ''))}
                        </li>
                      ))}
                    </ul>
                  );
                } else if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs font-mono text-indigo-900 dark:text-indigo-200"
                    >
                      {trimmed}
                    </div>
                  );
                } else {
                  return (
                    <p key={idx} className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {renderInlineMarkdown(trimmed)}
                    </p>
                  );
                }
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Quick inline formatter for **bold**, *italic*, `code`
 */
function renderInlineMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-slate-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 font-mono text-xs"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
