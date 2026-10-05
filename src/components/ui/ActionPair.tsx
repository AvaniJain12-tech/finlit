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
 * Two decision buttons with identical size, colour and weight.
 * Neither option is visually favoured — the investor decides.
 */
export function ActionPair({ left, right }: ActionPairProps) {
  return (
    <div className="flex gap-3">
      {[left, right].map((action) => (
        <Button
          key={action.label}
          variant="outline"
          size="pair"
          onClick={action.onClick}
          disabled={action.disabled}
          className="flex-1"
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
