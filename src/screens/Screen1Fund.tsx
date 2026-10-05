import { TrendingDown } from 'lucide-react';
import { ScreenShell } from '@/components/ui/ScreenShell';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MetricRow } from '@/components/ui/MetricRow';
import { AmountDisplay } from '@/components/ui/AmountDisplay';
import { fund, formatINR } from '@/lib/data';

interface Screen1FundProps {
  onRedeem: () => void;
}

export function Screen1Fund({ onRedeem }: Screen1FundProps) {
  return (
    <ScreenShell showHeader brandLabel="FinLit Ventures">
      <div className="pt-3 animate-fade-in-up">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400 mb-1">
          Your investment
        </p>
        <h1 className="text-headline text-slate-900 mb-5">{fund.name}</h1>

        <Card className="mb-4">
          <p className="text-sm text-slate-500 font-medium mb-1">Current value</p>
          <AmountDisplay amount={formatINR(fund.currentValue)} size="xl" className="mb-4" />
          <div className="h-px bg-slate-100 mb-1" />
          <MetricRow label="Invested" value={formatINR(fund.invested)} />
          <MetricRow
            label="Return"
            value={`${formatINR(fund.returns)}  ·  ${fund.returnsPct}%`}
            valueClassName="text-slate-700"
          />
          <MetricRow label="52-week high" value={formatINR(fund.fiftyTwoWeekHigh)} />
        </Card>

        <Card className="mb-6 flex items-start gap-3.5">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 flex-shrink-0">
            <TrendingDown className="w-5 h-5 text-slate-500" strokeWidth={2} />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-slate-700 mb-0.5">
              {fund.pctBelowHigh}% below its 52-week high
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Similar funds are {fund.similarFundsPctBelow}% below their highs.
            </p>
          </div>
        </Card>

        <Button onClick={onRedeem} className="w-full">
          Redeem
        </Button>
      </div>
    </ScreenShell>
  );
}
