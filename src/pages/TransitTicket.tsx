import { X, HelpCircle, Bike } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";
import { Progress } from "@/components/ui/progress";
import { useMemo } from "react";

const TransitTicket = () => {
  const navigate = useNavigate();
  const { tripState, setTransitTicketConfirmed } = useTrip();
  
  const currentLeg = tripState.selectedRoute?.legs[tripState.currentLeg];
  const ticketNumber = useMemo(() => `2117999943${Date.now().toString().slice(-9)}`, []);
  
  // Generate stable QR pattern
  const qrPattern = useMemo(() => {
    const pattern: boolean[] = [];
    // Use ticket number as seed for deterministic pattern
    for (let i = 0; i < 64; i++) {
      pattern.push(((i * 17 + 11) % 7) > 2);
    }
    return pattern;
  }, []);

  const getTransitType = () => {
    switch (currentLeg?.mode) {
      case 'metro': return 'Metro';
      case 'bus': return 'Bus';
      case 'suburban-train': return 'Suburban Train';
      default: return 'Transit';
    }
  };

  const handleStartRide = () => {
    setTransitTicketConfirmed(true);
    navigate('/tracking-leg2');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="h-9 w-9">
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
          <p className="text-sm text-muted-foreground">
            ₹{currentLeg?.price || 9}.00 • {tripState.passengerCount} ticket{tripState.passengerCount > 1 ? 's' : ''}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-6">
          <Progress value={30} className="h-1" />
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
          <p className="text-xs text-muted-foreground">
            Ticket # - {ticketNumber}
          </p>
          <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-2" />
        </div>

        {/* Promo Card */}
        <div className="bg-secondary rounded-xl p-3 flex items-center gap-3 mb-4">
          <div className="flex-1">
            <p className="text-xs font-medium mb-1">
              Get a discounted bike ride to/from {getTransitType().toLowerCase()} station
            </p>
            <Button variant="link" className="p-0 h-auto text-primary font-semibold text-xs">
              Book Bike →
            </Button>
          </div>
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Bike className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* ONDC Badge */}
        <div className="text-center py-3 border-t border-border">
          <p className="text-[10px] text-muted-foreground font-medium tracking-wider">
            ONDC NETWORK
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-4 border-t border-border">
        <Button 
          onClick={handleStartRide} 
          className="w-full h-11 text-sm font-semibold bg-foreground text-background hover:bg-foreground/90"
        >
          Start Ride
        </Button>
      </div>
    </div>
  );
};

export default TransitTicket;
