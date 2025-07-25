import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/admin/Dashboard";
import Categories from "./pages/admin/Categories";
import Dishes from "./pages/admin/Dishes";
import Orders from "./pages/admin/Orders";
import Deliveries from "./pages/admin/Deliveries";
import Drivers from "./pages/admin/Drivers";
import Admins from "./pages/admin/Admins";
import Clients from "./pages/admin/Clients";
import Restaurateurs from "./pages/admin/Restaurateurs";
import DeliveryDashboard from "./pages/delivery/Dashboard";
import DeliveryOrders from "./pages/delivery/Orders";
import DeliveryMap from "./pages/delivery/Map";
import DeliveryHistory from "./pages/delivery/History";
import DeliveryProfile from "./pages/delivery/Profile";
import DeliverySettings from "./pages/delivery/Settings";
import RestaurantLayout from "./components/restaurant/RestaurantLayout";
import RestaurantDashboard from "./pages/restaurant/Dashboard";
import RestaurantSearch from "./pages/RestaurantSearch";
import TableReservation from "./pages/TableReservation";
import OrderHistory from "./pages/OrderHistory";
import OrderTracking from "./pages/OrderTracking";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/restaurants" element={<RestaurantSearch />} />
            <Route path="/reservations" element={<TableReservation />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/order-tracking" element={<OrderTracking />} />
            <Route path="/profile" element={<Profile />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/clients" element={<Clients />} />
            <Route path="/admin/restaurateurs" element={<Restaurateurs />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/dishes" element={<Dishes />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/deliveries" element={<Deliveries />} />
            <Route path="/admin/drivers" element={<Drivers />} />
            <Route path="/admin/admins" element={<Admins />} />

            {/* Delivery Routes */}
            <Route path="/delivery" element={<DeliveryDashboard />} />
            <Route path="/delivery/orders" element={<DeliveryOrders />} />
            <Route path="/delivery/map" element={<DeliveryMap />} />
            <Route path="/delivery/history" element={<DeliveryHistory />} />
            <Route path="/delivery/profile" element={<DeliveryProfile />} />
            <Route path="/delivery/settings" element={<DeliverySettings />} />

            {/* Restaurant Routes */}
            <Route path="/resto" element={<RestaurantLayout />}>
              <Route index element={<RestaurantDashboard />} />
              <Route path="reservations" element={<RestaurantDashboard />} />
              <Route path="orders" element={<RestaurantDashboard />} />
              <Route path="menu" element={<RestaurantDashboard />} />
              <Route path="tracking" element={<RestaurantDashboard />} />
              <Route path="analytics" element={<RestaurantDashboard />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
