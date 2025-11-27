import { X, MoreHorizontal, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";
import { useEffect, useState } from "react";
import AnimatedProgressBar from "@/components/AnimatedProgressBar";

const TrackingLeg2 = () => {
  const navigate = useNavigate();
  const { nextLeg, tripState } = useTrip();
  const [eta, setEta] = useState(12);
  const [progress, setProgress] = useState(0);
  const [showBanner, setShowBanner] = useState(true);
  const totalTime = 12;

  const currentLeg = tripState.selectedRoute?.legs[tripState.currentLeg] || tripState.selectedRoute?.legs[1];
  const nextLeg3 = tripState.selectedRoute?.legs[tripState.currentLeg + 1] || tripState.selectedRoute?.legs[2];
  const isNextLegTransit = nextLeg3 && ['metro', 'bus', 'suburban-train'].includes(nextLeg3.mode);
  const hasMoreLegs = tripState.selectedRoute && tripState.currentLeg < tripState.selectedRoute.legs.length - 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setEta(prev => {
        const newEta = prev - 0.5;
        setProgress(((totalTime - newEta) / totalTime) * 100);
        
        if (newEta <= 0) {
          clearInterval(interval);
          nextLeg();
          if (isNextLegTransit) {
            navigate('/transit-ticket');
          } else if (hasMoreLegs) {
            navigate('/tracking-leg3');
          } else {
            navigate('/trip-complete');
          }
          return 0;
        }
        return newEta;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [navigate, nextLeg, isNextLegTransit, hasMoreLegs]);

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Pre-booking Banner */}
      {showBanner && nextLeg3 && !['walk'].includes(nextLeg3.mode) && (
        <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">✓</span>
            <div>
              <p className="font-bold text-sm">NEXT RIDE PRE-BOOKED!</p>
              <p className="text-xs opacity-90">Driver waiting at {currentLeg?.to}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-white hover:bg-white/20"
            onClick={() => setShowBanner(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Top Header Bar - Dark */}
      <div className="bg-foreground text-background px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getTransitIcon()}</span>
            <div>
              <p className="text-lg font-bold">On {getTransitName()}</p>
              <p className="text-sm opacity-80">{Math.ceil(eta)} mins to {currentLeg?.to}</p>
            </div>
          </div>
        </div>
        {/* Animated Progress Bar */}
        <AnimatedProgressBar progress={progress} mode={currentLeg?.mode || 'metro'} />
      </div>

      {/* Map Area */}
      <div className="relative h-[35vh] bg-secondary">
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
          {getTransitIcon()}
        </div>
        <div className="absolute top-4 left-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="bg-card/90 backdrop-blur rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Bottom Card */}
      <div className="flex-1 bg-card rounded-t-3xl -mt-6 relative z-10 flex flex-col">
        <div className="w-12 h-1 bg-border rounded-full mx-auto mt-3 mb-4" />
        
        <div className="px-6 flex-1">
          <p className="text-xs text-muted-foreground mb-1">
            Leg {tripState.currentLeg + 1} of {tripState.selectedRoute?.legs.length || 3} • {getTransitName()}
          </p>
          <h2 className="text-2xl font-bold mb-6">{currentLeg?.to || "Destination Station"}</h2>

          {/* Transit Details */}
          <div className="border border-border rounded-xl p-4 mb-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Line</span>
                <span className="font-bold">{currentLeg?.lineInfo || "Yellow Line"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Destination</span>
                <span className="font-bold">{currentLeg?.to}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Arriving in</span>
                <span className="font-bold">{Math.ceil(eta)} mins</span>
              </div>
            </div>
          </div>

          {/* Next Driver Card (if applicable) */}
          {nextLeg3 && ['auto', 'bike', 'uber-go', 'go-sedan', 'uber-xl'].includes(nextLeg3.mode) && (
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <p className="text-sm font-bold mb-3 text-blue-900 dark:text-blue-100">Next Driver Waiting:</p>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="font-bold">Amit Sharma</p>
                  <p className="text-sm text-muted-foreground">Black Honda City</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">⭐ 4.6</p>
                  <p className="text-sm font-medium">DL-2B-CD-5678</p>
                </div>
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-3">✓ Waiting at Gate 2</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackingLeg2;
