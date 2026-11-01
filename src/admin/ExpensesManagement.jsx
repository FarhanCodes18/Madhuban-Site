import React, { useState } from 'react';
import {
  DollarSign,
  Plus,
  Calendar,
  PieChart,
  Tag,
  TrendingDown,
  X,
  CreditCard
} from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';

export default function ExpensesManagement() {
  const { expenses, addExpense } = useDemoRestaurant();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExp, setNewExp] = useState({
    category: 'Raw Food & Vegetables',
    title: '',
    amount: ''
  });

  const totalExpense = expenses.reduce((acc, e) => acc + e.amount, 0);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newExp.title || !newExp.amount) return;
    addExpense(newExp);
    setIsModalOpen(false);
    setNewExp({ category: 'Raw Food & Vegetables', title: '', amount: '' });
  };

  const categoriesList = [
    'Raw Food & Vegetables',
    'Dairy & A2 Ghee',
    'Utilities & Gas',
    'Staff Salaries & Incentives',
    'Housekeeping & Sanitization',
    'Marketing & Floral Decor',
    'Equipment Maintenance'
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-brandText flex items-center gap-2">
            <DollarSign className="w-7 h-7 text-forest" />
            <span>Operational Expenses & Cost Tracking</span>
          </h1>
          <p className="text-xs text-brandText-muted mt-1">
            Monitor raw ingredient procurement costs, utility bills, and labor overheads.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-forest hover:bg-forest-dark text-cream font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-forest-glow transition"
        >
          <Plus className="w-4 h-4 text-gold" />
          <span>Log New Expense</span>
        </button>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-pastel shadow-soft-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-brandText-muted tracking-wider">Total Recorded Outflow</span>
          <h3 className="font-playfair text-3xl font-bold text-brandText">₹{totalExpense.toLocaleString()}</h3>
          <p className="text-[11px] text-brandText-muted">Active billing period</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-pastel shadow-soft-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-brandText-muted tracking-wider">Food & Dairy Share</span>
          <h3 className="font-playfair text-3xl font-bold text-forest">62.8%</h3>
          <p className="text-[11px] text-emerald-700 font-semibold">Healthy target margin (&lt;65%)</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-pastel shadow-soft-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-brandText-muted tracking-wider">Operational Utilities</span>
          <h3 className="font-playfair text-3xl font-bold text-brandText">₹14,800</h3>
          <p className="text-[11px] text-brandText-muted">LPG, water filtration, electricity</p>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-3xl border border-pastel shadow-soft p-6 space-y-4">
        <h3 className="font-playfair font-bold text-lg text-brandText border-b border-pastel pb-3">
          Expense Ledger History
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-pastel/40 border-b border-pastel text-forest font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3">Ref ID</th>
                <th className="p-3">Description</th>
                <th className="p-3">Category</th>
                <th className="p-3">Date</th>
                <th className="p-3">Logged By</th>
                <th className="p-3 text-right">Amount (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pastel/40">
              {expenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-pastel/10 transition">
                  <td className="p-3 font-mono font-bold text-forest">#{exp.id}</td>
                  <td className="p-3 font-bold text-brandText">{exp.title}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-pastel text-forest">
                      {exp.category}
                    </span>
                  </td>
                  <td className="p-3 text-brandText-light">{exp.date}</td>
                  <td className="p-3 text-brandText-muted">{exp.recordedBy}</td>
                  <td className="p-3 text-right font-dmsans font-bold text-forest text-sm">
                    ₹{exp.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Expense Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-dark/75 backdrop-blur-sm">
          <div className="w-full max-w-md bg-cream rounded-3xl p-6 border border-pastel shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-pastel pb-3">
              <h3 className="font-playfair text-xl font-bold text-brandText">Record Operational Expense</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-pastel">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Expense Category</label>
                <select
                  value={newExp.category}
                  onChange={(e) => setNewExp({ ...newExp, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-pastel bg-white font-medium"
                >
                  {categoriesList.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Expense Description / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fresh organic mint & herbs replenishment"
                  value={newExp.title}
                  onChange={(e) => setNewExp({ ...newExp, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-pastel bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Amount in INR (₹)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 5400"
                  value={newExp.amount}
                  onChange={(e) => setNewExp({ ...newExp, amount: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-pastel bg-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-pastel text-brandText"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-forest text-cream font-bold"
                >
                  Log Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
