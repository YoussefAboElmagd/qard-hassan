"use client";

import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { NotificationPanel } from './NotificationPanel';
import type { NotificationData } from './NotificationItem';

type NotificationBellProps = {
  className?: string;
  notifications?: NotificationData[];
  unreadCount?: number;
  isPermissionGranted?: boolean;
  onRequestPermission?: () => void;
  onMarkAllAsRead?: () => void;
  onClearAll?: () => void;
  onMarkAsRead?: (id: string) => void;
  onDeleteNotification?: (id: string) => void;
  panelTitle?: string;
  emptyTitle?: string;
  emptySubtitle?: string;
  viewAllLabel?: string;
};

export function NotificationBell({
  className,
  notifications,
  unreadCount,
  isPermissionGranted,
  onRequestPermission,
  onMarkAllAsRead,
  onClearAll,
  onMarkAsRead,
  onDeleteNotification,
  panelTitle,
  emptyTitle,
  emptySubtitle,
  viewAllLabel,
}: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);

  const items = notifications ?? [];
  const unreadTotal = unreadCount ?? items.filter(item => !item.read).length;
  const permissionGranted = isPermissionGranted ?? true;

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-full transition-all duration-200 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
          isOpen ? "bg-primary/10" : ""
        }`}
        aria-label="Notifications"
      >
        <Bell
          className={`w-6 h-6 transition-colors text-white hover:text-secondary cursor-pointer`}
        />

        {unreadTotal > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 text-xs font-bold text-white bg-gradient-to-br from-[var(--secondary)] to-[#c89534] rounded-full shadow-lg animate-pulse">
            {unreadTotal > 99 ? '99+' : unreadTotal}
          </span>
        )}

        {!permissionGranted && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>

      {isOpen && (
        <div>
          <NotificationPanel
            notifications={items}
            unreadCount={unreadTotal}
            isPermissionGranted={permissionGranted}
            onRequestPermission={onRequestPermission}
            onMarkAllAsRead={onMarkAllAsRead}
            onClearAll={onClearAll}
            onMarkAsRead={onMarkAsRead}
            onDeleteNotification={onDeleteNotification}
            onClose={() => setIsOpen(false)}
            title={panelTitle ?? "الإشعارات"}
            emptyTitle={emptyTitle ?? "لا توجد إشعارات"}
            emptySubtitle={emptySubtitle ?? "سنخبرك عند وصول إشعارات جديدة"}
            viewAllLabel={viewAllLabel ?? "عرض جميع الإشعارات"}
          />
        </div>
      )}
    </div>
  );
}

