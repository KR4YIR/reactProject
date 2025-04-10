import { configureStore } from '@reduxjs/toolkit'
import objectReducer from './objectSlice'
import wktReducer from './wktSlice'
import featureReducer from './featureSlice'
import panelReducer from './panelSlice'
import editReducer from './editSlice'
import authReducer from './authSlice'
import userReducer from './userSlice'
import countReducer from './countSlice'
export const store = configureStore({
  reducer: {
    object: objectReducer,
    wkt: wktReducer,
    feature: featureReducer,
    panel: panelReducer,
    Edit: editReducer,
    auth: authReducer,
    user: userReducer,
    count: countReducer,
  },
})