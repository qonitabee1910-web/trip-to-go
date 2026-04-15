import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import CustomerHome from "./pages/customer/CustomerHome";
import ShuttleBooking from "./pages/customer/ShuttleBooking";
import CustomerHistory from "./pages/customer/CustomerHistory";
import CustomerProfile from "./pages/customer/CustomerProfile";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminRayons from "./pages/admin/AdminRayons";
import AdminPricing from "./pages/admin/AdminPricing";
import AdminVehicles from "./pages/admin/AdminVehicles";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminStats from "./pages/admin/AdminStats";
import DriverApp from "./pages/driver/DriverApp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          {/* Customer */}
          <Route path="/customer" element={<ProtectedRoute requiredRole="user"><CustomerHome /></ProtectedRoute>} />
          <Route path="/customer/shuttle" element={<ProtectedRoute requiredRole="user"><ShuttleBooking /></ProtectedRoute>} />
          <Route path="/customer/history" element={<ProtectedRoute requiredRole="user"><CustomerHistory /></ProtectedRoute>} />
          <Route path="/customer/profile" element={<ProtectedRoute requiredRole="user"><CustomerProfile /></ProtectedRoute>} />
          {/* Admin */}
          <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminRayons />} />
            <Route path="pricing" element={<AdminPricing />} />
            <Route path="vehicles" element={<AdminVehicles />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="stats" element={<AdminStats />} />
          </Route>
          {/* Driver */}
          <Route path="/driver" element={<ProtectedRoute requiredRole="driver"><DriverApp /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
