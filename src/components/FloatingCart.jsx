import { useSelector } from "react-redux";

export function FloatingCart() {
  const count = useSelector((state) =>
    state.cart.items.reduce((s, i) => s + i.qty, 0)
  );

  return (
    <div className="floating-cart">
      <i className="floating-cart__icon fa fa-shopping-cart" />
      <span className="floating-cart__count">{count}</span>
    </div>
  );
}
