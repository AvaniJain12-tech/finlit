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
      label: `If the fund falls ${pct}%`,
      body: (
        <>
          You avoid about <span className="font-semibold text-ink-DEFAULT">{move}</span> of
          decline before you buy back.
        </>
      ),
    },
    {
      label: `If the fund rises ${pct}%`,
      body: (
        <>
          Buying back the same units costs about{' '}
          <span className="font-semibold text-ink-DEFAULT">{move}</span> more.
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
      <div className="pt-5 animate-fade-in-up">
        <h1 className="text-headline text-ink-DEFAULT mb-2 leading-snug">
          If the market moves next
        </h1>
        <p className="text-[13px] text-ink-tertiary mb-8">
          On the {formatINR(amount)} you're redeeming.
        </p>

        {/* Two symmetrical scenario blocks — identical in every dimension */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {scenarios.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl border border-border-DEFAULT p-4 flex flex-col gap-3"
            >
              <p className="eyebrow">{s.label}</p>
              <p className="text-[13px] text-ink-secondary leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="space-y-1">
          <p className="text-[13px] text-ink-secondary leading-relaxed">
            We can't predict which happens.
          </p>
          <p className="text-[11px] text-ink-tertiary leading-relaxed">
            These are illustrations, not predictions.
          </p>
        </div>
      </div>
    </ScreenShell>
  );
}
