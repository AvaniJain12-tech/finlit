import { CheckCircle2 } from 'lucide-react';
import { useFinLit } from '@/context/FinLitContext';

export function Toast() {
  const { toast } = useFinLit();

  if (!toast) return null;

  return (
    <aside
      aria-label="Notification alert"
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[390px] animate-fade-in-up pointer-events-none"
    >
      <div className="bg-ink text-white px-4 py-3 rounded-xl shadow-lg border border-[#333] flex items-center gap-3">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" strokeWidth={2.2} />
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-white truncate">{toast.message}</p>
          {toast.submessage && (
            <p className="text-[11px] text-[#A3A3A3] truncate mt-0.5">{toast.submessage}</p>
          )}
        </div>
      </div>
    </aside>
  );
}
