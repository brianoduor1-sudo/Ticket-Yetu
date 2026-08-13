// src/context/NotificationsContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const NotificationsContext = createContext(null);

const STORAGE_KEY = 'eventhub_notifications';

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = ({ type = 'booking_confirmed', title, message, eventId = null }) => {
    const newNotification = {
      id: `notif-${Date.now()}`,
      type,
      title: title || 'Booking Notification',
      message,
      createdAt: new Date().toISOString(),
      read: false,
      eventId,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <NotificationsContext.Provider
      value={{ notifications, unreadCount, addNotification, markAsRead, markAllAsRead }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}