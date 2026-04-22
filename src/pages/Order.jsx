import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../redux/actions/index.js";
import { useNavigate } from "react-router-dom";
import { useMemo, useEffect } from "react";
import withStatusHandler from "../hocs/withStatusHandler";


const Order = ({ order, status, cart, contact, date, schedule, paymentMethod, all }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const safeCart = useMemo(() => (Array.isArray(cart) ? cart : []), [cart]);
  const safeProducts = useMemo(() => (Array.isArray(all) ? all : []), [all]);

  const grandTotal = useMemo(() => {
    return safeCart.reduce((sum, item) => {
      const product = safeProducts.find((p) => p?.id_class === item?.productId);
      return product ? sum + (product.price ?? 0) * (item.qty ?? 0) : sum;
    }, 0);
  }, [safeCart, safeProducts]);

  useEffect(() => {
    if (order?.status === "PENDING") navigate("/payment");
  }, [order, navigate]);

  return (
    <section className="order">
      <div className="order__container">
        <h1>Review Your Order</h1>
        <h3>Name</h3><p>{contact?.name || "-----"}</p>
        <h3>Email</h3><p>{contact?.email || "-----"}</p>
        <h3>Phone</h3><p>{contact?.phone || "-----"}</p>
        <h3>Date</h3><p>{date?.reservationDate || "-----"}</p>
        <h3>City</h3><p>{schedule?.schedule || "-----"}</p>
        <h3>Payment Method</h3><p>{paymentMethod?.method || "No payment method selected"}</p>
        
        <h3>Items</h3>
        {safeCart.map((item) => {
          const product = safeProducts.find((p) => p?.id_class === item?.productId);
          if (!product) return null;
          return <div key={product.id_class}>{product.title} x {item.qty} = ${(product.price ?? 0) * item.qty}</div>;
        })}

        <h2>Total: ${grandTotal}</h2>
        {!order && (
          <button onClick={() => dispatch(createOrder())} disabled={status === "LOADING"}>
            {status === "LOADING" ? "Creating Order..." : "Create Order"}
          </button>
        )}
      </div>
    </section>
  );
};

const OrderWithStatus = withStatusHandler(Order);

function OrderContainer() {
  const { order, status } = useSelector((state) => state.order);
  const cart = useSelector((state) => state.cart.items);
  const contact = useSelector((state) => state.contactInfo);
  const date = useSelector((state) => state.date);
  const schedule = useSelector((state) => state.schedule);
  const paymentMethod = useSelector((state) => state.paymentMethod);
  const { all } = useSelector((state) => state.products);

  return (
    <OrderWithStatus 
      status={status} order={order} cart={cart} contact={contact} 
      date={date} schedule={schedule} paymentMethod={paymentMethod} all={all} 
    />
  );
}

export default OrderContainer;