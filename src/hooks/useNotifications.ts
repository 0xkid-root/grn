import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import api from '@/lib/services/api';
import { useSettings } from '@/contexts/SettingsContext';

interface Notification {
  id: string;
  type: 'transfer' | 'security' | 'system';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { settings } = useSettings();

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await api.get('/notifications');
      setNotifications(response.data);
      setUnreadCount(response.data.filter((n: Notification) => !n.read).length);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  }, []);

  const markAsRead = useCallback(async (id: string) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, read: true } : n))
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  }, []);

  const clearAll = useCallback(async () => {
    try {
      await api.delete('/notifications');
      setNotifications([]);
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to clear notifications:', error);
    }
  }, []);

  useEffect(() => {
    if (settings.notifications) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [fetchNotifications, settings.notifications]);

  // WebSocket connection for real-time notifications
  useEffect(() => {
    if (!settings.notifications) return;

    const ws = new WebSocket(import.meta.env.VITE_WS_URL || 'ws://localhost:3001');

    ws.onmessage = (event) => {
      const notification: Notification = JSON.parse(event.data);
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
      
      toast(notification.title, {
        description: notification.message,
      });
    };

    return () => ws.close();
  }, [settings.notifications]);

  return {
    notifications,
    unreadCount,
    fetchNotifications,
    markAsRead,
    clearAll,
  };
}