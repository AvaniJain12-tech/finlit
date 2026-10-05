import { useState, useCallback } from 'react';
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
  const [returnTo, setReturnTo] = useState<Screen>('receipt');

  const go = useCallback((s: Screen) => setScreen(s), []);

  const handleRedeem = () => go('amount');

  const handleAmountContinue = (val: number) => {
    setAmount(val);
    go('receipt');
  };

  const handleConfirm = () => go('completion');

  const handleWhatsThisFor = () => {
    setReturnTo('receipt');
    go('reason');
  };

  const handleReasonWorried = () => {
    setReturnTo('completion');
    go('marketWorry');
  };

  const handleReasonNeedCash = () => {
    setReturnTo('completion');
    go('needCash');
  };

  const handleReasonOther = () => {
    go('completion');
  };

  const handleMarketWorryContinue = () => go('completion');

  const handleNeedCashChangeToLower = () => {
    setAmount(50000);
    go('completion');
  };

  const handleNeedCashKeep = () => go('completion');

  const handleRestart = () => {
    setAmount(redemption.amount);
    go('fund');
  };

  switch (screen) {
    case 'fund':
      return <Screen1Fund onRedeem={handleRedeem} />;
    case 'amount':
      return (
        <Screen2Amount
          onBack={() => go('fund')}
          onContinue={handleAmountContinue}
        />
      );
    case 'receipt':
      return (
        <Screen3Receipt
          amount={amount}
          onBack={() => go('amount')}
          onWhatsThisFor={handleWhatsThisFor}
          onWhyAmISeeing={() => go('explainability')}
          onChangeAmount={() => go('amount')}
          onConfirm={handleConfirm}
        />
      );
    case 'reason':
      return (
        <Screen4Reason
          onBack={() => go('receipt')}
          onWorriedMarkets={handleReasonWorried}
          onNeedCash={handleReasonNeedCash}
          onOtherContinue={handleReasonOther}
        />
      );
    case 'marketWorry':
      return (
        <Screen5MarketWorry
          onBack={() => go('reason')}
          onChangeAmount={() => go('amount')}
          onContinue={handleMarketWorryContinue}
        />
      );
    case 'needCash':
      return (
        <Screen6NeedCash
          amount={amount}
          onBack={() => go('receipt')}
          onChangeToLower={handleNeedCashChangeToLower}
          onKeepRequested={handleNeedCashKeep}
        />
      );
    case 'explainability':
      return <Screen7Explainability onBack={() => go('receipt')} />;
    case 'completion':
      return <Screen8Completion amount={amount} onRestart={handleRestart} />;
    default:
      return <Screen1Fund onRedeem={handleRedeem} />;
  }
}

export default App;
