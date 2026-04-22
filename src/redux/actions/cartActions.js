import { INCREMENT, DECREMENT, RESET } from "../types/index.js";

// Thunk action with logic
export const addOneToCart = (product) => (dispatch, getState) => {
  const { order } = getState();
  if (order.order) dispatch({ type: "order/reset" });

  dispatch({
    type: INCREMENT,
    payload: { productId: product.id_class, price: product.price },
  });
};

export const decreaseOneFromCart = (product) => (dispatch, getState) => {
  const { order } = getState();
  if (order.order) dispatch({ type: "order/reset" });

  dispatch({
    type: DECREMENT,
    payload: product.id_class,
  });
};