import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Plus,
  Trash2,
  Share2,
  UtensilsCrossed,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Check,
  UserPlus
} from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

export default function GroupOrdering() {
  const { dishes, currentUser, showToast } = useDemoRestaurant();
  const { addToCart, openCart } = useCart();
  const navigate = useNavigate();

  const [sessionCode] = useState('MADHU-894');
  const [participants, setParticipants] = useState([
    { id: 'p-1', name: currentUser?.name || 'Rohan (Host)', isHost: true },
    { id: 'p-2', name: 'Ananya S.', isHost: false },
    { id: 'p-3', name: 'Kunal Deshmukh', isHost: false }
  ]);
  const [newParticipantName, setNewParticipantName] = useState('');

  const [groupItems, setGroupItems] = useState([
    { id: 'gi-1', participantId: 'p-1', participantName: currentUser?.name || 'Rohan (Host)', dishId: 'mb-01', name: 'Madhuban Royal Paneer Makhani', price: 460, quantity: 1 },
    { id: 'gi-2', participantId: 'p-2', participantName: 'Ananya S.', dishId: 'mb-07', name: 'Truffle & Wild Mushroom Wood-Fired Pizza', price: 560, quantity: 1 },
    { id: 'gi-3', participantId: 'p-3', participantName: 'Kunal Deshmukh', dishId: 'mb-03', name: 'Subz Dum Handi Biryani', price: 440, quantity: 1 },
    { id: 'gi-4', participantId: 'p-1', participantName: currentUser?.name || 'Rohan (Host)', dishId: 'mb-21', name: 'Golden Saffron Rasmalai Tres Leches', price: 340, quantity: 2 }
  ]);

  const [selectedParticipantForAdd, setSelectedParticipantForAdd] = useState('p-1');
  const [selectedDishId, setSelectedDishId] = useState('mb-02');

  const addParticipant = (e) => {
    e.preventDefault();
    if (!newParticipantName.trim()) return;
    const newP = {
      id: `p-${Date.now()}`,
      name: newParticipantName.trim(),
      isHost: false
    };
    setParticipants(prev => [...prev, newP]);
    setNewParticipantName('');
    showToast(`Added ${newP.name} to the group session!`, 'success');
  };

  const addItemToGroup = () => {
    const dish = dishes.find(d => d.id === selectedDishId);
    const participant = participants.find(p => p.id === selectedParticipantForAdd);
    if (!dish || !participant) return;

    setGroupItems(prev => [
      ...prev,
      {
        id: `gi-${Date.now()}`,
        participantId: participant.id,
        participantName: participant.name,
        dishId: dish.id,
        name: dish.name,
        price: dish.price,
        quantity: 1
      }
    ]);

    showToast(`Added ${dish.name} for ${participant.name}`, 'info');
  };

  const removeItem = (id) => {
    setGroupItems(prev => prev.filter(i => i.id !== id));
  };

  const totalCombined = groupItems.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const transferAllToCart = () => {
    groupItems.forEach(item => {
      const dish = dishes.find(d => d.id === item.dishId);
      if (dish) {
        addToCart(dish, item.quantity, { OrderedFor: item.participantName });
      }
    });

    confetti({
      particleCount: 90,
      spread: 60,
      origin: { y: 0.6 }
    });

    showToast('Transferred all group items to feast cart!', 'success');
    openCart();
    navigate('/cart');
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-bgLight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="p-8 rounded-3xl bg-forest text-cream shadow-forest-glow flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold block">
              Multi-Diner Synchronization
            </span>
            <h1 className="font-playfair text-2xl sm:text-3xl font-bold">
              Shared Dining Cart • Session #{sessionCode}
            </h1>
            <p className="text-xs text-sage">
              Friends and family can select dishes simultaneously from their own devices.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                navigator.clipboard.writeText(`https://madhuban.com/group/${sessionCode}`);
                showToast('Invite link copied to clipboard!', 'success');
              }}
              className="px-4 py-2.5 rounded-xl bg-forest-light hover:bg-forest text-cream text-xs font-bold flex items-center gap-2 border border-gold/30 transition"
            >
              <Share2 className="w-4 h-4 text-gold" />
              <span>Share Invite Link</span>
            </button>
          </div>
        </div>

        {/* 2-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Participants & Add Dish Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Participants Panel */}
            <div className="p-6 rounded-3xl bg-white border border-pastel shadow-soft space-y-4">
              <h3 className="font-playfair font-bold text-lg text-brandText flex items-center justify-between">
                <span>Dine-in Party ({participants.length})</span>
                <Users className="w-4 h-4 text-forest" />
              </h3>

              <div className="space-y-2">
                {participants.map((p) => {
                  const pItems = groupItems.filter(i => i.participantId === p.id);
                  const pSubtotal = pItems.reduce((acc, i) => acc + i.price * i.quantity, 0);

                  return (
                    <div
                      key={p.id}
                      className="p-3 rounded-2xl bg-bgLight border border-pastel flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-forest text-cream flex items-center justify-center font-bold text-[10px]">
                          {p.name.charAt(0)}
                        </span>
                        <div>
                          <p className="font-bold text-brandText">{p.name}</p>
                          <p className="text-[11px] text-brandText-muted">{pItems.length} delicacies chosen</p>
                        </div>
                      </div>
                      <span className="font-bold text-forest font-dmsans">₹{pSubtotal}</span>
                    </div>
                  );
                })}
              </div>

              {/* Add Participant Input */}
              <form onSubmit={addParticipant} className="pt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Add friend's name..."
                  value={newParticipantName}
                  onChange={(e) => setNewParticipantName(e.target.value)}
                  className="flex-1 text-xs p-2.5 rounded-xl border border-pastel bg-white focus:outline-none focus:border-forest"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-forest text-cream text-xs font-bold hover:bg-forest-dark transition"
                >
                  <UserPlus className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Quick Add Dish to Participant */}
            <div className="p-6 rounded-3xl bg-cream border border-pastel shadow-soft space-y-4">
              <h3 className="font-playfair font-bold text-base text-brandText">
                Add Dish for Diner
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-brandText-muted mb-1 font-semibold">Select Diner</label>
                  <select
                    value={selectedParticipantForAdd}
                    onChange={(e) => setSelectedParticipantForAdd(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-pastel bg-white font-medium"
                  >
                    {participants.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-brandText-muted mb-1 font-semibold">Select Dish</label>
                  <select
                    value={selectedDishId}
                    onChange={(e) => setSelectedDishId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-pastel bg-white font-medium"
                  >
                    {dishes.map(d => (
                      <option key={d.id} value={d.id}>{d.name} (₹{d.price})</option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={addItemToGroup}
                  className="w-full py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-cream font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4 text-gold" />
                  <span>Add to Group Order</span>
                </button>
              </div>
            </div>

          </div>

          {/* Group Items Rail & Summary (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-pastel shadow-soft space-y-6">
            <div className="flex items-center justify-between border-b border-pastel pb-4">
              <h3 className="font-playfair font-bold text-xl text-brandText">
                Combined Shared Items ({groupItems.length})
              </h3>
              <span className="font-dmsans text-lg font-bold text-forest">
                Total: ₹{totalCombined}
              </span>
            </div>

            <div className="divide-y divide-pastel/40">
              {groupItems.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-playfair font-semibold text-brandText text-sm">
                        {item.name}
                      </span>
                      <span className="text-[10px] bg-pastel/70 text-forest font-semibold px-2 py-0.5 rounded-md">
                        For {item.participantName}
                      </span>
                    </div>
                    <span className="text-xs text-brandText-muted">₹{item.price} each</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-forest font-dmsans text-sm">
                      ₹{item.price * item.quantity}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-brandText-light hover:text-red-600 p-1 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Transfer / Checkout Button */}
            <div className="pt-4 border-t border-pastel space-y-3">
              <button
                onClick={transferAllToCart}
                className="w-full py-4 rounded-2xl bg-forest hover:bg-forest-dark text-cream font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-forest-glow transition"
              >
                <span>Checkout Combined Order • ₹{totalCombined}</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </button>
              <p className="text-[11px] text-center text-brandText-muted">
                Each participant's name will be tagged on kitchen prep tickets.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
