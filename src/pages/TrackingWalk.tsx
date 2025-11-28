import { X, Footprints, MapPin, Play, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

type WalkStatus = 'ready' | 'walking' | 'arrived';

const TrackingWalk = () => {
  const navigate = useNavigate();
  const { completeTrip, tripState, nextLeg, setTransitProgress, setTransitEta, setTransitRideStarted } = useTrip();
  const [status, setStatus] = useState<WalkStatus>('ready');
  const [progress, setProgress] = useState(0);
  
  const currentLeg = tripState.selectedRoute?.legs[tripState.currentLeg];
  const nextLegData = tripState.selectedRoute?.legs[tripState.currentLeg + 1];
  const isLastLeg = !tripState.selectedRoute || tripState.currentLeg >= tripState.selectedRoute.legs.length - 1;
  const isNextLegBus = nextLegData?.mode === 'bus';
  const isNextLegMetroTrain = nextLegData && ['metro', 'suburban-train'].includes(nextLegData.mode);
  const isNextLegRide = nextLegData && ['auto', 'bike', 'uber-go', 'go-sedan', 'uber-xl'].includes(nextLegData.mode);

  const walkDuration = currentLeg?.duration || 6;
  const walkDistance = currentLeg?.distance || 400;

  // Walking progress simulation
  useEffect(() => {
    if (status === 'walking') {
      const totalTimeMs = walkDuration * 1000; // Simulated as 1 second per minute
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

    if (isLastLeg) {
      completeTrip();
      navigate('/trip-complete');
    } else if (isNextLegBus) {
      navigate('/tracking-bus');
    } else if (isNextLegMetroTrain) {
      navigate('/tracking-leg2');
    } else if (isNextLegRide) {
      navigate('/tracking-leg3');
    } else {
      // Another walk leg (unlikely but handle it)
      navigate('/tracking-walk');
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

      {/* Map Area */}
      <div className="relative h-[35vh] bg-secondary">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-20">🚶</div>
        </div>
        <div className="absolute top-3 left-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="bg-card/90 backdrop-blur rounded-full h-9 w-9">
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Walking path visualization */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-card/95 backdrop-blur rounded-xl p-3 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <div className="w-0.5 h-8 bg-primary/30 my-1" />
                <div className="w-3 h-3 bg-foreground rounded-sm" />
              </div>
              <div className="flex-1">
                <div className="mb-3">
                  <p className="text-xs text-foreground/60">From</p>
                  <p className="font-medium text-sm">{currentLeg?.from || "Current Location"}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60">To</p>
                  <p className="font-medium text-sm">{currentLeg?.to || "Destination"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Card */}
      <div className="flex-1 bg-card rounded-t-2xl -mt-4 relative z-10 flex flex-col">
        <div className="w-10 h-1 bg-border rounded-full mx-auto mt-2 mb-3" />
        
        <div className="px-4 flex-1 pb-24">
          <p className="text-xs text-foreground/60 mb-0.5">
            Leg {(tripState.currentLeg || 0) + 1} of {tripState.selectedRoute?.legs.length || 1} • Walking
          </p>
          <h2 className={`text-xl font-bold mb-4 ${status === 'arrived' ? 'text-green-600' : ''}`}>
            {status === 'arrived' ? `Arrived at ${currentLeg?.to}` : `Walk to ${currentLeg?.to}`}
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
                  {isNextLegBus ? '🚌' : isNextLegMetroTrain ? '🚇' : isNextLegRide ? '🚗' : '🚶'}
                </span>
                <div>
                  <p className="font-medium text-sm">
                    {isNextLegBus ? `Bus from ${nextLegData.from}` :
                     isNextLegMetroTrain ? `${nextLegData.mode === 'metro' ? 'Metro' : 'Train'} from ${nextLegData.from}` : 
                     isNextLegRide ? `${nextLegData.mode === 'auto' ? 'Auto' : nextLegData.mode === 'bike' ? 'Bike' : 'Cab'} to ${nextLegData.to}` :
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