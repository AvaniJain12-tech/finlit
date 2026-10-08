interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

/**
 * Tile-style selectable chip.
 * Selected: accent warm tone fill — immediately obvious.
 * Unselected: solid white with visible border.
 * Never transparent.
 */
export function Chip({ label, selected = false, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-3 rounded-lg text-[13px] font-medium
        border transition-all duration-150 active:scale-[0.97]
        ${selected
          ? 'bg-accent text-white border-accent shadow-btn'
          : 'bg-surface text-ink border-border hover:border-ink-3 hover:bg-border-2'
        }
      `}
    >
      {label}
    </button>
  );
}
