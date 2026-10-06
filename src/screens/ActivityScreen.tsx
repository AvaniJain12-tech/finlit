import { useState } from 'react';
import { Clock, ShieldCheck, ArrowUpRight, History, CheckCircle2, FileText, ChevronRight } from 'lucide-react';
import { useFinLit } from '@/context/FinLitContext';
import { Button } from '@/components/ui/Button';
import { formatINR } from '@/lib/data';

type ActivityTab = 'audit' | 'decisions';

export function ActivityScreen() {
  const {
    activities,
    decisionHistory,
    startRedemptionFlow,
    deepLink,
  } = useFinLit();

  const [activeTab, setActiveTab] = useState<ActivityTab>('audit');

  const todayActivities = activities.filter((a) => a.dateSection === 'today');
  const yesterdayActivities = activities.filter((a) => a.dateSection === 'yesterday');
  const earlierActivities = activities.filter((a) => a.dateSection === 'earlier');

  return (
    <div className="pt-5 pb-8 space-y-6 animate-fade-in-up">
      {/* ── HEADER ──────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <p className="eyebrow">Cryptographic Audit Trail</p>
        </div>
        <h1 className="text-[26px] font-[750] text-ink leading-tight tracking-tight">
          Activity & Decisions
        </h1>
        <p className="text-[13.5px] text-ink-3 mt-1">
          Complete, tamper-evident log of calculations and choices.
        </p>
      </div>

      {/* ── SUB-TABS ────────────────────────────────────────────── */}
      <div className="flex gap-2 p-1 bg-surface rounded-xl border border-border">
        <button
          onClick={() => setActiveTab('audit')}
          className={`flex-1 py-1.5 rounded-lg text-[12.5px] font-semibold transition-all cursor-pointer ${
            activeTab === 'audit'
              ? 'bg-ink text-white shadow-btn'
              : 'text-ink-2 hover:bg-border-2'
          }`}
        >
          Audit Timeline
        </button>
        <button
          onClick={() => setActiveTab('decisions')}
          className={`flex-1 py-1.5 rounded-lg text-[12.5px] font-semibold transition-all cursor-pointer ${
            activeTab === 'decisions'
              ? 'bg-ink text-white shadow-btn'
              : 'text-ink-2 hover:bg-border-2'
          }`}
        >
          Decision History ({decisionHistory.length})
        </button>
      </div>

      {/* ── TAB 1: AUDIT TIMELINE ───────────────────────────────── */}
      {activeTab === 'audit' ? (
        <div className="space-y-6">
          {activities.length === 0 ? (
            <div className="py-12 text-center bg-surface rounded-2xl border border-border p-6">
              <Clock className="w-8 h-8 text-ink-3 mx-auto mb-2" strokeWidth={1.5} />
              <p className="text-[14px] font-semibold text-ink">No activity yet</p>
              <p className="text-[12px] text-ink-3">Your decision history will appear here.</p>
            </div>
          ) : (
            <>
              {/* TODAY */}
              {todayActivities.length > 0 && (
                <div>
                  <p className="eyebrow mb-3 px-1 text-ink">Today</p>
                  <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-border">
                    {todayActivities.map((act) => (
                      <div key={act.id} className="relative group">
                        {/* Bullet node */}
                        <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-surface border-2 border-ink flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-ink" />
                        </div>

                        <div
                          onClick={() => {
                            if (act.isClickable && act.deepLinkType) {
                              deepLink(act.deepLinkType);
                            }
                          }}
                          className={`p-3.5 bg-surface rounded-xl border border-border transition-all ${
                            act.isClickable ? 'hover:border-ink/40 cursor-pointer shadow-sm' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-[11px] font-mono text-ink-3">{act.time}</span>
                            {act.statusBadge && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                                {act.statusBadge}
                              </span>
                            )}
                          </div>

                          <h2 className="text-[13.5px] font-bold text-ink leading-snug">
                            {act.title}
                          </h2>
                          <p className="text-[12px] text-ink-2 mt-0.5">{act.detail}</p>
                          {act.meta && (
                            <p className="text-[11px] text-ink-3 mt-1.5 italic font-sans">{act.meta}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* YESTERDAY */}
              {yesterdayActivities.length > 0 && (
                <div>
                  <p className="eyebrow mb-3 px-1 text-ink">Yesterday</p>
                  <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-border">
                    {yesterdayActivities.map((act) => (
                      <div key={act.id} className="relative">
                        <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-surface border-2 border-border-2 flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-ink-3" />
                        </div>

                        <div className="p-3.5 bg-surface rounded-xl border border-border">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-[11px] font-mono text-ink-3">{act.time}</span>
                            {act.statusBadge && (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-bg text-ink-2 border border-border">
                                {act.statusBadge}
                              </span>
                            )}
                          </div>
                          <h2 className="text-[13.5px] font-bold text-ink leading-snug">
                            {act.title}
                          </h2>
                          <p className="text-[12px] text-ink-2 mt-0.5">{act.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* EARLIER */}
              {earlierActivities.length > 0 && (
                <div>
                  <p className="eyebrow mb-3 px-1 text-ink">Earlier</p>
                  <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-border">
                    {earlierActivities.map((act) => (
                      <div key={act.id} className="relative">
                        <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-surface border-2 border-border-2 flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-ink-4" />
                        </div>

                        <div className="p-3.5 bg-surface rounded-xl border border-border">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-[11px] font-mono text-ink-3">{act.time}</span>
                            {act.statusBadge && (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-bg text-ink-2">
                                {act.statusBadge}
                              </span>
                            )}
                          </div>
                          <h2 className="text-[13.5px] font-bold text-ink leading-snug">
                            {act.title}
                          </h2>
                          <p className="text-[12px] text-ink-2 mt-0.5">{act.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Audit Verification badge */}
          <div className="p-4 bg-surface rounded-xl border border-border flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="text-[12.5px] font-bold text-ink">Local Deterministic Ledger</p>
              <p className="text-[11px] text-ink-3">
                Events are recorded chronologically. No external telemetry or tracking cookies.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* ── TAB 2: DECISION HISTORY ─────────────────────────────── */
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <p className="eyebrow">Past Financial Decisions</p>
            <span className="text-[11px] text-ink-3">Auditable receipts</span>
          </div>

          <div className="space-y-3">
            {decisionHistory.map((dec) => {
              const isReviewed = dec.status === 'Reviewed';
              const isRetained = dec.status === 'Retained';
              const isCompleted = dec.status === 'Completed';

              return (
                <div
                  key={dec.id}
                  className="p-4 bg-surface rounded-2xl border border-border shadow-card hover:border-ink/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] font-[750] tabular text-ink">
                          {formatINR(dec.amount)}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border ${
                            isCompleted
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : isRetained
                              ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}
                        >
                          {dec.status}
                        </span>
                      </div>
                      <p className="text-[13px] font-semibold text-ink-2 mt-0.5">
                        {dec.fundName}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-ink-3">{dec.date}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border-2 grid grid-cols-2 gap-2 text-[12px] mb-3">
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
                      <FileText className="w-3 h-3" />
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

          <div className="p-3.5 rounded-xl bg-border-2 text-center">
            <p className="text-[11.5px] text-ink-2 leading-relaxed">
              Every decision receipt remains accessible forever to audit rationale and tax basis.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
