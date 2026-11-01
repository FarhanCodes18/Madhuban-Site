import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  Search,
  CheckCircle2,
  XCircle,
  UtensilsCrossed,
  Sparkles,
  Phone,
  Mail,
  User
} from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';

export default function Reservations() {
  const { reservations, updateReservationStatus } = useDemoRestaurant();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredReservations = reservations.filter((r) => {
    if (filter !== 'all' && r.status !== filter) return false;
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      if (!r.guestName.toLowerCase().includes(q) && !r.phone.includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-brandText">
            Table Reservations & Seating
          </h1>
          <p className="text-xs text-brandText-muted mt-1">
            Review guest bookings, allocate private suites, and mark seated patrons.
          </p>
        </div>

        <div className="text-xs font-semibold text-forest bg-white px-4 py-2 rounded-2xl border border-pastel shadow-soft-sm">
          Total Bookings: <span className="font-bold">{reservations.length}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-3xl bg-white border border-pastel shadow-soft-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          {['all', 'confirmed', 'seated', 'pending', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl font-bold uppercase tracking-wider whitespace-nowrap transition border ${
                filter === st
                  ? 'bg-forest text-cream border-forest'
                  : 'bg-bgLight text-brandText border-pastel hover:bg-pastel/40'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-forest absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search guest or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest"
          />
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredReservations.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-pastel">
            <Calendar className="w-10 h-10 text-brandText-light mx-auto mb-2" />
            <p className="font-playfair font-bold text-base text-brandText">No reservations found</p>
            <p className="text-xs text-brandText-muted">Try switching filter tabs or checking back later.</p>
          </div>
        ) : (
          filteredReservations.map((res) => (
            <div
              key={res.id}
              className="p-5 sm:p-6 rounded-3xl bg-white border border-pastel shadow-soft-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-playfair font-bold text-lg text-brandText">
                    {res.guestName}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    res.status === 'seated'
                      ? 'bg-blue-100 text-blue-800'
                      : res.status === 'confirmed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {res.status.toUpperCase()}
                  </span>
                  <span className="text-xs text-forest font-semibold bg-pastel px-2.5 py-0.5 rounded-full">
                    {res.tableName}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-brandText-muted">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-forest" />
                    {res.date} at {res.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-forest" />
                    {res.guests} Guests
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-forest" />
                    {res.phone}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-brandText">
                    <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
                    Occasion: {res.occasion}
                  </span>
                </div>

                {res.specialRequests && (
                  <p className="text-xs text-brandText-muted bg-bgLight p-2.5 rounded-xl border border-pastel/60 max-w-xl">
                    <strong>Special Guest Note:</strong> "{res.specialRequests}"
                  </p>
                )}
              </div>

              {/* Status Actions */}
              <div className="flex items-center gap-2 justify-end flex-wrap">
                {res.status === 'confirmed' && (
                  <button
                    onClick={() => updateReservationStatus(res.id, 'seated')}
                    className="px-4 py-2 rounded-xl bg-forest hover:bg-forest-dark text-cream font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-soft transition"
                  >
                    <UtensilsCrossed className="w-3.5 h-3.5 text-gold" />
                    <span>Seat Guests at Table</span>
                  </button>
                )}

                {res.status === 'pending' && (
                  <button
                    onClick={() => updateReservationStatus(res.id, 'confirmed')}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-cream font-bold text-xs uppercase tracking-wider transition"
                  >
                    Confirm Booking
                  </button>
                )}

                {res.status !== 'cancelled' && (
                  <button
                    onClick={() => updateReservationStatus(res.id, 'cancelled')}
                    className="p-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition"
                    title="Cancel Booking"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
