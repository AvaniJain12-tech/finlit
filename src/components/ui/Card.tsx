import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

export function Card({ children, className = '', padded = true }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-border-DEFAULT shadow-card ${padded ? 'p-5' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
