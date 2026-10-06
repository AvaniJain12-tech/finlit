export const fund = {
  name: 'Sample Flexi Cap',
  currentValue: 240000,
  invested: 272000,
  returns: -32000,
  returnsPct: -11.8,
  fiftyTwoWeekHigh: 274000,
  pctBelowHigh: 12.4,
  similarFundsPctBelow: 8.7,
};

// Whole mutual-fund portfolio (sample data).
export const portfolio = {
  total: 1200000,
  equity: 936000, // 78% equity today
};

export const redemption = {
  amount: 80000,
  expectedCredit: 'Up to 3 working days',
  exitLoad: 0,
  estimatedTax: 0,
};

export const goal = {
  name: 'Home 2031',
  currentValue: 706000,
  fundRepresentationPct: 34,
};

export const marketScenarios = {
  movePct: 10,
};

export const unknowns = [
  'Your cash needs',
  'Investments elsewhere',
  'LTCG exemption used elsewhere',
  'Future returns',
];

export const reasonChips = [
  'Need cash',
  'Goal reached',
  'Fund no longer fits',
  'Too much risk for me',
  'Worried markets will fall',
  'Rebalancing / tax',
  'Skip',
];

/* ------------------------------------------------------------------ */
/* Calculations — sample data. Units are sold oldest first (FIFO); in   */
/* this sample every unit sold carries the same cost basis, is at a     */
/* loss and has been held for more than 12 months.                      */
/* ------------------------------------------------------------------ */

/** Purchase cost of the units sold for `amount`. ₹80,000 → ₹90,667. */
export function costOfUnitsSold(amount: number): number {
  return (amount * fund.invested) / fund.currentValue;
}

/** Realised profit (+) or loss (−). ₹80,000 → −₹10,667. */
export function realisedPL(amount: number): number {
  return amount - costOfUnitsSold(amount);
}

/** Goal value today after redeeming `amount`. ₹80,000 → ₹6,26,000. */
export function goalAfter(amount: number): number {
  return goal.currentValue - amount;
}

/** Equity share of the MF portfolio after redeeming `amount` (proceeds leave the portfolio). */
export function equitySharePct(amount = 0): number {
  return ((portfolio.equity - amount) / (portfolio.total - amount)) * 100;
}

/** Rupee size of a ±10% move on the amount being redeemed. ₹80,000 → ₹8,000. */
export function scenarioMove(amount: number): number {
  return (amount * marketScenarios.movePct) / 100;
}

export function isValidAmount(amount: number): boolean {
  return amount > 0 && amount <= fund.currentValue;
}

export function roundTo(value: number, step: number): number {
  return Math.round(value / step) * step;
}

export function formatINR(amount: number): string {
  const isNegative = amount < 0;
  const abs = Math.abs(amount);
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(abs);
  return `${isNegative ? '−' : ''}₹${formatted}`;
}

export function formatLakhs(amount: number): string {
  const lakhs = amount / 100000;
  return `₹${lakhs.toFixed(2)}L`;
}

export function formatPct(value: number, digits = 0): string {
  return `${value.toFixed(digits)}%`;
}

export const holdings = [
  {
    id: 'sample-flexi',
    name: 'Sample Flexi Cap',
    category: 'Equity · Flexi Cap',
    currentValue: 240000,
    invested: 272000,
    returns: -32000,
    returnsPct: -11.8,
    isTargetFund: true,
    allocationPct: 20,
    nav: 48.24,
    fiftyTwoWeekHigh: 274000,
  },
  {
    id: 'bluechip-index',
    name: 'Bluechip 50 Index Fund',
    category: 'Equity · Large Cap',
    currentValue: 480000,
    invested: 420000,
    returns: 60000,
    returnsPct: 14.3,
    isTargetFund: false,
    allocationPct: 40,
    nav: 182.10,
    fiftyTwoWeekHigh: 495000,
  },
  {
    id: 'midcap-opportunities',
    name: 'Midcap Opportunities Fund',
    category: 'Equity · Mid Cap',
    currentValue: 216000,
    invested: 190000,
    returns: 26000,
    returnsPct: 13.7,
    isTargetFund: false,
    allocationPct: 18,
    nav: 94.65,
    fiftyTwoWeekHigh: 220000,
  },
  {
    id: 'sovereign-bond',
    name: 'Government Sovereign Bond Fund',
    category: 'Debt · G-Sec Long Term',
    currentValue: 264000,
    invested: 246500,
    returns: 17500,
    returnsPct: 7.1,
    isTargetFund: false,
    allocationPct: 22,
    nav: 24.30,
    fiftyTwoWeekHigh: 265000,
  },
];

