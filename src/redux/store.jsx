import { configureStore } from '@reduxjs/toolkit'
import objectReducer from './objectSlice'
import wktReducer from './wktSlice'
import featureReducer from './featureSlice'
import panelReducer from './panelSlice'
export const store = configureStore({
  reducer: {
    object: objectReducer,
    wkt: wktReducer,
    feature: featureReducer,
    panel: panelReducer
  },
})