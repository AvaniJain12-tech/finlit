import { useState } from 'react';
import { ScreenShell } from '@/components/ui/ScreenShell';
import { Button } from '@/components/ui/Button';
import {
  redemption,
  goal,
  goalAfter,
  equitySharePct,
  formatINR,
  formatLakhs,
  formatPct,
} from '@/lib/data';

interface Screen8CompletionProps {
  amount: number;
  onRestart: () => void;
  onReturnHome?: () => void;
}

export function Screen8Completion({ amount, onRestart, onReturnHome }: Screen8CompletionProps) {
  const [feedback, setFeedback] = useState<string | null>(null);

  return (
    <ScreenShell showHeader={false}>
      <div className="pt-10 animate-fade-in-up">

        {/* Minimal confirmation mark */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-12 h-12 rounded-full border-[1.5px] border-ink flex items-center justify-center mb-5">
            <svg
              width="18"
              height="14"
              viewBox="0 0 18 14"
              fill="none"
              className="text-ink"
            >
              <path
                d="M1.5 7L6.5 12L16.5 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="eyebrow mb-2">Redemption confirmed</p>
          <h1 className="text-display tabular font-[750] text-ink tracking-tight leading-none mb-2">
            {formatINR(amount)}
          </h1>
          <p className="text-[13px] text-ink-3">
            Expected in bank · {redemption.expectedCredit.toLowerCase()}
          </p>
        </div>

        {/* Consequence summary — divider rows */}
        <div className="border-t border-border mb-8">
          <div className="py-5 border-b border-border">
            <p className="eyebrow mb-3">Your goal</p>
            <p className="text-[14px] font-semibold text-ink mb-2">{goal.name}</p>
            <div className="flex items-baseline gap-3">
              <span className="text-num-md tabular font-[700] text-ink-3 leading-none">
                {formatLakhs(goal.currentValue)}
              </span>
              <span className="text-ink-4 text-xl leading-none">→</span>
              <span className="text-num-md tabular font-[700] text-ink leading-none">
                {formatLakhs(goalAfter(amount))}
              </span>
            </div>
          </div>

          <div className="py-5 border-b border-border">
            <p className="eyebrow mb-3">Your mix</p>
            <p className="text-[13px] text-ink-2 mb-2">
              Equity share of your mutual-fund portfolio
            </p>
            <div className="flex items-baseline gap-3">
              <span className="text-num-md tabular font-[700] text-ink-3 leading-none">
                {formatPct(equitySharePct())}
              </span>
              <span className="text-ink-4 text-xl leading-none">→</span>
              <span className="text-num-md tabular font-[700] text-ink leading-none">
                {formatPct(equitySharePct(amount))}
              </span>
            </div>
          </div>
        </div>

        {/* Comprehension question — lightweight research style */}
        <div className="mb-8">
          <p className="text-[13px] text-ink-2 text-center mb-4 leading-relaxed">
            Did this screen help you understand the decision?
          </p>
          <div className="grid grid-cols-3 gap-2.5">
            {['Yes', 'Somewhat', 'No'].map((option) => (
              <button
                key={option}
                onClick={() => setFeedback(option)}
                className={`py-3 rounded-lg text-[13px] font-semibold border transition-all duration-150 active:scale-[0.97] cursor-pointer ${
                  feedback === option
                    ? 'bg-ink text-white border-ink shadow-btn'
                    : 'bg-surface text-ink border-border hover:border-ink-3 hover:bg-border-2'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3 mb-6">
          {onReturnHome && (
            <Button variant="primary" onClick={onReturnHome} className="w-full">
              Return to Dashboard
            </Button>
          )}
          <Button variant="secondary" onClick={onRestart} className="w-full">
            Start over
          </Button>
        </div>
      </div>
    </ScreenShell>
  );
}
