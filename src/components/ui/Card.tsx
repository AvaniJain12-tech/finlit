import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padded?: boolean;
  variant?: 'default' | 'muted';
}

export function Card({ children, className = '', padded = true, variant = 'default' }: CardProps) {
  const base = variant === 'muted'
    ? 'bg-border-2 border border-border'
    : 'bg-surface border border-border shadow-card';

  return (
    <div className={`rounded-xl ${padded ? 'p-5' : ''} ${base} ${className}`}>
      {children}
    </div>
  );
}
