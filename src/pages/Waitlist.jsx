import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Users,
  Sparkles,
  CheckCircle2,
  Phone,
  User,
  ArrowRight,
  ShieldCheck,
  Bell,
  Trash2,
  Navigation
} from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';
import { useLanguage } from '../context/LanguageContext';
import confetti from 'canvas-confetti';

export default function Waitlist() {
  const { waitingList, joinWaitlist, leaveWaitlist, currentUser } = useDemoRestaurant();
  const { t } = useLanguage();

  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [partySize, setPartySize] = useState(4);
  const [preference, setPreference] = useState('Indoor Botanical Atrium');
  const [myTicket, setMyTicket] = useState(null);

  const seatingPreferences = [
    'Indoor Botanical Atrium',
    'Candlelight Alcove',
    'Courtyard Garden Terrace',
    'Royal Family Suite',
    'First Available'
  ];

  const handleJoinQueue = (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    const ticket = joinWaitlist({
      guestName: name,
      phone,
      partySize,
      preference
    });

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });

    setMyTicket(ticket);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-bgLight">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel text-forest text-xs font-semibold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-gold-dark" /> Live Hostess Queue
          </span>
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-brandText">
            Madhuban Dining Waiting List
          </h1>
          <p className="text-sm text-brandText-muted">
            Arrived without a prior table reservation? Join our digital live queue, explore the garden courtyard, and receive an SMS prompt the moment your table is prepared.
          </p>
        </div>

        {/* Active Ticket Banner if Joined */}
        <AnimatePresence>
          {myTicket && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-8 rounded-3xl bg-forest text-cream shadow-forest-glow border border-gold/40 relative overflow-hidden"
            >
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-cream text-forest flex flex-col items-center justify-center font-playfair font-bold shadow-soft shrink-0 border border-gold">
                    <span className="text-[10px] text-brandText-muted uppercase">TICKET</span>
                    <span className="text-3xl leading-none">{myTicket.queueNumber}</span>
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 uppercase">
                      Live Queue Active
                    </span>
                    <h3 className="font-playfair text-2xl font-bold mt-1">
                      {myTicket.guestName} ({myTicket.partySize} Guests)
                    </h3>
                    <p className="text-xs text-sage mt-0.5">
                      Preference: <strong className="text-cream">{myTicket.preference}</strong> • Est. Wait: <strong className="text-gold">{myTicket.estimatedWait}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      leaveWaitlist(myTicket.id);
                      setMyTicket(null);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-forest-light hover:bg-red-950/40 text-cream text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    <span>Leave Queue</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Join Queue Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-pastel shadow-soft space-y-5">
            <h3 className="font-playfair text-xl font-bold text-brandText border-b border-pastel pb-3">
              Join Today's Dining Queue
            </h3>

            <form onSubmit={handleJoinQueue} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brandText mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-forest" /> Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Siddharth Deshmukh"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brandText mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-forest" /> Mobile Number for SMS Notification *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98000 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brandText mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-forest" /> Party Size
                  </label>
                  <select
                    value={partySize}
                    onChange={(e) => setPartySize(Number(e.target.value))}
                    className="w-full text-xs p-3 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest font-semibold"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brandText mb-1">
                    Seating Preference
                  </label>
                  <select
                    value={preference}
                    onChange={(e) => setPreference(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest font-medium"
                  >
                    {seatingPreferences.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-forest hover:bg-forest-dark text-cream font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-forest-glow transition"
              >
                <span>Get Digital Queue Ticket</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </button>
            </form>
          </div>

          {/* Current Queue Board (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-cream border border-pastel shadow-soft space-y-4">
              <div className="flex items-center justify-between border-b border-pastel pb-3">
                <h3 className="font-playfair text-lg font-bold text-brandText">
                  Floor Telemetry
                </h3>
                <span className="text-xs text-forest font-semibold">
                  {waitingList.length} Parties in Queue
                </span>
              </div>

              <div className="space-y-3 text-xs">
                {waitingList.map((party) => (
                  <div
                    key={party.id}
                    className="p-3.5 rounded-2xl bg-white border border-pastel flex items-center justify-between shadow-soft-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-forest text-cream font-bold flex items-center justify-center font-playfair">
                        #{party.queueNumber}
                      </span>
                      <div>
                        <p className="font-bold text-brandText">{party.guestName}</p>
                        <p className="text-[11px] text-brandText-muted">{party.partySize} Guests • {party.preference}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-forest font-bold font-mono block">~{party.estimatedWait}</span>
                      <span className="text-[10px] text-brandText-light">Joined {party.joinedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-pastel text-xs text-brandText-muted space-y-2">
              <h4 className="font-bold text-brandText font-playfair text-sm flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-forest" /> Queue Protocol
              </h4>
              <p>Guests will receive a chime alert and SMS when their ticket is called. Please arrive at the hostess desk within 5 minutes of notification.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
