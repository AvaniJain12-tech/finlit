interface SectionHeaderProps {
  label: string;
  className?: string;
}

export function SectionHeader({ label, className = '' }: SectionHeaderProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </span>
      <div className="h-px flex-1 bg-slate-200/70" />
    </div>
  );
}
