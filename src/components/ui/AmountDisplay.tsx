interface AmountDisplayProps {
  amount: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  sm: 'text-2xl',
  md: 'text-3xl',
  lg: 'text-4xl',
  xl: 'text-5xl',
};

export function AmountDisplay({ amount, size = 'lg', className = '' }: AmountDisplayProps) {
  return (
    <p className={`font-bold tabular tracking-tight text-slate-900 ${sizes[size]} ${className}`}>
      {amount}
    </p>
  );
}
