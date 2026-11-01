import React, { createContext, useContext, useState, useEffect } from 'react';
import { menuData } from '../data/menuData';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem('madhuban_wishlist_v1');
      return saved ? JSON.parse(saved) : ['mb-01', 'mb-07', 'mb-21'];
    } catch {
      return ['mb-01', 'mb-07', 'mb-21'];
    }
  });

  useEffect(() => {
    localStorage.setItem('madhuban_wishlist_v1', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const toggleWishlist = (dishId) => {
    setWishlistIds(prev => {
      if (prev.includes(dishId)) {
        return prev.filter(id => id !== dishId);
      } else {
        return [...prev, dishId];
      }
    });
  };

  const isInWishlist = (dishId) => wishlistIds.includes(dishId);

  const clearWishlist = () => setWishlistIds([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistCount: wishlistIds.length,
        toggleWishlist,
        isInWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
