import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus, Star, Clock, Flame, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function FoodCard({ dish, onOpenDetail }) {
  const { addToCart, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [justAdded, setJustAdded] = useState(false);

  const inWish = isInWishlist(dish.id);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    if (!dish.isAvailable) return;
    addToCart(dish, 1);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1200);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={() => onOpenDetail(dish)}
      className="glass-card rounded-3xl overflow-hidden flex flex-col group cursor-pointer border border-pastel/70 hover:border-gold/50 transition-all duration-300 hover:shadow-soft-lg relative"
    >
      {/* Image Container with Badges */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-pastel/20">
        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {/* Veg / Non-Veg Indicator */}
          <span
            className={`w-5 h-5 rounded-md flex items-center justify-center border bg-white/95 shadow-sm ${
              dish.isVeg ? 'border-green-600' : 'border-red-600'
            }`}
            title={dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                dish.isVeg ? 'bg-green-600' : 'bg-red-600'
              }`}
            />
          </span>

          {dish.isBestseller && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold text-forest-dark uppercase tracking-wider shadow-sm">
              Bestseller
            </span>
          )}

          {dish.isJain && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-800 text-cream uppercase shadow-sm">
              Jain
            </span>
          )}
        </div>

        {/* Wishlist Heart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(dish.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-forest hover:bg-white hover:scale-110 transition shadow-sm"
          title={inWish ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart
            className={`w-4 h-4 transition ${
              inWish ? 'fill-red-500 text-red-500' : 'text-forest'
            }`}
          />
        </button>

        {/* Prep Time pill on bottom of image */}
        <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[11px] text-cream flex items-center gap-1 font-medium">
          <Clock className="w-3 h-3 text-gold" />
          {dish.prepTime}
        </div>

        {/* Out of Stock Overlay */}
        {!dish.isAvailable && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <span className="px-3 py-1 rounded-full bg-red-600 text-white font-bold text-xs uppercase tracking-wider">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating and Spice */}
          <div className="flex items-center justify-between text-xs mb-1">
            <div className="flex items-center gap-1 text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-md">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{dish.rating}</span>
              <span className="text-brandText-light font-normal">({dish.reviewsCount})</span>
            </div>

            {dish.spicyLevel > 0 && (
              <div className="flex items-center gap-0.5" title={`Spiciness: Level ${dish.spicyLevel} of 3`}>
                {[...Array(dish.spicyLevel)].map((_, i) => (
                  <Flame key={i} className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                ))}
              </div>
            )}
          </div>

          {/* Dish Title */}
          <h3 className="font-playfair text-lg font-bold text-brandText group-hover:text-forest transition line-clamp-1">
            {dish.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-brandText-muted line-clamp-2 mt-1 leading-relaxed">
            {dish.description}
          </p>
        </div>

        {/* Footer: Price + Add Button */}
        <div className="flex items-center justify-between pt-2 border-t border-pastel/40">
          <div>
            <span className="text-[10px] text-brandText-light uppercase font-semibold block">
              Price
            </span>
            <span className="font-dmsans text-lg font-bold text-forest">
              ₹{dish.price}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={!dish.isAvailable}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all duration-200 ${
              justAdded
                ? 'bg-emerald-700 text-cream'
                : !dish.isAvailable
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-forest text-cream hover:bg-forest-dark hover:shadow-forest-glow active:scale-95'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added!
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-gold" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
