import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, MoreVertical, CreditCard, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";
import GoogleMapView from "@/components/Map/GoogleMapView";

const TripSearch = () => {
  const navigate = useNavigate();
  const { tripState } = useTrip();
  const [searchProgress, setSearchProgress] = useState(0);
  const [tip, setTip] = useState(0);
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  useEffect(() => {
    // Simulate search progress
    const interval = setInterval(() => {
      setSearchProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Check first leg mode to determine navigation
          setTimeout(() => {
            const firstLeg = tripState.selectedRoute?.legs[0];
            const firstLegMode = firstLeg?.mode;
            
            // Bus → tracking-bus (separate from metro/train)
            if (firstLegMode === 'bus') {
              navigate("/tracking-bus");
            }
            // Metro/Train → tracking-leg2
            else if (['metro', 'suburban-train'].includes(firstLegMode || '')) {
              navigate("/tracking-leg2");
            }
            // Walk → tracking-walk
            else if (firstLegMode === 'walk') {
              navigate("/tracking-walk");
            }
            // Ride modes (auto/bike/uber) → tracking-leg1
            else {
              navigate("/tracking-leg1");
            }
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [navigate, tripState.selectedRoute]);

  const handleTipSelect = (amount: number) => {
    setTip(amount);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Map Section - Transitioning between 20vh and 65vh */}
      <div 
        className={`relative transition-all duration-500 ease-in-out bg-secondary flex-shrink-0 ${
          isMapExpanded ? "h-[65vh]" : "h-[20vh]"
        }`}
      >
        <GoogleMapView
          pickup={tripState.pickup ? { lat: tripState.pickup.lat, lng: tripState.pickup.lng } : { lat: 28.6315, lng: 77.2167 }}
          destination={tripState.destination ? { lat: tripState.destination.lat, lng: tripState.destination.lng } : null}
          showRoute={!!tripState.destination}
          height="100%"
          interactive={isMapExpanded}
        >
          {/* Map Expand/Minimize Button */}
          <Button 
            variant="secondary"
            size="sm"
            className={`absolute top-4 right-4 rounded-full shadow-lg font-semibold transition-colors z-20 ${
              isMapExpanded ? "bg-black text-white" : "bg-white text-black hover:bg-white/90"
            }`}
            onClick={() => setIsMapExpanded(!isMapExpanded)}
          >
            <MapPin className="w-4 h-4 mr-2" />
            {isMapExpanded ? "Minimize" : "Map"}
          </Button>

          {/* Route Labels - Only show when expanded or slightly adjusted for minimized */}
          <div className={`absolute left-4 right-4 space-y-2 z-10 transition-all duration-500 ${
            isMapExpanded ? "top-20" : "top-12"
          }`}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-foreground" />
              <span className="text-sm font-medium bg-white/80 backdrop-blur px-2 py-0.5 rounded">{tripState.pickup?.name}</span>
            </div>
            {isMapExpanded && (
              <>
                <div className="flex items-center gap-2 ml-1">
                  <div className="w-0.5 h-8 bg-border" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 border-2 border-foreground bg-background rounded-sm" />
                  <span className="text-sm font-medium bg-white/80 backdrop-blur px-2 py-0.5 rounded">{tripState.destination?.name}</span>
                </div>
              </>
            )}
          </div>
        </GoogleMapView>
      </div>

      {/* Bottom Card */}
      <div className="flex-1 bg-card rounded-t-3xl -mt-8 relative z-10 p-6 overflow-y-auto">
        <div className="w-12 h-1 bg-border rounded-full mx-auto mb-6" />
        
        {/* Status */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1">Trip requested</h2>
          <p className="text-muted-foreground">Finding drivers nearby</p>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-secondary rounded-full overflow-hidden mb-8">
          <div
            className="h-full bg-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${searchProgress}%` }}
          />
        </div>

        {/* Trip Details Card */}
        <div className="bg-background border border-border rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold">Trip details</h3>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center gap-1 mt-1">
              <div className="w-2 h-2 rounded-full bg-foreground" />
              <div className="w-0.5 h-12 bg-border" />
              <div className="w-2 h-2 border-2 border-foreground bg-background rounded-sm" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <p className="font-medium">{tripState.pickup?.name}</p>
                <p className="text-xs text-muted-foreground">{tripState.pickup?.address}</p>
              </div>
              <div>
                <p className="font-medium">{tripState.destination?.name}</p>
                <p className="text-xs text-muted-foreground">{tripState.destination?.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Extra Tip */}
        <div className="mb-6">
          <h3 className="font-bold mb-3">Add extra for your driver</h3>
          <div className="flex gap-2">
            {[50, 75, 100].map((amount) => (
              <Button
                key={amount}
                variant={tip === amount ? "default" : "outline"}
                className="flex-1 rounded-full"
                onClick={() => handleTipSelect(amount)}
              >
                +₹{amount}
              </Button>
            ))}
          </div>
        </div>

        {/* Current Price */}
        <div className="bg-background border border-border rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              <span className="text-sm text-muted-foreground">Current price</span>
            </div>
            <span className="text-xl font-bold">
              ₹{(tripState.selectedRoute?.totalPrice || 0) + tip}
            </span>
          </div>
        </div>

        {/* Confirm Button */}
        <Button 
          disabled 
          className="w-full h-12 rounded-xl font-semibold opacity-50"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default TripSearch;
