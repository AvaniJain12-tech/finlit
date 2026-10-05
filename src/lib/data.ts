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
