import { Info } from 'lucide-react';
import { ScreenShell } from '@/components/ui/ScreenShell';
import { Card } from '@/components/ui/Card';
import { ActionPair } from '@/components/ui/ActionPair';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { MetricRow } from '@/components/ui/MetricRow';
import { AmountDisplay } from '@/components/ui/AmountDisplay';
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
      <div className="pt-3 animate-fade-in-up">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400 mb-2">
          Before you confirm
        </p>
        <h1 className="text-headline text-slate-900 mb-2 leading-tight">
          Here's what this {formatINR(amount)} redemption changes.
        </h1>
        <p className="text-[15px] text-slate-500 mb-6">Your money, your call.</p>

        {purpose && (
          <p className="text-xs text-slate-500 -mt-3 mb-6">
            Noted: {purpose}. The facts below stay the same.
          </p>
        )}

        {/* 1 — What you get */}
        <SectionHeader label="What you get" className="mb-3" />
        <Card className="mb-6">
          <AmountDisplay amount={formatINR(amount)} size="lg" className="mb-1" />
          <p className="text-sm text-slate-500 font-medium">
            Expected credit {redemption.expectedCredit.toLowerCase()}
          </p>
        </Card>

        {/* 2 — What it costs */}
        <SectionHeader label="What it costs" className="mb-3" />
        <Card className="mb-6">
          <MetricRow
            label={pl < 0 ? 'Realised loss' : 'Realised gain'}
            value={`≈ ${formatINR(plApprox)}`}
          />
          <div className="h-px bg-slate-100 my-1" />
          <MetricRow label="Exit load" value={formatINR(redemption.exitLoad)} />
          <div className="h-px bg-slate-100 my-1" />
          <MetricRow label="Estimated tax" value={formatINR(redemption.estimatedTax)} />
          <p className="text-xs text-slate-500 mt-3 leading-relaxed">
            ₹0 because the units sold are at a loss and held over 12 months.
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Illustrative sample data.</p>
        </Card>

        {/* 3 — Your goal */}
        <SectionHeader label="Your goal" className="mb-3" />
        <Card className="mb-6">
          <p className="text-sm font-semibold text-slate-700 mb-3">{goal.name}</p>
          <div className="flex items-baseline gap-2.5 mb-3">
            <span className="text-2xl font-bold tabular text-slate-400">
              {formatLakhs(goal.currentValue)}
            </span>
            <span className="text-slate-300 text-lg">→</span>
            <span className="text-2xl font-bold tabular text-slate-900">
              {formatLakhs(goalAfter(amount))}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Value today. This fund is {goal.fundRepresentationPct}% of this goal.
          </p>
        </Card>

        {/* 4 — Your mix */}
        <SectionHeader label="Your mix" className="mb-3" />
        <Card className="mb-6">
          <p className="text-sm font-semibold text-slate-700 mb-3">
            Equity share of your mutual-fund portfolio
          </p>
          <div className="flex items-baseline gap-2.5">
            <span className="text-2xl font-bold tabular text-slate-400">
              {formatPct(equitySharePct())}
            </span>
            <span className="text-slate-300 text-lg">→</span>
            <span className="text-2xl font-bold tabular text-slate-900">
              {formatPct(equitySharePct(amount))}
            </span>
          </div>
        </Card>

        {/* 5 — What we don't know */}
        <SectionHeader label="What we don't know" className="mb-3" />
        <Card className="mb-6">
          <ul className="space-y-2.5 text-sm text-slate-600">
            {unknowns.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span className="w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Card>

        {/* One more thing */}
        <Card className="mb-4 bg-slate-100/60 border-slate-200/60">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400 mb-2">
            One more thing
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Selling now means a second decision later about when, or whether, to buy back.
          </p>
        </Card>

        {/* Fund movement — one tap away, not the lead */}
        <Card padded={false} className="px-5 mb-5">
          <ExpandableSection title="How has this fund moved?">
            Your fund is {fund.pctBelowHigh}% below its 52-week high. Similar funds are{' '}
            {fund.similarFundsPctBelow}% below theirs, over the same 52-week window.
          </ExpandableSection>
        </Card>

        <button
          onClick={onWhyAmISeeing}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors mb-5"
        >
          <Info className="w-4 h-4" strokeWidth={2} />
          Why am I seeing this?
        </button>

        <button
          onClick={onWhatsThisFor}
          className="block w-full text-left text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors mb-2"
        >
          What's this money for?
        </button>
      </div>
    </ScreenShell>
  );
}
