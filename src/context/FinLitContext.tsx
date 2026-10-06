import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import {
  redemption,
  initialNotifications,
  initialActivities,
  initialDecisionHistory,
  initialNotificationSettings,
  aiExplanationTemplates,
  costOfUnitsSold,
  realisedPL,
  goalAfter,
  equitySharePct,
  formatINR,
  type NotificationItem,
  type ActivityEvent,
  type DecisionRecord,
  type NotificationSettingItem,
  type NotificationFrequency,
  type AiExplanationPayload,
} from '@/lib/data';

export type Tab = 'home' | 'portfolio' | 'insights' | 'activity';

export type FlowScreen =
  | 'fund'
  | 'amount'
  | 'receipt'
  | 'reason'
  | 'marketWorry'
  | 'needCash'
  | 'explainability'
  | 'completion'
  | null;

export type DecisionStatus =
  | 'review_ready'
  | 'in_review'
  | 'pending'
  | 'processing'
  | 'completed'
  | 'retained';

interface ToastData {
  id: number;
  message: string;
  submessage?: string;
}

interface FinLitContextType {
  // Financial State
  amount: number;
  setAmount: (amt: number) => void;
  purpose: string | null;
  setPurpose: (purpose: string | null) => void;
  decisionStatus: DecisionStatus;
  setDecisionStatus: (status: DecisionStatus) => void;

  // Navigation
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  flowScreen: FlowScreen;
  setFlowScreen: (screen: FlowScreen) => void;
  startRedemptionFlow: (initialStep?: FlowScreen) => void;
  exitRedemptionFlow: () => void;
  deepLink: (type: 'receipt' | 'portfolio' | 'goal' | 'insights' | 'activity') => void;

  // Notifications
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  isNotificationCenterOpen: boolean;
  openNotificationCenter: () => void;
  closeNotificationCenter: () => void;

  // Activities & Audit Timeline
  activities: ActivityEvent[];
  addActivity: (event: Omit<ActivityEvent, 'id' | 'time'>) => void;

  // Decision History
  decisionHistory: DecisionRecord[];
  confirmRedemption: () => void;

  // Settings & Trust
  notificationSettings: Record<string, NotificationSettingItem>;
  updateNotificationFrequency: (id: string, frequency: NotificationFrequency) => void;
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;

  // AI & Explainability Modals
  aiModal: AiExplanationPayload | null;
  openAiExplanation: (topicKey: 'goal' | 'loss' | 'equity' | 'drawdown') => void;
  closeAiExplanation: () => void;
  whyModalOpen: boolean;
  openWhyModal: () => void;
  closeWhyModal: () => void;

  // Toast
  toast: ToastData | null;
  showToast: (message: string, submessage?: string) => void;

  // Loading & Error States
  isRefreshing: boolean;
  simulateRefresh: () => void;
  hasError: boolean;
  triggerSimulatedError: () => void;
  clearError: () => void;
}

const FinLitContext = createContext<FinLitContextType | undefined>(undefined);

