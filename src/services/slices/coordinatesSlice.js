import { createSlice } from "@reduxjs/toolkit";

const coord = {
  lat: 28.7040592,
  lng: 77.10249019999999,
};

const coordinatesSlice = createSlice({
  name: "coordinates",
  initialState: coord,
  reducers: {
    setCoords: (state, action) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
});
export const { setCoords } = coordinatesSlice.actions;
export default coordinatesSlice.reducer;
