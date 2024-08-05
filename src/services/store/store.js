import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "../slices/toggleSlice";
import coordinatesSlice from "../slices/coordinatesSlice";
import cartSlice from "../slices/cartSlice";

const store = configureStore({
  reducer: {
    toggleSlice: toggleSlice,
    coordinates: coordinatesSlice,
    cartSlice: cartSlice,
  },
});
export default store;
