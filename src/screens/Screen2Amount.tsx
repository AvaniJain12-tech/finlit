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
      <div className="pt-6 animate-fade-in-up">

        <h1 className="text-headline text-ink mb-1 leading-tight">
          How much would you like to redeem?
        </h1>
        <p className="text-[13px] text-ink-3 mb-10">
          Maximum {formatINR(fund.currentValue)}
        </p>

        {/* Large premium amount input */}
        <div className="mb-10">
          <div className="flex items-baseline justify-center gap-1 py-3">
            <span className="text-num-lg font-[750] text-ink-4 tabular leading-none select-none">₹</span>
            <input
              type="text"
              inputMode="numeric"
              value={formatted}
              onChange={handleAmountChange}
              style={{ width: `${Math.max(formatted.length, 2) + 0.5}ch` }}
              className="text-display tabular font-[750] text-ink bg-transparent border-none outline-none text-center max-w-[310px] tracking-tight leading-none"
              aria-label="Redemption amount"
            />
          </div>
          {/* Input underline indicator */}
          <div className="h-[2px] w-20 mx-auto bg-accent rounded-full" />
          {tooHigh && (
            <p className="text-[13px] text-ink-2 text-center mt-4" role="status">
              Exceeds holding value ({formatINR(fund.currentValue)})
            </p>
          )}
        </div>

        {/* Summary rows */}
        <div className="bg-surface rounded-xl border border-border p-5 mb-8 divide-y divide-border-2">
          <div className="flex items-baseline justify-between pb-3">
            <span className="text-[13px] text-ink-2 font-medium">Estimated proceeds</span>
            <span className="text-[15px] font-semibold tabular text-ink">
              {formatINR(tooHigh ? 0 : amount)}
            </span>
          </div>
          <div className="flex items-baseline justify-between pt-3">
            <span className="text-[13px] text-ink-2 font-medium">Expected credit</span>
            <span className="text-[15px] font-semibold tabular text-ink">{redemption.expectedCredit}</span>
          </div>
        </div>

        {/* SOLID PRIMARY BUTTON */}
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
