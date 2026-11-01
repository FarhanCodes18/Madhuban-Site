import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  Minus,
  Heart,
  Star,
  Clock,
  Flame,
  ShieldAlert,
  Leaf,
  ShoppingBag,
  Check
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function FoodDetailModal({ dish, isOpen, onClose }) {
  const { addToCart, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState({});
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Sync customizations when dish changes
  React.useEffect(() => {
    if (dish?.customizations) {
      const initial = {};
      dish.customizations.forEach(c => {
        initial[c.name] = c.options[0];
      });
      setSelectedCustomizations(initial);
    } else {
      setSelectedCustomizations({});
    }
    setQuantity(1);
  }, [dish]);

  if (!isOpen || !dish) return null;

  const inWish = isInWishlist(dish.id);

  const handleCustomizationChange = (groupName, optionValue) => {
    setSelectedCustomizations(prev => ({
      ...prev,
      [groupName]: optionValue
    }));
  };

  const handleAddToCart = () => {
    addToCart(dish, quantity, selectedCustomizations);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
      openCart();
    }, 500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-forest-dark/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          className="relative w-full max-w-2xl bg-cream rounded-3xl shadow-2xl border border-pastel overflow-hidden z-10 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-forest-dark/60 text-cream backdrop-blur-md flex items-center justify-center hover:bg-forest-dark transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Dish Image Banner */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-black/30" />

            {/* Badges on image */}
            <div className="absolute bottom-4 left-6 flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-soft ${
                dish.isVeg ? 'bg-emerald-700 text-white' : 'bg-red-700 text-white'
              }`}>
                <span className="w-2 h-2 rounded-full bg-white" />
                {dish.isVeg ? 'Pure Veg' : 'Non-Veg'}
              </span>

              {dish.isJain && (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-cream shadow-soft">
                  Jain Available
                </span>
              )}

              {dish.isBestseller && (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gold text-forest-dark shadow-soft">
                  Chef Bestseller
                </span>
              )}
            </div>

            {/* Wishlist Button floating on image */}
            <button
              onClick={() => toggleWishlist(dish.id)}
              className="absolute top-4 left-4 w-10 h-10 rounded-full bg-cream/90 backdrop-blur-md flex items-center justify-center text-forest hover:scale-110 transition shadow-soft"
              title={inWish ? "Remove from Wishlist" : "Save to Wishlist"}
            >
              <Heart className={`w-5 h-5 ${inWish ? 'fill-red-500 text-red-500' : 'text-forest'}`} />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-288px)] overflow-y-auto">
            {/* Title & Price Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-brandText">
                  {dish.name}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-xs text-brandText-muted">
                  <span className="flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {dish.rating} ({dish.reviewsCount} reviews)
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-forest" />
                    {dish.prepTime}
                  </span>
                  {dish.calories && (
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-gold-dark" />
                      {dish.calories}
                    </span>
                  )}
                </div>
              </div>

              <div className="font-dmsans text-2xl sm:text-3xl font-bold text-forest">
                ₹{dish.price}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-brandText-muted leading-relaxed font-poppins">
              {dish.description}
            </p>

            {/* Ingredients */}
            {dish.ingredients && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-brandText uppercase tracking-wider flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-forest" /> Fresh Ingredients
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {dish.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-lg bg-pastel/40 text-forest font-medium border border-pastel"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Allergens Notice */}
            {dish.allergens && dish.allergens.length > 0 && (
              <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Allergen Notice: </span>
                  Contains {dish.allergens.join(', ')}. Please inform your server if you have severe dietary allergies.
                </div>
              </div>
            )}

            {/* Customizations Selection */}
            {dish.customizations && dish.customizations.length > 0 && (
              <div className="space-y-4 pt-2 border-t border-pastel/60">
                <h4 className="font-playfair text-base font-bold text-brandText">
                  Personalize Your Dish
                </h4>
                {dish.customizations.map((group) => (
                  <div key={group.name} className="space-y-2">
                    <label className="text-xs font-semibold text-brandText-muted uppercase tracking-wider">
                      {group.name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {group.options.map((opt) => {
                        const isSelected = selectedCustomizations[group.name] === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleCustomizationChange(group.name, opt)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                              isSelected
                                ? 'bg-forest text-cream border-forest shadow-soft'
                                : 'bg-white text-brandText border-pastel hover:bg-pastel/30'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Modal Footer (Quantity + Add to Cart) */}
          <div className="p-6 bg-white border-t border-pastel flex items-center justify-between gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center border border-pastel rounded-xl bg-bgLight p-1">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-brandText hover:bg-pastel transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-bold text-forest font-dmsans text-base">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-brandText hover:bg-pastel transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Submit button */}
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-forest-glow transition ${
                addedSuccess
                  ? 'bg-emerald-700 text-cream'
                  : 'bg-forest hover:bg-forest-dark text-cream'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4" /> Added to Feast Cart!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-gold" />
                  Add to Cart • ₹{dish.price * quantity}
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
