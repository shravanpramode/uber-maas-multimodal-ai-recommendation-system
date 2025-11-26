import { ArrowLeft, Users, Info, Calendar } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTrip } from "@/contexts/TripContext";

const RideDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rideId = searchParams.get("id");
  const { tripState, startTrip } = useTrip();

  const rides = {
    "uber-go": {
      id: "uber-go",
      name: "Uber Go",
      capacity: 4,
      time: "03:28 · 1 min",
      description: "Affordable compact rides",
      price: 340.47,
      image: "🚗",
      fullDescription: "Affordable, compact rides for your everyday travel needs. Clean cars and professional drivers.",
    },
    "go-sedan": {
      id: "go-sedan",
      name: "Go Sedan",
      capacity: 4,
      time: "03:28 · 2 min",
      description: "Affordable sedans",
      price: 342.05,
      image: "🚙",
      fullDescription: "Comfortable sedan rides at affordable prices. More space and comfort for your journey.",
    },
    "uber-xl": {
      id: "uber-xl",
      name: "UberXL",
      capacity: 6,
      time: "03:29 · 3 min",
      description: "Comfortable SUVs",
      price: 698.92,
      image: "🚐",
      fullDescription: "Spacious SUVs perfect for groups. Extra room for luggage and passengers.",
    },
    "premier": {
      id: "premier",
      name: "Premier",
      capacity: 4,
      time: "03:28 · 2 min",
      description: "Comfortable sedans, top-quality drivers",
      price: 469.98,
      image: "✨",
      fullDescription: "Premium sedans with highly-rated professional drivers. Elevated comfort and service.",
    },
    "auto": {
      id: "auto",
      name: "Auto",
      capacity: 3,
      time: "03:26 · 1 min",
      description: "Affordable bike rides",
      price: 230.72,
      image: "🛺",
      fullDescription: "Quick and affordable auto rides. Perfect for short trips across the city.",
    },
  };

  const ride = rideId ? rides[rideId as keyof typeof rides] : rides["go-sedan"];

  if (!ride) {
    navigate("/choose-ride");
    return null;
  }

  const handleConfirm = () => {
    startTrip();
    navigate("/trip-search");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-uber">
      {/* Map Area */}
      <div className="relative h-[55vh] bg-secondary">
        <div className="absolute top-4 left-4 z-10">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full shadow-lg bg-white hover:bg-white/90"
            onClick={() => navigate("/choose-ride")}
          >
            <ArrowLeft className="w-5 h-5 text-black" />
          </Button>
        </div>

        {/* Map placeholder */}
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
          🗺️
        </div>

        {/* Pickup and Destination Labels */}
        <div className="absolute top-20 left-4 bg-white px-3 py-1.5 rounded-full shadow-md text-sm font-medium">
          {tripState.pickup?.name || "Connaught Place"}
        </div>
        <div className="absolute bottom-20 right-4 bg-white px-3 py-1.5 rounded-full shadow-md text-sm font-medium">
          {tripState.destination?.name || "DLF Cyber Park"}
        </div>
      </div>

      {/* Details Card */}
      <div className="flex-1 bg-card rounded-t-3xl -mt-8 relative z-10 shadow-2xl">
        <div className="px-4 py-6">
          <div className="w-12 h-1 bg-border rounded-full mx-auto mb-6" />

          <h2 className="text-xl font-bold mb-6">Confirm details</h2>

          {/* Vehicle Image */}
          <div className="flex justify-center mb-6">
            <div className="text-8xl">{ride.image}</div>
          </div>

          {/* Ride Info */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">{ride.name}</h3>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{ride.capacity}</span>
                </div>
              </div>
              <p className="text-xl font-bold">₹{ride.price}</p>
            </div>
            <p className="text-sm text-muted-foreground">{ride.time}</p>
          </div>

          {/* Description */}
          <div className="flex items-start gap-2 mb-6 pb-6 border-b border-border">
            <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">{ride.fullDescription}</p>
          </div>

          {/* Payment Method */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Personal</p>
              <p className="text-sm font-semibold">Cash</p>
            </div>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleConfirm}
              className="flex-1 h-12 bg-black text-white hover:bg-black/90 font-semibold text-base"
            >
              Choose {ride.name}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 border-2"
            >
              <Calendar className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideDetail;
