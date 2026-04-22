// pages/PaymentSuccess.jsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Processing your payment...");
  const navigate = useNavigate();

  useEffect(() => {
    const capturePayment = async () => {
      const paypalOrderId = searchParams.get("token"); 
      const mongoOrderId = searchParams.get("orderId");
      const customOrderId = searchParams.get("customOrderId");

      if (!paypalOrderId || !mongoOrderId) {
        setStatus("Error: Missing payment information.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post("http://localhost:3000/api/payments/capture-order", {
          paypalOrderId,
          mongoOrderId,
        });

        if (response.data.message) {
          setStatus("Payment Successful! Your order is now confirmed.");
          setTimeout(() => navigate(`/thankYou?orderId=${mongoOrderId}&customOrderId=${customOrderId}`), 3000);
        }
      } catch (error) {
        console.error("Capture failed:", error);
        setStatus("There was an error processing your payment. Please contact support.");
      } finally {
        setLoading(false);
      }
    };

    capturePayment();
  }, [searchParams, navigate]);

  return (
    <div className="payment-status">
      <div className="payment-status__container">
        <h2 className={`payment-status__title ${!loading ? 'payment-status__title--finished' : ''}`}>
          {status}
        </h2>
        
        {loading && (
          <div className="payment-status__loader">
            <div className="payment-status__spinner"></div>
            <p className="payment-status__text">Updating your order...</p>
          </div>
        )}

        {!loading && status.includes("Successful") && (
          <div className="payment-status__icon payment-status__icon--success">✓</div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;