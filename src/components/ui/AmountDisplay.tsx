interface AmountDisplayProps {
  amount: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  sm: 'text-amount-md',
  md: 'text-amount-md',
  lg: 'text-amount-lg',
  xl: 'text-amount-xl',
};

export function AmountDisplay({ amount, size = 'lg', className = '' }: AmountDisplayProps) {
  return (
    <p
      className={`font-bold tabular text-ink-DEFAULT tracking-tight leading-none ${sizes[size]} ${className}`}
    >
      {amount}
    </p>
  );
}
