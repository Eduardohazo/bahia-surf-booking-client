import { SET_SCHEDULE } from "../types";

const initialState = {
  schedule: "",
};

function scheduleReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SCHEDULE:
      return {
        ...state,
        schedule: action.payload.schedule,
      };

    default:
      return state;
  }
}

export default scheduleReducer;
