import { ArrowLeft, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PaymentSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalCost = location.state?.totalCost || 95;
  const tripId = location.state?.tripId;

  const upiMethods = [
    { id: 'gpay', name: 'Google Pay', icon: '🔵', color: 'bg-blue-100 dark:bg-blue-900' },
    { id: 'phonepe', name: 'PhonePe', icon: '🟣', color: 'bg-purple-100 dark:bg-purple-900' },
    { id: 'amazonpay', name: 'Amazon Pay UPI', icon: '🟡', color: 'bg-yellow-100 dark:bg-yellow-900' },
    { id: 'paytm', name: 'Paytm', icon: '🔵', color: 'bg-sky-100 dark:bg-sky-900' },
  ];

  const handleSelectMethod = (methodId: string) => {
    navigate('/payment', { 
      state: { 
        method: methodId, 
        totalCost,
        tripId 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-9 w-9">
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>
      
      {/* Title */}
      <div className="px-4 pb-6">
        <h1 className="text-2xl font-bold mb-2">Select a UPI app</h1>
        <p className="text-sm text-muted-foreground">
          You will be redirected to the selected UPI app to complete the payment of ₹{totalCost}
        </p>
      </div>
      
      {/* UPI Methods List */}
      <div className="px-4">
        {upiMethods.map(method => (
          <button
            key={method.id}
            onClick={() => handleSelectMethod(method.id)}
            className="w-full flex items-center py-4 border-b border-border hover:bg-secondary/50 transition-colors"
          >
            <div className={`w-10 h-10 rounded-lg ${method.color} flex items-center justify-center mr-4`}>
              <span className="text-xl">{method.icon}</span>
            </div>
            <span className="flex-1 text-left font-medium">{method.name}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Footer Note */}
      <div className="px-4 py-6">
        <p className="text-xs text-muted-foreground text-center">
          Your payment is secured with end-to-end encryption
        </p>
      </div>
    </div>
  );
};

export default PaymentSelection;