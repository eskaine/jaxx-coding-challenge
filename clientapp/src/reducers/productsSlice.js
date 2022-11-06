import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, urlConstants } from "../constants/url.constants";

const initialState = {
  productsList: [],
};

export const addProductAsync = createAsyncThunk(
  "products/add",
  async (params) => {
    const url = baseUrl + urlConstants.products.add;
    const response = await axios.post(url, params.data, params.headers);

    return response;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addProductAsync.rejected)
      .addCase(addProductAsync.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.productsList = action.payload.result;
        }
      });
  },
});

export const products = (state) => state.products.productsList;

export default productsSlice.reducer;
