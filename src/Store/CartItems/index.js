import { createSlice } from "@reduxjs/toolkit";

export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState: { cartItems: [] },
  reducers: {
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },
  },
});
export const cartItemsReducer = cartItemsSlice.reducer;
export const { setCartItems } = cartItemsSlice.actions;
