import { RequestStatus } from "../../enums/RequestStatus.js";
import {
  ALL_PRODUCTS_LOAD_START,
  ALL_PRODUCTS_SET_STATE,
} from "../types/index.js";

const initialState = {
  all: [],
  status: RequestStatus.requestPhase.IDLE
};

/* =========================
   REDUCER / State (buisness) logic/rules
========================= */
function productsReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_PRODUCTS_LOAD_START:
      return {
        ...state,
        status: RequestStatus.requestPhase.LOADING,
      };

    case ALL_PRODUCTS_SET_STATE: {
      // Valdidating payload and state integrity
      if (!action.payload) {
        return {
          ...state,
          status: RequestStatus.responsePhase.ERROR,
        };
      }

      return {
        ...state,
        all: action.payload.all,
        status: action.payload.status,
      };
    }

    default:
      return state;
  }
}

export default productsReducer;
