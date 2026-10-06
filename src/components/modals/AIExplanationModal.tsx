import { X, Sparkles, ShieldCheck, Database, Calculator } from 'lucide-react';
import { useFinLit } from '@/context/FinLitContext';
import { Button } from '@/components/ui/Button';

export function AIExplanationModal() {
  const { aiModal, closeAiExplanation } = useFinLit();

  if (!aiModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-ink/40 backdrop-blur-[2px] animate-fade-in">
      <div
        className="w-full max-w-[420px] bg-surface rounded-t-2xl sm:rounded-2xl border border-border shadow-xl overflow-hidden animate-fade-in-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-border-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-accent-bg flex items-center justify-center text-accent">
              <Sparkles className="w-3.5 h-3.5" strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-ink-3">
                FINLIT INTELLIGENCE LAYER
              </p>
              <p className="text-[12px] font-semibold text-ink">{aiModal.topic}</p>
            </div>
          </div>
          <button
            onClick={closeAiExplanation}
            className="w-8 h-8 rounded-full flex items-center justify-center text-ink-3 hover:text-ink hover:bg-border-2 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[75vh] overflow-y-auto">
          {/* User query / Context prompt */}
          <div className="mb-4">
            <h2 id="ai-modal-title" className="text-[17px] font-bold text-ink leading-snug">
              {aiModal.question}
            </h2>
          </div>

          {/* AI Explanation Body */}
          <div className="p-4 bg-bg rounded-xl border border-border mb-5">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <p className="text-[11px] font-bold uppercase tracking-wider text-accent">
                Factual Translation
              </p>
            </div>
            <p className="text-[13.5px] text-ink leading-relaxed font-normal">
              {aiModal.explanation}
            </p>
          </div>

          {/* Technical Grounding & Audit Metadata */}
          <div className="space-y-3 pt-1 border-t border-border-2">
            <div className="flex items-start gap-2.5">
              <Database className="w-4 h-4 text-ink-3 mt-0.5 flex-shrink-0" strokeWidth={1.8} />
              <div>
                <p className="text-[11px] font-semibold text-ink-2 uppercase tracking-wide">
                  Source Data
                </p>
                <p className="text-[12.5px] text-ink">{aiModal.source}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Calculator className="w-4 h-4 text-ink-3 mt-0.5 flex-shrink-0" strokeWidth={1.8} />
              <div>
                <p className="text-[11px] font-semibold text-ink-2 uppercase tracking-wide">
                  Calculation Model
                </p>
                <p className="text-[12.5px] text-ink font-mono">{aiModal.calculation}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" strokeWidth={1.8} />
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-[11px] font-semibold text-ink-2 uppercase tracking-wide">
                    Pre-Flight Validation
                  </p>
                  <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Confidence: {aiModal.confidence}
                  </span>
                </div>
                <p className="text-[12.5px] text-ink-2">{aiModal.validatorStatus}</p>
              </div>
            </div>
          </div>

          {/* Strict Philosophy Disclaimer */}
          <div className="mt-5 p-3 rounded-lg bg-[#FAF9F5] border border-border-2">
            <p className="text-[11px] text-ink-3 leading-relaxed text-center">
              FinLit computes and explains. We never forecast market trajectories or suggest holding vs selling.
            </p>
          </div>

          <div className="mt-5">
            <Button variant="primary" onClick={closeAiExplanation} className="w-full">
              Understood
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
