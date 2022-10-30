import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../reducers/admin/adminReducer';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
});
