import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Award,
  Users,
  Clock,
  Layers,
  Percent,
  CheckCircle2
} from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';

export default function Analytics() {
  const { reportsData, expenses } = useDemoRestaurant();
  const [timeRange, setTimeRange] = useState('7d');

  const totalExpense = expenses.reduce((acc, e) => acc + e.amount, 0);
  const estimatedRevenue = timeRange === 'today' ? reportsData.todayRevenue : timeRange === '7d' ? 390500 : 1580000;
  const estimatedProfit = estimatedRevenue - (timeRange === 'today' ? Math.round(totalExpense / 7) : totalExpense);
  const foodCostPercentage = 28.6;

  const profitableDishes = [
    { name: 'Kashmiri Saffron & Pistachio Shake', price: 290, foodCost: 65, margin: '77.5%', units: 165 },
    { name: 'Madhuban Royal Paneer Makhani', price: 460, foodCost: 110, margin: '76.1%', units: 280 },
    { name: 'Truffle & Wild Mushroom Pizza', price: 560, foodCost: 145, margin: '74.1%', units: 210 },
    { name: 'Golden Saffron Rasmalai Tres Leches', price: 340, foodCost: 90, margin: '73.5%', units: 220 },
    { name: 'Botanical Hibiscus Lemongrass Cooler', price: 240, foodCost: 45, margin: '81.2%', units: 195 }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-brandText flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-forest" />
            <span>Executive Business Analytics & P&L Intelligence</span>
          </h1>
          <p className="text-xs text-brandText-muted mt-1">
            Real-time margin telemetry, food cost percentages, table utilization, and retention rates.
          </p>
        </div>

        {/* Date Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-pastel text-xs font-semibold">
          {[
            { id: 'today', label: 'Today' },
            { id: '7d', label: 'Last 7 Days' },
            { id: '30d', label: 'Last 30 Days' }
          ].map(r => (
            <button
              key={r.id}
              onClick={() => setTimeRange(r.id)}
              className={`px-3 py-1.5 rounded-xl transition ${
                timeRange === r.id ? 'bg-forest text-cream font-bold' : 'text-brandText hover:bg-pastel'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Core Financial KPI Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-3xl bg-white border border-pastel shadow-soft-sm space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brandText-muted">Total Gross Revenue</span>
          <h3 className="font-playfair text-3xl font-bold text-brandText">₹{estimatedRevenue.toLocaleString()}</h3>
          <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +14.8% vs previous period
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-pastel shadow-soft-sm space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brandText-muted">Estimated Net Profit</span>
          <h3 className="font-playfair text-3xl font-bold text-forest">₹{estimatedProfit.toLocaleString()}</h3>
          <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> 74.2% Gross Operating Margin
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-pastel shadow-soft-sm space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brandText-muted">Food Cost Target</span>
          <h3 className="font-playfair text-3xl font-bold text-brandText">{foodCostPercentage}%</h3>
          <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Well within 30% luxury benchmark
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-pastel shadow-soft-sm space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brandText-muted">Guest Retention Rate</span>
          <h3 className="font-playfair text-3xl font-bold text-gold-dark">68.4%</h3>
          <p className="text-[11px] text-brandText-muted">Return patrons within 30 days</p>
        </div>
      </div>

      {/* 2-Column: High Margin Dishes & Floor Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Most Profitable Dishes (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-pastel shadow-soft space-y-5">
          <div className="flex items-center justify-between border-b border-pastel pb-3">
            <div>
              <h3 className="font-playfair font-bold text-lg text-brandText">
                Most Profitable Culinary Creations
              </h3>
              <p className="text-xs text-brandText-muted">Ranked by gross contribution margin</p>
            </div>
            <span className="text-xs font-bold text-forest bg-pastel px-3 py-1 rounded-full">
              High Yield Items
            </span>
          </div>

          <div className="space-y-4">
            {profitableDishes.map((dish, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-bgLight border border-pastel flex items-center justify-between gap-4 text-xs">
                <div>
                  <h4 className="font-playfair font-bold text-brandText text-sm">{dish.name}</h4>
                  <p className="text-[11px] text-brandText-muted">Selling Price: ₹{dish.price} • Raw Food Cost: ₹{dish.foodCost}</p>
                </div>

                <div className="text-right">
                  <span className="font-mono font-bold text-forest text-sm block">{dish.margin} Margin</span>
                  <span className="text-[10px] text-brandText-light">{dish.units} units sold</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Ratios & Floor Telemetry (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-pastel shadow-soft space-y-4">
            <h3 className="font-playfair font-bold text-lg text-brandText border-b border-pastel pb-3">
              Operational Floor Metrics
            </h3>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Table Turnover Efficiency</span>
                  <span className="text-forest font-bold">54 Mins / Seating</span>
                </div>
                <div className="w-full bg-pastel/50 h-2 rounded-full overflow-hidden">
                  <div className="bg-forest h-full rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Peak Evening Table Utilization</span>
                  <span className="text-forest font-bold">92.4%</span>
                </div>
                <div className="w-full bg-pastel/50 h-2 rounded-full overflow-hidden">
                  <div className="bg-gold h-full rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Contactless QR Order Adoption</span>
                  <span className="text-forest font-bold">88.2% of Dine-in</span>
                </div>
                <div className="w-full bg-pastel/50 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '88%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Floor Captain Service Response</span>
                  <span className="text-forest font-bold">&lt; 90 Seconds</span>
                </div>
                <div className="w-full bg-pastel/50 h-2 rounded-full overflow-hidden">
                  <div className="bg-forest h-full rounded-full" style={{ width: '95%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-forest text-cream shadow-forest-glow space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <h4 className="font-playfair font-bold text-base">Executive Chef Commentary</h4>
            </div>
            <p className="text-xs text-sage leading-relaxed">
              "Transition to seasonal A2 Gir cow ghee and direct farm basmati has reduced ingredient wastage by 14%, while guest dessert order attachments rose to 41%."
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
