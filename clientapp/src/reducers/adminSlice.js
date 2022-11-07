import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, urlConstants } from "../constants/url.constants";

const initialState = {
  isAuthenticated: false,
  token: null,
};

export const adminLoginAsync = createAsyncThunk(
  "admin/adminLogin",
  async (params) => {
    const url = baseUrl + urlConstants.admin.login;
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
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
    login:(state, payload) => {
      state.isAuthenticated = true;
      state.token = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLoginAsync.rejected)
      .addCase(adminLoginAsync.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          adminSlice.caseReducers.login(state, action.payload.data);
        }
      });
  },
});

export const { logout } = adminSlice.actions;

export const isAuthenticated = (state) => state.admin.isAuthenticated;
export const token = (state) => state.admin.token;

export default adminSlice.reducer;
