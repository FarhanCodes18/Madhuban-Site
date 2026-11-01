import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Heart
} from 'lucide-react';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const galleryItems = [
    {
      id: 1,
      category: 'signature',
      title: 'Royal Paneer Makhani in Brass Kadhai',
      description: 'Slow-cooked Kashmiri silk gravy garnished with churned white butter and micro-herbs.',
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1000&auto=format&fit=crop',
      span: 'md:col-span-2 md:row-span-2'
    },
    {
      id: 2,
      category: 'interior',
      title: 'Botanical Courtyard & Pastel Glasshouse',
      description: 'Sunlit atrium dining surrounded by live fiddle leaf figs, weeping figs, and brass lantern glow.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop',
      span: 'md:col-span-1 md:row-span-1'
    },
    {
      id: 3,
      category: 'specials',
      title: 'Neapolitan Truffle Wood-Fired Sourdough',
      description: 'Charred leopard crust infused with wild forest mushrooms and aromatic white truffle oil.',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop',
      span: 'md:col-span-1 md:row-span-2'
    },
    {
      id: 4,
      category: 'desserts',
      title: 'Golden Saffron Rasmalai Tres Leches',
      description: 'Cardamom sponge drenched in triple saffron milk with pistachio and 24K edible gold foil.',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1000&auto=format&fit=crop',
      span: 'md:col-span-1 md:row-span-1'
    },
    {
      id: 5,
      category: 'beverages',
      title: 'Hibiscus Petal & Lemongrass Infusion',
      description: 'Cold-steeped ruby red cooler with chia seeds and bruised mountain lemongrass.',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1000&auto=format&fit=crop',
      span: 'md:col-span-1 md:row-span-1'
    },
    {
      id: 6,
      category: 'dining',
      title: 'Candlelight Alcove Table 04',
      description: 'Intimate evening seating designed for anniversary dinners and milestone celebrations.',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1000&auto=format&fit=crop',
      span: 'md:col-span-2 md:row-span-1'
    },
    {
      id: 7,
      category: 'signature',
      title: 'Awadhi Handi Dum Biryani with Clay Dough Seal',
      description: 'Long-grain Dehraduni basmati layered with royal spices and pure saffron ghee.',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop',
      span: 'md:col-span-1 md:row-span-1'
    },
    {
      id: 8,
      category: 'interior',
      title: 'Live Herb Sanctuary & Open Plating Station',
      description: 'Where our culinary team plucks fresh rosemary, oregano, and basil right before plating.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop',
      span: 'md:col-span-1 md:row-span-1'
    }
  ];

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextLightbox = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const prevLightbox = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-bgLight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel text-forest text-xs font-semibold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-gold-dark" /> Visual Aesthetics
          </span>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-brandText">
            The Madhuban Atmosphere
          </h1>
          <p className="text-sm text-brandText-muted">
            An editorial look at our botanical architecture, culinary artistry, and celebratory moments.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto no-scrollbar py-2">
          {[
            { id: 'all', label: 'All Photographs' },
            { id: 'signature', label: 'Signature Dishes' },
            { id: 'interior', label: 'Architecture & Atrium' },
            { id: 'dining', label: 'Dining Experience' },
            { id: 'specials', label: 'Chef Specials' },
            { id: 'desserts', label: 'Desserts' },
            { id: 'beverages', label: 'Botanical Coolers' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap border ${
                activeFilter === tab.id
                  ? 'bg-forest text-cream border-forest shadow-soft'
                  : 'bg-white text-brandText border-pastel hover:bg-pastel/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              onClick={() => openLightbox(idx)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-soft bg-pastel/30 ${item.span || 'md:col-span-1 md:row-span-1'}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-cream">
                <span className="text-[10px] font-bold text-gold uppercase tracking-wider block mb-1">
                  {item.category.toUpperCase()}
                </span>
                <h3 className="font-playfair text-lg font-bold">
                  {item.title}
                </h3>
                <p className="text-xs text-sage line-clamp-2 mt-1">
                  {item.description}
                </p>

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-cream">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-[1002] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8">
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-30 w-12 h-12 rounded-full bg-white/10 text-cream hover:bg-white/20 flex items-center justify-center transition"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev button */}
            <button
              onClick={prevLightbox}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 text-cream hover:bg-white/20 flex items-center justify-center transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next button */}
            <button
              onClick={nextLightbox}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 text-cream hover:bg-white/20 flex items-center justify-center transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Content Container */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
            >
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-w-full max-h-[70vh] rounded-3xl object-contain shadow-2xl"
              />

              <div className="text-center mt-4 text-cream max-w-lg space-y-1">
                <h3 className="font-playfair text-xl font-bold">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <p className="text-xs text-sage">
                  {filteredItems[lightboxIndex].description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
