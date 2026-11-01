import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X
} from 'lucide-react';
import { useDemoRestaurant } from '../context/DemoRestaurantContext';
import { categories } from '../data/categories';

export default function MenuManagement() {
  const { dishes, addDish, updateDish, deleteDish, toggleDishAvailability } = useDemoRestaurant();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);

  // New dish form state
  const [newDish, setNewDish] = useState({
    name: '',
    category: 'indian',
    price: 380,
    isVeg: true,
    isJain: false,
    spicyLevel: 1,
    prepTime: '15 mins',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop',
    description: '',
    isBestseller: false
  });

  const filteredDishes = dishes.filter((dish) => {
    if (selectedCat !== 'all' && dish.category !== selectedCat) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      if (!dish.name.toLowerCase().includes(q) && !dish.description.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const handleCreateDish = (e) => {
    e.preventDefault();
    if (!newDish.name || !newDish.price) return;
    addDish({
      ...newDish,
      price: Number(newDish.price)
    });
    setIsAddModalOpen(false);
    setNewDish({
      name: '',
      category: 'indian',
      price: 380,
      isVeg: true,
      isJain: false,
      spicyLevel: 1,
      prepTime: '15 mins',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop',
      description: '',
      isBestseller: false
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingDish) return;
    updateDish(editingDish.id, {
      name: editingDish.name,
      price: Number(editingDish.price),
      category: editingDish.category,
      isVeg: editingDish.isVeg,
      isJain: editingDish.isJain,
      isBestseller: editingDish.isBestseller,
      description: editingDish.description
    });
    setEditingDish(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-brandText">
            Menu Catalog Management
          </h1>
          <p className="text-xs text-brandText-muted mt-1">
            Configure dishes, prices in INR, dietary tags, and stock availability.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-forest hover:bg-forest-dark text-cream font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-forest-glow transition"
        >
          <Plus className="w-4 h-4 text-gold" />
          <span>Add New Dish</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-3xl bg-white border border-pastel shadow-soft-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCat(c.slug)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-semibold transition border ${
                selectedCat === c.slug
                  ? 'bg-forest text-cream border-forest'
                  : 'bg-bgLight text-brandText border-pastel hover:bg-pastel/40'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-forest absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search dish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 rounded-xl border border-pastel bg-bgLight focus:outline-none focus:border-forest"
          />
        </div>
      </div>

      {/* Dishes Table */}
      <div className="bg-white rounded-3xl border border-pastel shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-pastel/40 border-b border-pastel text-forest font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Dish</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Diet</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pastel/40">
              {filteredDishes.map((dish) => (
                <tr key={dish.id} className="hover:bg-pastel/10 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-12 h-12 rounded-xl object-cover border border-pastel shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-playfair font-bold text-brandText text-sm">
                            {dish.name}
                          </h4>
                          {dish.isBestseller && (
                            <span className="text-[9px] bg-gold/30 text-gold-dark font-bold px-1.5 py-0.2 rounded">
                              Bestseller
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-brandText-muted line-clamp-1 max-w-xs">
                          {dish.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 font-semibold text-brandText capitalize">
                    {dish.category}
                  </td>

                  <td className="p-4 font-dmsans font-bold text-forest text-sm">
                    ₹{dish.price}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        dish.isVeg ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {dish.isVeg ? 'Veg' : 'Non-Veg'}
                      </span>
                      {dish.isJain && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          Jain
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => toggleDishAvailability(dish.id)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold transition ${
                        dish.isAvailable
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {dish.isAvailable ? 'In Stock' : 'Out of Stock'}
                    </button>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setEditingDish(dish)}
                        className="p-1.5 rounded-lg text-brandText hover:bg-pastel transition"
                        title="Edit Dish"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteDish(dish.id)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition"
                        title="Delete Dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Dish Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-dark/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-cream rounded-3xl p-6 border border-pastel shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-pastel pb-3 mb-4">
              <h3 className="font-playfair text-xl font-bold text-brandText">Add New Dish</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded-full hover:bg-pastel">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDish} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Dish Name *</label>
                <input
                  type="text"
                  required
                  value={newDish.name}
                  onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                  placeholder="e.g. Saffron Pistachio Kebab"
                  className="w-full p-2.5 rounded-xl border border-pastel bg-white focus:outline-none focus:border-forest"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={newDish.category}
                    onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-pastel bg-white capitalize"
                  >
                    {categories.filter(c => c.slug !== 'all').map(c => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Price in INR (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newDish.price}
                    onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-pastel bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newDish.description}
                  onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                  placeholder="Rich spices, butter reduction..."
                  className="w-full p-2.5 rounded-xl border border-pastel bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Image URL</label>
                <input
                  type="text"
                  value={newDish.image}
                  onChange={(e) => setNewDish({ ...newDish, image: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-pastel bg-white"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newDish.isVeg}
                    onChange={(e) => setNewDish({ ...newDish, isVeg: e.target.checked })}
                    className="rounded text-forest"
                  />
                  <span>Vegetarian</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newDish.isJain}
                    onChange={(e) => setNewDish({ ...newDish, isJain: e.target.checked })}
                    className="rounded text-forest"
                  />
                  <span>Jain Friendly</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newDish.isBestseller}
                    onChange={(e) => setNewDish({ ...newDish, isBestseller: e.target.checked })}
                    className="rounded text-forest"
                  />
                  <span>Bestseller</span>
                </label>
              </div>

              <div className="pt-4 border-t border-pastel flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-pastel text-brandText"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-forest text-cream font-bold"
                >
                  Create Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Dish Modal */}
      {editingDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-dark/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-cream rounded-3xl p-6 border border-pastel shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-pastel pb-3 mb-4">
              <h3 className="font-playfair text-xl font-bold text-brandText">Edit Dish #{editingDish.id}</h3>
              <button onClick={() => setEditingDish(null)} className="p-1 rounded-full hover:bg-pastel">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Dish Name</label>
                <input
                  type="text"
                  value={editingDish.name}
                  onChange={(e) => setEditingDish({ ...editingDish, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-pastel bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Price (INR)</label>
                  <input
                    type="number"
                    value={editingDish.price}
                    onChange={(e) => setEditingDish({ ...editingDish, price: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-pastel bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={editingDish.category}
                    onChange={(e) => setEditingDish({ ...editingDish, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-pastel bg-white capitalize"
                  >
                    {categories.filter(c => c.slug !== 'all').map(c => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingDish.description}
                  onChange={(e) => setEditingDish({ ...editingDish, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-pastel bg-white"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingDish.isVeg}
                    onChange={(e) => setEditingDish({ ...editingDish, isVeg: e.target.checked })}
                    className="rounded text-forest"
                  />
                  <span>Vegetarian</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingDish.isBestseller}
                    onChange={(e) => setEditingDish({ ...editingDish, isBestseller: e.target.checked })}
                    className="rounded text-forest"
                  />
                  <span>Bestseller</span>
                </label>
              </div>

              <div className="pt-4 border-t border-pastel flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingDish(null)}
                  className="px-4 py-2 rounded-xl border border-pastel text-brandText"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-forest text-cream font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
