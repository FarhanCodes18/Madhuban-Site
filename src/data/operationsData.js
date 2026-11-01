export const initialInventory = [
  { id: 'inv-01', name: 'Aged Dehraduni Basmati Rice', category: 'Grains & Pulses', currentStock: 48, unit: 'kg', minThreshold: 20, costPerUnit: 185, supplier: 'Himalayan Harvest Organic' },
  { id: 'inv-02', name: 'Certified A2 Gir Cow Desi Ghee', category: 'Dairy & Fats', currentStock: 22, unit: 'L', minThreshold: 15, costPerUnit: 1450, supplier: 'Pure Gir Vedic Dairy' },
  { id: 'inv-03', name: 'Fresh Malai Paneer (Daily Batch)', category: 'Dairy & Fats', currentStock: 18, unit: 'kg', minThreshold: 10, costPerUnit: 340, supplier: 'Pure Gir Vedic Dairy' },
  { id: 'inv-04', name: 'Pure Kashmiri Mongra Saffron', category: 'Spices & Aromatics', currentStock: 85, unit: 'g', minThreshold: 150, costPerUnit: 320, supplier: 'Pampore Royal Spices' },
  { id: 'inv-05', name: 'San Marzano Tomato Reduction', category: 'Italian Staples', currentStock: 35, unit: 'cans (800g)', minThreshold: 15, costPerUnit: 290, supplier: 'Bella Napoli Imports' },
  { id: 'inv-06', name: 'White Truffle Oil (Alba Import)', category: 'Oils & Truffles', currentStock: 4, unit: 'bottles (250ml)', minThreshold: 3, costPerUnit: 1850, supplier: 'Bella Napoli Imports' },
  { id: 'inv-07', name: 'Stone-Ground Whole Cashew Kernels', category: 'Dry Fruits & Nuts', currentStock: 26, unit: 'kg', minThreshold: 12, costPerUnit: 780, supplier: 'Konkan Cashew Consortium' },
  { id: 'inv-08', name: 'Organic Cold-Pressed Mustard Oil', category: 'Oils & Truffles', currentStock: 19, unit: 'L', minThreshold: 10, costPerUnit: 220, supplier: 'Himalayan Harvest Organic' },
  { id: 'inv-09', name: 'Black Urad Lentils (Dal Bukhara)', category: 'Grains & Pulses', currentStock: 65, unit: 'kg', minThreshold: 25, costPerUnit: 160, supplier: 'Himalayan Harvest Organic' },
  { id: 'inv-10', name: 'Artisanal Mozzarella Fior Di Latte', category: 'Dairy & Fats', currentStock: 14, unit: 'kg', minThreshold: 8, costPerUnit: 620, supplier: 'Bella Napoli Imports' },
  { id: 'inv-11', name: 'Durum Wheat Semolina (Bronze Die)', category: 'Italian Staples', currentStock: 38, unit: 'kg', minThreshold: 15, costPerUnit: 110, supplier: 'Bella Napoli Imports' },
  { id: 'inv-12', name: 'Fresh Thai Lemongrass & Hibiscus', category: 'Fresh Herbs', currentStock: 8, unit: 'kg', minThreshold: 5, costPerUnit: 190, supplier: 'Green Oasis Valley Farms' }
];

