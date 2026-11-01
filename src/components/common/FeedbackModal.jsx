import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Star,
  MessageSquare,
  Sparkles,
  Heart,
  Send,
  CheckCircle2
} from 'lucide-react';
import { useDemoRestaurant } from '../../context/DemoRestaurantContext';
import confetti from 'canvas-confetti';

export default function FeedbackModal({ isOpen, onClose }) {
  const { submitFeedback, currentUser } = useDemoRestaurant();
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState('Food Quality');
  const [comment, setComment] = useState('');
  const [dishMentioned, setDishMentioned] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    submitFeedback({
      name: currentUser?.name || 'Valued Guest',
      rating,
      category,
      comment,
      dishMentioned
    });

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1003] flex items-center justify-center p-4 bg-forest-dark/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          className="relative w-full max-w-lg bg-cream rounded-3xl p-6 sm:p-8 border border-pastel shadow-2xl space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-pastel pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-forest text-gold flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-playfair text-xl font-bold text-brandText">
                  Guest Dining Feedback
                </h3>
                <p className="text-xs text-brandText-muted">
                  Help us elevate your culinary journey
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

          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-playfair text-2xl font-bold text-emerald-950">
                Thank You for Your Review!
              </h4>
              <p className="text-xs text-emerald-800 max-w-xs mx-auto">
                Your thoughts have been transmitted to Executive Chef Arvind Mathur and the hospitality management desk.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Rating Selector */}
              <div className="text-center py-2 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-brandText-muted block">
                  Overall Dining Experience
                </span>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-125"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Category */}
              <div>
                <label className="block text-xs font-semibold text-brandText mb-1.5">
                  Feedback Focus
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['Food Quality', 'Service & Staff', 'Ambiance', 'Cleanliness', 'Suggestion', 'Complaint'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`p-2 rounded-xl border text-center transition font-semibold ${
                        category === cat
                          ? 'bg-forest text-cream border-forest'
                          : 'bg-white text-brandText border-pastel hover:bg-pastel/30'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dish Mentioned */}
              <div>
                <label className="block text-xs font-semibold text-brandText mb-1">
                  Dish Enjoyed (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Royal Paneer Makhani, Truffle Pizza..."
                  value={dishMentioned}
                  onChange={(e) => setDishMentioned(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-pastel bg-white focus:outline-none focus:border-forest"
                />
              </div>

              {/* Comments Area */}
              <div>
                <label className="block text-xs font-semibold text-brandText mb-1">
                  Your Honest Impressions *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your meal, flavors, staff attentiveness, or areas we can polish..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-pastel bg-white focus:outline-none focus:border-forest resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-forest hover:bg-forest-dark text-cream font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-forest-glow transition"
              >
                <Send className="w-4 h-4 text-gold" />
                <span>Submit Dining Review</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
