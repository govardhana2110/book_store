import { createSlice } from "@reduxjs/toolkit";

export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState: { cartItems: [] },
  reducers: {
    setCartItems(state, action) {
      let data = [...state.cartItems];
      const obj = {
        title: action.payload?.title,
        rating: action.payload?.rating,
        price: action.payload?.price,
        author: action.payload?.author,
        image:action.payload?.image,
        ratings:action.payload?.ratings
      };
      data.push(obj);
      state.cartItems = data;
    },
  },
});
export const cartItemsReducer  = cartItemsSlice.reducer;
export const { setCartItems } = cartItemsSlice.actions;
