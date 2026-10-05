import { ScreenShell } from '@/components/ui/ScreenShell';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ExpandableSection } from '@/components/ui/ExpandableSection';
import {
  goal,
  portfolio,
  unknowns,
  costOfUnitsSold,
  realisedPL,
  goalAfter,
  equitySharePct,
  roundTo,
  formatINR,
  formatLakhs,
  formatPct,
} from '@/lib/data';

interface Screen7ExplainabilityProps {
  amount: number;
  onBack: () => void;
}

export function Screen7Explainability({ amount, onBack }: Screen7ExplainabilityProps) {
  const cost = costOfUnitsSold(amount);
  const pl = realisedPL(amount);
  const plWord = pl < 0 ? 'loss' : 'gain';

  return (
    <ScreenShell onBack={onBack}>
      <div className="pt-3 animate-fade-in-up">
        <h1 className="text-headline text-slate-900 mb-6">Why am I seeing this?</h1>

        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          We pull together the data we have about your investment to show what a redemption
          changes. Here's what goes into it — and what doesn't.
        </p>

        {/* Data used */}
        <div className="mb-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400 mb-3">
            Data used
          </p>
          <Card padded={false} className="p-4">
            <ul className="space-y-2.5 text-sm text-slate-600">
              {[
                'Fund value',
                'Units',
                'Purchase price',
                'Purchase dates',
                'Goal value',
                'Portfolio allocation',
                'Fund/category performance',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Calculations */}
        <div className="mb-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400 mb-3">
            Calculations
          </p>
          <Card padded={false} className="p-4">
            <ul className="space-y-2.5 text-sm text-slate-600">
              {[
                'Redemption amount',
                'Realised P/L',
                'Goal impact',
                'Portfolio allocation change',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Unknowns — same list as the receipt */}
        <div className="mb-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400 mb-3">
            Unknowns
          </p>
          <Card padded={false} className="p-4">
            <ul className="space-y-2.5 text-sm text-slate-600">
              {unknowns.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* How each number was calculated */}
        <Card padded={false} className="p-5 mb-6">
          <ExpandableSection title="How was P/L calculated?">
            Units are sold oldest first (FIFO). The units sold cost {formatINR(cost)} and are
            redeemed for {formatINR(amount)}, so the realised {plWord} is{' '}
            {formatINR(Math.abs(pl))} (≈ {formatINR(roundTo(Math.abs(pl), 100))}).
          </ExpandableSection>
          <ExpandableSection title="Why this tax estimate?">
            The units sold are at a loss, so there is no capital-gains tax; they are past the
            exit-load period, so load is ₹0.
          </ExpandableSection>
          <ExpandableSection title="How did the goal number change?">
            {goal.name} holds {formatLakhs(goal.currentValue)} today; this redemption removes{' '}
            {formatLakhs(amount)} → {formatLakhs(goalAfter(amount))}. Today's value only — no
            projected returns.
          </ExpandableSection>
          <ExpandableSection title="How did the equity share change?">
            ({formatLakhs(portfolio.equity)} − {formatLakhs(amount)}) ÷ (
            {formatLakhs(portfolio.total)} − {formatLakhs(amount)}) ={' '}
            {formatPct(equitySharePct(amount), 1)}.
          </ExpandableSection>
        </Card>

        <div className="p-4 rounded-xl bg-slate-100/60 border border-slate-200/60 mb-6">
          <p className="text-sm text-slate-600 leading-relaxed text-center font-medium">
            These numbers describe consequences.
            <br />
            They are not a recommendation.
          </p>
        </div>

        <Button variant="secondary" onClick={onBack} className="w-full">
          Back
        </Button>
      </div>
    </ScreenShell>
  );
}
