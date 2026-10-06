import { ArrowRight, Sparkles, TrendingDown, Target, Clock, Info, ShieldCheck } from 'lucide-react';
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
    <div className="pt-5 pb-8 space-y-6 animate-fade-in-up">
      {/* ── 1. HEADER ──────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="eyebrow">Demo Account · Investor Mode</p>
        </div>
        <h1 className="text-[26px] font-[750] text-ink leading-tight tracking-tight">
          Good morning, Riya
        </h1>
        <p className="text-[13.5px] text-ink-3 mt-1">Here's what matters today.</p>
      </div>

      {/* ── 2. HERO FINANCIAL SNAPSHOT ───────────────────────────── */}
      <div className="bg-surface rounded-2xl border border-border p-5 shadow-card">
        <p className="eyebrow mb-2">Total Financial Snapshot</p>
        <div className="grid grid-cols-3 divide-x divide-border-2">
          <div className="pr-3">
            <p className="text-[11px] text-ink-3 uppercase font-medium">Portfolio</p>
            <p className="text-[20px] font-[750] tabular text-ink leading-tight mt-1">
              {formatLakhs(portfolio.total)}
            </p>
            <p className="text-[10px] text-ink-3 mt-0.5">Across 4 funds</p>
          </div>
          <div className="px-3">
            <p className="text-[11px] text-ink-3 uppercase font-medium">Equity</p>
            <p className="text-[20px] font-[750] tabular text-ink leading-tight mt-1">
              78%
            </p>
            <p className="text-[10px] text-ink-3 mt-0.5">₹9.36L allocated</p>
          </div>
          <div className="pl-3">
            <p className="text-[11px] text-ink-3 uppercase font-medium">Goals</p>
            <p className="text-[20px] font-[750] tabular text-ink leading-tight mt-1">
              3
            </p>
            <p className="text-[10px] text-ink-3 mt-0.5">Active tracked</p>
          </div>
        </div>
      </div>

      {/* ── 3. ATTENTION SECTION ─────────────────────────────────── */}
      <div className="bg-surface rounded-2xl border border-border p-5 shadow-card relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="eyebrow text-ink">Today</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wide">
              {isCompleted ? 'Completed' : 'Ready for review'}
            </span>
          </div>
          <button
            onClick={openWhyModal}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-ink-3 hover:text-ink-2 transition-colors cursor-pointer"
          >
            <Info className="w-3 h-3" />
            <span>Why seeing this?</span>
          </button>
        </div>

        <h2 className="text-[17px] font-[700] text-ink tracking-tight mb-3">
          {isCompleted
            ? 'Recent redemption recorded in audit trail'
            : 'You have 1 decision worth reviewing'}
        </h2>

        {/* Attention Card Details */}
        <div className="p-4 bg-bg rounded-xl border border-border mb-4">
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-[14px] font-bold text-ink">{fund.name}</span>
            <span className="text-[16px] font-[750] tabular text-ink">
              {formatINR(amount)}
            </span>
          </div>
          <p className="text-[12px] text-ink-2">
            {isCompleted
              ? 'Redemption order processed · ₹0 capital gains tax'
              : 'Redemption started · See what selling changes before confirming'}
          </p>

          <div className="mt-3 pt-3 border-t border-border-2 flex items-center justify-between text-[11px] text-ink-3">
            <span>Portfolio holding: {formatLakhs(fund.currentValue)}</span>
            <span>Target: Home 2031</span>
          </div>
        </div>

        {/* PRIMARY ACTION — Solid #171717 */}
        <Button
          variant="primary"
          onClick={() => startRedemptionFlow('receipt')}
          className="w-full h-[52px]"
        >
          {isCompleted ? 'View Decision Receipt' : 'Review decision'}
        </Button>
      </div>

      {/* ── 4. CONNECTED SNAPSHOTS ───────────────────────────────── */}
      {/* Goal Impact Preview */}
      <div className="bg-surface rounded-2xl border border-border p-5 shadow-card">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-accent" />
            <p className="eyebrow">Goal Trajectory</p>
          </div>
          <button
            onClick={() => deepLink('goal')}
            className="text-[12px] font-semibold text-ink-2 hover:text-ink flex items-center gap-1 cursor-pointer"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="flex items-baseline justify-between mb-2">
          <p className="text-[14px] font-bold text-ink">{goal.name} · 2031</p>
          <div className="flex items-baseline gap-2">
            <span className="text-[13px] text-ink-3 tabular line-through">
              {formatLakhs(goal.currentValue)}
            </span>
            <span className="text-[14px] font-bold tabular text-ink">
              {formatLakhs(goalAfter(amount))}
            </span>
          </div>
        </div>

        {/* Progress bar visual */}
        <div className="w-full h-2 bg-border-2 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-ink rounded-full transition-all duration-300"
            style={{ width: `${Math.round((goalAfter(amount) / 2500000) * 100)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[12px] text-ink-2">
          <span>Target ₹25.0L · Progress 25%</span>
          <button
            onClick={() => openAiExplanation('goal')}
            className="text-[11px] font-semibold text-accent hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span>Explain arithmetic</span>
          </button>
        </div>
      </div>

      {/* Portfolio Equity Shift Snapshot */}
      <div className="bg-surface rounded-2xl border border-border p-5 shadow-card">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-ink-2" />
            <p className="eyebrow">Asset Mix Shift</p>
          </div>
          <button
            onClick={() => deepLink('portfolio')}
            className="text-[12px] font-semibold text-ink-2 hover:text-ink flex items-center gap-1 cursor-pointer"
          >
            <span>Allocation</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <p className="text-[13px] text-ink-2 leading-relaxed mb-3">
          Withdrawing {formatINR(amount)} shifts your mutual fund equity allocation from{' '}
          <strong className="text-ink">78%</strong> to{' '}
          <strong className="text-ink">{equitySharePct(amount).toFixed(0)}%</strong>.
        </p>

        <div className="p-3 bg-bg rounded-xl border border-border-2 flex items-center justify-between">
          <span className="text-[11px] text-ink-3">No rebalancing transaction fee</span>
          <button
            onClick={() => openAiExplanation('equity')}
            className="text-[11px] font-semibold text-accent hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span>How was this computed?</span>
          </button>
        </div>
      </div>

      {/* Recent Activity Audit Snippet */}
      <div className="bg-surface rounded-2xl border border-border p-5 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-ink-3" />
            <p className="eyebrow">Recent Audit Trail</p>
          </div>
          <button
            onClick={() => deepLink('activity')}
            className="text-[12px] font-semibold text-ink-2 hover:text-ink flex items-center gap-1 cursor-pointer"
          >
            <span>Full log</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-start gap-3">
            <span className="text-[11px] font-mono text-ink-3 mt-0.5">09:42</span>
            <div className="flex-1">
              <p className="text-[12.5px] font-semibold text-ink">Redemption review started</p>
              <p className="text-[11.5px] text-ink-3">Sample Flexi Cap · {formatINR(amount)}</p>
            </div>
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">
              Draft
            </span>
          </div>
        </div>
      </div>

      {/* Trust banner */}
      <div className="p-4 rounded-xl bg-border-2 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-ink-2 flex-shrink-0" />
        <p className="text-[11.5px] text-ink-2 leading-relaxed">
          FinLit does not predict market swings or offer buy/sell instructions. You retain 100% agency over your assets.
        </p>
      </div>
    </div>
  );
}
