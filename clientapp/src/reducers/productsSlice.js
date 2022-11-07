import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, urlConstants } from "../constants/url.constants";

const initialState = {
  products: [],
};

export const getAllProductAsync = createAsyncThunk(
  "products",
  async (headers) => {
    const url = baseUrl + urlConstants.products.all;
    const { data, status } = await axios.get(url, headers);

    return {
      data,
      status,
    };
  }
);

export const addProductAsync = createAsyncThunk(
  "products/add",
  async (params) => {
    const url = baseUrl + urlConstants.products.add;
    const { data, status } = await axios.post(url, params.data, params.headers);

    return {
      data,
      status,
    };
  }
);

export const deleteProductAsync = createAsyncThunk(
  "products/delete",
  async (params) => {
    const url = baseUrl + urlConstants.products.delete + `/${params.id}`;
    const { status } = await axios.delete(url, params.headers);

    return { status };
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setAllProducts: (state, payload) => {
      state.products = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductAsync.rejected)
      .addCase(getAllProductAsync.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          productsSlice.caseReducers.setAllProducts(
            state,
            action.payload.data.products
          );
        }
      });

    builder
      .addCase(addProductAsync.rejected)
      .addCase(addProductAsync.fulfilled);

    builder
      .addCase(deleteProductAsync.rejected)
      .addCase(deleteProductAsync.fulfilled);
  },
});

export const products = (state) => state.products.products;

export default productsSlice.reducer;
