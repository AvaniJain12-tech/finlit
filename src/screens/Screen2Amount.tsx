import { useState } from 'react';
import { ScreenShell } from '@/components/ui/ScreenShell';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MetricRow } from '@/components/ui/MetricRow';
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
      <div className="pt-3 animate-fade-in-up">
        <h1 className="text-headline text-slate-900 mb-1">
          How much would you like to redeem?
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          Enter the amount you'd like to withdraw.
        </p>

        <div className="mb-6">
          <div className="flex items-baseline justify-center gap-1 py-2">
            <span className="text-4xl font-bold text-slate-300">₹</span>
            <input
              type="text"
              inputMode="numeric"
              value={formatted}
              onChange={handleAmountChange}
              style={{ width: `${Math.max(formatted.length, 1) + 0.5}ch` }}
              className="text-5xl font-bold tabular text-slate-900 bg-transparent border-none outline-none text-center max-w-[280px] focus:text-slate-900 transition-colors"
              aria-label="Redemption amount"
            />
          </div>
          <div className="h-0.5 w-24 mx-auto bg-slate-300 rounded-full" />
          {tooHigh && (
            <p className="text-sm text-slate-600 text-center mt-3" role="status">
              More than this holding's value ({formatINR(fund.currentValue)}).
            </p>
          )}
        </div>

        <Card className="mb-6">
          <MetricRow label="Estimated proceeds" value={formatINR(tooHigh ? 0 : amount)} />
          <div className="h-px bg-slate-100 my-1" />
          <MetricRow label="Expected credit" value={redemption.expectedCredit} />
        </Card>

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
