import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Tag,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Clock,
  Gift,
  Percent,
  CheckCircle2
} from 'lucide-react';
import { offersData } from '../data/offers';
import { useCart } from '../context/CartContext';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';
import { useNavigate } from 'react-router-dom';

export default function Offers() {
  const { applyCouponCode, openCart } = useCart();
  const { showToast } = useDemoRestaurant();
  const [copiedCode, setCopiedCode] = useState(null);
  const navigate = useNavigate();

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Coupon code "${code}" copied to clipboard!`, 'success');
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const handleApplyToCart = (code) => {
    const res = applyCouponCode(code);
    if (res.success) {
      showToast(res.message, 'success');
      openCart();
    } else {
      showToast(res.message, 'warning');
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-bgLight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel text-forest text-xs font-semibold uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5 text-gold-dark" /> Exclusive Dining Privileges
          </span>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-brandText">
            Curated Offers & Savings
          </h1>
          <p className="text-sm text-brandText-muted">
            Enjoy premium multi-cuisine savings across family dining, weekend celebrations, and corporate luncheons.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offersData.map((offer) => {
            const isCopied = copiedCode === offer.code;

            return (
              <motion.div
                key={offer.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-white border border-pastel overflow-hidden shadow-soft flex flex-col justify-between group hover:border-gold/50"
              >
                {/* Top Banner */}
                <div className="p-6 bg-gradient-to-br from-cream via-pastel/30 to-cream border-b border-pastel/60 relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gold/20 text-forest border border-gold/30">
                      {offer.badge}
                    </span>
                    <span className="text-[11px] text-brandText-muted font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-forest" />
                      {offer.validUntil}
                    </span>
                  </div>

                  <h3 className="font-playfair text-2xl font-bold text-brandText group-hover:text-forest transition">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-forest font-semibold mt-1">
                    {offer.tagline}
                  </p>
                </div>

                {/* Offer Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <p className="text-xs text-brandText-muted leading-relaxed">
                      {offer.description}
                    </p>
                    <p className="text-[11px] text-brandText-light italic">
                      * {offer.terms}
                    </p>
                  </div>

                  {/* Coupon Code Pill & Copy */}
                  <div className="pt-2">
                    <div className="p-3 rounded-2xl bg-bgLight border border-dashed border-forest/30 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-brandText-muted uppercase tracking-wider block font-semibold">
                          Promo Code
                        </span>
                        <span className="font-mono text-base font-bold text-forest tracking-wider">
                          {offer.code}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(offer.code)}
                          className="p-2 rounded-xl bg-white border border-pastel text-forest hover:bg-pastel transition shadow-sm"
                          title="Copy Code"
                        >
                          {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={() => handleApplyToCart(offer.code)}
                          className="px-3.5 py-2 rounded-xl bg-forest hover:bg-forest-dark text-cream font-bold text-xs flex items-center gap-1 transition"
                        >
                          <span>Apply</span>
                          <ArrowRight className="w-3 h-3 text-gold" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Banner CTA */}
        <div className="mt-16 p-8 rounded-3xl bg-forest text-cream shadow-forest-glow flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-playfair text-2xl font-bold">
              Planning a Grand Banquet or Private Event?
            </h3>
            <p className="text-xs text-sage">
              Get personalized tasting menus and private dining discounts for groups of 15 or more.
            </p>
          </div>

          <button
            onClick={() => navigate('/contact')}
            className="px-7 py-3 rounded-full bg-gold hover:bg-gold-light text-forest-dark font-bold text-xs uppercase tracking-wider transition shrink-0"
          >
            Inquire for Group Banquet
          </button>
        </div>

      </div>
    </div>
  );
}
