import { createSlice } from '@reduxjs/toolkit';

const featureSlice = createSlice({
  name: 'feature',
  initialState: {
    feature: null, // Başlangıçta seçili feature yok
  },
  reducers: {
    setFeature(state, action) { // setfeatureSlice yerine daha anlaşılır bir isim
      state.feature = action.payload; // Gelen veriyi feature değişkenine ata
    },
    clearFeature(state) { // clearfeatureSlice yerine daha doğru isim
      state.feature = null; // Seçili nesneyi temizle
    }

  },
});

export const { setFeature, clearFeature } = featureSlice.actions;
export default featureSlice.reducer;
