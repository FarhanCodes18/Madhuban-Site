import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Mail, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useDemoRestaurant();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    login(email || 'guest@example.com', name || 'Valued Guest');
    navigate('/profile');
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-bgLight flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-pastel p-8 shadow-soft space-y-6">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-brandText">
            Join the Madhuban Circle
          </h2>
          <p className="text-xs text-brandText-muted">
            Enjoy member-exclusive seasonal tastings and smart QR dining perks.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-brandText mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-forest" /> Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Radhika Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brandText mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-forest" /> Email Address
            </label>
            <input
              type="email"
              required
              placeholder="radhika@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brandText mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-forest" /> Phone Number
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

          <div>
            <label className="block text-xs font-semibold text-brandText mb-1 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-forest" /> Password
            </label>
            <input
              type="password"
              required
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-forest hover:bg-forest-dark text-cream font-bold text-xs uppercase tracking-wider shadow-forest-glow flex items-center justify-center gap-2 transition"
          >
            <span>Complete Registration</span>
            <ArrowRight className="w-4 h-4 text-gold" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-brandText-muted">
          <span>Already registered? </span>
          <Link to="/login" className="text-forest font-bold hover:underline">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}
