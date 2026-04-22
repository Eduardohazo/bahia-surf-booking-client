import { SET_PAYMENT_METHOD } from "../types";

const initialState = {
  method: "", 
};

function paymentMethodReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PAYMENT_METHOD:
      return {
        ...state,
        method: action.payload,
      };

    default:
      return state;
  }
}

export default paymentMethodReducer;
