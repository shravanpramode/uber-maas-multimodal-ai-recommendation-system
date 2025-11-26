import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";
import { useEffect, useState } from "react";

const TrackingLeg2 = () => {
  const navigate = useNavigate();
  const { nextLeg } = useTrip();
  const [eta, setEta] = useState(12);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setEta(prev => {
        if (prev <= 0.5) {
          clearInterval(interval);
          nextLeg();
          navigate('/tracking-leg3');
          return 0;
        }
        return prev - 0.5;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [navigate, nextLeg]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="h-14 bg-card border-b border-border flex items-center px-4 sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="ml-4 font-bold text-lg">Live Tracking - Leg 2</h1>
      </div>

      {/* Pre-booking Banner */}
      {showBanner && (
        <div className="bg-accent text-accent-foreground px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">✓</span>
              <div>
                <p className="font-bold text-sm">NEXT RIDE PRE-BOOKED!</p>
                <p className="text-xs opacity-90">Driver waiting at Rajiv Chowk</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowBanner(false)}>
              ✕
            </Button>
          </div>
        </div>
      )}

      {/* Map Area */}
      <div className="relative h-64 bg-secondary">
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
          🚇
        </div>
        <div className="absolute top-4 left-4 right-4">
          <div className="bg-card rounded-lg p-3 shadow-lg">
            <p className="text-sm font-semibold">On Delhi Metro • {Math.ceil(eta)} mins</p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 bg-card rounded-t-3xl -mt-8 relative z-10 p-6">
        <div className="w-12 h-1 bg-border rounded-full mx-auto mb-6" />
        
        <p className="text-sm text-muted-foreground mb-2">Leg 2 of 3 • Delhi Metro</p>
        <h2 className="text-2xl font-bold mb-4">Rajiv Chowk Station</h2>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Line</span>
            <span className="font-semibold">Yellow Line</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Arriving in</span>
            <span className="font-semibold">{Math.ceil(eta)} mins</span>
          </div>
        </div>

        {/* Next Driver Info */}
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mt-6">
          <p className="text-sm font-semibold mb-3">Next Driver Waiting:</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Amit Sharma</span>
              <span className="text-sm font-semibold">⭐ 4.6</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Black Honda City</span>
              <span className="text-sm">DL-2B-CD-5678</span>
            </div>
            <p className="text-xs text-accent font-semibold mt-2">✓ Waiting at Gate 2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingLeg2;
