import { useState } from 'react';
import { RefreshCw, ArrowUpRight, AlertCircle, Sparkles, PieChart, Info, ShieldCheck, ArrowRight, ChevronLeft } from 'lucide-react';
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
    canGoBack,
    goBack,
  } = useFinLit();

  const [showProjectedShift, setShowProjectedShift] = useState(true);

  const equityToday = portfolio.equity;
  const debtToday = portfolio.total - portfolio.equity;
  const equityProjected = portfolio.equity - amount;
  const totalProjected = portfolio.total - amount;
  const equityPctProjected = equitySharePct(amount);

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* ── GO BACK OPTION ────────────────────────────────────────── */}
      {canGoBack && (
        <button
          onClick={goBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface border border-border text-[12.5px] font-semibold text-ink-2 hover:text-ink hover:border-ink/20 shadow-sm transition-all group cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-ink-3 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Dashboard</span>
        </button>
      )}

      {/* ── HERO HEADER (WRAPPED FOR NAVBAR SCROLL WORKFLOW) ──────── */}
      <section id="page-hero" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-2">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <p className="eyebrow">Consolidated Account Statement (CAS)</p>
            </div>
            <h1 className="text-[28px] sm:text-[34px] font-[800] text-ink leading-tight tracking-tight">
              Portfolio Overview
            </h1>
            <p className="text-[14px] text-ink-3 mt-1">
              Live holdings, verified NAV records, and deterministic allocation models.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openWhyModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-surface text-ink-2 hover:text-ink text-[12px] font-semibold transition-all cursor-pointer shadow-sm"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Explain data</span>
            </button>
            <button
              onClick={simulateRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-border bg-surface text-ink-2 hover:text-ink text-[12px] font-semibold transition-all active:scale-95 cursor-pointer shadow-sm disabled:opacity-50"
              title="Re-sync with exchange"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Syncing…' : 'Sync Exchange'}</span>
            </button>
          </div>
        </div>
      </section>

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

      {/* ── LOADING SKELETON OR MAIN CONTENT ────────────────────── */}
      {isRefreshing ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-28 bg-border-2 rounded-2xl" />
          <div className="h-44 bg-border-2 rounded-2xl" />
          <div className="h-64 bg-border-2 rounded-2xl" />
        </div>
      ) : (
        <>
          {/* ── TOP METRICS CARDS (3 COLS ON DESKTOP) ──────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface rounded-2xl border border-border p-6 shadow-card">
              <p className="eyebrow mb-1 text-ink-3">Total Mutual Fund Value</p>
              <p className="text-display tabular font-[750] text-ink tracking-tight">
                {formatLakhs(portfolio.total)}
              </p>
              <p className="text-[12px] text-ink-3 mt-1">4 funds in active folios</p>
            </div>

            <div className="bg-surface rounded-2xl border border-border p-6 shadow-card">
              <p className="eyebrow mb-1 text-ink-3">Equity Holding (78%)</p>
              <p className="text-display tabular font-[750] text-ink tracking-tight">
                {formatLakhs(equityToday)}
              </p>
              <p className="text-[12px] text-ink-3 mt-1">Flexi, Large & Mid Cap</p>
            </div>

            <div className="bg-surface rounded-2xl border border-border p-6 shadow-card">
              <p className="eyebrow mb-1 text-ink-3">Debt / G-Sec (22%)</p>
              <p className="text-display tabular font-[750] text-ink tracking-tight">
                {formatLakhs(debtToday)}
              </p>
              <p className="text-[12px] text-ink-3 mt-1">Liquid sovereign security</p>
            </div>
          </div>

          {/* ── ASSET ALLOCATION SHIFT SIMULATION (DESKTOP WIDE) ──── */}
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-card space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-accent" />
                <h2 className="text-[16px] font-bold text-ink">
                  Asset Mix Shift Simulation
                </h2>
              </div>
              <button
                onClick={() => setShowProjectedShift(!showProjectedShift)}
                className="text-[12px] font-semibold text-accent hover:underline cursor-pointer"
              >
                {showProjectedShift ? 'Hide projected shift' : 'Simulate redemption impact'}
              </button>
            </div>

            {/* Side-by-side or stacked visual comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-1">
              {/* Box 1: Current */}
              <div className="p-4 bg-bg rounded-xl border border-border space-y-2.5">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-semibold text-ink">Current Weight</span>
                  <span className="tabular font-bold text-ink">78% Equity · 22% Debt</span>
                </div>
                <div className="w-full h-3 rounded-full overflow-hidden flex bg-border-2">
                  <div className="bg-ink h-full" style={{ width: '78%' }} />
                  <div className="bg-ink-3 h-full" style={{ width: '22%' }} />
                </div>
                <div className="flex justify-between text-[11.5px] text-ink-3 pt-1">
                  <span>Equity: {formatLakhs(equityToday)}</span>
                  <span>Debt: {formatLakhs(debtToday)}</span>
                </div>
              </div>

              {/* Box 2: Projected */}
              <div className="p-4 bg-bg rounded-xl border border-border space-y-2.5">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-semibold text-accent">
                    After planned {formatINR(amount)} redemption
                  </span>
                  <span className="tabular font-bold text-ink">
                    {equityPctProjected.toFixed(0)}% Equity · {(100 - equityPctProjected).toFixed(0)}% Debt
                  </span>
                </div>
                <div className="w-full h-3 rounded-full overflow-hidden flex bg-border-2">
                  <div className="bg-accent h-full" style={{ width: `${equityPctProjected}%` }} />
                  <div className="bg-ink-3 h-full" style={{ width: `${100 - equityPctProjected}%` }} />
                </div>
                <div className="flex justify-between text-[11.5px] text-ink-3 pt-1">
                  <span>New equity: {formatLakhs(equityProjected)}</span>
                  <button
                    onClick={() => openAiExplanation('equity')}
                    className="text-accent font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Calculation audit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── HOLDINGS TABLE (DESKTOP FORMATTED) ──────────────────── */}
          <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-[17px] font-bold text-ink">Your Mutual Funds</h2>
                <p className="text-[12px] text-ink-3">Live unit ledger and valuation metrics</p>
              </div>
              <span className="text-[12px] text-ink-3 font-mono">4 folio accounts</span>
            </div>

            {/* Desktop Table View */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-[#FAF9F5] text-[11px] font-bold uppercase tracking-wider text-ink-3">
                    <th className="py-3 px-5">Fund Name</th>
                    <th className="py-3 px-4">Allocation</th>
                    <th className="py-3 px-4 text-right">Current Value</th>
                    <th className="py-3 px-4 text-right">Invested</th>
                    <th className="py-3 px-4 text-right">Return (P/L)</th>
                    <th className="py-3 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-2 text-[13px]">
                  {holdings.map((h) => (
                    <tr
                      key={h.id}
                      className={`transition-colors ${
                        h.isTargetFund ? 'bg-accent-bg/40 hover:bg-accent-bg/60' : 'hover:bg-[#FAF9F6]'
                      }`}
                    >
                      {/* Fund */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-ink">{h.name}</span>
                          {h.isTargetFund && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent-bg text-accent border border-accent-border">
                              Active Review
                            </span>
                          )}
                        </div>
                        <p className="text-[11.5px] text-ink-3">{h.category}</p>
                      </td>

                      {/* Allocation */}
                      <td className="py-4 px-4 font-mono text-ink-2">{h.allocationPct}%</td>

                      {/* Current Value */}
                      <td className="py-4 px-4 text-right font-[750] tabular text-ink">
                        {formatLakhs(h.currentValue)}
                      </td>

                      {/* Invested */}
                      <td className="py-4 px-4 text-right tabular text-ink-2">
                        {formatLakhs(h.invested)}
                      </td>

                      {/* Return */}
                      <td className="py-4 px-4 text-right">
                        <span
                          className={`font-bold tabular ${
                            h.returns >= 0 ? 'text-emerald-700' : 'text-stone-600'
                          }`}
                        >
                          {h.returns >= 0 ? '+' : ''}
                          {formatINR(h.returns)} ({h.returnsPct}%)
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right">
                        {h.isTargetFund ? (
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => startRedemptionFlow('fund')}
                              className="h-8 px-2.5 text-[11.5px]"
                            >
                              Details
                            </Button>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => startRedemptionFlow('receipt')}
                              className="h-8 px-3 text-[11.5px]"
                            >
                              Review receipt
                            </Button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-ink-3 italic">Holding intact</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Test Error Trigger for demo evaluation */}
          <div className="flex justify-between items-center text-[11px] text-ink-3 px-1 pt-2">
            <span>Portfolio NAV feed synced via AMFI Registrar gateway</span>
            <button
              onClick={triggerSimulatedError}
              className="text-ink-3 hover:text-ink hover:underline cursor-pointer"
            >
              Simulate network error state
            </button>
          </div>
        </>
      )}
    </div>
  );
}
