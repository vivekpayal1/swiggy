import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState: {
    searchToggle: false,
    loginToggle: false,
  },
  reducers: {
    toggleSearch: (state) => {
      state.searchToggle = !state.searchToggle;
    },
    toggleLogin: (state) => {
      state.loginToggle = !state.loginToggle;
    },
  },
});
export const { toggleSearch, toggleLogin } = toggleSlice.actions;
export default toggleSlice.reducer;
