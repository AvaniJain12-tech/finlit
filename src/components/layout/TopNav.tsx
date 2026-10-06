import { Bell, ChevronLeft, ShieldCheck, Home, PieChart, Sparkles, Clock } from 'lucide-react';
import { useFinLit, type Tab } from '@/context/FinLitContext';

interface TopNavProps {
  onBack?: () => void;
  title?: string;
  showBackOnly?: boolean;
}

const navTabs: { id: Tab; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'portfolio', label: 'Portfolio', icon: PieChart },
  { id: 'insights', label: 'Insights & Goals', icon: Sparkles },
  { id: 'activity', label: 'Activity & Audit', icon: Clock },
];

export function TopNav({ onBack, title, showBackOnly = false }: TopNavProps) {
  const {
    activeTab,
    setActiveTab,
    unreadCount,
    openNotificationCenter,
    openSettings,
  } = useFinLit();

  return (
    <header className="sticky top-0 z-30 bg-surface/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[64px] flex items-center justify-between gap-4">
        {/* Left: Brand or Back Button */}
        <div className="flex items-center gap-3">
          {onBack ? (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-border-2 text-ink active:scale-95 transition-all cursor-pointer font-semibold text-[13px]"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5 text-ink" strokeWidth={2.2} />
              <span className="hidden sm:inline">Back to Dashboard</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 text-left cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-lg bg-ink flex items-center justify-center shadow-btn group-hover:scale-105 transition-transform">
                <span className="text-bg text-[12px] font-extrabold tracking-tight">F</span>
              </div>
              <div>
                <span className="text-[15px] font-[750] text-ink tracking-tight block leading-none">
                  FinLit Ventures
                </span>
                <span className="text-[10px] font-medium text-ink-3 tracking-wide uppercase hidden sm:block mt-0.5">
                  Decision Intelligence Layer
                </span>
              </div>
            </button>
          )}
        </div>

        {/* Center: Desktop Navigation Tabs (Hidden on mobile) */}
        {!showBackOnly && !onBack && (
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-1 bg-bg p-1 rounded-xl border border-border"
          >
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    window.scrollTo(0, 0);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-surface text-ink shadow-sm'
                      : 'text-ink-3 hover:text-ink hover:bg-surface/50'
                  }`}
                >
                  <Icon className="w-4 h-4" strokeWidth={isActive ? 2.2 : 1.8} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* If title provided in flow mode */}
        {title && (
          <div className="hidden sm:block text-center truncate">
            <span className="text-[14px] font-bold text-ink tracking-tight">{title}</span>
          </div>
        )}

        {/* Right Controls */}
        <div className="flex items-center justify-end gap-2.5">
          {!showBackOnly && (
            <>
              {/* Demo Mode Badge */}
              <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-border-2 text-ink-2 text-[11px] font-semibold border border-border">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Riya's Portfolio · ₹12.0L</span>
              </div>

              {/* Notification Bell */}
              <button
                onClick={openNotificationCenter}
                className="relative w-9 h-9 rounded-xl border border-border bg-surface flex items-center justify-center text-ink-2 hover:text-ink hover:border-ink/30 active:scale-95 transition-all cursor-pointer shadow-sm"
                aria-label="Open notifications"
                title="Notifications & Deep Links"
              >
                <Bell className="w-4 h-4" strokeWidth={2} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-surface leading-none animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Profile Avatar & Trust Center Trigger */}
              <button
                onClick={openSettings}
                className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-xl bg-surface border border-border hover:border-ink/30 active:scale-95 transition-all cursor-pointer shadow-sm"
                aria-label="Open settings and trust center"
                title="Riya Jain · Preferences & Trust Architecture"
              >
                <div className="w-7 h-7 rounded-lg bg-ink text-white flex items-center justify-center text-[11px] font-bold">
                  RJ
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-[12px] font-bold text-ink leading-none">Riya</p>
                  <p className="text-[10px] text-ink-3 leading-none mt-0.5">Trust Center</p>
                </div>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
