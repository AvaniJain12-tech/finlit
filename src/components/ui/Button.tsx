import { type ReactNode, type ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg' | 'pair';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

// ─── VARIANT STYLES ──────────────────────────────────────────────────────────
// PRIMARY  → solid dark #171717 fill, white text. ALWAYS visible. Never transparent.
// SECONDARY→ solid #FFFFFF fill, dark text, visible border. Never transparent.
// GHOST    → only for very minor text-style actions (back links etc.)
// ─────────────────────────────────────────────────────────────────────────────
const variantClasses: Record<Variant, string> = {
  primary:
    'bg-ink text-white border-none shadow-btn ' +
    'hover:bg-[#2c2c2c] active:scale-[0.98] active:bg-[#333]',
  secondary:
    'bg-surface text-ink border border-border ' +
    'hover:bg-[#F5F4F0] active:scale-[0.98]',
  ghost:
    'bg-transparent text-ink-2 hover:bg-[#F5F4F0] active:scale-[0.98]',
};

const sizeClasses: Record<Size, string> = {
  sm:   'h-10  px-4  text-[13px] font-semibold rounded-btn',
  md:   'h-12  px-5  text-[14px] font-semibold rounded-btn',
  lg:   'h-[52px] px-5 text-[15px] font-[650] rounded-btn tracking-[-0.01em]',
  pair: 'h-[52px] px-3 text-[14px] font-[650] rounded-btn tracking-[-0.01em]',
};

export function Button({
  variant = 'primary',
  size = 'lg',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        transition-all duration-150 select-none cursor-pointer
        disabled:opacity-40 disabled:cursor-not-allowed
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
