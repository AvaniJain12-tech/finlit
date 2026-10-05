import { ScreenShell } from '@/components/ui/ScreenShell';
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

  const scenarios = [
    {
      label: `Fund falls ${pct}%`,
      result: `≈ ${formatINR(Math.round(amount * (1 - pct / 100)))}`,
      note: `You avoid about ${move} of decline — before buying back.`,
    },
    {
      label: `Fund rises ${pct}%`,
      result: `≈ ${formatINR(Math.round(amount * (1 + pct / 100)))}`,
      note: `Buying back the same units costs about ${move} more.`,
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
      <div className="pt-6 animate-fade-in-up">
        <h1 className="text-headline text-ink mb-2 leading-tight">
          If the market moves {pct}%…
        </h1>
        <p className="text-[13px] text-ink-3 mb-8">
          On the {formatINR(amount)} you're redeeming.
        </p>

        {/* Perfectly symmetrical scenario cards */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {scenarios.map((s) => (
            <div
              key={s.label}
              className="bg-surface rounded-xl border border-border p-4 flex flex-col gap-2"
            >
              <p className="eyebrow">{s.label}</p>
              <p className="text-num-md tabular font-[700] text-ink leading-none">
                {s.result}
              </p>
              <p className="text-[12px] text-ink-2 leading-relaxed">{s.note}</p>
            </div>
          ))}
        </div>

        <div className="bg-border-2 rounded-xl p-4">
          <p className="text-[13px] text-ink-2 leading-relaxed">
            We can't predict which happens. These are illustrations, not predictions.
          </p>
        </div>
      </div>
    </ScreenShell>
  );
}
