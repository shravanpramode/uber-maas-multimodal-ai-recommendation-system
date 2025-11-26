import { ArrowLeft, Users, Info, Calendar, ChevronRight } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";
import { getRideIcon } from "@/components/RideIcons";
import { toast } from "@/hooks/use-toast";

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
      fullDescription: "Affordable, compact rides for your everyday travel needs. Clean cars and professional drivers.",
    },
    "go-sedan": {
      id: "go-sedan",
      name: "Go Sedan",
      capacity: 4,
      time: "03:28 · 2 min",
      description: "Affordable sedans",
      price: 342.05,
      fullDescription: "Comfortable sedan rides at affordable prices. More space and comfort for your journey.",
    },
    "uber-xl": {
      id: "uber-xl",
      name: "UberXL",
      capacity: 6,
      time: "03:29 · 3 min",
      description: "Comfortable SUVs",
      price: 698.92,
      fullDescription: "Spacious SUVs perfect for groups. Extra room for luggage and passengers.",
    },
    "premier": {
      id: "premier",
      name: "Premier",
      capacity: 4,
      time: "03:28 · 2 min",
      description: "Comfortable sedans, top-quality drivers",
      price: 469.98,
      fullDescription: "Premium sedans with highly-rated professional drivers. Elevated comfort and service.",
    },
    "go-priority": {
      id: "go-priority",
      name: "Go Priority",
      capacity: 4,
      time: "03:28 · 1 min",
      description: "Priority pick-up",
      price: 387.83,
      fullDescription: "Get picked up faster with priority driver assignment. Perfect when you're in a hurry.",
    },
    "request-any": {
      id: "request-any",
      name: "Request any",
      capacity: 4,
      time: "03:28 · 1 min",
      description: "Save time with the first available trip",
      price: 340,
      fullDescription: "Get matched with the first available driver regardless of vehicle type. Fastest option.",
    },
    "bike": {
      id: "bike",
      name: "Bike",
      capacity: 1,
      time: "03:26 · 1 min",
      description: "Affordable bike rides",
      price: 230.72,
      fullDescription: "Quick and economical two-wheeler rides. Navigate traffic efficiently.",
    },
    "electric": {
      id: "electric",
      name: "Electric",
      capacity: 4,
      time: "03:29 · 2 min",
      description: "Comfortable electric sedans, top-quality drivers",
      price: 467.45,
      fullDescription: "Eco-friendly electric vehicles with premium drivers. Sustainable travel with zero emissions.",
    },
    "shuttle": {
      id: "shuttle",
      name: "Shuttle",
      capacity: 8,
      time: "Next at 7:35AM",
      description: "₹90 with package",
      price: 165.0,
      fullDescription: "Shared rides on fixed routes. Most affordable option with scheduled departures.",
    },
    "go-rentals": {
      id: "go-rentals",
      name: "Go Rentals",
      capacity: 4,
      time: "2 min away",
      description: "2 hrs/25 km",
      price: 682.0,
      fullDescription: "Hourly rentals for multiple stops. Perfect for running errands or day trips.",
    },
    "premier-rentals": {
      id: "premier-rentals",
      name: "Premier Rentals",
      capacity: 4,
      time: "2 min away",
      description: "2 hrs/25 km",
      price: 809.6,
      fullDescription: "Premium hourly rentals with top-rated drivers. Comfort for extended journeys.",
    },
    "xl-rentals": {
      id: "xl-rentals",
      name: "XL Rentals",
      capacity: 6,
      time: "3 min away",
      description: "2 hrs/25 km",
      price: 1062.6,
      fullDescription: "Spacious SUV rentals for groups. Extra room for passengers and luggage.",
    },
    "courier": {
      id: "courier",
      name: "Courier",
      capacity: 0,
      time: "03:28 · 2 min",
      description: "Send packages to loved ones",
      price: 188.63,
      fullDescription: "Fast and reliable package delivery service. Send items safely across the city.",
    },
    "black-rentals": {
      id: "black-rentals",
      name: "Black Rentals",
      capacity: 4,
      time: "3 min away",
      description: "Elevated ride experience",
      price: 993.6,
      fullDescription: "Luxury vehicle rentals with professional chauffeurs. Premium experience for special occasions.",
    },
    "bike-saver": {
      id: "bike-saver",
      name: "Bike Saver",
      capacity: 1,
      time: "03:27 · 2 min",
      description: "Affordable bike rides",
      price: 219.88,
      fullDescription: "Budget-friendly two-wheeler option. Save more on quick trips.",
    },
    "black": {
      id: "black",
      name: "Black",
      capacity: 4,
      time: "03:29 · 3 min",
      description: "Elevated ride experience",
      price: 761.54,
      fullDescription: "Premium luxury sedans with highly trained professional drivers. Ultimate comfort and style.",
    },
    "uber-pet": {
      id: "uber-pet",
      name: "Uber Pet",
      capacity: 4,
      time: "03:30 · 4 min",
      description: "Ride with your furry friend",
      price: 613.33,
      fullDescription: "Pet-friendly rides so you can travel with your furry companions. Drivers are happy to accommodate.",
    },
  };

  const ride = rideId ? rides[rideId as keyof typeof rides] : rides["go-sedan"];

  if (!ride) {
    navigate("/choose-ride");
    return null;
  }

  const handleConfirm = () => {
    toast({
      title: "Out of scope",
      description: "This feature is not available in this prototype",
      className: "backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl text-black",
    });
  };

  return (
    <div className="h-screen bg-background flex flex-col font-uber overflow-hidden">
      {/* Map Area - 25% */}
      <div className="relative h-[25vh] bg-secondary flex-shrink-0">
        <div className="absolute top-2 left-2 z-10">
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
        <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-20">
          🗺️
        </div>

        {/* Pickup and Destination Labels */}
        <div className="absolute top-14 left-2 bg-white px-2 py-1 rounded-full shadow-md text-xs font-medium">
          {tripState.pickup?.name || "Connaught Place"}
        </div>
        <div className="absolute bottom-4 right-2 bg-white px-2 py-1 rounded-full shadow-md text-xs font-medium">
          {tripState.destination?.name || "DLF Cyber Park"}
        </div>
      </div>

      {/* Details Section */}
      <div className="flex-1 bg-card px-4 py-3 overflow-y-auto">
        <h2 className="text-lg font-bold mb-3">Confirm details</h2>

        {/* Vehicle Icon */}
        <div className="flex justify-center mb-3">
          {(() => {
            const Icon = getRideIcon(ride.id);
            return <Icon className="w-16 h-16" />;
          })()}
        </div>

        {/* Ride Info */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold">{ride.name}</h3>
              {ride.capacity && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-3 h-3" />
                  <span className="text-xs">{ride.capacity}</span>
                </div>
              )}
            </div>
            <p className="text-lg font-bold">₹{ride.price}</p>
          </div>
          <p className="text-xs text-muted-foreground">{ride.time}</p>
        </div>

        {/* Description */}
        <div className="flex items-start gap-2 mb-3 pb-3 border-b border-border">
          <Info className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">{ride.fullDescription}</p>
        </div>

        {/* Payment Method */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
          <div>
            <p className="text-[10px] text-muted-foreground mb-0.5">Personal</p>
            <p className="text-xs font-semibold">Cash</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              toast({
                title: "Out of scope",
                description: "This feature is not available in this prototype",
                className: "backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl text-black",
              });
            }}
          >
            <ChevronRight className="w-3 h-3" />
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleConfirm}
            className="flex-1 h-11 bg-black text-white hover:bg-black/90 font-semibold text-sm"
          >
            Choose {ride.name}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11 border-2"
            onClick={() => {
              toast({
                title: "Out of scope",
                description: "This feature is not available in this prototype",
                className: "backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl text-black",
              });
            }}
          >
            <Calendar className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RideDetail;
