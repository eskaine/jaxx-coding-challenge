import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { adminLogin } from './adminAPI';

const initialState = {
  isLogin: false,

};

export const adminLoginAsync = createAsyncThunk(
  'admin/adminLogin',
  async (params) => {
    const response = await adminLogin(params);
    return response.data;
  }
);

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logoff: (state) => {
      state.isLogin = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLoginAsync.fulfilled, (state, action) => {
        state.value = action.payload;
      });
  },
});

export const { login, logoff } = adminSlice.actions;
export const selectIsLogin = (state) => state.admin.isLogin;

export default adminSlice.reducer;
