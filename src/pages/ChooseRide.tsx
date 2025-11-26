import { ArrowLeft, Users, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import MultimodalIcon from "@/components/MultimodalIcon";

const ChooseRide = () => {
  const navigate = useNavigate();
  const { selectRoute, tripState } = useTrip();
  const [selectedRide, setSelectedRide] = useState("go-sedan");
  const [snapPoint, setSnapPoint] = useState<number | string | null>(0.6);

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
    name: "Multimodal Journey",
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
    setSelectedRide("multimodal");
    selectRoute(multimodalRoute);
    navigate("/multimodal-detail");
  };

  const handleRideClick = (rideId: string) => {
    setSelectedRide(rideId);
    navigate(`/ride-detail?id=${rideId}`);
  };

  const recommendedRides = rides.filter((r) => r.category === "recommended");
  const economyRides = rides.filter((r) => r.category === "economy");
  const rentalRides = rides.filter((r) => r.category === "rentals");
  const otherRides = rides.filter((r) => r.category === "other");

  return (
    <div className="min-h-screen bg-background flex flex-col font-uber">
      {/* Map Area */}
      <div className="relative h-[50vh] bg-secondary">
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

        {/* Pickup and Destination Labels */}
        <div className="absolute top-20 left-4 bg-white px-3 py-1.5 rounded-full shadow-md text-sm font-medium">
          {tripState.pickup?.name || "Connaught Place"}
        </div>
        <div className="absolute bottom-20 right-4 bg-white px-3 py-1.5 rounded-full shadow-md text-sm font-medium">
          {tripState.destination?.name || "DLF Cyber Park"}
        </div>
      </div>

      {/* Bottom Sheet with Ride Options */}
      <Drawer
        open={true}
        modal={false}
        snapPoints={[0.9, 0.6, 0.1]}
        activeSnapPoint={snapPoint}
        setActiveSnapPoint={setSnapPoint}
        dismissible={false}
      >
        <DrawerContent className="fixed bottom-0 left-0 right-0 max-h-[90vh] rounded-t-3xl shadow-2xl">
          <div className="px-4 py-4 overflow-y-auto max-h-[85vh]">
            <div className="w-12 h-1 bg-border rounded-full mx-auto mb-4" />

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
                      <h3 className="font-bold text-base">Multimodal Journey</h3>
                      <div className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded">
                        BEST VALUE
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Auto + Metro + Auto · {multimodalRoute.totalDuration} min
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-success font-semibold">
                        Save ₹{multimodalRoute.savings}
                      </span>
                      <span className="text-muted-foreground">
                        • {multimodalRoute.carbonSaved}kg CO₂ saved
                      </span>
                    </div>
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
                    onClick={() => handleRideClick(ride.id)}
                    type="button"
                    className={`w-full p-3 cursor-pointer transition-all border-2 rounded-xl text-left ${
                      selectedRide === ride.id
                        ? "border-black bg-black/5"
                        : "border-border hover:border-black/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{ride.image}</div>
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
                      onClick={() => handleRideClick(ride.id)}
                      type="button"
                      className="w-full p-3 cursor-pointer transition-all border-2 rounded-xl text-left border-border hover:border-black/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{ride.image}</div>
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
                      onClick={() => handleRideClick(ride.id)}
                      type="button"
                      className="w-full p-3 cursor-pointer transition-all border-2 rounded-xl text-left border-border hover:border-black/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{ride.image}</div>
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
                      onClick={() => handleRideClick(ride.id)}
                      type="button"
                      className="w-full p-3 cursor-pointer transition-all border-2 rounded-xl text-left border-border hover:border-black/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{ride.image}</div>
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

          {/* Fixed Bottom Bar */}
          <div className="sticky bottom-0 bg-card border-t border-border p-4">
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 h-12 justify-start">
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
              <Button variant="outline" size="icon" className="h-12 w-12 border-2">
                <Calendar className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ChooseRide;
