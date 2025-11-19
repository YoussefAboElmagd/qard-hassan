"use client";

import React from "react";
import { X, Settings, CheckCheck, Trash2 } from "lucide-react";
import { NotificationItem, type NotificationData } from "./NotificationItem";

type NotificationPanelProps = {
  notifications: NotificationData[];
  unreadCount: number;
  isPermissionGranted: boolean;
  onRequestPermission?: () => void;
  onMarkAllAsRead?: () => void;
  onClearAll?: () => void;
  onMarkAsRead?: (id: string) => void;
  onDeleteNotification?: (id: string) => void;
  onClose: () => void;
  title: string;
  emptyTitle: string;
  emptySubtitle: string;
  viewAllLabel: string;
};

export function NotificationPanel({
  notifications,
  unreadCount,
  isPermissionGranted,
  onRequestPermission,
  onMarkAllAsRead,
  onClearAll,
  onMarkAsRead,
  onDeleteNotification,
  onClose,
  title,
  emptyTitle,
  emptySubtitle,
  viewAllLabel,
}: NotificationPanelProps) {
  const items = notifications;
  const unreadTotal = unreadCount;
  const permissionGranted = isPermissionGranted;

  return (
    <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
      <div className="sticky top-0 bg-gradient-to-r from-[var(--primary)] to-[rgba(64,111,147,0.9)] text-white px-4 py-3 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold">{title}</h3>
            {unreadTotal > 0 && (
              <span className="px-2 py-0.5 text-xs font-semibold bg-[var(--secondary)] text-white rounded-full">
                {unreadTotal}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <>
                <button
                  onClick={onMarkAllAsRead}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
                  title="Mark all as read"
                  disabled={!onMarkAllAsRead}
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
                <button
                  onClick={onClearAll}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
                  title="Clear all"
                  disabled={!onClearAll}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
            <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {!permissionGranted && (
        <div className="px-4 py-3 bg-amber-50 border-b border-amber-100">
          <div className="flex items-start gap-3">
            <Settings className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-900">تفعيل الإشعارات</p>
              <p className="text-xs text-amber-700 mt-0.5">اسمح بالإشعارات لتلقي التحديثات المهمة</p>
              {onRequestPermission && (
                <button
                  onClick={onRequestPermission}
                  className="mt-2 px-3 py-1.5 text-xs font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors"
                >
                  تفعيل الآن
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-h-[500px] overflow-y-auto">
        {items.length === 0 ? (
          <div className="px-4 py-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <BellIcon className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-900 mb-1">{emptyTitle}</p>
            <p className="text-xs text-gray-500">{emptySubtitle}</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {items.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={onMarkAsRead}
                onDelete={onDeleteNotification}
              />
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="sticky bottom-0 bg-gray-50 px-4 py-2 border-t border-gray-200">
          <button className="w-full text-sm font-medium text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors">
            {viewAllLabel}
          </button>
        </div>
      )}
    </div>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );
}