export interface GoalItem {
  id: string;
  name: string;
  year: number;
  targetValue: number;
  currentValue: number;
  fundAllocationPct: number; // how much of target fund belongs to this goal
  category: string;
  tag: string;
}

export const goalsList: GoalItem[] = [
  {
    id: 'home-2031',
    name: 'Home',
    year: 2031,
    targetValue: 2500000,
    currentValue: 706000,
    fundAllocationPct: 34,
    category: 'Real Estate',
    tag: 'Primary Goal',
  },
  {
    id: 'education-2029',
    name: 'Higher Education',
    year: 2029,
    targetValue: 1500000,
    currentValue: 340000,
    fundAllocationPct: 0,
    category: 'Education',
    tag: 'Unaffected',
  },
  {
    id: 'emergency-reserve',
    name: 'Emergency Fund',
    year: 2026,
    targetValue: 300000,
    currentValue: 154000,
    fundAllocationPct: 0,
    category: 'Liquid Reserve',
    tag: 'Unaffected',
  },
];

export interface NotificationItem {
  id: string;
  category: 'decision' | 'portfolio' | 'goal' | 'insight' | 'system';
  title: string;
  body: string;
  time: string;
  section: 'today' | 'earlier';
  unread: boolean;
  priority: 'high' | 'medium' | 'low';
  deepLinkType: 'receipt' | 'portfolio' | 'goal' | 'insights' | 'activity';
  actionLabel: string;
}

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    category: 'decision',
    title: 'Decision ready',
    body: 'Your ₹80,000 redemption is ready to review. See what changes before confirming.',
    time: '12m ago',
    section: 'today',
    unread: true,
    priority: 'high',
    deepLinkType: 'receipt',
    actionLabel: 'Review decision',
  },
  {
    id: 'notif-2',
    category: 'portfolio',
    title: 'Equity allocation shift',
    body: 'Your equity allocation changed from 78% to 76% under the planned ₹80,000 redemption.',
    time: '28m ago',
    section: 'today',
    unread: true,
    priority: 'medium',
    deepLinkType: 'portfolio',
    actionLabel: 'View portfolio',
  },
  {
    id: 'notif-3',
    category: 'goal',
    title: 'Goal recalculation',
    body: 'Your Home — 2031 goal moves from ₹7.06L to ₹6.26L after the planned redemption.',
    time: '45m ago',
    section: 'today',
    unread: true,
    priority: 'medium',
    deepLinkType: 'goal',
    actionLabel: 'View goal',
  },
  {
    id: 'notif-4',
    category: 'insight',
    title: 'Fund vs Category context',
    body: 'Your fund is currently 12.4% below its 52-week high. Category is 8.7% below.',
    time: '3h ago',
    section: 'today',
    unread: false,
    priority: 'low',
    deepLinkType: 'insights',
    actionLabel: 'View context',
  },
  {
    id: 'notif-5',
    category: 'system',
    title: 'Exchange synchronization',
    body: 'Portfolio NAVs reconciled with registrar records (CAMS/KFintech).',
    time: 'Yesterday',
    section: 'earlier',
    unread: false,
    priority: 'low',
    deepLinkType: 'portfolio',
    actionLabel: 'View status',
  },
];

export interface ActivityEvent {
  id: string;
  time: string;
  dateSection: 'today' | 'yesterday' | 'earlier';
  title: string;
  detail: string;
  meta?: string;
  category: 'redemption' | 'receipt' | 'portfolio' | 'goal' | 'system';
  statusBadge?: string;
  isClickable?: boolean;
  deepLinkType?: 'receipt' | 'portfolio' | 'goal';
}

