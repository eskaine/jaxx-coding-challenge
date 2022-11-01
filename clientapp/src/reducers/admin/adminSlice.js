import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  token: null
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
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLoginAsync.rejected)
      .addCase(adminLoginAsync.fulfilled, (state, action) => {
        if(action.payload.status === 200) {
          state.isAuthenticated = true;
          state.token = action.payload.token;
        }
      });
  },
});

export const { logout } = adminSlice.actions;

export const selectIsAuthenticated = (state) => state.admin.isAuthenticated;

export default adminSlice.reducer;
