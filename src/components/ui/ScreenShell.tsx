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
    /* Desktop: centred phone-width column on warm canvas */
    <div className="min-h-screen bg-canvas-subtle flex items-start justify-center">
      <div
        className={`relative flex flex-col min-h-screen w-full max-w-[430px] bg-canvas shadow-elevated animate-fade-in ${className}`}
      >
        {showHeader && (
          <header className="sticky top-0 z-20 bg-canvas/90 backdrop-blur-xl border-b border-border-DEFAULT">
            <div className="px-5 h-[52px] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {onBack ? (
                  <button
                    onClick={onBack}
                    className="flex items-center justify-center w-8 h-8 -ml-1 rounded-lg hover:bg-ink-DEFAULT/6 active:scale-90 transition-all"
                    aria-label="Go back"
                  >
                    <ChevronLeft className="w-5 h-5 text-ink-secondary" strokeWidth={2} />
                  </button>
                ) : (
                  /* Brand mark — first screen only */
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-ink-DEFAULT flex items-center justify-center flex-shrink-0">
                      <span className="text-canvas text-[10px] font-bold tracking-tight">F</span>
                    </div>
                    <span className="text-[13px] font-semibold text-ink-DEFAULT tracking-tight">
                      {brandLabel}
                    </span>
                  </div>
                )}
              </div>

              {onBack && (
                <span className="text-[13px] font-semibold text-ink-DEFAULT tracking-tight absolute left-1/2 -translate-x-1/2">
                  {brandLabel}
                </span>
              )}
            </div>
          </header>
        )}

        <main className="flex-1 px-5 pb-8 pt-2">{children}</main>

        {footer && (
          <div className="sticky bottom-0 z-20 bg-canvas/90 backdrop-blur-xl border-t border-border-DEFAULT">
            <div className="px-5 py-3">{footer}</div>
          </div>
        )}
      </div>
    </div>
  );
}