export const initialActivities: ActivityEvent[] = [
  {
    id: 'act-1',
    time: '09:42',
    dateSection: 'today',
    title: 'Redemption review started',
    detail: 'Sample Flexi Cap · ₹80,000',
    meta: 'Investor initiated review in draft state',
    category: 'redemption',
    statusBadge: 'In review',
    isClickable: true,
    deepLinkType: 'receipt',
  },
  {
    id: 'act-2',
    time: '09:41',
    dateSection: 'today',
    title: 'Decision Receipt generated',
    detail: 'Calculated realized P/L (−₹10,667), Goal delta, Mix shift 78% → 76%',
    meta: 'Deterministic mathematical engine verified',
    category: 'receipt',
    statusBadge: 'Generated',
    isClickable: true,
    deepLinkType: 'receipt',
  },
  {
    id: 'act-3',
    time: '09:40',
    dateSection: 'today',
    title: 'Redemption amount entered',
    detail: 'Entered ₹80,000 from current holding value ₹2,40,000',
    category: 'redemption',
    statusBadge: 'Entered',
  },
  {
    id: 'act-4',
    time: '16:15',
    dateSection: 'yesterday',
    title: 'Portfolio updated',
    detail: 'Total value ₹12.00L · Equity 78% · Debt 22%',
    category: 'portfolio',
    statusBadge: 'Reconciled',
    isClickable: true,
    deepLinkType: 'portfolio',
  },
  {
    id: 'act-5',
    time: '11:20',
    dateSection: 'yesterday',
    title: 'Goal updated',
    detail: 'Home — 2031 current value verified at ₹7.06L',
    category: 'goal',
    statusBadge: 'Verified',
    isClickable: true,
    deepLinkType: 'goal',
  },
  {
    id: 'act-6',
    time: '14:05',
    dateSection: 'earlier',
    title: 'Decision completed · Held',
    detail: 'Bluechip 50 Index Fund · ₹25,000 reviewed and retained',
    meta: 'Oct 4, 2026 · Decision Receipt viewed',
    category: 'redemption',
    statusBadge: 'Retained',
  },
];

export interface DecisionRecord {
  id: string;
  amount: number;
  fundName: string;
  date: string;
  status: 'Reviewed' | 'Retained' | 'Completed' | 'Pending';
  receiptViewed: boolean;
  realisedPL: number;
  goalImpact: string;
}

export const initialDecisionHistory: DecisionRecord[] = [
  {
    id: 'dec-1',
    amount: 80000,
    fundName: 'Sample Flexi Cap',
    date: 'Oct 6, 2026',
    status: 'Reviewed',
    receiptViewed: true,
    realisedPL: -10667,
    goalImpact: 'Home 2031 (−₹80k)',
  },
  {
    id: 'dec-2',
    amount: 25000,
    fundName: 'Bluechip 50 Index Fund',
    date: 'Sep 18, 2026',
    status: 'Retained',
    receiptViewed: true,
    realisedPL: 3571,
    goalImpact: 'Education 2029 (Retained)',
  },
  {
    id: 'dec-3',
    amount: 50000,
    fundName: 'Government Sovereign Bond',
    date: 'Aug 12, 2026',
    status: 'Completed',
    receiptViewed: true,
    realisedPL: 3500,
    goalImpact: 'Emergency Fund (Allocated)',
  },
];

export interface AiExplanationPayload {
  topic: string;
  question: string;
  explanation: string;
  source: string;
  calculation: string;
  confidence: 'High' | 'Medium';
  validatorStatus: string;
}

