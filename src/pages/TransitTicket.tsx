import { X, HelpCircle, Bike } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";
import { Progress } from "@/components/ui/progress";

const TransitTicket = () => {
  const navigate = useNavigate();
  const { tripState, setTransitTicketConfirmed } = useTrip();
  
  const currentLeg = tripState.selectedRoute?.legs[tripState.currentLeg];
  const ticketNumber = `2117999943${Date.now().toString().slice(-9)}`;
  
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
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <X className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <HelpCircle className="w-5 h-5" />
        </Button>
      </div>

      {/* Ticket Content */}
      <div className="flex-1 px-6 py-4">
        {/* Route Info */}
        <div className="mb-4">
          <h1 className="text-xl font-bold">
            {currentLeg?.from} → {currentLeg?.to}
          </h1>
          <p className="text-muted-foreground">
            ₹{currentLeg?.price || 9}.00 • {tripState.passengerCount} ticket{tripState.passengerCount > 1 ? 's' : ''}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <Progress value={30} className="h-1" />
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-48 h-48 bg-secondary rounded-lg flex items-center justify-center mb-4 border-2 border-border">
            <div className="grid grid-cols-8 gap-[2px] w-36 h-36">
              {Array.from({ length: 64 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-full aspect-square ${Math.random() > 0.5 ? 'bg-foreground' : 'bg-background'}`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Ticket # - {ticketNumber}
          </p>
          <div className="w-2 h-2 rounded-full bg-foreground mt-2" />
        </div>

        {/* Promo Card */}
        <div className="bg-secondary rounded-xl p-4 flex items-center gap-4 mb-6">
          <div className="flex-1">
            <p className="text-sm font-medium mb-1">
              Get a discounted bike ride to/from {getTransitType().toLowerCase()} station
            </p>
            <Button variant="link" className="p-0 h-auto text-primary font-semibold">
              Book Bike →
            </Button>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Bike className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* ONDC Badge */}
        <div className="text-center py-4 border-t border-border">
          <p className="text-xs text-muted-foreground font-medium tracking-wider">
            ONDC NETWORK
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-4 border-t border-border">
        <Button 
          onClick={handleStartRide} 
          className="w-full h-12 text-base font-semibold bg-foreground text-background hover:bg-foreground/90"
        >
          Start Ride
        </Button>
      </div>
    </div>
  );
};

export default TransitTicket;
