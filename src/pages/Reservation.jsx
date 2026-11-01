import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Users,
  Heart,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  User,
  MessageSquare,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';
import confetti from 'canvas-confetti';

export default function Reservation() {
  const { reservations, createReservation } = useDemoRestaurant();

  const [formData, setFormData] = useState({
    guestName: '',
    phone: '',
    email: '',
    date: '2026-11-01',
    time: '19:30',
    guests: 4,
    occasion: 'Dinner with Loved Ones',
    specialRequests: ''
  });

  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const occasionOptions = [
    'Dinner with Loved Ones',
    'Birthday Celebration',
    'Anniversary Candlelight',
    'Corporate & Business Lunch',
    'Family Reunion',
    'Proposal & Romantic Evening',
    'Casual Tasting'
  ];

  const timeSlots = [
    '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM',
    '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.guestName || !formData.phone) return;

    const newRes = createReservation({
      guestName: formData.guestName,
      phone: formData.phone,
      email: formData.email,
      date: formData.date,
      time: formData.time,
      guests: Number(formData.guests),
      occasion: formData.occasion,
      specialRequests: formData.specialRequests,
      tableId: '06',
      tableName: 'Table 06 (Botanical Atrium)'
    });

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });

    setConfirmedBooking(newRes);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-bgLight">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel text-forest text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" /> Bespoke Hospitality
          </span>
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-brandText">
            Reserve Your Botanical Table
          </h1>
          <p className="text-sm text-brandText-muted">
            Enjoy our serene pastel ambiance, attentive table captains, and culinary delights prepared just for your party.
          </p>
        </div>

        {/* Confirmation Modal if Booked */}
        <AnimatePresence>
          {confirmedBooking && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-12 p-8 rounded-3xl bg-forest text-cream shadow-forest-glow border border-gold/40 relative overflow-hidden"
            >
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-gold" />
                    <span className="text-xs font-bold uppercase tracking-wider text-pastel">
                      Reservation Confirmed
                    </span>
                  </div>
                  <h3 className="font-playfair text-2xl sm:text-3xl font-bold">
                    Booking #{confirmedBooking.id}
                  </h3>
                  <p className="text-xs text-sage">
                    Reserved for <span className="text-cream font-bold">{confirmedBooking.guestName}</span> • {confirmedBooking.guests} Guests on {confirmedBooking.date} at {confirmedBooking.time}.
                  </p>
                  <p className="text-xs text-gold">
                    Table Allocated: {confirmedBooking.tableName}
                  </p>
                </div>

                <button
                  onClick={() => setConfirmedBooking(null)}
                  className="px-6 py-2.5 rounded-full bg-cream text-forest font-bold text-xs hover:bg-pastel transition shrink-0"
                >
                  Book Another Table
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Reservation Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-pastel shadow-soft">
            <h3 className="font-playfair text-xl font-bold text-brandText mb-6 border-b border-pastel pb-3">
              Booking Details
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brandText mb-1.5 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-forest" /> Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Singhania"
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brandText mb-1.5 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-forest" /> Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest"
                  />
                </div>
              </div>

              {/* Email & Guests Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brandText mb-1.5 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-forest" /> Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brandText mb-1.5 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-forest" /> Number of Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest font-medium"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brandText mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-forest" /> Select Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brandText mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-forest" /> Preferred Time Slot
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest font-medium"
                  >
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Occasion */}
              <div>
                <label className="block text-xs font-semibold text-brandText mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-gold-dark" /> Dining Occasion
                </label>
                <div className="flex flex-wrap gap-2">
                  {occasionOptions.map(occ => {
                    const isSelected = formData.occasion === occ;
                    return (
                      <button
                        key={occ}
                        type="button"
                        onClick={() => setFormData({ ...formData, occasion: occ })}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                          isSelected
                            ? 'bg-forest text-cream border-forest'
                            : 'bg-bgLight text-brandText border-pastel hover:bg-pastel/30'
                        }`}
                      >
                        {occ}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-semibold text-brandText mb-1.5 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-forest" /> Special Requests or Seating Preferences
                </label>
                <textarea
                  rows={2}
                  placeholder="Quiet corner table, floral decor, anniversary dessert surprise, high chair for infant..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-forest hover:bg-forest-dark text-cream font-bold text-sm uppercase tracking-wider shadow-forest-glow flex items-center justify-center gap-2 transition"
              >
                <span>Confirm Reservation</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </button>
            </form>
          </div>

          {/* Booking History & Policy Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Dining Policies */}
            <div className="p-6 rounded-3xl bg-cream border border-pastel shadow-soft space-y-4">
              <h4 className="font-playfair text-lg font-bold text-brandText">
                Madhuban Reservation Policy
              </h4>
              <ul className="space-y-2.5 text-xs text-brandText-muted">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest mt-1.5 shrink-0" />
                  <span>Tables are held for 15 minutes past scheduled arrival before being released.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest mt-1.5 shrink-0" />
                  <span>Smart Contactless QR dining is active at every table for seamless ordering.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest mt-1.5 shrink-0" />
                  <span>For parties of 8 or more, complimentary chef tasting starters are served.</span>
                </li>
              </ul>
            </div>

            {/* Recent Reservations in Demo History */}
            <div className="p-6 rounded-3xl bg-white border border-pastel shadow-soft space-y-4">
              <h4 className="font-playfair text-lg font-bold text-brandText flex items-center justify-between">
                <span>Recent Bookings</span>
                <span className="text-xs text-brandText-muted font-normal font-sans">Demo History</span>
              </h4>

              <div className="space-y-3">
                {reservations.slice(0, 3).map((res) => (
                  <div
                    key={res.id}
                    className="p-3.5 rounded-2xl bg-bgLight border border-pastel text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-brandText">{res.guestName}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {res.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-brandText-muted">
                      {res.date} • {res.time} • {res.guests} Guests
                    </p>
                    <p className="text-[11px] text-forest font-semibold">
                      {res.tableName} ({res.occasion})
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
