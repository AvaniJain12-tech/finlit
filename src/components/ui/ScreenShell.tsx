import { type ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';

interface ScreenShellProps {
  children: ReactNode;
  onBack?: () => void;
  showHeader?: boolean;
  brandLabel?: string;
  className?: string;
  /** Pinned to the bottom of the viewport so decision buttons are always visible. */
  footer?: ReactNode;
}

export function ScreenShell({
  children,
  onBack,
  showHeader = true,
  brandLabel = 'FinLit Ventures',
  className = '',
  footer,
}: ScreenShellProps) {
  return (
    <div className={`flex flex-col min-h-screen bg-slate-50 animate-fade-in ${className}`}>
      {showHeader && (
        <header className="sticky top-0 z-20 bg-slate-50/85 backdrop-blur-xl border-b border-slate-200/60">
          <div className="mx-auto max-w-md px-5 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {onBack ? (
                <button
                  onClick={onBack}
                  className="flex items-center justify-center w-9 h-9 -ml-1.5 rounded-full hover:bg-slate-200/60 active:scale-90 transition-all"
                  aria-label="Go back"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-700" strokeWidth={2.5} />
                </button>
              ) : (
                <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">F</span>
                </div>
              )}
              <span className="text-[13px] font-semibold text-slate-700 tracking-tight">
                {onBack ? '' : brandLabel}
              </span>
            </div>
            {onBack && (
              <span className="text-[13px] font-semibold text-slate-700 tracking-tight">
                {brandLabel}
              </span>
            )}
          </div>
        </header>
      )}
      <main className="flex-1 mx-auto w-full max-w-md px-5 pb-8 pt-2">
        {children}
      </main>
      {footer && (
        <div className="sticky bottom-0 z-20 bg-slate-50/90 backdrop-blur-xl border-t border-slate-200/60">
          <div className="mx-auto max-w-md px-5 py-3">{footer}</div>
        </div>
      )}
    </div>
  );
}
