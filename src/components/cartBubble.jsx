import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CartBubble() {

  const { items } = useSelector((state) => state.cart);

  const totalItems = items.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  return (
    <Link to="/cart" className="cart-fab">
      <span className="cart-fab__icon">🛒</span>

      {totalItems > 0 && (
        <span className="cart-fab__badge">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
