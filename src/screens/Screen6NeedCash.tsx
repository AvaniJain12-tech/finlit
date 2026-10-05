import { useState } from 'react';
import { ScreenShell } from '@/components/ui/ScreenShell';
import { ActionPair } from '@/components/ui/ActionPair';
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
            label: 'Continue',
            onClick: () => onConfirm(value),
            disabled: !valid,
          }}
        />
      }
    >
      <div className="pt-6 animate-fade-in-up">
        <h1 className="text-headline text-ink mb-1 leading-tight">
          How much do you need?
        </h1>
        <p className="text-[13px] text-ink-3 mb-8">
          Maximum {formatINR(fund.currentValue)}
        </p>

        {/* Large editable amount field — visual hero */}
        <div className="mb-8">
          <div className="flex items-baseline justify-center gap-1 py-3">
            <span className="text-num-lg font-[750] text-ink-4 tabular leading-none select-none">
              ₹
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={formatted}
              onChange={handleChange}
              style={{ width: `${Math.max(formatted.length, 2) + 0.5}ch` }}
              className="text-display tabular font-[750] text-ink bg-transparent border-none outline-none text-center max-w-[310px] tracking-tight leading-none"
              aria-label="Amount you need"
            />
          </div>
          <div className="h-[2px] w-20 mx-auto bg-accent rounded-full" />
          <p className="text-[12px] text-ink-3 text-center mt-3" role="status">
            {tooHigh
              ? `Exceeds holding value (${formatINR(fund.currentValue)})`
              : 'You can edit this amount.'}
          </p>
        </div>

        {/* Goal impact */}
        <div className="border-t border-border pt-1">
          <div className="py-5 border-b border-border">
            <p className="eyebrow mb-3">Your goal</p>
            <p className="text-[14px] font-semibold text-ink mb-2">{goal.name}</p>
            <div className="flex items-baseline gap-3">
              <span className="text-num-md tabular font-[700] text-ink-3 leading-none">
                {formatLakhs(goal.currentValue)}
              </span>
              <span className="text-ink-4 text-xl leading-none">→</span>
              <span className="text-num-md tabular font-[700] text-ink leading-none">
                {valid ? formatLakhs(goalAfter(value)) : '—'}
              </span>
            </div>
          </div>

          <div className="py-2 border-b border-border">
            <p className="eyebrow pt-3 mb-1">Transaction</p>
            <div className="divide-y divide-border-2">
              <MetricRow label="Exit load" value={formatINR(redemption.exitLoad)} />
              <MetricRow label="Estimated tax" value={formatINR(redemption.estimatedTax)} />
              <MetricRow label="Expected credit" value={redemption.expectedCredit} />
            </div>
          </div>
        </div>

        <p className="text-[12px] text-ink-3 leading-relaxed mt-4">
          Units selected for this illustration: oldest eligible units first (FIFO).
        </p>
      </div>
    </ScreenShell>
  );
}
