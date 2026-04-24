import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPaypalOrder } from "../redux/actions";
import withStatusHandler from "../hocs/withStatusHandler";

function Payment({ order }) {
  // We only need the order from the state now.
  const dispatch = useDispatch();

  const handlePay = async () => {
    dispatch(createPaypalOrder(order._id));
  };

  // TODO: Ad fallback cases
  return (
    <section className="summary">
      {/* Overlay */}
      <div className="hero__overlay"></div>

      <div className="summary__container">
        <header className="summary__header">
          <h1 className="summary__title">Booking Details</h1>

          <div className="summary__subtitle-container">
            <p className="summary__subtitle">One last check before done!</p>
          </div>
        </header>

        <div className="summary__section">
          <h3>General Information</h3>

          <p className="summary__p">
            <strong>Order ID: </strong>{order.id_order}
          </p>
          <p className="summary__p">
            <strong>Date: </strong>{order.reservationDate}
          </p>
          <p className="summary__p">
            <strong>Schedule: </strong>{order.schedule}
          </p>
        </div>

        <div className="summary__section">
          <h3>Customer Information</h3>
          <p className="summary__p">
            <strong>Name: </strong> {order.name || "-----"}
          </p>
          <p className="summary__p">
            <strong>Email: </strong> {order.email || "-----"}
          </p>
          <p className="summary__p">
            <strong>Phone: </strong> {order.phone || "-----"}
          </p>
        </div>

        <div className="summary__section">
          <h3>Items</h3>
          {/* We map directly from order.items. 
              Ensure your backend returns the price/name in this array. */}
          {order.items &&
            order.items.map((item, index) => (
              <div key={item.productId || index} className="order__item">
                <p className="summary__p">
                  {item.name || `Product ${item.productId}`} x 1
                  <span> — ${item.price.toFixed(2)}</span>
                </p>
              </div>
            ))}
        </div>

        <div className="summary__section">
          <h3>
            Total Amount: $
            {order.items
              ?.reduce((acc, item) => acc + item.price, 0)
              .toFixed(2) || "0.00"}
          </h3>

          <p className="summary__p">
            Status: <span style={{ color: "orange" }}>{order.status || "PENDING"}</span>
          </p>

          <button
            className="summary__button liquid-glass"
            onClick={handlePay}
            disabled={order.status === "PAID"}
          >
            Pay with PayPal
          </button>
        </div>
      </div>
    </section>
  );
}

const PaymentWithStatus = withStatusHandler(Payment);

function PaymenContainer() {
  const { order, status } = useSelector((state) => state.order);

  return <PaymentWithStatus status={status} order={order} />;
}

export default PaymenContainer;
