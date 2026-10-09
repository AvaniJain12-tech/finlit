import { useState } from 'react';
import { Target, Sparkles, Info, ShieldCheck, ArrowRight, BarChart2, TrendingDown, Layers, ChevronLeft } from 'lucide-react';
import { useFinLit } from '@/context/FinLitContext';
import { Button } from '@/components/ui/Button';
import {
  fund,
  portfolio,
  goal,
  goalAfter,
  goalsList,
  equitySharePct,
  formatINR,
  formatLakhs,
  formatPct,
} from '@/lib/data';

export function InsightsScreen() {
  const {
    amount,
    openAiExplanation,
    openWhyModal,
    startRedemptionFlow,
    canGoBack,
    goBack,
  } = useFinLit();

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

      {/* ── HEADER (WRAPPED FOR NAVBAR SCROLL BEHAVIOR) ───────────── */}
      <section id="page-hero" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-2">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <p className="eyebrow text-accent">Explainable Intelligence Layer</p>
            </div>
            <h1 className="text-[28px] sm:text-[34px] font-[800] text-ink leading-tight tracking-tight">
              Insights & Goals
            </h1>
            <p className="text-[14px] text-ink-3 mt-1">
              Deterministic arithmetic and behavioral guardrails behind your capital allocation.
            </p>
          </div>

          <button
            onClick={openWhyModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-surface text-ink-2 hover:text-ink text-[12px] font-semibold transition-all cursor-pointer shadow-sm"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Explain data sources</span>
          </button>
        </div>
      </section>

      {/* ── 2-COLUMN DESKTOP GRID ───────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ── LEFT COLUMN (6 COLS): GOALS IMPACT ─────────────────── */}
        <div className="lg:col-span-6 space-y-5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-accent" />
              <h2 className="text-[17px] font-bold text-ink">Tracked Life Goals</h2>
            </div>
            <span className="text-[12px] text-ink-3">Milestone trajectories</span>
          </div>

          <div className="space-y-4">
            {goalsList.map((g) => {
              const isTargetGoal = g.id === 'home-2031';
              const projectedVal = isTargetGoal ? goalAfter(amount) : g.currentValue;
              const progressPct = Math.round((projectedVal / g.targetValue) * 100);

              return (
                <div
                  key={g.id}
                  className={`rounded-2xl border p-6 shadow-card transition-all ${
                    isTargetGoal
                      ? 'bg-surface border-accent/40 ring-1 ring-accent/20'
                      : 'bg-surface border-border'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-[17px] font-bold text-ink">
                          {g.name} — {g.year}
                        </h3>
                        {isTargetGoal && (
                          <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-accent-bg text-accent border border-accent-border">
                            Impacted
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] text-ink-3 mt-0.5">
                        Target {formatLakhs(g.targetValue)} · {g.category}
                      </p>
                    </div>

                    <div className="text-right">
                      {isTargetGoal ? (
                        <div>
                          <div className="flex items-baseline gap-2 justify-end">
                            <span className="text-[13px] text-ink-3 line-through tabular">
                              {formatLakhs(g.currentValue)}
                            </span>
                            <span className="text-[18px] font-[800] tabular text-ink">
                              {formatLakhs(projectedVal)}
                            </span>
                          </div>
                          <p className="text-[11px] font-medium text-stone-600 mt-0.5">
                            −{formatINR(amount)} upon redemption
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-[18px] font-[800] tabular text-ink">
                            {formatLakhs(g.currentValue)}
                          </p>
                          <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                            Unaffected
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-3 bg-border-2 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isTargetGoal ? 'bg-ink' : 'bg-ink-2'
                      }`}
                      style={{ width: `${Math.min(progressPct, 100)}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[12px] text-ink-3">
                    <span>{progressPct}% of target reached</span>
                    {isTargetGoal && <span>Sample Flexi Cap is 34% of this goal</span>}
                  </div>

                  {/* Contextual Explain Button */}
                  {isTargetGoal && (
                    <div className="mt-4 pt-3 border-t border-border-2 flex items-center justify-between">
                      <button
                        onClick={openWhyModal}
                        className="inline-flex items-center gap-1 text-[11.5px] font-medium text-ink-3 hover:text-ink cursor-pointer"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>Why am I seeing this?</span>
                      </button>

                      <button
                        onClick={() => openAiExplanation('goal')}
                        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-accent hover:underline cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Explain this calculation</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-border-2 text-[12.5px] text-ink-2 leading-relaxed">
            <strong>Sovereignty Principle:</strong> FinLit communicates how actions affect what you care about. We never instruct you to hold or sell.
          </div>
        </div>

        {/* ── RIGHT COLUMN (6 COLS): CONTEXTUAL DECISION INSIGHTS ── */}
        <div className="lg:col-span-6 space-y-5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-ink" />
              <h2 className="text-[17px] font-bold text-ink">Decision Context</h2>
            </div>
            <span className="text-[12px] text-ink-3">Benchmark & peer data</span>
          </div>

          {/* Insight 1: 52-Week High Drawdown Context */}
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-card space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="eyebrow text-ink">Drawdown Benchmark</span>
                <h3 className="text-[16px] font-bold text-ink mt-1">
                  Sample Flexi Cap is {fund.pctBelowHigh}% below its 52-week high
                </h3>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                Peers: −{fund.similarFundsPctBelow}%
              </span>
            </div>

            <p className="text-[13px] text-ink-2 leading-relaxed">
              The fund peaked at {formatLakhs(fund.fiftyTwoWeekHigh)} aggregate value for your units. Comparable Flexi Cap funds are {fund.similarFundsPctBelow}% below their 52-week peaks over the same timeframe.
            </p>

            <div className="p-3.5 bg-bg rounded-xl border border-border space-y-1 text-[12px]">
              <p className="text-ink-2">
                <strong className="text-ink">Why it matters:</strong> Clarifies whether drawdown is fund-specific or broad category cycle.
              </p>
              <p className="text-ink-3">
                <strong className="text-ink-2">Data source:</strong> AMFI Daily NAV records over past 365 calendar days.
              </p>
            </div>

            <div className="pt-2 border-t border-border-2 flex items-center justify-between">
              <button
                onClick={openWhyModal}
                className="inline-flex items-center gap-1 text-[11.5px] font-medium text-ink-3 hover:text-ink cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Why am I seeing this?</span>
              </button>
              <button
                onClick={() => openAiExplanation('drawdown')}
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-accent hover:underline cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explain this number</span>
              </button>
            </div>
          </div>

          {/* Insight 2: Asset Allocation Shift */}
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-card space-y-3">
            <div>
              <span className="eyebrow text-accent">Asset Allocation Shift</span>
              <h3 className="text-[16px] font-bold text-ink mt-1">
                Equity allocation moves from 78% to {equitySharePct(amount).toFixed(0)}%
              </h3>
            </div>

            <p className="text-[13px] text-ink-2 leading-relaxed">
              Withdrawing {formatINR(amount)} reduces your equities to {formatLakhs(portfolio.equity - amount)}. Debt and liquid assets expand to {(100 - equitySharePct(amount)).toFixed(0)}% of remaining capital.
            </p>

            <div className="p-3.5 bg-bg rounded-xl border border-border space-y-1 text-[12px]">
              <p className="text-ink-2">
                <strong className="text-ink">Why it matters:</strong> Reduces equity beta without paying separate rebalancing transaction costs.
              </p>
              <p className="text-ink-3">
                <strong className="text-ink-2">Calculation:</strong> CAS asset categorization arithmetic.
              </p>
            </div>

            <div className="pt-2 border-t border-border-2 flex items-center justify-between">
              <button
                onClick={openWhyModal}
                className="inline-flex items-center gap-1 text-[11.5px] font-medium text-ink-3 hover:text-ink cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Why am I seeing this?</span>
              </button>
              <button
                onClick={() => openAiExplanation('equity')}
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-accent hover:underline cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>How was this calculated?</span>
              </button>
            </div>
          </div>

          {/* Insight 3: Cognitive Bias Safeguard */}
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-card space-y-3">
            <div>
              <span className="eyebrow text-ink">Cognitive Bias Safeguard</span>
              <h3 className="text-[16px] font-bold text-ink mt-1">
                Selling now requires a second decision later
              </h3>
            </div>

            <p className="text-[13px] text-ink-2 leading-relaxed">
              Selling now means a second decision later: when, or whether, to buy back. Investors frequently struggle with re-entry timing after market dips.
            </p>

            <div className="pt-2 border-t border-border-2 flex items-center justify-between">
              <button
                onClick={openWhyModal}
                className="inline-flex items-center gap-1 text-[11.5px] font-medium text-ink-3 hover:text-ink cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Why am I seeing this?</span>
              </button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => startRedemptionFlow('receipt')}
                className="h-9 px-3.5 text-[12px]"
              >
                Review receipt
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
