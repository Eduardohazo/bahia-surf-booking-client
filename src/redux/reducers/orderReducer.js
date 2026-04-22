import { RequestStatus } from "../../enums/RequestStatus.js";
// Order reducer actions
import {
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_ERROR,
  ORDER_CREATE_SERVER_ERROR,
  ORDER_CREATE_LOADING,
  ORDER_CREATE_INPUT_VALIDATION_ERROR,
  ORDER_CREATE_VALIDATION_ERROR,
  ORDER_GET_SUCCESS,
  ORDER_GET_ERROR,
  ORDER_GET_NETWORK_ERROR,
  ORDER_GET_SERVER_ERROR,
  ORDER_GET_LOADING,
  ORDER_GET_INPUT_VALIDATION_ERROR,
  ORDER_GET_VALIDATION_ERROR,
  ORDER_GET_ORDER_NOT_FOUND,
  ORDER_PAYPAL_CREATE_LOADING,
  ORDER_CREATE_NETWORK_ERROR,
} from "../types/index.js";

const initialState = {
  order: null,
  status: RequestStatus.requestPhase.IDLE,
};

function orderReducer(state = initialState, action) {
  switch (action.type) {
    case ORDER_CREATE_LOADING:
      return {
        ...state,
        status: RequestStatus.requestPhase.LOADING,
      };

    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        status: RequestStatus.responsePhase.SUCCESS,
        order: action.payload,
      };

    case ORDER_CREATE_ERROR:
      return {
        ...state,
        status: RequestStatus.errorPhase.ERROR,
      };
    case ORDER_CREATE_NETWORK_ERROR:
      return {
        ...state,
        status: RequestStatus.errorPhase.NETWORK_ERROR,
      };
    case ORDER_CREATE_SERVER_ERROR:
      return {
        ...state,
        status: RequestStatus.responsePhase.SERVER_ERROR,
      };

    case ORDER_CREATE_INPUT_VALIDATION_ERROR:
      console.log("changing state on reducer to INPUT VALIDATION ERROR");
      return {
        ...state,
        status: RequestStatus.responsePhase.INPUT_VALIDATION_ERROR,
      };

    case ORDER_CREATE_VALIDATION_ERROR:
      console.log("changing state on reducer to VALIDATION ERROR");
      return {
        ...state,
        status: RequestStatus.responsePhase.VALIDATION_ERROR,
      };

    case ORDER_GET_SUCCESS:
      return {
        ...state,
        status: RequestStatus.responsePhase.SUCCESS,
        order: action.payload,
      };

    case ORDER_GET_LOADING:
      return {
        ...state,
        status: RequestStatus.requestPhase.LOADING,
      };

    case ORDER_GET_ERROR:
      return {
        ...state,
        status: RequestStatus.errorPhase.ERROR,
      };
    case ORDER_GET_NETWORK_ERROR:
      return {
        ...state,
        status: RequestStatus.errorPhase.NETWORK_ERROR,
      };

    case ORDER_GET_SERVER_ERROR:
      return {
        ...state,
        status: RequestStatus.errorPhase.ERROR,
      };

    case ORDER_GET_INPUT_VALIDATION_ERROR:
      console.log("changing state on reducer to INPUT VALIDATION ERROR");
      return {
        ...state,
        status: RequestStatus.responsePhase.INPUT_VALIDATION_ERROR,
      };

    case ORDER_GET_VALIDATION_ERROR:
      console.log("changing state on reducer to VALIDATION ERROR");
      return {
        ...state,
        status: RequestStatus.responsePhase.VALIDATION_ERROR,
      };

    case ORDER_GET_ORDER_NOT_FOUND:
      console.log("changing state on reducer to VALIDATION ERROR");
      return {
        ...state,
        status: RequestStatus.responsePhase.ORDER_NOT_FOUND,
      };

    case ORDER_PAYPAL_CREATE_LOADING:
      return {
        ...state,
        status: RequestStatus.requestPhase.LOADING,
      };

    case "order/reset":
      return initialState;

    default:
      return state;
  }
}

export default orderReducer;
