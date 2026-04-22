const initialState = {
  address: "",
  postalCode: "",
  city: "",
  country: "",
};

function shippingInfoReducer(state = initialState, action) {
  switch (action.type) {
    case "shipping/setShippingInfo":
      return {
        ...state,
        address: action.payload.address,
        postalCode: action.payload.postalCode,
        city: action.payload.city,
        country: action.payload.country,
      };

    default:
      return state;
  }
}

export const setShippingInfo = (data) => ({
  type: "shipping/setShippingInfo",
  payload: data,
});

export default shippingInfoReducer;
