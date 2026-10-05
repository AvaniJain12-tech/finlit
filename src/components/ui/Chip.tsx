interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function Chip({ label, selected = false, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 rounded-lg text-[13px] font-medium border transition-all duration-150 active:scale-[0.97] ${
        selected
          ? 'bg-ink-DEFAULT text-canvas border-ink-DEFAULT'
          : 'bg-white text-ink-secondary border-border-DEFAULT hover:border-ink-tertiary hover:text-ink-DEFAULT'
      }`}
    >
      {label}
    </button>
  );
}
