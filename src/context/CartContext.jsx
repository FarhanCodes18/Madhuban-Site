import React, { createContext, useContext, useState, useEffect } from 'react';
import { offersData } from '../data/offers';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('madhuban_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('madhuban_coupon_v1');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [activeTableId, setActiveTableId] = useState(() => {
    try {
      return localStorage.getItem('madhuban_active_table') || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem('madhuban_cart_v1', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('madhuban_coupon_v1', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('madhuban_coupon_v1');
    }
  }, [appliedCoupon]);

  useEffect(() => {
    if (activeTableId) {
      localStorage.setItem('madhuban_active_table', activeTableId);
    } else {
      localStorage.removeItem('madhuban_active_table');
    }
  }, [activeTableId]);

  // Calculate pricing
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST

  // Compute discount based on coupon
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.flatDiscount) {
      discount = appliedCoupon.flatDiscount;
    } else if (appliedCoupon.discountPercentage) {
      const calculated = Math.round((subtotal * appliedCoupon.discountPercentage) / 100);
      discount = appliedCoupon.maxDiscount ? Math.min(calculated, appliedCoupon.maxDiscount) : calculated;
    }
  }

  // Ensure discount does not exceed subtotal
  discount = Math.min(discount, subtotal);
  const grandTotal = Math.max(0, subtotal + tax - discount);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = (dish, quantity = 1, customizations = {}) => {
    setCartItems(prev => {
      // Find if an identical item + customization already exists
      const customKey = JSON.stringify(customizations || {});
      const existingIndex = prev.findIndex(
        i => i.id === dish.id && JSON.stringify(i.customizations || {}) === customKey
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }

      return [
        ...prev,
        {
          id: dish.id,
          name: dish.name,
          price: dish.price,
          image: dish.image,
          isVeg: dish.isVeg,
          category: dish.category,
          quantity,
          customizations,
          uniqueKey: `${dish.id}-${Date.now()}`
        }
      ];
    });
  };

  const removeFromCart = (uniqueKey) => {
    setCartItems(prev => prev.filter(item => item.uniqueKey !== uniqueKey && item.id !== uniqueKey));
  };

  const updateQuantity = (uniqueKey, newQty) => {
    if (newQty <= 0) {
      removeFromCart(uniqueKey);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        (item.uniqueKey === uniqueKey || item.id === uniqueKey)
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    setSpecialInstructions('');
  };

  const applyCouponCode = (code) => {
    const clean = code.trim().toUpperCase();
    const found = offersData.find(o => o.code === clean);
    if (!found) {
      return { success: false, message: 'Invalid promo code. Try WELCOME50 or FAMILY25.' };
    }
    if (found.minOrder && subtotal < found.minOrder) {
      return { success: false, message: `Minimum cart value of ₹${found.minOrder} required for ${found.code}.` };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Coupon "${found.code}" applied successfully! You saved ₹${found.flatDiscount || ((subtotal * found.discountPercentage) / 100)}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemsCount,
        subtotal,
        tax,
        discount,
        grandTotal,
        appliedCoupon,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen(v => !v),
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCouponCode,
        removeCoupon,
        specialInstructions,
        setSpecialInstructions,
        activeTableId,
        setActiveTableId
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
