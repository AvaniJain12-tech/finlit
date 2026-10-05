import { ScreenShell } from '@/components/ui/ScreenShell';
import { Card } from '@/components/ui/Card';
import { ActionPair } from '@/components/ui/ActionPair';
import { marketScenarios, scenarioMove, formatINR } from '@/lib/data';

interface Screen5MarketWorryProps {
  amount: number;
  onBack: () => void;
  onBackToReceipt: () => void;
  onConfirm: () => void;
}

export function Screen5MarketWorry({
  amount,
  onBack,
  onBackToReceipt,
  onConfirm,
}: Screen5MarketWorryProps) {
  const move = formatINR(scenarioMove(amount));
  const pct = marketScenarios.movePct;

  // Both scenarios share one card style: neither outcome is presented as preferable.
  const scenarios = [
    {
      label: `If the fund falls ${pct}% before you buy back`,
      body: (
        <>
          You avoid about <span className="font-semibold text-slate-900">{move}</span> of decline.
        </>
      ),
    },
    {
      label: `If the fund rises ${pct}%`,
      body: (
        <>
          Buying back the same units costs about{' '}
          <span className="font-semibold text-slate-900">{move}</span> more.
        </>
      ),
    },
  ];

  return (
    <ScreenShell
      onBack={onBack}
      footer={
        <ActionPair
          left={{ label: 'Back to receipt', onClick: onBackToReceipt }}
          right={{ label: `Confirm ${formatINR(amount)}`, onClick: onConfirm }}
        />
      }
    >
      <div className="pt-3 animate-fade-in-up">
        <h1 className="text-headline text-slate-900 mb-2">If the market moves next</h1>
        <p className="text-sm text-slate-500 mb-6">
          On the {formatINR(amount)} you're redeeming.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {scenarios.map((s) => (
            <Card key={s.label}>
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-2">
                {s.label}
              </p>
              <p className="text-[15px] text-slate-600 leading-relaxed">{s.body}</p>
            </Card>
          ))}
        </div>

        <div className="mb-4 space-y-1.5">
          <p className="text-sm text-slate-600 leading-relaxed">
            We can't predict which happens.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            These are illustrations, not predictions.
          </p>
        </div>
      </div>
    </ScreenShell>
  );
}
