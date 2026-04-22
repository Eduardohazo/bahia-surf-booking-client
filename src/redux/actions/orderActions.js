import {
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_ERROR,
  ORDER_CREATE_SERVER_ERROR,
  ORDER_CREATE_LOADING,
  ORDER_CREATE_INPUT_VALIDATION_ERROR,
  ORDER_CREATE_VALIDATION_ERROR,
  ORDER_GET_SUCCESS,
  ORDER_GET_ERROR,
  ORDER_CREATE_NETWORK_ERROR,
  ORDER_GET_NETWORK_ERROR,
  ORDER_GET_SERVER_ERROR,
  ORDER_GET_LOADING,
  ORDER_GET_INPUT_VALIDATION_ERROR,
  ORDER_GET_VALIDATION_ERROR,
  ORDER_GET_ORDER_NOT_FOUND,
  ORDER_PAYPAL_CREATE_LOADING,
} from "../types/index.js";
import { RequestStatus } from "../../enums/RequestStatus.js";
import {
  createPaypalOrderAPI,
  getOrderFromServer,
  createOrder as createOrderApi,
} from "../../services/api.service.js";
import { OrderModel } from "../../models/OrderModel.js";

// Order actions

export const createOrder = () => {
  return async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_LOADING });

    // const timeoutSignal = AbortSignal.timeout(5000);
    // Crea un AbortController local si no te pasan uno
    const localController = new AbortController();
    const timeoutSignal = localController.signal;

    // Timeout para abortar la petición si tarda más de 5s
    const timeoutId = setTimeout(() => {
      // En lugar de un string, manda un objeto Error de tipo Abort
      const abortError = new Error("Too slow dude!");
      abortError.name = "AbortError";
      localController.abort(abortError);
    }, 10000);

    try {
      const state = getState();

      const contact = state.contactInfo;
      const date = state.date;
      const schedule = state.schedule;
      const paymentMethod = state.paymentMethod;
      const cart = state.cart.items;

      console.log("before!", date, schedule);

      const response = await createOrderApi(
        contact,
        date,
        schedule,
        paymentMethod,
        cart,
        OrderModel,
        timeoutSignal,
      );

      // SUCCESS *
      // SERVER_ERROR *
      // VALIDATION_ERROR
      // INTERNAL_SERVER_ERROR
      // INPUT_VALIDATION_ERROR

      switch (response.status) {
        case RequestStatus.responsePhase.SUCCESS:
          return dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: response.data,
          });
      }
      console.log("Unhandled success case on creating order!");
    } catch (error) {
      switch (error.status) {
        case RequestStatus.responsePhase.SERVER_ERROR:
          return dispatch({
            type: ORDER_CREATE_SERVER_ERROR,
            payload: error.data,
          });
        case RequestStatus.errorPhase.ERROR:
          return dispatch({
            type: ORDER_CREATE_ERROR,
            payload: error.data,
          });
        case RequestStatus.errorPhase.NETWORK_ERROR:
          return dispatch({
            type: ORDER_CREATE_NETWORK_ERROR,
            payload: error.data,
          });
        case RequestStatus.responsePhase.INPUT_VALIDATION_ERROR:
          return dispatch({
            type: ORDER_CREATE_INPUT_VALIDATION_ERROR,
            payload: error.data,
          });
        case RequestStatus.responsePhase.VALIDATION_ERROR:
          return dispatch({
            type: ORDER_CREATE_VALIDATION_ERROR,
            payload: error.data,
          });
        default:
          dispatch({
            type: ORDER_CREATE_ERROR,
            payload: error.message,
          });
      }
    } finally {
      clearTimeout(timeoutId);
    }
  };
};

