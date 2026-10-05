import { useState } from 'react';
import { ScreenShell } from '@/components/ui/ScreenShell';
import { Card } from '@/components/ui/Card';
import { ActionPair } from '@/components/ui/ActionPair';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { MetricRow } from '@/components/ui/MetricRow';
import {
  fund,
  goal,
  redemption,
  goalAfter,
  isValidAmount,
  formatINR,
  formatLakhs,
} from '@/lib/data';

interface Screen6NeedCashProps {
  /** The amount the investor requested; pre-filled and editable. */
  amount: number;
  onBack: () => void;
  onConfirm: (amount: number) => void;
}

export function Screen6NeedCash({ amount, onBack, onConfirm }: Screen6NeedCashProps) {
  const [value, setValue] = useState(amount);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setValue(raw ? parseInt(raw, 10) : 0);
  };

  const formatted = new Intl.NumberFormat('en-IN').format(value);
  const valid = isValidAmount(value);
  const tooHigh = value > fund.currentValue;

  return (
    <ScreenShell
      onBack={onBack}
      footer={
        <ActionPair
          left={{ label: 'Back to receipt', onClick: onBack }}
          right={{
            label: `Confirm ${formatINR(value)}`,
            onClick: () => onConfirm(value),
            disabled: !valid,
          }}
        />
      }
    >
      <div className="pt-3 animate-fade-in-up">
        <h1 className="text-headline text-slate-900 mb-6">How much do you need?</h1>

        <Card className="mb-2">
          <div className="flex items-baseline justify-center gap-1 py-1">
            <span className="text-3xl font-bold text-slate-300">₹</span>
            <input
              type="text"
              inputMode="numeric"
              value={formatted}
              onChange={handleChange}
              style={{ width: `${Math.max(formatted.length, 1) + 0.5}ch` }}
              className="text-4xl font-bold tabular text-slate-900 bg-transparent border-none outline-none text-center max-w-[240px]"
              aria-label="Amount you need"
            />
          </div>
        </Card>
        <p className="text-xs text-slate-400 text-center mb-6" role="status">
          {tooHigh ? "More than this holding's value." : 'You can edit this amount.'}
        </p>

        <SectionHeader label="Your goal" className="mb-3" />
        <Card className="mb-6">
          <p className="text-sm font-semibold text-slate-700 mb-3">{goal.name}</p>
          <div className="flex items-baseline gap-2.5">
            <span className="text-2xl font-bold tabular text-slate-400">
              {formatLakhs(goal.currentValue)}
            </span>
            <span className="text-slate-300 text-lg">→</span>
            <span className="text-2xl font-bold tabular text-slate-900">
              {valid ? formatLakhs(goalAfter(value)) : '—'}
            </span>
          </div>
        </Card>

        <SectionHeader label="Transaction" className="mb-3" />
        <Card className="mb-4">
          <MetricRow label="Exit load" value={formatINR(redemption.exitLoad)} />
          <div className="h-px bg-slate-100 my-1" />
          <MetricRow label="Estimated tax" value={formatINR(redemption.estimatedTax)} />
          <div className="h-px bg-slate-100 my-1" />
          <MetricRow label="Expected credit" value={redemption.expectedCredit} />
        </Card>

        <p className="text-xs text-slate-500 leading-relaxed">
          Units selected for this illustration: oldest eligible units first (FIFO).
        </p>
      </div>
    </ScreenShell>
  );
}
