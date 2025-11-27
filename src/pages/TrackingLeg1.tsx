import { X, Phone, MessageCircle, MoreHorizontal, ChevronDown, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";
import { useEffect, useState } from "react";
import AnimatedProgressBar from "@/components/AnimatedProgressBar";

const TrackingLeg1 = () => {
  const navigate = useNavigate();
  const { nextLeg, tripState } = useTrip();
  const [eta, setEta] = useState(8);
  const [progress, setProgress] = useState(0);
  const totalTime = 8;

  const currentLeg = tripState.selectedRoute?.legs[0];
  const nextLeg2 = tripState.selectedRoute?.legs[1];
  const isNextLegTransit = nextLeg2 && ['metro', 'bus', 'suburban-train'].includes(nextLeg2.mode);

  useEffect(() => {
    const interval = setInterval(() => {
      setEta(prev => {
        const newEta = prev - 0.5;
        setProgress(((totalTime - newEta) / totalTime) * 100);
        
        if (newEta <= 0) {
          clearInterval(interval);
          nextLeg();
          // Navigate to transit ticket if next leg is public transport
          if (isNextLegTransit) {
            navigate('/transit-ticket');
          } else if (tripState.selectedRoute && tripState.selectedRoute.legs.length > 1) {
            navigate('/tracking-leg2');
          } else {
            navigate('/trip-complete');
          }
          return 0;
        }
        return newEta;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [navigate, nextLeg, isNextLegTransit, tripState.selectedRoute]);

  const pin = ['2', '5', '6', '1'];
  const driverName = "M Dhinesh Kumar";
  const vehicleNumber = currentLeg?.vehicleNumber || "TN18AM9263";
  const vehicleModel = "Red Ford Aspire";
  const rating = 4.97;
  const trips = 1671;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header Bar - Dark */}
      <div className="bg-foreground text-background px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-lg font-bold">Pick up in {Math.ceil(eta)} min</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm opacity-90 mb-3">
          <span className="font-medium">Uber</span>
          <span>{vehicleNumber}</span>
          <span>•</span>
          <span>{vehicleModel}</span>
        </div>
        {/* Animated Progress Bar */}
        <AnimatedProgressBar progress={progress} mode={currentLeg?.mode || 'auto'} />
      </div>

      {/* Map Area */}
      <div className="relative h-[35vh] bg-secondary">
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
          🗺️
        </div>
        <div className="absolute top-4 left-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="bg-card/90 backdrop-blur rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>
        {/* Pickup Label */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-card px-3 py-1.5 rounded-lg shadow-lg">
          <p className="text-xs font-medium">{tripState.pickup?.name || "Pickup point"}</p>
        </div>
      </div>

      {/* Bottom Card */}
      <div className="flex-1 bg-card rounded-t-3xl -mt-6 relative z-10 flex flex-col">
        <div className="w-12 h-1 bg-border rounded-full mx-auto mt-3 mb-4" />
        
        <div className="px-6 flex-1">
          {/* Pick up time header */}
          <h2 className="text-2xl font-bold mb-4">Pick-up in {Math.ceil(eta)} min</h2>

          {/* Share PIN */}
          <div className="bg-blue-600 rounded-xl p-4 mb-4 flex items-center justify-between">
            <span className="text-white font-medium">Share PIN</span>
            <div className="flex gap-2">
              {pin.map((digit, i) => (
                <div key={i} className="w-8 h-10 bg-white rounded flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">{digit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trip Details */}
          <div className="border border-border rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Trip details</span>
              <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Meet at your pick-up spot on</p>
            <p className="font-medium">{tripState.pickup?.address || "IAF Station Road"}</p>
          </div>

          {/* Driver Card */}
          <div className="border border-border rounded-xl p-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                <User className="w-7 h-7 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium bg-secondary px-2 py-0.5 rounded">⭐ {rating}</span>
                </div>
                <p className="font-bold text-lg">{driverName}</p>
                <p className="text-sm text-muted-foreground">{trips.toLocaleString()} trips</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{vehicleNumber}</p>
                <p className="text-sm text-muted-foreground">{vehicleModel}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <Button variant="outline" className="flex-1 h-11 rounded-xl font-medium">
                <MessageCircle className="w-4 h-4 mr-2" />
                Send a message
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingLeg1;
