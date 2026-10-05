import { Button } from '@/components/ui/Button';

interface Action {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

interface ActionPairProps {
  left: Action;
  right: Action;
}

/**
 * Two equally dignified decision buttons.
 * Left = secondary (solid white + border).
 * Right = primary (solid dark fill).
 * Neither is transparent. Both are clearly clickable.
 */
export function ActionPair({ left, right }: ActionPairProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        variant="secondary"
        size="pair"
        onClick={left.onClick}
        disabled={left.disabled}
        className="w-full"
      >
        {left.label}
      </Button>
      <Button
        variant="primary"
        size="pair"
        onClick={right.onClick}
        disabled={right.disabled}
        className="w-full"
      >
        {right.label}
      </Button>
    </div>
  );
}
