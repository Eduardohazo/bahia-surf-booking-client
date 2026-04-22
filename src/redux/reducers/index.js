import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import productsReducer from "./productsReducer";
import contactInfoReducer from "./contactInfoReducer";
import dateReducer from "./dateReducer";
import scheduleReducer from "./scheduleReducer";
import paymentMethodReducer from "./paymentMethodReducer";
import orderReducer from "./orderReducer";
// import selectedProductIdReducer from "./selectedProductIdReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  contactInfo: contactInfoReducer,
  schedule: scheduleReducer,
  date: dateReducer,
  paymentMethod: paymentMethodReducer,
  order: orderReducer
});

export default rootReducer;
