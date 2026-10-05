import { Info } from 'lucide-react';
import { ScreenShell } from '@/components/ui/ScreenShell';
import { ActionPair } from '@/components/ui/ActionPair';
import { ExpandableSection } from '@/components/ui/ExpandableSection';
import {
  fund,
  redemption,
  goal,
  unknowns,
  realisedPL,
  goalAfter,
  equitySharePct,
  roundTo,
  formatINR,
  formatLakhs,
  formatPct,
} from '@/lib/data';

interface Screen3ReceiptProps {
  amount: number;
  purpose: string | null;
  onBack: () => void;
  onWhatsThisFor: () => void;
  onWhyAmISeeing: () => void;
  onChangeAmount: () => void;
  onConfirm: () => void;
}

export function Screen3Receipt({
  amount,
  purpose,
  onBack,
  onWhatsThisFor,
  onWhyAmISeeing,
  onChangeAmount,
  onConfirm,
}: Screen3ReceiptProps) {
  const pl = realisedPL(amount);
  const plApprox = roundTo(Math.abs(pl), 100);

  return (
    <ScreenShell
      onBack={onBack}
      footer={
        <ActionPair
          left={{ label: 'Change amount', onClick: onChangeAmount }}
          right={{ label: 'Confirm redemption', onClick: onConfirm }}
        />
      }
    >
      <div className="pt-6 animate-fade-in-up">

        {/* ── HERO HEADER ──────────────────────────────────────── */}
        <p className="eyebrow mb-3">Before you confirm</p>
        <h1 className="text-[22px] font-[700] text-ink leading-tight tracking-tight mb-2">
          Here's what this redemption changes.
        </h1>
        {/* Amount as dominant visual */}
        <p className="text-display tabular font-[750] text-ink leading-none tracking-tight mb-2">
          {formatINR(amount)}
        </p>
        <p className="text-[14px] text-ink-3 mb-1">Your money, your call.</p>
        {purpose && (
          <p className="text-[12px] text-ink-3 italic mt-1 mb-3">
            Noted: {purpose}. The facts below stay the same.
          </p>
        )}

        {/* ── RECEIPT BODY ─────────────────────────────────────── */}
        <div className="mt-8 border-t border-border">

          {/* WHAT YOU GET */}
          <div className="py-6 border-b border-border">
            <p className="eyebrow mb-4">What you get</p>
            <p className="text-num-xl tabular font-[750] text-ink leading-none tracking-tight mb-2">
              {formatINR(amount)}
            </p>
            <p className="text-[12px] text-ink-3 font-medium mt-2">
              Expected in bank · {redemption.expectedCredit.toLowerCase()}
            </p>
          </div>

          {/* WHAT IT COSTS */}
          <div className="py-6 border-b border-border">
            <p className="eyebrow mb-4">What it costs</p>
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] text-ink-2">{pl < 0 ? 'Realised loss' : 'Realised gain'}</span>
                <span className="text-[15px] font-semibold tabular text-ink">≈ {formatINR(plApprox)}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] text-ink-2">Exit load</span>
                <span className="text-[15px] font-semibold tabular text-ink">{formatINR(redemption.exitLoad)}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] text-ink-2">Estimated tax</span>
                <span className="text-[15px] font-semibold tabular text-ink">{formatINR(redemption.estimatedTax)}</span>
              </div>
            </div>
            <p className="text-[11px] text-ink-3 mt-4 leading-relaxed">
              ₹0 tax — units are at a loss and held over 12 months.
            </p>
            <p className="text-[10px] text-ink-4 mt-1">Illustrative sample data.</p>
          </div>

          {/* YOUR GOAL */}
          <div className="py-6 border-b border-border">
            <p className="eyebrow mb-4">Your goal</p>
            <p className="text-[14px] font-semibold text-ink mb-3">{goal.name} · 2031</p>
            <div className="flex items-baseline gap-3">
              <span className="text-num-md tabular font-[700] text-ink-3 leading-none">
                {formatLakhs(goal.currentValue)}
              </span>
              <span className="text-ink-4 text-xl leading-none">→</span>
              <span className="text-num-md tabular font-[700] text-ink leading-none">
                {formatLakhs(goalAfter(amount))}
              </span>
            </div>
            <p className="text-[11px] text-ink-3 mt-3">
              Today's value. This fund is {goal.fundRepresentationPct}% of this goal.
            </p>
          </div>

          {/* YOUR MIX */}
          <div className="py-6 border-b border-border">
            <p className="eyebrow mb-4">Your mix</p>
            <p className="text-[13px] text-ink-2 mb-3">Equity share of your mutual-fund portfolio</p>
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-num-md tabular font-[700] text-ink-3 leading-none">
                {formatPct(equitySharePct())}
              </span>
              <span className="text-ink-4 text-xl leading-none">→</span>
              <span className="text-num-md tabular font-[700] text-ink leading-none">
                {formatPct(equitySharePct(amount))}
              </span>
            </div>
          </div>

          {/* WHAT WE DON'T KNOW */}
          <div className="py-6 border-b border-border">
            <p className="eyebrow mb-4">What we don't know</p>
            <ul className="space-y-2.5">
              {unknowns.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-ink-4 flex-shrink-0 mt-[7px]" />
                  <span className="text-[13px] text-ink-2">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ONE MORE THING */}
          <div className="py-6 border-b border-border">
            <p className="eyebrow mb-2">One more thing</p>
            <p className="text-[13px] text-ink-2 leading-relaxed">
              Selling now means a second decision later: when, or whether, to buy back.
            </p>
          </div>

          {/* Fund movement — expandable, secondary */}
          <div className="py-1">
            <ExpandableSection title="How has this fund moved?">
              Your fund is {fund.pctBelowHigh}% below its 52-week high. Similar funds are{' '}
              {fund.similarFundsPctBelow}% below theirs, over the same 52-week window.
            </ExpandableSection>
          </div>
        </div>

        {/* Utility links */}
        <div className="mt-5 mb-2 flex flex-col gap-3">
          <button
            onClick={onWhyAmISeeing}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-3 hover:text-ink-2 transition-colors"
          >
            <Info className="w-3.5 h-3.5" strokeWidth={2} />
            Why am I seeing this?
          </button>
          <button
            onClick={onWhatsThisFor}
            className="text-left text-[13px] font-medium text-ink-3 hover:text-ink-2 transition-colors"
          >
            What's this money for?
          </button>
        </div>
      </div>
    </ScreenShell>
  );
}
