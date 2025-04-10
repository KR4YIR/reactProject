import { createSlice } from "@reduxjs/toolkit";
const countSlice = createSlice({
    name: 'count',
    initialState: {
      sum: 0,
      point: 0,
      line: 0,
      polygon: 0,
    },
    reducers: {
      setSum: (state, action) => {
        state.sum = action.payload; // sum değerini günceller
      },
      setPoint: (state, action) => {
        state.point = action.payload; // point değerini günceller
      },
      setLine: (state, action) => {
        state.line = action.payload; // line değerini günceller
      },
      setPolygon: (state, action) => {
        state.polygon = action.payload; // polygon değerini günceller
      },
    },
  });
  
  export const { setSum, setPoint, setLine, setPolygon } = countSlice.actions;
  export default countSlice.reducer;