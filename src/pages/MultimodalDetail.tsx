import { ArrowLeft, Calendar, Wallet, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTrip } from "@/contexts/TripContext";
import MultimodalIcon from "@/components/MultimodalIcon";

const MultimodalDetail = () => {
  const navigate = useNavigate();
  const { tripState, startTrip } = useTrip();

  const handleConfirm = () => {
    startTrip();
    navigate("/route-confirmation");
  };

  const route = tripState.selectedRoute;

  if (!route) {
    navigate("/choose-ride");
    return null;
  }

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

          {/* Multimodal Icon */}
          <div className="flex justify-center mb-6">
            <MultimodalIcon className="w-24 h-24 text-black" />
          </div>

          {/* Route Info */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">Multimodal Journey</h3>
              <p className="text-xl font-bold">₹{route.totalPrice}</p>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Auto + Metro + Auto · {route.totalDuration} min
            </p>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1 text-sm">
                <Wallet className="w-4 h-4 text-success" />
                <span className="text-success font-semibold">
                  Save ₹{route.savings}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Leaf className="w-4 h-4" />
                <span>{route.carbonSaved}kg CO₂ saved</span>
              </div>
            </div>
          </div>

          {/* Journey Legs */}
          <div className="mb-6 pb-6 border-b border-border">
            <h3 className="text-sm font-bold mb-3">Your journey</h3>
            <div className="space-y-3">
              {route.legs?.map((leg, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-lg">
                    {leg.mode === "uber" ? "🚗" : leg.mode === "metro" ? "🚇" : "🚌"}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold capitalize">{leg.mode}</p>
                        <p className="text-xs text-muted-foreground">
                          {leg.from} → {leg.to}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">₹{leg.price}</p>
                        <p className="text-xs text-muted-foreground">
                          {leg.duration} min
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Multimodal */}
          <Card className="mb-6 p-4 bg-accent/5 border-accent/20">
            <h3 className="text-sm font-bold mb-2">Why choose multimodal?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span>
                <span>Save up to ₹{route.savings} compared to regular rides</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span>
                <span>Reduce carbon footprint by {route.carbonSaved}kg CO₂</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span>
                <span>Avoid traffic with metro during peak hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span>
                <span>Seamless transitions between transport modes</span>
              </li>
            </ul>
          </Card>

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
              Choose Multimodal
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12 border-2">
              <Calendar className="w-5 h-5" />
            </Button>
          </div>

          {/* Alternative Options */}
          <Button
            variant="link"
            className="w-full mt-4 text-sm"
            onClick={() => navigate("/choose-ride")}
          >
            View alternative options
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MultimodalDetail;
