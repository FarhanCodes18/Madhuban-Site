import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        const increment = Math.floor(Math.random() * 15) + 10;
        return Math.min(100, prev + increment);
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[99999] bg-[#183B29] flex flex-col items-center justify-center text-cream px-6 select-none"
    >
      {/* Decorative Botanical Watermark */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#DDE9D5_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Center Branded Reveal */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Animated Brand Emblem */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative mb-6"
        >
          <div className="w-20 h-20 rounded-full border border-gold/40 flex items-center justify-center bg-forest/80 shadow-gold-glow">
            <svg
              className="w-10 h-10 text-gold"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M50 15 C30 35 20 55 50 85 C80 55 70 35 50 15 Z" fill="#DDE9D5" opacity="0.9" />
              <circle cx="50" cy="50" r="10" fill="#C6A45C" />
            </svg>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-2 border border-dashed border-gold/30 rounded-full"
          />
        </motion.div>

        {/* Brand Name Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0, letterSpacing: '0.1em' }}
          animate={{ y: 0, opacity: 1, letterSpacing: '0.35em' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-cream tracking-[0.35em] uppercase mb-2"
        >
          Madhuban
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-poppins text-xs sm:text-sm font-light uppercase tracking-[0.3em] text-gold mb-8 flex items-center gap-2"
        >
          <span className="w-6 h-[1px] bg-gold/50" />
          Where Nature Meets Taste
          <span className="w-6 h-[1px] bg-gold/50" />
        </motion.p>

        {/* Progress Line */}
        <div className="w-48 sm:w-64 h-[2px] bg-forest-light rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-pastel via-gold to-pastel rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.2 }}
          />
        </div>

        {/* Progress Percentage */}
        <p className="mt-3 text-[11px] font-mono text-sage tracking-widest">
          {progress}%
        </p>
      </div>
    </motion.div>
  );
}
