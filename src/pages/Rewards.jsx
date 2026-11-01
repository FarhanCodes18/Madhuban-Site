import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Sparkles,
  Gift,
  Crown,
  CheckCircle2,
  Calendar,
  Share2,
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';
import { rewardsTiers, rewardsVouchers } from '../data/operationsData';
import { useLanguage } from '../context/LanguageContext';
import confetti from 'canvas-confetti';

export default function Rewards() {
  const { currentUser, redeemVoucher } = useDemoRestaurant();
  const { t } = useLanguage();

  const userPoints = currentUser?.loyaltyPoints || 680;
  const currentTier = currentUser?.tier || 'Gold Patron';

  const handleRedeem = (voucher) => {
    const success = redeemVoucher(voucher);
    if (success) {
      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-bgLight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-forest-dark text-cream shadow-forest-glow border border-gold/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-gold/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest text-gold text-xs font-bold uppercase tracking-wider border border-gold/30">
                <Crown className="w-3.5 h-3.5" /> {t('rewardsTitle')}
              </span>
              <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Dine Generously, Earn Elegantly.
              </h1>
              <p className="text-sage text-sm sm:text-base leading-relaxed max-w-xl">
                Earn 1 Dining Point for every ₹10 spent across dine-in, smart QR table orders, and banquet celebrations. Redeem points for signature desserts, cash discounts, and chef tastings.
              </p>
            </div>

            {/* Current Balance Card */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-forest text-cream border border-gold/40 shadow-soft-lg space-y-4 text-center">
              <span className="text-xs uppercase tracking-widest text-gold font-bold block">
                {t('pointsBalance')}
              </span>
              <div className="font-playfair text-5xl font-extrabold text-cream flex items-center justify-center gap-2">
                <Sparkles className="w-8 h-8 text-gold" />
                <span>{userPoints}</span>
              </div>
              <p className="text-xs text-sage font-medium">
                Current Tier: <strong className="text-gold font-playfair">{currentTier}</strong>
              </p>

              <div className="w-full bg-forest-light rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gold h-full rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(100, (userPoints / 1500) * 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-sage-light">
                {1500 - userPoints > 0 ? `${1500 - userPoints} points to Platinum Connoisseur` : 'Top Tier Achieved!'}
              </p>
            </div>
          </div>
        </div>

        {/* Membership Tiers Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-playfair text-3xl font-bold text-brandText">
              Membership Tiers & Royal Privileges
            </h2>
            <p className="text-xs text-brandText-muted">
              Higher tiers unlock accelerated points multipliers, private tasting invitations, and reserved seating.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewardsTiers.map((tier) => {
              const isCurrent = tier.name === currentTier;

              return (
                <div
                  key={tier.name}
                  className={`p-6 rounded-3xl border transition shadow-soft flex flex-col justify-between space-y-4 ${
                    isCurrent
                      ? 'bg-cream border-gold shadow-gold-glow relative ring-2 ring-gold/40'
                      : 'bg-white border-pastel'
                  }`}
                >
                  <div>
                    {isCurrent && (
                      <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-gold text-forest-dark font-bold text-[10px] uppercase tracking-wider">
                        Your Current Tier
                      </span>
                    )}

                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-playfair font-bold text-lg text-brandText">
                        {tier.name}
                      </h3>
                      <span className="text-xs font-mono font-bold text-forest bg-pastel px-2 py-0.5 rounded-lg">
                        {tier.multiplier}
                      </span>
                    </div>

                    <p className="text-xs text-brandText-muted mb-4">
                      {tier.minPoints === 0 ? 'Entry level' : `Requires ${tier.minPoints}+ points`}
                    </p>

                    <ul className="space-y-2 text-xs text-brandText-muted">
                      {tier.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-forest shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Redeemable Rewards Catalog */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-brandText">
                {t('redeemRewards')}
              </h2>
              <p className="text-xs text-brandText-muted mt-1">
                Exchange your dining points for instant discounts and complimentary culinary treats.
              </p>
            </div>

            <span className="text-xs font-semibold text-forest bg-white px-3.5 py-1.5 rounded-full border border-pastel">
              Your Available Balance: <strong className="font-dmsans text-sm">{userPoints} pts</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewardsVouchers.map((voucher) => {
              const canAfford = userPoints >= voucher.pointsCost;

              return (
                <div
                  key={voucher.id}
                  className="p-6 rounded-3xl bg-white border border-pastel shadow-soft-sm flex flex-col justify-between space-y-4 hover:border-gold/60 transition"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark bg-amber-50 px-2 py-0.5 rounded-md inline-block">
                      {voucher.category}
                    </span>
                    <h3 className="font-playfair font-bold text-lg text-brandText leading-snug">
                      {voucher.title}
                    </h3>
                    <p className="text-xs text-forest font-semibold">
                      {voucher.value}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-pastel/60 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-brandText-muted">Cost:</span>
                      <span className="font-bold text-forest font-dmsans">{voucher.pointsCost} Points</span>
                    </div>

                    <button
                      onClick={() => handleRedeem(voucher)}
                      disabled={!canAfford}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition ${
                        canAfford
                          ? 'bg-forest hover:bg-forest-dark text-cream shadow-soft'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>{canAfford ? 'Redeem Voucher' : 'Need More Points'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Birthday Reward Banner */}
        <div className="p-8 rounded-3xl bg-cream border-2 border-gold/40 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-gold-dark" />
              <h3 className="font-playfair text-xl font-bold text-brandText">
                Birthday & Anniversary Special Gift
              </h3>
            </div>
            <p className="text-xs text-brandText-muted">
              Registered birthday: <strong className="text-forest">{currentUser?.birthday || '14th August'}</strong>. A complimentary handcrafted dessert platter is automatically added to your table when dining in your birthday month!
            </p>
          </div>

          <button
            onClick={() => alert(`Share your exclusive Madhuban referral link: https://madhuban.com/invite/${currentUser?.name.split(' ')[0].toLowerCase()}`)}
            className="px-6 py-3 rounded-full bg-forest text-cream font-bold text-xs uppercase tracking-wider hover:bg-forest-dark transition shadow-soft flex items-center gap-2 shrink-0"
          >
            <Share2 className="w-4 h-4 text-gold" />
            <span>Invite Friends (+100 Pts)</span>
          </button>
        </div>

      </div>
    </div>
  );
}
