import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, urlConstants } from "../constants/url.constants";

const initialState = {
  productsList: [],
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

export const editProductAsync = createAsyncThunk(
  "products/edit",
  async (params) => {
    const url = baseUrl + urlConstants.products.edit + `/${params.id}`;
    const { data, status } = await axios.put(url, params.data, params.headers);

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
    setAllProducts: (state, action) => {
      state.productsList = action.payload.data.products;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductAsync.rejected)
      .addCase(getAllProductAsync.fulfilled, productsSlice.caseReducers.setAllProducts);

    builder
      .addCase(addProductAsync.rejected)
      .addCase(addProductAsync.fulfilled);

    builder
      .addCase(editProductAsync.rejected)
      .addCase(editProductAsync.fulfilled);

    builder
      .addCase(deleteProductAsync.rejected)
      .addCase(deleteProductAsync.fulfilled);
  },
});

export const products = (state) => state.products.productsList;

export default productsSlice.reducer;
