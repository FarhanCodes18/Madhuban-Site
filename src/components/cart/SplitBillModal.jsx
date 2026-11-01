import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Users,
  Divide,
  QrCode,
  CreditCard,
  Banknote,
  Sparkles,
  Share2,
  Check,
  Percent
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function SplitBillModal({ isOpen, onClose, totalAmount = 1840 }) {
  if (!isOpen) return null;

  const [splitCount, setSplitCount] = useState(3);
  const [tipPercent, setTipPercent] = useState(5);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('upi');
  const [copied, setCopied] = useState(false);

  const tipAmount = Math.round((totalAmount * tipPercent) / 100);
  const finalTotal = totalAmount + tipAmount;
  const perPersonShare = Math.round(finalTotal / splitCount);

  const handleShare = () => {
    const text = `Madhuban Dining Bill Split:\nTotal: ₹${finalTotal} (incl. tip)\nSplit among ${splitCount} guests: ₹${perPersonShare} each.\nPay via UPI to Madhuban Dining.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1003] flex items-center justify-center p-4 bg-forest-dark/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          className="relative w-full max-w-lg bg-cream rounded-3xl p-6 sm:p-8 border border-pastel shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-pastel pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-forest text-gold flex items-center justify-center">
                <Divide className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-playfair text-xl font-bold text-brandText">
                  Split Dining Bill
                </h3>
                <p className="text-xs text-brandText-muted">
                  Share costs easily with your dining companions
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-pastel text-brandText transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Number of Guests Slider */}
          <div className="p-4 rounded-2xl bg-white border border-pastel space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-brandText">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-forest" /> Split Among Diners:
              </span>
              <span className="text-forest text-base font-dmsans">{splitCount} Guests</span>
            </div>

            <input
              type="range"
              min={2}
              max={10}
              value={splitCount}
              onChange={(e) => setSplitCount(Number(e.target.value))}
              className="w-full accent-forest cursor-pointer"
            />
          </div>

          {/* Tip Percentage Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-brandText uppercase tracking-wider block">
              Staff Gratuity / Tip
            </label>
            <div className="grid grid-cols-4 gap-2 text-xs font-semibold">
              {[0, 5, 10, 15].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setTipPercent(pct)}
                  className={`py-2 rounded-xl border transition ${
                    tipPercent === pct
                      ? 'bg-forest text-cream border-forest'
                      : 'bg-white text-brandText border-pastel hover:bg-pastel/30'
                  }`}
                >
                  {pct === 0 ? 'No Tip' : `${pct}% (₹${Math.round((totalAmount * pct) / 100)})`}
                </button>
              ))}
            </div>
          </div>

          {/* Calculation Result Callout */}
          <div className="p-5 rounded-2xl bg-forest text-cream text-center space-y-1 shadow-forest-glow">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold">
              Each Guest Pays
            </span>
            <div className="font-playfair text-4xl font-extrabold text-cream">
              ₹{perPersonShare}
            </div>
            <p className="text-[11px] text-sage">
              Bill: ₹{totalAmount} + Tip: ₹{tipAmount} = Total ₹{finalTotal}
            </p>
          </div>

          {/* Payment Options Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-brandText uppercase tracking-wider block">
              Individual Payment Mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'upi', label: 'UPI QR', icon: QrCode },
                { id: 'card', label: 'Credit Card', icon: CreditCard },
                { id: 'cash', label: 'Cash', icon: Banknote },
              ].map((m) => {
                const Icon = m.icon;
                const isSel = selectedPaymentMode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedPaymentMode(m.id)}
                    className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                      isSel ? 'bg-forest text-cream border-forest' : 'bg-white text-brandText border-pastel hover:bg-pastel/40'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSel ? 'text-gold' : 'text-forest'}`} />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* UPI QR Code Preview for per person share */}
            {selectedPaymentMode === 'upi' && (
              <div className="p-4 bg-white rounded-2xl border border-pastel text-center space-y-2">
                <div className="inline-block p-2 bg-white rounded-xl shadow-inner border border-pastel">
                  <QRCodeSVG
                    value={`upi://pay?pa=madhuban@bank&pn=MadhubanRestaurant&am=${perPersonShare}&cu=INR`}
                    size={120}
                  />
                </div>
                <p className="text-[11px] text-brandText-muted">
                  Scan with GPay / PhonePe / Paytm to settle ₹{perPersonShare}
                </p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex gap-3">
            <button
              onClick={handleShare}
              className="flex-1 py-3 rounded-xl border border-forest text-forest hover:bg-pastel text-xs font-bold flex items-center justify-center gap-2 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Copied Breakdown!' : 'Share Split Breakdown'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-forest hover:bg-forest-dark text-cream text-xs font-bold transition shadow-soft"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
