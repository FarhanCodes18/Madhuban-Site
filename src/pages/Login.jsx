import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';

export default function Login() {
  const [email, setEmail] = useState('rohan.singhal@example.com');
  const [password, setPassword] = useState('madhuban123');
  const { login } = useDemoRestaurant();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, 'Rohan Singhal');
    navigate('/profile');
  };

  const handleDemoSignIn = () => {
    login('rohan.singhal@example.com', 'Rohan Singhal');
    navigate('/profile');
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-bgLight flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-pastel p-8 shadow-soft space-y-6">
        
        {/* Brand Emblem */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-forest text-gold mx-auto flex items-center justify-center shadow-forest-glow border border-gold/40">
            <svg className="w-7 h-7" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 15 C30 35 20 55 50 85 C80 55 70 35 50 15 Z" fill="#DDE9D5" />
              <circle cx="50" cy="50" r="10" fill="#C6A45C" />
            </svg>
          </div>
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-brandText">
            Welcome to Madhuban
          </h2>
          <p className="text-xs text-brandText-muted">
            Access your dining rewards, smart orders, and private tasting bookings.
          </p>
        </div>

        {/* Demo Fast Login Pill */}
        <button
          onClick={handleDemoSignIn}
          className="w-full py-2.5 px-4 rounded-2xl bg-pastel/70 hover:bg-pastel border border-forest/20 text-forest text-xs font-bold flex items-center justify-center gap-2 transition"
        >
          <Sparkles className="w-4 h-4 text-gold-dark" />
          <span>One-Click Demo Guest Login (Rohan Singhal)</span>
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-brandText mb-1.5 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-forest" /> Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-brandText flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-forest" /> Password
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Demo password reset link simulated to ' + email); }} className="text-[11px] text-forest hover:underline font-semibold">
                Forgot?
              </a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-forest hover:bg-forest-dark text-cream font-bold text-xs uppercase tracking-wider shadow-forest-glow flex items-center justify-center gap-2 transition"
          >
            <span>Sign In to Account</span>
            <ArrowRight className="w-4 h-4 text-gold" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-brandText-muted">
          <span>New to Madhuban? </span>
          <Link to="/register" className="text-forest font-bold hover:underline">
            Create an Account
          </Link>
        </div>

        <p className="text-[10px] text-center text-brandText-light flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-forest" />
          Phase 1 Frontend Demonstration • Secure API link ready for Phase 2
        </p>

      </div>
    </div>
  );
}
