import { SET_DATE } from "../types";

const initialState = {
  reservationDate: "",
  error: null,
};

function dateReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATE:
      return {
        ...state,
        reservationDate: action.payload.reservationDate,
      };

    default:
      return state;
  }
}

export default dateReducer;
