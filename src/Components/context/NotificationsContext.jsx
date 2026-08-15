import React, { createContext, useState, useCallback } from 'react';
import { notificationService } from '../services/notificationService';

export const NotificationsContext = createContext(null);

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(() => notificationService.getAll());

  const sync = useCallback(() => {
    setNotifications(notificationService.getAll());
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback((id) => {
    notificationService.markAsRead(id);
    sync();
  }, [sync]);

  const markAllAsRead = useCallback(() => {
    notificationService.markAllAsRead();
    sync();
  }, [sync]);

  return (
    <NotificationsContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAllAsRead, refresh: sync }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}