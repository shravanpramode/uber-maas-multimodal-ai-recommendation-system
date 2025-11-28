import { X, Phone, MessageCircle, MoreHorizontal, User, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";
import { useEffect, useState } from "react";
import AnimatedProgressBar from "@/components/AnimatedProgressBar";

type TrackingStatus = 'pickup_countdown' | 'ride_here' | 'in_transit' | 'arrived';

const TrackingLeg3 = () => {
  const navigate = useNavigate();
  const { completeTrip, tripState, nextLeg } = useTrip();
  const [status, setStatus] = useState<TrackingStatus>('pickup_countdown');
  const [countdown, setCountdown] = useState(5);
  const [progress, setProgress] = useState(0);
  const totalTime = 8;

  const currentLeg = tripState.selectedRoute?.legs[tripState.currentLeg] || tripState.selectedRoute?.legs[2];
  const isLastLeg = !tripState.selectedRoute || tripState.currentLeg >= tripState.selectedRoute.legs.length - 1;

  // Phase 1: Pickup countdown (5 seconds)
  useEffect(() => {
    if (status === 'pickup_countdown') {
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setStatus('ride_here');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [status]);

  // Phase 3: In-transit progress
  useEffect(() => {
    if (status === 'in_transit') {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / (totalTime * 2));
          if (newProgress >= 100) {
            clearInterval(interval);
            setStatus('arrived');
            return 100;
          }
          return newProgress;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [status]);

  const handleStartTrip = () => {
    setStatus('in_transit');
  };

  const handleDriverClosesRide = () => {
    setTimeout(() => {
      completeTrip();
      navigate('/trip-complete');
    }, 4000);
  };

  const handleContinueToNextLeg = () => {
    nextLeg();
    navigate('/tracking-leg1');
  };

  const pin = ['2', '5', '6', '1'];
  const driverName = "Amit Sharma";
  const vehicleNumber = currentLeg?.vehicleNumber || "DL-2B-CD-5678";
  const vehicleModel = "Black Honda City";
  const rating = 4.6;
  const trips = 892;

  const getStatusText = () => {
    switch (status) {
      case 'pickup_countdown': return `Pick up in ${countdown}s`;
      case 'ride_here': return 'Your ride is here';
      case 'in_transit': return 'In-Transit';
      case 'arrived': return `You've arrived at ${tripState.destination?.name || 'destination'}`;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Compact Floating Progress Card */}
      <div className="mx-3 mt-3">
        <div className="bg-foreground text-background px-4 py-2 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] bg-blue-500 px-2 py-0.5 rounded-full font-bold">
              PRE-BOOKED
            </span>
            {status === 'arrived' && (
              <span className="text-[10px] bg-green-500 px-2 py-0.5 rounded-full font-bold">
                Arrived
              </span>
            )}
          </div>
          <AnimatedProgressBar progress={progress} mode={currentLeg?.mode || 'auto'} />
        </div>
      </div>

      {/* Map Area */}
      <div className="relative h-[30vh] bg-secondary">
        <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-20">
          🗺️
        </div>
        <div className="absolute top-3 left-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="bg-card/90 backdrop-blur rounded-full h-9 w-9">
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card px-3 py-1 rounded-lg shadow-lg">
          <p className="text-xs font-medium">{tripState.destination?.name || "Destination"}</p>
        </div>
      </div>

      {/* Bottom Card */}
      <div className="flex-1 bg-card rounded-t-2xl -mt-4 relative z-10 flex flex-col">
        <div className="w-10 h-1 bg-border rounded-full mx-auto mt-2 mb-2" />
        
        <div className="px-4 flex-1 pb-20">
          <p className="text-[10px] text-muted-foreground mb-0.5">
            Leg {(tripState.currentLeg || 2) + 1} of {tripState.selectedRoute?.legs.length || 3} • {isLastLeg ? 'Final Ride' : 'Connecting Ride'}
          </p>
          <h2 className={`text-lg font-bold mb-2 ${status === 'arrived' ? 'text-green-600' : ''}`}>
            {getStatusText()}
          </h2>

          {/* Share PIN - Compact 40% smaller */}
          {(status === 'pickup_countdown' || status === 'ride_here') && (
            <div className="bg-blue-600 rounded-lg p-2 mb-2 flex items-center justify-between">
              <span className="text-white font-bold text-xs">Share PIN</span>
              <div className="flex gap-1">
                {pin.map((digit, i) => (
                  <div key={i} className="w-5 h-6 bg-white rounded flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">{digit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trip Details */}
          <div className="border border-border rounded-xl p-3 mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm">Trip details</span>
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">Drop-off at</p>
            <p className="font-medium text-sm">{tripState.destination?.address || "Sarojini Nagar Market"}</p>
          </div>

          {/* Driver Card */}
          <div className="border border-border rounded-xl p-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-medium bg-secondary px-1.5 py-0.5 rounded">⭐ {rating}</span>
                </div>
                <p className="font-bold text-sm">{driverName}</p>
                <p className="text-xs text-muted-foreground">{trips.toLocaleString()} trips</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm">{vehicleNumber}</p>
                <p className="text-xs text-muted-foreground">{vehicleModel}</p>
              </div>
            </div>

            {/* Action Buttons - Only show during pickup phases */}
            {(status === 'pickup_countdown' || status === 'ride_here') && (
              <div className="flex gap-2 mt-3">
                <Button variant="outline" className="flex-1 h-8 rounded-xl font-medium text-xs">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Message
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-xl">
                  <Phone className="w-3 h-3" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-xl">
                  <MoreHorizontal className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Bottom Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
          {status === 'ride_here' && (
            <Button 
              onClick={handleStartTrip}
              className="w-full h-11 bg-foreground text-background hover:bg-foreground/90 font-bold text-sm rounded-xl"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Trip
            </Button>
          )}
          {status === 'arrived' && (
            <Button 
              onClick={isLastLeg ? handleDriverClosesRide : handleContinueToNextLeg}
              className="w-full h-11 rounded-xl font-bold text-sm bg-foreground text-background hover:bg-foreground/90"
            >
              {isLastLeg ? 'Driver closes ride' : "I'm Walking to Car →"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackingLeg3;