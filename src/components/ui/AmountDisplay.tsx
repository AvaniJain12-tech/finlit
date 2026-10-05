interface AmountDisplayProps {
  amount: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  sm: 'text-num-md',
  md: 'text-num-md',
  lg: 'text-num-lg',
  xl: 'text-num-xl',
};

export function AmountDisplay({ amount, size = 'lg', className = '' }: AmountDisplayProps) {
  return (
    <p className={`font-[750] tabular text-ink leading-none tracking-tight ${sizes[size]} ${className}`}>
      {amount}
    </p>
  );
}
