import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  ChefHat,
  UtensilsCrossed,
  Sparkles,
  ArrowLeft,
  Flame,
  Check,
  Receipt
} from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';

export default function OrderTracking() {
  const { orderId } = useParams();
  const { orders, updateOrderStatus } = useDemoRestaurant();

  // Pick target order or fallback to the most recent one
  const currentOrder = orders.find(o => o.id === orderId) || orders[0];

  const statusSteps = [
    { key: 'placed', label: 'Order Placed', desc: 'Sent to Madhuban kitchen', icon: Receipt },
    { key: 'accepted', label: 'Order Accepted', desc: 'Captain verified order details', icon: CheckCircle2 },
    { key: 'preparing', label: 'Crafting & Cooking', desc: 'Chef preparing fresh courses', icon: ChefHat },
    { key: 'ready', label: 'Ready to Serve', desc: 'Piping hot at plating station', icon: Flame },
    { key: 'served', label: 'Served to Table', desc: 'Enjoy your meal!', icon: UtensilsCrossed },
  ];

  const getStepIndex = (status) => {
    switch (status) {
      case 'placed': return 0;
      case 'accepted': return 1;
      case 'preparing': return 2;
      case 'ready': return 3;
      case 'served': return 4;
      default: return 0;
    }
  };

  const currentStepIdx = getStepIndex(currentOrder?.status || 'placed');

  const advanceDemoStatus = () => {
    if (!currentOrder) return;
    const nextStatuses = ['placed', 'accepted', 'preparing', 'ready', 'served'];
    const nextIdx = (currentStepIdx + 1) % nextStatuses.length;
    updateOrderStatus(currentOrder.id, nextStatuses[nextIdx]);
  };

  if (!currentOrder) {
    return (
      <div className="min-h-screen pt-36 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-playfair text-2xl font-bold text-brandText">Order Not Found</h2>
        <p className="text-sm text-brandText-muted mt-2">No active order was found with that identifier.</p>
        <Link to="/menu" className="mt-4 px-6 py-2.5 rounded-full bg-forest text-cream text-xs font-semibold">
          Return to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 bg-bgLight">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation back */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to={currentOrder.tableId !== 'Takeaway' ? `/table/${currentOrder.tableId}` : '/menu'}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to {currentOrder.tableId !== 'Takeaway' ? `Table ${currentOrder.tableId}` : 'Menu'}</span>
          </Link>

          {/* Demo Advance Status Pill */}
          <button
            onClick={advanceDemoStatus}
            className="px-3.5 py-1.5 rounded-full bg-gold hover:bg-gold-light text-forest-dark font-dmsans text-xs font-bold shadow-soft flex items-center gap-1.5 transition"
            title="Simulate kitchen progress for demo"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Demo: Advance Kitchen Step</span>
          </button>
        </div>

        {/* Order Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-forest text-cream shadow-forest-glow mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[10px] text-gold uppercase tracking-[0.25em] font-bold block">
              Live Kitchen Tracker
            </span>
            <h1 className="font-playfair text-2xl sm:text-3xl font-bold">
              Order #{currentOrder.id}
            </h1>
            <p className="text-xs text-sage">
              Placed on {new Date(currentOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {currentOrder.orderType}
            </p>
          </div>

          <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-forest-light sm:pl-6 pt-4 sm:pt-0">
            <div className="w-12 h-12 rounded-2xl bg-cream text-forest flex items-center justify-center font-bold text-xl shadow-soft font-playfair">
              {currentOrder.tableId !== 'Takeaway' ? currentOrder.tableId : 'TK'}
            </div>
            <div>
              <p className="text-xs font-bold text-cream">{currentOrder.tableName}</p>
              <p className="text-[11px] text-gold font-medium mt-0.5">{currentOrder.estimatedTime}</p>
            </div>
          </div>
        </div>

        {/* Order Status Progress Timeline */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-pastel shadow-soft mb-8">
          <h3 className="font-playfair text-lg font-bold text-brandText mb-8">
            Culinary Preparation Timeline
          </h3>

          <div className="relative">
            {/* Connecting Track */}
            <div className="hidden sm:block absolute top-6 left-8 right-8 h-[3px] bg-pastel/70 -z-0">
              <div
                className="h-full bg-forest transition-all duration-700 ease-out"
                style={{ width: `${(currentStepIdx / (statusSteps.length - 1)) * 100}%` }}
              />
            </div>

            {/* Steps Container */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2 relative z-10">
              {statusSteps.map((step, idx) => {
                const isCompleted = idx < currentStepIdx;
                const isCurrent = idx === currentStepIdx;
                const IconComp = step.icon;

                return (
                  <div key={step.key} className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-2">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 shadow-sm shrink-0 ${
                        isCurrent
                          ? 'bg-forest text-gold border-gold scale-110 shadow-forest-glow'
                          : isCompleted
                          ? 'bg-forest text-cream border-forest'
                          : 'bg-white text-brandText-light border-pastel'
                      }`}
                    >
                      {isCompleted ? <Check className="w-5 h-5" /> : <IconComp className="w-5 h-5" />}
                    </div>

                    <div className="text-left sm:text-center">
                      <p className={`text-xs font-bold leading-tight ${
                        isCurrent ? 'text-forest font-playfair font-extrabold text-sm' : isCompleted ? 'text-brandText' : 'text-brandText-light'
                      }`}>
                        {step.label}
                      </p>
                      <p className="text-[10px] text-brandText-muted mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Details & Summary Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-cream border border-pastel shadow-soft space-y-6">
          <div className="flex items-center justify-between border-b border-pastel pb-4">
            <h3 className="font-playfair text-lg font-bold text-brandText">
              Dishes in This Order ({currentOrder.items.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>
            {currentOrder.couponCode && (
              <span className="text-xs font-bold text-forest bg-pastel px-3 py-1 rounded-full">
                Coupon: {currentOrder.couponCode}
              </span>
            )}
          </div>

          <div className="divide-y divide-pastel/50">
            {currentOrder.items.map((item, i) => (
              <div key={i} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-forest text-xs bg-white px-2 py-0.5 rounded-md border border-pastel">
                      {item.quantity}x
                    </span>
                    <h4 className="font-playfair font-semibold text-brandText text-sm">
                      {item.name}
                    </h4>
                  </div>
                  {item.customizations && (
                    <p className="text-[11px] text-brandText-muted ml-8 mt-0.5">
                      {typeof item.customizations === 'string'
                        ? item.customizations
                        : Object.entries(item.customizations).map(([k, v]) => `${k}: ${v}`).join(' • ')}
                    </p>
                  )}
                </div>

                <span className="font-dmsans font-bold text-forest text-sm">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="pt-4 border-t border-pastel space-y-2 text-xs">
            <div className="flex justify-between text-brandText-muted">
              <span>Items Subtotal</span>
              <span className="font-dmsans">₹{currentOrder.subtotal}</span>
            </div>
            <div className="flex justify-between text-brandText-muted">
              <span>Restaurant GST (5%)</span>
              <span className="font-dmsans">₹{currentOrder.tax}</span>
            </div>
            {currentOrder.discount > 0 && (
              <div className="flex justify-between text-forest font-semibold">
                <span>Promotional Savings</span>
                <span className="font-dmsans">-₹{currentOrder.discount}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-brandText pt-3 border-t border-pastel/70">
              <span>Total Paid / Payable</span>
              <span className="font-dmsans text-forest text-xl">₹{currentOrder.total}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
