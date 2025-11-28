import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";
import { ArrowLeft, Download, Briefcase, Mail, HelpCircle } from "lucide-react";

const Receipt = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetTrip, tripState } = useTrip();
  const totalCost = location.state?.totalCost || tripState.selectedRoute?.totalPrice || 95;
  const method = location.state?.method || 'gpay';

  const handleBackHome = () => {
    resetTrip();
    navigate('/');
  };

  const getMethodName = () => {
    switch (method) {
      case 'gpay': return 'Google Pay';
      case 'phonepe': return 'PhonePe';
      case 'amazonpay': return 'Amazon Pay';
      case 'paytm': return 'Paytm';
      default: return 'UPI';
    }
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

  const gstAmount = (totalCost * 0.18).toFixed(2);
  const savings = tripState.selectedRoute?.savings || 45;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-3 flex items-center gap-3 border-b border-border">
        <Button variant="ghost" size="icon" onClick={handleBackHome} className="h-8 w-8">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <span className="font-medium text-sm">Receipt</span>
      </div>

      {/* Blue Hero Section */}
      <div className="bg-blue-100 dark:bg-blue-950 px-4 py-5 relative overflow-hidden">
        <p className="text-xs text-muted-foreground">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
        <h1 className="text-xl font-bold mt-1">Thanks for<br/>riding!</h1>
        <div className="absolute right-4 bottom-0 text-5xl opacity-60">🚗</div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4">
        {/* Total */}
        <div className="flex justify-between items-center pb-2 mb-3 border-b-2 border-cyan-400">
          <span className="text-lg font-bold">Total</span>
          <span className="text-lg font-bold">₹{totalCost}</span>
        </div>

        {/* Pickup & Destination */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <span className="w-2 h-2 bg-foreground rounded-full" />
          <span className="truncate">{tripState.pickup?.name || 'Gurgaon Cyber Hub'}</span>
          <span>→</span>
          <span className="w-2 h-2 bg-foreground rounded-full" />
          <span className="truncate">{tripState.destination?.name || 'Connaught Place'}</span>
        </div>
        
        {/* Trip Charge with Leg Breakdown */}
        <div className="py-2 border-b border-border">
          <div className="flex justify-between mb-2 text-sm">
            <span>Trip Charge</span>
            <span>₹{totalCost}</span>
          </div>
          <div className="space-y-1.5 ml-2">
            {tripState.selectedRoute?.legs.map((leg, i) => (
              <div key={i} className="flex justify-between text-xs text-foreground/60">
                <span>{getModeIcon(leg.mode)} {leg.from} → {leg.to}</span>
                <span>{leg.mode === 'walk' ? `${leg.distance || 0}m` : `₹${leg.price || 0}`}</span>
              </div>
            )) || (
              <>
                <div className="flex justify-between text-xs text-foreground/60">
                  <span>🛺 Auto to Metro</span>
                  <span>₹40</span>
                </div>
                <div className="flex justify-between text-xs text-foreground/60">
                  <span>🚇 Metro</span>
                  <span>₹30</span>
                </div>
                <div className="flex justify-between text-xs text-foreground/60">
                  <span>🛺 Auto to Destination</span>
                  <span>₹25</span>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Subtotal */}
        <div className="py-2 border-b border-border flex justify-between text-sm">
          <span>Subtotal</span>
          <span>₹{totalCost}</span>
        </div>
        
        {/* Payments Section */}
        <div className="py-3">
          <h3 className="font-bold text-sm mb-2">Payments</h3>
          <div className="flex items-center gap-3">
            <span className="text-xl">💵</span>
            <div className="flex-1">
              <p className="font-medium text-sm">UPI - {getMethodName()}</p>
              <p className="text-xs text-foreground/60">{new Date().toLocaleString('en-IN')}</p>
            </div>
            <span className="font-medium text-sm">₹{totalCost}</span>
          </div>
          <p className="text-xs text-foreground/60 mt-2">
            GST of ₹{gstAmount} included
          </p>
        </div>
        
        {/* Savings Info */}
        <div className="bg-green-50 dark:bg-green-950 rounded-lg py-2 px-3 text-center text-xs text-green-700 dark:text-green-300 mb-4">
          You saved ₹{savings} vs direct Uber ride
        </div>
        
        {/* Action Links */}
        <div className="space-y-0">
          <button className="w-full py-3 flex items-center gap-3 border-b border-border text-sm">
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
          <button className="w-full py-3 flex items-center gap-3 border-b border-border text-sm">
            <Briefcase className="w-4 h-4" />
            <span>Automate business expensing</span>
          </button>
          <button className="w-full py-3 flex items-center gap-3 border-b border-border text-sm">
            <Mail className="w-4 h-4" />
            <span>Resend email</span>
          </button>
          <button className="w-full py-3 flex items-center gap-3 border-b border-border text-sm">
            <HelpCircle className="w-4 h-4" />
            <span>Review my fees and fares</span>
          </button>
        </div>
      </div>
      
      {/* Back to Home */}
      <div className="p-4 border-t border-border">
        <Button onClick={handleBackHome} className="w-full h-10 text-sm font-medium">
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Receipt;