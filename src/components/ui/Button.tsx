import { type ReactNode, type ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg' | 'pair';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-ink-DEFAULT text-canvas hover:bg-ink-secondary active:scale-[0.98] shadow-soft',
  secondary:
    'bg-transparent text-ink-DEFAULT border border-border-DEFAULT hover:border-ink-tertiary hover:bg-ink-DEFAULT/[0.03] active:scale-[0.98]',
  ghost:
    'bg-transparent text-ink-secondary hover:bg-ink-DEFAULT/[0.04] active:scale-[0.98]',
  outline:
    'bg-transparent text-ink-DEFAULT border border-border-DEFAULT hover:border-ink-secondary hover:bg-ink-DEFAULT/[0.03] active:scale-[0.98]',
};

const sizeClasses: Record<Size, string> = {
  sm:   'px-4 py-2 text-[13px] font-medium rounded-lg',
  md:   'px-5 py-3 text-[13px] font-semibold rounded-xl',
  lg:   'px-5 py-[13px] text-[14px] font-semibold rounded-xl tracking-[-0.01em]',
  pair: 'px-3 py-[13px] text-[13px] font-semibold rounded-xl tracking-[-0.01em]',
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
      className={`inline-flex items-center justify-center gap-2 transition-all duration-200 select-none disabled:opacity-40 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
