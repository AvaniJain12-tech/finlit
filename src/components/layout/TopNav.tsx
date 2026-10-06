import { Bell, User, ChevronLeft } from 'lucide-react';
import { useFinLit } from '@/context/FinLitContext';

interface TopNavProps {
  onBack?: () => void;
  title?: string;
  showBackOnly?: boolean;
}

export function TopNav({ onBack, title, showBackOnly = false }: TopNavProps) {
  const {
    unreadCount,
    openNotificationCenter,
    openSettings,
  } = useFinLit();

  return (
    <header className="sticky top-0 z-30 bg-bg/95 backdrop-blur-md border-b border-border">
      <div className="px-5 h-[56px] flex items-center justify-between">
        {/* Left item */}
        <div className="flex items-center gap-2 min-w-[70px]">
          {onBack ? (
            <button
              onClick={onBack}
              className="flex items-center justify-center w-9 h-9 -ml-2 rounded-xl hover:bg-border-2 active:scale-90 transition-all cursor-pointer"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5 text-ink" strokeWidth={2.2} />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-ink flex items-center justify-center shadow-btn">
                <span className="text-bg text-[11px] font-extrabold tracking-tighter">F</span>
              </div>
              <span className="text-[13.5px] font-bold text-ink tracking-tight hidden xs:inline">
                FinLit
              </span>
            </div>
          )}
        </div>

        {/* Center Title or Brand */}
        <div className="flex-1 text-center truncate px-2">
          {title ? (
            <span className="text-[14px] font-bold text-ink tracking-tight truncate">
              {title}
            </span>
          ) : (
            <span className="text-[13px] font-semibold text-ink-2 tracking-tight">
              Decision Intelligence
            </span>
          )}
        </div>

        {/* Right items */}
        <div className="flex items-center justify-end gap-1.5 min-w-[70px]">
          {!showBackOnly && (
            <>
              {/* Notification Bell */}
              <button
                onClick={openNotificationCenter}
                className="relative w-9 h-9 rounded-xl flex items-center justify-center text-ink-2 hover:text-ink hover:bg-border-2 active:scale-95 transition-all cursor-pointer"
                aria-label="Open notifications"
              >
                <Bell className="w-4.5 h-4.5" strokeWidth={2} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 min-w-[15px] h-[15px] px-1 rounded-full bg-accent text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-bg leading-none animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Profile / Settings Avatar */}
              <button
                onClick={openSettings}
                className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-ink hover:border-ink/40 active:scale-95 transition-all cursor-pointer shadow-sm ml-1"
                aria-label="Open settings and trust center"
                title="Riya Jain · Settings & Trust Center"
              >
                <span className="text-[11px] font-bold text-ink">RJ</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
