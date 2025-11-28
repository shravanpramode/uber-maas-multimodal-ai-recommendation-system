import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const PaymentFlow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [stage, setStage] = useState('opening');
  const totalCost = location.state?.totalCost || 95;
  const method = location.state?.method || 'gpay';
  const tripId = location.state?.tripId;

  const getMethodName = () => {
    switch (method) {
      case 'gpay': return 'Google Pay';
      case 'phonepe': return 'PhonePe';
      case 'amazonpay': return 'Amazon Pay';
      case 'paytm': return 'Paytm';
      default: return 'UPI App';
    }
  };

  const getMethodIcon = () => {
    switch (method) {
      case 'gpay': return '🔵';
      case 'phonepe': return '🟣';
      case 'amazonpay': return '🟡';
      case 'paytm': return '🔵';
      default: return '💳';
    }
  };

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
        navigate('/receipt', { state: { totalCost, tripId, method } });
      }, 2000);
      return () => clearTimeout(timer3);
    }
  }, [stage, navigate, totalCost, tripId, method]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {stage === 'opening' && (
          <div className="text-center">
            <div className="text-5xl mb-4">{getMethodIcon()}</div>
            <div className="text-lg font-semibold mb-2">Opening {getMethodName()}...</div>
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        )}

        {stage === 'pin' && (
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="text-xl font-bold mb-3">Enter UPI PIN</div>
            <div className="text-base mb-4">Pay ₹{totalCost}</div>
            <div className="flex gap-2 justify-center">
              {[0, 1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-2.5 h-2.5 rounded-full bg-primary"></div>
              ))}
            </div>
          </div>
        )}

        {stage === 'success' && (
          <div className="bg-green-100 dark:bg-green-900 rounded-xl p-6 text-center">
            <div className="text-5xl mb-3">✓</div>
            <div className="text-xl font-bold mb-1 text-green-700 dark:text-green-300">Success!</div>
            <div className="text-base text-green-600 dark:text-green-400">₹{totalCost} paid via {getMethodName()}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentFlow;