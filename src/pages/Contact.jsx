import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';

export default function Contact() {
  const { showToast } = useDemoRestaurant();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    showToast('Your message has been received! Our concierge will reply promptly.', 'success');
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-bgLight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel text-forest text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" /> Concierge & Inquiries
          </span>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-brandText">
            Connect With Madhuban
          </h1>
          <p className="text-sm text-brandText-muted">
            We are always delighted to hear from you. Inquire about private banquets, catering, or table reservations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Details & Map Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-forest text-cream shadow-forest-glow space-y-6">
              <div>
                <h3 className="font-playfair text-2xl font-bold mb-1">
                  Restaurant Location
                </h3>
                <p className="text-xs text-sage">
                  Situated amidst scenic botanical landscaping
                </p>
              </div>

              <div className="space-y-4 text-xs text-cream/90">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-forest-light flex items-center justify-center text-gold shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-cream">Madhuban Culinary Estate</p>
                    <p className="text-sage mt-0.5">Plot 42, Green Boulevard Sanctuary, Nature Valley, Pune 411045, Maharashtra, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-forest-light flex items-center justify-center text-gold shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-cream">Table Concierge & Valet</p>
                    <p className="text-sage mt-0.5">+91 (020) 2441-9800 / +91 98200 44122</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-forest-light flex items-center justify-center text-gold shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-cream">Electronic Inquiries</p>
                    <p className="text-sage mt-0.5">concierge@madhubanrestaurant.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-forest-light flex items-center justify-center text-gold shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-cream">Service Hours</p>
                    <p className="text-sage mt-0.5">Lunch: 12:00 PM – 04:00 PM</p>
                    <p className="text-sage">Dinner: 07:00 PM – 11:30 PM (Daily)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Visual Map Card Placeholder */}
            <div className="rounded-3xl overflow-hidden border border-pastel bg-cream shadow-soft p-5 space-y-3">
              <div className="relative h-48 rounded-2xl bg-gradient-to-tr from-pastel via-cream to-pastel-dark flex items-center justify-center border border-pastel overflow-hidden">
                {/* Visual grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#cadbbf_1px,transparent_1px),linear-gradient(to_bottom,#cadbbf_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
                
                <div className="relative z-10 flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-forest text-gold flex items-center justify-center shadow-forest-glow mb-2">
                    <Navigation className="w-6 h-6 animate-pulse" />
                  </div>
                  <span className="font-playfair font-bold text-forest text-sm">
                    Madhuban Estate, Nature Valley
                  </span>
                  <span className="text-[11px] text-brandText-muted">
                    Valet Parking & EV Charging Available
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-brandText-muted">
                <span>Near Green Valley Botanical Gardens</span>
                <span className="text-forest font-semibold">Get Directions</span>
              </div>
            </div>
          </div>

          {/* Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-pastel shadow-soft">
            <h3 className="font-playfair text-2xl font-bold text-brandText mb-2">
              Send an Inquiry
            </h3>
            <p className="text-xs text-brandText-muted mb-6">
              Fill in your query and our hospitality desk will contact you within 2 business hours.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-playfair text-xl font-bold text-emerald-900">
                  Message Transmitted!
                </h4>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                  Thank you, {formData.name}. Our hospitality desk has received your note regarding "{formData.subject}".
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                  }}
                  className="mt-2 text-xs font-semibold text-emerald-900 underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-brandText mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Roy"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brandText mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="radhika@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-brandText mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98000 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brandText mb-1">
                      Topic / Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest font-medium"
                    >
                      <option value="General Inquiry">General Dining Inquiry</option>
                      <option value="Banquet & Parties">Private Banquet & Parties (15+)</option>
                      <option value="Chef Tasting Menu">Chef's Table Experience</option>
                      <option value="Corporate Dining">Corporate Tie-ups & Lunches</option>
                      <option value="Feedback">Feedback / Suggestions</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brandText mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your event, dietary requests, or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-forest hover:bg-forest-dark text-cream font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-forest-glow transition"
                >
                  <Send className="w-4 h-4 text-gold" />
                  <span>Transmit Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
