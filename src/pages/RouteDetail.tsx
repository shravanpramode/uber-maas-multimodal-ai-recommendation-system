import { ArrowLeft, Car, Train, Bus, Footprints, Bike, Users, Clock, MapPin } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip, RouteLeg } from "@/contexts/TripContext";
import { useEffect } from "react";

const RouteDetail = () => {
  const navigate = useNavigate();
  const { routeId } = useParams();
  const { tripState } = useTrip();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const route = tripState.availableRoutes?.find(r => r.id === routeId);
  const passengerCount = tripState.passengerCount || 1;

  if (!route) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground/60">Route not found</p>
      </div>
    );
  }

  const getModeIcon = (mode: RouteLeg['mode'], size: string = "w-5 h-5") => {
    switch (mode) {
      case 'auto':
      case 'uber-go':
      case 'go-sedan':
      case 'uber-xl':
        return <Car className={size} />;
      case 'bike':
        return <Bike className={size} />;
      case 'metro':
      case 'suburban-train':
        return <Train className={size} />;
      case 'bus':
        return <Bus className={size} />;
      case 'walk':
        return <Footprints className={size} />;
      default:
        return <Car className={size} />;
    }
  };

  const getModeName = (mode: RouteLeg['mode']) => {
    switch (mode) {
      case 'auto': return 'Auto';
      case 'bike': return 'Bike';
      case 'uber-go': return 'Uber Go';
      case 'go-sedan': return 'Go Sedan';
      case 'uber-xl': return 'Uber XL';
      case 'metro': return 'Metro';
      case 'bus': return 'Bus';
      case 'suburban-train': return 'Train';
      case 'walk': return 'Walk';
      default: return mode;
    }
  };

  const isTransitMode = (mode: RouteLeg['mode']) => {
    return ['metro', 'bus', 'suburban-train'].includes(mode);
  };

  const isRideMode = (mode: RouteLeg['mode']) => {
    return ['auto', 'bike', 'uber-go', 'go-sedan', 'uber-xl'].includes(mode);
  };

  const formatDistance = (meters?: number) => {
    if (!meters) return '';
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)} km`;
    }
    return `${meters}m`;
  };

  const getLegPrice = (leg: RouteLeg) => {
    if (!leg.price) return 'Free';
    if (isTransitMode(leg.mode)) {
      return `₹${leg.price * passengerCount}`;
    }
    return `₹${leg.price}`;
  };

  const getModeColor = (mode: RouteLeg['mode']) => {
    switch (mode) {
      case 'metro': return 'bg-yellow-500';
      case 'bus': return 'bg-green-500';
      case 'suburban-train': return 'bg-blue-500';
      case 'walk': return 'bg-gray-400';
      default: return 'bg-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center h-14 px-4">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 flex items-center justify-center -ml-2 rounded-full hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold ml-2">Route Details</h1>
        </div>
      </header>

      {/* Route Summary */}
      <div className="px-4 py-4 bg-secondary/50 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">₹{route.totalPrice}</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-foreground text-background">
              {route.tag}
            </span>
          </div>
          <div className="flex items-center gap-1 bg-background px-2.5 py-1 rounded-full border border-border">
            <Users className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">{passengerCount}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-foreground/70">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{route.totalDuration} mins</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{route.distance} km</span>
          </div>
          <span>Arrive {route.eta}</span>
        </div>
      </div>

      {/* Journey Timeline */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        {/* Origin */}
        <div className="flex items-start gap-3 mb-2">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <div className="w-0.5 h-6 bg-border" />
          </div>
          <div>
            <p className="font-semibold text-sm">{tripState.pickup?.name || "Origin"}</p>
            <p className="text-xs text-foreground/60">Start point</p>
          </div>
        </div>

        {/* Legs */}
        {route.legs.map((leg, idx) => (
          <div key={idx} className="mb-2">
            {/* Leg Card */}
            <div className="ml-1 pl-5 border-l-2 border-border relative">
              {/* Connection dot */}
              <div className={`absolute -left-[5px] top-4 w-2 h-2 rounded-full ${getModeColor(leg.mode)}`} />
              
              <div className="bg-card border border-border rounded-xl p-3 mb-2">
                {/* Leg Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getModeColor(leg.mode)} text-white`}>
                      {getModeIcon(leg.mode, "w-4 h-4")}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{getModeName(leg.mode)}</p>
                      {leg.lineInfo && (
                        <p className="text-xs text-foreground/60">{leg.lineInfo}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{getLegPrice(leg)}</p>
                    {isTransitMode(leg.mode) && passengerCount > 1 && (
                      <p className="text-[10px] text-foreground/50">
                        ₹{leg.price} × {passengerCount}
                      </p>
                    )}
                  </div>
                </div>

                {/* Leg Details */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                  <div className="bg-secondary rounded-lg p-2">
                    <p className="text-foreground/60">Duration</p>
                    <p className="font-semibold">{leg.duration} mins</p>
                  </div>
                  <div className="bg-secondary rounded-lg p-2">
                    <p className="text-foreground/60">Distance</p>
                    <p className="font-semibold">{formatDistance(leg.distance)}</p>
                  </div>
                </div>

                {/* From/To */}
                <div className="flex items-start gap-2">
                  <div className="flex flex-col items-center pt-0.5">
                    <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full" />
                    <div className="w-0.5 h-4 bg-foreground/20" />
                    <div className="w-1.5 h-1.5 bg-foreground rounded-sm" />
                  </div>
                  <div className="flex-1 text-xs">
                    <p className="text-foreground/60 mb-2">{leg.from}</p>
                    <p className="font-medium">{leg.to}</p>
                  </div>
                </div>

                {/* Vehicle Info for rides */}
                {isRideMode(leg.mode) && leg.vehicleNumber && (
                  <div className="mt-2 pt-2 border-t border-border">
                    <p className="text-xs text-foreground/60">Vehicle</p>
                    <p className="text-xs font-medium">{leg.vehicleNumber}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Destination */}
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-4 bg-border" />
            <div className="w-3 h-3 bg-foreground rounded-sm" />
          </div>
          <div className="pt-2">
            <p className="font-semibold text-sm">{tripState.destination?.name || "Destination"}</p>
            <p className="text-xs text-foreground/60">End point</p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button 
          onClick={() => navigate(-1)}
          className="w-full h-12 text-base font-semibold rounded-xl bg-foreground text-background hover:bg-foreground/90"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default RouteDetail;