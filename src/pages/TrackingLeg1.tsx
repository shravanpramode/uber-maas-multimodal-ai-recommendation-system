import { X, Phone, MessageCircle, MoreHorizontal, ChevronDown, User, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";
import { useEffect, useState } from "react";
import AnimatedProgressBar from "@/components/AnimatedProgressBar";

type TrackingStatus = 'pickup_countdown' | 'ride_here' | 'in_transit' | 'arrived';

const TrackingLeg1 = () => {
  const navigate = useNavigate();
  const { nextLeg, tripState } = useTrip();
  const [status, setStatus] = useState<TrackingStatus>('pickup_countdown');
  const [countdown, setCountdown] = useState(5);
  const [progress, setProgress] = useState(0);
  const totalTime = 8;

  const currentLeg = tripState.selectedRoute?.legs[0];
  const nextLeg2 = tripState.selectedRoute?.legs[1];
  const isNextLegTransit = nextLeg2 && ['metro', 'bus', 'suburban-train'].includes(nextLeg2.mode);

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

  // Phase 4: After arrival, auto-navigate
  useEffect(() => {
    if (status === 'arrived') {
      const timeout = setTimeout(() => {
        nextLeg();
        if (isNextLegTransit) {
          navigate('/transit-ticket');
        } else if (tripState.selectedRoute && tripState.selectedRoute.legs.length > 1) {
          navigate('/tracking-leg2');
        } else {
          navigate('/trip-complete');
        }
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [status, navigate, nextLeg, isNextLegTransit, tripState.selectedRoute]);

  const handleStartTrip = () => {
    setStatus('in_transit');
  };

  const pin = ['2', '5', '6', '1'];
  const driverName = "M Dhinesh Kumar";
  const vehicleNumber = currentLeg?.vehicleNumber || "TN18AM9263";
  const vehicleModel = "Red Ford Aspire";
  const rating = 4.97;
  const trips = 1671;

  const getStatusText = () => {
    switch (status) {
      case 'pickup_countdown': return `Pick up in ${countdown}s`;
      case 'ride_here': return 'Your ride is here';
      case 'in_transit': return 'In-Transit';
      case 'arrived': return `You've arrived at ${currentLeg?.to || 'destination'}`;
    }
  };

  const getHeaderStatusText = () => {
    switch (status) {
      case 'pickup_countdown': return `Pick up in ${countdown}s`;
      case 'ride_here': return 'Your ride is here';
      case 'in_transit': return 'In-Transit';
      case 'arrived': return 'Arrived';
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header Bar - Dark */}
      <div className="bg-foreground text-background px-4 py-2">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className={`text-base font-bold ${status === 'arrived' ? 'text-green-400' : ''}`}>
              {getHeaderStatusText()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-background/20 flex items-center justify-center">
              <User className="w-3.5 h-3.5" />
            </div>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs opacity-90 mb-2">
          <span className="font-medium">Uber</span>
          <span>{vehicleNumber}</span>
          <span>•</span>
          <span>{vehicleModel}</span>
        </div>
        <AnimatedProgressBar progress={progress} mode={currentLeg?.mode || 'auto'} />
      </div>

      {/* Map Area */}
      <div className="relative h-[28vh] bg-secondary">
        <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-20">
          🗺️
        </div>
        <div className="absolute top-3 left-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="bg-card/90 backdrop-blur rounded-full h-9 w-9">
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card px-3 py-1 rounded-lg shadow-lg">
          <p className="text-xs font-medium">{tripState.pickup?.name || "Pickup point"}</p>
        </div>
      </div>

      {/* Bottom Card */}
      <div className="flex-1 bg-card rounded-t-2xl -mt-4 relative z-10 flex flex-col">
        <div className="w-10 h-1 bg-border rounded-full mx-auto mt-2 mb-3" />
        
        <div className="px-4 flex-1">
          <h2 className={`text-xl font-bold mb-3 ${status === 'arrived' ? 'text-green-600' : ''}`}>
            {getStatusText()}
          </h2>

          {/* Share PIN - Only show during pickup_countdown and ride_here */}
          {(status === 'pickup_countdown' || status === 'ride_here') && (
            <div className="bg-blue-600 rounded-xl p-3 mb-3 flex items-center justify-between">
              <span className="text-white font-bold text-sm">Share PIN</span>
              <div className="flex gap-1.5">
                {pin.map((digit, i) => (
                  <div key={i} className="w-7 h-9 bg-white rounded flex items-center justify-center">
                    <span className="text-base font-bold text-blue-600">{digit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Start Trip Button - Only show when ride is here */}
          {status === 'ride_here' && (
            <Button 
              onClick={handleStartTrip}
              className="w-full h-11 mb-3 bg-foreground text-background hover:bg-foreground/90 font-bold text-sm rounded-xl"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Trip
            </Button>
          )}

          {/* Trip Details */}
          <div className="border border-border rounded-xl p-3 mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm">Trip details</span>
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">Meet at your pick-up spot on</p>
            <p className="font-medium text-sm">{tripState.pickup?.address || "IAF Station Road"}</p>
          </div>

          {/* Driver Card */}
          <div className="border border-border rounded-xl p-3">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center">
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
                <Button variant="outline" className="flex-1 h-9 rounded-xl font-medium text-xs">
                  <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                  Message
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl">
                  <Phone className="w-3.5 h-3.5" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingLeg1;
