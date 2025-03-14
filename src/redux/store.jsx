import { configureStore } from '@reduxjs/toolkit'
import objectReducer from './objectSlice'
import wktReducer from './wktSlice'
import LFeatureReducer from './featureSlice'
export const store = configureStore({
  reducer: {
    object: objectReducer,
    wkt: wktReducer,
    LFeature: LFeatureReducer
  },
})