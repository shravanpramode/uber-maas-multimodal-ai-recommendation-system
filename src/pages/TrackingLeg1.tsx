import { ArrowLeft, Phone, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";
import { useEffect, useState } from "react";

const TrackingLeg1 = () => {
  const navigate = useNavigate();
  const { nextLeg } = useTrip();
  const [eta, setEta] = useState(8);

  useEffect(() => {
    const interval = setInterval(() => {
      setEta(prev => {
        if (prev <= 0.5) {
          clearInterval(interval);
          nextLeg();
          navigate('/tracking-leg2');
          return 0;
        }
        return prev - 0.5;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [navigate, nextLeg]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Map Area - Larger */}
      <div className="relative h-[45vh] bg-secondary">
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
          🗺️
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

      {/* Driver Details Card */}
      <div className="flex-1 bg-card rounded-t-3xl -mt-8 relative z-10 px-6 pt-4 pb-6">
        <div className="w-12 h-1 bg-border rounded-full mx-auto mb-4" />
        
        <p className="text-xs text-muted-foreground mb-1">Leg 1 of 3 • Uber Auto</p>
        <h2 className="text-3xl font-bold mb-6">Rajesh Kumar</h2>

        <div className="bg-background border border-border rounded-2xl p-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Rating</p>
              <p className="font-bold text-lg">⭐ 4.8</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Vehicle</p>
              <p className="font-bold text-sm">DL-1C-AB-1234</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground mb-1">Model</p>
              <p className="font-bold">White Maruti Swift</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 h-12 rounded-xl font-semibold">
            <Phone className="w-5 h-5 mr-2" />
            Call
          </Button>
          <Button variant="outline" className="flex-1 h-12 rounded-xl font-semibold">
            <MessageCircle className="w-5 h-5 mr-2" />
            Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrackingLeg1;
