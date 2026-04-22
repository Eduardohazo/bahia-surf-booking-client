import { INCREMENT, DECREMENT, RESET } from "../types/index.js";

const initialState = { items: [] };

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT: {
      const product = action.payload;
      const existingItem = state.items.find(
        (i) => i.productId === product.productId,
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((i) =>
            // User can only add one to cart
            i.productId === product.productId && (i.qty < 1) ? { ...i, qty: i.qty + 1 } : i,
          ),
        };
      }
      return { ...state, items: [...state.items, { ...product, qty: 1 }] };
    }

    case DECREMENT: {
      const productId = action.payload;
      const existingItem = state.items.find((i) => i.productId === productId);
      if (!existingItem) return state;
      if (existingItem.qty === 1) {
        return {
          ...state,
          items: state.items.filter((i) => i.productId !== productId),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === productId ? { ...i, qty: i.qty - 1 } : i,
        ),
      };
    }

    case RESET:
      return { ...initialState, items: [] }; // ensures a fresh object

    default:
      return state;
  }
}
