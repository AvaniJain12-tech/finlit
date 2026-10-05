import { ScreenShell } from '@/components/ui/ScreenShell';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ExpandableSection } from '@/components/ui/ExpandableSection';

interface Screen7ExplainabilityProps {
  onBack: () => void;
}

export function Screen7Explainability({ onBack }: Screen7ExplainabilityProps) {
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
                'Realized P/L',
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

        {/* Unknowns */}
        <div className="mb-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400 mb-3">
            Unknowns
          </p>
          <Card padded={false} className="p-4">
            <ul className="space-y-2.5 text-sm text-slate-600">
              {[
                'Future market returns',
                'Your future income',
                'Expenses outside this app',
                'Tax circumstances not available to the app',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Expandable sections */}
        <Card padded={false} className="p-5 mb-6">
          <ExpandableSection title="How was P/L calculated?">
            Realized P/L is the difference between the redemption value and the proportional
            purchase cost of the units being sold, based on your purchase price and dates.
          </ExpandableSection>
          <ExpandableSection title="Why this tax estimate?">
            The tax estimate uses illustrative sample data for this prototype. In a live app,
            it would factor in holding period, gains, and applicable capital gains tax rules.
          </ExpandableSection>
          <ExpandableSection title="How did the goal number change?">
            The goal value is reduced by the redemption amount. This shows the projected goal
            value after the withdrawal, based on current sample data.
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
