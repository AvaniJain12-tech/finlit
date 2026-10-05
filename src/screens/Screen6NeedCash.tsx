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
            label: `Confirm ${formatINR(value)}`,
            onClick: () => onConfirm(value),
            disabled: !valid,
          }}
        />
      }
    >
      <div className="pt-5 animate-fade-in-up">
        <h1 className="text-headline text-ink-DEFAULT mb-8 leading-snug">
          How much do you need?
        </h1>

        {/* Large amount input — the visual focus */}
        <div className="mb-1">
          <div className="flex items-baseline justify-center gap-0.5 py-2">
            <span className="text-amount-lg font-bold text-ink-faint tabular leading-none select-none">
              ₹
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={formatted}
              onChange={handleChange}
              style={{ width: `${Math.max(formatted.length, 1) + 0.25}ch` }}
              className="text-display font-bold tabular text-ink-DEFAULT bg-transparent border-none outline-none text-center max-w-[280px] tracking-tight leading-none"
              aria-label="Amount you need"
            />
          </div>
          <div className="h-px w-16 mx-auto bg-ink-faint rounded-full" />
        </div>
        <p className="text-[12px] text-ink-tertiary text-center mt-3 mb-8" role="status">
          {tooHigh ? "Exceeds this holding's value." : 'You can edit this amount.'}
        </p>

        {/* Goal impact */}
        <div className="border-t border-border-DEFAULT pt-1">
          <div className="py-4 border-b border-border-subtle">
            <p className="eyebrow mb-3">Your goal</p>
            <p className="text-[13px] font-semibold text-ink-DEFAULT mb-2">{goal.name}</p>
            <div className="flex items-baseline gap-3">
              <span className="text-amount-md font-bold tabular text-ink-tertiary leading-none">
                {formatLakhs(goal.currentValue)}
              </span>
              <span className="text-ink-faint text-lg leading-none">→</span>
              <span className="text-amount-md font-bold tabular text-ink-DEFAULT leading-none">
                {valid ? formatLakhs(goalAfter(value)) : '—'}
              </span>
            </div>
          </div>

          <div className="pt-1">
            <p className="eyebrow pt-4 mb-2">Transaction</p>
            <div className="space-y-0 divide-y divide-border-subtle">
              <MetricRow label="Exit load" value={formatINR(redemption.exitLoad)} />
              <MetricRow label="Estimated tax" value={formatINR(redemption.estimatedTax)} />
              <MetricRow label="Expected credit" value={redemption.expectedCredit} />
            </div>
          </div>
        </div>

        <p className="text-[11px] text-ink-tertiary leading-relaxed mt-4">
          Units selected for this illustration: oldest eligible units first (FIFO).
        </p>
      </div>
    </ScreenShell>
  );
}
