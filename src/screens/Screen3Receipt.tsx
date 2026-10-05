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
      <div className="pt-5 animate-fade-in-up">

        {/* Hero header */}
        <p className="eyebrow mb-3">Before you confirm</p>
        <h1 className="text-[1.5rem] font-bold text-ink-DEFAULT mb-1 leading-tight tracking-tight">
          Here's what this redemption changes.
        </h1>
        {/* ₹80,000 — visually dominant */}
        <p className="text-display font-bold tabular text-ink-DEFAULT tracking-tight leading-none mb-2">
          {formatINR(amount)}
        </p>
        <p className="text-[14px] text-ink-tertiary mb-2">Your money, your call.</p>

        {purpose && (
          <p className="text-[12px] text-ink-tertiary mt-1 mb-4 italic">
            Noted: {purpose}. The facts below stay the same.
          </p>
        )}

        {/* ── RECEIPT ────────────────────────────────────── */}
        <div className="mt-7 border-t border-border-DEFAULT">

          {/* WHAT YOU GET */}
          <div className="py-5 border-b border-border-DEFAULT">
            <p className="eyebrow mb-3">What you get</p>
            <p className="text-amount-lg font-bold tabular text-ink-DEFAULT tracking-tight leading-none mb-1">
              {formatINR(amount)}
            </p>
            <p className="text-[12px] text-ink-tertiary font-medium mt-1">
              Expected credit {redemption.expectedCredit.toLowerCase()}
            </p>
          </div>

          {/* WHAT IT COSTS */}
          <div className="py-5 border-b border-border-DEFAULT">
            <p className="eyebrow mb-3">What it costs</p>
            <div className="space-y-2.5">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] text-ink-secondary">
                  {pl < 0 ? 'Realised loss' : 'Realised gain'}
                </span>
                <span className="text-[15px] font-semibold tabular text-ink-DEFAULT">
                  ≈ {formatINR(plApprox)}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] text-ink-secondary">Exit load</span>
                <span className="text-[15px] font-semibold tabular text-ink-DEFAULT">
                  {formatINR(redemption.exitLoad)}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] text-ink-secondary">Estimated tax</span>
                <span className="text-[15px] font-semibold tabular text-ink-DEFAULT">
                  {formatINR(redemption.estimatedTax)}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-ink-tertiary mt-3 leading-relaxed">
              ₹0 tax because units are at a loss and held over 12 months.
            </p>
            <p className="text-[10px] text-ink-faint mt-1">Illustrative sample data.</p>
          </div>

          {/* YOUR GOAL */}
          <div className="py-5 border-b border-border-DEFAULT">
            <p className="eyebrow mb-3">Your goal</p>
            <p className="text-[13px] font-semibold text-ink-DEFAULT mb-2.5">{goal.name}</p>
            <div className="flex items-baseline gap-3">
              <span className="text-amount-md font-bold tabular text-ink-tertiary leading-none">
                {formatLakhs(goal.currentValue)}
              </span>
              <span className="text-ink-faint text-lg leading-none">→</span>
              <span className="text-amount-md font-bold tabular text-ink-DEFAULT leading-none">
                {formatLakhs(goalAfter(amount))}
              </span>
            </div>
            <p className="text-[11px] text-ink-tertiary mt-2">
              Today's value. This fund is {goal.fundRepresentationPct}% of this goal.
            </p>
          </div>

          {/* YOUR MIX */}
          <div className="py-5 border-b border-border-DEFAULT">
            <p className="eyebrow mb-3">Your mix</p>
            <p className="text-[13px] text-ink-secondary mb-2.5">
              Equity share of your mutual-fund portfolio
            </p>
            <div className="flex items-baseline gap-3">
              <span className="text-amount-md font-bold tabular text-ink-tertiary leading-none">
                {formatPct(equitySharePct())}
              </span>
              <span className="text-ink-faint text-lg leading-none">→</span>
              <span className="text-amount-md font-bold tabular text-ink-DEFAULT leading-none">
                {formatPct(equitySharePct(amount))}
              </span>
            </div>
          </div>

          {/* WHAT WE DON'T KNOW */}
          <div className="py-5 border-b border-border-DEFAULT">
            <p className="eyebrow mb-3">What we don't know</p>
            <ul className="space-y-2">
              {unknowns.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-ink-faint flex-shrink-0 mt-2" />
                  <span className="text-[13px] text-ink-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ONE MORE THING */}
          <div className="py-5 border-b border-border-DEFAULT">
            <p className="eyebrow mb-2">One more thing</p>
            <p className="text-[13px] text-ink-secondary leading-relaxed">
              Selling now means a second decision later about when, or whether, to buy back.
            </p>
          </div>

          {/* FUND MOVEMENT — expandable, not the lead */}
          <div className="py-1">
            <ExpandableSection title="How has this fund moved?">
              Your fund is {fund.pctBelowHigh}% below its 52-week high. Similar funds are{' '}
              {fund.similarFundsPctBelow}% below theirs, over the same 52-week window.
            </ExpandableSection>
          </div>
        </div>

        {/* Utility links */}
        <div className="mt-4 flex flex-col gap-3 pb-2">
          <button
            onClick={onWhyAmISeeing}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-tertiary hover:text-ink-secondary transition-colors"
          >
            <Info className="w-3.5 h-3.5" strokeWidth={2} />
            Why am I seeing this?
          </button>
          <button
            onClick={onWhatsThisFor}
            className="text-left text-[13px] font-medium text-ink-tertiary hover:text-ink-secondary transition-colors"
          >
            What's this money for?
          </button>
        </div>

      </div>
    </ScreenShell>
  );
}
