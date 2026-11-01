import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  Flame,
  Leaf,
  Star,
  Sparkles,
  X,
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import { categories } from '../data/categories';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';
import FoodCard from '../components/menu/FoodCard';
import FoodDetailModal from '../components/menu/FoodDetailModal';

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { dishes } = useDemoRestaurant();

  // Query parameter support
  const categoryParam = searchParams.get('cat') || 'all';
  const dishParam = searchParams.get('dish') || null;

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState('all'); // all, veg, non-veg, jain, bestseller
  const [sortBy, setSortBy] = useState('featured'); // featured, price-low, price-high, rating, time
  const [selectedDish, setSelectedDish] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);

  // Sync category param
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  // Open modal if dish param exists in URL
  useEffect(() => {
    if (dishParam && dishes.length > 0) {
      const found = dishes.find(d => d.id === dishParam);
      if (found) setSelectedDish(found);
    }
  }, [dishParam, dishes]);

  const handleCategorySelect = (slug) => {
    setActiveCategory(slug);
    setSearchParams(slug === 'all' ? {} : { cat: slug });
    setVisibleCount(12);
  };

  // Filter & Sort Logic
  const filteredDishes = useMemo(() => {
    return dishes
      .filter((dish) => {
        // Category filter
        if (activeCategory !== 'all') {
          const matchPrimary = dish.category.toLowerCase() === activeCategory.toLowerCase();
          const matchSecondary = dish.secondaryCategory?.toLowerCase() === activeCategory.toLowerCase();
          if (!matchPrimary && !matchSecondary) return false;
        }

        // Dietary filter
        if (dietFilter === 'veg' && !dish.isVeg) return false;
        if (dietFilter === 'non-veg' && dish.isVeg) return false;
        if (dietFilter === 'jain' && !dish.isJain) return false;
        if (dietFilter === 'bestseller' && !dish.isBestseller) return false;

        // Search query filter
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase();
          const matchName = dish.name.toLowerCase().includes(query);
          const matchDesc = dish.description.toLowerCase().includes(query);
          const matchIngredients = dish.ingredients?.some(i => i.toLowerCase().includes(query));
          if (!matchName && !matchDesc && !matchIngredients) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'bestseller') return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
        return 0; // featured / default
      });
  }, [dishes, activeCategory, dietFilter, searchQuery, sortBy]);

  const resetAllFilters = () => {
    setActiveCategory('all');
    setDietFilter('all');
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  const currentCategoryObj = categories.find(c => c.slug === activeCategory) || categories[0];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-bgLight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel text-forest text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" /> Artisanal Digital Menu
          </span>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-brandText">
            Curated Flavours of Madhuban
          </h1>
          <p className="text-sm text-brandText-muted">
            Crafted with farm-fresh herbs, cold-pressed cold oils, and slow-simmered aromatic broths.
          </p>
        </div>

        {/* Category Horizontal Pills */}
        <div className="mb-8 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-2.5 min-w-max">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.slug)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 border ${
                    isActive
                      ? 'bg-forest text-cream border-forest shadow-forest-glow scale-105'
                      : 'bg-cream text-brandText border-pastel hover:border-gold hover:bg-pastel/30'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-forest-light text-gold' : 'bg-pastel/70 text-forest'
                  }`}>
                    {cat.slug === 'all' ? dishes.length : cat.itemCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-3xl bg-cream border border-pastel shadow-soft-sm mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-forest absolute left-3.5 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search dishes by name, spice, or ingredient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-3 rounded-2xl bg-white border border-pastel focus:outline-none focus:border-forest text-brandText placeholder-brandText-light"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-brandText-light hover:text-forest"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dietary Tags Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
              {[
                { id: 'all', label: 'All Diets' },
                { id: 'veg', label: 'Pure Veg', icon: Leaf },
                { id: 'non-veg', label: 'Non-Veg', icon: Flame },
                { id: 'jain', label: 'Jain Friendly' },
                { id: 'bestseller', label: 'Bestsellers Only', icon: Star },
              ].map((filter) => {
                const isSelected = dietFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setDietFilter(filter.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-forest text-cream border-forest'
                        : 'bg-white text-brandText border-pastel hover:bg-pastel/40'
                    }`}
                  >
                    {filter.icon && <filter.icon className="w-3.5 h-3.5 text-gold" />}
                    <span>{filter.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-brandText-muted shrink-0 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs py-2.5 px-3 rounded-xl bg-white border border-pastel text-brandText focus:outline-none focus:border-forest font-medium cursor-pointer"
              >
                <option value="featured">Featured Chef Selection</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="bestseller">Popularity</option>
              </select>
            </div>

          </div>

          {/* Active Filter Chips summary */}
          {(searchQuery || dietFilter !== 'all' || activeCategory !== 'all') && (
            <div className="flex items-center justify-between pt-2 border-t border-pastel/40 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-brandText-muted">Active Filters:</span>
                {activeCategory !== 'all' && (
                  <span className="px-2 py-0.5 rounded-md bg-forest text-cream font-medium flex items-center gap-1">
                    {currentCategoryObj.name}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => handleCategorySelect('all')} />
                  </span>
                )}
                {dietFilter !== 'all' && (
                  <span className="px-2 py-0.5 rounded-md bg-forest text-cream font-medium flex items-center gap-1">
                    {dietFilter.toUpperCase()}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setDietFilter('all')} />
                  </span>
                )}
                {searchQuery && (
                  <span className="px-2 py-0.5 rounded-md bg-forest text-cream font-medium flex items-center gap-1">
                    "{searchQuery}"
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                  </span>
                )}
              </div>

              <button
                onClick={resetAllFilters}
                className="text-xs text-forest hover:underline font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset All
              </button>
            </div>
          )}
        </div>

        {/* Results Count Banner */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-brandText-muted">
            Displaying <span className="font-bold text-forest">{Math.min(visibleCount, filteredDishes.length)}</span> of{' '}
            <span className="font-bold text-forest">{filteredDishes.length}</span> delicacies
          </p>

          <span className="text-xs text-forest font-semibold italic">
            * All dishes freshly prepared to order
          </span>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="p-16 rounded-3xl bg-cream border border-pastel text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-pastel/50 mx-auto flex items-center justify-center text-forest">
              <SlidersHorizontal className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-playfair text-xl font-bold text-brandText">
                No culinary matches found
              </h3>
              <p className="text-xs text-brandText-muted mt-1 max-w-sm mx-auto">
                We couldn't find any dish matching your current filter selections. Try clearing your filters or exploring another cuisine category.
              </p>
            </div>
            <button
              onClick={resetAllFilters}
              className="px-6 py-2.5 rounded-full bg-forest text-cream text-xs font-bold hover:bg-forest-dark transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDishes.slice(0, visibleCount).map((dish) => (
              <FoodCard
                key={dish.id}
                dish={dish}
                onOpenDetail={(d) => setSelectedDish(d)}
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredDishes.length > visibleCount && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount(c => c + 8)}
              className="px-8 py-3.5 rounded-full bg-cream border border-forest/30 text-forest font-bold text-xs uppercase tracking-wider hover:bg-forest hover:text-cream transition shadow-soft"
            >
              Load More Delicacies ({filteredDishes.length - visibleCount} Remaining)
            </button>
          </div>
        )}

      </div>

      {/* Food Detail Modal */}
      <FoodDetailModal
        dish={selectedDish}
        isOpen={!!selectedDish}
        onClose={() => {
          setSelectedDish(null);
          if (dishParam) {
            setSearchParams(categoryParam !== 'all' ? { cat: categoryParam } : {});
          }
        }}
      />
    </div>
  );
}
