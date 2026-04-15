import { X, Footprints, MapPin, Play, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import GoogleMapView from "@/components/Map/GoogleMapView";
type WalkStatus = 'ready' | 'walking' | 'arrived';

const TrackingWalk = () => {
  const navigate = useNavigate();
  const { completeTrip, tripState, nextLeg, setTransitProgress, setTransitEta, setTransitRideStarted } = useTrip();
  const [status, setStatus] = useState<WalkStatus>('ready');
  const [progress, setProgress] = useState(0);
  const [isMapExpanded, setIsMapExpanded] = useState(true);
  
  const currentLegIndex = tripState.currentLeg;
  const currentLeg = tripState.selectedRoute?.legs[currentLegIndex];
  const nextLegIndex = currentLegIndex + 1;
  const nextLegData = tripState.selectedRoute?.legs[nextLegIndex];
  const isLastLeg = !nextLegData;

  const walkDuration = currentLeg?.duration || 6;
  const walkDistance = currentLeg?.distance || 400;
  const destinationName = currentLeg?.to || tripState.destination?.name || "Destination";

  // Walking progress simulation
  useEffect(() => {
    if (status === 'walking') {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / (walkDuration * 2));
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
  }, [status, walkDuration]);

  const handleStartWalking = () => {
    setStatus('walking');
  };

  const handleArrived = () => {
    nextLeg();
    // Reset transit state for next leg
    setTransitProgress(0);
    setTransitEta(12);
    setTransitRideStarted(false);

    if (!nextLegData) {
      completeTrip();
      navigate('/trip-complete');
    } else {
      const { mode } = nextLegData;
      if (mode === 'bus') {
        navigate('/tracking-bus');
      } else if (['metro', 'suburban-train'].includes(mode)) {
        navigate('/tracking-leg2');
      } else if (['auto', 'bike', 'uber-go', 'go-sedan', 'uber-xl'].includes(mode)) {
        navigate('/tracking-leg3');
      } else {
        // Another walk leg
        navigate('/tracking-walk');
      }
    }
  };

  const formatDistance = (meters: number) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)} km`;
    }
    return `${meters}m`;
  };

  const getStatusText = () => {
    switch (status) {
      case 'ready': return 'Ready to walk';
      case 'walking': return 'Walking...';
      case 'arrived': return "You've arrived!";
    }
  };

  const totalLegs = tripState.selectedRoute?.legs.length || 3;
  const startPos = { lat: tripState.pickup?.lat ?? 28.6315, lng: tripState.pickup?.lng ?? 77.2167 };
  const endPos = { lat: tripState.destination?.lat ?? 28.6139, lng: tripState.destination?.lng ?? 77.2090 };
  
  const pickupCoords = {
    lat: startPos.lat + (endPos.lat - startPos.lat) * (currentLegIndex / totalLegs),
    lng: startPos.lng + (endPos.lng - startPos.lng) * (currentLegIndex / totalLegs)
  };
  
  const destCoords = {
    lat: startPos.lat + (endPos.lat - startPos.lat) * ((currentLegIndex + 1) / totalLegs),
    lng: startPos.lng + (endPos.lng - startPos.lng) * ((currentLegIndex + 1) / totalLegs)
  };

  const walkerProgress = status === 'walking' ? progress / 100 : 0;
  const walkerLat = pickupCoords.lat + (destCoords.lat - pickupCoords.lat) * walkerProgress;
  const walkerLng = pickupCoords.lng + (destCoords.lng - pickupCoords.lng) * walkerProgress;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header Bar */}
      <div className="bg-foreground text-background px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Footprints className="w-5 h-5" />
            <div>
              <p className="text-base font-bold">{getStatusText()}</p>
              <p className="text-xs text-background/80">
                {status === 'walking' ? `${Math.ceil(walkDuration * (1 - progress/100))} mins remaining` : `${walkDuration} mins • ${formatDistance(walkDistance)}`}
              </p>
            </div>
          </div>
          <span className="text-xs bg-background/20 px-2 py-1 rounded-full font-medium">
            Walk
          </span>
        </div>
        <Progress value={progress} className="h-1.5 bg-background/20" />
      </div>

      {/* Map Area - Transitioning between 15vh and 45vh (default) */}
      <div 
        className={`relative transition-all duration-500 ease-in-out bg-secondary flex-shrink-0 ${
          isMapExpanded ? "h-[45vh]" : "h-[15vh]"
        }`}
      >
        <GoogleMapView
          pickup={pickupCoords}
          destination={destCoords}
          showRoute={true}
          driverLocation={status === 'walking' ? { lat: walkerLat, lng: walkerLng } : null}
          driverIcon="🚶"
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
            <p className="text-xs font-medium">{currentLeg?.to || "Destination"}</p>
          </div>
        </GoogleMapView>
      </div>

      {/* Bottom Card */}
      <div className="flex-1 bg-card rounded-t-2xl -mt-4 relative z-10 flex flex-col">
        <div className="w-10 h-1 bg-border rounded-full mx-auto mt-2 mb-3" />
        
        <div className="px-4 flex-1 pb-24">
          <p className="text-xs text-foreground/60 mb-0.5">
            Leg {(tripState.currentLeg || 0) + 1} of {tripState.selectedRoute?.legs.length || 1} • Walking
          </p>
          <h2 className={`text-xl font-bold mb-4 ${status === 'arrived' ? 'text-green-600' : ''}`}>
            {status === 'arrived' ? `Arrived at ${destinationName}` : `Walk to ${destinationName}`}
          </h2>

          {/* Walk Details */}
          <div className="border border-border rounded-xl p-4 mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-secondary rounded-lg">
                <Footprints className="w-6 h-6 mx-auto mb-1 text-primary" />
                <p className="text-2xl font-bold">{formatDistance(walkDistance)}</p>
                <p className="text-xs text-foreground/60">Distance</p>
              </div>
              <div className="text-center p-3 bg-secondary rounded-lg">
                <MapPin className="w-6 h-6 mx-auto mb-1 text-primary" />
                <p className="text-2xl font-bold">{walkDuration}</p>
                <p className="text-xs text-foreground/60">Minutes</p>
              </div>
            </div>
          </div>

          {/* Next leg preview */}
          {nextLegData && (
            <div className="bg-secondary rounded-xl p-3">
              <p className="text-xs font-semibold text-foreground/60 mb-1">NEXT</p>
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {nextLegData.mode === 'bus' ? '🚌' : 
                   ['metro', 'suburban-train'].includes(nextLegData.mode) ? '🚇' : 
                   ['auto', 'bike', 'uber-go', 'go-sedan', 'uber-xl'].includes(nextLegData.mode) ? '🚗' : '🚶'}
                </span>
                <div>
                  <p className="font-medium text-sm">
                    {nextLegData.mode === 'bus' ? `Bus from ${nextLegData.from}` :
                     ['metro', 'suburban-train'].includes(nextLegData.mode) ? `${nextLegData.mode === 'metro' ? 'Metro' : 'Train'} from ${nextLegData.from}` : 
                     ['auto', 'bike', 'uber-go', 'go-sedan', 'uber-xl'].includes(nextLegData.mode) ? `${nextLegData.mode === 'auto' ? 'Auto' : nextLegData.mode === 'bike' ? 'Bike' : 'Cab'} to ${nextLegData.to}` :
                     `Walk to ${nextLegData.to}`}
                  </p>
                  <p className="text-xs text-foreground/60">{nextLegData.duration} mins</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Fixed Bottom Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
          {status === 'ready' && (
            <Button 
              onClick={handleStartWalking}
              className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-bold text-sm rounded-xl"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Walking
            </Button>
          )}
          {status === 'walking' && (
            <Button 
              onClick={handleArrived}
              variant="outline"
              className="w-full h-12 font-bold text-sm rounded-xl"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              I've Arrived Early
            </Button>
          )}
          {status === 'arrived' && (
            <Button 
              onClick={handleArrived}
              className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-bold text-sm rounded-xl"
            >
              {isLastLeg ? 'Complete Trip' : 'Continue to Next Leg →'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackingWalk;