import { useState } from 'react';
import { X, CheckCheck, Bell, ArrowRight, ShieldCheck } from 'lucide-react';
import { useFinLit } from '@/context/FinLitContext';
import { type NotificationItem } from '@/lib/data';

type CategoryFilter = 'all' | 'decision' | 'portfolio' | 'goal' | 'insight' | 'system';

export function NotificationCenterModal() {
  const {
    isNotificationCenterOpen,
    closeNotificationCenter,
    notifications,
    markAsRead,
    markAllAsRead,
    deepLink,
  } = useFinLit();

  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  if (!isNotificationCenterOpen) return null;

  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const todayItems = filteredNotifications.filter((i) => i.section === 'today');
  const earlierItems = filteredNotifications.filter((i) => i.section === 'earlier');
  const unreadTotal = notifications.filter((n) => n.unread).length;

  const handleActionClick = (notif: NotificationItem) => {
    markAsRead(notif.id);
    deepLink(notif.deepLinkType);
  };

  const getCategoryBadge = (category: NotificationItem['category']) => {
    switch (category) {
      case 'decision':
        return (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
            Decision
          </span>
        );
      case 'portfolio':
        return (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider">
            Portfolio
          </span>
        );
      case 'goal':
        return (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 uppercase tracking-wider">
            Goal
          </span>
        );
      case 'insight':
        return (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
            Insight
          </span>
        );
      case 'system':
        return (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200 uppercase tracking-wider">
            System
          </span>
        );
    }
  };

  const renderNotificationCard = (item: NotificationItem) => (
    <div
      key={item.id}
      className={`p-4 rounded-xl border transition-all duration-150 ${
        item.unread
          ? 'bg-surface border-border shadow-card'
          : 'bg-[#F9F8F5] border-border-2 opacity-90'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-1.5">
        <div className="flex items-center gap-2">
          {getCategoryBadge(item.category)}
          {item.unread && (
            <span
              className="w-2 h-2 rounded-full bg-accent animate-pulse"
              title="Unread notification"
            />
          )}
        </div>
        <span className="text-[11px] text-ink-3 tabular font-medium">{item.time}</span>
      </div>

      <h3 className="text-[13.5px] font-semibold text-ink leading-snug mb-1">
        {item.title}
      </h3>
      <p className="text-[12.5px] text-ink-2 leading-relaxed mb-3">
        {item.body}
      </p>

      {/* Deep Link CTA Button */}
      <div className="flex items-center justify-between pt-2 border-t border-border-2">
        <button
          onClick={() => handleActionClick(item)}
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink hover:text-accent transition-colors group cursor-pointer"
        >
          <span>{item.actionLabel}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {item.unread && (
          <button
            onClick={() => markAsRead(item.id)}
            className="text-[11px] text-ink-3 hover:text-ink-2 font-medium cursor-pointer"
          >
            Mark read
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-ink/40 backdrop-blur-[2px] animate-fade-in">
      <div
        className="w-full sm:max-w-lg bg-bg rounded-t-2xl sm:rounded-2xl border border-border shadow-xl flex flex-col max-h-[85vh] animate-fade-in-up overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="notif-center-title"
      >
        {/* Header */}
        <div className="px-5 py-4 bg-surface border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-bg border border-border flex items-center justify-center text-ink">
              <Bell className="w-4 h-4" strokeWidth={2} />
            </div>
            <div>
              <h2 id="notif-center-title" className="text-[15px] font-bold text-ink leading-tight">
                Notifications
              </h2>
              <p className="text-[11px] text-ink-3">
                {unreadTotal > 0 ? `${unreadTotal} unread updates` : 'All caught up'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadTotal > 0 && (
              <button
                onClick={markAllAsRead}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-ink-2 hover:text-ink bg-bg hover:bg-border-2 rounded-md transition-colors cursor-pointer"
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all</span>
              </button>
            )}
            <button
              onClick={closeNotificationCenter}
              className="w-8 h-8 rounded-full flex items-center justify-center text-ink-3 hover:text-ink hover:bg-border-2 transition-colors cursor-pointer"
              aria-label="Close notifications"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="px-4 py-2.5 bg-surface border-b border-border flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All' },
            { id: 'decision', label: 'Decision' },
            { id: 'portfolio', label: 'Portfolio' },
            { id: 'goal', label: 'Goal' },
            { id: 'insight', label: 'Insights' },
            { id: 'system', label: 'System' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id as CategoryFilter)}
              className={`px-3 py-1 rounded-full text-[12px] font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === cat.id
                  ? 'bg-ink text-white'
                  : 'bg-bg text-ink-2 hover:bg-border-2'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
          {filteredNotifications.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-border-2 flex items-center justify-center text-ink-3 mb-3">
                <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <p className="text-[14px] font-semibold text-ink mb-1">You're all caught up</p>
              <p className="text-[12px] text-ink-3 max-w-[220px]">
                No pending alerts under this category.
              </p>
            </div>
          ) : (
            <>
              {todayItems.length > 0 && (
                <div>
                  <p className="eyebrow px-1 mb-2.5">Today</p>
                  <div className="space-y-2.5">
                    {todayItems.map(renderNotificationCard)}
                  </div>
                </div>
              )}

              {earlierItems.length > 0 && (
                <div>
                  <p className="eyebrow px-1 mb-2.5">Earlier</p>
                  <div className="space-y-2.5">
                    {earlierItems.map(renderNotificationCard)}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom micro footer */}
        <div className="px-4 py-3 bg-surface border-t border-border text-center">
          <p className="text-[11px] text-ink-3">
            Priority alerts are delivered in real-time. Manage in Notification Settings.
          </p>
        </div>
      </div>
    </div>
  );
}
