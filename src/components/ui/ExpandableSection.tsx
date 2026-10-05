import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface ExpandableSectionProps {
  title: string;
  children: ReactNode;
}

export function ExpandableSection({ title, children }: ExpandableSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border-2 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4"
      >
        <span className="text-[14px] font-semibold text-ink">{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-ink-3 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          strokeWidth={2}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ease-out ${
          open ? 'max-h-72 pb-4' : 'max-h-0'
        }`}
      >
        <p className="text-[13px] text-ink-2 leading-relaxed pr-6">{children}</p>
      </div>
    </div>
  );
}
