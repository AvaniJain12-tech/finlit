import { X, Info, Check, ShieldAlert } from 'lucide-react';
import { useFinLit } from '@/context/FinLitContext';
import { Button } from '@/components/ui/Button';
import { formatINR } from '@/lib/data';

export function WhyAmISeeingModal() {
  const { whyModalOpen, closeWhyModal, amount } = useFinLit();

  if (!whyModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-ink/40 backdrop-blur-[2px] animate-fade-in">
      <div
        className="w-full sm:max-w-xl bg-surface rounded-t-2xl sm:rounded-2xl border border-border shadow-xl overflow-hidden animate-fade-in-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="why-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-border-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-accent-bg flex items-center justify-center text-accent">
              <Info className="w-3.5 h-3.5" strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-ink-3">
                TRANSPARENCY & AUDITABILITY
              </p>
              <h2 id="why-modal-title" className="text-[13px] font-semibold text-ink">
                Why am I seeing this?
              </h2>
            </div>
          </div>
          <button
            onClick={closeWhyModal}
            className="w-8 h-8 rounded-full flex items-center justify-center text-ink-3 hover:text-ink hover:bg-border-2 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 max-h-[75vh] overflow-y-auto space-y-4">
          {/* Why this appeared */}
          <div className="p-4 bg-bg rounded-xl border border-border">
            <p className="eyebrow mb-1.5 text-accent">Trigger Reason</p>
            <p className="text-[14px] font-semibold text-ink mb-1">
              Active redemption review of {formatINR(amount)}
            </p>
            <p className="text-[12.5px] text-ink-2 leading-relaxed">
              This card was generated because a redemption amount is currently under evaluation for Sample Flexi Cap. FinLit surfaces the arithmetic consequences before order transmission.
            </p>
          </div>

          {/* Data Used */}
          <div>
            <p className="eyebrow mb-2">Data Used</p>
            <div className="space-y-2 bg-surface rounded-xl border border-border p-3.5">
              {[
                { title: 'Portfolio holding records', sub: 'Current asset allocation (78% Equity / 22% Debt)' },
                { title: 'Fund NAV & 52-week statistics', sub: 'Sample Flexi Cap historical NAV and peer benchmark' },
                { title: 'Goal allocation map', sub: 'Home — 2031 goal tagged proportion' },
                { title: 'FIFO Unit Ledger & Tax rules', sub: 'Indian IT Act LTCG holding duration and exit load rules' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-200">
                    <Check className="w-2.5 h-2.5" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-[12.5px] font-semibold text-ink leading-tight">{item.title}</p>
                    <p className="text-[11px] text-ink-3">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What it does NOT use */}
          <div>
            <p className="eyebrow mb-2 text-ink-3">What FinLit Does NOT Use</p>
            <div className="space-y-2 bg-[#FCFAF8] rounded-xl border border-border p-3.5">
              {[
                { title: 'Emotion inference & behavioral manipulation', sub: 'No attempt to discourage or induce selling' },
                { title: 'Private messages & microphone access', sub: 'Zero device surveillance or sentiment harvesting' },
                { title: 'External unlinked financial accounts', sub: 'Only authorized portfolio feeds are evaluated' },
                { title: 'Speculative market price predictions', sub: 'Math is strictly retrospective & deterministic' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-slate-100 text-ink-3 flex items-center justify-center flex-shrink-0 mt-0.5 border border-border">
                    <ShieldAlert className="w-2.5 h-2.5" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-ink-2 leading-tight">{item.title}</p>
                    <p className="text-[11px] text-ink-3">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Button variant="primary" onClick={closeWhyModal} className="w-full">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
