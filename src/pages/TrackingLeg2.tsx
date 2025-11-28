import { X, User, Ticket, Play, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";
import { useEffect, useMemo } from "react";
import AnimatedProgressBar from "@/components/AnimatedProgressBar";

const TrackingLeg2 = () => {
  const navigate = useNavigate();
  const { tripState, setTransitExitMode, setTransitProgress, setTransitEta, setTransitRideStarted } = useTrip();
  
  // Use context state for persistence
  const eta = tripState.transitEta;
  const progress = tripState.transitProgress;
  const totalTime = 12;
  const rideStarted = tripState.transitRideStarted;

  const currentLeg = tripState.selectedRoute?.legs[tripState.currentLeg] || tripState.selectedRoute?.legs[1];
  const nextLeg3 = tripState.selectedRoute?.legs[tripState.currentLeg + 1] || tripState.selectedRoute?.legs[2];
  const showBanner = eta <= 5 && nextLeg3 && !['walk'].includes(nextLeg3.mode) && rideStarted;
  const passengerCount = tripState.passengerCount || 1;

  // Generate stations based on transit type
  const stations = useMemo(() => {
    const transitType = currentLeg?.mode;
    if (transitType === 'metro') {
      return [
        { name: currentLeg?.from || 'Rajiv Chowk', passed: false },
        { name: 'Patel Chowk', passed: false },
        { name: 'Central Secretariat', passed: false },
        { name: 'Udyog Bhawan', passed: false },
        { name: 'Lok Kalyan Marg', passed: false },
        { name: currentLeg?.to || 'Sarojini Nagar', passed: false },
      ];
    } else if (transitType === 'bus') {
      return [
        { name: currentLeg?.from || 'Start', passed: false },
        { name: 'Stop 1', passed: false },
        { name: 'Stop 2', passed: false },
        { name: 'Stop 3', passed: false },
        { name: currentLeg?.to || 'End', passed: false },
      ];
    } else if (transitType === 'suburban-train') {
      return [
        { name: currentLeg?.from || 'New Delhi', passed: false },
        { name: 'Shivaji Bridge', passed: false },
        { name: 'Sadar Bazaar', passed: false },
        { name: currentLeg?.to || 'Safdarjung', passed: false },
      ];
    }
    return [{ name: currentLeg?.from || 'Start', passed: false }, { name: currentLeg?.to || 'End', passed: false }];
  }, [currentLeg]);

  // Calculate current and next station based on progress
  const { currentStation, nextStation } = useMemo(() => {
    const stationCount = stations.length;
    const progressPerStation = 100 / (stationCount - 1);
    const currentIndex = Math.min(Math.floor(progress / progressPerStation), stationCount - 2);
    const nextIndex = Math.min(currentIndex + 1, stationCount - 1);
    
    return {
      currentStation: stations[currentIndex]?.name || stations[0]?.name,
      nextStation: stations[nextIndex]?.name || stations[stations.length - 1]?.name,
    };
  }, [progress, stations]);

  // Only run progress when ride is started
  useEffect(() => {
    if (!rideStarted) return;
    
    const interval = setInterval(() => {
      const newEta = eta - 0.75;
      const newProgress = ((totalTime - newEta) / totalTime) * 100;
      
      setTransitEta(Math.max(0, newEta));
      setTransitProgress(Math.min(100, newProgress));
      
      if (newEta <= 0) {
        clearInterval(interval);
        setTransitExitMode(true);
        navigate('/transit-ticket');
      }
    }, 1300);
    return () => clearInterval(interval);
  }, [navigate, setTransitExitMode, eta, setTransitEta, setTransitProgress, rideStarted]);

  const getTransitIcon = () => {
    switch (currentLeg?.mode) {
      case 'metro': return '🚇';
      case 'bus': return '🚌';
      case 'suburban-train': return '🚆';
      default: return '🚇';
    }
  };

  const getTransitName = () => {
    switch (currentLeg?.mode) {
      case 'metro': return 'Delhi Metro';
      case 'bus': return `Bus ${currentLeg?.lineInfo || '153A'}`;
      case 'suburban-train': return 'Suburban Train';
      default: return 'Transit';
    }
  };

  const handleViewTicket = () => {
    navigate('/transit-ticket?viewMode=true');
  };

  const handleStartRide = () => {
    setTransitRideStarted(true);
  };

  const handleCloseBanner = () => {
    // Just visual close
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Pre-booking Banner - Only show when 5 mins or less and ride started */}
      {showBanner && (
        <div className="bg-blue-600 text-white px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">✓</span>
            <div>
              <p className="font-bold text-xs">NEXT RIDE PRE-BOOKED!</p>
              <p className="text-xs text-white/80">Driver waiting at {currentLeg?.to}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 text-white hover:bg-white/20"
            onClick={handleCloseBanner}
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}

      {/* Top Header Bar - Dark */}
      <div className="bg-foreground text-background px-4 py-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">{getTransitIcon()}</span>
            <div>
              <p className="text-base font-bold">
                {rideStarted ? `On ${getTransitName()}` : `Board ${getTransitName()}`}
              </p>
              <p className="text-xs text-background/80">
                {rideStarted ? `${Math.ceil(eta)} mins to ${currentLeg?.to}` : `Ready to start`}
              </p>
            </div>
          </div>
          {/* Passenger count badge */}
          <div className="flex items-center gap-1 bg-background/20 px-2 py-1 rounded-full">
            <Users className="w-3 h-3" />
            <span className="text-xs font-medium">{passengerCount}</span>
          </div>
        </div>
        <AnimatedProgressBar progress={rideStarted ? progress : 0} mode={currentLeg?.mode || 'metro'} />
      </div>

      {/* Map Area */}
      <div className="relative h-[26vh] bg-secondary">
        <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-20">
          {getTransitIcon()}
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
          {/* Current & Next Station - only show when started */}
          {rideStarted && (
            <div className="bg-secondary rounded-xl p-3 mb-2">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs text-foreground/60 uppercase tracking-wide">Current</p>
                  <p className="font-bold text-sm">{currentStation}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-foreground/60 uppercase tracking-wide">Next</p>
                  <p className="font-bold text-sm text-primary">{nextStation}</p>
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

          <p className="text-xs text-foreground/60 mb-0.5">
            Leg {tripState.currentLeg + 1} of {tripState.selectedRoute?.legs.length || 3} • {getTransitName()}
          </p>
          <h2 className="text-lg font-bold mb-2">{currentLeg?.to || "Destination Station"}</h2>

          {/* View Ticket Button */}
          <Button 
            variant="outline" 
            onClick={handleViewTicket}
            className="w-full mb-2 h-9 rounded-xl text-xs font-medium"
          >
            <Ticket className="w-3.5 h-3.5 mr-1.5" />
            View Ticket
          </Button>

          {/* Transit Details */}
          <div className="border border-border rounded-xl p-3 mb-2">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground/60">Line</span>
                <span className="font-bold text-sm">{currentLeg?.lineInfo || "Yellow Line"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground/60">Destination</span>
                <span className="font-bold text-sm">{currentLeg?.to}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground/60">Fare</span>
                <span className="font-bold text-sm">₹{(currentLeg?.price || 30) * passengerCount}</span>
              </div>
              {rideStarted && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground/60">Arriving in</span>
                  <span className="font-bold text-sm">{Math.ceil(eta)} mins</span>
                </div>
              )}
            </div>
          </div>

          {/* Next Driver Card (if applicable) */}
          {nextLeg3 && ['auto', 'bike', 'uber-go', 'go-sedan', 'uber-xl'].includes(nextLeg3.mode) && showBanner && (
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-3">
              <p className="text-xs font-bold mb-2 text-blue-900 dark:text-blue-100">Next Driver Waiting:</p>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">Amit Sharma</p>
                  <p className="text-xs text-foreground/60">Black Honda City</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold">⭐ 4.6</p>
                  <p className="text-xs font-medium">DL-2B-CD-5678</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Fixed Bottom Start Ride Button - only show when not started */}
        {!rideStarted && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
            <Button 
              onClick={handleStartRide}
              className="w-full h-11 bg-foreground text-background hover:bg-foreground/90 font-bold text-sm rounded-xl"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Ride
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingLeg2;
