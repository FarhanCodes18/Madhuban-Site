import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ChefHat,
  Flame,
  UtensilsCrossed,
  XCircle,
  Eye,
  ArrowRight
} from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';

export default function Orders() {
  const { orders, updateOrderStatus } = useDemoRestaurant();
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOrderDetail, setActiveOrderDetail] = useState(null);

  const filteredOrders = orders.filter((order) => {
    if (filterStatus !== 'all' && order.status !== filterStatus) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchId = order.id.toLowerCase().includes(q);
      const matchTable = order.tableName.toLowerCase().includes(q);
      const matchCustomer = order.customerName.toLowerCase().includes(q);
      if (!matchId && !matchTable && !matchCustomer) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-brandText">
            Floor & Online Orders
          </h1>
          <p className="text-xs text-brandText-muted mt-1">
            Dispatch, manage preparation workflows, and track served tables.
          </p>
        </div>

        <div className="text-xs font-semibold text-forest bg-white px-4 py-2 rounded-2xl border border-pastel shadow-soft-sm">
          Total Orders Recorded: <span className="font-bold">{orders.length}</span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="p-4 rounded-3xl bg-white border border-pastel shadow-soft-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {['all', 'placed', 'accepted', 'preparing', 'ready', 'served'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition border ${
                  filterStatus === status
                    ? 'bg-forest text-cream border-forest shadow-soft'
                    : 'bg-bgLight text-brandText border-pastel hover:bg-pastel/40'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-forest absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by order ID, table, or guest..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest"
            />
          </div>

        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-pastel">
            <ShoppingBag className="w-10 h-10 text-brandText-light mx-auto mb-2" />
            <p className="font-playfair font-bold text-base text-brandText">No orders found</p>
            <p className="text-xs text-brandText-muted">Try switching filter tabs or clearing your search term.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="p-5 sm:p-6 rounded-3xl bg-white border border-pastel shadow-soft-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              {/* Order Info */}
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-playfair font-bold text-lg text-brandText">
                    #{order.id}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pastel text-forest border border-forest/20">
                    {order.tableName}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    order.status === 'ready' || order.status === 'served'
                      ? 'bg-emerald-100 text-emerald-800'
                      : order.status === 'preparing'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status.toUpperCase()}
                  </span>
                  <span className="text-xs text-brandText-muted">
                    {order.orderType} • Placed {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {/* Items preview */}
                <div className="space-y-1">
                  {order.items.map((item, idx) => (
                    <p key={idx} className="text-xs text-brandText">
                      <strong className="text-forest">{item.quantity}x</strong> {item.name}{' '}
                      <span className="text-brandText-muted font-dmsans">({item.price * item.quantity})</span>
                      {item.customizations && (
                        <span className="text-[11px] text-brandText-light ml-2">
                          [{typeof item.customizations === 'string' ? item.customizations : Object.values(item.customizations).join(', ')}]
                        </span>
                      )}
                    </p>
                  ))}
                </div>

                {order.notes && order.notes !== 'None' && (
                  <p className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded-xl border border-amber-200 inline-block">
                    <strong>Kitchen Note:</strong> {order.notes}
                  </p>
                )}
              </div>

              {/* Price & Status Workflow Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-pastel/40">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-brandText-muted uppercase block font-semibold">Total Amount</span>
                  <span className="font-dmsans text-xl font-bold text-forest">₹{order.total}</span>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  {order.status === 'placed' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'accepted')}
                      className="px-3.5 py-2 rounded-xl bg-forest hover:bg-forest-dark text-cream font-bold text-xs shadow-soft transition"
                    >
                      Accept
                    </button>
                  )}

                  {order.status === 'accepted' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                      className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-cream font-bold text-xs shadow-soft transition flex items-center gap-1"
                    >
                      <ChefHat className="w-3.5 h-3.5" />
                      <span>Start Cooking</span>
                    </button>
                  )}

                  {order.status === 'preparing' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'ready')}
                      className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-cream font-bold text-xs shadow-soft transition flex items-center gap-1"
                    >
                      <Flame className="w-3.5 h-3.5" />
                      <span>Mark Ready</span>
                    </button>
                  )}

                  {order.status === 'ready' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'served')}
                      className="px-3.5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-cream font-bold text-xs shadow-soft transition flex items-center gap-1"
                    >
                      <UtensilsCrossed className="w-3.5 h-3.5" />
                      <span>Mark Served</span>
                    </button>
                  )}

                  {order.status !== 'served' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'cancelled')}
                      className="p-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition"
                      title="Cancel Order"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
