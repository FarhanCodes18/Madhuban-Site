import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Leaf,
  Heart,
  Star,
  QrCode,
  Calendar,
  ChevronRight,
  CheckCircle2,
  Quote,
  ChevronLeft,
  Award,
  Users,
  Clock,
  Bike
} from 'lucide-react';
import { categories } from '../data/categories';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';
import { testimonialsData } from '../data/testimonials';
import FoodCard from '../components/menu/FoodCard';
import FoodDetailModal from '../components/menu/FoodDetailModal';

export default function Home() {
  const { dishes } = useDemoRestaurant();
  const [selectedDish, setSelectedDish] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const navigate = useNavigate();

  const bestsellers = dishes.filter(d => d.isBestseller).slice(0, 6);

  const heroFeatures = [
    { title: 'Fresh Ingredients', desc: '100% farm-sourced organic herbs & vegetables' },
    { title: 'Artisanal Quality', desc: 'Slow-simmered gravies & stone-ground spices' },
    { title: 'Hygienic Kitchen', desc: '5-star audited sanitization protocols' },
    { title: 'Family Friendly', desc: 'Spacious serene botanical seating' },
  ];

  const handleNextReview = () => {
    setActiveTestimonial(prev => (prev + 1) % testimonialsData.length);
  };

  const handlePrevReview = () => {
    setActiveTestimonial(prev => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* ========================================================
          1. HERO SECTION (CINEMATIC)
      ======================================================== */}
      <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 lg:py-36 bg-gradient-to-b from-pastel-light/60 via-bgLight to-bgLight overflow-hidden">
        {/* Floating Decorative Botanical Blobs */}
        <div className="absolute top-12 left-10 w-72 h-72 rounded-full bg-pastel/40 blur-3xl pointer-events-none animate-float-slow" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-gold/15 blur-3xl pointer-events-none animate-float-reverse" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column (7 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-pastel shadow-soft-sm text-forest font-semibold text-xs tracking-wider uppercase">
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Fresh Flavours. Beautiful Moments.</span>
              </div>

              {/* Main Heading */}
              <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-brandText leading-[1.12] tracking-tight">
                Where Every Bite Feels Like{' '}
                <span className="text-forest italic underline decoration-gold/50 decoration-wavy underline-offset-8">
                  Home.
                </span>
              </h1>

              {/* Description */}
              <p className="font-poppins text-base sm:text-lg text-brandText-muted max-w-xl leading-relaxed">
                Discover a world of fresh ingredients, delightful flavours and unforgettable dining experiences at{' '}
                <span className="font-semibold text-forest">MADHUBAN</span> — crafted with passion, served with love.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/menu"
                  className="px-8 py-4 rounded-full bg-forest text-cream font-dmsans font-bold text-sm hover:bg-forest-dark hover:shadow-forest-glow transition-all duration-300 flex items-center gap-2 group"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/reservation"
                  className="px-8 py-4 rounded-full bg-white text-forest border border-forest/30 font-dmsans font-semibold text-sm hover:bg-pastel/40 hover:border-forest transition shadow-soft flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-gold-dark" />
                  <span>Reserve a Table</span>
                </Link>

                <Link
                  to="/table/05"
                  className="px-4 py-3.5 rounded-full bg-pastel/70 text-forest text-xs font-bold hover:bg-pastel transition flex items-center gap-2"
                  title="Try Instant QR Table Dining"
                >
                  <QrCode className="w-4 h-4 text-gold-dark" />
                  <span>Scan QR Demo (Table 05)</span>
                </Link>
              </div>

              {/* Four Key Brand Features */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-pastel/70">
                {heroFeatures.map((feat, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="font-playfair text-sm font-bold text-brandText flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest shrink-0" />
                      {feat.title}
                    </p>
                    <p className="text-[11px] text-brandText-muted leading-tight">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Visual Column (5 cols) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
              className="lg:col-span-5 relative flex justify-center"
            >
              {/* Organic Mask Container */}
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 xl:w-[440px] xl:h-[440px]">
                
                {/* Outer Rotating Dotted Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-forest/20 animate-spin-slow pointer-events-none" />

                {/* Circular Image Mask */}
                <div className="w-full h-full rounded-full overflow-hidden p-3 bg-gradient-to-tr from-gold/30 via-pastel to-forest/20 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=900&auto=format&fit=crop"
                    alt="Madhuban Signature Royal Dish"
                    className="w-full h-full object-cover rounded-full shadow-inner"
                  />
                </div>

                {/* Floating Badge 1: Made With Love */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-3 -right-2 bg-white/95 backdrop-blur-md py-2.5 px-4 rounded-2xl shadow-soft-lg border border-pastel flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                    <Heart className="w-4 h-4 fill-red-500" />
                  </div>
                  <div>
                    <span className="text-[10px] text-brandText-light font-bold uppercase tracking-wider block">
                      Heritage Recipe
                    </span>
                    <span className="text-xs font-playfair font-bold text-forest">
                      Made With Love
                    </span>
                  </div>
                </motion.div>

                {/* Floating Badge 2: Mini Food Category Card */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-soft-lg border border-pastel flex items-center gap-3 max-w-[210px]"
                >
                  <img
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200&auto=format&fit=crop"
                    alt="Wood-Fired Pizza"
                    className="w-11 h-11 rounded-xl object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-700">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      4.9 (180+)
                    </div>
                    <span className="text-xs font-playfair font-bold text-brandText block truncate">
                      Wood-Fired Crusts
                    </span>
                    <span className="text-[10px] text-forest font-semibold">
                      Authentic Sourdough
                    </span>
                  </div>
                </motion.div>

                {/* Floating Badge 3: Pure A2 Desi Ghee & Farm Fresh */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-forest text-cream p-3 rounded-2xl shadow-forest-glow hidden sm:flex items-center gap-2"
                >
                  <Leaf className="w-4 h-4 text-gold" />
                  <div className="text-left">
                    <p className="text-[10px] text-pastel uppercase tracking-wider">Purity</p>
                    <p className="text-xs font-bold font-dmsans">100% Pure A2 Ghee</p>
                  </div>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================
          2. FOOD CATEGORIES SECTION
      ======================================================== */}
      <section className="py-20 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-gold uppercase tracking-[0.25em] block mb-1">
                Gastronomic Journey
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-brandText">
                Explore Our Menu
              </h2>
            </div>

            <Link
              to="/menu"
              className="inline-flex items-center gap-1 text-sm font-semibold text-forest hover:text-forest-dark transition group"
            >
              <span>View All 14 Cuisines</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Categories Grid (Scrollable or responsive grid) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.slice(0, 14).map((cat) => (
              <Link
                key={cat.id}
                to={`/menu?cat=${cat.slug}`}
                className="group p-3 rounded-3xl bg-cream border border-pastel/80 hover:border-gold/50 transition-all duration-300 hover:shadow-soft text-center flex flex-col items-center"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 border-2 border-pastel group-hover:border-forest transition-colors shadow-soft-sm">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-playfair font-bold text-brandText text-sm group-hover:text-forest transition">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-brandText-muted mt-0.5">
                  {cat.itemCount} Delicacies
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          3. CHEF'S SIGNATURE BESTSELLERS
      ======================================================== */}
      <section className="py-20 bg-cream/70 border-y border-pastel/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pastel/60 text-forest text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
              Handcrafted Masterpieces
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-brandText">
              Madhuban Signature Dishes
            </h2>
            <p className="text-sm text-brandText-muted">
              Beloved by generations. Slow-simmered, stone-ground, and prepared with authentic family secret recipes.
            </p>
          </div>

          {/* Grid of Dishes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestsellers.map((dish) => (
              <FoodCard
                key={dish.id}
                dish={dish}
                onOpenDetail={(d) => setSelectedDish(d)}
              />
            ))}
          </div>

          {/* View Full Menu CTA */}
          <div className="mt-12 text-center">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-forest text-cream font-bold text-sm hover:bg-forest-dark shadow-forest-glow transition"
            >
              <span>Explore Complete Digital Menu</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================
          4. SMART QR TABLE DINING EXPERIENCE HIGHLIGHT
      ======================================================== */}
      <section className="py-24 bg-forest text-cream relative overflow-hidden">
        {/* Background botanical pattern */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#FFFDF6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-forest-light text-gold text-xs font-bold uppercase tracking-wider border border-gold/30">
                <QrCode className="w-3.5 h-3.5" /> Next-Generation Dining
              </span>

              <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Contactless Table Ordering & Instant Waiter Service
              </h2>

              <p className="text-sage text-base leading-relaxed">
                No waving hands. No waiting for physical menus. Simply sit at your table, scan the organic wooden QR plaque on your table, order seamlessly from your smartphone, and track your food live from kitchen to table.
              </p>

              {/* 3 Step Process */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-forest-light/60 border border-gold/20 space-y-2">
                  <span className="w-7 h-7 rounded-full bg-gold text-forest font-bold text-xs flex items-center justify-center">
                    1
                  </span>
                  <h4 className="font-playfair font-bold text-cream text-sm">
                    Scan Table QR
                  </h4>
                  <p className="text-xs text-sage leading-normal">
                    Instantly unlocks your table's dedicated menu session.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-forest-light/60 border border-gold/20 space-y-2">
                  <span className="w-7 h-7 rounded-full bg-gold text-forest font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  <h4 className="font-playfair font-bold text-cream text-sm">
                    Customize & Order
                  </h4>
                  <p className="text-xs text-sage leading-normal">
                    Select spice levels, Jain options & send straight to the kitchen.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-forest-light/60 border border-gold/20 space-y-2">
                  <span className="w-7 h-7 rounded-full bg-gold text-forest font-bold text-xs flex items-center justify-center">
                    3
                  </span>
                  <h4 className="font-playfair font-bold text-cream text-sm">
                    Call Staff on Demand
                  </h4>
                  <p className="text-xs text-sage leading-normal">
                    Need water or extra plates? One tap notifies floor captains.
                  </p>
                </div>
              </div>

              {/* Demo button */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/table/05"
                  className="px-7 py-3.5 rounded-full bg-gold text-forest-dark font-dmsans font-bold text-sm hover:bg-gold-light transition shadow-gold-glow flex items-center gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Experience Table 05 Interactive Mode</span>
                </Link>

                <Link
                  to="/order-tracking/MB-8921"
                  className="px-6 py-3.5 rounded-full border border-sage text-cream hover:bg-forest-light text-xs font-semibold transition"
                >
                  View Live Order Tracker
                </Link>
              </div>
            </div>

            {/* Right Card Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-3xl bg-cream text-brandText p-6 shadow-2xl border-4 border-gold/30 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-pastel">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-forest text-gold flex items-center justify-center text-xs font-bold">
                      05
                    </div>
                    <div>
                      <h4 className="font-playfair font-bold text-sm">Table 05 • Active Session</h4>
                      <p className="text-[10px] text-forest font-semibold">Garden Courtyard</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Connected
                  </span>
                </div>

                {/* Simulated table bill */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between font-medium">
                    <span>1x Royal Paneer Makhani</span>
                    <span className="font-bold">₹460</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>1x Truffle Wood-Fired Pizza</span>
                    <span className="font-bold">₹560</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>2x Hibiscus Lemongrass Cooler</span>
                    <span className="font-bold">₹480</span>
                  </div>
                  <div className="pt-2 border-t border-pastel flex justify-between font-bold text-forest">
                    <span>Subtotal</span>
                    <span>₹1,500</span>
                  </div>
                </div>

                {/* Simulated service request button */}
                <div className="pt-2">
                  <button
                    onClick={() => navigate('/table/05')}
                    className="w-full py-2.5 rounded-xl bg-forest text-cream font-bold text-xs flex items-center justify-center gap-2 hover:bg-forest-dark transition"
                  >
                    <span>Launch Table Experience</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          4.5 SMART DIGITAL CONCIERGE INNOVATIONS
      ======================================================== */}
      <section className="py-20 bg-cream/60 border-b border-pastel/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pastel text-forest text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
              Smart Dining Ecosystem
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-brandText">
              Elevated Digital Hospitality
            </h2>
            <p className="text-sm text-brandText-muted">
              Designed for modern connoisseurs. Seamless collaboration, bespoke privileges, and effortless dining.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Rewards Club */}
            <div className="p-6 rounded-3xl bg-white border border-pastel/80 shadow-soft-sm hover:shadow-soft transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-forest text-gold flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-playfair font-bold text-lg text-brandText">
                  Madhuban Rewards Club
                </h3>
                <p className="text-xs text-brandText-muted leading-relaxed">
                  Earn 1 loyalty point for every ₹10 spent. Unlock Royal tier privileges, birthday gifts, and redeem fine vouchers.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  to="/rewards"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-forest-dark transition"
                >
                  <span>Explore Membership</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                </Link>
              </div>
            </div>

            {/* 2. Group Ordering */}
            <div className="p-6 rounded-3xl bg-white border border-pastel/80 shadow-soft-sm hover:shadow-soft transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-forest text-gold flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-playfair font-bold text-lg text-brandText">
                  Shared Group Dining
                </h3>
                <p className="text-xs text-brandText-muted leading-relaxed">
                  Dining with colleagues or family? Share a live cart pin, pool dishes seamlessly, and split the bill effortlessly.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  to="/group-order"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-forest-dark transition"
                >
                  <span>Create Group Cart</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                </Link>
              </div>
            </div>

            {/* 3. Live Digital Waitlist */}
            <div className="p-6 rounded-3xl bg-white border border-pastel/80 shadow-soft-sm hover:shadow-soft transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-forest text-gold flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-playfair font-bold text-lg text-brandText">
                  Live Queue Waitlist
                </h3>
                <p className="text-xs text-brandText-muted leading-relaxed">
                  Skip the crowded foyer. Check live waiting party counts, join the queue remotely, and receive instant seat alerts.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  to="/waitlist"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-forest-dark transition"
                >
                  <span>Join Live Waitlist</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                </Link>
              </div>
            </div>

            {/* 4. Gourmet Doorstep Delivery */}
            <div className="p-6 rounded-3xl bg-white border border-pastel/80 shadow-soft-sm hover:shadow-soft transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-forest text-gold flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform">
                  <Bike className="w-6 h-6" />
                </div>
                <h3 className="font-playfair font-bold text-lg text-brandText">
                  Concierge Delivery
                </h3>
                <p className="text-xs text-brandText-muted leading-relaxed">
                  Chef-prepared feasts delivered in eco-insulated thermal dining hampers with real-time valet GPS tracking.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  to="/delivery-tracking"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-forest-dark transition"
                >
                  <span>Track Live Delivery</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. CUSTOMER TESTIMONIALS CAROUSEL
      ======================================================== */}
      <section className="py-24 bg-bgLight">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-gold uppercase tracking-[0.25em] block mb-1">
              Guest Testimonials
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-brandText">
              Stories Shared Over Memorable Meals
            </h2>
          </div>

          {/* Testimonial Card */}
          <div className="relative bg-white rounded-3xl p-8 sm:p-12 shadow-soft border border-pastel">
            <Quote className="w-12 h-12 text-gold/30 absolute top-6 right-8 pointer-events-none" />

            <div className="space-y-6">
              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(testimonialsData[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="font-playfair text-xl sm:text-2xl text-brandText leading-relaxed italic">
                "{testimonialsData[activeTestimonial].review}"
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-between pt-4 border-t border-pastel/60">
                <div className="flex items-center gap-4">
                  <img
                    src={testimonialsData[activeTestimonial].avatar}
                    alt={testimonialsData[activeTestimonial].name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-forest"
                  />
                  <div>
                    <h4 className="font-playfair font-bold text-brandText text-base">
                      {testimonialsData[activeTestimonial].name}
                    </h4>
                    <p className="text-xs text-brandText-muted">
                      {testimonialsData[activeTestimonial].role} • Enjoyed {testimonialsData[activeTestimonial].dish}
                    </p>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevReview}
                    className="w-10 h-10 rounded-full border border-pastel hover:bg-pastel/60 text-forest flex items-center justify-center transition"
                    aria-label="Previous Testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextReview}
                    className="w-10 h-10 rounded-full border border-pastel hover:bg-pastel/60 text-forest flex items-center justify-center transition"
                    aria-label="Next Testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          6. TABLE RESERVATION INVITATION BANNER
      ======================================================== */}
      <section className="py-20 bg-gradient-to-r from-pastel via-cream to-pastel border-t border-pastel">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold text-forest uppercase tracking-[0.25em] block">
            An Intimate Dining Experience
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-brandText">
            Reserve Your Botanical Table at Madhuban
          </h2>
          <p className="text-sm sm:text-base text-brandText-muted max-w-xl mx-auto leading-relaxed">
            Whether it’s a romantic candlelit dinner, a bustling family reunion, or an executive luncheon — we craft bespoke culinary memories for your party.
          </p>
          <div className="pt-2">
            <Link
              to="/reservation"
              className="px-9 py-4 rounded-full bg-forest text-cream font-bold text-sm hover:bg-forest-dark shadow-forest-glow transition inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-gold" />
              <span>Book Table Online</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Food Detail Modal */}
      <FoodDetailModal
        dish={selectedDish}
        isOpen={!!selectedDish}
        onClose={() => setSelectedDish(null)}
      />

    </div>
  );
}
