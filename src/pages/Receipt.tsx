import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";

const Receipt = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetTrip } = useTrip();
  const totalCost = location.state?.totalCost || 95;
  const tripId = location.state?.tripId || 'TRP-001';

  const handleBackHome = () => {
    resetTrip();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="h-14 bg-card border-b border-border flex items-center px-4 sticky top-0 z-10">
        <h1 className="font-bold text-lg">Receipt</h1>
        <Button variant="ghost" size="icon" className="ml-auto" onClick={handleBackHome}>
          ✕
        </Button>
      </div>

      {/* Success Icon */}
      <div className="bg-accent text-accent-foreground py-8 text-center">
        <div className="text-6xl mb-4">✓</div>
        <h2 className="text-2xl font-bold">Payment Successful</h2>
      </div>

      {/* Trip Details */}
      <div className="flex-1 p-6">
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Trip ID:</span>
              <span className="text-sm font-semibold">{tripId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Date:</span>
              <span className="text-sm font-semibold">{new Date().toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">From:</span>
              <span className="text-sm font-semibold">Gurgaon Cyber Hub</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">To:</span>
              <span className="text-sm font-semibold">Connaught Place, Delhi</span>
            </div>
          </div>

          <div className="border-t border-border pt-4 space-y-3">
            <h3 className="font-bold mb-3">Trip Breakdown</h3>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-semibold">Uber Auto (Leg 1)</p>
                <p className="text-xs text-muted-foreground">Rajesh Kumar • 8 mins</p>
              </div>
              <span className="font-semibold">₹40</span>
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-semibold">Delhi Metro (Leg 2)</p>
                <p className="text-xs text-muted-foreground">Yellow Line • 12 mins</p>
              </div>
              <span className="font-semibold">₹30</span>
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-semibold">Uber Auto (Leg 3)</p>
                <p className="text-xs text-muted-foreground">Amit Sharma • 6 mins</p>
              </div>
              <span className="font-semibold">₹25</span>
            </div>
          </div>

          <div className="border-t border-border pt-4 mt-4">
            <div className="flex justify-between text-lg font-bold mb-2">
              <span>TOTAL PAID</span>
              <span>₹{totalCost}</span>
            </div>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-center">
              <p className="text-sm font-semibold text-accent">You Saved ₹45</p>
              <p className="text-xs text-muted-foreground mt-1">vs direct Uber ride</p>
            </div>
          </div>
        </div>

        <Button onClick={handleBackHome} className="w-full" size="lg">
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Receipt;
