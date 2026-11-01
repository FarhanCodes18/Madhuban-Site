import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

const initialNotifications = [
  {
    id: 'notif-01',
    category: 'orders',
    title: 'Order Plated & Ready',
    message: 'Order #MB-8922 for Table 04 is hot and ready at the plating counter.',
    timestamp: new Date(Date.now() - 3 * 60000).toISOString(),
    isRead: false,
    priority: 'high',
    link: '/order-tracking/MB-8922'
  },
  {
    id: 'notif-02',
    category: 'waiter',
    title: 'Floor Waiter Assistance',
    message: 'Table 02 requested: "Two glasses of warm water with lemon".',
    timestamp: new Date(Date.now() - 7 * 60000).toISOString(),
    isRead: false,
    priority: 'high',
    link: '/admin/waiter-requests'
  },
  {
    id: 'notif-03',
    category: 'inventory',
    title: 'Low Stock Alert',
    message: 'Kashmiri Mongra Saffron is down to 85g (Min threshold: 150g). Supplier PO suggested.',
    timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
    isRead: false,
    priority: 'high',
    link: '/admin/inventory'
  },
  {
    id: 'notif-04',
    category: 'reservations',
    title: 'Table Booking Seated',
    message: 'Singhania Family seated at Table 06 (Royal Heritage Suite).',
    timestamp: new Date(Date.now() - 40 * 60000).toISOString(),
    isRead: true,
    priority: 'normal',
    link: '/admin/reservations'
  },
  {
    id: 'notif-05',
    category: 'feedback',
    title: 'New 5-Star Dining Review',
    message: 'Meera Deshmukh posted: "Ambiance and Truffle Pizza were breathtaking!"',
    timestamp: new Date(Date.now() - 65 * 60000).toISOString(),
    isRead: true,
    priority: 'normal',
    link: '/admin'
  },
  {
    id: 'notif-06',
    category: 'rewards',
    title: 'Rewards Points Added',
    message: '+95 points credited to Rohan Singhal for recent dinner booking.',
    timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
    isRead: true,
    priority: 'normal',
    link: '/rewards'
  }
];

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('madhuban_notifications_v1');
      return saved ? JSON.parse(saved) : initialNotifications;
    } catch {
      return initialNotifications;
    }
  });

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('madhuban_notifications_v1', JSON.stringify(notifications));
    } catch (e) {
      console.error(e);
    }
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const addNotification = ({ category, title, message, priority = 'normal', link = null }) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      category,
      title,
      message,
      timestamp: new Date().toISOString(),
      isRead: false,
      priority,
      link
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isNotificationOpen,
        setIsNotificationOpen,
        toggleNotifications: () => setIsNotificationOpen(v => !v),
        closeNotifications: () => setIsNotificationOpen(false),
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications,
        addNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
