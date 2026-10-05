import { useState } from 'react';
import { ScreenShell } from '@/components/ui/ScreenShell';
import { Button } from '@/components/ui/Button';
import { fund, redemption, formatINR } from '@/lib/data';

interface Screen2AmountProps {
  initialAmount: number;
  onBack: () => void;
  onContinue: (amount: number) => void;
}

export function Screen2Amount({ initialAmount, onBack, onContinue }: Screen2AmountProps) {
  const [amount, setAmount] = useState(initialAmount);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setAmount(raw ? parseInt(raw, 10) : 0);
  };

  const formatted = new Intl.NumberFormat('en-IN').format(amount);
  const tooHigh = amount > fund.currentValue;

  return (
    <ScreenShell onBack={onBack}>
      <div className="pt-5 animate-fade-in-up">

        <h1 className="text-headline text-ink-DEFAULT mb-1 leading-snug">
          How much would you like to redeem?
        </h1>
        <p className="text-[13px] text-ink-tertiary mb-10">
          Maximum {formatINR(fund.currentValue)}
        </p>

        {/* Premium amount input */}
        <div className="mb-10">
          <div className="flex items-baseline justify-center gap-0.5 py-3">
            <span
              className="text-amount-lg font-bold text-ink-faint tabular leading-none select-none"
              aria-hidden="true"
            >
              ₹
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={formatted}
              onChange={handleAmountChange}
              style={{ width: `${Math.max(formatted.length, 1) + 0.25}ch` }}
              className="text-display font-bold tabular text-ink-DEFAULT bg-transparent border-none outline-none text-center max-w-[300px] focus:text-ink-DEFAULT tracking-tight leading-none"
              aria-label="Redemption amount"
            />
          </div>
          {/* Elegant underline input indicator */}
          <div className="h-px w-16 mx-auto bg-ink-faint rounded-full" />

          {tooHigh && (
            <p className="text-[13px] text-ink-secondary text-center mt-4" role="status">
              Exceeds holding value ({formatINR(fund.currentValue)})
            </p>
          )}
        </div>

        {/* Summary row */}
        <div className="border-t border-border-DEFAULT pt-4 mb-8 space-y-0">
          <div className="flex items-baseline justify-between py-2.5">
            <p className="text-[13px] text-ink-secondary font-medium">Estimated proceeds</p>
            <p className="text-[15px] font-semibold tabular text-ink-DEFAULT">
              {formatINR(tooHigh ? 0 : amount)}
            </p>
          </div>
          <div className="h-px bg-border-subtle" />
          <div className="flex items-baseline justify-between py-2.5">
            <p className="text-[13px] text-ink-secondary font-medium">Expected credit</p>
            <p className="text-[15px] font-semibold tabular text-ink-DEFAULT">
              {redemption.expectedCredit}
            </p>
          </div>
        </div>

        <Button
          onClick={() => onContinue(amount)}
          className="w-full"
          disabled={amount <= 0 || tooHigh}
        >
          Continue
        </Button>
      </div>
    </ScreenShell>
  );
}
