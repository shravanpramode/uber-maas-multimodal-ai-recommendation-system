import { ArrowLeft, X } from "lucide-react";
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
      {/* Pre-booking Banner */}
      {showBanner && (
        <div className="bg-blue-500 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">✓</span>
            <div>
              <p className="font-bold text-sm">NEXT RIDE PRE-BOOKED!</p>
              <p className="text-xs opacity-90">Driver waiting at Rajiv Chowk</p>
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

      {/* Map Area */}
      <div className="relative h-[45vh] bg-secondary">
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
          🚇
        </div>
        <div className="absolute top-4 left-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="bg-card/90 backdrop-blur rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-card/90 backdrop-blur rounded-full px-4 py-2 shadow-lg">
            <p className="text-sm font-bold">{Math.ceil(eta)} min</p>
          </div>
        </div>
      </div>

      {/* Details Card */}
      <div className="flex-1 bg-card rounded-t-3xl -mt-8 relative z-10 px-6 pt-4 pb-6">
        <div className="w-12 h-1 bg-border rounded-full mx-auto mb-4" />
        
        <p className="text-xs text-muted-foreground mb-1">Leg 2 of 3 • Delhi Metro</p>
        <h2 className="text-3xl font-bold mb-6">On Delhi Metro</h2>

        <div className="bg-background border border-border rounded-2xl p-4 mb-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Line</span>
              <span className="font-bold">Yellow Line</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Station</span>
              <span className="font-bold">Rajiv Chowk</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Arriving in</span>
              <span className="font-bold">{Math.ceil(eta)} mins</span>
            </div>
          </div>
        </div>

        {/* Next Driver Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <p className="text-sm font-bold mb-3 text-blue-900">Next Driver Waiting:</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold">Amit Sharma</span>
              <span className="text-sm font-semibold">⭐ 4.6</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Black Honda City</span>
              <span className="text-sm font-medium">DL-2B-CD-5678</span>
            </div>
            <p className="text-xs text-blue-600 font-semibold mt-2">✓ Waiting at Gate 2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingLeg2;
