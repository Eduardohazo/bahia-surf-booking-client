import { CLEAR_CONTACT_INFO, SET_CONTACT_INFO } from "../types";

const initialState = {
  name: "",
  phone: "",
  email: "",
};

function contactInfoReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONTACT_INFO:
      return {
        ...state,
        name: action.payload.name,
        phone: action.payload.phone,
        email: action.payload.email,
      };

    case CLEAR_CONTACT_INFO:
      return {
        ...state,
        name: "",
        phone: "",
        email: "",
      };

    default:
      return state;
  }
}

export default contactInfoReducer;
