import { type ReactNode } from 'react';
import { TopNav } from '@/components/layout/TopNav';
import { BottomNav } from '@/components/layout/BottomNav';
import { Toast } from '@/components/ui/Toast';
import { NotificationCenterModal } from '@/components/modals/NotificationCenterModal';
import { SettingsModal } from '@/components/modals/SettingsModal';
import { AIExplanationModal } from '@/components/modals/AIExplanationModal';
import { WhyAmISeeingModal } from '@/components/modals/WhyAmISeeingModal';

interface AppShellProps {
  children: ReactNode;
  showBottomNav?: boolean;
  onBack?: () => void;
  title?: string;
  showBackOnly?: boolean;
}

export function AppShell({
  children,
  showBottomNav = true,
  onBack,
  title,
  showBackOnly = false,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#F0EEE6] flex items-start justify-center text-ink selection:bg-accent/20">
      <div className="relative flex flex-col min-h-screen w-full max-w-[430px] bg-bg shadow-xl overflow-x-hidden">
        {/* Top Navigation */}
        <TopNav onBack={onBack} title={title} showBackOnly={showBackOnly} />

        {/* Main Content Area */}
        <main className="flex-1 px-5">{children}</main>

        {/* Bottom Tab Navigation */}
        {showBottomNav && <BottomNav />}

        {/* Global Overlays & Modals */}
        <Toast />
        <NotificationCenterModal />
        <SettingsModal />
        <AIExplanationModal />
        <WhyAmISeeingModal />
      </div>
    </div>
  );
}
