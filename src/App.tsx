import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TripProvider } from "./contexts/TripContext";
import Home from "./pages/Home";
import LocationSearch from "./pages/LocationSearch";
import ChooseRide from "./pages/ChooseRide";
import RideDetail from "./pages/RideDetail";
import MultimodalDetail from "./pages/MultimodalDetail";
import RouteConfirmation from "./pages/RouteConfirmation";
import TripSearch from "./pages/TripSearch";
import TrackingLeg1 from "./pages/TrackingLeg1";
import TrackingLeg2 from "./pages/TrackingLeg2";
import TrackingLeg3 from "./pages/TrackingLeg3";
import LiveTracking from "./pages/LiveTracking";
import TripComplete from "./pages/TripComplete";
import PaymentFlow from "./pages/PaymentFlow";
import Receipt from "./pages/Receipt";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TripProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/location-search" element={<LocationSearch />} />
            <Route path="/choose-ride" element={<ChooseRide />} />
            <Route path="/ride-detail" element={<RideDetail />} />
            <Route path="/multimodal-detail" element={<MultimodalDetail />} />
            <Route path="/route-confirmation" element={<RouteConfirmation />} />
            <Route path="/tracking-leg1" element={<TrackingLeg1 />} />
            <Route path="/tracking-leg2" element={<TrackingLeg2 />} />
            <Route path="/tracking-leg3" element={<TrackingLeg3 />} />
            <Route path="/trip-search" element={<TripSearch />} />
            <Route path="/live-tracking" element={<LiveTracking />} />
            <Route path="/trip-complete" element={<TripComplete />} />
            <Route path="/payment" element={<PaymentFlow />} />
            <Route path="/receipt" element={<Receipt />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TripProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
