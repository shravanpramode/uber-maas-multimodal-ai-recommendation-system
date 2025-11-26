import { ArrowLeft, Phone, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";
import { useEffect, useState } from "react";

const TrackingLeg3 = () => {
  const navigate = useNavigate();
  const { completeTrip } = useTrip();
  const [eta, setEta] = useState(5);
  const [status, setStatus] = useState('arriving');

  useEffect(() => {
    if (status === 'arriving') {
      const interval = setInterval(() => {
        setEta(prev => {
          if (prev <= 0.5) {
            clearInterval(interval);
            setStatus('arrived');
            return 0;
          }
          return prev - 0.5;
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [status]);

  const handleArrived = () => {
    setStatus('in_progress');
    setTimeout(() => {
      completeTrip();
      navigate('/trip-complete');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="h-14 bg-card border-b border-border flex items-center px-4 sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="ml-4 font-bold text-lg">Live Tracking - Leg 3</h1>
      </div>

      {/* Map Area */}
      <div className="relative h-64 bg-secondary">
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
          🗺️
        </div>
        <div className="absolute top-4 left-4 right-4">
          <div className="bg-card rounded-lg p-3 shadow-lg">
            {status === 'arriving' && (
              <p className="text-sm font-semibold">Arriving in {Math.ceil(eta)} mins</p>
            )}
            {status === 'arrived' && (
              <p className="text-sm font-semibold text-accent">✓ You've arrived!</p>
            )}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 bg-card rounded-t-3xl -mt-8 relative z-10 p-6">
        <div className="w-12 h-1 bg-border rounded-full mx-auto mb-6" />
        
        {status === 'arrived' && (
          <div className="bg-accent/10 border border-accent rounded-xl p-4 mb-6">
            <p className="text-lg font-bold text-accent text-center">Connaught Place</p>
          </div>
        )}
        
        <p className="text-sm text-muted-foreground mb-2">Leg 3 of 3 • Uber Auto</p>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl font-bold">Amit Sharma</h2>
          {status === 'arriving' && (
            <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded font-semibold">
              ✓ PRE-BOOKED & WAITING
            </span>
          )}
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Rating</span>
            <span className="font-semibold">⭐ 4.6</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Vehicle</span>
            <span className="font-semibold">DL-2B-CD-5678</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Model</span>
            <span className="font-semibold">Black Honda City</span>
          </div>
        </div>

        {status === 'arriving' && (
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" size="lg">
              <Phone className="w-5 h-5 mr-2" />
              Call
            </Button>
            <Button variant="outline" className="flex-1" size="lg">
              <MessageCircle className="w-5 h-5 mr-2" />
              Message
            </Button>
          </div>
        )}

        {status === 'arrived' && (
          <Button onClick={handleArrived} className="w-full mt-3" size="lg">
            I'm Walking to Car →
          </Button>
        )}
      </div>
    </div>
  );
};

export default TrackingLeg3;
