import { X, HelpCircle, Bike } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";
import { Progress } from "@/components/ui/progress";
import { useMemo } from "react";

const TransitTicket = () => {
  const navigate = useNavigate();
  const { tripState, setTransitTicketConfirmed, transitExitMode, setTransitExitMode, nextLeg, setTransitProgress, setTransitEta } = useTrip();
  
  const currentLeg = tripState.selectedRoute?.legs[tripState.currentLeg];
  const nextLegData = tripState.selectedRoute?.legs[tripState.currentLeg + 1];
  const hasMoreLegs = tripState.selectedRoute && tripState.currentLeg < tripState.selectedRoute.legs.length - 1;
  const isNextLegBike = nextLegData?.mode === 'bike';
  const isNextLegTransit = nextLegData && ['metro', 'bus', 'suburban-train'].includes(nextLegData.mode);
  
  const ticketNumber = useMemo(() => `2117999943${Date.now().toString().slice(-9)}`, []);
  
  // Generate stable QR pattern
  const qrPattern = useMemo(() => {
    const pattern: boolean[] = [];
    for (let i = 0; i < 64; i++) {
      pattern.push(((i * 17 + 11) % 7) > 2);
    }
    return pattern;
  }, []);

  const getStationType = () => {
    switch (currentLeg?.mode) {
      case 'metro': return 'metro station';
      case 'bus': return 'bus stop';
      case 'suburban-train': return 'train station';
      default: return 'station';
    }
  };

  const handleButtonClick = () => {
    if (transitExitMode) {
      // Scan & Exit mode - call nextLeg() NOW after exiting
      setTransitExitMode(false);
      nextLeg(); // Increment current leg
      
      // Reset transit progress for next transit leg
      setTransitProgress(0);
      setTransitEta(12);
      
      // Check what comes AFTER the leg we just completed
      const nextLegIndex = tripState.currentLeg + 1; // This is the leg after current (which we just completed)
      const nextLegAfterCurrent = tripState.selectedRoute?.legs[nextLegIndex];
      const hasMoreLegsAfter = tripState.selectedRoute && nextLegIndex < tripState.selectedRoute.legs.length;
      
      if (hasMoreLegsAfter && nextLegAfterCurrent) {
        const isNextTransit = ['metro', 'bus', 'suburban-train'].includes(nextLegAfterCurrent.mode);
        if (isNextTransit) {
          // Another transit leg
          navigate('/tracking-leg2');
        } else if (nextLegAfterCurrent.mode === 'walk') {
          // Walk leg - skip to next
          navigate('/tracking-leg3');
        } else {
          // Ride leg (auto, bike, uber, etc.)
          navigate('/tracking-leg3');
        }
      } else {
        // No more legs, trip complete
        navigate('/trip-complete');
      }
    } else {
      // Normal Start Ride mode
      setTransitTicketConfirmed(true);
      navigate('/tracking-leg2');
    }
  };

  const handleBack = () => {
    if (transitExitMode) {
      setTransitExitMode(false);
    }
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <Button variant="ghost" size="icon" onClick={handleBack} className="h-9 w-9">
          <X className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <HelpCircle className="w-4 h-4" />
        </Button>
      </div>

      {/* Ticket Content */}
      <div className="flex-1 px-4 py-3">
        {/* Route Info */}
        <div className="mb-3">
          <h1 className="text-lg font-bold">
            {currentLeg?.from} → {currentLeg?.to}
          </h1>
          <p className="text-sm text-foreground/60">
            ₹{currentLeg?.price || 9}.00 • {tripState.passengerCount} ticket{tripState.passengerCount > 1 ? 's' : ''}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-6">
          <Progress value={transitExitMode ? 100 : 30} className="h-1" />
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-44 h-44 bg-white rounded-lg flex items-center justify-center mb-3 border-2 border-border shadow-sm">
            <div className="grid grid-cols-8 gap-[2px] w-32 h-32 p-2">
              {qrPattern.map((filled, i) => (
                <div 
                  key={i} 
                  className={`w-full aspect-square rounded-[1px] ${filled ? 'bg-foreground' : 'bg-transparent'}`}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-foreground/60">
            Ticket # - {ticketNumber}
          </p>
          <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-2" />
        </div>

        {/* Bike Promo Card - Only show if next leg is bike */}
        {isNextLegBike && (
          <div className="bg-secondary rounded-xl p-3 flex items-center gap-3 mb-4">
            <div className="flex-1">
              <p className="text-xs font-medium">
                Enjoy discounted bike ride to/from {getStationType()}
              </p>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Bike className="w-5 h-5 text-primary" />
            </div>
          </div>
        )}

        {/* ONDC Badge */}
        <div className="text-center py-3 border-t border-border">
          <p className="text-xs text-foreground/60 font-medium tracking-wider">
            ONDC NETWORK
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-4 border-t border-border">
        <Button 
          onClick={handleButtonClick} 
          className="w-full h-11 text-sm font-semibold bg-foreground text-background hover:bg-foreground/90"
        >
          {transitExitMode ? 'Scan & Exit' : 'Start Ride'}
        </Button>
      </div>
    </div>
  );
};

export default TransitTicket;
