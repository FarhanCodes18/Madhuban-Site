import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Navigation,
  Phone,
  Clock,
  CheckCircle2,
  Package,
  ShoppingBag,
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Bike
} from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';

export default function DeliveryTracking() {
  const { orderId } = useParams();
  const { orders } = useDemoRestaurant();

  const order = orders.find(o => o.id === orderId) || orders[0];

  const deliverySteps = [
    { title: 'Order Accepted & Packed', time: '19:42', status: 'done' },
    { title: 'Picked up by Valet Concierge', time: '19:55', status: 'done' },
    { title: 'Out for Gourmet Delivery', time: '20:05', status: 'active' },
    { title: 'Arrived at Destination', time: 'Est. 20:20', status: 'pending' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-bgLight">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link
          to="/profile"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Account Orders</span>
        </Link>

        {/* Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-forest text-cream shadow-forest-glow flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[10px] text-gold uppercase tracking-widest font-bold">
              Gourmet Takeaway & Doorstep Delivery
            </span>
            <h1 className="font-playfair text-2xl sm:text-3xl font-bold">
              Tracking Order #{order?.id || 'MB-8919'}
            </h1>
            <p className="text-xs text-sage">
              Estimated Delivery in <strong className="text-cream font-mono">14 minutes</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-forest-light border border-gold/30 flex items-center justify-center text-gold">
              <Bike className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <p className="text-xs font-bold text-cream">Rider: Amit K. (Madhuban Fleet)</p>
              <p className="text-[11px] text-sage">+91 98200 88123 • Thermal Bag Pack</p>
            </div>
          </div>
        </div>

        {/* 2-Column: Map Visualization & Step Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Simulated Map Visual (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-pastel shadow-soft space-y-4">
            <div className="relative h-72 rounded-2xl bg-gradient-to-tr from-pastel via-cream to-pastel-dark flex items-center justify-center border border-pastel overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#cadbbf_1px,transparent_1px),linear-gradient(to_bottom,#cadbbf_1px,transparent_1px)] bg-[size:28px_28px] opacity-40" />

              {/* Simulated Route Arc */}
              <div className="relative z-10 flex items-center justify-between w-4/5">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-forest text-gold flex items-center justify-center shadow-forest-glow">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-forest mt-1">Madhuban Estate</span>
                </div>

                <div className="flex-1 mx-4 border-t-2 border-dashed border-forest flex items-center justify-center relative">
                  <div className="absolute -top-3 w-6 h-6 rounded-full bg-gold text-forest-dark flex items-center justify-center shadow-md animate-pulse">
                    <Bike className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-cream text-forest border-2 border-forest flex items-center justify-center shadow-soft">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-brandText mt-1">Delivery Address</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-bgLight rounded-2xl flex items-center justify-between text-xs text-brandText-muted">
              <span>Destination: B-402, Magnolia Orchards, Green Valley Road</span>
              <a href="tel:+919820088123" className="text-forest font-bold hover:underline flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> Call Rider
              </a>
            </div>
          </div>

          {/* Steps Timeline (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-pastel shadow-soft space-y-5">
            <h3 className="font-playfair text-lg font-bold text-brandText border-b border-pastel pb-3">
              Delivery Milestones
            </h3>

            <div className="space-y-4">
              {deliverySteps.map((step, idx) => {
                const isDone = step.status === 'done';
                const isActive = step.status === 'active';

                return (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      isDone
                        ? 'bg-forest text-cream'
                        : isActive
                        ? 'bg-gold text-forest-dark ring-4 ring-gold/30 animate-pulse'
                        : 'bg-pastel/40 text-brandText-light'
                    }`}>
                      {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>

                    <div className="flex-1 pt-1">
                      <div className="flex items-center justify-between">
                        <p className={`text-xs font-bold leading-tight ${isActive ? 'text-forest' : 'text-brandText'}`}>
                          {step.title}
                        </p>
                        <span className="text-[10px] font-mono text-brandText-muted">{step.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Items Summary */}
            {order && (
              <div className="pt-4 border-t border-pastel/60 space-y-2 text-xs">
                <p className="font-bold text-brandText">Package Contents:</p>
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-brandText-muted">
                    <span>{item.quantity}x {item.name}</span>
                    <span className="font-dmsans font-bold text-forest">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
