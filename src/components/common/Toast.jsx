import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useDemoRestaurant } from '../../context/DemoRestaurantContext';

export default function Toast() {
  const { toast } = useDemoRestaurant();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isWarning = toast.type === 'warning';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 max-w-md pointer-events-auto"
      >
        <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-forest-glow border backdrop-blur-md ${
          isSuccess
            ? 'bg-forest-dark/95 border-gold/40 text-cream'
            : isWarning
            ? 'bg-amber-900/90 border-amber-500/40 text-amber-50'
            : 'bg-forest/95 border-pastel/40 text-cream'
        }`}>
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />}
          {isWarning && <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />}
          {!isSuccess && !isWarning && <Info className="w-5 h-5 text-pastel shrink-0" />}
          
          <p className="text-sm font-medium tracking-wide leading-snug">
            {toast.message}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
