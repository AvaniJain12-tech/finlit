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
    <div className="min-h-screen bg-bg flex flex-col text-ink selection:bg-accent/20">
      {/* Top Navigation */}
      <TopNav onBack={onBack} title={title} showBackOnly={showBackOnly} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      {/* Mobile Bottom Tab Navigation (hidden on md+ laptop screens) */}
      {showBottomNav && <BottomNav />}

      {/* Global Overlays & Modals */}
      <Toast />
      <NotificationCenterModal />
      <SettingsModal />
      <AIExplanationModal />
      <WhyAmISeeingModal />
    </div>
  );
}
