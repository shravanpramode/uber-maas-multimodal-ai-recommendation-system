import { ArrowLeft, Clock, Leaf, MapPin, Train, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTrip } from "@/contexts/TripContext";

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card px-4 py-6 border-b border-border">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/choose-ride")}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Multimodal Journey</h1>
            <p className="text-sm text-muted-foreground">Best value for your trip</p>
          </div>
        </div>
      </header>

      {/* Trip Overview */}
      <div className="px-4 py-6">
        <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              <span className="text-xl font-bold">{route.totalDuration} min</span>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">₹{route.totalPrice}</p>
              {route.savings && (
                <p className="text-sm text-success font-semibold">Save ₹{route.savings}</p>
              )}
            </div>
          </div>
          
          {route.carbonSaved && (
            <div className="flex items-center gap-2 bg-success/10 px-3 py-2 rounded-lg">
              <Leaf className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-success">
                Reduce {route.carbonSaved}kg CO₂ emissions
              </span>
            </div>
          )}
        </Card>

        {/* Journey Legs */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Your journey</h2>
          
          <div className="space-y-4">
            {route.legs.map((leg, index) => (
              <div key={index} className="relative">
                {index > 0 && (
                  <div className="absolute left-8 -top-4 w-0.5 h-4 bg-border" />
                )}
                
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                      {leg.mode === "uber" && <Car className="w-8 h-8" />}
                      {leg.mode === "metro" && <Train className="w-8 h-8" />}
                      {leg.mode === "walk" && <span className="text-2xl">🚶</span>}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold capitalize">{leg.mode}</h3>
                        <span className="text-sm font-semibold">₹{leg.price}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{leg.from} → {leg.to}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{leg.duration} min</span>
                        {leg.prebooked && (
                          <span className="bg-accent/20 text-accent px-2 py-0.5 rounded text-xs font-semibold ml-2">
                            Pre-booked
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Why Multimodal */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Why choose multimodal?</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 text-center">
              <div className="text-3xl mb-2">💰</div>
              <p className="font-semibold mb-1">Save Money</p>
              <p className="text-sm text-muted-foreground">₹{route.savings} cheaper</p>
            </Card>
            
            <Card className="p-4 text-center">
              <div className="text-3xl mb-2">🌱</div>
              <p className="font-semibold mb-1">Eco-Friendly</p>
              <p className="text-sm text-muted-foreground">{route.carbonSaved}kg CO₂ less</p>
            </Card>
            
            <Card className="p-4 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <p className="font-semibold mb-1">Beat Traffic</p>
              <p className="text-sm text-muted-foreground">Avoid congestion</p>
            </Card>
            
            <Card className="p-4 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <p className="font-semibold mb-1">AI Optimized</p>
              <p className="text-sm text-muted-foreground">Best route for you</p>
            </Card>
          </div>
        </div>

        {/* See Other Options */}
        <Button
          variant="outline"
          className="w-full mt-6 h-12 font-semibold"
          onClick={() => navigate("/route-options")}
        >
          See all route options
        </Button>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <Button onClick={handleConfirm} className="w-full h-14 text-lg font-bold">
          Confirm Multimodal Journey
        </Button>
      </div>
    </div>
  );
};

export default MultimodalDetail;
