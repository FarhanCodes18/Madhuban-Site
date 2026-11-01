import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Calculator,
  ShoppingBag,
  ChefHat,
  UtensilsCrossed,
  Package,
  Truck,
  DollarSign,
  Users,
  QrCode,
  BellRing,
  Calendar,
  BarChart3,
  TrendingUp,
  ArrowLeft,
  Menu as MenuIcon,
  X,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Bell
} from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';
import { useNotifications } from '../context/NotificationContext';
import NotificationCenterModal from '../components/common/NotificationCenterModal';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { orders, waiterRequests, inventory, resetDemoData } = useDemoRestaurant();
  const { unreadCount, toggleNotifications } = useNotifications();
  const navigate = useNavigate();

  const pendingOrdersCount = orders.filter(o => o.status === 'placed' || o.status === 'accepted' || o.status === 'preparing').length;
  const pendingRequestsCount = waiterRequests.filter(r => r.status === 'pending').length;
  const lowInventoryCount = inventory.filter(i => i.currentStock <= i.minThreshold).length;

  const adminNavItems = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Smart POS Terminal', path: '/admin/pos', icon: Calculator, highlight: true },
    { name: 'Live Orders Queue', path: '/admin/orders', icon: ShoppingBag, badge: pendingOrdersCount },
    { name: 'Kitchen Display (KDS)', path: '/admin/kds', icon: ChefHat },
    { name: 'Menu Catalog', path: '/admin/menu', icon: UtensilsCrossed },
    { name: 'Farm Stock & Inventory', path: '/admin/inventory', icon: Package, badge: lowInventoryCount },
    { name: 'Suppliers & POs', path: '/admin/suppliers', icon: Truck },
    { name: 'Operational Expenses', path: '/admin/expenses', icon: DollarSign },
    { name: 'Staff & Shifts', path: '/admin/staff', icon: Users },
    { name: 'Tables & QR Codes', path: '/admin/tables', icon: QrCode },
    { name: 'Floor Waiter Calls', path: '/admin/waiter-requests', icon: BellRing, badge: pendingRequestsCount },
    { name: 'Table Bookings', path: '/admin/reservations', icon: Calendar },
    { name: 'P&L Analytics', path: '/admin/analytics', icon: TrendingUp },
    { name: 'Financial Reports', path: '/admin/reports', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-[#F0F2EB] flex text-[#183B29] font-poppins antialiased">
      
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-forest-dark text-cream border-r border-gold/20 transition-all duration-300 z-30 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-forest flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center text-gold border border-gold/40 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col whitespace-nowrap">
                <span className="font-playfair font-bold text-lg text-cream tracking-wider uppercase">
                  Madhuban
                </span>
                <span className="text-[10px] text-gold uppercase tracking-widest font-mono">
                  Command Platform
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-forest text-gold border border-gold/30 shadow-soft'
                    : 'text-sage hover:bg-forest/50 hover:text-cream'
                }`
              }
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {isSidebarOpen && (
                <div className="flex-1 flex items-center justify-between">
                  <span className="truncate">{item.name}</span>
                  {item.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-forest-dark shrink-0">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-forest space-y-2">
          {isSidebarOpen ? (
            <>
              <button
                onClick={resetDemoData}
                className="w-full py-2 px-3 rounded-xl bg-forest/40 hover:bg-forest text-sage hover:text-cream text-[11px] font-mono flex items-center justify-center gap-2 transition"
                title="Reset all orders, tables and menu to defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo State</span>
              </button>

              <Link
                to="/"
                className="w-full py-2.5 px-3 rounded-xl bg-gold text-forest-dark font-bold text-xs flex items-center justify-center gap-2 hover:bg-gold-light transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Guest Storefront</span>
              </Link>
            </>
          ) : (
            <Link
              to="/"
              className="w-10 h-10 rounded-xl bg-gold text-forest-dark flex items-center justify-center mx-auto"
              title="Guest Storefront"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-[#D8DFD1] px-6 py-3 flex items-center justify-between shadow-soft-sm sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(v => !v)}
              className="lg:hidden p-2 rounded-xl text-forest hover:bg-pastel transition"
            >
              <MenuIcon className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsSidebarOpen(v => !v)}
              className="hidden lg:flex p-2 rounded-xl text-forest hover:bg-pastel transition"
              title="Toggle Sidebar"
            >
              <MenuIcon className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-forest uppercase tracking-wider">
                Operations Live
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button
              onClick={toggleNotifications}
              className="relative p-2 rounded-xl text-forest hover:bg-pastel transition"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-brandText">Executive Operations Desk</p>
              <p className="text-[10px] text-brandText-muted">Madhuban Command Center</p>
            </div>

            <div className="w-10 h-10 rounded-full bg-forest text-gold font-bold flex items-center justify-center text-sm shadow-soft">
              MD
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-forest-dark text-cream p-4 border-b border-forest shadow-xl z-20 space-y-1 max-h-[80vh] overflow-y-auto">
            {adminNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.exact}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold text-sage hover:text-cream hover:bg-forest"
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-gold text-forest-dark">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
            <div className="pt-2 border-t border-forest">
              <Link
                to="/"
                className="w-full py-2 px-4 rounded-xl bg-gold text-forest-dark text-xs font-bold flex items-center justify-center gap-2"
              >
                <span>Back to Guest Restaurant</span>
              </Link>
            </div>
          </div>
        )}

        {/* Nested Admin Route Outlet */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>

      <NotificationCenterModal />
    </div>
  );
}
