import React from 'react';
import {
  Calendar,
  ArrowUpRight
} from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';

export default function Reports() {
  const { reportsData } = useDemoRestaurant();

  const maxWeekly = Math.max(...reportsData.weeklyTrends.map(d => d.revenue));

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-brandText">
            Financial Analytics & Sales Reports
          </h1>
          <p className="text-xs text-brandText-muted mt-1">
            Weekly revenue breakdowns, average dining ticket value, and menu performance.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-pastel text-xs font-semibold text-brandText">
          <Calendar className="w-3.5 h-3.5 text-forest" />
          <span>Current Week Performance</span>
        </div>
      </div>

      {/* 4 Financial Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-pastel shadow-soft-sm space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brandText-muted">Total Gross Revenue</span>
          <h3 className="font-playfair text-2xl font-bold text-brandText">₹3,90,500</h3>
          <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +14.2% vs previous week
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-pastel shadow-soft-sm space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brandText-muted">Average Ticket Value</span>
          <h3 className="font-playfair text-2xl font-bold text-brandText">₹{reportsData.averageOrderValue}</h3>
          <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +₹120 vs average
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-pastel shadow-soft-sm space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brandText-muted">Weekly Orders</span>
          <h3 className="font-playfair text-2xl font-bold text-brandText">334 Orders</h3>
          <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> 88% Dine-in QR sessions
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-pastel shadow-soft-sm space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brandText-muted">Top Revenue Cuisine</span>
          <h3 className="font-playfair text-2xl font-bold text-forest">Royal Indian</h3>
          <p className="text-[11px] text-brandText-muted font-medium">
            ₹1,82,400 (46.7% share)
          </p>
        </div>
      </div>

      {/* 2-Column: Weekly Sales Graph & Bestselling Delicacies */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Weekly Revenue Trends Chart (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-pastel shadow-soft space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-playfair text-lg font-bold text-brandText">
                Weekly Revenue Progression
              </h3>
              <p className="text-xs text-brandText-muted">
                Strong weekend spikes driven by family feasts & dinner bookings
              </p>
            </div>
            <span className="text-xs font-bold text-forest bg-pastel px-3 py-1 rounded-full">
              7-Day Total: ₹3,90,500
            </span>
          </div>

          <div className="h-64 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-pastel/60">
            {reportsData.weeklyTrends.map((d, idx) => {
              const heightPct = Math.round((d.revenue / maxWeekly) * 100);
              const isWeekend = d.day === 'Sat' || d.day === 'Sun';

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                  {/* Tooltip */}
                  <div className="absolute -top-12 bg-forest text-cream text-[10px] py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap shadow-soft z-10 font-mono">
                    ₹{d.revenue.toLocaleString()} ({d.orders} orders)
                  </div>

                  <div className="w-full max-w-[48px] bg-pastel-light rounded-t-2xl overflow-hidden h-48 flex items-end">
                    <div
                      className={`w-full transition-all duration-500 rounded-t-2xl ${
                        isWeekend ? 'bg-forest group-hover:bg-gold' : 'bg-forest/70 group-hover:bg-forest'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>

                  <span className="text-xs font-bold font-dmsans text-brandText">
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-brandText-muted">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-forest" /> Weekend Peaks (Sat & Sun)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-forest/70" /> Weekday Normal
            </span>
          </div>
        </div>

        {/* Top 5 Bestselling Dishes (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-pastel shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-playfair text-lg font-bold text-brandText">
              Top 5 Bestselling Dishes
            </h3>
            <span className="text-xs text-brandText-muted">By Units Sold</span>
          </div>

          <div className="space-y-4 pt-2">
            {reportsData.bestsellingList.map((dish, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-playfair font-bold text-brandText">
                    {i + 1}. {dish.name}
                  </span>
                  <span className="font-dmsans font-bold text-forest">
                    ₹{dish.revenue.toLocaleString()}
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-pastel/40 overflow-hidden">
                  <div
                    className="h-full bg-forest rounded-full"
                    style={{ width: `${(dish.count / 34) * 100}%` }}
                  />
                </div>

                <div className="flex justify-between text-[10px] text-brandText-muted">
                  <span>{dish.count} orders fulfilled</span>
                  <span>Avg ₹{Math.round(dish.revenue / dish.count)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
