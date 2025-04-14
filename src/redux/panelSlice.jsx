// redux/panelSlice.js
import { createSlice } from '@reduxjs/toolkit';

const panelSlice = createSlice({
  name: 'panel',
  initialState: {
    isOpen: false,
    isEdit: false,
    isOpenU: false,
  },
  reducers: {
    openPanel: (state) => {
      state.isOpen = true;
    },
    openUPanel: (state) => {
      state.isOpenU = true;
    },
    closePanel: (state) => {
      state.isOpen = false;
    },
    closeUPanel: (state) => {
      state.isOpenU = false;
    },
    onEditPanel: (state) => {
      state.isEdit = true;
    },
    offEditPanel: (state) => {
      state.isEdit = false;
    },
  },
});

export const { openPanel, closePanel, onEditPanel, offEditPanel, closeUPanel, openUPanel } = panelSlice.actions;
export default panelSlice.reducer;