export const initialSuppliers = [
  {
    id: 'sup-01',
    name: 'Pure Gir Vedic Dairy',
    contactPerson: 'Sanjay Deshpande',
    phone: '+91 98220 89112',
    email: 'orders@puregirdairy.com',
    category: 'A2 Ghee, Fresh Malai Paneer, Cream',
    leadTime: 'Same Day (Morning 6 AM)',
    rating: 4.9,
    balanceDue: 24500
  },
  {
    id: 'sup-02',
    name: 'Bella Napoli Imports',
    contactPerson: 'Matteo Rossi / Karan Patel',
    phone: '+91 98190 44211',
    email: 'import@bellanapoli.in',
    category: 'Truffle Oil, Mozzarella, San Marzano, Semolina',
    leadTime: '2 Days',
    rating: 4.8,
    balanceDue: 42800
  },
  {
    id: 'sup-03',
    name: 'Himalayan Harvest Organic',
    contactPerson: 'Devendra Rana',
    phone: '+91 94120 77301',
    email: 'dev@himalayanorganic.com',
    category: 'Dehraduni Basmati, Urad, Cold-Pressed Mustard Oil',
    leadTime: '3 Days',
    rating: 4.9,
    balanceDue: 18200
  },
  {
    id: 'sup-04',
    name: 'Pampore Royal Spices',
    contactPerson: 'Mir Ghulam Rasool',
    phone: '+91 99060 22100',
    email: 'saffron@pamporespices.com',
    category: 'Kashmiri Mongra Saffron, Green Cardamom, Mace',
    leadTime: '4 Days Air Express',
    rating: 5.0,
    balanceDue: 0
  }
];

export const initialPurchaseOrders = [
  { id: 'PO-301', supplier: 'Pure Gir Vedic Dairy', date: '2026-10-30', items: '20kg Paneer, 15L A2 Ghee', total: 28550, status: 'received' },
  { id: 'PO-302', supplier: 'Bella Napoli Imports', date: '2026-10-31', items: '12 cans San Marzano, 6 btls Truffle Oil', total: 14580, status: 'dispatched' },
  { id: 'PO-303', supplier: 'Pampore Royal Spices', date: '2026-10-31', items: '250g Kashmiri Mongra Saffron', total: 80000, status: 'pending' },
  { id: 'PO-304', supplier: 'Himalayan Harvest Organic', date: '2026-10-28', items: '100kg Basmati, 50kg Black Dal', total: 26500, status: 'paid' }
];

export const initialExpenses = [
  { id: 'EXP-101', category: 'Raw Food & Vegetables', title: 'Farm Harvest Weekly Produce', amount: 34200, date: '2026-10-30', recordedBy: 'Executive Chef' },
  { id: 'EXP-102', category: 'Dairy & A2 Ghee', title: 'Daily Vedic Dairy Milk & Butter', amount: 18500, date: '2026-10-31', recordedBy: 'Store Manager' },
  { id: 'EXP-103', category: 'Utilities & Gas', title: 'Commercial LPG Cylinder Bank (8 Cylinders)', amount: 14800, date: '2026-10-29', recordedBy: 'Operations GM' },
  { id: 'EXP-104', category: 'Housekeeping & Sanitization', title: '5-Star Food Grade Sanitizers & Napkins', amount: 6200, date: '2026-10-28', recordedBy: 'Operations GM' },
  { id: 'EXP-105', category: 'Marketing & Floral Decor', title: 'Fresh Orchids & Botanical Landscaping Maintenance', amount: 8400, date: '2026-10-27', recordedBy: 'Interior Lead' }
];

export const initialStaff = [
  { id: 'STF-01', name: 'Chef Arvind Mathur', role: 'Executive Chef', shift: 'Full Day', attendance: 'present', phone: '+91 98201 11200', salary: 95000, ordersHandled: 342, rating: 4.95 },
  { id: 'STF-02', name: 'Vikram Rajput', role: 'Head Table Captain', shift: 'Evening (3 PM - 11 PM)', attendance: 'present', phone: '+91 98202 33411', salary: 42000, ordersHandled: 186, rating: 4.9 },
  { id: 'STF-03', name: 'Suresh Kumar', role: 'Floor Steward', shift: 'Evening (3 PM - 11 PM)', attendance: 'present', phone: '+91 98203 44522', salary: 28000, ordersHandled: 140, rating: 4.8 },
  { id: 'STF-04', name: 'Aarti Nair', role: 'Senior Hostess & Concierge', shift: 'Morning (11 AM - 7 PM)', attendance: 'present', phone: '+91 98204 55633', salary: 36000, ordersHandled: 95, rating: 4.9 },
  { id: 'STF-05', name: 'Giacomo Marco', role: 'Wood-Fired Pizza Specialist', shift: 'Evening (3 PM - 11 PM)', attendance: 'present', phone: '+91 98205 66744', salary: 65000, ordersHandled: 210, rating: 4.92 },
  { id: 'STF-06', name: 'Rohan Deshpande', role: 'Head Barista & Mixologist', shift: 'Full Day', attendance: 'on_break', phone: '+91 98206 77855', salary: 38000, ordersHandled: 125, rating: 4.85 },
  { id: 'STF-07', name: 'Kavita Joshi', role: 'Sous Chef (Gravies & Dum)', shift: 'Morning (10 AM - 6 PM)', attendance: 'on_leave', phone: '+91 98207 88966', salary: 55000, ordersHandled: 178, rating: 4.88 }
];

