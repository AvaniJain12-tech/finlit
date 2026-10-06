import { useState } from 'react';
import {
  X,
  Sliders,
  ShieldCheck,
  Bell,
  Lock,
  ExternalLink,
  Cpu,
  CheckCircle2,
  FileCheck2,
} from 'lucide-react';
import { useFinLit } from '@/context/FinLitContext';
import { Button } from '@/components/ui/Button';
import { type NotificationFrequency } from '@/lib/data';

type SettingsTab = 'notifications' | 'trust';

export function SettingsModal() {
  const {
    isSettingsOpen,
    closeSettings,
    notificationSettings,
    updateNotificationFrequency,
    deepLink,
    showToast,
  } = useFinLit();

  const [activeTab, setActiveTab] = useState<SettingsTab>('notifications');

  if (!isSettingsOpen) return null;

  const handleOpenPreview = () => {
    closeSettings();
    showToast('Preview Triggered', 'Opening Decision Receipt via sample notification deep-link');
    deepLink('receipt');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-ink/40 backdrop-blur-[2px] animate-fade-in">
      <div
        className="w-full max-w-[430px] bg-bg rounded-t-2xl sm:rounded-2xl border border-border shadow-xl flex flex-col max-h-[85vh] animate-fade-in-up overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-modal-title"
      >
        {/* Header */}
        <div className="px-5 py-4 bg-surface border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-bg border border-border flex items-center justify-center text-ink">
              <Sliders className="w-4 h-4" strokeWidth={2} />
            </div>
            <div>
              <h2 id="settings-modal-title" className="text-[15px] font-bold text-ink leading-tight">
                Settings & Trust Center
              </h2>
              <p className="text-[11px] text-ink-3">Preferences and verification architecture</p>
            </div>
          </div>
          <button
            onClick={closeSettings}
            className="w-8 h-8 rounded-full flex items-center justify-center text-ink-3 hover:text-ink hover:bg-border-2 transition-colors cursor-pointer"
            aria-label="Close settings"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="px-5 py-2.5 bg-surface border-b border-border flex gap-2">
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex-1 py-1.5 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
              activeTab === 'notifications'
                ? 'bg-ink text-white shadow-btn'
                : 'text-ink-2 hover:bg-border-2'
            }`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('trust')}
            className={`flex-1 py-1.5 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
              activeTab === 'trust'
                ? 'bg-ink text-white shadow-btn'
                : 'text-ink-2 hover:bg-border-2'
            }`}
          >
            Trust & Transparency
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {activeTab === 'notifications' ? (
            <>
              {/* Intro note */}
              <div>
                <p className="eyebrow mb-1">Preferences</p>
                <p className="text-[13px] text-ink-2 leading-relaxed">
                  FinLit avoids notification spam. Select what deserves your attention.
                </p>
              </div>

              {/* Notification Categories */}
              <div className="space-y-3">
                {Object.values(notificationSettings).map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-surface rounded-xl border border-border flex flex-col gap-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-[13.5px] font-semibold text-ink">{item.label}</p>
                          {item.isMandatory && (
                            <span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200">
                              <Lock className="w-2.5 h-2.5" /> Essential
                            </span>
                          )}
                        </div>
                        <p className="text-[11.5px] text-ink-3 leading-snug mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Frequency selector */}
                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      {(['realtime', 'daily', 'off'] as NotificationFrequency[]).map((freq) => {
                        const isSelected = item.frequency === freq;
                        const isDisabled = item.isMandatory && freq !== 'realtime';
                        const labels = {
                          realtime: 'Real-time',
                          daily: 'Daily summary',
                          off: 'Off',
                        };

                        return (
                          <button
                            key={freq}
                            disabled={isDisabled}
                            onClick={() => updateNotificationFrequency(item.id, freq)}
                            className={`py-1.5 text-[11.5px] font-medium rounded-md border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-ink text-white border-ink font-semibold'
                                : 'bg-bg text-ink-2 border-border hover:border-ink-3'
                            } ${isDisabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                          >
                            {labels[freq]}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Notification Preview Component */}
              <div className="p-4 bg-[#F8F7F3] rounded-xl border border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="eyebrow text-ink">Preview</p>
                  <span className="text-[10px] uppercase font-bold text-ink-3 tracking-wider">
                    Interactive Demo
                  </span>
                </div>

                <div className="p-3 bg-surface rounded-lg border border-border shadow-sm mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Bell className="w-3.5 h-3.5 text-accent" />
                    <span className="text-[11px] font-bold text-accent uppercase tracking-wider">
                      Decision
                    </span>
                    <span className="text-[10px] text-ink-3 ml-auto">Now</span>
                  </div>
                  <p className="text-[13px] font-semibold text-ink">
                    Your redemption is ready to review.
                  </p>
                  <p className="text-[11.5px] text-ink-3 mt-0.5">
                    See what selling changes before confirming.
                  </p>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleOpenPreview}
                  className="w-full text-[13px]"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1" />
                  Open preview
                </Button>
              </div>
            </>
          ) : (
            /* TRUST & TRANSPARENCY TAB */
            <div className="space-y-6">
              <div>
                <p className="eyebrow mb-1 text-accent">Core Philosophy</p>
                <h3 className="text-[16px] font-bold text-ink leading-snug mb-1">
                  How FinLit Works
                </h3>
                <p className="text-[13px] text-ink-2 leading-relaxed">
                  FinLit is an intelligence layer that computes deterministic facts and explains consequences. You make every final decision.
                </p>
              </div>

              {/* 4 Pillars */}
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  {
                    step: '01',
                    title: 'Code computes',
                    desc: 'Mathematical engine calculates FIFO cost basis, loss, and goal deltas.',
                  },
                  {
                    step: '02',
                    title: 'AI explains',
                    desc: 'Plain-English translation of arithmetic with zero hype or market forecast.',
                  },
                  {
                    step: '03',
                    title: 'Validator checks',
                    desc: 'Pre-flight sanity check ensures zero tax discrepancy and rule safety.',
                  },
                  {
                    step: '04',
                    title: 'You decide',
                    desc: '100% investor sovereignty. No dark patterns, no autonomous execution.',
                  },
                ].map((pillar) => (
                  <div key={pillar.step} className="p-3 bg-surface rounded-xl border border-border">
                    <span className="text-[10px] font-bold text-accent font-mono block mb-1">
                      {pillar.step}
                    </span>
                    <p className="text-[13px] font-bold text-ink mb-1">{pillar.title}</p>
                    <p className="text-[11px] text-ink-3 leading-relaxed">{pillar.desc}</p>
                  </div>
                ))}
              </div>

              {/* Architecture Pipeline */}
              <div className="p-4 bg-surface rounded-xl border border-border">
                <p className="eyebrow mb-2">Decision Intelligence Pipeline</p>
                <div className="space-y-2 font-mono text-[11px]">
                  {[
                    { node: 'DATA LAYER', desc: 'Exchange CAS, NAV feed, CAMS registry' },
                    { node: 'CALCULATION ENGINE', desc: 'Deterministic FIFO, Section 112A arithmetic' },
                    { node: 'AI EXPLANATION', desc: 'Audited semantic clarification' },
                    { node: 'VALIDATION', desc: 'Boundary checks, nil exit load confirmation' },
                    { node: 'USER DECISION', desc: 'Sovereign confirmation / change amount / cancel' },
                    { node: 'AUDIT TRAIL', desc: 'Cryptographically consistent local activity log' },
                  ].map((pipe, idx) => (
                    <div key={pipe.node} className="flex items-center gap-2">
                      <span className="w-4 text-center text-ink-3 font-bold">{idx + 1}</span>
                      <div className="flex-1 bg-bg px-2.5 py-1.5 rounded border border-border-2">
                        <span className="font-bold text-ink mr-2">{pipe.node}</span>
                        <span className="text-ink-3 text-[10px]">{pipe.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Transparency */}
              <div className="space-y-3">
                <div className="p-3.5 bg-surface rounded-xl border border-border">
                  <div className="flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <p className="text-[13px] font-bold text-ink">Data We Use</p>
                  </div>
                  <ul className="text-[12px] text-ink-2 space-y-1 list-disc list-inside">
                    <li>Mutual fund unit ledger & purchase cost basis</li>
                    <li>Historical official NAV records from AMFI</li>
                    <li>Assigned goal targets and allocations</li>
                  </ul>
                </div>

                <div className="p-3.5 bg-surface rounded-xl border border-border">
                  <div className="flex items-center gap-1.5 mb-2">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <p className="text-[13px] font-bold text-ink">Data We NEVER Use</p>
                  </div>
                  <ul className="text-[12px] text-ink-2 space-y-1 list-disc list-inside">
                    <li>Emotion detection or behavioral manipulation algorithms</li>
                    <li>Private device messages, calls or keystrokes</li>
                    <li>External unlinked bank credentials</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface border-t border-border">
          <Button variant="primary" onClick={closeSettings} className="w-full">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
