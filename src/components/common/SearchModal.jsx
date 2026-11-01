import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, Plus, Check } from 'lucide-react';
import { useDemoRestaurant } from '../../context/DemoRestaurantContext';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function SearchModal({ isOpen, onClose, onSelectDish }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { dishes } = useDemoRestaurant();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSearchTerm('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredDishes = searchTerm.trim() === ''
    ? dishes.filter(d => d.isBestseller).slice(0, 5)
    : dishes.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.category.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-forest-dark/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-cream rounded-3xl shadow-forest-glow border border-pastel/60 overflow-hidden z-10"
        >
          {/* Header Input */}
          <div className="p-5 border-b border-pastel flex items-center gap-3">
            <Search className="w-5 h-5 text-forest shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search dishes, drinks, ingredients (e.g. Paneer, Pizza, Saffron)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-brandText placeholder-brandText-light focus:outline-none text-base sm:text-lg font-medium"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="p-1 rounded-full text-brandText-light hover:text-forest transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-pastel/40 text-brandText transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Filter Tags */}
          <div className="px-5 py-3 bg-pastel/20 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-medium text-brandText-muted">
            <span className="shrink-0 text-forest font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-gold" /> Trending:
            </span>
            {['Paneer Makhani', 'Wood-Fired Pizza', 'Tres Leches', 'Biryani', 'Dosa', 'Truffle'].map(tag => (
              <button
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="px-2.5 py-1 rounded-full bg-cream hover:bg-pastel transition border border-pastel text-forest shrink-0"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-pastel/40">
            {filteredDishes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-brandText-muted">No dishes matched "{searchTerm}".</p>
                <button
                  onClick={() => {
                    navigate('/menu');
                    onClose();
                  }}
                  className="mt-3 text-sm text-forest font-semibold underline underline-offset-4"
                >
                  Browse Full Menu
                </button>
              </div>
            ) : (
              filteredDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="py-3 px-3 rounded-2xl flex items-center justify-between gap-4 hover:bg-pastel/30 transition group cursor-pointer"
                  onClick={() => {
                    if (onSelectDish) onSelectDish(dish);
                    else {
                      navigate('/menu');
                      onClose();
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-14 h-14 rounded-xl object-cover border border-pastel/80"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full border flex items-center justify-center ${dish.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${dish.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                        </span>
                        <h4 className="font-playfair font-semibold text-brandText group-hover:text-forest transition">
                          {dish.name}
                        </h4>
                        {dish.isBestseller && (
                          <span className="text-[10px] bg-gold/20 text-gold-dark font-medium px-1.5 py-0.5 rounded-md">
                            Bestseller
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-brandText-muted line-clamp-1 max-w-sm mt-0.5">
                        {dish.description}
                      </p>
                      <span className="text-sm font-bold text-forest font-dmsans">
                        ₹{dish.price}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(dish, 1);
                    }}
                    className="p-2 rounded-xl bg-forest text-cream hover:bg-forest-dark transition flex items-center gap-1.5 text-xs font-medium shrink-0"
                    title="Add to Cart"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer note */}
          <div className="p-3 bg-pastel/10 border-t border-pastel/40 text-center text-xs text-brandText-muted flex items-center justify-center gap-2">
            <span>Press <kbd className="px-1.5 py-0.5 bg-cream rounded border border-pastel text-[10px]">Esc</kbd> to close</span>
            <span>•</span>
            <button
              onClick={() => {
                navigate('/menu');
                onClose();
              }}
              className="text-forest font-semibold hover:underline"
            >
              View all 24+ dishes
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
