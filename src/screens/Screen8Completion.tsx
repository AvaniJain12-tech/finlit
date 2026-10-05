import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ScreenShell } from '@/components/ui/ScreenShell';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MetricRow } from '@/components/ui/MetricRow';
import { AmountDisplay } from '@/components/ui/AmountDisplay';
import { redemption, goal, allocation, formatINR, formatLakhs } from '@/lib/data';

interface Screen8CompletionProps {
  amount: number;
  onRestart: () => void;
}

export function Screen8Completion({ amount, onRestart }: Screen8CompletionProps) {
  const [feedback, setFeedback] = useState<string | null>(null);

  return (
    <ScreenShell showHeader={false}>
      <div className="pt-6 animate-fade-in-up">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
            <CheckCircle2 className="w-8 h-8 text-slate-700" strokeWidth={1.75} />
          </div>
          <h1 className="text-headline text-slate-900 mb-1">Redemption submitted</h1>
          <p className="text-sm text-slate-400">Your request has been placed.</p>
        </div>

        <Card className="mb-4 text-center">
          <AmountDisplay amount={formatINR(amount)} size="xl" className="mb-1" />
          <p className="text-sm text-slate-500 font-medium">
            Expected credit {redemption.expectedCredit.toLowerCase()}
          </p>
        </Card>

        <Card className="mb-4">
          <p className="text-sm font-semibold text-slate-700 mb-3">{goal.name}</p>
          <div className="flex items-baseline gap-2.5">
            <span className="text-xl font-bold tabular text-slate-400">
              {formatLakhs(goal.currentValue)}
            </span>
            <span className="text-slate-300">→</span>
            <span className="text-xl font-bold tabular text-slate-900">
              {formatLakhs(goal.afterRedemption)}
            </span>
          </div>
        </Card>

        <Card className="mb-6">
          <p className="text-sm font-semibold text-slate-700 mb-3">Equity allocation</p>
          <div className="flex items-baseline gap-2.5">
            <span className="text-xl font-bold tabular text-slate-400">{allocation.current}%</span>
            <span className="text-slate-300">→</span>
            <span className="text-xl font-bold tabular text-slate-900">{allocation.after}%</span>
          </div>
        </Card>

        {/* Feedback */}
        <div className="pt-2">
          <p className="text-center text-sm font-medium text-slate-600 mb-4">
            Did this screen help you understand the decision?
          </p>
          <div className="grid grid-cols-3 gap-2.5 mb-6">
            {['Yes', 'Somewhat', 'No'].map((option) => (
              <button
                key={option}
                onClick={() => setFeedback(option)}
                className={`px-3 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 active:scale-[0.97] ${
                  feedback === option
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <Button
            variant="secondary"
            onClick={onRestart}
            className="w-full"
          >
            Start over
          </Button>
        </div>
      </div>
    </ScreenShell>
  );
}