export const getOrder = (id) => {
  return async (dispatch) => {
    dispatch({ type: ORDER_GET_LOADING });
    // const timeoutSignal = AbortSignal.timeout(5000);
    // Crea un AbortController local si no te pasan uno
    const localController = new AbortController();
    const timeoutSignal = localController.signal;

    // Timeout para abortar la petición si tarda más de 5s
    const timeoutId = setTimeout(() => {
      // En lugar de un string, manda un objeto Error de tipo Abort
      const abortError = new Error("Too slow dude!");
      abortError.name = "AbortError";
      localController.abort(abortError);
    }, 5000);
    try {
      const response = await getOrderFromServer(id, OrderModel, timeoutSignal);

      switch (response.status) {
        case RequestStatus.responsePhase.SUCCESS:
          return dispatch({
            type: ORDER_GET_SUCCESS,
            payload: response.data,
          });
      }
    } catch (error) {
      console.log("STATUS------", error.status);
      switch (error.status) {
        case RequestStatus.errorPhase.ERROR:
          return dispatch({
            type: ORDER_GET_ERROR,
            payload: error.data,
          });
        case RequestStatus.errorPhase.NETWORK_ERROR:
          return dispatch({
            type: ORDER_GET_NETWORK_ERROR,
            payload: error.data,
          });
        case RequestStatus.responsePhase.SERVER_ERROR:
          return dispatch({
            type: ORDER_GET_SERVER_ERROR,
            payload: error.data,
          });
        case RequestStatus.responsePhase.INPUT_VALIDATION_ERROR:
          return dispatch({
            type: ORDER_GET_INPUT_VALIDATION_ERROR,
            payload: error.data,
          });
        case RequestStatus.responsePhase.VALIDATION_ERROR:
          return dispatch({
            type: ORDER_GET_VALIDATION_ERROR,
            payload: error.data,
          });
        case RequestStatus.responsePhase.ORDER_NOT_FOUND:
          return dispatch({
            type: ORDER_GET_ORDER_NOT_FOUND,
            payload: error.data,
          });
        default:
          dispatch({
            type: ORDER_GET_ERROR,
            payload: error.message,
          });
      }
    } finally {
      clearTimeout(timeoutId);
    }
  };
};

// Paypal actions

export const createPaypalOrder = (id) => {
  return async (dispatch) => {
    dispatch({ type: ORDER_PAYPAL_CREATE_LOADING });

    // const timeoutSignal = AbortSignal.timeout(5000);
    // Crea un AbortController local si no te pasan uno
    const localController = new AbortController();
    const timeoutSignal = localController.signal;

    // Timeout para abortar la petición si tarda más de 5s
    const timeoutId = setTimeout(() => {
      // En lugar de un string, manda un objeto Error de tipo Abort
      const abortError = new Error("Too slow dude!");
      abortError.name = "AbortError";
      localController.abort(abortError);
    }, 5000);

    try {
      const response = await createPaypalOrderAPI(id, timeoutSignal);

      // SUCCESS *
      // SERVER_ERROR *
      // VALIDATION_ERROR
      // INTERNAL_SERVER_ERROR
      // INPUT_VALIDATION_ERROR

      switch (response.status) {
        case RequestStatus.responsePhase.SUCCESS:
          // Only if success clear persistence state before pay
          localStorage.clear();
          window.location.href = response.data?.approvalUrl;
      }
      console.log("Unhandled success case on creating order!");
    } catch (error) {
      console.log(error);
      switch (error.status) {
        case RequestStatus.responsePhase.SERVER_ERROR:
          return dispatch({
            type: ORDER_CREATE_SERVER_ERROR,
            payload: error.data,
          });
        case RequestStatus.errorPhase.ERROR:
          return dispatch({
            type: ORDER_CREATE_ERROR,
            payload: error.data,
          });
        case RequestStatus.responsePhase.INPUT_VALIDATION_ERROR:
          return dispatch({
            type: ORDER_CREATE_INPUT_VALIDATION_ERROR,
            payload: error.data,
          });
        case RequestStatus.responsePhase.VALIDATION_ERROR:
          return dispatch({
            type: ORDER_CREATE_VALIDATION_ERROR,
            payload: error.data,
          });
        default:
          dispatch({
            type: ORDER_CREATE_ERROR,
            payload: error.message,
          });
      }
    } finally {
      clearTimeout(timeoutId);
    }
  };
};
