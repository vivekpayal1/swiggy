import { createSlice } from "@reduxjs/toolkit";

const coord = {
  lat: 28.5355161,
  lng: 77.3910265,
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