export const aiExplanationTemplates: Record<string, (amount: number) => AiExplanationPayload> = {
  goal: (amount: number) => ({
    topic: 'Goal Arithmetic',
    question: 'Why is my goal changing?',
    explanation: `Your planned redemption removes ${formatINR(amount)} from the amount currently allocated toward your Home — 2031 goal. This screen shows the arithmetic only. It does not predict future returns or recommend whether you should redeem.`,
    source: 'Portfolio holding records & goal tag allocation mapping',
    calculation: `₹7,06,000 − ${formatINR(amount)} = ${formatINR(goalAfter(amount))} today`,
    confidence: 'High',
    validatorStatus: 'Verified deterministic arithmetic (0% deviation)',
  }),
  loss: (amount: number) => ({
    topic: 'Tax & Realized P/L',
    question: 'How was this loss and ₹0 tax calculated?',
    explanation: `Under Indian mutual fund taxation (FIFO), the units you are redeeming were acquired at a cost basis of ${formatINR(roundTo(costOfUnitsSold(amount), 1))}. Redeeming for ${formatINR(amount)} realizes a capital loss of ${formatINR(Math.abs(realisedPL(amount)))}. Because these units have been held over 12 months with no net gain, estimated capital gains tax is ₹0 and exit load is nil.`,
    source: 'CAMS FIFO Unit Registry & IT Act Section 112A',
    calculation: `Proceeds (${formatINR(amount)}) − Cost (${formatINR(roundTo(costOfUnitsSold(amount), 1))}) = −${formatINR(Math.abs(realisedPL(amount)))}`,
    confidence: 'High',
    validatorStatus: 'Audited against FIFO ledger units',
  }),
  equity: (amount: number) => ({
    topic: 'Asset Allocation Shift',
    question: 'How was my equity mix shift computed?',
    explanation: `Your overall mutual-fund portfolio is ₹12.0L, of which ₹9.36L (78%) is in equities. Withdrawing ${formatINR(amount)} exclusively from an equity fund reduces total equity to ${formatINR(portfolio.equity - amount)} out of ${formatINR(portfolio.total - amount)}, resulting in an exact equity weight of ${equitySharePct(amount).toFixed(1)}%.`,
    source: 'Consolidated Account Statement (CAS) Asset Breakdown',
    calculation: `(₹9,36,000 − ${formatINR(amount)}) ÷ (₹12,00,000 − ${formatINR(amount)}) = ${equitySharePct(amount).toFixed(1)}%`,
    confidence: 'High',
    validatorStatus: 'Exact mathematical calculation',
  }),
  drawdown: () => ({
    topic: '52-Week High Context',
    question: 'What does 12.4% below 52-week high mean?',
    explanation: `Sample Flexi Cap peaked at an NAV of ₹2.74L aggregate value for this holding. At today's value of ₹2.40L, the NAV is 12.4% beneath that high-water mark. Meanwhile, the category median for comparable Flexi Cap funds is 8.7% beneath their respective peaks. This contextualizes recent drawdown against peers, without predicting whether a rebound will occur.`,
    source: 'AMFI Daily NAV Feed & Category Benchmarks',
    calculation: `(₹2,74,000 − ₹2,40,000) ÷ ₹2,74,000 = 12.4%`,
    confidence: 'High',
    validatorStatus: 'Sourced from official benchmark database',
  }),
};

export type NotificationFrequency = 'realtime' | 'daily' | 'off';

export interface NotificationSettingItem {
  id: string;
  label: string;
  description: string;
  frequency: NotificationFrequency;
  isMandatory?: boolean;
}

export const initialNotificationSettings: Record<string, NotificationSettingItem> = {
  decision: {
    id: 'decision',
    label: 'Decision alerts',
    description: 'When a redemption is initiated or awaiting review',
    frequency: 'realtime',
  },
  portfolio: {
    id: 'portfolio',
    label: 'Portfolio changes',
    description: 'Substantial asset-allocation drifts and sync updates',
    frequency: 'realtime',
  },
  goal: {
    id: 'goal',
    label: 'Goal changes',
    description: 'Milestone timeline shifts triggered by transactions',
    frequency: 'daily',
  },
  insights: {
    id: 'insights',
    label: 'Market & Fund insights',
    description: 'Drawdowns, peer comparisons and holding context',
    frequency: 'daily',
  },
  security: {
    id: 'security',
    label: 'Security & Critical system',
    description: 'Mandatory session confirmations and audit changes',
    frequency: 'realtime',
    isMandatory: true,
  },
};


