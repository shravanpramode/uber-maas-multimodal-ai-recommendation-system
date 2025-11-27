import { ArrowLeft, Users, MapPin, Calendar, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";
import { useState } from "react";
import MultimodalIcon from "@/components/MultimodalIcon";
import { toast } from "@/hooks/use-toast";
import { getRideIcon } from "@/components/RideIcons";

const ChooseRide = () => {
  const navigate = useNavigate();
  const { selectRoute, tripState } = useTrip();
  const [selectedRide, setSelectedRide] = useState<string | null>(null);
  const [selectedRideName, setSelectedRideName] = useState<string | null>(null);

  const rides = [
    {
      id: "uber-go",
      name: "Uber Go",
      capacity: 4,
      time: "03:28 · 1 min",
      description: "Affordable compact rides",
      price: 340.47,
      image: "🚗",
      badge: "Faster",
      category: "recommended",
    },
    {
      id: "go-sedan",
      name: "Go Sedan",
      capacity: 4,
      time: "03:28 · 2 min",
      description: "Affordable sedans",
      price: 342.05,
      image: "🚙",
      category: "recommended",
    },
    {
      id: "uber-xl",
      name: "UberXL",
      capacity: 6,
      time: "03:29 · 3 min",
      description: "Comfortable SUVs",
      price: 698.92,
      image: "🚐",
      category: "recommended",
    },
    {
      id: "premier",
      name: "Premier",
      capacity: 4,
      time: "03:28 · 2 min",
      description: "Comfortable sedans, top-quality drivers",
      price: 469.98,
      image: "✨",
      category: "recommended",
    },
    {
      id: "go-priority",
      name: "Go Priority",
      capacity: 4,
      time: "03:28 · 1 min",
      description: "Priority pick-up",
      price: 387.83,
      image: "🚗",
      category: "economy",
    },
    {
      id: "request-any",
      name: "Request any",
      capacity: 4,
      time: "03:28 · 1 min",
      description: "Save time with the first available trip",
      price: 340,
      priceRange: "340-470",
      image: "🚗",
      category: "economy",
    },
    {
      id: "bike",
      name: "Bike",
      capacity: 1,
      time: "03:26 · 1 min",
      description: "Affordable bike rides",
      price: 230.72,
      image: "🏍️",
      category: "economy",
    },
    {
      id: "electric",
      name: "Electric",
      capacity: 4,
      time: "03:29 · 2 min",
      description: "Comfortable electric sedans, top-quality drivers",
      price: 467.45,
      image: "⚡",
      category: "economy",
    },
    {
      id: "shuttle",
      name: "Shuttle",
      time: "Next at 7:35AM",
      description: "₹90 with package",
      price: 165.0,
      image: "🚌",
      category: "economy",
    },
    {
      id: "go-rentals",
      name: "Go Rentals",
      time: "2 min away",
      description: "2 hrs/25 km",
      price: 682.0,
      image: "🚗",
      category: "rentals",
    },
    {
      id: "premier-rentals",
      name: "Premier Rentals",
      time: "2 min away",
      description: "2 hrs/25 km",
      price: 809.6,
      image: "✨",
      category: "rentals",
    },
    {
      id: "xl-rentals",
      name: "XL Rentals",
      time: "3 min away",
      description: "2 hrs/25 km",
      price: 1062.6,
      image: "🚐",
      category: "rentals",
    },
    {
      id: "courier",
      name: "Courier",
      time: "03:28 · 2 min",
      description: "Send packages to loved ones",
      price: 188.63,
      originalPrice: 238.63,
      image: "📦",
      category: "other",
    },
    {
      id: "black-rentals",
      name: "Black Rentals",
      capacity: 4,
      time: "3 min away",
      description: "Elevated ride experience",
      price: 993.6,
      image: "🖤",
      category: "other",
    },
    {
      id: "bike-saver",
      name: "Bike Saver",
      capacity: 1,
      time: "03:27 · 2 min",
      description: "Affordable bike rides",
      price: 219.88,
      image: "🏍️",
      category: "other",
    },
    {
      id: "black",
      name: "Black",
      capacity: 4,
      time: "03:29 · 3 min",
      description: "Elevated ride experience",
      price: 761.54,
      originalPrice: 850.0,
      image: "🖤",
      category: "other",
    },
    {
      id: "uber-pet",
      name: "Uber Pet",
      capacity: 4,
      time: "03:30 · 4 min",
      description: "Ride with your furry friend",
      price: 613.33,
      image: "🐕",
      category: "other",
    },
  ];

  const multimodalRoute = {
    id: "multimodal-1",
    name: "Multimodal",
    totalPrice: 156.45,
    totalDuration: 42,
    legs: [
      { mode: "uber" as const, from: "Pickup", to: "Metro Station", duration: 8, price: 52.15 },
      { mode: "metro" as const, from: "Station A", to: "Station B", duration: 25, price: 28.0 },
      { mode: "uber" as const, from: "Metro Station", to: "Destination", duration: 9, price: 76.3 },
    ],
    savings: 183.52,
    isRecommended: true,
    carbonSaved: 2.3,
  };

  const handleMultimodalClick = () => {
    if (selectedRide === "multimodal") {
      // Second click - navigate to details
      selectRoute(multimodalRoute);
      navigate("/multimodal-detail");
    } else {
      // First click - just select
      setSelectedRide("multimodal");
      setSelectedRideName("Multimodal");
    }
  };

  const handleRideClick = (rideId: string, rideName: string) => {
    if (selectedRide === rideId) {
      // Second click - navigate to details
      navigate(`/ride-detail?id=${rideId}`);
    } else {
      // First click - just select
      setSelectedRide(rideId);
      setSelectedRideName(rideName);
    }
  };

  const handleChooseClick = () => {
    if (!selectedRide) return;
    
    if (selectedRide === "multimodal") {
      selectRoute(multimodalRoute);
      navigate("/trip-search");
    } else {
      toast({
        title: "Out of scope",
        description: "This feature is not available in this prototype",
        className: "backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl text-black",
      });
    }
  };

  const recommendedRides = rides.filter((r) => r.category === "recommended");
  const economyRides = rides.filter((r) => r.category === "economy");
  const rentalRides = rides.filter((r) => r.category === "rentals");
  const otherRides = rides.filter((r) => r.category === "other");

  return (
    <div className="h-screen bg-background flex flex-col font-uber overflow-hidden">
      {/* Map Area - 12% with pickup inside */}
      <div className="relative h-[12vh] bg-secondary flex-shrink-0">
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full shadow-lg bg-white hover:bg-white/90"
            onClick={() => navigate("/location-search")}
          >
            <ArrowLeft className="w-5 h-5 text-black" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full shadow-lg font-semibold bg-white hover:bg-white/90 text-black"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Map
          </Button>
        </div>

        {/* Map placeholder */}
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
          🗺️
        </div>

        {/* Pickup Label - Inside Map at bottom */}
        <div className="absolute bottom-2 left-4 bg-white px-3 py-1.5 rounded-full shadow-md text-sm font-medium">
          {tripState.pickup?.name || "Connaught Place"}
        </div>
      </div>

      {/* Ride Options Section - 70% scrollable */}
      <div className="flex-1 overflow-y-auto bg-card px-4 py-4">
        <h2 className="text-xl font-bold mb-4">Choose a ride</h2>

            {/* Multimodal - Best Value */}
            <div className="mb-4">
              <h3 className="text-sm font-bold mb-3 text-muted-foreground">
                Rides we think you'll like
              </h3>

              <button
                onClick={handleMultimodalClick}
                type="button"
                className={`w-full p-3 cursor-pointer transition-all border-2 rounded-xl text-left mb-3 ${
                  selectedRide === "multimodal"
                    ? "border-black bg-black/5"
                    : "border-border hover:border-black/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <MultimodalIcon className="w-12 h-12 text-black" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-base">Multimodal</h3>
                      <div className="bg-success/10 text-success text-[10px] font-bold px-2 py-0.5 rounded-full">
                        BEST VALUE
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      03:28 · {multimodalRoute.totalDuration} min total
                    </p>
                    <p className="text-xs text-muted-foreground mb-1.5">
                      Save ₹{multimodalRoute.savings} · {multimodalRoute.carbonSaved}kg CO₂ saved
                      {tripState.passengerCount > 1 && ` · ${tripState.passengerCount} passengers`}
                    </p>
                    <p className="text-xs text-muted-foreground italic">
                      Combine Uber rides with public transit
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">₹{multimodalRoute.totalPrice}</p>
                  </div>
                </div>
              </button>

              {/* Recommended Rides */}
              <div className="space-y-2">
                {recommendedRides.map((ride) => (
                  <button
                    key={ride.id}
                    onClick={() => handleRideClick(ride.id, ride.name)}
                    type="button"
                    className={`w-full p-3 cursor-pointer transition-all border-2 rounded-xl text-left ${
                      selectedRide === ride.id
                        ? "border-black bg-black/5"
                        : "border-border hover:border-black/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {(() => {
                        const Icon = getRideIcon(ride.id);
                        return <Icon className="w-12 h-12 flex-shrink-0" />;
                      })()}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-bold text-base">{ride.name}</h3>
                          {ride.capacity && (
                            <>
                              <Users className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {ride.capacity}
                              </span>
                            </>
                          )}
                          {ride.badge && (
                            <div className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                              {ride.badge}
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-0.5">
                          {ride.time}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {ride.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">
                          ₹{ride.priceRange || ride.price}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Economy Section */}
            {economyRides.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-bold mb-3 text-muted-foreground">Economy</h3>
                <div className="space-y-2">
                  {economyRides.map((ride) => (
                    <button
                      key={ride.id}
                      onClick={() => handleRideClick(ride.id, ride.name)}
                      type="button"
                      className={`w-full p-3 cursor-pointer transition-all border-2 rounded-xl text-left ${
                        selectedRide === ride.id
                          ? "border-black bg-black/5"
                          : "border-border hover:border-black/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {(() => {
                          const Icon = getRideIcon(ride.id);
                          return <Icon className="w-12 h-12 flex-shrink-0" />;
                        })()}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="font-bold text-base">{ride.name}</h3>
                            {ride.capacity && (
                              <>
                                <Users className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {ride.capacity}
                                </span>
                              </>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-0.5">
                            {ride.time}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {ride.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">
                            ₹{ride.priceRange || ride.price}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Rentals Section */}
            {rentalRides.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-bold mb-3 text-muted-foreground">Rentals</h3>
                <div className="space-y-2">
                  {rentalRides.map((ride) => (
                    <button
                      key={ride.id}
                      onClick={() => handleRideClick(ride.id, ride.name)}
                      type="button"
                      className={`w-full p-3 cursor-pointer transition-all border-2 rounded-xl text-left ${
                        selectedRide === ride.id
                          ? "border-black bg-black/5"
                          : "border-border hover:border-black/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {(() => {
                          const Icon = getRideIcon(ride.id);
                          return <Icon className="w-12 h-12 flex-shrink-0" />;
                        })()}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base mb-0.5">{ride.name}</h3>
                          <p className="text-xs text-muted-foreground mb-0.5">
                            {ride.time}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {ride.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">₹{ride.price}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Other Options Section */}
            {otherRides.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-bold mb-3 text-muted-foreground">
                  Other options
                </h3>
                <div className="space-y-2">
                  {otherRides.map((ride) => (
                    <button
                      key={ride.id}
                      onClick={() => handleRideClick(ride.id, ride.name)}
                      type="button"
                      className={`w-full p-3 cursor-pointer transition-all border-2 rounded-xl text-left ${
                        selectedRide === ride.id
                          ? "border-black bg-black/5"
                          : "border-border hover:border-black/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {(() => {
                          const Icon = getRideIcon(ride.id);
                          return <Icon className="w-12 h-12 flex-shrink-0" />;
                        })()}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="font-bold text-base">{ride.name}</h3>
                            {ride.capacity && (
                              <>
                                <Users className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {ride.capacity}
                                </span>
                              </>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-0.5">
                            {ride.time}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {ride.description}
                          </p>
                        </div>
                        <div className="text-right">
                          {ride.originalPrice && (
                            <p className="text-xs text-muted-foreground line-through">
                              ₹{ride.originalPrice}
                            </p>
                          )}
                          <p className="text-lg font-bold">₹{ride.price}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

      {/* Fixed Bottom Bar - Payment & Choose Button */}
      <div className="flex-shrink-0 bg-card border-t border-border p-4 space-y-3">
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 justify-start"
            onClick={() => {
              toast({
                title: "Out of scope",
                description: "This feature is not available in this prototype",
                className: "backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl text-black",
              });
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div className="text-left">
                <p className="text-[10px] text-muted-foreground">Personal</p>
                <p className="text-xs font-semibold">Cash</p>
              </div>
            </div>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 border-2"
            onClick={() => {
              toast({
                title: "Out of scope",
                description: "This feature is not available in this prototype",
                className: "backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl text-black",
              });
            }}
          >
            <Calendar className="w-5 h-5" />
          </Button>
        </div>
        <Button
          onClick={handleChooseClick}
          disabled={!selectedRide}
          className="w-full h-12 bg-black text-white hover:bg-black/90 font-semibold text-base disabled:opacity-50"
        >
          {selectedRideName ? `Choose ${selectedRideName}` : "Choose a ride"}
        </Button>
      </div>
    </div>
  );
};

export default ChooseRide;
