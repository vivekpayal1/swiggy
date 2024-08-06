import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartData")) || [],
    resInfo: JSON.parse(localStorage.getItem("resInfo")) || [],
  },
  reducers: {
    setCartItem: (state, action) => {
      const { cartPageData, resInfo } = action.payload;
      state.cartItems = [...state.cartItems, cartPageData];
      state.resInfo = resInfo
      localStorage.setItem("cartData", JSON.stringify(state.cartItems));
      localStorage.setItem("resInfo", JSON.stringify(resInfo));
    },
    removeCartItem: (state, action) => {
      state.clearCartItem = action.payload;
      localStorage.setItem("cartData", JSON.stringify(action.payload));
    },
    clearCartItem: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartData");
      localStorage.removeItem("resInfo");
      state.resInfo = []
    },
  },
});
export const { setCartItem, removeCartItem, clearCartItem } = cartSlice.actions;
export default cartSlice.reducer;
