import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  BellRing,
  QrCode,
  ShoppingBag,
  Clock,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';
import FoodCard from '../components/menu/FoodCard';
import FoodDetailModal from '../components/menu/FoodDetailModal';
import FloatingWaiterButton from '../components/waiter/FloatingWaiterButton';
import CallWaiterModal from '../components/waiter/CallWaiterModal';

export default function TableOrdering() {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const { dishes, tables, orders } = useDemoRestaurant();
  const {
    cartItems,
    totalItemsCount,
    openCart,
    activeTableId,
    setActiveTableId
  } = useCart();

  const [selectedDish, setSelectedDish] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isWaiterModalOpen, setIsWaiterModalOpen] = useState(false);
  const [showDemoSelector, setShowDemoSelector] = useState(false);

  // Set active table in cart when table page opens
  useEffect(() => {
    if (tableId) {
      setActiveTableId(tableId);
    }
  }, [tableId, setActiveTableId]);

  const currentTableObj = tables.find(t => t.id === tableId) || {
    id: tableId || '05',
    name: `Table ${tableId || '05'}`,
    section: 'Main Botanical Atrium',
    capacity: 4
  };

  // Find active orders placed for this table
  const tableOrders = orders.filter(o => o.tableId === tableId);

  const displayDishes = activeCategory === 'all'
    ? dishes
    : dishes.filter(d => d.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="min-h-screen pt-28 pb-32 bg-bgLight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Table Banner Plaque */}
        <div className="p-6 sm:p-8 rounded-3xl bg-forest text-cream shadow-forest-glow mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-forest-light/40 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-cream text-forest flex flex-col items-center justify-center font-playfair font-bold shadow-soft border-2 border-gold/40">
                <span className="text-[10px] uppercase font-sans tracking-wider text-brandText-muted">TABLE</span>
                <span className="text-2xl leading-none">{currentTableObj.id}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-playfair text-2xl sm:text-3xl font-bold">
                    {currentTableObj.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                    Live Session
                  </span>
                </div>
                <p className="text-xs text-sage mt-1">
                  Section: <span className="font-semibold text-cream">{currentTableObj.section}</span> • Capacity: {currentTableObj.capacity} Guests
                </p>
              </div>
            </div>

            {/* Quick Actions for Customer at Table */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Call Waiter button */}
              <button
                onClick={() => setIsWaiterModalOpen(true)}
                className="px-4 py-2.5 rounded-full bg-gold hover:bg-gold-light text-forest-dark font-dmsans font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-gold-glow transition"
              >
                <BellRing className="w-4 h-4" />
                <span>Call Waiter / Request Service</span>
              </button>

              {/* View Table Cart button */}
              <button
                onClick={openCart}
                className="px-4 py-2.5 rounded-full bg-cream/10 border border-cream/20 hover:bg-cream/20 text-cream font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition"
              >
                <ShoppingBag className="w-4 h-4 text-gold" />
                <span>Table Cart ({totalItemsCount})</span>
              </button>

              {/* Demo Table Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowDemoSelector(v => !v)}
                  className="px-3 py-2 rounded-xl bg-forest-dark/80 text-sage hover:text-cream text-xs font-mono border border-gold/20 flex items-center gap-1.5 transition"
                  title="Switch table for testing"
                >
                  <QrCode className="w-3.5 h-3.5 text-gold" />
                  <span>Demo Switcher</span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                {showDemoSelector && (
                  <div className="absolute right-0 mt-2 w-48 bg-cream text-brandText rounded-2xl shadow-2xl border border-pastel p-2 z-50">
                    <p className="text-[10px] font-bold text-forest uppercase tracking-wider p-2 border-b border-pastel">
                      Select Demo Table:
                    </p>
                    <div className="grid grid-cols-3 gap-1 p-1 max-h-48 overflow-y-auto">
                      {tables.map(t => (
                        <button
                          key={t.id}
                          onClick={() => {
                            setShowDemoSelector(false);
                            navigate(`/table/${t.id}`);
                          }}
                          className={`p-1.5 rounded-lg text-xs font-bold text-center transition ${
                            t.id === tableId
                              ? 'bg-forest text-cream'
                              : 'hover:bg-pastel/50 text-brandText'
                          }`}
                        >
                          T-{t.id}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* If this table has active live orders, display an active status card */}
        {tableOrders.length > 0 && (
          <div className="mb-10 p-5 rounded-3xl bg-white border border-gold/40 shadow-soft space-y-3">
            <div className="flex items-center justify-between border-b border-pastel pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-forest" />
                <h3 className="font-playfair text-lg font-bold text-brandText">
                  Active Table Order: {tableOrders[0].id}
                </h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                tableOrders[0].status === 'ready'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800 animate-pulse'
              }`}>
                Status: {tableOrders[0].status.toUpperCase()}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-brandText-muted">
              <div>
                <span>{tableOrders[0].items.length} items ordered • Total: </span>
                <span className="font-bold text-forest text-sm font-dmsans">
                  ₹{tableOrders[0].total}
                </span>
                <span className="ml-2 font-medium">({tableOrders[0].estimatedTime})</span>
              </div>

              <Link
                to={`/order-tracking/${tableOrders[0].id}`}
                className="text-forest font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>Open Live Order Timeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="mb-8 flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
          {['all', 'starters', 'indian', 'pizza', 'pasta', 'chinese', 'south-indian', 'beverages', 'desserts'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition border ${
                activeCategory === cat
                  ? 'bg-forest text-cream border-forest shadow-soft'
                  : 'bg-white text-brandText border-pastel hover:bg-pastel/40'
              }`}
            >
              {cat === 'all' ? 'All Delicacies' : cat.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Menu Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayDishes.map((dish) => (
            <FoodCard
              key={dish.id}
              dish={dish}
              onOpenDetail={(d) => setSelectedDish(d)}
            />
          ))}
        </div>

      </div>

      {/* Floating Waiter Request Button */}
      <FloatingWaiterButton tableId={tableId} />

      {/* Food Detail Modal */}
      <FoodDetailModal
        dish={selectedDish}
        isOpen={!!selectedDish}
        onClose={() => setSelectedDish(null)}
      />

      {/* Call Waiter Modal */}
      <CallWaiterModal
        tableId={tableId}
        isOpen={isWaiterModalOpen}
        onClose={() => setIsWaiterModalOpen(false)}
      />
    </div>
  );
}
