import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  ShoppingBag,
  Calendar,
  Heart,
  MapPin,
  LogOut,
  Award,
  ArrowRight,
  RotateCcw,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import FoodCard from '../components/menu/FoodCard';
import FoodDetailModal from '../components/menu/FoodDetailModal';
import FeedbackModal from '../components/common/FeedbackModal';

export default function CustomerProfile() {
  const { currentUser, logout, orders, reservations, dishes, showToast } = useDemoRestaurant();
  const { wishlistIds } = useWishlist();
  const { addToCart, openCart } = useCart();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders'); // orders, reservations, wishlist, addresses
  const [selectedDish, setSelectedDish] = useState(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const handleReorder = (order) => {
    order.items.forEach(item => {
      const match = dishes.find(d => d.id === item.id) || {
        id: item.id,
        name: item.name,
        price: item.price,
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800&auto=format&fit=crop',
        isVeg: true,
        category: 'main-course'
      };
      addToCart(match, item.quantity, { ReorderNote: 'Favorite Repeat' });
    });
    showToast(`Loaded items from Order #${order.id} into your cart!`, 'success');
    openCart();
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen pt-36 pb-24 bg-bgLight flex items-center justify-center px-4">
        <div className="text-center max-w-md p-8 bg-cream rounded-3xl border border-pastel shadow-soft space-y-4">
          <div className="w-16 h-16 rounded-full bg-forest text-cream mx-auto flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <h2 className="font-playfair text-2xl font-bold text-brandText">Account Sign In Required</h2>
          <p className="text-xs text-brandText-muted">
            Please log in to review your dining history, active table orders, and saved wishlist.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/login"
              className="px-6 py-2.5 rounded-full bg-forest text-cream font-bold text-xs hover:bg-forest-dark transition"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-6 py-2.5 rounded-full bg-cream border border-forest text-forest font-bold text-xs hover:bg-pastel transition"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Find wishlist dishes
  const wishlistDishes = dishes.filter(d => wishlistIds.includes(d.id));

  return (
    <div className="min-h-screen pt-28 pb-24 bg-bgLight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Card Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-forest text-cream shadow-forest-glow mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-gold shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-playfair text-2xl sm:text-3xl font-bold">
                  {currentUser.name}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gold text-forest-dark font-sans">
                  {currentUser.tier}
                </span>
              </div>
              <p className="text-xs text-sage mt-1">
                {currentUser.email} • {currentUser.phone}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs">
                <span className="flex items-center gap-1 text-gold font-semibold">
                  <Award className="w-3.5 h-3.5" />
                  {currentUser.loyaltyPoints} Dining Points
                </span>
                <Link to="/rewards" className="text-pastel hover:underline text-[11px] font-semibold">
                  View Club Privileges →
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="px-4 py-2.5 rounded-full bg-gold hover:bg-gold-light text-forest-dark font-bold text-xs flex items-center gap-1.5 transition shadow-soft"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Share Review</span>
            </button>

            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="px-4 py-2.5 rounded-full bg-forest-light border border-forest-light hover:bg-red-950/40 text-cream text-xs font-bold flex items-center gap-1.5 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Profile Navigation Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar py-2">
          {[
            { id: 'orders', label: 'Order History', icon: ShoppingBag, count: orders.length },
            { id: 'reservations', label: 'Table Reservations', icon: Calendar, count: reservations.length },
            { id: 'wishlist', label: 'Saved Wishlist', icon: Heart, count: wishlistDishes.length },
            { id: 'addresses', label: 'Saved Delivery Addresses', icon: MapPin, count: currentUser.savedAddresses.length }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap border ${
                  isSelected
                    ? 'bg-forest text-cream border-forest shadow-soft'
                    : 'bg-white text-brandText border-pastel hover:bg-pastel/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-gold' : 'text-forest'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-forest-light text-gold' : 'bg-pastel text-forest'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Orders History */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-5 sm:p-6 rounded-3xl bg-white border border-pastel shadow-soft-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-playfair font-bold text-brandText text-lg">
                      Order #{order.id}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      order.status === 'ready' || order.status === 'served'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.status.toUpperCase()}
                    </span>
                    <span className="text-xs text-brandText-muted">
                      {order.orderType}
                    </span>
                  </div>

                  <p className="text-xs text-brandText-muted">
                    {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </p>
                  <p className="text-[11px] text-brandText-light">
                    {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-pastel/40 flex-wrap">
                  <div className="text-right mr-2">
                    <span className="text-[10px] text-brandText-muted block uppercase">Total Paid</span>
                    <span className="font-dmsans text-lg font-bold text-forest">₹{order.total}</span>
                  </div>

                  {/* Smart Reorder Button */}
                  <button
                    onClick={() => handleReorder(order)}
                    className="px-3.5 py-2 rounded-xl bg-pastel hover:bg-pastel/80 text-forest text-xs font-bold flex items-center gap-1.5 transition"
                    title="Quick Reorder these dishes"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-gold-dark" />
                    <span>Order Again</span>
                  </button>

                  <Link
                    to={`/order-tracking/${order.id}`}
                    className="px-3.5 py-2 rounded-xl bg-forest hover:bg-forest-dark text-cream text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <span>Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Reservations */}
        {activeTab === 'reservations' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reservations.map((res) => (
              <div
                key={res.id}
                className="p-6 rounded-3xl bg-white border border-pastel shadow-soft-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-playfair font-bold text-brandText text-base">
                    Booking #{res.id}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                    {res.status}
                  </span>
                </div>

                <div className="text-xs text-brandText-muted space-y-1">
                  <p><strong className="text-brandText">Date & Time:</strong> {res.date} at {res.time}</p>
                  <p><strong className="text-brandText">Party Size:</strong> {res.guests} Guests</p>
                  <p><strong className="text-brandText">Seating:</strong> {res.tableName}</p>
                  <p><strong className="text-brandText">Occasion:</strong> {res.occasion}</p>
                </div>

                {res.specialRequests && (
                  <p className="text-[11px] text-brandText-light italic bg-bgLight p-2.5 rounded-xl border border-pastel/50">
                    "{res.specialRequests}"
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            {wishlistDishes.length === 0 ? (
              <div className="p-12 text-center bg-cream rounded-3xl border border-pastel">
                <Heart className="w-10 h-10 text-brandText-light mx-auto mb-2" />
                <p className="font-playfair font-bold text-lg text-brandText">Your Wishlist is Empty</p>
                <p className="text-xs text-brandText-muted mt-1">Tap the heart on any dish in the menu to save it here.</p>
                <Link to="/menu" className="mt-4 inline-block px-6 py-2 rounded-full bg-forest text-cream text-xs font-bold">
                  Browse Menu
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistDishes.map((dish) => (
                  <FoodCard
                    key={dish.id}
                    dish={dish}
                    onOpenDetail={(d) => setSelectedDish(d)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {currentUser.savedAddresses.map((addr) => (
              <div
                key={addr.id}
                className="p-6 rounded-3xl bg-white border border-pastel shadow-soft-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-playfair font-bold text-brandText text-base flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-forest" />
                    {addr.type}
                  </span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                    Primary
                  </span>
                </div>
                <p className="text-xs text-brandText-muted leading-relaxed">
                  {addr.address}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>

      <FoodDetailModal
        dish={selectedDish}
        isOpen={!!selectedDish}
        onClose={() => setSelectedDish(null)}
      />

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </div>
  );
}
