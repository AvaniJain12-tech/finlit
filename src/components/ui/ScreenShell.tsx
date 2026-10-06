import { type ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';

interface ScreenShellProps {
  children: ReactNode;
  onBack?: () => void;
  showHeader?: boolean;
  brandLabel?: string;
  className?: string;
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
    <div className="min-h-screen bg-bg flex flex-col items-center justify-start py-2 sm:py-8 px-2 sm:px-4">
      <div
        className={`
          relative flex flex-col w-full max-w-2xl bg-surface sm:rounded-2xl
          border border-border shadow-md animate-fade-in overflow-hidden ${className}
        `}
      >
        {showHeader && (
          <header className="sticky top-0 z-20 bg-surface/95 backdrop-blur-sm border-b border-border">
            <div className="px-6 h-[56px] flex items-center justify-between">
              {/* Left: back button */}
              <div className="flex items-center">
                {onBack && (
                  <button
                    onClick={onBack}
                    className="flex items-center gap-1 text-[13px] font-semibold text-ink px-2.5 py-1.5 -ml-2 rounded-xl hover:bg-border-2 active:scale-95 transition-all cursor-pointer"
                    aria-label="Go back"
                  >
                    <ChevronLeft className="w-5 h-5 text-ink" strokeWidth={2.2} />
                    <span>Back</span>
                  </button>
                )}
              </div>

              {/* Centre: brand */}
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-[5px] bg-ink flex items-center justify-center flex-shrink-0">
                  <span className="text-bg text-[10px] font-bold">F</span>
                </div>
                <span className="text-[13.5px] font-bold text-ink tracking-tight">
                  {brandLabel}
                </span>
              </div>

              {/* Right: metadata tag */}
              <div className="flex items-center">
                <span className="text-[11px] font-semibold text-ink-3 uppercase tracking-wider hidden sm:inline">
                  Decision Layer
                </span>
              </div>
            </div>
          </header>
        )}

        <main className="flex-1 px-6 sm:px-8 py-6">{children}</main>

        {footer && (
          <div className="sticky bottom-0 z-20 bg-surface border-t border-border">
            <div className="px-6 sm:px-8 py-4">{footer}</div>
          </div>
        )}
      </div>
    </div>
  );
}
