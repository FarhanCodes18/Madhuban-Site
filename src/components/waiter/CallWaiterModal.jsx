import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BellRing,
  X,
  Droplets,
  Utensils,
  Receipt,
  Sparkles,
  CheckCircle2,
  Trash2,
  Send,
  MessageSquare,
  Clock,
  Layers,
  Sparkle
} from 'lucide-react';
import { useDemoRestaurant } from '../../context/DemoRestaurantContext';

export default function CallWaiterModal({ tableId, isOpen, onClose }) {
  const { waiterRequests, createWaiterRequest, cancelWaiterRequest } = useDemoRestaurant();
  const [selectedType, setSelectedType] = useState('Call Waiter');
  const [customNote, setCustomNote] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const activeTableRequests = waiterRequests.filter(r => r.tableId === tableId);

  const requestOptions = [
    { label: 'Call Waiter', icon: BellRing, desc: 'Request your table captain' },
    { label: 'Request Water', icon: Droplets, desc: 'Warm or chilled water' },
    { label: 'Request Extra Plates', icon: Layers, desc: 'Quarter or full plates' },
    { label: 'Request Napkins', icon: Layers, desc: 'Warm scented napkins' },
    { label: 'Request Cutlery', icon: Utensils, desc: 'Spoons, forks, chopsticks' },
    { label: 'Request Cleaning', icon: Sparkles, desc: 'Clear empty dishes & spills' },
    { label: 'Request Bill', icon: Receipt, desc: 'Check & payment terminal' },
    { label: 'Other Assistance', icon: MessageSquare, desc: 'Special dietary assistance' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    createWaiterRequest({
      tableId,
      tableName: `Table ${tableId}`,
      requestType: selectedType,
      message: customNote
    });

    setIsSent(true);
    setCustomNote('');
    setTimeout(() => {
      setIsSent(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1002] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-forest-dark/70 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          className="relative w-full max-w-lg bg-cream rounded-3xl shadow-2xl border border-pastel overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-6 bg-forest text-cream flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest-light flex items-center justify-center text-gold border border-gold/30">
                <BellRing className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <h3 className="font-playfair text-xl font-bold">
                  Assistance for Table {tableId}
                </h3>
                <p className="text-xs text-sage">
                  Our service captain is at your hospitality
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-forest-light text-cream transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Success banner if sent */}
            {isSent && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3 text-xs"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold">Request Transmitted!</p>
                  <p>Our floor captain is heading to Table {tableId}.</p>
                </div>
              </motion.div>
            )}

            {/* Active pending requests list for this table */}
            {activeTableRequests.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-brandText uppercase tracking-wider flex items-center justify-between">
                  <span>Current Table Requests ({activeTableRequests.length})</span>
                </h4>

                <div className="space-y-2">
                  {activeTableRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-3 rounded-2xl bg-white border border-pastel flex items-center justify-between gap-3 text-xs shadow-soft-sm"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-brandText">
                            {req.requestType}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            req.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : req.status === 'in_progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {req.status === 'completed' ? 'Resolved' : req.status === 'in_progress' ? 'Staff on way' : 'Pending'}
                          </span>
                        </div>
                        {req.message && (
                          <p className="text-brandText-muted text-[11px] mt-0.5">
                            "{req.message}"
                          </p>
                        )}
                      </div>

                      {req.status !== 'completed' && (
                        <button
                          onClick={() => cancelWaiterRequest(req.id)}
                          className="p-1.5 rounded-lg text-brandText-light hover:text-red-600 hover:bg-red-50 transition"
                          title="Cancel request"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Request Option Grid */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-brandText uppercase tracking-wider mb-2.5">
                  Select Assistance Type
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {requestOptions.map((opt) => {
                    const IconComponent = opt.icon;
                    const isSelected = selectedType === opt.label;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setSelectedType(opt.label)}
                        className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                          isSelected
                            ? 'bg-forest text-cream border-forest shadow-soft'
                            : 'bg-white text-brandText border-pastel hover:border-gold/60 hover:bg-pastel/20'
                        }`}
                      >
                        <div className={`p-1.5 rounded-xl shrink-0 ${
                          isSelected ? 'bg-forest-light text-gold' : 'bg-pastel/40 text-forest'
                        }`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold leading-tight">
                            {opt.label}
                          </p>
                          <p className={`text-[10px] mt-0.5 line-clamp-1 ${
                            isSelected ? 'text-pastel' : 'text-brandText-muted'
                          }`}>
                            {opt.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message Note */}
              <div>
                <label className="block text-xs font-semibold text-brandText mb-1.5">
                  Additional Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Need warm water with lemon slice..."
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-pastel bg-white focus:outline-none focus:border-forest"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-forest hover:bg-forest-dark text-cream font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-forest-glow transition active:scale-98"
              >
                <Send className="w-4 h-4 text-gold" />
                Send Request to Floor Staff
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
