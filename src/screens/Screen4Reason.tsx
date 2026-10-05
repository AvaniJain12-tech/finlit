import { useState } from 'react';
import { ScreenShell } from '@/components/ui/ScreenShell';
import { Chip } from '@/components/ui/Chip';
import { Button } from '@/components/ui/Button';
import { reasonChips } from '@/lib/data';

interface Screen4ReasonProps {
  onBack: () => void;
  onWorriedMarkets: () => void;
  onNeedCash: () => void;
  onOtherContinue: (reason: string) => void;
}

export function Screen4Reason({
  onBack,
  onWorriedMarkets,
  onNeedCash,
  onOtherContinue,
}: Screen4ReasonProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (chip: string) => {
    setSelected(chip);
  };

  const handleContinue = () => {
    if (!selected) return;
    if (selected === 'Worried markets will fall') {
      onWorriedMarkets();
    } else if (selected === 'Need cash') {
      onNeedCash();
    } else {
      onOtherContinue(selected);
    }
  };

  const isSpecial = selected === 'Worried markets will fall' || selected === 'Need cash';
  const showContinue = selected !== null && !isSpecial;

  return (
    <ScreenShell onBack={onBack}>
      <div className="pt-3 animate-fade-in-up">
        <h1 className="text-headline text-slate-900 mb-2">What's this money for?</h1>
        <p className="text-sm text-slate-500 leading-relaxed mb-6">
          This helps us show the most relevant context. Your choice doesn't change the amount
          you can redeem.
        </p>

        <div className="flex flex-wrap gap-2.5 mb-8">
          {reasonChips.map((chip) => (
            <Chip
              key={chip}
              label={chip}
              selected={selected === chip}
              onClick={() => handleSelect(chip)}
            />
          ))}
        </div>

        {showContinue && (
          <Button onClick={handleContinue} className="w-full animate-fade-in-up">
            Continue
          </Button>
        )}

        {isSpecial && (
          <Button onClick={handleContinue} className="w-full animate-fade-in-up">
            Continue
          </Button>
        )}
      </div>
    </ScreenShell>
  );
}
