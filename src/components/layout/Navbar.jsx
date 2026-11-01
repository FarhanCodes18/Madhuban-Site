import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu as MenuIcon,
  X,
  UtensilsCrossed,
  ShieldCheck,
  Calendar,
  Sparkles,
  Bell,
  Globe,
  Award,
  Clock,
  Users
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useDemoRestaurant } from '../../context/DemoRestaurantContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNotifications } from '../../context/NotificationContext';
import SearchModal from '../common/SearchModal';
import NotificationCenterModal from '../common/NotificationCenterModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItemsCount, openCart, activeTableId } = useCart();
  const { wishlistCount } = useWishlist();
  const { currentUser } = useDemoRestaurant();
  const { language, setLanguage, t } = useLanguage();
  const { unreadCount, toggleNotifications } = useNotifications();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('menu'), path: '/menu' },
    { name: t('about'), path: '/about' },
    { name: t('gallery'), path: '/gallery' },
    { name: t('offers'), path: '/offers' },
    { name: t('rewards'), path: '/rewards', icon: Award },
    { name: t('waitlist'), path: '/waitlist', icon: Clock },
    { name: t('contact'), path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-cream/95 backdrop-blur-md shadow-soft py-2.5 border-b border-pastel/60'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: MADHUBAN Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-forest flex items-center justify-center text-gold shadow-forest-glow transition-transform duration-300 group-hover:scale-105 border border-gold/40">
                <svg className="w-6 h-6" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 15 C30 35 20 55 50 85 C80 55 70 35 50 15 Z" fill="#DDE9D5" />
                  <circle cx="50" cy="50" r="10" fill="#C6A45C" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-playfair text-xl sm:text-2xl font-bold tracking-[0.2em] text-forest uppercase leading-tight group-hover:text-forest-light transition">
                  Madhuban
                </span>
                <span className="font-poppins text-[9px] sm:text-[10px] tracking-[0.25em] text-brandText-muted uppercase">
                  Where Nature Meets Taste
                </span>
              </div>
            </Link>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative font-dmsans text-xs uppercase tracking-wider font-bold transition-colors py-1 flex items-center gap-1 ${
                      isActive ? 'text-forest' : 'text-brandText hover:text-forest'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="navUnderline"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}

              {/* Table Dining Pill if active */}
              {activeTableId && (
                <Link
                  to={`/table/${activeTableId}`}
                  className="px-3 py-1 rounded-full bg-pastel text-forest text-xs font-semibold flex items-center gap-1.5 border border-forest/20 animate-pulse-subtle"
                >
                  <UtensilsCrossed className="w-3.5 h-3.5 text-gold-dark" />
                  Table {activeTableId}
                </Link>
              )}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Language Selector Pill */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="px-2.5 py-1 rounded-full bg-pastel/70 hover:bg-pastel text-forest text-xs font-bold flex items-center gap-1 transition border border-pastel"
                title="Switch Language (English / हिंदी)"
              >
                <Globe className="w-3.5 h-3.5 text-gold-dark" />
                <span className="text-[11px]">{language === 'en' ? 'हिंदी' : 'EN'}</span>
              </button>

              {/* Notifications Center Bell */}
              <button
                onClick={toggleNotifications}
                className="relative p-2 sm:p-2.5 rounded-full hover:bg-pastel/60 text-forest transition"
                title="Notifications"
                aria-label="Notification Center"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 sm:p-2.5 rounded-full hover:bg-pastel/60 text-forest transition"
                title="Search Menu"
                aria-label="Search Dishes"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Icon */}
              <Link
                to="/profile"
                className="relative p-2 sm:p-2.5 rounded-full hover:bg-pastel/60 text-forest transition"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-gold text-forest-dark text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={openCart}
                className="relative p-2 sm:p-2.5 rounded-full bg-pastel/80 hover:bg-pastel text-forest transition"
                title="View Cart"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-forest text-cream text-[10px] font-bold flex items-center justify-center shadow-soft">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              {/* Group Order Quick Icon */}
              <Link
                to="/group-order"
                className="hidden md:flex p-2 rounded-full hover:bg-pastel/60 text-forest transition"
                title="Shared Group Dining Cart"
              >
                <Users className="w-5 h-5" />
              </Link>

              {/* Profile / Account button */}
              <Link
                to={currentUser ? "/profile" : "/login"}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-forest/30 text-forest hover:bg-forest hover:text-cream text-xs font-semibold transition"
              >
                <User className="w-3.5 h-3.5" />
                <span>{currentUser ? currentUser.name.split(' ')[0] : t('signIn')}</span>
              </Link>

              {/* Quick Reservation button */}
              <Link
                to="/reservation"
                className="hidden lg:flex items-center gap-1 px-3.5 py-2 rounded-full bg-forest text-cream text-xs font-semibold shadow-forest-glow hover:bg-forest-dark transition"
              >
                <Calendar className="w-3.5 h-3.5 text-gold" />
                <span>{t('bookTable')}</span>
              </Link>

              {/* Admin Portal quick link */}
              <Link
                to="/admin"
                className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-brandText-muted hover:text-forest px-2 py-1 rounded bg-cream border border-pastel"
                title="Admin Management Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-gold-dark" />
                <span>{t('admin')}</span>
              </Link>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMobileOpen(v => !v)}
                className="xl:hidden p-2 rounded-xl text-forest hover:bg-pastel/60 transition"
                aria-label="Open Mobile Menu"
              >
                {isMobileOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-x-0 top-[68px] bg-cream/98 backdrop-blur-xl border-b border-pastel shadow-2xl z-30 xl:hidden overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `text-base font-playfair font-semibold py-1 transition flex items-center justify-between ${
                        isActive ? 'text-forest translate-x-2' : 'text-brandText hover:text-forest'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                  </NavLink>
                ))}
              </div>

              {/* Quick Action Links */}
              <div className="pt-3 border-t border-pastel/60 flex flex-col gap-2">
                <Link
                  to="/group-order"
                  className="w-full py-2.5 px-4 rounded-xl bg-pastel/50 text-forest text-xs font-bold flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gold-dark" />
                    Shared Group Ordering
                  </span>
                  <span className="text-[10px] bg-forest text-cream px-2 py-0.5 rounded-full">New</span>
                </Link>

                <Link
                  to="/table/05"
                  className="w-full py-2.5 px-4 rounded-xl bg-pastel/70 text-forest text-xs font-semibold flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <UtensilsCrossed className="w-4 h-4 text-gold-dark" />
                    QR Smart Table Ordering (Demo Table 05)
                  </span>
                  <span className="text-xs bg-forest text-cream px-2 py-0.5 rounded-full">Dine In</span>
                </Link>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    to="/reservation"
                    className="py-2.5 rounded-xl bg-forest text-cream text-xs font-bold text-center flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-gold" />
                    {t('bookTable')}
                  </Link>

                  <Link
                    to="/admin"
                    className="py-2.5 rounded-xl bg-forest/10 text-forest text-xs font-bold text-center flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Admin Command
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectDish={(dish) => {
          setIsSearchOpen(false);
          navigate(`/menu?dish=${dish.id}`);
        }}
      />

      <NotificationCenterModal />
    </>
  );
}
