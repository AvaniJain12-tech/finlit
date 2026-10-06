import { ArrowRight, Sparkles, TrendingDown, Target, Clock, Info, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useFinLit } from '@/context/FinLitContext';
import { Button } from '@/components/ui/Button';
import {
  fund,
  portfolio,
  goal,
  goalAfter,
  equitySharePct,
  formatINR,
  formatLakhs,
  formatPct,
} from '@/lib/data';

export function HomeScreen() {
  const {
    amount,
    startRedemptionFlow,
    deepLink,
    openAiExplanation,
    openWhyModal,
    decisionStatus,
  } = useFinLit();

  const isCompleted = decisionStatus === 'completed';

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* ── 1. DESKTOP HERO HEADER ───────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-border-2">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="eyebrow">Demo Portfolio · Riya Jain</p>
          </div>
          <h1 className="text-[28px] sm:text-[34px] font-[800] text-ink leading-tight tracking-tight">
            Good morning, Riya
          </h1>
          <p className="text-[14px] sm:text-[15px] text-ink-3 mt-1">
            Here's what matters today. Consolidated across your ₹12.0L mutual fund holdings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openWhyModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-surface text-ink-2 hover:text-ink text-[12px] font-semibold transition-colors cursor-pointer shadow-sm"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Why seeing this?</span>
          </button>
        </div>
      </div>

      {/* ── 2. HERO FINANCIAL METRICS ROW (4 COLS ON DESKTOP) ─────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Portfolio */}
        <div className="bg-surface rounded-2xl border border-border p-5 shadow-card hover:border-ink/20 transition-all">
          <p className="eyebrow mb-1 text-ink-3">Total Portfolio</p>
          <p className="text-display-sm tabular font-[750] text-ink tracking-tight">
            {formatLakhs(portfolio.total)}
          </p>
          <div className="mt-2 flex items-center justify-between text-[11.5px] text-ink-3">
            <span>Across 4 holdings</span>
            <span className="text-emerald-700 font-semibold">+4.2% overall</span>
          </div>
        </div>

        {/* Card 2: Equity Allocation */}
        <div className="bg-surface rounded-2xl border border-border p-5 shadow-card hover:border-ink/20 transition-all">
          <p className="eyebrow mb-1 text-ink-3">Equity Exposure</p>
          <p className="text-display-sm tabular font-[750] text-ink tracking-tight">
            78%
          </p>
          <div className="mt-2 flex items-center justify-between text-[11.5px] text-ink-3">
            <span>₹9.36L allocated</span>
            <span className="text-ink font-semibold">3 funds</span>
          </div>
        </div>

        {/* Card 3: Debt / Other */}
        <div className="bg-surface rounded-2xl border border-border p-5 shadow-card hover:border-ink/20 transition-all">
          <p className="eyebrow mb-1 text-ink-3">Debt / Liquid Reserve</p>
          <p className="text-display-sm tabular font-[750] text-ink tracking-tight">
            22%
          </p>
          <div className="mt-2 flex items-center justify-between text-[11.5px] text-ink-3">
            <span>₹2.64L allocated</span>
            <span className="text-emerald-700 font-semibold">+7.1% p.a.</span>
          </div>
        </div>

        {/* Card 4: Goals */}
        <div className="bg-surface rounded-2xl border border-border p-5 shadow-card hover:border-ink/20 transition-all">
          <p className="eyebrow mb-1 text-ink-3">Tracked Life Goals</p>
          <p className="text-display-sm tabular font-[750] text-ink tracking-tight">
            3 Goals
          </p>
          <div className="mt-2 flex items-center justify-between text-[11.5px] text-ink-3">
            <span>Home, Education, Reserve</span>
            <span className="text-accent font-semibold">1 affected</span>
          </div>
        </div>
      </div>

      {/* ── 3. MAIN 2-COLUMN DESKTOP GRID ───────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ── LEFT COLUMN (7 COLS): ATTENTION & ALLOCATION SHIFT ── */}
        <div className="lg:col-span-7 space-y-6">
          {/* Attention Card — The Anchor */}
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-card relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <span className="eyebrow text-ink">Today</span>
                <span className="text-[10.5px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wide">
                  {isCompleted ? 'Completed' : 'Ready for review'}
                </span>
              </div>
              <span className="text-[11px] text-ink-3">Non-prescriptive awareness</span>
            </div>

            <h2 className="text-[20px] font-[750] text-ink tracking-tight mb-2">
              {isCompleted
                ? 'Recent redemption logged in audit trail'
                : 'You have 1 decision worth reviewing'}
            </h2>
            <p className="text-[13px] text-ink-2 leading-relaxed mb-5">
              FinLit surfaces arithmetic facts and life consequences before you submit this order.
            </p>

            {/* Fund Detail Preview Box */}
            <div className="p-5 bg-bg rounded-xl border border-border mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-[16px] font-bold text-ink">{fund.name}</h3>
                  <p className="text-[12px] text-ink-3">
                    Current holding value: {formatLakhs(fund.currentValue)} · Flexi Cap
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-[11px] uppercase font-bold text-ink-3">Redemption started</p>
                  <p className="text-num-md tabular font-[750] text-ink">{formatINR(amount)}</p>
                </div>
              </div>

              {/* Consequence snapshot strip */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border-2 text-[12px]">
                <div>
                  <span className="text-ink-3 text-[11px] block">Realised P/L</span>
                  <span className="font-semibold text-ink tabular">−₹10,667</span>
                </div>
                <div>
                  <span className="text-ink-3 text-[11px] block">Estimated Tax</span>
                  <span className="font-semibold text-ink tabular">₹0 (Loss)</span>
                </div>
                <div>
                  <span className="text-ink-3 text-[11px] block">Goal Impact</span>
                  <span className="font-semibold text-ink">Home 2031 (−₹80k)</span>
                </div>
              </div>
            </div>

            {/* PRIMARY BUTTON — Solid #171717 */}
            <Button
              variant="primary"
              onClick={() => startRedemptionFlow('receipt')}
              className="w-full h-[52px] text-[15px]"
            >
              {isCompleted ? 'Inspect Decision Receipt' : 'Review decision'}
            </Button>
          </div>

          {/* Asset Mix Shift Card */}
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-ink-2" />
                <p className="eyebrow">Asset Allocation Shift</p>
              </div>
              <button
                onClick={() => deepLink('portfolio')}
                className="text-[12px] font-semibold text-ink-2 hover:text-ink flex items-center gap-1 cursor-pointer"
              >
                <span>Full allocation</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <p className="text-[13.5px] text-ink-2 leading-relaxed">
              Withdrawing {formatINR(amount)} exclusively from equities shifts your mutual-fund equity weight from{' '}
              <strong className="text-ink">78%</strong> to{' '}
              <strong className="text-ink">{equitySharePct(amount).toFixed(0)}%</strong> without explicit rebalancing trades.
            </p>

            {/* Visual allocation comparison */}
            <div className="p-4 bg-bg rounded-xl border border-border space-y-2">
              <div className="flex justify-between text-[12px]">
                <span className="text-ink-3">Current</span>
                <span className="font-bold tabular text-ink">78% Equity / 22% Debt</span>
              </div>
              <div className="w-full h-2.5 rounded-full overflow-hidden flex bg-border-2">
                <div className="bg-ink h-full" style={{ width: '78%' }} />
                <div className="bg-ink-3 h-full" style={{ width: '22%' }} />
              </div>

              <div className="flex justify-between text-[12px] pt-2">
                <span className="text-accent font-semibold">After planned redemption</span>
                <span className="font-bold tabular text-ink">
                  {equitySharePct(amount).toFixed(0)}% Equity / {(100 - equitySharePct(amount)).toFixed(0)}% Debt
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full overflow-hidden flex bg-border-2">
                <div className="bg-accent h-full" style={{ width: `${equitySharePct(amount)}%` }} />
                <div className="bg-ink-3 h-full" style={{ width: `${100 - equitySharePct(amount)}%` }} />
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-ink-3">
                <span>Deterministic CAS math</span>
                <button
                  onClick={() => openAiExplanation('equity')}
                  className="text-accent font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Explain arithmetic</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN (5 COLS): GOALS, AUDIT TRAIL, TRUST ───── */}
        <div className="lg:col-span-5 space-y-6">
          {/* Goal Trajectory Card */}
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-accent" />
                <p className="eyebrow">Goal Trajectory</p>
              </div>
              <button
                onClick={() => deepLink('goal')}
                className="text-[12px] font-semibold text-ink-2 hover:text-ink flex items-center gap-1 cursor-pointer"
              >
                <span>All Goals</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-[16px] font-bold text-ink">{goal.name} · 2031</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-[13px] text-ink-3 tabular line-through">
                    {formatLakhs(goal.currentValue)}
                  </span>
                  <span className="text-[16px] font-[750] tabular text-ink">
                    {formatLakhs(goalAfter(amount))}
                  </span>
                </div>
              </div>
              <p className="text-[12px] text-ink-3 mb-3">
                Target ₹25.0L · Sample Flexi Cap holds 34% of this goal
              </p>

              {/* Progress bar */}
              <div className="w-full h-2.5 bg-border-2 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-ink rounded-full transition-all duration-300"
                  style={{ width: `${Math.round((goalAfter(amount) / 2500000) * 100)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11.5px] text-ink-3">
                <span>{Math.round((goalAfter(amount) / 2500000) * 100)}% funded today</span>
                <button
                  onClick={() => openAiExplanation('goal')}
                  className="text-accent font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Explain delta</span>
                </button>
              </div>
            </div>
          </div>

          {/* Audit Trail Snippet */}
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-ink-3" />
                <p className="eyebrow">Financial Audit Trail</p>
              </div>
              <button
                onClick={() => deepLink('activity')}
                className="text-[12px] font-semibold text-ink-2 hover:text-ink flex items-center gap-1 cursor-pointer"
              >
                <span>Full log</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <span className="text-[11px] font-mono text-ink-3 mt-0.5">09:42</span>
                <div className="flex-1">
                  <p className="text-[13px] font-bold text-ink">Redemption review started</p>
                  <p className="text-[11.5px] text-ink-3">Sample Flexi Cap · {formatINR(amount)}</p>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                  Draft
                </span>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-[11px] font-mono text-ink-3 mt-0.5">09:41</span>
                <div className="flex-1">
                  <p className="text-[13px] font-bold text-ink">Decision Receipt generated</p>
                  <p className="text-[11.5px] text-ink-3">FIFO loss & mix recalculation verified</p>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-bg text-ink-2">
                  System
                </span>
              </div>
            </div>
          </div>

          {/* Trust Center Teaser */}
          <div className="p-5 rounded-2xl bg-surface border border-border shadow-card space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <p className="eyebrow text-ink">Trust & Transparency</p>
            </div>
            <p className="text-[12.5px] text-ink-2 leading-relaxed">
              Code computes · AI explains · Validator checks · Investor decides. FinLit never executes automated trades or steers holding decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
