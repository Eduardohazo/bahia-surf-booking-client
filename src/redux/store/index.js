import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers";

// Function to load state
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('persistentState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const store = configureStore({
  reducer: rootReducer,
  // devTools: true, // explicitly enable
  preloadedState: loadFromLocalStorage() 
});

// Save to localStorage on every change
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('persistentState', JSON.stringify(state));
});

// STATE
console.log("REDUX GLOBAL STATE 👉 ", store.getState());

export default store;
