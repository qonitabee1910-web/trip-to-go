import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing";
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* Customer */}
          <Route path="/customer" element={<CustomerHome />} />
          <Route path="/customer/shuttle" element={<ShuttleBooking />} />
          <Route path="/customer/history" element={<CustomerHistory />} />
          <Route path="/customer/profile" element={<CustomerProfile />} />
          {/* Admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminRayons />} />
            <Route path="pricing" element={<AdminPricing />} />
            <Route path="vehicles" element={<AdminVehicles />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="stats" element={<AdminStats />} />
          </Route>
          {/* Driver */}
          <Route path="/driver" element={<DriverApp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
