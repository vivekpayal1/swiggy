import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    userData: JSON.parse(localStorage.getItem("userData")),
  },
  reducers: {
    addUserData: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    removeUserData: (state) => {
      localStorage.removeItem("userData");
      state.userData = null;
    },
  },
});
export const { addUserData, removeUserData } = authSlice.actions;
export default authSlice.reducer;
