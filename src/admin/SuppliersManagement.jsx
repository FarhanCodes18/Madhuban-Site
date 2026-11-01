import React, { useState } from 'react';
import {
  Truck,
  Plus,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  FileText,
  DollarSign,
  Package,
  X
} from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';

export default function SuppliersManagement() {
  const { suppliers, purchaseOrders, createPurchaseOrder, updatePOStatus } = useDemoRestaurant();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPO, setNewPO] = useState({
    supplier: suppliers[0]?.name || 'Pure Gir Vedic Dairy',
    items: '',
    total: 12000
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newPO.items || !newPO.total) return;
    createPurchaseOrder(newPO);
    setIsModalOpen(false);
    setNewPO({ supplier: suppliers[0]?.name || 'Pure Gir Vedic Dairy', items: '', total: 12000 });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-brandText flex items-center gap-2">
            <Truck className="w-7 h-7 text-forest" />
            <span>Farm Suppliers & Purchase Orders</span>
          </h1>
          <p className="text-xs text-brandText-muted mt-1">
            Maintain organic vendor contracts, lead times, and ingredient replenishment orders.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-forest hover:bg-forest-dark text-cream font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-forest-glow transition"
        >
          <Plus className="w-4 h-4 text-gold" />
          <span>New Purchase Order</span>
        </button>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {suppliers.map((sup) => (
          <div
            key={sup.id}
            className="p-6 rounded-3xl bg-white border border-pastel shadow-soft-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark bg-amber-50 px-2.5 py-0.5 rounded-md inline-block">
                ★ {sup.rating} Verified Vendor
              </span>
              <h3 className="font-playfair font-bold text-base text-brandText">
                {sup.name}
              </h3>
              <p className="text-xs text-forest font-semibold">
                {sup.category}
              </p>
            </div>

            <div className="pt-3 border-t border-pastel/40 text-xs text-brandText-muted space-y-1.5">
              <p><strong className="text-brandText">Contact:</strong> {sup.contactPerson}</p>
              <p><strong className="text-brandText">Phone:</strong> {sup.phone}</p>
              <p><strong className="text-brandText">Lead Time:</strong> {sup.leadTime}</p>
              <div className="flex justify-between pt-2 border-t border-pastel/40 font-bold">
                <span>Account Balance:</span>
                <span className="text-forest font-dmsans">₹{sup.balanceDue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Purchase Orders Table */}
      <div className="bg-white rounded-3xl border border-pastel shadow-soft overflow-hidden space-y-4 p-6">
        <h3 className="font-playfair font-bold text-lg text-brandText border-b border-pastel pb-3">
          Purchase Requisition & Order History
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-pastel/40 border-b border-pastel text-forest font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3">PO Number</th>
                <th className="p-3">Vendor / Supplier</th>
                <th className="p-3">Items Ordered</th>
                <th className="p-3">Order Date</th>
                <th className="p-3">Total (INR)</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pastel/40">
              {purchaseOrders.map((po) => (
                <tr key={po.id} className="hover:bg-pastel/10 transition">
                  <td className="p-3 font-mono font-bold text-forest">#{po.id}</td>
                  <td className="p-3 font-bold text-brandText">{po.supplier}</td>
                  <td className="p-3 text-brandText-muted max-w-xs truncate">{po.items}</td>
                  <td className="p-3 text-brandText-light">{po.date}</td>
                  <td className="p-3 font-dmsans font-bold text-brandText">₹{po.total.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      po.status === 'received' || po.status === 'paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : po.status === 'dispatched'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {po.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    {po.status === 'dispatched' && (
                      <button
                        onClick={() => updatePOStatus(po.id, 'received')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-700 text-cream text-[11px] font-bold hover:bg-emerald-800"
                      >
                        Confirm Received
                      </button>
                    )}
                    {po.status === 'received' && (
                      <button
                        onClick={() => updatePOStatus(po.id, 'paid')}
                        className="px-2.5 py-1 rounded-lg bg-blue-700 text-cream text-[11px] font-bold hover:bg-blue-800"
                      >
                        Settle Payment
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Purchase Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-dark/75 backdrop-blur-sm">
          <div className="w-full max-w-md bg-cream rounded-3xl p-6 border border-pastel shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-pastel pb-3">
              <h3 className="font-playfair text-xl font-bold text-brandText">Create Purchase Order</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-pastel">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Select Supplier Vendor</label>
                <select
                  value={newPO.supplier}
                  onChange={(e) => setNewPO({ ...newPO, supplier: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-pastel bg-white font-medium"
                >
                  {suppliers.map(s => (
                    <option key={s.id} value={s.name}>{s.name} ({s.category.split(',')[0]})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Items & Quantities</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. 50kg Basmati Rice, 20L A2 Desi Ghee..."
                  value={newPO.items}
                  onChange={(e) => setNewPO({ ...newPO, items: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-pastel bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Total Estimated Amount (INR)</label>
                <input
                  type="number"
                  required
                  value={newPO.total}
                  onChange={(e) => setNewPO({ ...newPO, total: e.target.value })}
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
                  Dispatch PO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
