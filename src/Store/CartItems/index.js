import { createSlice } from "@reduxjs/toolkit";

export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState: { cartItems: [] },
  reducers: {
    setCartItems(state, action) {
      let data = [...state.cartItems];
      const obj = {
        title: action.payload?.data?.title,
        rating: action.payload?.data?.rating,
        price: action.payload?.data?.price,
        author: action.payload?.data?.author,
      };
      data.push(obj);
      state.cartItems = data;
    },
  },
});
export const cartItemsReducer  = cartItemsSlice.reducer;
export const { setCartItems } = cartItemsSlice.actions;
