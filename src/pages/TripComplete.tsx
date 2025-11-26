import { useNavigate } from "react-router-dom";
import { Star, Home, Receipt, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTrip } from "@/contexts/TripContext";
import { useState } from "react";

const TripComplete = () => {
  const navigate = useNavigate();
  const { tripState, completeTrip } = useTrip();
  const [rating, setRating] = useState(0);

  const handlePayment = () => {
    completeTrip();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Success Animation */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-success/20 flex items-center justify-center mb-4">
            <div className="text-5xl">✅</div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Trip Complete!</h1>
          <p className="text-muted-foreground">Hope you enjoyed your journey</p>
        </div>

        {/* Trip Summary */}
        <Card className="p-6 mb-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <span className="text-muted-foreground">Total Fare</span>
              <span className="text-3xl font-bold">₹{tripState.selectedRoute?.totalPrice}</span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base Fare</span>
                <span className="font-semibold">₹120.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Metro Ticket</span>
                <span className="font-semibold">₹28.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Leg</span>
                <span className="font-semibold">₹76.30</span>
              </div>
              {tripState.selectedRoute?.savings && (
                <div className="flex justify-between text-success">
                  <span className="font-semibold">Savings</span>
                  <span className="font-semibold">-₹{tripState.selectedRoute.savings}</span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Rate Your Experience */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">Rate your experience</h2>
          
          <div className="flex justify-center gap-4 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-10 h-10 ${
                    star <= rating
                      ? "fill-accent text-accent"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
          
          {rating > 0 && (
            <p className="text-center text-sm text-muted-foreground">
              {rating === 5 && "Excellent! We're glad you had a great trip!"}
              {rating === 4 && "Great! Thanks for your feedback!"}
              {rating === 3 && "Good! We'll keep improving!"}
              {rating < 3 && "We're sorry. We'll do better next time!"}
            </p>
          )}
        </Card>

        {/* Payment Method */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold">Payment Method</span>
            <Button variant="ghost" size="sm">Change</Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
              <span className="text-2xl">💳</span>
            </div>
            <div>
              <p className="font-semibold">UPI Scan and Pay</p>
              <p className="text-sm text-muted-foreground">{tripState.paymentMethod}</p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button onClick={handlePayment} className="w-full h-14 text-lg font-bold">
            Pay ₹{tripState.selectedRoute?.totalPrice}
          </Button>
          
          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="flex-col h-auto py-4 gap-2">
              <Receipt className="w-5 h-5" />
              <span className="text-xs">Receipt</span>
            </Button>
            <Button variant="outline" className="flex-col h-auto py-4 gap-2">
              <HelpCircle className="w-5 h-5" />
              <span className="text-xs">Help</span>
            </Button>
            <Button
              variant="outline"
              className="flex-col h-auto py-4 gap-2"
              onClick={() => navigate("/")}
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </Button>
          </div>
        </div>

        {/* Eco Impact */}
        {tripState.selectedRoute?.carbonSaved && (
          <Card className="mt-6 p-4 bg-success/10 border-success">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🌱</div>
              <div>
                <p className="font-semibold text-success">Eco-Friendly Choice!</p>
                <p className="text-sm text-muted-foreground">
                  You saved {tripState.selectedRoute.carbonSaved}kg CO₂ by choosing multimodal
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TripComplete;
