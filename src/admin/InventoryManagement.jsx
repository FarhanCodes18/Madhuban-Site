import React, { useState } from 'react';
import {
  Package,
  AlertTriangle,
  Plus,
  Search,
  ShoppingCart,
  CheckCircle2,
  RefreshCw,
  TrendingDown,
  ArrowRight
} from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';

export default function InventoryManagement() {
  const { inventory, updateStock, createPurchaseOrder } = useDemoRestaurant();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all, low, normal

  const filteredInventory = inventory.filter((item) => {
    const isLow = item.currentStock <= item.minThreshold;
    if (filter === 'low' && !isLow) return false;
    if (filter === 'normal' && isLow) return false;
    if (search.trim() !== '') {
      return item.name.toLowerCase().includes(search.toLowerCase()) || item.supplier.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });

  const lowStockCount = inventory.filter(i => i.currentStock <= i.minThreshold).length;

  const handleQuickReorder = (item) => {
    const reorderQty = item.minThreshold * 2;
    createPurchaseOrder({
      supplier: item.supplier,
      items: `${reorderQty} ${item.unit} ${item.name}`,
      total: reorderQty * item.costPerUnit
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-brandText flex items-center gap-2">
            <Package className="w-7 h-7 text-forest" />
            <span>Farm Ingredients & Stock Inventory</span>
          </h1>
          <p className="text-xs text-brandText-muted mt-1">
            Track raw spices, A2 Gir cow dairy, imported truffle oils, and automated low-stock warnings.
          </p>
        </div>

        {lowStockCount > 0 && (
          <div className="px-4 py-2 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs font-bold flex items-center gap-2 animate-pulse">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>{lowStockCount} Ingredients Below Minimum Stock Threshold!</span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-3xl bg-white border border-pastel shadow-soft-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs">
          {[
            { id: 'all', label: `All Stock (${inventory.length})` },
            { id: 'low', label: `Low Stock Alerts (${lowStockCount})` },
            { id: 'normal', label: 'Adequate Levels' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3.5 py-2 rounded-xl font-bold uppercase tracking-wider transition border ${
                filter === f.id
                  ? 'bg-forest text-cream border-forest shadow-soft'
                  : 'bg-bgLight text-brandText border-pastel hover:bg-pastel/40'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-forest absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search ingredient or supplier..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-3xl border border-pastel shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-pastel/40 border-b border-pastel text-forest font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Ingredient Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Current Stock</th>
                <th className="p-4">Min Threshold</th>
                <th className="p-4">Cost / Unit</th>
                <th className="p-4">Supplier</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pastel/40">
              {filteredInventory.map((item) => {
                const isLow = item.currentStock <= item.minThreshold;

                return (
                  <tr key={item.id} className={`hover:bg-pastel/10 transition ${isLow ? 'bg-rose-50/30' : ''}`}>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {isLow && <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />}
                        <span className="font-playfair font-bold text-sm text-brandText">{item.name}</span>
                      </div>
                    </td>

                    <td className="p-4 font-semibold text-brandText-muted">
                      {item.category}
                    </td>

                    <td className="p-4">
                      <span className={`font-mono font-bold text-sm ${isLow ? 'text-rose-600 font-extrabold' : 'text-forest'}`}>
                        {item.currentStock} {item.unit}
                      </span>
                    </td>

                    <td className="p-4 text-brandText-muted font-mono">
                      {item.minThreshold} {item.unit}
                    </td>

                    <td className="p-4 font-dmsans font-bold text-brandText">
                      ₹{item.costPerUnit}
                    </td>

                    <td className="p-4 text-brandText font-medium">
                      {item.supplier}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            const newQty = prompt(`Update stock quantity for ${item.name}:`, item.currentStock);
                            if (newQty !== null && !isNaN(Number(newQty))) {
                              updateStock(item.id, Number(newQty));
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl border border-pastel hover:bg-pastel font-semibold text-brandText transition"
                        >
                          Adjust
                        </button>

                        {isLow && (
                          <button
                            onClick={() => handleQuickReorder(item)}
                            className="px-3 py-1.5 rounded-xl bg-forest hover:bg-forest-dark text-cream font-bold flex items-center gap-1 shadow-soft transition"
                            title="Generate Purchase Order"
                          >
                            <ShoppingCart className="w-3 h-3 text-gold" />
                            <span>Reorder</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
