import { useState } from 'react';
import { Clock, ShieldCheck, ArrowUpRight, History, CheckCircle2, FileText, ChevronRight, ChevronLeft } from 'lucide-react';
import { useFinLit } from '@/context/FinLitContext';
import { Button } from '@/components/ui/Button';
import { formatINR } from '@/lib/data';

export function ActivityScreen() {
  const {
    activities,
    decisionHistory,
    startRedemptionFlow,
    deepLink,
    canGoBack,
    goBack,
  } = useFinLit();

  const todayActivities = activities.filter((a) => a.dateSection === 'today');
  const yesterdayActivities = activities.filter((a) => a.dateSection === 'yesterday');
  const earlierActivities = activities.filter((a) => a.dateSection === 'earlier');

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
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <p className="eyebrow">Cryptographic Audit Trail</p>
            </div>
            <h1 className="text-[28px] sm:text-[34px] font-[800] text-ink leading-tight tracking-tight">
              Activity & Decisions
            </h1>
            <p className="text-[14px] text-ink-3 mt-1">
              Tamper-evident chronological ledger of portfolio recalculations and investor choices.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[12px] text-ink-3 font-mono">
              {activities.length} Events logged
            </span>
          </div>
        </div>
      </section>

      {/* ── 2-COLUMN DESKTOP GRID ───────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ── LEFT COLUMN (7 COLS): AUDIT TIMELINE ───────────────── */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-ink" />
              <h2 className="text-[17px] font-bold text-ink">Timeline Audit Trail</h2>
            </div>
            <span className="text-[11.5px] text-ink-3">Live system log</span>
          </div>

          <div className="bg-surface rounded-2xl border border-border p-6 shadow-card space-y-6">
            {/* TODAY */}
            {todayActivities.length > 0 && (
              <div>
                <p className="eyebrow mb-3 text-ink">Today</p>
                <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-border">
                  {todayActivities.map((act) => (
                    <div key={act.id} className="relative group">
                      {/* Node */}
                      <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-surface border-2 border-ink flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-ink" />
                      </div>

                      <div
                        onClick={() => {
                          if (act.isClickable && act.deepLinkType) {
                            deepLink(act.deepLinkType);
                          }
                        }}
                        className={`p-4 bg-bg rounded-xl border border-border transition-all ${
                          act.isClickable ? 'hover:border-ink/40 cursor-pointer shadow-sm' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[11.5px] font-mono text-ink-3">{act.time}</span>
                          {act.statusBadge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                              {act.statusBadge}
                            </span>
                          )}
                        </div>

                        <h3 className="text-[14px] font-bold text-ink leading-snug">
                          {act.title}
                        </h3>
                        <p className="text-[12.5px] text-ink-2 mt-0.5">{act.detail}</p>
                        {act.meta && (
                          <p className="text-[11.5px] text-ink-3 mt-1.5 italic font-sans">{act.meta}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* YESTERDAY */}
            {yesterdayActivities.length > 0 && (
              <div className="pt-2">
                <p className="eyebrow mb-3 text-ink">Yesterday</p>
                <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-border">
                  {yesterdayActivities.map((act) => (
                    <div key={act.id} className="relative">
                      <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-surface border-2 border-border-2 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-ink-3" />
                      </div>

                      <div className="p-4 bg-bg rounded-xl border border-border">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[11.5px] font-mono text-ink-3">{act.time}</span>
                          {act.statusBadge && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-surface text-ink-2 border border-border">
                              {act.statusBadge}
                            </span>
                          )}
                        </div>
                        <h3 className="text-[14px] font-bold text-ink leading-snug">
                          {act.title}
                        </h3>
                        <p className="text-[12.5px] text-ink-2 mt-0.5">{act.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EARLIER */}
            {earlierActivities.length > 0 && (
              <div className="pt-2">
                <p className="eyebrow mb-3 text-ink">Earlier</p>
                <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-border">
                  {earlierActivities.map((act) => (
                    <div key={act.id} className="relative">
                      <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-surface border-2 border-border-2 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-ink-4" />
                      </div>

                      <div className="p-4 bg-bg rounded-xl border border-border">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[11.5px] font-mono text-ink-3">{act.time}</span>
                          {act.statusBadge && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-surface text-ink-2">
                              {act.statusBadge}
                            </span>
                          )}
                        </div>
                        <h3 className="text-[14px] font-bold text-ink leading-snug">
                          {act.title}
                        </h3>
                        <p className="text-[12.5px] text-ink-2 mt-0.5">{act.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT COLUMN (5 COLS): DECISION HISTORY ─────────────── */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-ink" />
              <h2 className="text-[17px] font-bold text-ink">Decision History</h2>
            </div>
            <span className="text-[11.5px] text-ink-3">Auditable receipts</span>
          </div>

          <div className="space-y-4">
            {decisionHistory.map((dec) => {
              const isReviewed = dec.status === 'Reviewed';
              const isRetained = dec.status === 'Retained';
              const isCompleted = dec.status === 'Completed';

              return (
                <div
                  key={dec.id}
                  className="p-5 bg-surface rounded-2xl border border-border shadow-card hover:border-ink/30 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[17px] font-[800] tabular text-ink">
                          {formatINR(dec.amount)}
                        </span>
                        <span
                          className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border ${
                            isCompleted
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : isRetained
                              ? 'bg-accent-bg text-accent border-accent-border'
                              : 'bg-amber-50 text-amber-900 border-amber-200'
                          }`}
                        >
                          {dec.status}
                        </span>
                      </div>
                      <p className="text-[13.5px] font-semibold text-ink-2 mt-0.5">
                        {dec.fundName}
                      </p>
                    </div>

                    <span className="text-[11.5px] text-ink-3">{dec.date}</span>
                  </div>

                  <div className="pt-3 border-t border-border-2 grid grid-cols-2 gap-2 text-[12.5px]">
                    <div>
                      <span className="text-ink-3 text-[11px] block">Realised P/L</span>
                      <span className="font-semibold text-ink tabular">
                        {formatINR(dec.realisedPL)}
                      </span>
                    </div>
                    <div>
                      <span className="text-ink-3 text-[11px] block">Goal Impact</span>
                      <span className="font-semibold text-ink">{dec.goalImpact}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border-2">
                    <span className="text-[11px] text-ink-3 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Decision Receipt: Viewed</span>
                    </span>

                    <button
                      onClick={() => startRedemptionFlow('receipt')}
                      className="inline-flex items-center gap-1 text-[12px] font-semibold text-ink hover:text-accent cursor-pointer"
                    >
                      <span>Inspect receipt</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Audit Trust Callout */}
          <div className="p-4 rounded-xl bg-border-2 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-ink-2 flex-shrink-0" />
            <p className="text-[12px] text-ink-2 leading-relaxed">
              Every decision receipt remains accessible in your history to audit cost basis, tax assumptions, and rationale.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
