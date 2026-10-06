import { useState } from 'react';
import { Target, Sparkles, Info, ShieldCheck, ArrowRight, BarChart2, TrendingDown, Layers } from 'lucide-react';
import { useFinLit } from '@/context/FinLitContext';
import { Button } from '@/components/ui/Button';
import {
  fund,
  goal,
  goalAfter,
  goalsList,
  equitySharePct,
  formatINR,
  formatLakhs,
  formatPct,
} from '@/lib/data';

type InsightsViewMode = 'all' | 'goals' | 'context';

export function InsightsScreen() {
  const {
    amount,
    openAiExplanation,
    openWhyModal,
    startRedemptionFlow,
  } = useFinLit();

  const [viewMode, setViewMode] = useState<InsightsViewMode>('all');

  return (
    <div className="pt-5 pb-8 space-y-6 animate-fade-in-up">
      {/* ── HEADER ──────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <p className="eyebrow">Explainable Intelligence Layer</p>
        </div>
        <h1 className="text-[26px] font-[750] text-ink leading-tight tracking-tight">
          Insights & Goals
        </h1>
        <p className="text-[13.5px] text-ink-3 mt-1">
          Deterministic context behind your financial moves.
        </p>
      </div>

      {/* ── SEGMENT SWITCHER ────────────────────────────────────── */}
      <div className="flex gap-2 p-1 bg-surface rounded-xl border border-border">
        {[
          { id: 'all', label: 'All Insights' },
          { id: 'goals', label: 'Goals Trajectory' },
          { id: 'context', label: 'Fund Context' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setViewMode(tab.id as InsightsViewMode)}
            className={`flex-1 py-1.5 rounded-lg text-[12.5px] font-semibold transition-all cursor-pointer ${
              viewMode === tab.id
                ? 'bg-ink text-white shadow-btn'
                : 'text-ink-2 hover:bg-border-2'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── GOALS SECTION ───────────────────────────────────────── */}
      {(viewMode === 'all' || viewMode === 'goals') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-accent" />
              <p className="eyebrow">Tracked Goals Impact</p>
            </div>
            <span className="text-[11px] text-ink-3">Arithmetic projection</span>
          </div>

          <div className="space-y-3">
            {goalsList.map((g) => {
              const isTargetGoal = g.id === 'home-2031';
              const projectedVal = isTargetGoal ? goalAfter(amount) : g.currentValue;
              const progressPct = Math.round((projectedVal / g.targetValue) * 100);

              return (
                <div
                  key={g.id}
                  className={`rounded-2xl border p-5 shadow-card transition-all ${
                    isTargetGoal
                      ? 'bg-surface border-ink/30 ring-1 ring-ink/10'
                      : 'bg-surface border-border'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-[16px] font-bold text-ink">
                          {g.name} — {g.year}
                        </h2>
                        {isTargetGoal && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
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
                          <div className="flex items-baseline gap-1.5 justify-end">
                            <span className="text-[12px] text-ink-3 line-through tabular">
                              {formatLakhs(g.currentValue)}
                            </span>
                            <span className="text-[16px] font-[750] tabular text-ink">
                              {formatLakhs(projectedVal)}
                            </span>
                          </div>
                          <p className="text-[10.5px] font-medium text-stone-600 mt-0.5">
                            −{formatINR(amount)} if redeemed
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-[16px] font-[750] tabular text-ink">
                            {formatLakhs(g.currentValue)}
                          </p>
                          <p className="text-[10.5px] text-emerald-700 font-medium mt-0.5">
                            Unaffected
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2.5 bg-border-2 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isTargetGoal ? 'bg-ink' : 'bg-ink-2'
                      }`}
                      style={{ width: `${Math.min(progressPct, 100)}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11.5px] text-ink-3">
                    <span>{progressPct}% of goal reached today</span>
                    {isTargetGoal && (
                      <span>Sample Flexi Cap is 34% of this goal</span>
                    )}
                  </div>

                  {/* AI Explanation & Context Action for Target Goal */}
                  {isTargetGoal && (
                    <div className="mt-4 pt-3.5 border-t border-border-2 flex items-center justify-between">
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

          <div className="p-3.5 rounded-xl bg-border-2">
            <p className="text-[12px] text-ink-2 leading-relaxed">
              <strong>Objective Clarity:</strong> FinLit shows how an action affects what you care about. We never say "You should not redeem."
            </p>
          </div>
        </div>
      )}

      {/* ── CONTEXTUAL INSIGHTS CARDS ───────────────────────────── */}
      {(viewMode === 'all' || viewMode === 'context') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-ink" />
              <p className="eyebrow">Financial Decision Context</p>
            </div>
            <span className="text-[11px] text-ink-3">AMFI & CAS audited</span>
          </div>

          {/* Insight 1: 52-Week High Context */}
          <div className="bg-surface rounded-2xl border border-border p-5 shadow-card space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="eyebrow text-ink">Drawdown Benchmark</span>
                <h3 className="text-[15px] font-bold text-ink mt-1">
                  Sample Flexi Cap is {fund.pctBelowHigh}% below its 52-week high
                </h3>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                Peers: −{fund.similarFundsPctBelow}%
              </span>
            </div>

            <p className="text-[13px] text-ink-2 leading-relaxed">
              The fund peaked at {formatLakhs(fund.fiftyTwoWeekHigh)} aggregate value for your units. The category median for comparable Flexi Cap funds is {fund.similarFundsPctBelow}% below their respective highs.
            </p>

            <div className="p-3 bg-bg rounded-xl border border-border-2 space-y-1.5 text-[11.5px]">
              <p className="text-ink-2">
                <strong className="text-ink">Why it matters:</strong> Contextualizes whether underperformance is fund-specific or broader category pressure.
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

          {/* Insight 2: Equity Exposure Shift */}
          <div className="bg-surface rounded-2xl border border-border p-5 shadow-card space-y-3">
            <div>
              <span className="eyebrow text-accent">Asset Allocation Shift</span>
              <h3 className="text-[15px] font-bold text-ink mt-1">
                Your equity exposure moves from 78% to {equitySharePct(amount).toFixed(0)}%
              </h3>
            </div>

            <p className="text-[13px] text-ink-2 leading-relaxed">
              Selling {formatINR(amount)} pulls funds exclusively from equities. Your debt and cash allocation proportionally expands from 22% to {(100 - equitySharePct(amount)).toFixed(0)}%.
            </p>

            <div className="p-3 bg-bg rounded-xl border border-border-2 space-y-1.5 text-[11.5px]">
              <p className="text-ink-2">
                <strong className="text-ink">Why it matters:</strong> Modifies your portfolio's sensitivity to general market volatility without intentional rebalancing orders.
              </p>
              <p className="text-ink-3">
                <strong className="text-ink-2">Data source:</strong> Mutual fund CAS asset categorization engine.
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

          {/* Insight 3: The Second Decision */}
          <div className="bg-surface rounded-2xl border border-border p-5 shadow-card space-y-3">
            <div>
              <span className="eyebrow text-ink">Cognitive Bias Safeguard</span>
              <h3 className="text-[15px] font-bold text-ink mt-1">
                Selling now requires a second decision later
              </h3>
            </div>

            <p className="text-[13px] text-ink-2 leading-relaxed">
              Exiting equity creates an eventual re-entry timing dilemma: deciding when or whether to deploy cash back into compound assets.
            </p>

            <div className="p-3 bg-bg rounded-xl border border-border-2 text-[11.5px] text-ink-2">
              <strong className="text-ink">Behavioral context:</strong> Data shows investors who sell during corrections frequently delay re-entering until prices have recovered higher.
            </div>

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
                className="h-9 px-3 text-[12px]"
              >
                Review receipt
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
