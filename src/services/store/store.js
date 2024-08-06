import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "../slices/toggleSlice";
import coordinatesSlice from "../slices/coordinatesSlice";
import cartSlice from "../slices/cartSlice";
import filterSlice from "../slices/filterSlice";
import authSlice from "../slices/authSlice";

const store = configureStore({
  reducer: {
    toggleSlice: toggleSlice,
    coordinates: coordinatesSlice,
    cartSlice: cartSlice,
    filterSlice: filterSlice,
    authSlice: authSlice,
  },
});
export default store;
