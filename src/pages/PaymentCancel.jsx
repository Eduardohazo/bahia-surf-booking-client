import { useNavigate, useSearchParams } from "react-router-dom";

export default function PaymentCancel() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get("orderId");

  return (
    <div>
      <h1>Payment Cancelled</h1>
      {orderId && <p>Your order ID: {orderId}</p>}
      <p>You cancelled the payment. You can try again.</p>
      <button onClick={() => navigate("/payment")}>Retry Payment</button>
      <button onClick={() => navigate("/cart")}>Back to Cart</button>
    </div>
  );
}