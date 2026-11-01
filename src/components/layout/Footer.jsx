import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { useDemoRestaurant } from '../../context/DemoRestaurantContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useDemoRestaurant();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    showToast('Subscribed! Check your inbox for exclusive tasting invitations.', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-forest-dark text-cream pt-20 pb-10 border-t border-gold/20 relative overflow-hidden">
      {/* Decorative Botanical Watermark */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-forest/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-forest-light/40">
          
          {/* Brand Info (Span 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-forest flex items-center justify-center text-gold border border-gold/40 shadow-gold-glow">
                <svg className="w-7 h-7" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 15 C30 35 20 55 50 85 C80 55 70 35 50 15 Z" fill="#DDE9D5" />
                  <circle cx="50" cy="50" r="10" fill="#C6A45C" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-playfair text-2xl font-bold tracking-[0.25em] text-cream uppercase">
                  Madhuban
                </span>
                <span className="font-poppins text-[10px] tracking-[0.25em] text-gold uppercase">
                  Where Nature Meets Taste
                </span>
              </div>
            </Link>

            <p className="text-sage text-sm leading-relaxed max-w-sm">
              An oasis of authentic heritage recipes, farm-picked botanical herbs, and modern contactless smart dining. Designed for unforgettable family gatherings and connoisseurs of fine taste.
            </p>

            {/* Timings */}
            <div className="flex items-start gap-2.5 text-xs text-sage-light pt-2">
              <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-cream">Dining Hours</p>
                <p>Lunch: 12:00 PM – 4:00 PM</p>
                <p>Dinner: 7:00 PM – 11:30 PM (Daily)</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-forest flex items-center justify-center text-cream hover:text-gold hover:bg-forest-light transition"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#facebook"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-forest flex items-center justify-center text-cream hover:text-gold hover:bg-forest-light transition"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a
                href="#twitter"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-forest flex items-center justify-center text-cream hover:text-gold hover:bg-forest-light transition"
                title="Twitter / X"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-playfair text-base font-bold text-cream tracking-wider uppercase">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-sage">
              <li>
                <Link to="/menu" className="hover:text-gold transition">Our Menu</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition">Our Story & Heritage</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-gold transition">Visual Gallery</Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-gold transition">Offers & Banquets</Link>
              </li>
              <li>
                <Link to="/reservation" className="hover:text-gold transition">Reserve a Table</Link>
              </li>
              <li>
                <Link to="/table/05" className="hover:text-gold transition text-pastel flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-gold" /> QR Table Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Culinary Cuisines */}
          <div className="space-y-4">
            <h4 className="font-playfair text-base font-bold text-cream tracking-wider uppercase">
              Cuisines
            </h4>
            <ul className="space-y-2.5 text-sm text-sage">
              <li>
                <Link to="/menu?cat=indian" className="hover:text-gold transition">Royal Indian</Link>
              </li>
              <li>
                <Link to="/menu?cat=pizza" className="hover:text-gold transition">Wood-Fired Pizza</Link>
              </li>
              <li>
                <Link to="/menu?cat=pasta" className="hover:text-gold transition">Artisanal Pasta</Link>
              </li>
              <li>
                <Link to="/menu?cat=chinese" className="hover:text-gold transition">Oriental & Dim Sums</Link>
              </li>
              <li>
                <Link to="/menu?cat=south-indian" className="hover:text-gold transition">Crispy Dosas & Podi</Link>
              </li>
              <li>
                <Link to="/menu?cat=desserts" className="hover:text-gold transition">Handcrafted Desserts</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4">
            <h4 className="font-playfair text-base font-bold text-cream tracking-wider uppercase">
              Stay Connected
            </h4>
            <p className="text-xs text-sage leading-relaxed">
              Subscribe for private tasting menus, seasonal harvests, and festive celebrations.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-forest/70 border border-forest-light text-cream placeholder-sage-light focus:outline-none focus:border-gold transition"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-gold hover:bg-gold-light text-forest-dark font-bold text-xs flex items-center transition"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-pastel">Thank you for joining our private circle.</p>
              )}
            </form>

            <div className="space-y-1.5 text-xs text-sage-light pt-2">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                Madhuban Estate, Boulevard Road, Nature Valley
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
                +91 (020) 2441-9800
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
                concierge@madhubanrestaurant.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-sage gap-4">
          <p>© {new Date().getFullYear()} MADHUBAN Smart Dining. Crafted with passion & farm freshness.</p>
          
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-gold transition">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-gold transition">Terms of Service</Link>
            <Link to="/admin" className="hover:text-gold transition flex items-center gap-1 text-gold">
              <ShieldCheck className="w-3.5 h-3.5" /> Admin System
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
