"use client";

import React from "react";
import { Globe2, User, X } from "lucide-react";

export type NotificationData = {
  id: string;
  title: string;
  body: string;
  type: "global" | "user-specific";
  read: boolean;
  timestampLabel: string;
  link: string;
  indicatorLabel: string;
};

type NotificationItemProps = {
  notification: NotificationData;
  onMarkAsRead?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function NotificationItem({ notification, onMarkAsRead, onDelete }: NotificationItemProps) {
  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead?.(notification.id);
    }
    if (notification.link) {
      window.location.href = notification.link;
    }
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete?.(notification.id);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative px-4 py-3 transition-all duration-200 cursor-pointer group ${
        !notification.read ? "bg-blue-50/50" : ""
      } hover:bg-gray-50`}
    >
      {!notification.read && (
        <span className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[var(--secondary)] rounded-full" />
      )}

      <div className="flex items-start gap-3 pr-4">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
            notification.type === "global"
              ? "bg-gradient-to-br from-[var(--primary)] to-[rgba(64,111,147,0.8)]"
              : "bg-gradient-to-br from-[var(--secondary)] to-[#c89534]"
          }`}
        >
          {notification.type === "global" ? (
            <Globe2 className="w-5 h-5 text-white" />
          ) : (
            <User className="w-5 h-5 text-white" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-semibold text-gray-900 truncate">{notification.title}</h4>
                <span
                  className={`px-1.5 py-0.5 text-[10px] font-medium rounded-full flex-shrink-0 ${
                    notification.type === "global"
                      ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                      : "bg-[var(--secondary)]/10 text-[#c89534]"
                  }`}
                >
                  {notification.indicatorLabel || (notification.type === "global" ? "عام" : "خاص")}
                </span>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 mb-1">{notification.body}</p>
              <p className="text-xs text-gray-400">{notification.timestampLabel}</p>
            </div>

            <button
              onClick={handleDelete}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-all duration-200 flex-shrink-0"
              aria-label="Delete notification"
            >
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      </div>

      {notification.link && (
        <div className="absolute bottom-2 left-4">
          <div className="text-xs text-[var(--primary)] font-medium flex items-center gap-1 group-hover:underline">
            <span>عرض التفاصيل</span>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

