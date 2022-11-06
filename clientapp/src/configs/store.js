import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../reducers/adminSlice';
import productsSlice from '../reducers/productsSlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    products: productsSlice
  },
});
