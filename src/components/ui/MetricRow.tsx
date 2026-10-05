interface MetricRowProps {
  label: string;
  value: string;
  sublabel?: string;
  valueClassName?: string;
}

export function MetricRow({ label, value, sublabel, valueClassName = '' }: MetricRowProps) {
  return (
    <div className="flex items-baseline justify-between py-2.5">
      <div>
        <p className="text-[13px] text-ink-secondary font-medium">{label}</p>
        {sublabel && <p className="text-xs text-ink-tertiary mt-0.5">{sublabel}</p>}
      </div>
      <p className={`text-[15px] font-semibold tabular text-ink-DEFAULT ${valueClassName}`}>
        {value}
      </p>
    </div>
  );
}
