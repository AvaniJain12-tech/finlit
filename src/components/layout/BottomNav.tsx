import { Home, PieChart, Sparkles, Clock } from 'lucide-react';
import { useFinLit, type Tab } from '@/context/FinLitContext';

interface NavItem {
  id: Tab;
  label: string;
  icon: typeof Home;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'portfolio', label: 'Portfolio', icon: PieChart },
  { id: 'insights', label: 'Insights', icon: Sparkles },
  { id: 'activity', label: 'Activity', icon: Clock },
];

export function BottomNav() {
  const { activeTab, setActiveTab } = useFinLit();

  return (
    <nav
      aria-label="Bottom Navigation"
      className="md:hidden sticky bottom-0 z-30 bg-surface/95 backdrop-blur-md border-t border-border"
    >
      <div className="grid grid-cols-4 h-[60px] max-w-[430px] mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo(0, 0);
              }}
              className={`flex flex-col items-center justify-center gap-1 transition-all duration-150 relative cursor-pointer ${
                isActive ? 'text-ink font-semibold' : 'text-ink-3 hover:text-ink-2'
              }`}
            >
              <div
                className={`w-9 h-7 rounded-xl flex items-center justify-center transition-all ${
                  isActive ? 'bg-bg text-ink scale-105' : 'text-ink-3'
                }`}
              >
                <Icon className="w-[18px] h-[18px]" strokeWidth={isActive ? 2.4 : 1.8} />
              </div>
              <span className={`text-[10.5px] leading-none ${isActive ? 'font-bold text-ink' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
