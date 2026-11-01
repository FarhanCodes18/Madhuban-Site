import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Heart,
  Leaf,
  Award,
  ShieldCheck,
  Utensils,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const milestones = [
    { year: '2016', title: 'The Botanical Inception', desc: 'Started with an open-air courtyard offering slow-simmered heirloom curries and hand-rolled rotis.' },
    { year: '2019', title: 'Wood-Fired & Artisanal Expansion', desc: 'Introduced wood-fired Neapolitan crusts and handcrafted pasta alongside royal Indian heritage dishes.' },
    { year: '2022', title: 'Purity & Organic Guarantee', desc: 'Transitioned completely to farm-direct single-origin spices and certified A2 Gir cow bilona ghee.' },
    { year: '2025', title: 'The Smart Restaurant Leap', desc: 'Pioneered contactless table QR ordering and floor captain assistance, merging high-tech with luxury dining.' }
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-bgLight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pastel text-forest text-xs font-semibold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-gold-dark" /> Our Culinary Heritage
          </span>
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-brandText leading-tight">
            Crafted With Passion, Served With Love.
          </h1>
          <p className="font-poppins text-base text-brandText-muted leading-relaxed">
            Madhuban was born out of a profound love for traditional slow cooking, serene botanical greenery, and heartfelt hospitality.
          </p>
        </div>

        {/* Story Section with Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-gold uppercase tracking-[0.25em] block">
              Where Nature Meets Taste
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-brandText">
              A Botanical Sanctuary for Food Lovers
            </h2>
            <p className="text-sm text-brandText-muted leading-relaxed font-poppins">
              At Madhuban, we believe dining is not merely sustenance; it is a sacred sensory voyage. Walking into our sun-dappled glasshouse surrounded by fresh rosemary, mint, and jasmine, you leave the hustle of the metropolis behind.
            </p>
            <p className="text-sm text-brandText-muted leading-relaxed font-poppins">
              Our 24-hour Dal Bukhara is still stirred in heavy-bottomed copper cauldrons over charcoal embers. Our pizzas are blistered in wood-fired ovens at 450°C. Every sauce, dip, podi, and marinade is churned in-house daily with zero chemical stabilizers or artificial colors.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-cream border border-pastel space-y-1">
                <span className="font-dmsans text-2xl font-bold text-forest">100%</span>
                <p className="text-xs font-bold text-brandText">Pure A2 Cow Ghee</p>
                <p className="text-[11px] text-brandText-muted">Churned via Vedic bilona method</p>
              </div>

              <div className="p-4 rounded-2xl bg-cream border border-pastel space-y-1">
                <span className="font-dmsans text-2xl font-bold text-forest">Zero</span>
                <p className="text-xs font-bold text-brandText">Artificial Colors</p>
                <p className="text-[11px] text-brandText-muted">Real saffron, turmeric & beetroot</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-pastel">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900&auto=format&fit=crop"
                alt="Chef preparing fresh dish at Madhuban"
                className="w-full h-[450px] object-cover"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-forest text-cream p-5 rounded-2xl shadow-forest-glow border border-gold/30 max-w-xs hidden sm:block">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-5 h-5 text-gold" />
                <span className="font-playfair font-bold text-sm">Recognized Excellence</span>
              </div>
              <p className="text-[11px] text-sage leading-normal">
                Voted "Best Botanical Heritage Restaurant" by Western Culinary Guild (2024–2025).
              </p>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars of Philosophy */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-forest uppercase tracking-[0.2em] block">
              Our Principles
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-brandText">
              The Four Pillars of Madhuban
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Leaf,
                title: 'Farm Fresh Harvest',
                desc: 'Direct partnerships with organic micro-farms for pesticide-free seasonal produce and herbs.'
              },
              {
                icon: Utensils,
                title: 'Heritage Craftsmanship',
                desc: 'Ancient slow-simmering techniques and clay handi cooking that preserve nutritional vitality.'
              },
              {
                icon: ShieldCheck,
                title: 'Uncompromised Hygiene',
                desc: 'Stringent sterilization standards, open live kitchen viewing, and transparent allergen disclosures.'
              },
              {
                icon: Sparkles,
                title: 'Smart Convenience',
                desc: 'Effortless contactless QR ordering, table service requests, and transparent bill splitting.'
              }
            ].map((pillar, idx) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-pastel shadow-soft-sm space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-pastel/50 flex items-center justify-center text-forest">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-playfair font-bold text-brandText text-lg">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-brandText-muted leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline / Milestones */}
        <div className="p-8 sm:p-12 rounded-3xl bg-cream border border-pastel shadow-soft mb-16">
          <h2 className="font-playfair text-3xl font-bold text-brandText text-center mb-12">
            Our Journey Through the Years
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {milestones.map((m, i) => (
              <div key={i} className="space-y-2 relative">
                <span className="font-dmsans text-3xl font-bold text-forest/30">
                  {m.year}
                </span>
                <h4 className="font-playfair font-bold text-brandText text-base">
                  {m.title}
                </h4>
                <p className="text-xs text-brandText-muted leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <h3 className="font-playfair text-2xl font-bold text-brandText">
            Experience the Flavours in Person
          </h3>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/reservation"
              className="px-8 py-3.5 rounded-full bg-forest text-cream font-bold text-xs uppercase tracking-wider hover:bg-forest-dark transition shadow-forest-glow"
            >
              Book a Table Today
            </Link>
            <Link
              to="/menu"
              className="px-8 py-3.5 rounded-full bg-cream border border-forest/30 text-forest font-bold text-xs uppercase tracking-wider hover:bg-pastel transition"
            >
              View Full Menu
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
