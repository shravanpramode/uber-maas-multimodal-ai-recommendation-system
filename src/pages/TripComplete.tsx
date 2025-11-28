import { useNavigate } from "react-router-dom";
import { Star, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";
import { useState } from "react";

const TripComplete = () => {
  const navigate = useNavigate();
  const { tripState } = useTrip();
  const [rating, setRating] = useState(0);
  const [showLegRatings, setShowLegRatings] = useState(false);
  const [legRatings, setLegRatings] = useState<Record<number, number>>({});
  const [showUpiPopup, setShowUpiPopup] = useState(false);

  const totalCost = tripState.selectedRoute?.totalPrice || 95;

  const handleContinueToPayment = () => {
    navigate('/payment-selection', { 
      state: { 
        totalCost,
        tripId: tripState.tripId 
      } 
    });
  };

  const handleRating = (star: number) => {
    setRating(star);
    setShowLegRatings(true);
  };

  const handleLegRating = (legIndex: number, star: number) => {
    setLegRatings(prev => ({ ...prev, [legIndex]: star }));
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'auto': return '🛺';
      case 'bike': return '🏍️';
      case 'uber-go': return '🚗';
      case 'go-sedan': return '🚙';
      case 'uber-xl': return '🚐';
      case 'metro': return '🚇';
      case 'bus': return '🚌';
      case 'suburban-train': return '🚆';
      case 'walk': return '🚶';
      default: return '🚗';
    }
  };

  const getModeName = (mode: string) => {
    switch (mode) {
      case 'auto': return 'Auto';
      case 'bike': return 'Bike';
      case 'uber-go': return 'Uber Go';
      case 'go-sedan': return 'Go Sedan';
      case 'uber-xl': return 'Uber XL';
      case 'metro': return 'Metro';
      case 'bus': return 'Bus';
      case 'suburban-train': return 'Train';
      case 'walk': return 'Walk';
      default: return mode;
    }
  };

  const rideLegs = tripState.selectedRoute?.legs.filter(leg => 
    ['auto', 'bike', 'uber-go', 'go-sedan', 'uber-xl'].includes(leg.mode)
  ) || [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Compact Header */}
      <div className="flex flex-col items-center pt-4 pb-3 px-4">
        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-2">
          <span className="text-2xl">✓</span>
        </div>
        <h1 className="text-lg font-bold">Trip Complete!</h1>
        <p className="text-xs text-muted-foreground">Hope you enjoyed your journey</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto px-4 pb-24">
        {/* Trip Summary Card */}
        <div className="border border-border rounded-xl p-3 mb-3">
          <div className="flex justify-between items-center pb-2 border-b border-border mb-2">
            <span className="text-sm text-muted-foreground">Total Fare</span>
            <span className="text-xl font-bold">₹{totalCost}</span>
          </div>
          
          {/* Leg Breakdown */}
          <div className="space-y-2">
            {tripState.selectedRoute?.legs.map((leg, i) => (
              <div key={i} className="flex justify-between items-start text-xs">
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span>{getModeIcon(leg.mode)}</span>
                    <span className="font-medium">{getModeName(leg.mode)}</span>
                    <span className="text-foreground/60">• {leg.duration} min</span>
                  </div>
                  <p className="text-xs text-foreground/60 ml-5">{leg.from} → {leg.to}</p>
                </div>
                <span className="font-medium">
                  {leg.mode === 'walk' ? `${leg.distance || 0}m` : `₹${leg.price || 0}`}
                </span>
              </div>
            ))}
          </div>

          {tripState.selectedRoute?.savings && (
            <div className="mt-2 pt-2 border-t border-border flex justify-between text-xs text-green-600">
              <span className="font-medium">You saved</span>
              <span className="font-bold">₹{tripState.selectedRoute.savings}</span>
            </div>
          )}
        </div>

        {/* Rate Experience Card */}
        <div className="border border-border rounded-xl p-3 mb-3">
          <h2 className="text-sm font-bold mb-2">Rate your experience</h2>
          
          <div className="flex justify-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-7 h-7 ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
          
          {rating > 0 && (
            <p className="text-center text-xs text-foreground/60 mb-2">
              {rating === 5 && "Excellent! We're glad you had a great trip!"}
              {rating === 4 && "Great! Thanks for your feedback!"}
              {rating === 3 && "Good! We'll keep improving!"}
              {rating < 3 && "We're sorry. We'll do better!"}
            </p>
          )}

          {/* Expandable Leg-wise Rating */}
          {rating > 0 && rideLegs.length > 0 && (
            <div className="border-t border-border pt-2">
              <button 
                onClick={() => setShowLegRatings(!showLegRatings)}
                className="flex items-center justify-between w-full text-xs"
              >
                <span className="text-foreground/60">Rate individual rides</span>
                {showLegRatings ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              {showLegRatings && (
                <div className="mt-2 space-y-2">
                  {rideLegs.map((leg, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-xs">
                        {getModeIcon(leg.mode)} {getModeName(leg.mode)}
                      </span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(s => (
                          <button key={s} onClick={() => handleLegRating(i, s)}>
                            <Star 
                              className={`w-4 h-4 ${
                                s <= (legRatings[i] || 0) 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-muted-foreground'
                              }`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* UPI Payment Card */}
        <button 
          onClick={() => setShowUpiPopup(true)}
          className="w-full border border-border rounded-xl p-3 mb-3 flex items-center"
        >
          <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
            <span className="text-green-600 dark:text-green-400 font-bold text-sm">₹</span>
          </div>
          <span className="flex-1 text-left text-sm">UPI</span>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Eco Impact */}
        {tripState.selectedRoute?.carbonSaved && (
          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl p-2 flex items-center gap-2">
            <span className="text-xl">🌱</span>
            <div>
              <p className="font-medium text-xs text-green-700 dark:text-green-300">Eco-Friendly!</p>
              <p className="text-xs text-foreground/60">
                Saved {tripState.selectedRoute.carbonSaved}kg CO₂
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
        <Button onClick={handleContinueToPayment} className="w-full h-11 text-sm font-bold">
          Continue to payment
        </Button>
      </div>

      {/* UPI Popup */}
      {showUpiPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end z-50" onClick={() => setShowUpiPopup(false)}>
          <div className="bg-card/95 backdrop-blur-xl w-full rounded-t-3xl p-4" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />
            <p className="text-center text-sm mb-4">
              All your multimodal journey payments, unified seamlessly through UPI
            </p>
            <Button onClick={() => setShowUpiPopup(false)} className="w-full">
              Got it
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripComplete;