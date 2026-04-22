import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPaypalOrder } from "../redux/actions";
import withStatusHandler from "../hocs/withStatusHandler";


function Payment({order}) {
  // We only need the order from the state now.
  const dispatch = useDispatch();

  const handlePay = async () => {
    dispatch(createPaypalOrder(order._id));
  };

  // TODO: Ad fallback cases
  return (
    <section className="order">
      <div className="order__container">
        <h1>Confirm & Pay</h1>

        <div className="order__section">
          <h3>Booking Details</h3>
          <p>
            <strong>Order ID:</strong> {order.id_order}
          </p>
          <p>
            <strong>Date:</strong> {order.reservationDate}
          </p>
          <p>
            <strong>Schedule:</strong> {order.schedule}
          </p>
        </div>

        <div className="order__section">
          <h3>Customer Information</h3>
          <p>
            <strong>Name:</strong> {order.name || "-----"}
          </p>
          <p>
            <strong>Email:</strong> {order.email || "-----"}
          </p>
          <p>
            <strong>Phone:</strong> {order.phone || "-----"}
          </p>
        </div>

        <div className="order__section">
          <h3>Items</h3>
          {/* We map directly from order.items. 
              Ensure your backend returns the price/name in this array. */}
          {order.items &&
            order.items.map((item, index) => (
              <div key={item.productId || index} className="order__item">
                <p>
                  {item.name || `Product ${item.productId}`} x 1
                  <span> — ${item.price.toFixed(2)}</span>
                </p>
              </div>
            ))}
        </div>

        <div className="order__footer">
          <h3>
            Total Amount: $
            {order.items
              ?.reduce((acc, item) => acc + item.price, 0)
              .toFixed(2) || "0.00"}
          </h3>
          <p>
            Status:{" "}
            <span style={{ color: "orange" }}>{order.status || "PENDING"}</span>
          </p>
          <button
            className="btn-pay"
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

    return (
      <PaymentWithStatus 
        status={status} order={order}
      />
    );
};

export default PaymenContainer;
