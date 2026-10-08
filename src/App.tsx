import { useEffect } from 'react';
import { FinLitProvider, useFinLit } from '@/context/FinLitContext';
import { AppShell } from '@/components/layout/AppShell';
import { HomeScreen } from '@/screens/HomeScreen';
import { PortfolioScreen } from '@/screens/PortfolioScreen';
import { InsightsScreen } from '@/screens/InsightsScreen';
import { ActivityScreen } from '@/screens/ActivityScreen';
import { Screen1Fund } from '@/screens/Screen1Fund';
import { Screen2Amount } from '@/screens/Screen2Amount';
import { Screen3Receipt } from '@/screens/Screen3Receipt';
import { Screen4Reason } from '@/screens/Screen4Reason';
import { Screen5MarketWorry } from '@/screens/Screen5MarketWorry';
import { Screen6NeedCash } from '@/screens/Screen6NeedCash';
import { Screen7Explainability } from '@/screens/Screen7Explainability';
import { Screen8Completion } from '@/screens/Screen8Completion';
import { Toast } from '@/components/ui/Toast';
import { AIExplanationModal } from '@/components/modals/AIExplanationModal';
import { WhyAmISeeingModal } from '@/components/modals/WhyAmISeeingModal';

function AppContent() {
  const {
    activeTab,
    flowScreen,
    setFlowScreen,
    amount,
    setAmount,
    purpose,
    setPurpose,
    exitRedemptionFlow,
    confirmRedemption,
    openAiExplanation,
    openWhyModal,
  } = useFinLit();

  // Expose helper on window for deep receipt buttons
  useEffect(() => {
    (window as any).__openAiExplanation = openAiExplanation;
    return () => {
      delete (window as any).__openAiExplanation;
    };
  }, [openAiExplanation]);

  // Ensure scroll is at top on screen change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab, flowScreen]);

  // If outside redemption flow, render the main product shell
  if (flowScreen === null) {
    return (
      <AppShell showBottomNav={true}>
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'portfolio' && <PortfolioScreen />}
        {activeTab === 'insights' && <InsightsScreen />}
        {activeTab === 'activity' && <ActivityScreen />}
      </AppShell>
    );
  }

  // Inside the redemption hero flow:
  const renderFlowScreen = () => {
    switch (flowScreen) {
      case 'fund':
        return (
          <Screen1Fund
            onBack={exitRedemptionFlow}
            onRedeem={() => {
              setFlowScreen('amount');
            }}
          />
        );

      case 'amount':
        return (
          <Screen2Amount
            initialAmount={amount}
            onBack={() => setFlowScreen('fund')}
            onContinue={(val) => {
              setAmount(val);
              setFlowScreen('receipt');
            }}
          />
        );

      case 'receipt':
        return (
          <Screen3Receipt
            amount={amount}
            purpose={purpose}
            onBack={exitRedemptionFlow}
            onWhatsThisFor={() => setFlowScreen('reason')}
            onWhyAmISeeing={openWhyModal}
            onChangeAmount={() => setFlowScreen('amount')}
            onConfirm={() => {
              confirmRedemption();
              setFlowScreen('completion');
            }}
          />
        );

      case 'reason':
        return (
          <Screen4Reason
            onBack={() => setFlowScreen('receipt')}
            onWorriedMarkets={() => {
              setPurpose('Worried markets will fall');
              setFlowScreen('marketWorry');
            }}
            onNeedCash={() => {
              setPurpose('Need cash');
              setFlowScreen('needCash');
            }}
            onOtherContinue={(reason) => {
              setPurpose(reason === 'Skip' ? null : reason);
              setFlowScreen('receipt');
            }}
          />
        );

      case 'marketWorry':
        return (
          <Screen5MarketWorry
            amount={amount}
            onBack={() => setFlowScreen('reason')}
            onBackToReceipt={() => setFlowScreen('receipt')}
            onConfirm={() => {
              confirmRedemption();
              setFlowScreen('completion');
            }}
          />
        );

      case 'needCash':
        return (
          <Screen6NeedCash
            amount={amount}
            onBack={() => setFlowScreen('receipt')}
            onConfirm={(val) => {
              setAmount(val);
              confirmRedemption();
              setFlowScreen('completion');
            }}
          />
        );

      case 'explainability':
        return (
          <Screen7Explainability
            amount={amount}
            onBack={() => setFlowScreen('receipt')}
          />
        );

      case 'completion':
        return (
          <Screen8Completion
            amount={amount}
            onRestart={() => {
              setAmount(80000);
              setPurpose(null);
              setFlowScreen('fund');
            }}
            onReturnHome={exitRedemptionFlow}
          />
        );

      default:
        return <Screen1Fund onBack={exitRedemptionFlow} onRedeem={() => setFlowScreen('amount')} />;
    }
  };

  return (
    <>
      {renderFlowScreen()}
      <Toast />
      <AIExplanationModal />
      <WhyAmISeeingModal />
    </>
  );
}

export function App() {
  return (
    <FinLitProvider>
      <AppContent />
    </FinLitProvider>
  );
}

export default App;
