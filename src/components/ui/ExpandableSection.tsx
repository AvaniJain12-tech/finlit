import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface ExpandableSectionProps {
  title: string;
  children: ReactNode;
}

export function ExpandableSection({ title, children }: ExpandableSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border-subtle last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3.5 text-left gap-3"
      >
        <span className="text-[13px] font-semibold text-ink-DEFAULT">{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-ink-tertiary flex-shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          strokeWidth={2}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-250 ease-out ${
          open ? 'max-h-64 pb-4' : 'max-h-0'
        }`}
      >
        <div className="text-[13px] text-ink-secondary leading-relaxed pr-6">{children}</div>
      </div>
    </div>
  );
}
