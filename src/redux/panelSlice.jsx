// redux/panelSlice.js
import { createSlice } from '@reduxjs/toolkit';

const panelSlice = createSlice({
  name: 'panel',
  initialState: {
    isOpen: false,
  },
  reducers: {
    openPanel: (state) => {
      state.isOpen = true;
    },
    closePanel: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openPanel, closePanel } = panelSlice.actions;
export default panelSlice.reducer;
