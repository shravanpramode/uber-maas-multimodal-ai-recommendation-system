import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, MessageSquare, Share2, Star, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTrip } from "@/contexts/TripContext";
import GoogleMapView from "@/components/Map/GoogleMapView";

const LiveTracking = () => {
  const navigate = useNavigate();
  const { tripState, nextLeg } = useTrip();
  const [eta, setEta] = useState(7);
  const [isMapExpanded, setIsMapExpanded] = useState(true);

  useEffect(() => {
    // Simulate ETA countdown
    const interval = setInterval(() => {
      setEta((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Navigate to trip complete after journey ends
          setTimeout(() => navigate("/trip-complete"), 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [navigate]);

  // Simulated driver location (moves toward destination)
  const pickupCoords = { lat: tripState.pickup?.lat ?? 28.6315, lng: tripState.pickup?.lng ?? 77.2167 };
  const destCoords = { lat: 28.6429, lng: 77.2195 }; // Metro Station
  const progress = (7 - eta) / 7;
  const driverLat = pickupCoords.lat + (destCoords.lat - pickupCoords.lat) * progress;
  const driverLng = pickupCoords.lng + (destCoords.lng - pickupCoords.lng) * progress;

  const driverInfo = {
    name: "Rajesh Kumar",
    rating: 4.8,
    trips: 1245,
    vehicleNumber: "TN 01 AB 1234",
    vehicleModel: "Maruti Suzuki WagonR",
    photo: "👨‍💼",
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Map Area - Transitioning between 15vh and 45vh (default) */}
      <div 
        className={`relative transition-all duration-500 ease-in-out bg-secondary flex-shrink-0 ${
          isMapExpanded ? "h-[45vh]" : "h-[15vh]"
        }`}
      >
        <GoogleMapView
          pickup={pickupCoords}
          destination={destCoords}
          showRoute={true}
          driverLocation={{ lat: driverLat, lng: driverLng }}
          height="100%"
          interactive={isMapExpanded}
        >
          {/* Map Expand/Minimize Button */}
          <div className="absolute top-4 right-4 z-20">
            <Button
              variant="secondary"
              size="sm"
              className={`rounded-full shadow-lg font-semibold transition-colors ${
                isMapExpanded ? "bg-black text-white" : "bg-white text-black hover:bg-white/90"
              }`}
              onClick={() => setIsMapExpanded(!isMapExpanded)}
            >
              <MapPin className="w-4 h-4 mr-2" />
              {isMapExpanded ? "Minimize" : "Map"}
            </Button>
          </div>

          {/* ETA Badge */}
          <div className={`absolute left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg z-10 transition-all duration-500 ${
            isMapExpanded ? "top-4" : "-top-20"
          }`}>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="font-bold text-lg">{eta} MIN</span>
            </div>
          </div>

          {/* Trip Progress */}
          <div className={`absolute left-4 right-4 z-10 transition-all duration-500 ${
            isMapExpanded ? "top-20" : "-top-40"
          }`}>
            <Card className="p-4 shadow-xl border-white/20 backdrop-blur-md bg-white/90">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-sm font-semibold">Leg 1 of 3</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Auto to Metro Station</p>
                </div>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-accent w-1/3 transition-all duration-500" />
              </div>
            </Card>
          </div>
        </GoogleMapView>
      </div>

      {/* Driver Info Card */}
      <div className="bg-card rounded-t-3xl -mt-8 relative z-10 shadow-2xl">
        <div className="px-4 py-6">
          <div className="w-12 h-1 bg-border rounded-full mx-auto mb-6" />
          
          {/* Driver Details */}
          <div className="flex items-start gap-4 mb-6">
            <div className="text-6xl">{driverInfo.photo}</div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-bold">{driverInfo.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-semibold">{driverInfo.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({driverInfo.trips} trips)
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-1 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">{driverInfo.vehicleModel}</p>
                <p className="font-mono">{driverInfo.vehicleNumber}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Button variant="outline" className="flex-col h-auto py-4 gap-2">
              <Phone className="w-5 h-5" />
              <span className="text-xs">Call</span>
            </Button>
            <Button variant="outline" className="flex-col h-auto py-4 gap-2">
              <MessageSquare className="w-5 h-5" />
              <span className="text-xs">Message</span>
            </Button>
            <Button variant="outline" className="flex-col h-auto py-4 gap-2">
              <Share2 className="w-5 h-5" />
              <span className="text-xs">Share</span>
            </Button>
          </div>

          {/* Journey Details */}
          <Card className="p-4 bg-secondary/50">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full bg-primary mt-1" />
                <div className="flex-1">
                  <p className="font-semibold">{tripState.pickup?.name}</p>
                  <p className="text-sm text-muted-foreground">Pickup location</p>
                </div>
              </div>
              
              <div className="pl-1.5">
                <div className="w-0.5 h-8 bg-border ml-1" />
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1" />
                <div className="flex-1">
                  <p className="font-semibold">Metro Station</p>
                  <p className="text-sm text-muted-foreground">First stop</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Safety Info */}
          <div className="mt-6 p-4 bg-accent/10 rounded-lg">
            <p className="text-sm text-center">
              <span className="font-semibold">Trip code:</span> {tripState.tripId?.slice(-6)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;
