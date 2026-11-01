import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Sparkles, Smartphone } from 'lucide-react';

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Show promotional banner after 4 seconds if not installed
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem('madhuban_pwa_dismissed');
      if (!dismissed) setShowPrompt(true);
    }, 4500);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      setInstalled(true);
    }

    setTimeout(() => {
      setShowPrompt(false);
      sessionStorage.setItem('madhuban_pwa_dismissed', 'true');
    }, 2000);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('madhuban_pwa_dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        className="fixed bottom-20 left-4 sm:left-6 z-50 max-w-sm pointer-events-auto"
      >
        <div className="p-4 rounded-3xl bg-forest-dark text-cream border border-gold/40 shadow-forest-glow flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-forest flex items-center justify-center text-gold shrink-0 border border-gold/30">
              <Smartphone className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-playfair font-bold text-xs">Madhuban App</span>
                <span className="text-[9px] bg-gold text-forest-dark font-bold px-1.5 py-0.2 rounded">Fast QR</span>
              </div>
              <p className="text-[11px] text-sage leading-tight mt-0.5">
                {installed ? 'Added to Home Screen!' : 'Install on your device for instant offline access'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {!installed ? (
              <button
                onClick={handleInstall}
                className="px-3 py-1.5 rounded-xl bg-gold hover:bg-gold-light text-forest-dark font-bold text-xs flex items-center gap-1 shadow-soft transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install</span>
              </button>
            ) : (
              <span className="text-xs text-emerald-400 font-bold">Ready</span>
            )}
            <button
              onClick={handleDismiss}
              className="p-1 rounded-full text-sage hover:text-cream transition"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
