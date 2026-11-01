export const initialTables = [
  { id: '01', name: 'Table 01', capacity: 2, section: 'Window Garden', status: 'available', activeOrderId: null },
  { id: '02', name: 'Table 02', capacity: 4, section: 'Main Botanical Atrium', status: 'occupied', activeOrderId: 'MB-8921', guests: 3 },
  { id: '03', name: 'Table 03', capacity: 6, section: 'Courtyard Terrace', status: 'available', activeOrderId: null },
  { id: '04', name: 'Table 04', capacity: 2, section: 'Candlelight Alcove', status: 'occupied', activeOrderId: 'MB-8922', guests: 2 },
  { id: '05', name: 'Table 05', capacity: 4, section: 'Main Botanical Atrium', status: 'available', activeOrderId: null },
  { id: '06', name: 'Table 06', capacity: 8, section: 'Royal Heritage Family Suite', status: 'reserved', activeOrderId: null, reservationName: 'Singhania Family' },
  { id: '07', name: 'Table 07', capacity: 4, section: 'Window Garden', status: 'available', activeOrderId: null },
  { id: '08', name: 'Table 08', capacity: 4, section: 'Main Botanical Atrium', status: 'occupied', activeOrderId: 'MB-8923', guests: 4 },
  { id: '09', name: 'Table 09', capacity: 2, section: 'Courtyard Terrace', status: 'available', activeOrderId: null },
  { id: '10', name: 'Table 10', capacity: 6, section: 'Royal Heritage Family Suite', status: 'available', activeOrderId: null },
  { id: '11', name: 'Table 11', capacity: 4, section: 'Window Garden', status: 'available', activeOrderId: null },
  { id: '12', name: 'Table 12', capacity: 10, section: 'Private Executive Boardroom', status: 'reserved', activeOrderId: null, reservationName: 'Apex Capital Dinner' }
];

export const initialOrders = [
  {
    id: 'MB-8921',
    tableId: '02',
    tableName: 'Table 02',
    customerName: 'Kunal Sharma',
    customerPhone: '+91 98201 44521',
    items: [
      { id: 'mb-01', name: 'Madhuban Royal Paneer Makhani', price: 460, quantity: 2, customizations: 'Traditional Medium Spice' },
      { id: 'mb-03', name: 'Subz Dum Handi Biryani', price: 440, quantity: 1, customizations: 'Burani Garlic Raita' },
      { id: 'mb-19', name: 'Botanical Hibiscus & Lemongrass Cooler', price: 240, quantity: 2, customizations: 'Sparkling Soda' }
    ],
    subtotal: 1840,
    tax: 92,
    discount: 200,
    couponCode: 'WELCOME50',
    total: 1732,
    status: 'preparing', // placed, accepted, preparing, ready, served, cancelled
    orderType: 'Dine-In (QR Table)',
    createdAt: new Date(Date.now() - 14 * 60000).toISOString(),
    estimatedTime: '8 mins remaining',
    kitchenPriority: 'normal',
    notes: 'Please keep raita chilled.'
  },
  {
    id: 'MB-8922',
    tableId: '04',
    tableName: 'Table 04',
    customerName: 'Pooja Verma',
    customerPhone: '+91 98112 39912',
    items: [
      { id: 'mb-07', name: 'Truffle & Wild Mushroom Pizza', price: 560, quantity: 1, customizations: 'Thin Neapolitan' },
      { id: 'mb-09', name: 'Artisanal Fettuccine Al Tartufo', price: 490, quantity: 1, customizations: 'Extra Parmesan' },
      { id: 'mb-21', name: 'Golden Saffron Rasmalai Tres Leches', price: 340, quantity: 2, customizations: 'Chilled' }
    ],
    subtotal: 1730,
    tax: 86.5,
    discount: 150,
    couponCode: 'CHEF50',
    total: 1666.5,
    status: 'ready',
    orderType: 'Dine-In (QR Table)',
    createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
    estimatedTime: 'Ready to serve',
    kitchenPriority: 'high',
    notes: 'Anniversary celebration'
  },
  {
    id: 'MB-8923',
    tableId: '08',
    tableName: 'Table 08',
    customerName: 'Devrat Sen',
    customerPhone: '+91 97654 11200',
    items: [
      { id: 'mb-02', name: 'Dal Madhuban Bukhara (24hr)', price: 390, quantity: 2, customizations: 'Extra Butter & Cream' },
      { id: 'mb-06', name: 'Bhatti Da Murg Tikka', price: 480, quantity: 2, customizations: 'Smoked Garlic Aioli' },
      { id: 'mb-18', name: 'Kashmiri Saffron & Pistachio Milkshake', price: 290, quantity: 3, customizations: 'Whole Dairy Milk' }
    ],
    subtotal: 2610,
    tax: 130.5,
    discount: 500,
    couponCode: 'FAMILY25',
    total: 2240.5,
    status: 'accepted',
    orderType: 'Dine-In (QR Table)',
    createdAt: new Date(Date.now() - 6 * 60000).toISOString(),
    estimatedTime: '18 mins remaining',
    kitchenPriority: 'normal',
    notes: 'Less spicy tikka for kids'
  },
  {
    id: 'MB-8919',
    tableId: 'Takeaway',
    tableName: 'Takeaway Counter',
    customerName: 'Neha Joshi',
    customerPhone: '+91 99230 88211',
    items: [
      { id: 'mb-23', name: 'Royal Madhuban Thali Feast', price: 699, quantity: 2, customizations: 'Pure Vegetarian' }
    ],
    subtotal: 1398,
    tax: 69.9,
    discount: 0,
    couponCode: null,
    total: 1467.9,
    status: 'served',
    orderType: 'Takeaway Pick-up',
    createdAt: new Date(Date.now() - 65 * 60000).toISOString(),
    estimatedTime: 'Completed',
    kitchenPriority: 'normal',
    notes: 'Pack cutlery neatly'
  }
];

