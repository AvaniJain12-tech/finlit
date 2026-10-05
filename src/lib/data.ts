export const fund = {
  name: 'Sample Flexi Cap',
  currentValue: 240000,
  invested: 272000,
  returns: -32000,
  returnsPct: -11.8,
  fiftyTwoWeekHigh: 273800,
  pctBelowHigh: 12.4,
  similarFundsPctBelow: 8.7,
};

export const redemption = {
  amount: 80000,
  expectedCredit: 'Up to 3 working days',
  realizedPL: -10700,
  exitLoad: 0,
  estimatedTax: 0,
};

export const goal = {
  name: 'Home 2031',
  currentValue: 706000,
  afterRedemption: 626000,
  fundRepresentationPct: 34,
};

export const allocation = {
  current: 78,
  after: 71,
};

export const needCash = {
  actualNeed: 50000,
  requested: 80000,
  goalImpactIfNeeded: 656000,
  goalImpactIfRequested: 626000,
};

export const marketScenarios = {
  fallPct: 10,
  fallValue: 216000,
  risePct: 10,
  riseValue: 264000,
  currentValue: 240000,
};

export const reasonChips = [
  'Need cash',
  'Goal reached',
  'Fund no longer fits',
  'Too much risk for me',
  'Worried markets will fall',
  'Rebalancing / tax',
  'Skip',
];

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
