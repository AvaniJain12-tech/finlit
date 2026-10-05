import { useState, useCallback, useEffect } from 'react';
import { Screen1Fund } from '@/screens/Screen1Fund';
import { Screen2Amount } from '@/screens/Screen2Amount';
import { Screen3Receipt } from '@/screens/Screen3Receipt';
import { Screen4Reason } from '@/screens/Screen4Reason';
import { Screen5MarketWorry } from '@/screens/Screen5MarketWorry';
import { Screen6NeedCash } from '@/screens/Screen6NeedCash';
import { Screen7Explainability } from '@/screens/Screen7Explainability';
import { Screen8Completion } from '@/screens/Screen8Completion';
import { redemption } from '@/lib/data';

type Screen =
  | 'fund'
  | 'amount'
  | 'receipt'
  | 'reason'
  | 'marketWorry'
  | 'needCash'
  | 'explainability'
  | 'completion';

function App() {
  const [screen, setScreen] = useState<Screen>('fund');
  const [amount, setAmount] = useState<number>(redemption.amount);
  const [purpose, setPurpose] = useState<string | null>(null);

  const go = useCallback((s: Screen) => setScreen(s), []);

  // Every screen opens at the top, not at the previous screen's scroll position.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen]);

  const handleAmountContinue = (val: number) => {
    setAmount(val);
    go('receipt');
  };

  // Only an explicit Confirm submits the redemption.
  const handleConfirm = () => go('completion');

  const handleReasonOther = (reason: string) => {
    setPurpose(reason === 'Skip' ? null : reason);
    go('receipt');
  };

  const handleNeedCashConfirm = (val: number) => {
    setAmount(val);
    go('completion');
  };

  const handleRestart = () => {
    setAmount(redemption.amount);
    setPurpose(null);
    go('fund');
  };

  switch (screen) {
    case 'fund':
      return <Screen1Fund onRedeem={() => go('amount')} />;
    case 'amount':
      return (
        <Screen2Amount
          initialAmount={amount}
          onBack={() => go('fund')}
          onContinue={handleAmountContinue}
        />
      );
    case 'receipt':
      return (
        <Screen3Receipt
          amount={amount}
          purpose={purpose}
          onBack={() => go('amount')}
          onWhatsThisFor={() => go('reason')}
          onWhyAmISeeing={() => go('explainability')}
          onChangeAmount={() => go('amount')}
          onConfirm={handleConfirm}
        />
      );
    case 'reason':
      return (
        <Screen4Reason
          onBack={() => go('receipt')}
          onWorriedMarkets={() => {
            setPurpose('Worried markets will fall');
            go('marketWorry');
          }}
          onNeedCash={() => {
            setPurpose('Need cash');
            go('needCash');
          }}
          onOtherContinue={handleReasonOther}
        />
      );
    case 'marketWorry':
      return (
        <Screen5MarketWorry
          amount={amount}
          onBack={() => go('reason')}
          onBackToReceipt={() => go('receipt')}
          onConfirm={handleConfirm}
        />
      );
    case 'needCash':
      return (
        <Screen6NeedCash
          amount={amount}
          onBack={() => go('receipt')}
          onConfirm={handleNeedCashConfirm}
        />
      );
    case 'explainability':
      return <Screen7Explainability amount={amount} onBack={() => go('receipt')} />;
    case 'completion':
      return <Screen8Completion amount={amount} onRestart={handleRestart} />;
    default:
      return <Screen1Fund onRedeem={() => go('amount')} />;
  }
}

export default App;
