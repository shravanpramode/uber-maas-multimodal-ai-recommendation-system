import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";

const RouteConfirmation = () => {
  const navigate = useNavigate();
  const { tripState, startTrip } = useTrip();

  const handleStartTrip = () => {
    startTrip();
    navigate('/tracking-leg1');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="h-14 bg-card border-b border-border flex items-center px-4 sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="ml-4 font-bold text-lg">Confirm Route</h1>
        <Button variant="ghost" size="icon" className="ml-auto" onClick={() => navigate('/')}>
          ✕
        </Button>
      </div>

      {/* Route Details */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="space-y-3">
          {tripState.selectedRoute?.legs.map((leg, idx) => (
            <div key={idx} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {leg.mode === 'uber' ? '🚗' : leg.mode === 'metro' ? '🚇' : leg.mode === 'walk' ? '🚶' : '🚌'}
                  </div>
                  <div>
                    <h3 className="font-bold">{leg.mode === 'uber' ? 'Uber Auto' : leg.mode === 'metro' ? 'Delhi Metro' : leg.mode === 'walk' ? 'Walk' : 'Bus'}</h3>
                    <p className="text-sm text-muted-foreground">{leg.from} → {leg.to}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{leg.price}</p>
                  <p className="text-sm text-muted-foreground">{leg.duration}m</p>
                </div>
              </div>
              {leg.prebooked && (
                <div className="mt-2 text-xs bg-accent text-accent-foreground px-2 py-1 rounded inline-block font-semibold">
                  PRE-BOOKED
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <Button onClick={handleStartTrip} className="w-full h-12 text-base font-semibold">
          Confirm & Start Trip
        </Button>
      </div>
    </div>
  );
};

export default RouteConfirmation;
