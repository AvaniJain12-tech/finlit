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
    'bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98] shadow-soft',
  secondary:
    'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] shadow-soft',
  ghost:
    'bg-transparent text-slate-600 hover:bg-slate-100 active:scale-[0.98]',
  outline:
    'bg-white text-slate-900 border-[1.5px] border-slate-900 hover:bg-slate-100 active:scale-[0.98] shadow-soft',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm font-medium rounded-lg',
  md: 'px-5 py-3 text-sm font-semibold rounded-xl',
  lg: 'px-5 py-3.5 text-[15px] font-semibold rounded-xl',
  pair: 'px-3 py-3.5 text-sm font-semibold rounded-xl',
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
      className={`inline-flex items-center justify-center gap-2 transition-all duration-200 select-none disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
