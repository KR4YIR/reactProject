import { createSlice } from '@reduxjs/toolkit';

const featureSlice = createSlice({
  name: 'LFeature',
  initialState: {
    feature: null 
  },
  reducers: {
    setfeatureSlice(state, action) {
      state.setfeatureSlice = action.payload.setfeatureSlice;
    },
    clearfeatureSlice(state) {
      state.featureSlice = null;
    }
  },
});

export const { setfeatureSlice, clearfeatureSlice} = featureSlice.actions;
export default featureSlice.reducer;
