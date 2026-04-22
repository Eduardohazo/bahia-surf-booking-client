import {
  ALL_PRODUCTS_LOAD_START,
  ALL_PRODUCTS_SET_STATE,
} from "../types/index.js";
import { RequestStatus } from "../../enums/RequestStatus.js";
import { getProductsFromServer } from "../../services/api.service.js";
import { ProductModel } from "../../models/ProductModel.js";

export const loadProducts = () => {
  return async (dispatch) => {
    dispatch({ type: ALL_PRODUCTS_LOAD_START });

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
      const response = await getProductsFromServer(ProductModel, timeoutSignal);

      const products = response.data;

      // Use enum cases here
      switch (response.status) {
        case RequestStatus.responsePhase.EMPTY:
          return dispatch({
            type: ALL_PRODUCTS_SET_STATE,
            payload: {
              all: [],
              status: RequestStatus.responsePhase.EMPTY,
              error: null,
            },
          });

        case RequestStatus.responsePhase.SUCCESS:
          return dispatch({
            type: ALL_PRODUCTS_SET_STATE,
            payload: {
              all: products,
              status: RequestStatus.responsePhase.SUCCESS,
              error: null,
            },
          });

        default:
          return dispatch({
            type: ALL_PRODUCTS_SET_STATE,
            payload: {
              all: [],
              status: RequestStatus.errorPhase.ERROR,
              error: "Unknown status",
            },
          });
      }
    } catch (error) {
      switch (error.status) {
        case RequestStatus.responsePhase.INTERNAL_SERVER_ERROR:
          return dispatch({
            type: ALL_PRODUCTS_SET_STATE,
            payload: {
              all: [],
              status: RequestStatus.responsePhase.INTERNAL_SERVER_ERROR,
              error: error.message,
            },
          });

        case RequestStatus.responsePhase.SERVER_ERROR:
          return dispatch({
            type: ALL_PRODUCTS_SET_STATE,
            payload: {
              all: [],
              status: RequestStatus.responsePhase.SERVER_ERROR,
              error: error.message,
            },
          });

        case RequestStatus.responsePhase.EMPTY:
          return dispatch({
            type: ALL_PRODUCTS_SET_STATE,
            payload: {
              all: [],
              status: RequestStatus.responsePhase.EMPTY,
              error: null,
            },
          });

        case RequestStatus.errorPhase.NETWORK_ERROR:
          return dispatch({
            type: ALL_PRODUCTS_SET_STATE,
            payload: {
              all: [],
              status: RequestStatus.errorPhase.NETWORK_ERROR,
              error: null,
            },
          });

        default:
          return dispatch({
            type: ALL_PRODUCTS_SET_STATE,
            payload: {
              all: [],
              status: RequestStatus.errorPhase.ERROR,
              error: error.message,
            },
          });
      }
    } finally {
      clearTimeout(timeoutId); // Limpiar el timeout
    }
  };
};