export const initialWaiterRequests = [
  {
    id: 'WR-101',
    tableId: '02',
    tableName: 'Table 02',
    requestType: 'Request Water',
    message: 'Can we get two glasses of warm water?',
    status: 'pending', // pending, assigned, in_progress, completed, cancelled
    timestamp: new Date(Date.now() - 4 * 60000).toISOString(),
    assignedTo: null
  },
  {
    id: 'WR-102',
    tableId: '04',
    tableName: 'Table 04',
    requestType: 'Request Bill',
    message: 'Ready for check please. Card payment.',
    status: 'in_progress',
    timestamp: new Date(Date.now() - 8 * 60000).toISOString(),
    assignedTo: 'Vikram (Captain)'
  },
  {
    id: 'WR-103',
    tableId: '08',
    tableName: 'Table 08',
    requestType: 'Request Extra Plates',
    message: 'Need 2 small quarter plates for starters.',
    status: 'completed',
    timestamp: new Date(Date.now() - 22 * 60000).toISOString(),
    assignedTo: 'Suresh'
  }
];

export const initialReservations = [
  {
    id: 'RES-401',
    guestName: 'Harshvardhan Kapoor',
    phone: '+91 98450 12099',
    email: 'harsh.kapoor@example.com',
    date: 'Today',
    time: '20:30',
    guests: 4,
    tableId: '06',
    tableName: 'Table 06 (Royal Suite)',
    occasion: 'Birthday Celebration',
    specialRequests: 'Arranging birthday dessert platter at end of dinner.',
    status: 'confirmed' // confirmed, seated, cancelled
  },
  {
    id: 'RES-402',
    guestName: 'Simran Bajaj',
    phone: '+91 98200 44100',
    email: 'simran.b@example.com',
    date: 'Tomorrow',
    time: '19:45',
    guests: 2,
    tableId: '04',
    tableName: 'Table 04 (Candlelight Alcove)',
    occasion: 'Anniversary',
    specialRequests: 'Quiet candlelit corner table with fresh flowers.',
    status: 'confirmed'
  },
  {
    id: 'RES-403',
    guestName: 'Dr. Ramesh Pillai',
    phone: '+91 94440 55198',
    email: 'dr.pillai@example.com',
    date: 'Nov 02',
    time: '13:00',
    guests: 8,
    tableId: '12',
    tableName: 'Table 12 (Boardroom)',
    occasion: 'Business Lunch',
    specialRequests: 'Pre-order thali feast for 8 delegates.',
    status: 'pending'
  }
];

export const initialReportsData = {
  todayRevenue: 64850,
  yesterdayRevenue: 58200,
  totalOrdersToday: 48,
  activeTablesCount: 3,
  pendingKdsOrders: 2,
  averageOrderValue: 1351,
  bestsellingList: [
    { name: 'Madhuban Royal Paneer Makhani', count: 34, revenue: 15640 },
    { name: 'Dal Madhuban Bukhara (24hr)', count: 28, revenue: 10920 },
    { name: 'Truffle & Wild Mushroom Pizza', count: 22, revenue: 12320 },
    { name: 'Golden Saffron Rasmalai', count: 26, revenue: 8840 },
    { name: 'Ghee Roast Paper Masala Dosa', count: 21, revenue: 5880 }
  ],
  hourlyTraffic: [
    { hour: '12 PM', orders: 6, revenue: 7800 },
    { hour: '1 PM', orders: 11, revenue: 14200 },
    { hour: '2 PM', orders: 9, revenue: 11500 },
    { hour: '3 PM', orders: 3, revenue: 3800 },
    { hour: '7 PM', orders: 8, revenue: 10400 },
    { hour: '8 PM', orders: 14, revenue: 19800 },
    { hour: '9 PM', orders: 12, revenue: 16900 },
    { hour: '10 PM', orders: 5, revenue: 6450 }
  ],
  weeklyTrends: [
    { day: 'Mon', revenue: 42000, orders: 32 },
    { day: 'Tue', revenue: 46500, orders: 35 },
    { day: 'Wed', revenue: 51200, orders: 39 },
    { day: 'Thu', revenue: 54000, orders: 41 },
    { day: 'Fri', revenue: 72800, orders: 56 },
    { day: 'Sat', revenue: 89400, orders: 68 },
    { day: 'Sun', revenue: 84600, orders: 63 }
  ]
};
