import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  UtensilsCrossed,
  Tag,
  ShieldCheck,
  CheckCircle2,
  Divide,
  Users
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';
import SplitBillModal from '../components/cart/SplitBillModal';
import confetti from 'canvas-confetti';

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    tax,
    discount,
    grandTotal,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    specialInstructions,
    setSpecialInstructions,
    activeTableId
  } = useCart();

  const { placeOrder, currentUser } = useDemoRestaurant();
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState({ text: '', isError: false });
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleApply = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCouponCode(couponCode);
    setCouponMsg({ text: res.message, isError: !res.success });
    if (res.success) setCouponCode('');
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setIsOrdering(true);

    setTimeout(() => {
      const newOrder = placeOrder({
        items: cartItems,
        subtotal,
        tax,
        discount,
        total: grandTotal,
        tableId: activeTableId || 'Takeaway',
        tableName: activeTableId ? `Table ${activeTableId}` : 'Takeaway Counter',
        notes: specialInstructions,
        orderType: activeTableId ? 'Dine-In (QR Table)' : 'Online Order'
      });

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      clearCart();
      setIsOrdering(false);
      navigate(`/order-tracking/${newOrder.id}`);
    }, 700);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-36 pb-24 bg-bgLight flex items-center justify-center px-4">
        <div className="text-center max-w-md p-8 bg-cream rounded-3xl border border-pastel shadow-soft space-y-5">
          <div className="w-20 h-20 rounded-full bg-pastel mx-auto flex items-center justify-center text-forest">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="font-playfair text-2xl font-bold text-brandText">Your Feast Cart is Empty</h2>
          <p className="text-xs text-brandText-muted leading-relaxed">
            Discover our wood-fired pizzas, royal simmered curries, and handcrafted desserts made with pure ingredients.
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-forest text-cream font-bold text-xs hover:bg-forest-dark transition shadow-soft"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4 text-gold" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 bg-bgLight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-gold uppercase tracking-[0.25em] block">
              Cart Review
            </span>
            <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-brandText">
              Your Culinary Selection
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {activeTableId && (
              <span className="px-3.5 py-1.5 rounded-full bg-pastel text-forest text-xs font-bold flex items-center gap-1.5 border border-forest/20">
                <UtensilsCrossed className="w-3.5 h-3.5 text-gold-dark" />
                Ordering for Table {activeTableId}
              </span>
            )}
            <button
              onClick={clearCart}
              className="text-xs text-red-600 hover:underline flex items-center gap-1 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" /> Empty Cart
            </button>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Items List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.uniqueKey || item.id}
                className="p-4 sm:p-5 rounded-3xl bg-white border border-pastel shadow-soft-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-pastel"
                  />
                  <div>
                    <h3 className="font-playfair font-bold text-brandText text-base">
                      {item.name}
                    </h3>
                    <p className="text-xs text-forest font-bold font-dmsans mt-0.5">
                      ₹{item.price} each
                    </p>

                    {item.customizations && Object.keys(item.customizations).length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {Object.entries(item.customizations).map(([k, v]) => (
                          <span
                            key={k}
                            className="text-[10px] bg-pastel/40 text-forest font-medium px-2 py-0.5 rounded-md"
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-pastel/40">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-pastel rounded-xl bg-bgLight p-1 gap-2">
                    <button
                      onClick={() => updateQuantity(item.uniqueKey || item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-brandText hover:bg-pastel"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-bold text-forest text-xs">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.uniqueKey || item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-brandText hover:bg-pastel"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <span className="font-dmsans font-bold text-brandText text-base">
                    ₹{item.price * item.quantity}
                  </span>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.uniqueKey || item.id)}
                    className="text-brandText-light hover:text-red-600 transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Chef Cooking Notes Box */}
            <div className="p-5 rounded-3xl bg-cream border border-pastel space-y-2">
              <label className="text-xs font-bold text-brandText uppercase tracking-wider block">
                Special Dietary Requests or Cooking Notes for Kitchen
              </label>
              <textarea
                rows={2}
                placeholder="Mention allergies, spice preferences, or special plating notes..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full text-xs p-3 rounded-2xl bg-white border border-pastel focus:outline-none focus:border-forest text-brandText resize-none"
              />
            </div>
          </div>

          {/* Order Summary & Payment (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Promo Code Box */}
            <div className="p-5 rounded-3xl bg-white border border-pastel shadow-soft-sm space-y-3">
              <h3 className="font-playfair text-base font-bold text-brandText flex items-center gap-2">
                <Tag className="w-4 h-4 text-gold-dark" />
                Apply Coupon Offer
              </h3>

              {appliedCoupon ? (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between text-xs text-emerald-900">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="font-bold uppercase tracking-wider">{appliedCoupon.code}</p>
                      <p className="text-[11px] text-emerald-700">₹{discount} discount applied</p>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-600 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. WELCOME50, FAMILY25, CHEF50"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        setCouponMsg({ text: '', isError: false });
                      }}
                      className="flex-1 text-xs p-3 rounded-2xl bg-bgLight border border-pastel uppercase font-mono tracking-wider focus:outline-none focus:border-forest"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 rounded-2xl bg-forest hover:bg-forest-dark text-cream font-bold text-xs uppercase tracking-wider transition"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMsg.text && (
                    <p className={`text-[11px] ${couponMsg.isError ? 'text-red-600' : 'text-emerald-700'}`}>
                      {couponMsg.text}
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Bill Summary */}
            <div className="p-6 rounded-3xl bg-cream border border-pastel shadow-soft space-y-4">
              <h3 className="font-playfair text-lg font-bold text-brandText border-b border-pastel pb-3">
                Bill Summary
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-brandText-muted">
                  <span>Subtotal ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                  <span className="font-dmsans font-semibold text-brandText">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-brandText-muted">
                  <span>Restaurant GST (5%)</span>
                  <span className="font-dmsans font-semibold text-brandText">₹{tax}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-forest font-bold">
                    <span>Discount Savings</span>
                    <span className="font-dmsans">-₹{discount}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-pastel/70 flex justify-between text-base font-bold text-brandText">
                  <span>Total Amount</span>
                  <span className="font-dmsans text-2xl text-forest">₹{grandTotal}</span>
                </div>
              </div>

              {/* Split Bill Button */}
              <button
                type="button"
                onClick={() => setIsSplitModalOpen(true)}
                className="w-full py-3 px-4 rounded-2xl bg-white border border-forest/30 text-forest hover:bg-pastel/40 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
              >
                <Divide className="w-4 h-4 text-gold-dark" />
                <span>Split Bill With Friends</span>
              </button>

              {/* Order Confirmation button */}
              <button
                onClick={handleCheckout}
                disabled={isOrdering}
                className="w-full py-4 px-6 rounded-2xl bg-forest hover:bg-forest-dark text-cream font-dmsans font-bold text-sm uppercase tracking-wider shadow-forest-glow flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                {isOrdering ? (
                  <span>Sending Order to Kitchen...</span>
                ) : (
                  <>
                    <span>Place Order • ₹{grandTotal}</span>
                    <ArrowRight className="w-4 h-4 text-gold" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-brandText-muted flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-forest" />
                Phase 1 Demo • Instant kitchen dispatch simulation
              </p>
            </div>

          </div>

        </div>

      </div>

      <SplitBillModal
        isOpen={isSplitModalOpen}
        onClose={() => setIsSplitModalOpen(false)}
        totalAmount={grandTotal}
      />
    </div>
  );
}
