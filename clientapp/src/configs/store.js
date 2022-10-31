import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../reducers/admin/adminSlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
});
