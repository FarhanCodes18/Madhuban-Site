import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BellRing, Utensils } from 'lucide-react';
import CallWaiterModal from './CallWaiterModal';
import { useCart } from '../../context/CartContext';

export default function FloatingWaiterButton({ tableId }) {
  const [isOpen, setIsOpen] = useState(false);
  const { activeTableId } = useCart();

  const currentTable = tableId || activeTableId;
  if (!currentTable) return null;

  return (
    <>
      <div className="fixed bottom-6 left-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-forest text-cream shadow-forest-glow border border-gold/40 hover:bg-forest-dark transition group"
        >
          <div className="relative">
            <BellRing className="w-5 h-5 text-gold group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          </div>
          <div className="text-left">
            <span className="text-xs font-bold block leading-tight">Call Waiter</span>
            <span className="text-[10px] text-pastel uppercase tracking-wider block">
              Table {currentTable}
            </span>
          </div>
        </motion.button>
      </div>

      <CallWaiterModal
        tableId={currentTable}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
