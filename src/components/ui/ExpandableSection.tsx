import { useState, type ReactNode } from 'react';
import { Plus, Minus } from 'lucide-react';

interface ExpandableSectionProps {
  title: string;
  children: ReactNode;
}

export function ExpandableSection({ title, children }: ExpandableSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-semibold text-slate-700">{title}</span>
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-500">
          {open ? <Minus className="w-3.5 h-3.5" strokeWidth={2.5} /> : <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          open ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <div className="text-sm text-slate-600 leading-relaxed pr-8">{children}</div>
      </div>
    </div>
  );
}
