import React, { createContext, useContext, useState, useEffect } from 'react';
import { menuData as initialMenu } from '../data/menuData';
import {
  initialTables,
  initialOrders,
  initialWaiterRequests,
  initialReservations,
  initialReportsData
} from '../data/demoOrders';
import {
  initialInventory,
  initialSuppliers,
  initialPurchaseOrders,
  initialExpenses,
  initialStaff,
  initialWaitingList
} from '../data/operationsData';

const DemoRestaurantContext = createContext();

export const DemoRestaurantProvider = ({ children }) => {
  // 1. Menu State (with Admin CRUD)
  const [dishes, setDishes] = useState(() => {
    try {
      const saved = localStorage.getItem('madhuban_dishes_v1');
      return saved ? JSON.parse(saved) : initialMenu;
    } catch {
      return initialMenu;
    }
  });

  // 2. Orders State
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('madhuban_orders_v1');
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  // 3. Tables State
  const [tables, setTables] = useState(() => {
    try {
      const saved = localStorage.getItem('madhuban_tables_v1');
      return saved ? JSON.parse(saved) : initialTables;
    } catch {
      return initialTables;
    }
  });

  // 4. Waiter Service Requests State
  const [waiterRequests, setWaiterRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('madhuban_waiter_reqs_v1');
      return saved ? JSON.parse(saved) : initialWaiterRequests;
    } catch {
      return initialWaiterRequests;
    }
  });

  // 5. Reservations State
  const [reservations, setReservations] = useState(() => {
    try {
      const saved = localStorage.getItem('madhuban_reservations_v1');
      return saved ? JSON.parse(saved) : initialReservations;
    } catch {
      return initialReservations;
    }
  });

  // 6. User Auth & Loyalty Rewards State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('madhuban_user_v1');
      return saved ? JSON.parse(saved) : {
        isLoggedIn: true,
        name: 'Rohan Singhal',
        email: 'rohan.singhal@example.com',
        phone: '+91 98204 77123',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
        loyaltyPoints: 680,
        tier: 'Gold Patron',
        birthday: '14th August',
        redeemedVouchers: [],
        savedAddresses: [
          { id: 'addr-1', type: 'Home', address: 'B-402, Magnolia Orchards, Green Valley Road, Pune 411045' },
          { id: 'addr-2', type: 'Office', address: 'Level 6, Tech Park Towers, Cyber City, Pune 411014' }
        ]
      };
    } catch {
      return null;
    }
  });

  // 7. Operations: Inventory
  const [inventory, setInventory] = useState(() => {
    try {
      const saved = localStorage.getItem('madhuban_inventory_v1');
      return saved ? JSON.parse(saved) : initialInventory;
    } catch {
      return initialInventory;
    }
  });

  // 8. Operations: Suppliers & Purchase Orders
  const [suppliers, setSuppliers] = useState(() => {
    try {
      const saved = localStorage.getItem('madhuban_suppliers_v1');
      return saved ? JSON.parse(saved) : initialSuppliers;
    } catch {
      return initialSuppliers;
    }
  });

  const [purchaseOrders, setPurchaseOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('madhuban_po_v1');
      return saved ? JSON.parse(saved) : initialPurchaseOrders;
    } catch {
      return initialPurchaseOrders;
    }
  });

  // 9. Operations: Expenses
  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem('madhuban_expenses_v1');
      return saved ? JSON.parse(saved) : initialExpenses;
    } catch {
      return initialExpenses;
    }
  });

  // 10. Operations: Staff & Shifts
  const [staff, setStaff] = useState(() => {
    try {
      const saved = localStorage.getItem('madhuban_staff_v1');
      return saved ? JSON.parse(saved) : initialStaff;
    } catch {
      return initialStaff;
    }
  });

  // 11. Customer Experience: Waiting List
  const [waitingList, setWaitingList] = useState(() => {
    try {
      const saved = localStorage.getItem('madhuban_waitlist_v1');
      return saved ? JSON.parse(saved) : initialWaitingList;
    } catch {
      return initialWaitingList;
    }
  });

  // 12. Customer Experience: Feedbacks & Reviews
  const [feedbacks, setFeedbacks] = useState(() => {
    try {
      const saved = localStorage.getItem('madhuban_feedbacks_v1');
      return saved ? JSON.parse(saved) : [
        { id: 'fb-01', name: 'Kavita Chawla', rating: 5, category: 'Food Quality', comment: 'The Dal Bukhara was simmering perfection. Will return!', date: 'Today, 2:30 PM' },
        { id: 'fb-02', name: 'Abhishek Roy', rating: 4, category: 'Ambiance', comment: 'Pleasant botanical seating, slightly long wait for pizza during rush hour.', date: 'Yesterday' }
      ];
    } catch {
      return [];
    }
  });

  // 13. Global Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 4000);
  };

  // Sync states to LocalStorage
  useEffect(() => {
    localStorage.setItem('madhuban_dishes_v1', JSON.stringify(dishes));
  }, [dishes]);

  useEffect(() => {
    localStorage.setItem('madhuban_orders_v1', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('madhuban_tables_v1', JSON.stringify(tables));
  }, [tables]);

  useEffect(() => {
    localStorage.setItem('madhuban_waiter_reqs_v1', JSON.stringify(waiterRequests));
  }, [waiterRequests]);

  useEffect(() => {
    localStorage.setItem('madhuban_reservations_v1', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('madhuban_user_v1', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('madhuban_user_v1');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('madhuban_inventory_v1', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('madhuban_suppliers_v1', JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem('madhuban_po_v1', JSON.stringify(purchaseOrders));
  }, [purchaseOrders]);

  useEffect(() => {
    localStorage.setItem('madhuban_expenses_v1', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('madhuban_staff_v1', JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    localStorage.setItem('madhuban_waitlist_v1', JSON.stringify(waitingList));
  }, [waitingList]);

  useEffect(() => {
    localStorage.setItem('madhuban_feedbacks_v1', JSON.stringify(feedbacks));
  }, [feedbacks]);

  // Actions for Menu Management
  const addDish = (newDish) => {
    const id = `mb-custom-${Date.now()}`;
    const dishWithId = {
      ...newDish,
      id,
      rating: 5.0,
      reviewsCount: 1,
      isAvailable: true
    };
    setDishes(prev => [dishWithId, ...prev]);
    showToast(`Added "${newDish.name}" to the digital menu!`, 'success');
  };

  const updateDish = (id, updatedFields) => {
    setDishes(prev => prev.map(d => d.id === id ? { ...d, ...updatedFields } : d));
    showToast('Menu item updated successfully', 'success');
  };

  const deleteDish = (id) => {
    const dish = dishes.find(d => d.id === id);
    setDishes(prev => prev.filter(d => d.id !== id));
    showToast(`Removed "${dish?.name || 'dish'}" from menu`, 'info');
  };

  const toggleDishAvailability = (id) => {
    setDishes(prev => prev.map(d => {
      if (d.id === id) {
        const nextStatus = !d.isAvailable;
        showToast(`${d.name} is now ${nextStatus ? 'Available' : 'Out of Stock'}`, nextStatus ? 'success' : 'warning');
        return { ...d, isAvailable: nextStatus };
      }
      return d;
    }));
  };

  // Actions for Orders
  const placeOrder = ({ items, subtotal, tax, discount, total, tableId, tableName, notes, orderType = 'Dine-In (QR Table)', paymentMethod = 'UPI' }) => {
    const newOrderId = `MB-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: newOrderId,
      tableId: tableId || 'Takeaway',
      tableName: tableName || (tableId ? `Table ${tableId}` : 'Takeaway Counter'),
      customerName: currentUser?.name || 'Valued Guest',
      customerPhone: currentUser?.phone || '+91 98000 00000',
      items,
      subtotal,
      tax,
      discount,
      total,
      status: 'placed',
      orderType,
      paymentMethod,
      createdAt: new Date().toISOString(),
      estimatedTime: '20-25 mins',
      kitchenPriority: 'normal',
      notes: notes || 'None'
    };

    setOrders(prev => [newOrder, ...prev]);

    // If it's a table order, update table status
    if (tableId && tableId !== 'Takeaway') {
      setTables(prev => prev.map(t => t.id === tableId ? { ...t, status: 'occupied', activeOrderId: newOrderId } : t));
    }

    // Reward points credit (1 pt per ₹10 spent)
    if (currentUser) {
      const earned = Math.round(total / 10);
      setCurrentUser(prev => ({
        ...prev,
        loyaltyPoints: (prev.loyaltyPoints || 0) + earned
      }));
    }

    showToast(`Order #${newOrderId} received! Kitchen has been notified.`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: newStatus,
          estimatedTime: newStatus === 'served' ? 'Completed' : newStatus === 'ready' ? 'Ready to serve' : o.estimatedTime
        };
      }
      return o;
    }));
    showToast(`Order #${orderId} marked as ${newStatus.toUpperCase()}`, 'success');
  };

  // Actions for Table Management & Order Transfer
  const transferTableOrder = (fromTableId, toTableId) => {
    const order = orders.find(o => o.tableId === fromTableId && o.status !== 'served' && o.status !== 'cancelled');
    if (!order) {
      showToast(`No active order found on Table ${fromTableId} to transfer.`, 'warning');
      return false;
    }

    // Update order tableId
    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, tableId: toTableId, tableName: `Table ${toTableId}` } : o));

    // Update tables
    setTables(prev => prev.map(t => {
      if (t.id === fromTableId) {
        return { ...t, status: 'available', activeOrderId: null };
      }
      if (t.id === toTableId) {
        return { ...t, status: 'occupied', activeOrderId: order.id };
      }
      return t;
    }));

    showToast(`Transferred Order #${order.id} from Table ${fromTableId} to Table ${toTableId}!`, 'success');
    return true;
  };

  // Actions for Waiter Requests
  const createWaiterRequest = ({ tableId, tableName, requestType, message = '' }) => {
    const newReqId = `WR-${Math.floor(100 + Math.random() * 900)}`;
    const newReq = {
      id: newReqId,
      tableId,
      tableName: tableName || `Table ${tableId}`,
      requestType,
      message,
      status: 'pending',
      timestamp: new Date().toISOString(),
      assignedTo: null
    };

    setWaiterRequests(prev => [newReq, ...prev]);
    showToast(`Staff notified: "${requestType}" for Table ${tableId}`, 'success');
    return newReq;
  };

  const updateWaiterRequestStatus = (id, newStatus, assignedTo = null) => {
    setWaiterRequests(prev => prev.map(req => {
      if (req.id === id) {
        return {
          ...req,
          status: newStatus,
          assignedTo: assignedTo || req.assignedTo || 'Staff Member'
        };
      }
      return req;
    }));
    showToast(`Request #${id} updated: ${newStatus}`, 'info');
  };

  const cancelWaiterRequest = (id) => {
    setWaiterRequests(prev => prev.filter(req => req.id !== id));
    showToast(`Request #${id} cancelled`, 'info');
  };

  // Actions for Reservations
  const createReservation = (reservationData) => {
    const newResId = `RES-${Math.floor(100 + Math.random() * 900)}`;
    const newRes = {
      ...reservationData,
      id: newResId,
      status: 'confirmed'
    };
    setReservations(prev => [newRes, ...prev]);
    showToast(`Table reserved successfully! ID: #${newResId}`, 'success');
    return newRes;
  };

  const updateReservationStatus = (id, newStatus) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    showToast(`Reservation #${id} status: ${newStatus}`, 'info');
  };

  // Actions for Waiting List
  const joinWaitlist = ({ guestName, phone, partySize, preference }) => {
    const nextQueue = waitingList.length + 1;
    const newParty = {
      id: `WL-${Math.floor(10 + Math.random() * 90)}`,
      guestName,
      phone,
      partySize: Number(partySize),
      preference,
      status: 'waiting',
      queueNumber: nextQueue,
      joinedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedWait: `${nextQueue * 6} mins`
    };
    setWaitingList(prev => [...prev, newParty]);
    showToast(`Added to Live Queue! Ticket: #${newParty.queueNumber}`, 'success');
    return newParty;
  };

  const callWaitlistParty = (id, tableId = '02') => {
    setWaitingList(prev => prev.map(w => w.id === id ? { ...w, status: 'seated', allocatedTable: `Table ${tableId}` } : w));
    showToast(`Guest notified & seated at Table ${tableId}!`, 'success');
  };

  const leaveWaitlist = (id) => {
    setWaitingList(prev => prev.filter(w => w.id !== id));
    showToast('Removed from waiting queue.', 'info');
  };

  // Actions for Feedback
  const submitFeedback = ({ name, rating, category, comment, dishMentioned }) => {
    const newFb = {
      id: `fb-${Date.now()}`,
      name: name || currentUser?.name || 'Anonymous Guest',
      rating: Number(rating),
      category,
      comment,
      dishMentioned: dishMentioned || 'General Dining',
      date: 'Just now'
    };
    setFeedbacks(prev => [newFb, ...prev]);
    showToast('Thank you for your valuable review & feedback!', 'success');
    return newFb;
  };

  // Actions for Inventory & Operations
  const updateStock = (id, newStock) => {
    setInventory(prev => prev.map(item => item.id === id ? { ...item, currentStock: Number(newStock) } : item));
    showToast('Inventory stock updated', 'success');
  };

  const createPurchaseOrder = ({ supplier, items, total }) => {
    const newPO = {
      id: `PO-${Math.floor(400 + Math.random() * 500)}`,
      supplier,
      date: new Date().toISOString().split('T')[0],
      items,
      total: Number(total),
      status: 'pending'
    };
    setPurchaseOrders(prev => [newPO, ...prev]);
    showToast(`Purchase Order #${newPO.id} generated for ${supplier}!`, 'success');
  };

  const updatePOStatus = (id, newStatus) => {
    setPurchaseOrders(prev => prev.map(po => po.id === id ? { ...po, status: newStatus } : po));
    showToast(`PO #${id} marked as ${newStatus}`, 'info');
  };

  const addExpense = ({ category, title, amount, recordedBy = 'Operations Manager' }) => {
    const newExp = {
      id: `EXP-${Math.floor(200 + Math.random() * 700)}`,
      category,
      title,
      amount: Number(amount),
      date: new Date().toISOString().split('T')[0],
      recordedBy
    };
    setExpenses(prev => [newExp, ...prev]);
    showToast(`Expense of ₹${amount} logged under ${category}`, 'info');
  };

  const updateStaffAttendance = (id, attendance) => {
    setStaff(prev => prev.map(s => s.id === id ? { ...s, attendance } : s));
    showToast('Staff attendance updated', 'info');
  };

  // User Auth & Rewards Actions
  const login = (email, name = 'Rohan Singhal') => {
    setCurrentUser({
      isLoggedIn: true,
      name,
      email,
      phone: '+91 98204 77123',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      loyaltyPoints: 680,
      tier: 'Gold Patron',
      birthday: '14th August',
      redeemedVouchers: [],
      savedAddresses: [
        { id: 'addr-1', type: 'Home', address: 'B-402, Magnolia Orchards, Green Valley Road, Pune 411045' },
        { id: 'addr-2', type: 'Office', address: 'Level 6, Tech Park Towers, Cyber City, Pune 411014' }
      ]
    });
    showToast(`Welcome back, ${name}!`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out successfully', 'info');
  };

  const redeemVoucher = (voucher) => {
    if (!currentUser) return false;
    if (currentUser.loyaltyPoints < voucher.pointsCost) {
      showToast('Insufficient dining points for this reward.', 'warning');
      return false;
    }

    setCurrentUser(prev => ({
      ...prev,
      loyaltyPoints: prev.loyaltyPoints - voucher.pointsCost,
      redeemedVouchers: [...(prev.redeemedVouchers || []), voucher]
    }));

    showToast(`Redeemed "${voucher.title}"! Code: ${voucher.code}`, 'success');
    return true;
  };

  // Reset demo state
  const resetDemoData = () => {
    setDishes(initialMenu);
    setOrders(initialOrders);
    setTables(initialTables);
    setWaiterRequests(initialWaiterRequests);
    setReservations(initialReservations);
    setInventory(initialInventory);
    setSuppliers(initialSuppliers);
    setPurchaseOrders(initialPurchaseOrders);
    setExpenses(initialExpenses);
    setStaff(initialStaff);
    setWaitingList(initialWaitingList);
    localStorage.clear();
    showToast('All Madhuban demo states reset to factory defaults', 'info');
  };

  return (
    <DemoRestaurantContext.Provider
      value={{
        dishes,
        addDish,
        updateDish,
        deleteDish,
        toggleDishAvailability,
        orders,
        placeOrder,
        updateOrderStatus,
        tables,
        setTables,
        transferTableOrder,
        waiterRequests,
        createWaiterRequest,
        updateWaiterRequestStatus,
        cancelWaiterRequest,
        reservations,
        createReservation,
        updateReservationStatus,
        currentUser,
        login,
        logout,
        redeemVoucher,
        inventory,
        updateStock,
        suppliers,
        purchaseOrders,
        createPurchaseOrder,
        updatePOStatus,
        expenses,
        addExpense,
        staff,
        updateStaffAttendance,
        waitingList,
        joinWaitlist,
        callWaitlistParty,
        leaveWaitlist,
        feedbacks,
        submitFeedback,
        reportsData: initialReportsData,
        resetDemoData,
        toast,
        showToast
      }}
    >
      {children}
    </DemoRestaurantContext.Provider>
  );
};

export const useDemoRestaurant = () => useContext(DemoRestaurantContext);