export const initialWaitingList = [
  { id: 'WL-08', guestName: 'Anil Ambani Party', phone: '+91 98201 99011', partySize: 4, preference: 'Indoor Botanical Atrium', status: 'waiting', queueNumber: 8, joinedAt: '19:40', estimatedWait: '12 mins' },
  { id: 'WL-09', guestName: 'Dr. Shalini Gupta', phone: '+91 98110 33400', partySize: 2, preference: 'Candlelight Alcove', status: 'waiting', queueNumber: 9, joinedAt: '19:48', estimatedWait: '18 mins' },
  { id: 'WL-10', guestName: 'Deepak & Friends', phone: '+91 97650 12099', partySize: 6, preference: 'Courtyard Terrace', status: 'waiting', queueNumber: 10, joinedAt: '19:55', estimatedWait: '25 mins' }
];

export const rewardsTiers = [
  { name: 'Silver Patron', minPoints: 0, multiplier: '1.0x', color: 'from-gray-300 to-gray-500', benefits: ['Earn 1 pt per ₹10 spent', 'Welcome voucher ₹100', 'Digital receipt records'] },
  { name: 'Gold Patron', minPoints: 500, multiplier: '1.25x', color: 'from-amber-400 to-amber-600', benefits: ['Earn 1.25 pts per ₹10', 'Priority table reservations', 'Complimentary chef starter on birthdays', 'Invitations to seasonal harvest tastings'] },
  { name: 'Platinum Connoisseur', minPoints: 1500, multiplier: '1.5x', color: 'from-emerald-400 to-emerald-700', benefits: ['Earn 1.5 pts per ₹10', 'Guaranteed table within 10 mins', 'Complimentary Rasmalai Tres Leches on every visit', 'Private tasting menu access'] },
  { name: 'Royal Ambassador', minPoints: 3000, multiplier: '2.0x', color: 'from-gold via-amber-300 to-gold-dark', benefits: ['Earn 2.0 pts per ₹10', 'Executive Boardroom complimentary bookings', 'Personalized table captain assigned', 'Chef curated anniversary hampers'] }
];

export const rewardsVouchers = [
  { id: 'vouch-01', title: 'Complimentary Rasmalai Tres Leches', pointsCost: 150, value: '₹340 Value', code: 'REWARD-RASMALAI', category: 'Dessert' },
  { id: 'vouch-02', title: 'Flat ₹250 Off Next Dinner Bill', pointsCost: 200, value: '₹250 Direct Cash Discount', code: 'REWARD-250OFF', category: 'Dining' },
  { id: 'vouch-03', title: 'Artisanal Neapolitan Pizza Voucher', pointsCost: 350, value: '₹560 Value', code: 'REWARD-PIZZA', category: 'Main Course' },
  { id: 'vouch-04', title: 'Celebration Grand Thali Feast for Two', pointsCost: 500, value: '₹1400 Value', code: 'REWARD-THALIFEAST', category: 'Combo Platter' }
];