export function FinLitProvider({ children }: { children: ReactNode }) {
  const [amount, setAmountState] = useState<number>(redemption.amount);
  const [purpose, setPurpose] = useState<string | null>(null);
  const [decisionStatus, setDecisionStatus] = useState<DecisionStatus>('review_ready');

  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [flowScreen, setFlowScreen] = useState<FlowScreen>(null);

  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [activities, setActivities] = useState<ActivityEvent[]>(initialActivities);
  const [decisionHistory, setDecisionHistory] = useState<DecisionRecord[]>(initialDecisionHistory);
  const [notificationSettings, setNotificationSettings] = useState(initialNotificationSettings);

  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [aiModal, setAiModal] = useState<AiExplanationPayload | null>(null);
  const [whyModalOpen, setWhyModalOpen] = useState(false);

  const [toast, setToast] = useState<ToastData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasError, setHasError] = useState(false);

  const showToast = useCallback((message: string, submessage?: string) => {
    const id = Date.now();
    setToast({ id, message, submessage });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 3200);
  }, []);

  const setAmount = useCallback((newAmount: number) => {
    setAmountState(newAmount);
    showToast('Decision Receipt updated', `${formatINR(newAmount)} redemption context refreshed`);
  }, [showToast]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
    showToast('Notification marked as read');
  }, [showToast]);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast('All notifications marked as read');
  }, [showToast]);

  const openNotificationCenter = useCallback(() => setIsNotificationCenterOpen(true), []);
  const closeNotificationCenter = useCallback(() => setIsNotificationCenterOpen(false), []);

  const openSettings = useCallback(() => setIsSettingsOpen(true), []);
  const closeSettings = useCallback(() => setIsSettingsOpen(false), []);

  const openAiExplanation = useCallback((topicKey: 'goal' | 'loss' | 'equity' | 'drawdown') => {
    const templateFn = aiExplanationTemplates[topicKey];
    if (templateFn) {
      setAiModal(templateFn(amount));
    }
  }, [amount]);

  const closeAiExplanation = useCallback(() => setAiModal(null), []);

  const openWhyModal = useCallback(() => setWhyModalOpen(true), []);
  const closeWhyModal = useCallback(() => setWhyModalOpen(false), []);

  const addActivity = useCallback((event: Omit<ActivityEvent, 'id' | 'time'>) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newEvent: ActivityEvent = {
      ...event,
      id: `act-${Date.now()}`,
      time: timeStr,
    };
    setActivities((prev) => [newEvent, ...prev]);
  }, []);

  const startRedemptionFlow = useCallback((initialStep: FlowScreen = 'receipt') => {
    setFlowScreen(initialStep);
    setDecisionStatus('in_review');
    window.scrollTo(0, 0);
  }, []);

  const exitRedemptionFlow = useCallback(() => {
    setFlowScreen(null);
    window.scrollTo(0, 0);
  }, []);

  const deepLink = useCallback((type: 'receipt' | 'portfolio' | 'goal' | 'insights' | 'activity') => {
    setIsNotificationCenterOpen(false);
    setIsSettingsOpen(false);
    setAiModal(null);
    setWhyModalOpen(false);

    if (type === 'receipt') {
      setFlowScreen('receipt');
      showToast('Decision Receipt opened', 'Reviewing impact for Sample Flexi Cap');
    } else if (type === 'portfolio') {
      setFlowScreen(null);
      setActiveTab('portfolio');
      showToast('Portfolio opened', 'Viewing equity allocation & holdings');
    } else if (type === 'goal') {
      setFlowScreen(null);
      setActiveTab('insights');
      showToast('Goal view opened', 'Home — 2031 goal trajectory');
    } else if (type === 'insights') {
      setFlowScreen(null);
      setActiveTab('insights');
      showToast('Context opened', 'Fund drawdown & peer benchmark');
    } else if (type === 'activity') {
      setFlowScreen(null);
      setActiveTab('activity');
      showToast('Activity log opened', 'Audit trail of recent transactions');
    }
    window.scrollTo(0, 0);
  }, [showToast]);

  const confirmRedemption = useCallback(() => {
    setDecisionStatus('completed');
    addActivity({
      dateSection: 'today',
      title: 'Redemption confirmed',
      detail: `Sample Flexi Cap · ${formatINR(amount)}`,
      meta: 'Submitted to registrar · Expected credit in up to 3 working days',
      category: 'redemption',
      statusBadge: 'Completed',
      isClickable: true,
      deepLinkType: 'receipt',
    });

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      category: 'decision',
      title: 'Redemption submitted',
      body: `Your ${formatINR(amount)} redemption order has been logged and sent for processing.`,
      time: 'Just now',
      section: 'today',
      unread: true,
      priority: 'high',
      deepLinkType: 'activity',
      actionLabel: 'View audit trail',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Add decision record to history
    const newRecord: DecisionRecord = {
      id: `dec-${Date.now()}`,
      amount,
      fundName: 'Sample Flexi Cap',
      date: 'Today',
      status: 'Completed',
      receiptViewed: true,
      realisedPL: realisedPL(amount),
      goalImpact: `Home 2031 (−${formatINR(amount)})`,
    };
    setDecisionHistory((prev) => [newRecord, ...prev]);

    showToast('Redemption confirmed', `${formatINR(amount)} order submitted to exchange`);
  }, [amount, addActivity, showToast]);

  const updateNotificationFrequency = useCallback((id: string, frequency: NotificationFrequency) => {
    setNotificationSettings((prev) => {
      const current = prev[id];
      if (!current || current.isMandatory) return prev;
      return {
        ...prev,
        [id]: { ...current, frequency },
      };
    });
    showToast('Preferences updated', `Saved ${frequency} delivery`);
  }, [showToast]);

  const simulateRefresh = useCallback(() => {
    setIsRefreshing(true);
    setHasError(false);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Portfolio refreshed', 'Synchronized with registrar (CAMS/KFintech)');
    }, 700);
  }, [showToast]);

  const triggerSimulatedError = useCallback(() => {
    setHasError(true);
    showToast('Notice', 'Simulated network disconnect for testing error recovery');
  }, [showToast]);

  const clearError = useCallback(() => {
    setHasError(false);
    simulateRefresh();
  }, [simulateRefresh]);

  return (
    <FinLitContext.Provider
      value={{
        amount,
        setAmount,
        purpose,
        setPurpose,
        decisionStatus,
        setDecisionStatus,
        activeTab,
        setActiveTab,
        flowScreen,
        setFlowScreen,
        startRedemptionFlow,
        exitRedemptionFlow,
        deepLink,
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        isNotificationCenterOpen,
        openNotificationCenter,
        closeNotificationCenter,
        activities,
        addActivity,
        decisionHistory,
        confirmRedemption,
        notificationSettings,
        updateNotificationFrequency,
        isSettingsOpen,
        openSettings,
        closeSettings,
        aiModal,
        openAiExplanation,
        closeAiExplanation,
        whyModalOpen,
        openWhyModal,
        closeWhyModal,
        toast,
        showToast,
        isRefreshing,
        simulateRefresh,
        hasError,
        triggerSimulatedError,
        clearError,
      }}
    >
      {children}
    </FinLitContext.Provider>
  );
}

export function useFinLit() {
  const context = useContext(FinLitContext);
  if (!context) {
    throw new Error('useFinLit must be used within a FinLitProvider');
  }
  return context;
}
