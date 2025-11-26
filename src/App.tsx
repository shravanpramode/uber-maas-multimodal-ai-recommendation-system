import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TripProvider } from "./contexts/TripContext";
import Home from "./pages/Home";
import LocationSearch from "./pages/LocationSearch";
import ChooseRide from "./pages/ChooseRide";
import MultimodalDetail from "./pages/MultimodalDetail";
import TripSearch from "./pages/TripSearch";
import LiveTracking from "./pages/LiveTracking";
import TripComplete from "./pages/TripComplete";
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
            <Route path="/multimodal-detail" element={<MultimodalDetail />} />
            <Route path="/trip-search" element={<TripSearch />} />
            <Route path="/live-tracking" element={<LiveTracking />} />
            <Route path="/trip-complete" element={<TripComplete />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TripProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
