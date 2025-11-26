import { ArrowLeft, Users, Info, Zap, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTrip } from "@/contexts/TripContext";
import { useState } from "react";

const ChooseRide = () => {
  const navigate = useNavigate();
  const { selectRoute, startTrip } = useTrip();
  const [selectedRide, setSelectedRide] = useState("go-sedan");

  const rides = [
    {
      id: "uber-go",
      name: "Uber Go",
      capacity: 4,
      time: "05:25 · 9 min",
      description: "Affordable compact rides",
      price: 219.96,
      image: "🚗",
    },
    {
      id: "go-sedan",
      name: "Go Sedan",
      capacity: 4,
      time: "05:23 · 6 min",
      description: "Affordable sedans",
      price: 244.15,
      image: "🚙",
      isRecommended: true,
    },
    {
      id: "uber-xl",
      name: "UberXL",
      capacity: 6,
      time: "05:25 · 6 min",
      description: "Comfortable SUVs",
      price: 450.93,
      image: "🚐",
    },
    {
      id: "auto",
      name: "Auto",
      capacity: 3,
      time: "05:22 · 4 min",
      description: "Pay directly to driver, cash/UPI only",
      price: 104.23,
      image: "🛺",
    },
    {
      id: "premier",
      name: "Premier",
      capacity: 4,
      time: "05:22 · 4 min",
      description: "Comfortable sedans, top-quality drivers",
      price: 300.57,
      image: "✨",
    },
  ];

  const multimodalRoute = {
    id: "multimodal-1",
    name: "Multimodal Journey",
    totalPrice: 156.45,
    totalDuration: 42,
    legs: [
      { mode: "uber" as const, from: "Pickup", to: "Metro Station", duration: 8, price: 52.15 },
      { mode: "metro" as const, from: "Station A", to: "Station B", duration: 25, price: 28.00 },
      { mode: "uber" as const, from: "Metro Station", to: "Destination", duration: 9, price: 76.30 },
    ],
    savings: 43.52,
    isRecommended: true,
    carbonSaved: 2.3,
  };

  const handleRideSelect = (rideId: string) => {
    setSelectedRide(rideId);
  };

  const handleConfirm = () => {
    if (selectedRide === "multimodal") {
      selectRoute(multimodalRoute);
      navigate("/multimodal-detail");
    } else {
      const ride = rides.find(r => r.id === selectedRide);
      if (ride) {
        selectRoute({
          id: ride.id,
          totalPrice: ride.price,
          totalDuration: parseInt(ride.time.split("·")[1]),
          legs: [
            { mode: "uber", from: "Pickup", to: "Destination", duration: parseInt(ride.time.split("·")[1]), price: ride.price }
          ],
        });
        startTrip();
        navigate("/trip-search");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Map Area */}
      <div className="relative h-64 bg-secondary">
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Button variant="secondary" size="icon" className="rounded-full shadow-lg" onClick={() => navigate("/location-search")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button variant="secondary" size="sm" className="rounded-full shadow-lg font-semibold">
            <MapPin className="w-4 h-4 mr-2" />
            Map
          </Button>
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
          🗺️
        </div>
      </div>

      {/* Ride Options */}
      <div className="flex-1 bg-card rounded-t-3xl -mt-8 relative z-10 shadow-2xl">
        <div className="px-4 py-6">
          <div className="w-12 h-1 bg-border rounded-full mx-auto mb-6" />
          
          <h2 className="text-2xl font-bold mb-6">Choose a ride</h2>

          {/* AI Recommended - Multimodal */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-accent fill-accent" />
              <h3 className="font-bold text-lg">Rides we think you'll like</h3>
            </div>
            
            <Card
              className={`p-4 cursor-pointer transition-all border-2 ${
                selectedRide === "multimodal" ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
              }`}
              onClick={() => handleRideSelect("multimodal")}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">🚇</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">Multimodal Journey</h3>
                    <div className="bg-accent text-accent-foreground text-xs font-bold px-2 py-0.5 rounded">
                      BEST VALUE
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Auto + Metro + Auto · {multimodalRoute.totalDuration} min</p>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-success font-semibold">Save ₹{multimodalRoute.savings}</span>
                    <span className="text-muted-foreground">• 2.3kg CO₂ saved</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">₹{multimodalRoute.totalPrice}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Standard Rides */}
          <div className="space-y-3">
            {rides.map((ride) => (
              <Card
                key={ride.id}
                className={`p-4 cursor-pointer transition-all border-2 ${
                  selectedRide === ride.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
                onClick={() => handleRideSelect(ride.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{ride.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold">{ride.name}</h3>
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{ride.capacity}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{ride.time}</p>
                    <p className="text-sm text-muted-foreground">{ride.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">₹{ride.price}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex-1 justify-start h-14">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-3">
              <span className="text-sm font-semibold">1</span>
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Personal</p>
              <p className="text-sm font-semibold">UPI Scan and Pay</p>
            </div>
          </Button>
          <Button onClick={handleConfirm} className="h-14 px-8 text-base font-bold">
            Choose {selectedRide === "go-sedan" ? "Go Sedan" : selectedRide === "multimodal" ? "Multimodal" : "ride"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChooseRide;
