import { configureStore } from "@reduxjs/toolkit";
import { cartItemsReducer } from "./CartItems";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    cartItems: cartItemsReducer,
  },
}); 
setupListeners(store.dispatch);
