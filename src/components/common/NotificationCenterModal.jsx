import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  X,
  CheckCircle2,
  Trash2,
  Clock,
  Sparkles,
  AlertTriangle,
  ShoppingBag,
  UtensilsCrossed,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

export default function NotificationCenterModal() {
  const {
    notifications,
    unreadCount,
    isNotificationOpen,
    closeNotifications,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications
  } = useNotifications();

  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  if (!isNotificationOpen) return null;

  const filtered = activeFilter === 'all'
    ? notifications
    : notifications.filter(n => n.category === activeFilter);

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'orders': return <ShoppingBag className="w-4 h-4 text-emerald-600" />;
      case 'waiter': return <Bell className="w-4 h-4 text-amber-600" />;
      case 'inventory': return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      case 'reservations': return <UtensilsCrossed className="w-4 h-4 text-purple-600" />;
      case 'rewards': return <Award className="w-4 h-4 text-gold-dark" />;
      default: return <Sparkles className="w-4 h-4 text-forest" />;
    }
  };

  const timeAgo = (dateStr) => {
    const mins = Math.max(1, Math.round((Date.now() - new Date(dateStr).getTime()) / 60000));
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.round(mins / 60);
    return `${hrs}h ago`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1050] overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeNotifications}
          className="absolute inset-0 bg-forest-dark/60 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="w-screen max-w-md bg-cream shadow-2xl flex flex-col border-l border-pastel"
          >
            {/* Header */}
            <div className="p-5 border-b border-pastel flex items-center justify-between bg-cream/90 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-forest/10 flex items-center justify-center text-forest relative">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-bold text-brandText">
                    Notification Center
                  </h3>
                  <p className="text-xs text-brandText-muted">
                    {unreadCount} unread alert{unreadCount !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              <button
                onClick={closeNotifications}
                className="p-2 rounded-full hover:bg-pastel/50 text-brandText transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="p-3 bg-white border-b border-pastel/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
              {[
                { id: 'all', label: 'All' },
                { id: 'orders', label: 'Orders' },
                { id: 'waiter', label: 'Waiter' },
                { id: 'inventory', label: 'Inventory' },
                { id: 'reservations', label: 'Bookings' },
                { id: 'rewards', label: 'Rewards' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                    activeFilter === f.id
                      ? 'bg-forest text-cream shadow-soft-sm'
                      : 'bg-pastel/40 text-brandText hover:bg-pastel'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filtered.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-pastel/50 flex items-center justify-center text-forest/40">
                    <Bell className="w-8 h-8" />
                  </div>
                  <p className="font-playfair text-lg font-bold text-brandText">All Clear</p>
                  <p className="text-xs text-brandText-muted max-w-xs">
                    No active alerts in this category. You're up to date!
                  </p>
                </div>
              ) : (
                filtered.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      markAsRead(notif.id);
                      if (notif.link) {
                        navigate(notif.link);
                        closeNotifications();
                      }
                    }}
                    className={`p-4 rounded-2xl border transition cursor-pointer relative group ${
                      notif.isRead
                        ? 'bg-white/80 border-pastel/60 text-brandText-muted'
                        : 'bg-white border-gold/40 shadow-soft text-brandText'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-pastel/40 shrink-0 mt-0.5">
                        {getCategoryIcon(notif.category)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className={`text-xs font-bold leading-tight ${notif.isRead ? 'text-brandText' : 'text-forest'}`}>
                            {notif.title}
                          </h4>
                          <span className="text-[10px] text-brandText-light shrink-0">
                            {timeAgo(notif.timestamp)}
                          </span>
                        </div>

                        <p className="text-xs mt-1 leading-snug line-clamp-2">
                          {notif.message}
                        </p>

                        {notif.link && (
                          <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-forest group-hover:underline">
                            <span>Open Link</span>
                            <ArrowRight className="w-3 h-3" />
                          </div>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notif.id);
                        }}
                        className="text-brandText-light hover:text-red-600 p-1 rounded transition opacity-0 group-hover:opacity-100"
                        title="Dismiss"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {!notif.isRead && (
                      <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-gold" />
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Footer Actions */}
            {notifications.length > 0 && (
              <div className="p-4 border-t border-pastel bg-white flex items-center justify-between text-xs">
                <button
                  onClick={markAllAsRead}
                  className="text-forest hover:underline font-semibold flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                  Mark All Read
                </button>

                <button
                  onClick={clearAllNotifications}
                  className="text-red-600 hover:underline font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear All
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
