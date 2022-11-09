import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, urlConstants } from "../constants/url.constants";

const initialState = {
  isAuthenticated: false,
  token: null,
};

export const adminLoginAsync = createAsyncThunk(
  "admin/login",
  async (params) => {
    const url = baseUrl + urlConstants.admin.login;
    const { data, status } = await axios.post(url, params);

    return {
      data,
      status
    };
  }
);

export const adminRegisterAsync = createAsyncThunk(
  "admin/register",
  async (params) => {
    const url = baseUrl + urlConstants.admin.register;
    const { data, status } = await axios.post(url, params);

    return {
      data,
      status
    };
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.setItem("token", null);
    },
    login:(state, action) => {
      const token = localStorage.getItem('token');

      if(token !== 'null') {
        state.token = token;
        state.isAuthenticated = true;
      } else if(action.payload) {
        state.token = action.payload.data;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.data);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLoginAsync.rejected)
      .addCase(adminLoginAsync.fulfilled, adminSlice.caseReducers.login);

    builder
      .addCase(adminRegisterAsync.rejected)
      .addCase(adminRegisterAsync.fulfilled, adminSlice.caseReducers.login);
  },
});

export const { login, logout } = adminSlice.actions;

export const isAuthenticated = (state) => state.admin.isAuthenticated;
export const token = (state) => state.admin.token;

export default adminSlice.reducer;
