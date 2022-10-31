import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLogin: false,
};

export const adminLoginAsync = createAsyncThunk(
  'admin/adminLogin',
  async (params) => {
    const url = process.env.REACT_APP_API_URL + '/admin/login';
    const response = await axios.post(url, params);

    return response;
  }
);

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(adminLoginAsync.rejected)
      .addCase(adminLoginAsync.fulfilled, (state, action) => {
        if(action.payload.status === 200) {
          state.isLogin = true;
        }
      });
  },
});

export const selectIsLogin = (state) => state.admin.isLogin;

export default adminSlice.reducer;
