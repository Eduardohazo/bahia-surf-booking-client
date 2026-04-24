import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { decreaseOneFromCart } from "../redux/actions/index.js";

export default function Cart() {
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.cart);
  const { all } = useSelector((state) => state.products);

  /* ======================
     SAFE DATA
  ====================== */

  const safeItems = Array.isArray(items) ? items : [];
  const safeProducts = Array.isArray(all) ? all : [];

  const validCartItems = safeItems.filter(Boolean);

  /* ======================
     TOTAL CALCULATION
  ====================== */

  const total = validCartItems.reduce((sum, item) => {
    const product = safeProducts.find((p) => p?.id_class === item?.productId);

    if (!product) return sum;

    return sum + (product?.price ?? 0) * (item?.qty ?? 0);
  }, 0);

  /* ======================
     EMPTY CART UI
  ====================== */

  if (validCartItems.length === 0) {
    return (
      <section className="cart">
        <div className="cart__container">
          <header className="cart__header">
            <h1 className="cart__title">YOUR CART</h1>

            {/* TODO> Add person icon */}
            <div className="cart__subtitle-container">
              <p className="cart__subtitle">Cart is empty</p>
            </div>
          </header>
        </div>
      </section>
    );
  }

  /* ======================
     RENDER CART
  ====================== */

  return (
    <section className="cart">
      {/* Overlay */}
      <div className="hero__overlay"></div>

      <div className="cart__container">
        <header className="cart__header">
          <h1 className="cart__title">SERVICE SELECTED</h1>

          {/* TODO> Add person icon */}
          <div className="cart__subtitle-container">
            <p className="cart__subtitle">Check your service</p>
          </div>
        </header>

        <div className="cart__list">
          {validCartItems.map((item) => {
            const product = safeProducts.find(
              (p) => p?.id_class === item?.productId,
            );

            if (!product) return null;

            return (
              <div className="cart-item" key={item.productId}>
                <div className="cart-item__details">
                  <p className="cart-item__title">
                    {product?.title || "Unknown product"}
                  </p>

                  <p className="cart-item__price">${product?.price ?? 0}</p>

                  <div className="cart-item__qty">
                    <button
                      className="cart-item__qty-button"
                      onClick={() => dispatch(decreaseOneFromCart(product))}
                    >
                      −
                    </button>

                    <span className="cart-item__qty-value">
                      {item?.qty ?? 0}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cart__summary">
          <p className="cart__summary-label">Total:</p>
          <p className="cart__summary-total">${total.toFixed(2)}</p>
        </div>

        <div className="form__button-container">
          <Link to="/contact-info" className="cart__checkout-button liquid-glass">
            Checkout
          </Link>
        </div>
      </div>
    </section>
  );
}
