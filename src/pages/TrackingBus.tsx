import { X, User, Ticket, Play, Users, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";
import { useEffect, useMemo, useState } from "react";
import AnimatedProgressBar from "@/components/AnimatedProgressBar";

type BusStatus = 'ready' | 'riding' | 'arrived';

const TrackingBus = () => {
  const navigate = useNavigate();
  const { tripState, setTransitProgress, setTransitEta, setTransitRideStarted, nextLeg } = useTrip();
  
  const [status, setStatus] = useState<BusStatus>('ready');
  const [eta, setEta] = useState(12);
  const [progress, setProgress] = useState(0);
  const totalTime = 12;

  const currentLeg = tripState.selectedRoute?.legs[tripState.currentLeg] || tripState.selectedRoute?.legs[0];
  const nextLegData = tripState.selectedRoute?.legs[tripState.currentLeg + 1];
  const isLastLeg = !tripState.selectedRoute || tripState.currentLeg >= tripState.selectedRoute.legs.length - 1;
  const passengerCount = tripState.passengerCount || 1;

  // Generate stops based on current leg
  const stops = useMemo(() => {
    return [
      { name: currentLeg?.from || 'Start', passed: false },
      { name: 'Stop 1', passed: false },
      { name: 'Stop 2', passed: false },
      { name: 'Stop 3', passed: false },
      { name: currentLeg?.to || 'End', passed: false },
    ];
  }, [currentLeg]);

  // Calculate current and next stop based on progress
  const { currentStop, nextStop } = useMemo(() => {
    const stopCount = stops.length;
    const progressPerStop = 100 / (stopCount - 1);
    const currentIndex = Math.min(Math.floor(progress / progressPerStop), stopCount - 2);
    const nextIndex = Math.min(currentIndex + 1, stopCount - 1);
    
    return {
      currentStop: stops[currentIndex]?.name || stops[0]?.name,
      nextStop: stops[nextIndex]?.name || stops[stops.length - 1]?.name,
    };
  }, [progress, stops]);

  // Progress simulation when riding
  useEffect(() => {
    if (status !== 'riding') return;
    
    const interval = setInterval(() => {
      const newEta = eta - 0.75;
      const newProgress = ((totalTime - newEta) / totalTime) * 100;
      
      setEta(Math.max(0, newEta));
      setProgress(Math.min(100, newProgress));
      
      if (newEta <= 0) {
        clearInterval(interval);
        setStatus('arrived');
      }
    }, 1300);
    return () => clearInterval(interval);
  }, [status, eta]);

  const handleStartRide = () => {
    setStatus('riding');
    setTransitRideStarted(true);
  };

  const handleViewTicket = () => {
    navigate('/transit-ticket?viewMode=true&returnTo=tracking-bus');
  };

  const handleConfirmExit = () => {
    nextLeg();
    // Reset transit state for next leg
    setTransitProgress(0);
    setTransitEta(12);
    setTransitRideStarted(false);

    if (isLastLeg) {
      navigate('/trip-complete');
    } else if (nextLegData) {
      const nextMode = nextLegData.mode;
      if (nextMode === 'walk') {
        navigate('/tracking-walk');
      } else if (nextMode === 'bus') {
        navigate('/tracking-bus');
      } else if (['metro', 'suburban-train'].includes(nextMode)) {
        navigate('/tracking-leg2');
      } else {
        // Ride modes
        navigate('/tracking-leg3');
      }
    } else {
      navigate('/trip-complete');
    }
  };

  const getBusName = () => {
    return `Bus ${currentLeg?.lineInfo || '153A'}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header Bar - Dark */}
      <div className="bg-foreground text-background px-4 py-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚌</span>
            <div>
              <p className="text-base font-bold">
                {status === 'arrived' ? `Arrived at ${currentLeg?.to}` : 
                 status === 'riding' ? `On ${getBusName()}` : `Board ${getBusName()}`}
              </p>
              <p className="text-xs text-background/80">
                {status === 'riding' ? `${Math.ceil(eta)} mins to ${currentLeg?.to}` : 
                 status === 'arrived' ? 'Time to exit' : 'Ready to start'}
              </p>
            </div>
          </div>
          {/* Passenger count badge */}
          <div className="flex items-center gap-1 bg-background/20 px-2 py-1 rounded-full">
            <Users className="w-3 h-3" />
            <span className="text-xs font-medium">{passengerCount}</span>
          </div>
        </div>
        <AnimatedProgressBar progress={status === 'ready' ? 0 : progress} mode="bus" />
      </div>

      {/* Map Area */}
      <div className="relative h-[26vh] bg-secondary">
        <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-20">
          🚌
        </div>
        <div className="absolute top-3 left-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="bg-card/90 backdrop-blur rounded-full h-9 w-9">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Bottom Card */}
      <div className="flex-1 bg-card rounded-t-2xl -mt-4 relative z-10 flex flex-col">
        <div className="w-10 h-1 bg-border rounded-full mx-auto mt-2 mb-2" />
        
        <div className="px-4 flex-1 pb-24">
          {/* Current & Next Stop - only show when riding */}
          {status === 'riding' && (
            <div className="bg-secondary rounded-xl p-3 mb-2">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs text-foreground/60 uppercase tracking-wide">Current</p>
                  <p className="font-bold text-sm">{currentStop}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-foreground/60 uppercase tracking-wide">Next</p>
                  <p className="font-bold text-sm text-primary">{nextStop}</p>
                </div>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Arrived Banner */}
          {status === 'arrived' && (
            <div className="bg-green-100 dark:bg-green-900/30 border border-green-500 rounded-xl p-3 mb-3 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-bold text-green-700 dark:text-green-400">Arrived at {currentLeg?.to}</p>
                <p className="text-xs text-green-600 dark:text-green-500">Exit the bus and confirm</p>
              </div>
            </div>
          )}

          <p className="text-xs text-foreground/60 mb-0.5">
            Leg {tripState.currentLeg + 1} of {tripState.selectedRoute?.legs.length || 3} • {getBusName()}
          </p>
          <h2 className={`text-lg font-bold mb-2 ${status === 'arrived' ? 'text-green-600' : ''}`}>
            {currentLeg?.to || "Destination Stop"}
          </h2>

          {/* View Ticket Button */}
          <Button 
            variant="outline" 
            onClick={handleViewTicket}
            className="w-full mb-2 h-9 rounded-xl text-xs font-medium"
          >
            <Ticket className="w-3.5 h-3.5 mr-1.5" />
            View Ticket
          </Button>

          {/* Bus Details */}
          <div className="border border-border rounded-xl p-3 mb-2">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground/60">Route</span>
                <span className="font-bold text-sm">{currentLeg?.lineInfo || "Route 153A"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground/60">Destination</span>
                <span className="font-bold text-sm">{currentLeg?.to}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground/60">Fare</span>
                <span className="font-bold text-sm">₹{(currentLeg?.price || 20) * passengerCount}</span>
              </div>
              {status === 'riding' && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground/60">Arriving in</span>
                  <span className="font-bold text-sm">{Math.ceil(eta)} mins</span>
                </div>
              )}
            </div>
          </div>

          {/* Next leg preview */}
          {nextLegData && status !== 'arrived' && (
            <div className="bg-secondary rounded-xl p-3">
              <p className="text-xs font-semibold text-foreground/60 mb-1">NEXT</p>
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {nextLegData.mode === 'walk' ? '🚶' : 
                   nextLegData.mode === 'metro' ? '🚇' : 
                   nextLegData.mode === 'bus' ? '🚌' :
                   nextLegData.mode === 'suburban-train' ? '🚆' : '🚗'}
                </span>
                <div>
                  <p className="font-medium text-sm">{nextLegData.from} → {nextLegData.to}</p>
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
              onClick={handleStartRide}
              className="w-full h-11 bg-foreground text-background hover:bg-foreground/90 font-bold text-sm rounded-xl"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Ride
            </Button>
          )}
          {status === 'arrived' && (
            <Button 
              onClick={handleConfirmExit}
              className="w-full h-11 bg-foreground text-background hover:bg-foreground/90 font-bold text-sm rounded-xl"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirm Exit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackingBus;
