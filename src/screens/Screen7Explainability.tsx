import { ScreenShell } from '@/components/ui/ScreenShell';
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

  const listItems = (items: string[]) => (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-ink-4 flex-shrink-0 mt-2" />
          <span className="text-[13px] text-ink-2">{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <ScreenShell onBack={onBack}>
      <div className="pt-6 animate-fade-in-up">
        <h1 className="text-headline text-ink mb-2 leading-tight">
          Why am I seeing this?
        </h1>
        <p className="text-[13px] text-ink-2 leading-relaxed mb-8">
          We pull together the data we have about your investment to show what a redemption
          changes — and what we don't know.
        </p>

        {/* Three clean sections separated by dividers */}
        <div className="border-t border-border">

          <div className="py-5 border-b border-border">
            <p className="eyebrow mb-3">Data used</p>
            {listItems([
              'Fund value',
              'Units',
              'Purchase price',
              'Purchase dates',
              'Goal value',
              'Portfolio allocation',
              'Fund / category performance',
            ])}
          </div>

          <div className="py-5 border-b border-border">
            <p className="eyebrow mb-3">Calculations</p>
            {listItems([
              'Redemption amount',
              'Realised P/L',
              'Goal impact',
              'Portfolio allocation change',
            ])}
          </div>

          <div className="py-5 border-b border-border">
            <p className="eyebrow mb-3">Unknowns</p>
            {listItems(unknowns)}
          </div>

          {/* How each number was derived — expandable rows */}
          <div className="py-2">
            <ExpandableSection title="How was my loss calculated?">
              Units are sold oldest first (FIFO). The units sold cost {formatINR(cost)} and are
              redeemed for {formatINR(amount)}, so the realised {plWord} is{' '}
              {formatINR(Math.abs(pl))} (≈ {formatINR(roundTo(Math.abs(pl), 100))}).
            </ExpandableSection>
            <ExpandableSection title="How was tax estimated?">
              The units sold are at a loss, so there is no capital-gains tax; they are past the
              exit-load period, so load is ₹0.
            </ExpandableSection>
            <ExpandableSection title="How did my goal change?">
              {goal.name} holds {formatLakhs(goal.currentValue)} today; this redemption removes{' '}
              {formatLakhs(amount)} → {formatLakhs(goalAfter(amount))}. Today's value only — no
              projected returns.
            </ExpandableSection>
            <ExpandableSection title="How did my equity mix change?">
              ({formatLakhs(portfolio.equity)} − {formatLakhs(amount)}) ÷ (
              {formatLakhs(portfolio.total)} − {formatLakhs(amount)}) ={' '}
              {formatPct(equitySharePct(amount), 1)}.
            </ExpandableSection>
          </div>
        </div>

        {/* Neutral consequence disclaimer */}
        <p className="text-[12px] text-ink-3 leading-relaxed text-center my-8 font-medium">
          These numbers describe consequences.<br />
          They are not a recommendation.
        </p>

        {/* Solid secondary button */}
        <Button variant="secondary" onClick={onBack} className="w-full mb-4">
          Back
        </Button>
      </div>
    </ScreenShell>
  );
}
