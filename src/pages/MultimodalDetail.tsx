import { ArrowLeft, Calendar, Wallet, Leaf, ChevronRight, Car, Train, Bus, Footprints, Bike } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTrip } from "@/contexts/TripContext";
import MultimodalIcon from "@/components/MultimodalIcon";
import GoogleMapView from "@/components/Map/GoogleMapView";
import { toast } from "@/hooks/use-toast";

const MultimodalDetail = () => {
  const navigate = useNavigate();
  const { tripState, startTrip } = useTrip();

  const handleConfirm = () => {
    startTrip();
    navigate("/route-confirmation");
  };

  const route = tripState.selectedRoute;

  if (!route) {
    navigate("/choose-ride");
    return null;
  }

  // Price range for all combinations
  const priceRange = { min: 38, max: 245 };
  const fastestDuration = 32;

  // Fastest and Most Affordable combinations for comparison
  const fastestCombo = {
    legs: ['Auto', 'Metro', 'Walk'],
    duration: 32,
    price: 124
  };
  
  const affordableCombo = {
    legs: ['Walk', 'Metro', 'Bus', 'Walk'],
    duration: 55,
    price: 45
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'Auto':
      case 'Uber Go':
      case 'Go Sedan':
        return <Car className="w-3 h-3" />;
      case 'Bike':
        return <Bike className="w-3 h-3" />;
      case 'Metro':
      case 'Train':
        return <Train className="w-3 h-3" />;
      case 'Bus':
        return <Bus className="w-3 h-3" />;
      case 'Walk':
        return <Footprints className="w-3 h-3" />;
      default:
        return <Car className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-uber">
      {/* Map Area */}
      <div className="relative h-[40vh] bg-secondary flex-shrink-0">
        <GoogleMapView
          pickup={tripState.pickup ? { lat: tripState.pickup.lat, lng: tripState.pickup.lng } : { lat: 28.6315, lng: 77.2167 }}
          destination={tripState.destination ? { lat: tripState.destination.lat, lng: tripState.destination.lng } : null}
          showRoute={!!tripState.destination}
          height="100%"
          interactive={true}
        >
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full shadow-lg bg-white hover:bg-white/90 h-9 w-9"
              onClick={() => navigate("/choose-ride")}
            >
              <ArrowLeft className="w-4 h-4 text-black" />
            </Button>
          </div>
          
          <div className="absolute top-16 left-3 bg-white px-2 py-1 rounded-full shadow-md text-xs font-medium z-10">
            {tripState.pickup?.name || "Connaught Place"}
          </div>
          <div className="absolute top-24 left-3 bg-white px-2 py-1 rounded-full shadow-md text-xs font-medium z-10">
            {tripState.destination?.name || "DLF Cyber Park"}
          </div>
        </GoogleMapView>
      </div>

      {/* Details Card */}
      <div className="flex-1 bg-card rounded-t-2xl -mt-6 relative z-10 shadow-2xl overflow-y-auto">
        <div className="px-4 py-4">
          <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />

          <h2 className="text-lg font-bold mb-3">Confirm details</h2>

          {/* Multimodal Icon */}
          <div className="flex justify-center mb-3">
            <MultimodalIcon className="w-14 h-14 text-black" />
          </div>

          {/* Route Info */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold">Multimodal Journey</h3>
              <p className="text-lg font-bold">₹{priceRange.min} - ₹{priceRange.max}</p>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              Bike, Auto, Uber Go, Go Sedan, Uber XL (👥 &gt;4), Bus, Metro, Train, Walk · {fastestDuration} min fastest
            </p>

            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1 text-xs">
                <Wallet className="w-3.5 h-3.5 text-success" />
                <span className="text-success font-semibold">
                  Save ₹{route.savings}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Leaf className="w-3.5 h-3.5" />
                <span>{route.carbonSaved}kg CO₂ saved</span>
              </div>
            </div>
          </div>

          {/* Comparison Card - Fastest vs Most Affordable */}
          <div className="mb-4 pb-4 border-b border-border">
            <h3 className="text-sm font-bold mb-3 text-foreground">Your journey comparison</h3>
            <div className="grid grid-cols-2 gap-3">
              {/* Fastest */}
              <div className="bg-background border-2 border-foreground rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-base">⚡</span>
                  <span className="text-sm font-bold text-foreground">Fastest</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {fastestCombo.legs.map((leg, i) => (
                    <div key={i} className="flex items-center gap-0.5">
                      <div className="w-5 h-5 rounded bg-secondary flex items-center justify-center">
                        {getModeIcon(leg)}
                      </div>
                      {i < fastestCombo.legs.length - 1 && <span className="text-xs text-muted-foreground">›</span>}
                    </div>
                  ))}
                </div>
                <p className="text-base font-bold text-foreground">{fastestCombo.duration} min</p>
                <p className="text-sm text-muted-foreground">₹{fastestCombo.price}</p>
              </div>

              {/* Most Affordable */}
              <div className="bg-background border-2 border-foreground rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-base">💰</span>
                  <span className="text-sm font-bold text-foreground">Affordable</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {affordableCombo.legs.map((leg, i) => (
                    <div key={i} className="flex items-center gap-0.5">
                      <div className="w-5 h-5 rounded bg-secondary flex items-center justify-center">
                        {getModeIcon(leg)}
                      </div>
                      {i < affordableCombo.legs.length - 1 && <span className="text-xs text-muted-foreground">›</span>}
                    </div>
                  ))}
                </div>
                <p className="text-base font-bold text-foreground">{affordableCombo.duration} min</p>
                <p className="text-sm text-muted-foreground">₹{affordableCombo.price}</p>
              </div>
            </div>
          </div>

          {/* Multimodal vs Individual Uber Rides Comparison */}
          <div className="mb-4 pb-4 border-b border-border">
            <h3 className="text-sm font-bold mb-1 text-foreground">Multimodal vs Individual Rides</h3>
            <p className="text-xs text-muted-foreground mb-3">
              See how multimodal saves compared to taking individual Uber rides
            </p>
            
            <div className="space-y-2">
              {/* Uber Go Comparison */}
              <div className="bg-secondary/50 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                      <Car className="w-4 h-4 text-background" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Uber Go</p>
                      <p className="text-xs text-muted-foreground">Individual ride</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold">₹245</p>
                    <p className="text-xs text-muted-foreground">48 min</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-destructive font-semibold">+₹{245 - route.totalPrice}</span>
                    <span className="text-muted-foreground">costly</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-destructive font-semibold">+{48 - route.totalDuration} min</span>
                    <span className="text-muted-foreground">slower</span>
                  </div>
                </div>
              </div>

              {/* Auto Comparison */}
              <div className="bg-secondary/50 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                      <Bike className="w-4 h-4 text-background" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Auto Rickshaw</p>
                      <p className="text-xs text-muted-foreground">Individual ride</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold">₹180</p>
                    <p className="text-xs text-muted-foreground">52 min</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-destructive font-semibold">+₹{180 - route.totalPrice}</span>
                    <span className="text-muted-foreground">costly</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-destructive font-semibold">+{52 - route.totalDuration} min</span>
                    <span className="text-muted-foreground">slower</span>
                  </div>
                </div>
              </div>

              {/* Go Sedan Comparison */}
              <div className="bg-secondary/50 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                      <Car className="w-4 h-4 text-background" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Go Sedan</p>
                      <p className="text-xs text-muted-foreground">Individual ride</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold">₹295</p>
                    <p className="text-xs text-muted-foreground">46 min</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-destructive font-semibold">+₹{295 - route.totalPrice}</span>
                    <span className="text-muted-foreground">costly</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-destructive font-semibold">+{46 - route.totalDuration} min</span>
                    <span className="text-muted-foreground">slower</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Benefits */}
            <div className="mt-3 bg-success/10 border border-success/30 rounded-xl p-3">
              <p className="text-sm font-bold text-success mb-1.5">
                ✓ Multimodal Benefits
              </p>
              <div className="space-y-1 text-xs text-success/80">
                <p>• Save ₹{245 - route.totalPrice}-₹{295 - route.totalPrice} vs individual rides</p>
                <p>• Up to {Math.abs(48 - route.totalDuration)} min faster than cars in traffic</p>
                <p>• {route.carbonSaved}kg less CO₂ emissions</p>
                <p>• More reliable with metro/train (no traffic delays)</p>
              </div>
            </div>
          </div>

          {/* Why Multimodal */}
          <Card className="mb-4 p-3 bg-accent/5 border-accent/20">
            <h3 className="text-xs font-bold mb-2">Why choose multimodal?</h3>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li className="flex items-start gap-1.5">
                <span className="text-success mt-0.5">✓</span>
                <span>Save up to ₹{route.savings} compared to regular rides</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-success mt-0.5">✓</span>
                <span>Reduce carbon footprint by {route.carbonSaved}kg CO₂</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-success mt-0.5">✓</span>
                <span>Avoid traffic with Metro during peak hours</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-success mt-0.5">✓</span>
                <span>Public Bus routes cover areas not connected by metro</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-success mt-0.5">✓</span>
                <span>Suburban trains connect distant suburbs quickly</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-success mt-0.5">✓</span>
                <span>Seamless transitions between all transport modes</span>
              </li>
            </ul>
          </Card>

          {/* Payment Method - UPI */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">₹</span>
              </div>
              <span className="text-xl font-bold">UPI</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                toast({
                  title: "Out of scope",
                  description: "This feature is not available in this prototype",
                  className: "backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl text-black",
                });
              }}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleConfirm}
              className="flex-1 h-11 bg-black text-white hover:bg-black/90 font-semibold text-sm"
            >
              Choose Multimodal
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 border-2"
              onClick={() => {
                toast({
                  title: "Out of scope",
                  description: "This feature is not available in this prototype",
                  className: "backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl text-black",
                });
              }}
            >
              <Calendar className="w-4 h-4" />
            </Button>
          </div>

          <Button
            variant="link"
            className="w-full mt-3 text-xs"
            onClick={() => navigate("/choose-ride")}
          >
            View alternative options
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MultimodalDetail;
