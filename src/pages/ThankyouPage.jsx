import {
  useEffect,
  // useState,
  useCallback,
} from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getOrder } from "../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { RequestStatus } from "../enums/RequestStatus.js";

export default function ThankYouPage() {
  const { order, status } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  // We wrap the fetch in useCallback to prevent it from changing on every render
  const fetchOrder = useCallback(async (orderId) => {
    try {
      // Execute the thunk
      await dispatch(getOrder(orderId));
    } catch (err) {
      console.error("Order fetch failed:", err);
    } finally {
      // setLoading(false);
    }
  }, []);

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    if (orderId) fetchOrder(orderId);
  }, [searchParams, fetchOrder]);

  const handleDownloadReceipt = () => {
    if (!order) return;

    const itemsText = order.items
      ?.map((item) => `- ${item.productId} x 1: $${item.price.toFixed(2)}`)
      .join("\n");

    const text = `
    ===========================================
          BAHÍA SURF CLASSES OFFICIAL RECEIPT
    ===========================================
    Order ID: ${order.id_order}
    Status:   ${order.status.toUpperCase()}
    Date:     ${new Date().toLocaleDateString()}
    -------------------------------------------
    Customer: ${order.name}
    Date:  ${order.reservationDate}, ${order.schedule}
    -------------------------------------------
    Items:
    ${itemsText}
    -------------------------------------------
    TOTAL:    $${order.items[0]?.price} USD
    ===========================================`;

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Receipt_${order.id_order}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (
    status === RequestStatus.requestPhase.LOADING ||
    status === RequestStatus.requestPhase.IDLE
  ) {
    return (
      <div className="page-loader">
        <div className="page-state page-state--loading">
          <div className="page-state__content">
            <p className="page-state__message">Loading paid order...</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === RequestStatus.errorPhase.ERROR) {
    return (
      <div className="page-state page-state--error">
        <div className="page-state__content">
          <h2 className="page-state__title">Something went wrong</h2>
          <p className="page-state__message">We couldn't get the order.</p>
          <button
            className="page-state__button"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (status === RequestStatus.errorPhase.NETWORK_ERROR) {
    return (
      <div className="page-state page-state--error">
        <div className="page-state__content">
          <h2 className="page-state__title">Network error</h2>
          <p className="page-state__message">We couldn't get the order.</p>
          <button
            className="page-state__button"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (status === RequestStatus.responsePhase.INPUT_VALIDATION_ERROR) {
    return (
      <div className="page-state page-state--error">
        <div className="page-state__content">
          <h2 className="page-state__title">Something went wrong!</h2>
          <p className="page-state__message">Bad data sent.</p>
          <button
            className="page-state__button"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (status === RequestStatus.responsePhase.VALIDATION_ERROR) {
    return (
      <div className="page-state page-state--error">
        <div className="page-state__content">
          <h2 className="page-state__title">Something went wrong!</h2>
          <p className="page-state__message">Bad data sent.</p>
          <button
            className="page-state__button"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (status === RequestStatus.responsePhase.ORDER_NOT_FOUND) {
    return (
      <div className="page-state page-state--error">
        <div className="page-state__content">
          <h2 className="page-state__title">Error 404</h2>
          <p className="page-state__message">Order not found.</p>
          <button
            className="page-state__button"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // TODO: Ad fallback cases
  return (
    <div className="thank-you">
      <div className="thank-you__card">
        <header className="thank-you__header">
          <h1 className="thank-you__title">Thank You, {order.name}!</h1>
          <p className="thank-you__subtitle">
            Your payment was processed successfully.
          </p>
        </header>

        <section className="thank-you__receipt">
          <div className="thank-you__order-info">
            <p className="thank-you__text">
              <strong>Order ID:</strong> {order.id_order}
            </p>
            <p className="thank-you__text">
              <strong>Status:</strong>{" "}
              <span
                className={`thank-you__status thank-you__status--${order.status?.toLowerCase()}`}
              >
                {order.status}
              </span>
            </p>
          </div>

          <ul className="thank-you__items">
            {order.items?.map((item, index) => (
              <li key={index} className="thank-you__item">
                <span className="thank-you__item-name">
                  id product: {item.productId}
                </span>
                <span className="thank-you__item-name"> x 1</span>
                <span className="thank-you__item-price">
                  ${item.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="thank-you__total">
            <span>Total Paid</span>
            <span>
              $
              {order.items
                ?.reduce((acc, item) => acc + item.price, 0)
                .toFixed(2)}
            </span>
          </div>
        </section>

        <footer className="thank-you__actions">
          <button
            onClick={handleDownloadReceipt}
            className="thank-you__btn thank-you__btn--download"
          >
            Download Receipt (.txt)
          </button>
          <Link to="/" className="thank-you__link">
            Back to Home
          </Link>
        </footer>
      </div>
    </div>
  );
}
