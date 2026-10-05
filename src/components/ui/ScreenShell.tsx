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
    /* Desktop: warm canvas behind centred mobile column */
    <div className="min-h-screen bg-bg flex items-start justify-center">
      <div
        className={`
          relative flex flex-col min-h-screen w-full max-w-[430px]
          bg-bg shadow-md animate-fade-in ${className}
        `}
      >
        {showHeader && (
          <header className="sticky top-0 z-20 bg-bg/95 backdrop-blur-sm border-b border-border">
            <div className="px-5 h-[52px] flex items-center">
              {/* Left: back button or logo */}
              <div className="w-10 flex items-center">
                {onBack && (
                  <button
                    onClick={onBack}
                    className="flex items-center justify-center w-9 h-9 -ml-2 rounded-md hover:bg-border-2 active:scale-90 transition-all"
                    aria-label="Go back"
                  >
                    <ChevronLeft className="w-5 h-5 text-ink-2" strokeWidth={2} />
                  </button>
                )}
              </div>

              {/* Centre: brand */}
              <div className="flex-1 flex items-center justify-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-[5px] bg-ink flex items-center justify-center flex-shrink-0">
                    <span className="text-bg text-[9px] font-bold">F</span>
                  </div>
                  <span className="text-[13px] font-semibold text-ink tracking-tight">
                    {brandLabel}
                  </span>
                </div>
              </div>

              {/* Right: placeholder for symmetry */}
              <div className="w-10" />
            </div>
          </header>
        )}

        <main className="flex-1 px-5 pb-8 pt-1">{children}</main>

        {footer && (
          <div className="sticky bottom-0 z-20 bg-bg/95 backdrop-blur-sm border-t border-border">
            <div className="px-5 py-3">{footer}</div>
          </div>
        )}
      </div>
    </div>
  );
}
