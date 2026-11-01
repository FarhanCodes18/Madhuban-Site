import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, Utensils, Sparkles, ShoppingBag, Divide, Users } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useDemoRestaurant } from '../../context/DemoRestaurantContext';
import { useNavigate } from 'react-router-dom';
import SplitBillModal from './SplitBillModal';
import confetti from 'canvas-confetti';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
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

  const { placeOrder } = useDemoRestaurant();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSplitBillOpen, setIsSplitBillOpen] = useState(false);
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCouponCode(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleQuickCheckout = () => {
    if (cartItems.length === 0) return;
    setIsSubmitting(true);

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
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });

      clearCart();
      setIsSubmitting(false);
      closeCart();

      // Navigate to live tracking for this order!
      navigate(`/order-tracking/${newOrder.id}`);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[1000] overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
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
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center text-forest">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl font-bold text-brandText">
                      Your Feast Cart
                    </h3>
                    {activeTableId ? (
                      <span className="text-xs font-medium text-forest bg-pastel px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        <Utensils className="w-3 h-3" /> Ordering for Table {activeTableId}
                      </span>
                    ) : (
                      <span className="text-xs text-brandText-muted">
                        Freshly prepared upon your confirmation
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={closeCart}
                  className="p-2 rounded-full hover:bg-pastel/50 text-brandText transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List / Empty State */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-24 h-24 rounded-full bg-pastel/40 flex items-center justify-center text-forest/40">
                      <Utensils className="w-12 h-12" />
                    </div>
                    <div>
                      <h4 className="font-playfair text-xl font-semibold text-brandText">
                        Your cart is empty
                      </h4>
                      <p className="text-xs text-brandText-muted mt-1 max-w-xs">
                        Treat your tastebuds to our heirloom curries, wood-fired pizzas, and artisanal desserts.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        closeCart();
                        navigate('/menu');
                      }}
                      className="px-6 py-2.5 rounded-full bg-forest text-cream font-medium text-sm hover:bg-forest-dark transition shadow-soft"
                    >
                      Explore Menu
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between text-xs text-brandText-muted pb-1 border-b border-pastel/40">
                      <span>{cartItems.length} Unique item{cartItems.length > 1 ? 's' : ''}</span>
                      <button
                        onClick={clearCart}
                        className="text-red-600 hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Clear Cart
                      </button>
                    </div>

                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div
                          key={item.uniqueKey || item.id}
                          className="p-3 rounded-2xl bg-white border border-pastel/60 shadow-soft-sm flex gap-3 relative group"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-18 h-18 w-20 h-20 rounded-xl object-cover shrink-0"
                          />
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-1">
                                <h4 className="font-playfair font-semibold text-brandText text-sm leading-tight">
                                  {item.name}
                                </h4>
                                <button
                                  onClick={() => removeFromCart(item.uniqueKey || item.id)}
                                  className="text-brandText-light hover:text-red-500 p-0.5 transition"
                                  title="Remove item"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Customization pills */}
                              {item.customizations && Object.keys(item.customizations).length > 0 && (
                                <div className="mt-1 flex flex-wrap gap-1">
                                  {Object.entries(item.customizations).map(([key, val]) => (
                                    <span
                                      key={key}
                                      className="text-[10px] bg-pastel/40 text-forest px-1.5 py-0.5 rounded-md font-medium"
                                    >
                                      {val}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-pastel/30">
                              <span className="font-dmsans font-bold text-forest text-sm">
                                ₹{item.price * item.quantity}
                              </span>

                              {/* Quantity counter */}
                              <div className="flex items-center border border-pastel rounded-lg bg-bgLight px-1 py-0.5 gap-2 text-xs font-semibold">
                                <button
                                  onClick={() => updateQuantity(item.uniqueKey || item.id, item.quantity - 1)}
                                  className="p-1 hover:text-forest transition"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-4 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.uniqueKey || item.id, item.quantity + 1)}
                                  className="p-1 hover:text-forest transition"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Special Instructions */}
                    <div className="pt-2">
                      <label className="block text-xs font-semibold text-brandText mb-1.5 flex items-center gap-1">
                        <Utensils className="w-3.5 h-3.5 text-forest" />
                        Cooking Note for Chef
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Less oil, extra chutney, allergy note..."
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-pastel bg-white focus:outline-none focus:border-forest"
                      />
                    </div>

                    {/* Coupon Promo Box */}
                    <div className="pt-2">
                      <div className="p-3 rounded-2xl bg-pastel/30 border border-pastel">
                        {appliedCoupon ? (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-gold" />
                              <div>
                                <p className="text-xs font-bold text-forest uppercase tracking-wider">
                                  {appliedCoupon.code} Applied!
                                </p>
                                <p className="text-[11px] text-brandText-muted">
                                  You saved ₹{discount}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={removeCoupon}
                              className="text-xs text-red-600 hover:underline font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                            <label className="text-xs font-semibold text-brandText flex items-center gap-1">
                              <Tag className="w-3.5 h-3.5 text-gold-dark" />
                              Have a Promo Code?
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Try WELCOME50 or FAMILY25"
                                value={couponInput}
                                onChange={(e) => {
                                  setCouponInput(e.target.value);
                                  setCouponError('');
                                }}
                                className="flex-1 text-xs p-2 rounded-lg border border-pastel bg-white uppercase font-mono tracking-wider focus:outline-none focus:border-forest"
                              />
                              <button
                                type="submit"
                                className="px-3 py-1.5 rounded-lg bg-forest text-cream text-xs font-semibold hover:bg-forest-dark transition shrink-0"
                              >
                                Apply
                              </button>
                            </div>
                            {couponError && (
                              <p className="text-[11px] text-red-600">{couponError}</p>
                            )}
                          </form>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {cartItems.length > 0 && (
                <div className="p-5 border-t border-pastel bg-cream space-y-3">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-brandText-muted">
                      <span>Subtotal</span>
                      <span className="font-dmsans">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-brandText-muted">
                      <span>Restaurant GST (5%)</span>
                      <span className="font-dmsans">₹{tax}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-forest font-semibold">
                        <span>Discount Savings</span>
                        <span className="font-dmsans">-₹{discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-bold text-brandText pt-2 border-t border-pastel/60">
                      <span>Total Amount</span>
                      <span className="font-dmsans text-forest text-lg">₹{grandTotal}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => setIsSplitBillOpen(true)}
                      className="py-2.5 px-3 rounded-xl border border-forest/30 text-forest hover:bg-pastel/40 text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition"
                    >
                      <Divide className="w-3.5 h-3.5 text-gold-dark" />
                      <span>Split Bill</span>
                    </button>
                    <button
                      onClick={() => {
                        closeCart();
                        navigate('/cart');
                      }}
                      className="py-2.5 px-3 rounded-xl border border-forest text-forest hover:bg-pastel/40 text-xs font-semibold text-center transition"
                    >
                      Full Details
                    </button>
                  </div>

                  <button
                    onClick={handleQuickCheckout}
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-3 rounded-xl bg-forest hover:bg-forest-dark text-cream text-xs font-bold flex items-center justify-center gap-1.5 shadow-forest-glow transition disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending to Kitchen...</span>
                    ) : (
                      <>
                        <span>Confirm Order • ₹{grandTotal}</span>
                        <ArrowRight className="w-4 h-4 text-gold" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Split Bill Modal */}
          <SplitBillModal
            isOpen={isSplitBillOpen}
            onClose={() => setIsSplitBillOpen(false)}
            totalAmount={grandTotal}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
