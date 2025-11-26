import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const PaymentFlow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [stage, setStage] = useState('opening');
  const totalCost = location.state?.totalCost || 95;

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('pin'), 1000);
    return () => clearTimeout(timer1);
  }, []);

  useEffect(() => {
    if (stage === 'pin') {
      const timer2 = setTimeout(() => setStage('success'), 2000);
      return () => clearTimeout(timer2);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 'success') {
      const timer3 = setTimeout(() => {
        navigate('/receipt', { state: { totalCost, tripId: location.state?.tripId } });
      }, 2000);
      return () => clearTimeout(timer3);
    }
  }, [stage, navigate, totalCost, location.state]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {stage === 'opening' && (
          <div className="text-center">
            <div className="text-4xl mb-4">💳</div>
            <div className="text-xl font-semibold mb-2">Opening Google Pay...</div>
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        )}

        {stage === 'pin' && (
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <div className="text-2xl font-bold mb-4">Enter UPI PIN</div>
            <div className="text-lg mb-6">Pay ₹{totalCost}</div>
            <div className="flex gap-3 justify-center">
              {[0, 1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-3 h-3 rounded-full bg-primary"></div>
              ))}
            </div>
          </div>
        )}

        {stage === 'success' && (
          <div className="bg-accent text-accent-foreground rounded-xl p-8 text-center">
            <div className="text-6xl mb-4">✓</div>
            <div className="text-2xl font-bold mb-2">Success!</div>
            <div className="text-lg">₹{totalCost} paid</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentFlow;
