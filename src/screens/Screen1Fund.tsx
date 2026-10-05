import { ScreenShell } from '@/components/ui/ScreenShell';
import { Button } from '@/components/ui/Button';
import { fund, formatINR } from '@/lib/data';

interface Screen1FundProps {
  onRedeem: () => void;
}

export function Screen1Fund({ onRedeem }: Screen1FundProps) {
  return (
    <ScreenShell showHeader brandLabel="FinLit Ventures">
      <div className="pt-6 animate-fade-in-up">

        {/* Fund identity */}
        <p className="eyebrow mb-2">Your investment</p>
        <h1 className="text-[22px] font-[700] text-ink leading-snug tracking-tight mb-8">
          {fund.name}
        </h1>

        {/* Current value — dominant hero */}
        <div className="mb-8">
          <p className="text-[12px] text-ink-3 font-medium mb-2 uppercase tracking-widest">
            Current value
          </p>
          <p className="text-display tabular font-[750] text-ink leading-none tracking-tight">
            {formatINR(fund.currentValue)}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-1" />

        {/* Fund metrics — clean rows */}
        <div className="divide-y divide-border-2">
          <div className="flex items-baseline justify-between py-3.5">
            <span className="text-[13px] text-ink-2 font-medium">Invested</span>
            <span className="text-[15px] font-semibold tabular text-ink">{formatINR(fund.invested)}</span>
          </div>
          <div className="flex items-baseline justify-between py-3.5">
            <span className="text-[13px] text-ink-2 font-medium">Return</span>
            <span className="text-[15px] font-semibold tabular text-ink">
              {formatINR(fund.returns)} · {fund.returnsPct}%
            </span>
          </div>
          <div className="flex items-baseline justify-between py-3.5">
            <span className="text-[13px] text-ink-2 font-medium">52-week high</span>
            <span className="text-[15px] font-semibold tabular text-ink">{formatINR(fund.fiftyTwoWeekHigh)}</span>
          </div>
        </div>

        <div className="h-px bg-border mb-6" />

        {/* Context note */}
        <p className="text-[13px] text-ink-3 leading-relaxed mb-10">
          {fund.pctBelowHigh}% below its 52-week high. Similar funds are {fund.similarFundsPctBelow}% below theirs.
        </p>

        {/* PRIMARY CTA — solid filled, impossible to miss */}
        <Button onClick={onRedeem} className="w-full">
          Redeem
        </Button>
      </div>
    </ScreenShell>
  );
}
