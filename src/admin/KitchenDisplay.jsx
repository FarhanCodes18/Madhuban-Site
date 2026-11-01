import React, { useState } from 'react';
import {
  ChefHat,
  Clock,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Volume2,
  VolumeX,
  Play,
  Layers,
  Sparkles,
  Filter
} from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';

export default function KitchenDisplay() {
  const { orders, updateOrderStatus, showToast } = useDemoRestaurant();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedStation, setSelectedStation] = useState('all');

  // Audio chime feedback using Web Audio API
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch {
      // Audio not permitted without interaction
    }
  };

  // Helper to determine item station
  const getItemStation = (itemName = '') => {
    const lower = itemName.toLowerCase();
    if (lower.includes('mojito') || lower.includes('cooler') || lower.includes('lassi') || lower.includes('drink') || lower.includes('shake') || lower.includes('tea') || lower.includes('brew') || lower.includes('water')) {
      return 'coldbar';
    }
    if (lower.includes('pizza') || lower.includes('pasta') || lower.includes('risotto') || lower.includes('bruschetta') || lower.includes('ravioli') || lower.includes('lasagna')) {
      return 'woodfired';
    }
    if (lower.includes('halwa') || lower.includes('kulfi') || lower.includes('dessert') || lower.includes('jamun') || lower.includes('cake') || lower.includes('rabdi') || lower.includes('tiramisu')) {
      return 'bakery';
    }
    return 'hotline'; // default to Tandoor & Curries
  };

  const stations = [
    { id: 'all', name: 'All Stations', badge: 'Master Rail' },
    { id: 'hotline', name: 'Tandoor & Curries', badge: 'Hot Line' },
    { id: 'woodfired', name: 'Wood-Fired & Italian', badge: 'Oven & Pasta' },
    { id: 'coldbar', name: 'Beverage & Mocktails', badge: 'Cold Bar' },
    { id: 'bakery', name: 'Desserts & Mithai', badge: 'Sweet Station' }
  ];

  // Active tickets waiting to be prepared or in cooking
  const rawActiveTickets = orders.filter(
    (o) => o.status === 'placed' || o.status === 'accepted' || o.status === 'preparing'
  );

  // Ready tickets waiting for waiter pickup
  const readyTickets = orders.filter((o) => o.status === 'ready');

  // Filter tickets by selected station
  const activeTickets = rawActiveTickets.filter((ticket) => {
    if (selectedStation === 'all') return true;
    return ticket.items.some((item) => getItemStation(item.name) === selectedStation);
  });

  const handleStartCooking = (ticketId) => {
    playChime();
    updateOrderStatus(ticketId, 'preparing');
    showToast(`Order #${ticketId} is now actively cooking on line`, 'info');
  };

  const handleMarkReady = (ticketId) => {
    playChime();
    updateOrderStatus(ticketId, 'ready');
    showToast(`Order #${ticketId} plated & ready for pickup`, 'success');
  };

  const handleMarkServed = (ticketId) => {
    playChime();
    updateOrderStatus(ticketId, 'served');
    showToast(`Order #${ticketId} served to guests`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="p-5 sm:p-6 rounded-3xl bg-forest-dark text-cream shadow-forest-glow flex flex-col md:flex-row md:items-center justify-between gap-4 border border-gold/20">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-forest flex items-center justify-center text-gold border border-gold/40 shadow-soft shrink-0">
            <ChefHat className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-playfair text-xl sm:text-2xl font-bold tracking-wide">
                Kitchen Display System (KDS)
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gold/20 text-gold border border-gold/30 uppercase tracking-widest">
                Station Routing Active
              </span>
            </div>
            <p className="text-xs text-sage mt-0.5">
              Live kitchen throughput, ticket urgency monitoring, and line coordination.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setSoundEnabled((v) => !v)}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-forest hover:bg-forest-light text-cream text-xs font-semibold flex items-center gap-2 border border-forest-light transition"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-gold" />
            ) : (
              <VolumeX className="w-4 h-4 text-brandText-muted" />
            )}
            <span className="hidden sm:inline">{soundEnabled ? 'Chime Active' : 'Muted'}</span>
          </button>

          <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
            {activeTickets.length} ACTIVE {activeTickets.length === 1 ? 'TICKET' : 'TICKETS'}
          </span>
        </div>
      </div>

      {/* Kitchen Station Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-pastel shadow-soft-sm">
          {stations.map((st) => {
            const count = rawActiveTickets.filter((t) =>
              st.id === 'all'
                ? true
                : t.items.some((i) => getItemStation(i.name) === st.id)
            ).length;

            return (
              <button
                key={st.id}
                onClick={() => setSelectedStation(st.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedStation === st.id
                    ? 'bg-forest text-gold shadow-soft'
                    : 'text-brandText hover:bg-pastel/60'
                }`}
              >
                <span>{st.name}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                    selectedStation === st.id
                      ? 'bg-gold/20 text-cream'
                      : 'bg-bgLight text-brandText-muted'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Kitchen Ticket Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTickets.length === 0 ? (
          <div className="col-span-full p-16 text-center bg-white rounded-3xl border border-pastel">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h3 className="font-playfair text-xl font-bold text-brandText">
              Station Rail Clear!
            </h3>
            <p className="text-xs text-brandText-muted mt-1">
              No pending orders for {stations.find((s) => s.id === selectedStation)?.name}. All dishes prepared.
            </p>
          </div>
        ) : (
          activeTickets.map((ticket) => {
            const isHighPriority = ticket.kitchenPriority === 'high';
            const isCooking = ticket.status === 'preparing';

            // Filter items relevant to selected station if not 'all'
            const displayItems =
              selectedStation === 'all'
                ? ticket.items
                : ticket.items.filter(
                    (it) => getItemStation(it.name) === selectedStation
                  );

            return (
              <div
                key={ticket.id}
                className={`rounded-3xl border-2 flex flex-col justify-between overflow-hidden shadow-soft transition-all ${
                  isHighPriority
                    ? 'border-red-400 bg-red-50/20'
                    : isCooking
                    ? 'border-amber-400/80 bg-amber-50/20'
                    : 'border-forest/20 bg-white'
                }`}
              >
                {/* Ticket Top Banner */}
                <div
                  className={`p-4 border-b flex items-center justify-between ${
                    isHighPriority
                      ? 'bg-red-600 text-white'
                      : isCooking
                      ? 'bg-amber-600 text-white'
                      : 'bg-forest text-cream'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-playfair font-bold text-lg">
                      #{ticket.id}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-forest-dark uppercase">
                      {ticket.tableName || `Table ${ticket.tableId || '01'}`}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-black/20 text-cream uppercase">
                      {ticket.type || 'Dine-In'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    <span>
                      {ticket.createdAt
                        ? new Date(ticket.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : '12:45 PM'}
                    </span>
                  </div>
                </div>

                {/* Ticket Items List */}
                <div className="p-5 flex-1 space-y-4">
                  {isHighPriority && (
                    <div className="px-3 py-1.5 rounded-xl bg-red-100 text-red-900 text-xs font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>RUSH SERVICE • Priority Guest Table</span>
                    </div>
                  )}

                  <div className="space-y-3">
                    {displayItems.map((item, idx) => {
                      const itemStation = getItemStation(item.name);

                      return (
                        <div
                          key={idx}
                          className="pb-2.5 border-b border-pastel/40 last:border-0 last:pb-0"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-lg bg-forest text-cream flex items-center justify-center font-bold text-xs shrink-0 font-dmsans">
                                {item.quantity}
                              </span>
                              <span className="font-playfair font-bold text-brandText text-sm leading-tight">
                                {item.name}
                              </span>
                            </div>

                            <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-pastel/60 text-forest shrink-0">
                              {itemStation}
                            </span>
                          </div>

                          {item.customizations && (
                            <div className="text-[11px] text-amber-900 bg-amber-50 px-2 py-1 rounded-md mt-1.5 border border-amber-200">
                              <strong>Pref:</strong>{' '}
                              {typeof item.customizations === 'string'
                                ? item.customizations
                                : Object.entries(item.customizations)
                                    .map(([k, v]) => `${k}: ${v}`)
                                    .join(' • ')}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {ticket.notes && ticket.notes !== 'None' && (
                    <div className="p-2.5 rounded-xl bg-pastel/40 text-xs text-forest border border-pastel">
                      <strong>Chef Instructions:</strong> {ticket.notes}
                    </div>
                  )}
                </div>

                {/* Ticket Action Buttons */}
                <div className="p-4 bg-bgLight border-t border-pastel/60 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-brandText-muted">
                    {isCooking ? '🔥 Firing on Line' : '⏳ Queued'}
                  </span>

                  <div className="flex items-center gap-2">
                    {!isCooking && (
                      <button
                        onClick={() => handleStartCooking(ticket.id)}
                        className="px-3.5 py-2 rounded-xl bg-forest hover:bg-forest-dark text-cream font-bold text-xs flex items-center gap-1.5 transition"
                      >
                        <Play className="w-3.5 h-3.5 text-gold" />
                        <span>Start Cooking</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleMarkReady(ticket.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-cream font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-soft transition"
                    >
                      <Flame className="w-4 h-4 text-amber-300" />
                      <span>Ready & Plated</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Ready Plating Counter Section */}
      {readyTickets.length > 0 && (
        <div className="p-6 rounded-3xl bg-white border border-pastel shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-pastel pb-3">
            <h3 className="font-playfair text-lg font-bold text-brandText flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Ready for Floor Captain Pickup ({readyTickets.length})</span>
            </h3>
            <span className="text-xs text-brandText-muted">
              Plated and waiting at pickup pass
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {readyTickets.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs flex items-center justify-between shadow-soft-sm"
              >
                <div>
                  <p className="font-bold text-emerald-950 font-playfair text-sm">
                    #{t.id} • {t.tableName || `Table ${t.tableId || '01'}`}
                  </p>
                  <p className="text-emerald-800 text-[11px] mt-0.5">
                    {t.items.length} items ready • Plated
                  </p>
                </div>

                <button
                  onClick={() => handleMarkServed(t.id)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-700 text-cream font-bold hover:bg-emerald-800 transition shadow-soft-sm flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cream" />
                  <span>Mark Served</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
