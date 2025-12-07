"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Search, SlidersHorizontal, MoreVertical, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import mainLogo from "@/assets/images/logo.png";
import { Link } from "@/i18n/navigation";

interface Notification {
  id: string;
  message: string;
  time: string;
  type: "approved" | "reminder";
  isRead: boolean;
}

interface NotificationBellProps {
  initialNotifications?: Notification[];
}

export function NotificationBell({ initialNotifications }: NotificationBellProps) {
  const t = useTranslations("userProfile.notificationsPage");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const defaultNotifications: Notification[] = useMemo(() => [
    {
      id: "1",
      message: t("loanApproved"),
      time: `8 ${t("minAgo")}`,
      type: "approved",
      isRead: false,
    },
    {
      id: "2",
      message: t("paymentReminder"),
      time: `8 ${t("minAgo")}`,
      type: "reminder",
      isRead: true,
    },
    {
      id: "3",
      message: t("paymentReminder"),
      time: `8 ${t("minAgo")}`,
      type: "reminder",
      isRead: true,
    },
    {
      id: "4",
      message: t("paymentReminder"),
      time: `8 ${t("minAgo")}`,
      type: "reminder",
      isRead: true,
    },
  ], [t]);

  const notifications = useMemo<Notification[]>(
    () => initialNotifications ?? defaultNotifications,
    [initialNotifications, defaultNotifications]
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredNotifications = notifications.filter((notif) =>
    notif.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon Button */}
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-full hover:bg-gray-100/50 transition-colors cursor-pointer"
        aria-label="Notifications"
      >
        <Bell className="w-6 h-6 text-[#d9a645]" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full end-0 w-[400px] mt-3 bg-[#f8fafc] rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 bg-white">
              <h3 className="text-lg font-bold text-gray-800 text-right">
                {t("title")}
              </h3>
            </div>

            {/* Search Bar */}
            <div className="px-4 py-3 bg-[#f8fafc]">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white rounded-lg transition-colors">
                  <SlidersHorizontal className="w-5 h-5 text-[#d9a645]" />
                </button>
                <div className="flex-1">
                  <div className={`flex items-center border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus-within:border-[var(--primary)] transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Search className={`w-4 h-4 text-gray-400 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                    <input
                      type="text"
                      placeholder={t("search")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`flex-1 outline-none text-gray-600 placeholder:text-gray-400 bg-transparent text-sm ${isRTL ? 'text-right' : 'text-left'}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-[350px] overflow-y-auto px-4 py-2">
              {filteredNotifications.length === 0 ? (
                <div className="py-8 text-center text-gray-500 text-sm">
                  {t("noNotifications")}
                </div>
              ) : (
                <div className="space-y-0">
                  {filteredNotifications.map((notification, index) => (
                    <NotificationListItem
                      key={notification.id}
                      notification={notification}
                      isLast={index === filteredNotifications.length - 1}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Read More Button */}
            <div className="px-4 py-4 bg-[#f8fafc] border-t border-gray-100">
              <Link
                href="/user-profile/notifications"
                onClick={() => setIsOpen(false)}
                className="block w-full py-3 px-6 border-2 border-[#1a5276] text-[#1a5276] rounded-xl font-medium hover:bg-[#1a5276] hover:text-white transition-all duration-300 text-sm text-center"
              >
                قراءة المزيد
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface NotificationListItemProps {
  notification: Notification;
  isLast: boolean;
}

function NotificationListItem({
  notification,
  isLast,
}: NotificationListItemProps) {
  return (
    <div
      className={`
        bg-transparent
        ${!isLast ? "border-b border-gray-200" : ""}
        py-3 px-2
      `}
    >
      <div className="flex flex-row-reverse items-center gap-3">
        {/* Three Dots Menu */}
        <div className="flex-shrink-0">
          <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 text-right">
          <p className="text-xs leading-relaxed mb-1 text-gray-700">
            {notification.message}
          </p>
          <p className="text-[10px] text-gray-400">{notification.time}</p>
        </div>

        {/* Indicator Bar and Logo */}
        <div className="flex items-center gap-0 flex-shrink-0">
          {/* Logo */}
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#d9a645] flex items-center justify-center bg-white ml-1.5">
            <Image
              src={mainLogo}
              alt="Logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          {/* Vertical Indicator */}
          <div className="w-1 h-11 rounded-full bg-[#d9a645]" />
        </div>
      </div>
    </div>
  );
}

export default NotificationBell;
