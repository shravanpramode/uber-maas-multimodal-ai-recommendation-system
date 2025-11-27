import { X, Phone, MessageCircle, MoreHorizontal, ChevronDown, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";
import { useEffect, useState } from "react";
import AnimatedProgressBar from "@/components/AnimatedProgressBar";

const TrackingLeg3 = () => {
  const navigate = useNavigate();
  const { completeTrip, tripState, nextLeg } = useTrip();
  const [eta, setEta] = useState(5);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'arriving' | 'arrived' | 'in_progress'>('arriving');
  const totalTime = 5;

  const currentLeg = tripState.selectedRoute?.legs[tripState.currentLeg] || tripState.selectedRoute?.legs[2];
  const isLastLeg = !tripState.selectedRoute || tripState.currentLeg >= tripState.selectedRoute.legs.length - 1;

  useEffect(() => {
    if (status === 'arriving') {
      const interval = setInterval(() => {
        setEta(prev => {
          const newEta = prev - 0.5;
          setProgress(((totalTime - newEta) / totalTime) * 100);
          
          if (newEta <= 0) {
            clearInterval(interval);
            setStatus('arrived');
            return 0;
          }
          return newEta;
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [status]);

  const handleArrived = () => {
    setStatus('in_progress');
    setTimeout(() => {
      if (isLastLeg) {
        completeTrip();
        navigate('/trip-complete');
      } else {
        nextLeg();
        navigate('/tracking-leg1');
      }
    }, 1000);
  };

  const pin = ['2', '5', '6', '1'];
  const driverName = "Amit Sharma";
  const vehicleNumber = currentLeg?.vehicleNumber || "DL-2B-CD-5678";
  const vehicleModel = "Black Honda City";
  const rating = 4.6;
  const trips = 892;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header Bar - Dark */}
      <div className="bg-foreground text-background px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            {status === 'arriving' ? (
              <p className="text-lg font-bold">Pick up in {Math.ceil(eta)} min</p>
            ) : (
              <p className="text-lg font-bold text-green-400">Driver has arrived!</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-blue-500 px-2 py-1 rounded-full font-bold">
              PRE-BOOKED
            </span>
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
        {/* Destination Label */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-card px-3 py-1.5 rounded-lg shadow-lg">
          <p className="text-xs font-medium">{tripState.destination?.name || "Destination"}</p>
        </div>
      </div>

      {/* Bottom Card */}
      <div className="flex-1 bg-card rounded-t-3xl -mt-6 relative z-10 flex flex-col">
        <div className="w-12 h-1 bg-border rounded-full mx-auto mt-3 mb-4" />
        
        <div className="px-6 flex-1">
          {/* Arrived Banner */}
          {status === 'arrived' && (
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-4">
              <p className="text-lg font-bold text-green-700 dark:text-green-300 text-center">
                You've arrived at {tripState.destination?.name || "your destination"}
              </p>
            </div>
          )}

          {/* Pick up time header */}
          <p className="text-xs text-muted-foreground mb-1">
            Leg {(tripState.currentLeg || 2) + 1} of {tripState.selectedRoute?.legs.length || 3} • Final Ride
          </p>
          <h2 className="text-2xl font-bold mb-4">
            {status === 'arrived' ? 'Your ride is here' : `Pick-up in ${Math.ceil(eta)} min`}
          </h2>

          {/* Share PIN */}
          {status === 'arriving' && (
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
          )}

          {/* Trip Details */}
          <div className="border border-border rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Trip details</span>
              <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Drop-off at</p>
            <p className="font-medium">{tripState.destination?.address || "Sarojini Nagar Market"}</p>
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
            {status === 'arriving' && (
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
            )}

            {status === 'arrived' && (
              <Button 
                onClick={handleArrived} 
                className="w-full h-12 mt-4 rounded-xl font-bold text-base bg-foreground text-background hover:bg-foreground/90"
              >
                I'm Walking to Car →
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingLeg3;
