import {
  useEffect,
} from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getOrder } from "../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import withStatusHandler from "../hocs/withStatusHandler.jsx";
import { RequestStatus } from "../enums/RequestStatus.js";

function ThankYouPage({order, status}) {

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

  // Unusual case where IDLE status implies showing loader
  if (status === RequestStatus.requestPhase.IDLE) {
    return (
      <div className="page-loader">
        <div className="page-state page-state--loading">
          <div className="page-state__content">
            <p className="page-state__message">Loading...</p>
          </div>
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
            className="thank-you__btn thank-you__btn--download liquid-glass"
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

const ThankYouPageWithStatus = withStatusHandler(ThankYouPage);

function ThankYouPageContainer() {
  const { order, status } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  // Use effect on container to prevent useEffects 
  // re executions everytime it mounts child component again
  useEffect(() => {
    const orderId = searchParams.get("orderId");
    if (!orderId) return;
    dispatch(getOrder(orderId));
  }, []);

  return <ThankYouPageWithStatus status={status} order={order} />;
}

export default ThankYouPageContainer;
