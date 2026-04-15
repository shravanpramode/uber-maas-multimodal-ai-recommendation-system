import { X, Phone, MessageCircle, MoreHorizontal, User, Play, Bike, Car, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";
import { useEffect, useState } from "react";
import AnimatedProgressBar from "@/components/AnimatedProgressBar";
import GoogleMapView from "@/components/Map/GoogleMapView";
type TrackingStatus = 'pickup_countdown' | 'ride_here' | 'in_transit' | 'arrived';

// Helper function to get mode-specific vehicle/driver info
const getModeInfo = (mode: string) => {
  switch (mode) {
    case 'bike':
      return { 
        vehicleModel: 'Hero Splendor', 
        vehicleType: 'Bike', 
        color: 'Black',
        driverName: 'Rajesh Kumar',
        rating: 4.85,
        trips: 1234
      };
    case 'auto':
      return { 
        vehicleModel: 'Auto Rickshaw', 
        vehicleType: 'Auto', 
        color: 'Green/Yellow',
        driverName: 'M Dhinesh Kumar',
        rating: 4.72,
        trips: 2156
      };
    case 'uber-go':
      return { 
        vehicleModel: 'Maruti Swift', 
        vehicleType: 'Uber Go', 
        color: 'White',
        driverName: 'Suresh Sharma',
        rating: 4.91,
        trips: 1892
      };
    case 'go-sedan':
      return { 
        vehicleModel: 'Honda City', 
        vehicleType: 'Go Sedan', 
        color: 'Silver',
        driverName: 'Vikram Singh',
        rating: 4.95,
        trips: 3421
      };
    case 'uber-xl':
      return { 
        vehicleModel: 'Toyota Innova', 
        vehicleType: 'Uber XL', 
        color: 'White',
        driverName: 'Amit Patel',
        rating: 4.88,
        trips: 2789
      };
    default:
      return { 
        vehicleModel: 'Maruti Swift', 
        vehicleType: 'Uber Go', 
        color: 'White',
        driverName: 'Driver',
        rating: 4.80,
        trips: 1500
      };
  }
};

const getVehicleIcon = (mode: string) => {
  if (mode === 'bike') return <Bike className="w-5 h-5 text-foreground/50" />;
  return <Car className="w-5 h-5 text-foreground/50" />;
};

const TrackingLeg1 = () => {
  const navigate = useNavigate();
  const { nextLeg, tripState, setTransitProgress, setTransitEta, setTransitRideStarted } = useTrip();
  const [status, setStatus] = useState<TrackingStatus>('pickup_countdown');
  const [countdown, setCountdown] = useState(5);
  const [progress, setProgress] = useState(0);
  const [isMapExpanded, setIsMapExpanded] = useState(true);
  const totalTime = 8;

  const currentLegIndex = tripState.currentLeg;
  const currentLeg = tripState.selectedRoute?.legs[currentLegIndex];
  const nextLegIndex = currentLegIndex + 1;
  const nextLegData = tripState.selectedRoute?.legs[nextLegIndex];

  // Logic to determine where to go next
  const navigateToNextLeg = () => {
    if (!nextLegData) {
      navigate('/trip-complete');
      return;
    }

    const { mode } = nextLegData;
    if (mode === 'bus') {
      navigate('/tracking-bus');
    } else if (['metro', 'suburban-train'].includes(mode)) {
      navigate('/tracking-leg2');
    } else if (mode === 'walk') {
      navigate('/tracking-walk');
    } else {
      // For auto, bike, uber-go, etc.
      // If it's a subsequent ride leg, go to leg3
      navigate('/tracking-leg3');
    }
  };

  // Get mode-specific info
  const modeInfo = getModeInfo(currentLeg?.mode || 'auto');

  // Phase 1: Pickup countdown (5 seconds)
  useEffect(() => {
    if (status === 'pickup_countdown') {
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setStatus('ride_here');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [status]);

  // Phase 3: In-transit progress
  useEffect(() => {
    if (status === 'in_transit') {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / (totalTime * 2));
          if (newProgress >= 100) {
            clearInterval(interval);
            setStatus('arrived');
            return 100;
          }
          return newProgress;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [status]);

  // Phase 4: After arrival, auto-navigate
  useEffect(() => {
    if (status === 'arrived') {
      const timeout = setTimeout(() => {
        nextLeg();
        // Reset transit state for next leg
        setTransitProgress(0);
        setTransitEta(12);
        setTransitRideStarted(false);
        
        navigateToNextLeg();
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [status, navigate, nextLeg, setTransitProgress, setTransitEta, setTransitRideStarted]);

  const handleStartTrip = () => {
    setStatus('in_transit');
  };

  const pin = ['2', '5', '6', '1'];
  const vehicleNumber = currentLeg?.vehicleNumber || "TN18AM9263";

  const getStatusText = () => {
    switch (status) {
      case 'pickup_countdown': return `Your ${modeInfo.vehicleType} arrives in ${countdown}s`;
      case 'ride_here': return `Your ${modeInfo.vehicleType} is here`;
      case 'in_transit': return 'In-Transit';
      case 'arrived': return `You've arrived at ${currentLeg?.to || 'destination'}`;
    }
  };

  const totalLegs = tripState.selectedRoute?.legs.length || 3;
  const startPos = { lat: tripState.pickup?.lat ?? 28.6315, lng: tripState.pickup?.lng ?? 77.2167 };
  const endPos = { lat: tripState.destination?.lat ?? 28.6139, lng: tripState.destination?.lng ?? 77.2090 };
  
  const pickupCoords = {
    lat: startPos.lat + (endPos.lat - startPos.lat) * (currentLegIndex / totalLegs),
    lng: startPos.lng + (endPos.lng - startPos.lng) * (currentLegIndex / totalLegs)
  };
  
  const stationCoords = {
    lat: startPos.lat + (endPos.lat - startPos.lat) * ((currentLegIndex + 1) / totalLegs),
    lng: startPos.lng + (endPos.lng - startPos.lng) * ((currentLegIndex + 1) / totalLegs)
  };

  const driverProgress = status === 'in_transit' ? progress / 100 : 0;
  const driverLat = pickupCoords.lat + (stationCoords.lat - pickupCoords.lat) * driverProgress;
  const driverLng = pickupCoords.lng + (stationCoords.lng - pickupCoords.lng) * driverProgress;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Compact Floating Progress Card */}
      <div className="mx-3 mt-3">
        <div className="bg-foreground text-background px-4 py-2 rounded-2xl shadow-lg">
          {status === 'arrived' && (
            <span className="text-[10px] bg-green-500 px-2 py-0.5 rounded-full font-bold mb-1 inline-block">
              Arrived
            </span>
          )}
          <AnimatedProgressBar progress={progress} mode={currentLeg?.mode || 'auto'} />
        </div>
      </div>

      {/* Map Area - Transitioning between 15vh and 50vh (default) */}
      <div 
        className={`relative transition-all duration-500 ease-in-out bg-secondary flex-shrink-0 ${
          isMapExpanded ? "h-[50vh]" : "h-[15vh]"
        }`}
      >
        <GoogleMapView
          pickup={pickupCoords}
          destination={stationCoords}
          showRoute={true}
          driverLocation={status === 'in_transit' ? { lat: driverLat, lng: driverLng } : null}
          driverIcon={currentLeg?.mode === 'bike' ? '🏍️' : currentLeg?.mode === 'auto' ? '🛺' : '🚗'}
          height="100%"
          interactive={isMapExpanded}
        >
          {/* Map Expand/Minimize Button */}
          <div className="absolute top-4 right-4 z-20">
            <Button
              variant="secondary"
              size="sm"
              className={`rounded-full shadow-lg font-semibold transition-colors ${
                isMapExpanded ? "bg-black text-white" : "bg-white text-black hover:bg-white/90"
              }`}
              onClick={() => setIsMapExpanded(!isMapExpanded)}
            >
              <MapPin className="w-4 h-4 mr-2" />
              {isMapExpanded ? "Minimize" : "Map"}
            </Button>
          </div>

          <div className="absolute top-3 left-3 z-10">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="bg-card/90 backdrop-blur rounded-full h-9 w-9">
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 bg-card px-3 py-1 rounded-lg shadow-lg z-10 transition-all duration-500 ${
            isMapExpanded ? "opacity-100" : "opacity-0"
          }`}>
            <p className="text-xs font-medium">{tripState.pickup?.name || "Pickup point"}</p>
          </div>
        </GoogleMapView>
      </div>

      {/* Bottom Card */}
      <div className="flex-1 bg-card rounded-t-2xl -mt-4 relative z-10 flex flex-col">
        <div className="w-10 h-1 bg-border rounded-full mx-auto mt-2 mb-2" />
        
        <div className="px-4 flex-1 pb-20">
          <p className="text-xs text-foreground/60 mb-0.5">
            Leg 1 of {tripState.selectedRoute?.legs.length || 1} • {modeInfo.vehicleType}
          </p>
          <h2 className={`text-lg font-bold mb-2 ${status === 'arrived' ? 'text-green-600' : ''}`}>
            {getStatusText()}
          </h2>

          {/* Share PIN - Compact 40% smaller */}
          {(status === 'pickup_countdown' || status === 'ride_here') && (
            <div className="bg-blue-600 rounded-lg p-2 mb-2 flex items-center justify-between">
              <span className="text-white font-bold text-xs">Share PIN</span>
              <div className="flex gap-1">
                {pin.map((digit, i) => (
                  <div key={i} className="w-5 h-6 bg-white rounded flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">{digit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trip Details */}
          <div className="border border-border rounded-xl p-3 mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm">Trip details</span>
              <MoreHorizontal className="w-4 h-4 text-foreground/50" />
            </div>
            <div className="space-y-1">
              <div>
                <p className="text-xs text-foreground/60">Pick-up</p>
                <p className="font-medium text-sm">{currentLeg?.from || tripState.pickup?.name || "Pickup"}</p>
              </div>
              <div>
                <p className="text-xs text-foreground/60">Drop-off</p>
                <p className="font-medium text-sm">{currentLeg?.to || "Destination"}</p>
              </div>
            </div>
          </div>

          {/* Driver Card */}
          <div className="border border-border rounded-xl p-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                {currentLeg?.mode === 'bike' ? getVehicleIcon('bike') : <User className="w-5 h-5 text-foreground/50" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-medium bg-secondary px-1.5 py-0.5 rounded">⭐ {modeInfo.rating}</span>
                </div>
                <p className="font-bold text-sm">{modeInfo.driverName}</p>
                <p className="text-xs text-foreground/60">{modeInfo.trips.toLocaleString()} trips</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm">{vehicleNumber}</p>
                <p className="text-xs text-foreground/60">{modeInfo.color} {modeInfo.vehicleModel}</p>
              </div>
            </div>

            {/* Action Buttons - Only show during pickup phases */}
            {(status === 'pickup_countdown' || status === 'ride_here') && (
              <div className="flex gap-2 mt-3">
                <Button variant="outline" className="flex-1 h-8 rounded-xl font-medium text-xs">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Message
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-xl">
                  <Phone className="w-3 h-3" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-xl">
                  <MoreHorizontal className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Bottom Start Trip Button */}
        {status === 'ride_here' && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
            <Button 
              onClick={handleStartTrip}
              className="w-full h-11 bg-foreground text-background hover:bg-foreground/90 font-bold text-sm rounded-xl"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Trip
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingLeg1;