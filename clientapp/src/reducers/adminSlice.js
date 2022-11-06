import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl, urlConstants } from '../constants/url.constants';

const initialState = {
  isAuthenticated: false,
  token: null
};

export const adminLoginAsync = createAsyncThunk(
  'admin/adminLogin',
  async (params) => {
    const url = baseUrl + urlConstants.admin.login;
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
          console.log({payload: action.payload})
          state.isAuthenticated = true;
          state.token = action.payload.data.token;
        }
      });
  },
});

export const { logout } = adminSlice.actions;

export const isAuthenticated = (state) => state.admin.isAuthenticated;
export const token = (state) => state.admin.token;

export default adminSlice.reducer;
