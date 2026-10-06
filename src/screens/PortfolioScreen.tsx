import { useState } from 'react';
import { RefreshCw, ArrowUpRight, AlertCircle, Sparkles, PieChart, Info, ShieldCheck } from 'lucide-react';
import { useFinLit } from '@/context/FinLitContext';
import { Button } from '@/components/ui/Button';
import {
  portfolio,
  holdings,
  equitySharePct,
  formatINR,
  formatLakhs,
  formatPct,
} from '@/lib/data';

export function PortfolioScreen() {
  const {
    amount,
    startRedemptionFlow,
    openAiExplanation,
    openWhyModal,
    isRefreshing,
    simulateRefresh,
    hasError,
    clearError,
    triggerSimulatedError,
  } = useFinLit();

  const [showProjectedShift, setShowProjectedShift] = useState(true);

  const equityToday = portfolio.equity;
  const debtToday = portfolio.total - portfolio.equity;
  const equityProjected = portfolio.equity - amount;
  const totalProjected = portfolio.total - amount;
  const equityPctProjected = equitySharePct(amount);

  return (
    <div className="pt-5 pb-8 space-y-6 animate-fade-in-up">
      {/* ── HEADER ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <p className="eyebrow">Consolidated Account Statement</p>
          </div>
          <h1 className="text-[26px] font-[750] text-ink leading-tight tracking-tight">
            Portfolio Overview
          </h1>
        </div>

        <button
          onClick={simulateRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-ink-2 hover:text-ink text-[12px] font-semibold transition-all active:scale-95 cursor-pointer disabled:opacity-50"
          title="Re-sync with exchange"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Syncing…' : 'Sync'}</span>
        </button>
      </div>

      {/* ── ERROR RECOVERY STATE DEMO ───────────────────────────── */}
      {hasError ? (
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-[14px] font-bold text-amber-900">Couldn't refresh portfolio data</p>
              <p className="text-[12.5px] text-amber-800 mt-0.5">
                Exchange registry feed did not respond in time. Cached records from 09:30 are active.
              </p>
              <div className="mt-3 flex gap-2">
                <Button variant="primary" size="sm" onClick={clearError}>
                  Try again
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* ── SKELETON LOADING OR MAIN CONTENT ────────────────────── */}
      {isRefreshing ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-32 bg-border-2 rounded-2xl" />
          <div className="h-28 bg-border-2 rounded-2xl" />
          <div className="h-44 bg-border-2 rounded-2xl" />
        </div>
      ) : (
        <>
          {/* ── TOTAL PORTFOLIO HERO ──────────────────────────────── */}
          <div className="bg-surface rounded-2xl border border-border p-5 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <p className="eyebrow">Total Mutual Fund Value</p>
              <button
                onClick={openWhyModal}
                className="text-[11px] font-medium text-ink-3 hover:text-ink flex items-center gap-1 cursor-pointer"
              >
                <Info className="w-3 h-3" />
                <span>Explain data</span>
              </button>
            </div>

            <p className="text-display tabular font-[750] text-ink leading-none tracking-tight mb-4">
              {formatLakhs(portfolio.total)}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border-2">
              <div>
                <p className="text-[11px] text-ink-3 uppercase font-medium">Equity (78%)</p>
                <p className="text-[16px] font-[750] tabular text-ink mt-0.5">
                  {formatLakhs(equityToday)}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-ink-3 uppercase font-medium">Debt / Other (22%)</p>
                <p className="text-[16px] font-[750] tabular text-ink mt-0.5">
                  {formatLakhs(debtToday)}
                </p>
              </div>
            </div>
          </div>

          {/* ── ASSET ALLOCATION & SIMULATED REDEMPTION SHIFT ─────── */}
          <div className="bg-surface rounded-2xl border border-border p-5 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-accent" />
                <p className="eyebrow">Asset Mix Shift Simulation</p>
              </div>
              <button
                onClick={() => setShowProjectedShift(!showProjectedShift)}
                className="text-[11px] font-semibold text-accent hover:underline cursor-pointer"
              >
                {showProjectedShift ? 'Show current only' : 'Simulate redemption'}
              </button>
            </div>

            {/* Split Bar Current */}
            <div>
              <div className="flex justify-between text-[12px] font-medium text-ink mb-1">
                <span>Current Allocation</span>
                <span className="tabular font-semibold">78% Equity / 22% Debt</span>
              </div>
              <div className="w-full h-3 rounded-full overflow-hidden flex bg-border-2">
                <div className="bg-ink h-full transition-all duration-300" style={{ width: '78%' }} />
                <div className="bg-ink-3 h-full transition-all duration-300" style={{ width: '22%' }} />
              </div>
            </div>

            {/* Split Bar Projected */}
            {showProjectedShift && (
              <div className="p-3.5 bg-bg rounded-xl border border-border animate-fade-in space-y-2">
                <div className="flex justify-between text-[12px] font-medium text-ink">
                  <span className="font-semibold text-accent">
                    After planned {formatINR(amount)} redemption
                  </span>
                  <span className="tabular font-bold text-ink">
                    {equityPctProjected.toFixed(0)}% Equity / {(100 - equityPctProjected).toFixed(0)}% Debt
                  </span>
                </div>
                <div className="w-full h-3 rounded-full overflow-hidden flex bg-border-2">
                  <div
                    className="bg-accent h-full transition-all duration-300"
                    style={{ width: `${equityPctProjected}%` }}
                  />
                  <div
                    className="bg-ink-3 h-full transition-all duration-300"
                    style={{ width: `${100 - equityPctProjected}%` }}
                  />
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-ink-3">
                  <span>Projected portfolio: {formatLakhs(totalProjected)}</span>
                  <button
                    onClick={() => openAiExplanation('equity')}
                    className="text-accent font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Calculation audit</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── HOLDINGS BREAKDOWN ─────────────────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <p className="eyebrow">Your Funds ({holdings.length})</p>
              <span className="text-[11px] text-ink-3">Sample holding records</span>
            </div>

            <div className="space-y-3">
              {holdings.map((h) => (
                <div
                  key={h.id}
                  className={`rounded-2xl border p-4.5 transition-all ${
                    h.isTargetFund
                      ? 'bg-surface border-ink/40 shadow-card ring-1 ring-ink/10'
                      : 'bg-surface border-border shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-[15px] font-bold text-ink">{h.name}</h2>
                        {h.isTargetFund && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                            Active review
                          </span>
                        )}
                      </div>
                      <p className="text-[11.5px] text-ink-3 mt-0.5">{h.category}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-[15px] font-[750] tabular text-ink">
                        {formatLakhs(h.currentValue)}
                      </p>
                      <p
                        className={`text-[11px] font-semibold tabular mt-0.5 ${
                          h.returns >= 0 ? 'text-emerald-700' : 'text-stone-600'
                        }`}
                      >
                        {h.returns >= 0 ? '+' : ''}
                        {formatINR(h.returns)} ({h.returnsPct}%)
                      </p>
                    </div>
                  </div>

                  {/* Target Fund contextual action */}
                  {h.isTargetFund ? (
                    <div className="mt-3 pt-3 border-t border-border flex items-center justify-between gap-2">
                      <p className="text-[11.5px] text-ink-2">
                        {formatINR(amount)} redemption in draft
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => startRedemptionFlow('fund')}
                          className="h-9 px-3 text-[12px]"
                        >
                          View fund
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => startRedemptionFlow('receipt')}
                          className="h-9 px-3.5 text-[12px]"
                        >
                          Review receipt
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Test Error Trigger for Judge Demo */}
          <div className="pt-2 flex justify-between items-center text-[11px] text-ink-3 px-1">
            <span>Data updated 15m ago from AMFI</span>
            <button
              onClick={triggerSimulatedError}
              className="text-ink-3 hover:text-ink hover:underline cursor-pointer"
            >
              Simulate network error
            </button>
          </div>
        </>
      )}
    </div>
  );
}
