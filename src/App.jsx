import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

// Providers
import { LanguageProvider } from './context/LanguageContext';
import { NotificationProvider } from './context/NotificationContext';
import { DemoRestaurantProvider } from './context/DemoRestaurantContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Common UI & Layouts
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import Toast from './components/common/Toast';
import CustomCursor from './components/common/CustomCursor';
import ScrollProgress from './components/common/ScrollProgress';
import LoadingScreen from './components/common/LoadingScreen';
import PwaInstallPrompt from './components/common/PwaInstallPrompt';

// Customer Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Offers from './pages/Offers';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Reservation from './pages/Reservation';
import OrderTracking from './pages/OrderTracking';
import CustomerProfile from './pages/CustomerProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import TableOrdering from './pages/TableOrdering';
import Rewards from './pages/Rewards';
import Waitlist from './pages/Waitlist';
import GroupOrdering from './pages/GroupOrdering';
import DeliveryTracking from './pages/DeliveryTracking';

// Admin Management System
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import PosTerminal from './admin/PosTerminal';
import Orders from './admin/Orders';
import KitchenDisplay from './admin/KitchenDisplay';
import MenuManagement from './admin/MenuManagement';
import InventoryManagement from './admin/InventoryManagement';
import SuppliersManagement from './admin/SuppliersManagement';
import ExpensesManagement from './admin/ExpensesManagement';
import StaffManagement from './admin/StaffManagement';
import TableManagement from './admin/TableManagement';
import WaiterRequests from './admin/WaiterRequests';
import Reservations from './admin/Reservations';
import Analytics from './admin/Analytics';
import Reports from './admin/Reports';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Customer Storefront Layout with Header & Footer
function CustomerLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-bgLight">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <LanguageProvider>
      <NotificationProvider>
        <DemoRestaurantProvider>
          <CartProvider>
            <WishlistProvider>
              {isLoading && (
                <LoadingScreen onComplete={() => setIsLoading(false)} />
              )}

              <BrowserRouter>
                <ScrollToTop />
                <ScrollProgress />
                <CustomCursor />
                <Toast />
                <CartDrawer />
                <PwaInstallPrompt />

                <Routes>
                  {/* Customer Facing Routes */}
                  <Route element={<CustomerLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/reservation" element={<Reservation />} />
                    <Route path="/order-tracking" element={<OrderTracking />} />
                    <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
                    <Route path="/delivery-tracking" element={<DeliveryTracking />} />
                    <Route path="/delivery-tracking/:orderId" element={<DeliveryTracking />} />
                    <Route path="/rewards" element={<Rewards />} />
                    <Route path="/waitlist" element={<Waitlist />} />
                    <Route path="/group-order" element={<GroupOrdering />} />
                    <Route path="/profile" element={<CustomerProfile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/table/:tableId" element={<TableOrdering />} />
                  </Route>

                  {/* Admin Management System Routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="pos" element={<PosTerminal />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="kds" element={<KitchenDisplay />} />
                    <Route path="menu" element={<MenuManagement />} />
                    <Route path="inventory" element={<InventoryManagement />} />
                    <Route path="suppliers" element={<SuppliersManagement />} />
                    <Route path="expenses" element={<ExpensesManagement />} />
                    <Route path="staff" element={<StaffManagement />} />
                    <Route path="tables" element={<TableManagement />} />
                    <Route path="waiter-requests" element={<WaiterRequests />} />
                    <Route path="reservations" element={<Reservations />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="reports" element={<Reports />} />
                  </Route>

                  {/* Catch-all redirect */}
                  <Route path="*" element={<Home />} />
                </Routes>
              </BrowserRouter>
            </WishlistProvider>
          </CartProvider>
        </DemoRestaurantProvider>
      </NotificationProvider>
    </LanguageProvider>
  );
}
