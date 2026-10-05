import { ScreenShell } from '@/components/ui/ScreenShell';
import { Button } from '@/components/ui/Button';
import { MetricRow } from '@/components/ui/MetricRow';
import { fund, formatINR } from '@/lib/data';

interface Screen1FundProps {
  onRedeem: () => void;
}

export function Screen1Fund({ onRedeem }: Screen1FundProps) {
  return (
    <ScreenShell showHeader brandLabel="FinLit Ventures">
      <div className="pt-5 animate-fade-in-up">

        {/* Fund identity */}
        <p className="eyebrow mb-2">Your investment</p>
        <h1 className="text-headline text-ink-DEFAULT mb-6 leading-snug">{fund.name}</h1>

        {/* Current value — hero number */}
        <div className="mb-6">
          <p className="text-[12px] text-ink-tertiary font-medium mb-1.5 uppercase tracking-wider">Current value</p>
          <p className="text-display font-bold tabular text-ink-DEFAULT tracking-tight leading-none">
            {formatINR(fund.currentValue)}
          </p>
        </div>

        {/* Hairline divider */}
        <div className="border-t border-border-DEFAULT mb-5" />

        {/* Metrics */}
        <div className="space-y-0 divide-y divide-border-subtle">
          <MetricRow label="Invested" value={formatINR(fund.invested)} />
          <MetricRow
            label="Return"
            value={`${formatINR(fund.returns)}  ·  ${fund.returnsPct}%`}
          />
          <MetricRow label="52-week high" value={formatINR(fund.fiftyTwoWeekHigh)} />
        </div>

        {/* Hairline divider */}
        <div className="border-t border-border-DEFAULT mt-0 mb-6" />

        {/* Context note */}
        <p className="text-[13px] text-ink-tertiary leading-relaxed mb-8">
          {fund.pctBelowHigh}% below its 52-week high.{' '}
          Similar funds are {fund.similarFundsPctBelow}% below theirs.
        </p>

        <Button onClick={onRedeem} className="w-full">
          Redeem
        </Button>
      </div>
    </ScreenShell>
  );
}
