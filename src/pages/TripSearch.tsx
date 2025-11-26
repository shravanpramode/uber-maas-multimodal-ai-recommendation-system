import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";

const TripSearch = () => {
  const navigate = useNavigate();
  const { tripState } = useTrip();
  const [searchProgress, setSearchProgress] = useState(0);

  useEffect(() => {
    // Simulate search progress
    const interval = setInterval(() => {
      setSearchProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Navigate to live tracking after search completes
          setTimeout(() => navigate("/live-tracking"), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleCancel = () => {
    navigate("/choose-ride");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Close Button */}
        <div className="flex justify-end mb-8">
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Animation */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative w-48 h-48 mb-8">
            {/* Pulsing circles */}
            <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping" />
            <div className="absolute inset-4 rounded-full bg-accent/30 animate-pulse" />
            <div className="absolute inset-8 rounded-full bg-accent/40 flex items-center justify-center">
              <span className="text-6xl">🚗</span>
            </div>
          </div>

          {/* Progress */}
          <div className="w-full max-w-xs">
            <div className="h-2 bg-secondary rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-accent transition-all duration-300 ease-out"
                style={{ width: `${searchProgress}%` }}
              />
            </div>
          </div>

          {/* Status Messages */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Finding your ride...</h2>
            <div className="space-y-1">
              {searchProgress < 30 && (
                <p className="text-muted-foreground">Analyzing best routes</p>
              )}
              {searchProgress >= 30 && searchProgress < 60 && (
                <p className="text-muted-foreground">Matching with drivers</p>
              )}
              {searchProgress >= 60 && searchProgress < 90 && (
                <p className="text-muted-foreground">Confirming your ride</p>
              )}
              {searchProgress >= 90 && (
                <p className="text-accent font-semibold">Driver found!</p>
              )}
            </div>
          </div>
        </div>

        {/* Trip Details */}
        {tripState.selectedRoute && (
          <div className="bg-card rounded-2xl p-6 border border-border">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">From</span>
                <span className="font-semibold">{tripState.pickup?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">To</span>
                <span className="font-semibold">{tripState.destination?.name}</span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Estimated Fare</span>
                <span className="text-2xl font-bold">₹{tripState.selectedRoute.totalPrice}</span>
              </div>
            </div>
          </div>
        )}

        {/* Cancel Button */}
        <Button
          variant="outline"
          className="w-full mt-6 h-12 font-semibold"
          onClick={handleCancel}
        >
          Cancel Search
        </Button>
      </div>
    </div>
  );
};

export default TripSearch;
