import { configureStore } from '@reduxjs/toolkit';
 import itemsReducer from './itemSlice';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});
