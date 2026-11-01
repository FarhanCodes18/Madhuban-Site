import React, { useState } from 'react';
import {
  Calculator,
  Search,
  Plus,
  Minus,
  Trash2,
  Printer,
  CreditCard,
  Banknote,
  QrCode,
  Sparkles,
  UtensilsCrossed,
  Receipt,
  CheckCircle2
} from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';
import { categories } from '../data/categories';
import GstInvoiceModal from '../components/admin/GstInvoiceModal';

export default function PosTerminal() {
  const { dishes, tables, placeOrder } = useDemoRestaurant();
  const [selectedCat, setSelectedCat] = useState('all');
  const [search, setSearch] = useState('');
  const [activeTable, setActiveTable] = useState('02');
  const [orderType, setOrderType] = useState('Dine-In');
  const [posItems, setPosItems] = useState([
    { id: 'mb-01', name: 'Madhuban Royal Paneer Makhani', price: 460, quantity: 2 },
    { id: 'mb-03', name: 'Subz Dum Handi Biryani', price: 440, quantity: 1 }
  ]);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [paymentMode, setPaymentMode] = useState('UPI');
  const [completedOrderForInvoice, setCompletedOrderForInvoice] = useState(null);

  const filteredDishes = dishes.filter(d => {
    if (selectedCat !== 'all' && d.category !== selectedCat) return false;
    if (search.trim() !== '') {
      return d.name.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });

  const addItem = (dish) => {
    setPosItems(prev => {
      const idx = prev.findIndex(i => i.id === dish.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...prev, { id: dish.id, name: dish.name, price: dish.price, quantity: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setPosItems(prev => {
      return prev
        .map(i => i.id === id ? { ...i, quantity: i.quantity + delta } : i)
        .filter(i => i.quantity > 0);
    });
  };

  const subtotal = posItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const discount = Math.round((subtotal * discountPercent) / 100);
  const tax = Math.round(subtotal * 0.05);
  const grandTotal = Math.max(0, subtotal + tax - discount);

  const handleSettleOrder = () => {
    if (posItems.length === 0) return;

    const newOrder = placeOrder({
      items: posItems,
      subtotal,
      tax,
      discount,
      total: grandTotal,
      tableId: orderType === 'Dine-In' ? activeTable : 'Takeaway',
      tableName: orderType === 'Dine-In' ? `Table ${activeTable}` : 'Takeaway Counter',
      orderType,
      paymentMethod: paymentMode,
      notes: 'Settled via Admin POS Terminal'
    });

    setCompletedOrderForInvoice(newOrder);
    setPosItems([]);
    setDiscountPercent(0);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-brandText flex items-center gap-2">
            <Calculator className="w-7 h-7 text-forest" />
            <span>Smart POS Counter Terminal</span>
          </h1>
          <p className="text-xs text-brandText-muted mt-1">
            Express floor order placement, table settlement, and instantaneous GST invoice billing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['Dine-In', 'Takeaway', 'Delivery'].map(type => (
            <button
              key={type}
              onClick={() => setOrderType(type)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition border ${
                orderType === type
                  ? 'bg-forest text-cream border-forest shadow-soft'
                  : 'bg-white text-brandText border-pastel hover:bg-pastel/40'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Quick Dish Selector (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Categories & Search */}
          <div className="p-4 rounded-3xl bg-white border border-pastel shadow-soft-sm space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-forest absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Quick search dishes (e.g. Paneer, Pizza, Dosa)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCat(c.slug)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition border ${
                    selectedCat === c.slug
                      ? 'bg-forest text-cream border-forest'
                      : 'bg-bgLight text-brandText border-pastel hover:bg-pastel/40'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Dishes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[620px] overflow-y-auto p-1">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => addItem(dish)}
                className="p-3 rounded-2xl bg-white border border-pastel hover:border-gold/60 shadow-soft-sm cursor-pointer transition flex flex-col justify-between group active:scale-95"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`w-3 h-3 rounded-full border flex items-center justify-center ${dish.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${dish.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                    </span>
                    <span className="text-[10px] text-brandText-muted capitalize">{dish.category}</span>
                  </div>
                  <h4 className="font-playfair font-bold text-xs text-brandText group-hover:text-forest line-clamp-1">
                    {dish.name}
                  </h4>
                </div>

                <div className="flex items-center justify-between pt-2 mt-2 border-t border-pastel/40">
                  <span className="font-dmsans font-bold text-forest text-xs">₹{dish.price}</span>
                  <span className="w-5 h-5 rounded-lg bg-pastel flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-cream transition">
                    <Plus className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right: Active POS Ticket & Settlement (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-pastel shadow-soft space-y-5">
          
          {/* Ticket Header & Table Choice */}
          <div className="flex items-center justify-between border-b border-pastel pb-3">
            <div>
              <h3 className="font-playfair font-bold text-lg text-brandText">
                Active POS Ticket
              </h3>
              <p className="text-[11px] text-brandText-muted">Terminal #01 • Cashier Counter</p>
            </div>

            {orderType === 'Dine-In' ? (
              <select
                value={activeTable}
                onChange={(e) => setActiveTable(e.target.value)}
                className="text-xs p-2 rounded-xl border border-pastel bg-bgLight font-bold text-forest"
              >
                {tables.map(t => (
                  <option key={t.id} value={t.id}>Table {t.id} ({t.section.split(' ')[0]})</option>
                ))}
              </select>
            ) : (
              <span className="text-xs font-bold text-forest bg-pastel px-3 py-1 rounded-full">
                {orderType} Counter
              </span>
            )}
          </div>

          {/* Ticket Items */}
          <div className="space-y-2.5 max-h-56 overflow-y-auto divide-y divide-pastel/40">
            {posItems.length === 0 ? (
              <p className="text-xs text-center py-8 text-brandText-muted">
                Tap any dish on the left to add items to this POS ticket.
              </p>
            ) : (
              posItems.map((item) => (
                <div key={item.id} className="pt-2 flex items-center justify-between text-xs">
                  <div>
                    <h5 className="font-playfair font-bold text-brandText">{item.name}</h5>
                    <span className="text-[11px] text-brandText-muted">₹{item.price} each</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.id, -1)} className="p-1 rounded bg-bgLight hover:bg-pastel">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-4 text-center font-bold">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="p-1 rounded bg-bgLight hover:bg-pastel">
                      <Plus className="w-3 h-3" />
                    </button>
                    <span className="font-dmsans font-bold text-forest w-14 text-right">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick Discounts */}
          <div className="space-y-1.5 pt-2 border-t border-pastel">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brandText-muted block">
              Manager Discount
            </span>
            <div className="grid grid-cols-4 gap-1.5 text-xs font-bold">
              {[0, 5, 10, 15].map(d => (
                <button
                  key={d}
                  onClick={() => setDiscountPercent(d)}
                  className={`py-1.5 rounded-lg border transition ${
                    discountPercent === d ? 'bg-forest text-cream border-forest' : 'bg-bgLight text-brandText border-pastel'
                  }`}
                >
                  {d === 0 ? 'None' : `${d}%`}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Mode Selection */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brandText-muted block">
              Tender Payment Mode
            </span>
            <div className="grid grid-cols-4 gap-1.5 text-xs font-bold">
              {['UPI', 'Card', 'Cash', 'Split'].map(m => (
                <button
                  key={m}
                  onClick={() => setPaymentMode(m)}
                  className={`py-2 rounded-xl border text-center transition ${
                    paymentMode === m ? 'bg-forest text-cream border-forest' : 'bg-bgLight text-brandText border-pastel'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Ticket Calculations */}
          <div className="p-4 rounded-2xl bg-cream border border-pastel space-y-1.5 text-xs">
            <div className="flex justify-between text-brandText-muted">
              <span>Items Subtotal</span>
              <span className="font-dmsans">₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-forest font-semibold">
                <span>Discount ({discountPercent}%)</span>
                <span className="font-dmsans">-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between text-brandText-muted">
              <span>GST (5%)</span>
              <span className="font-dmsans">₹{tax}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-forest pt-2 border-t border-pastel">
              <span>Total Bill</span>
              <span className="font-dmsans text-xl">₹{grandTotal}</span>
            </div>
          </div>

          {/* Settle & Generate Bill Button */}
          <button
            onClick={handleSettleOrder}
            disabled={posItems.length === 0}
            className="w-full py-4 rounded-2xl bg-forest hover:bg-forest-dark text-cream font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-forest-glow transition disabled:opacity-40"
          >
            <Receipt className="w-4 h-4 text-gold" />
            <span>Settle & Print GST Invoice • ₹{grandTotal}</span>
          </button>
        </div>

      </div>

      {/* GST Invoice Modal */}
      <GstInvoiceModal
        order={completedOrderForInvoice}
        isOpen={!!completedOrderForInvoice}
        onClose={() => setCompletedOrderForInvoice(null)}
      />

    </div>
  );
}
