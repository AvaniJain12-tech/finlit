import { ScreenShell } from '@/components/ui/ScreenShell';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { needCash, formatINR, formatLakhs } from '@/lib/data';

interface Screen6NeedCashProps {
  amount: number;
  onBack: () => void;
  onChangeToLower: () => void;
  onKeepRequested: () => void;
}

export function Screen6NeedCash({
  amount,
  onBack,
  onChangeToLower,
  onKeepRequested,
}: Screen6NeedCashProps) {
  return (
    <ScreenShell onBack={onBack}>
      <div className="pt-3 animate-fade-in-up">
        <h1 className="text-headline text-slate-900 mb-6">How much do you actually need?</h1>

        <Card className="mb-4">
          <div className="flex items-baseline justify-center py-2">
            <span className="text-3xl font-bold text-slate-300 mr-1">₹</span>
            <span className="text-4xl font-bold tabular text-slate-900">
              {new Intl.NumberFormat('en-IN').format(needCash.actualNeed)}
            </span>
          </div>
        </Card>

        <Card className="mb-6">
          <div className="flex items-baseline justify-between py-2.5">
            <div>
              <p className="text-sm text-slate-500 font-medium">Requested</p>
            </div>
            <p className="text-lg font-bold tabular text-slate-400">
              {formatINR(amount)}
            </p>
          </div>
          <div className="h-px bg-slate-100" />
          <div className="flex items-baseline justify-between py-2.5">
            <div>
              <p className="text-sm text-slate-500 font-medium">Needed</p>
            </div>
            <p className="text-lg font-bold tabular text-slate-900">
              {formatINR(needCash.actualNeed)}
            </p>
          </div>
        </Card>

        <div className="space-y-3 mb-8">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200">
            <div>
              <p className="text-xs text-slate-400 font-medium mb-1">Goal impact if {formatINR(needCash.actualNeed)}</p>
              <p className="text-sm font-semibold tabular text-slate-700">
                {formatLakhs(needCash.goalImpactIfNeeded)}
              </p>
            </div>
            <p className="text-xs text-slate-400 tabular">
              from {formatLakhs(706000)}
            </p>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200">
            <div>
              <p className="text-xs text-slate-400 font-medium mb-1">Goal impact if {formatINR(amount)}</p>
              <p className="text-sm font-semibold tabular text-slate-700">
                {formatLakhs(needCash.goalImpactIfRequested)}
              </p>
            </div>
            <p className="text-xs text-slate-400 tabular">
              from {formatLakhs(706000)}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={onChangeToLower} className="flex-1">
            Change to {formatINR(needCash.actualNeed)}
          </Button>
          <Button variant="primary" onClick={onKeepRequested} className="flex-1">
            Keep {formatINR(amount)}
          </Button>
        </div>
      </div>
    </ScreenShell>
  );
}
