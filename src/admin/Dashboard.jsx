import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  ShoppingBag,
  ChefHat,
  UtensilsCrossed,
  BellRing,
  Calendar,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';

export default function Dashboard() {
  const { orders, tables, waiterRequests, reservations, reportsData, updateOrderStatus } = useDemoRestaurant();
  const navigate = useNavigate();

  const occupiedTables = tables.filter(t => t.status === 'occupied').length;
  const pendingOrders = orders.filter(o => o.status === 'placed' || o.status === 'accepted' || o.status === 'preparing');
  const activeWaiterReqs = waiterRequests.filter(r => r.status === 'pending');

  const kpis = [
    { label: "Today's Revenue", value: `₹${reportsData.todayRevenue.toLocaleString()}`, change: '+11.4%', icon: TrendingUp, color: 'text-emerald-700 bg-emerald-50' },
    { label: 'Total Orders Placed', value: reportsData.totalOrdersToday, change: '+8 vs yesterday', icon: ShoppingBag, color: 'text-blue-700 bg-blue-50' },
    { label: 'Pending in Kitchen', value: pendingOrders.length, change: 'Active cooking', icon: ChefHat, color: 'text-amber-700 bg-amber-50' },
    { label: 'Occupied Tables', value: `${occupiedTables} / ${tables.length}`, change: 'Garden & Atrium', icon: UtensilsCrossed, color: 'text-purple-700 bg-purple-50' },
    { label: 'Floor Waiter Calls', value: activeWaiterReqs.length, change: 'Needs assistance', icon: BellRing, color: 'text-rose-700 bg-rose-50' },
    { label: 'Table Reservations', value: reservations.length, change: 'Today & Tomorrow', icon: Calendar, color: 'text-gold-dark bg-amber-50' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-brandText">
            Executive Command Center
          </h1>
          <p className="text-xs text-brandText-muted mt-1">
            Real-time floor telemetry, kitchen order dispatch, and financial overview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/kds"
            className="px-4 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-cream font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-forest-glow transition"
          >
            <ChefHat className="w-4 h-4 text-gold" />
            <span>Launch Kitchen Display</span>
          </Link>

          <Link
            to="/table/05"
            className="px-4 py-2.5 rounded-xl bg-white border border-pastel text-forest font-bold text-xs uppercase tracking-wider hover:bg-pastel transition shadow-soft-sm"
          >
            <span>Preview Table 05</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-3xl bg-white border border-pastel shadow-soft-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brandText-muted">
                  {kpi.label}
                </span>
                <div className={`p-1.5 rounded-xl ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <span className="font-playfair text-xl sm:text-2xl font-bold text-brandText">
                  {kpi.value}
                </span>
                <p className="text-[10px] text-forest font-semibold mt-0.5">
                  {kpi.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2-Column Section: Hourly Sales Trend & Table Floor Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sales Hourly Traffic Chart (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-pastel shadow-soft space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-playfair text-lg font-bold text-brandText">
                Hourly Dining Revenue & Rush Hours
              </h3>
              <p className="text-xs text-brandText-muted">
                Peak dining rush occurs between 8:00 PM – 9:30 PM
              </p>
            </div>
            <span className="text-xs font-bold text-forest bg-pastel px-3 py-1 rounded-full">
              Today: ₹64,850
            </span>
          </div>

          {/* Bar Chart Representation */}
          <div className="h-56 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-pastel/60">
            {reportsData.hourlyTraffic.map((hourData, i) => {
              const maxRev = 20000;
              const heightPercent = Math.round((hourData.revenue / maxRev) * 100);

              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                  {/* Tooltip */}
                  <div className="absolute -top-12 bg-forest text-cream text-[10px] py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap shadow-soft z-10 font-mono">
                    ₹{hourData.revenue.toLocaleString()} ({hourData.orders} orders)
                  </div>

                  <div className="w-full max-w-[42px] bg-pastel-light rounded-t-xl overflow-hidden h-40 flex items-end">
                    <div
                      className="w-full bg-forest group-hover:bg-gold transition-all duration-500 rounded-t-xl"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>

                  <span className="text-[10px] font-mono text-brandText-muted">
                    {hourData.hour}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-brandText-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-forest" /> Revenue in INR
            </span>
            <Link to="/admin/reports" className="text-forest font-bold hover:underline">
              Detailed Weekly Reports →
            </Link>
          </div>
        </div>

        {/* Floor Tables Status Visual (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-pastel shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-playfair text-lg font-bold text-brandText">
              Live Floor Plan
            </h3>
            <Link to="/admin/tables" className="text-xs text-forest font-bold hover:underline">
              Manage Tables
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-2">
            {tables.map((t) => (
              <Link
                key={t.id}
                to={`/admin/tables`}
                className={`p-2.5 rounded-2xl text-center border transition ${
                  t.status === 'occupied'
                    ? 'bg-red-50 border-red-300 text-red-900'
                    : t.status === 'reserved'
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100'
                }`}
              >
                <span className="text-[9px] uppercase font-bold block">T-{t.id}</span>
                <span className="text-xs font-bold leading-none">{t.capacity}P</span>
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-pastel/60 flex items-center justify-between text-[11px] text-brandText-muted">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Free</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Occupied</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Reserved</span>
          </div>
        </div>

      </div>

      {/* Recent Live Orders Queue */}
      <div className="p-6 rounded-3xl bg-white border border-pastel shadow-soft space-y-4">
        <div className="flex items-center justify-between border-b border-pastel pb-4">
          <div>
            <h3 className="font-playfair text-lg font-bold text-brandText">
              Live Kitchen Orders Queue
            </h3>
            <p className="text-xs text-brandText-muted">
              Orders requiring immediate attention and kitchen dispatch
            </p>
          </div>

          <Link
            to="/admin/orders"
            className="text-xs font-bold text-forest hover:underline flex items-center gap-1"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-pastel/40">
          {orders.slice(0, 4).map((order) => (
            <div
              key={order.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-pastel flex items-center justify-center font-bold text-forest text-sm font-playfair shrink-0">
                  {order.tableId !== 'Takeaway' ? `T-${order.tableId}` : 'TK'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-playfair font-bold text-brandText text-base">
                      {order.id}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      order.status === 'ready' || order.status === 'served'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.status}
                    </span>
                    <span className="text-xs text-brandText-muted font-semibold">
                      {order.tableName}
                    </span>
                  </div>

                  <p className="text-xs text-brandText-muted mt-0.5">
                    {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4">
                <span className="font-dmsans text-base font-bold text-forest">
                  ₹{order.total}
                </span>

                {/* Quick advance status buttons */}
                {order.status === 'placed' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'accepted')}
                    className="px-3 py-1.5 rounded-xl bg-forest text-cream text-xs font-bold hover:bg-forest-dark"
                  >
                    Accept Order
                  </button>
                )}
                {order.status === 'accepted' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'preparing')}
                    className="px-3 py-1.5 rounded-xl bg-amber-600 text-cream text-xs font-bold hover:bg-amber-700"
                  >
                    Start Cooking
                  </button>
                )}
                {order.status === 'preparing' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'ready')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-700 text-cream text-xs font-bold hover:bg-emerald-800"
                  >
                    Mark Ready
                  </button>
                )}
                {order.status === 'ready' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'served')}
                    className="px-3 py-1.5 rounded-xl bg-blue-700 text-cream text-xs font-bold hover:bg-blue-800"
                  >
                    Mark Served
                  </button>
                )}

                <Link
                  to={`/order-tracking/${order.id}`}
                  className="p-2 rounded-xl border border-pastel text-forest hover:bg-pastel"
                  title="View Tracking Timeline"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
