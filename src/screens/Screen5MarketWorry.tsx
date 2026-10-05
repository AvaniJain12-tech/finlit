import { ScreenShell } from '@/components/ui/ScreenShell';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AmountDisplay } from '@/components/ui/AmountDisplay';
import { marketScenarios, formatLakhs, formatINR } from '@/lib/data';

interface Screen5MarketWorryProps {
  onBack: () => void;
  onChangeAmount: () => void;
  onContinue: () => void;
}

export function Screen5MarketWorry({
  onBack,
  onChangeAmount,
  onContinue,
}: Screen5MarketWorryProps) {
  return (
    <ScreenShell onBack={onBack}>
      <div className="pt-3 animate-fade-in-up">
        <h1 className="text-headline text-slate-900 mb-6">If the market moves next</h1>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="p-4" padded={false}>
            <div className="p-4 pb-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-3">
                If the fund falls {marketScenarios.fallPct}%
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-semibold text-slate-400 tabular">
                  {formatINR(marketScenarios.currentValue)}
                </span>
                <span className="text-slate-300">→</span>
              </div>
              <AmountDisplay
                amount={formatINR(marketScenarios.fallValue)}
                size="md"
                className="mt-0.5"
              />
            </div>
          </Card>

          <Card className="p-4" padded={false}>
            <div className="p-4 pb-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-3">
                If the fund rises {marketScenarios.risePct}%
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-semibold text-slate-400 tabular">
                  {formatINR(marketScenarios.currentValue)}
                </span>
                <span className="text-slate-300">→</span>
              </div>
              <AmountDisplay
                amount={formatINR(marketScenarios.riseValue)}
                size="md"
                className="mt-0.5"
              />
            </div>
          </Card>
        </div>

        <div className="mb-8 space-y-1.5">
          <p className="text-sm text-slate-600 leading-relaxed">
            We can't predict which happens.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            These are illustrations, not predictions.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={onChangeAmount} className="flex-1">
            Change amount
          </Button>
          <Button variant="primary" onClick={onContinue} className="flex-1">
            Continue
          </Button>
        </div>
      </div>
    </ScreenShell>
  );
}
