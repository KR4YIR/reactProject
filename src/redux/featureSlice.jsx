import { createSlice } from '@reduxjs/toolkit';

const featureSlice = createSlice({
  name: 'feature',
  initialState: {
    feature: null, // Başlangıçta seçili feature yok
    isEditOn: false
  },
  reducers: {
    setFeature(state, action) { // setfeatureSlice yerine daha anlaşılır bir isim
      state.feature = action.payload; // Gelen veriyi feature değişkenine ata
    },
    clearFeature(state) { // clearfeatureSlice yerine daha doğru isim
      state.feature = null; // Seçili nesneyi temizle
    },
    setEditOn(state){
      state.isEditOn = true;
    },
    setEditOff(state){
      state.isEditOn = false;
    }

  },
});

export const { setFeature, clearFeature } = featureSlice.actions;
export default featureSlice.reducer;
