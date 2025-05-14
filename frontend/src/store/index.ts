import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './slice/globalSlice';
import collabReducer from './slice/collabSlice'

const store = configureStore({
  reducer: {
    global: globalReducer,
    collab : collabReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
