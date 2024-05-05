import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiUrl";
import { STATUS } from "../utils/status";

export type Products = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export type ProductsArr = {
  limit: number;
  products: Products[];
  skip: number;
  total: number;
};

export type initialTypeState = {
  products: ProductsArr;
  productStatus: string;
  productSingle: Products;
  productSingleStatus: string;
};

const initialState: initialTypeState = {
  products: {} as ProductsArr,
  productStatus: STATUS.IDLE,
  productSingle: {} as Products,
  productSingleStatus: STATUS.IDLE,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAsyncProducts.pending, (state) => {
      state.productStatus = STATUS.LOADING;
    });
    builder.addCase(fetchAsyncProducts.fulfilled, (state, action) => {
      state.productStatus = STATUS.SUCCEEDED;
      state.products = action.payload;
    });
    builder.addCase(fetchAsyncProducts.rejected, (state) => {
      state.productStatus = STATUS.FAILED;
    });

    //single products
    builder.addCase(fetchAsyncSingleProducts.pending, (state) => {
      state.productSingleStatus = STATUS.LOADING;
    });
    builder.addCase(fetchAsyncSingleProducts.fulfilled, (state, action) => {
      state.productSingleStatus = STATUS.SUCCEEDED;
      state.productSingle = action.payload;
    });
    builder.addCase(fetchAsyncSingleProducts.rejected, (state) => {
      state.productSingleStatus = STATUS.FAILED;
    });
  },
});

export const fetchAsyncProducts = createAsyncThunk(
  "products/fetch",
  async (limit: number) => {
    const response = await fetch(`${BASE_URL}products?limit=${limit}`);
    const data = await response.json();
    return data;
  }
);

export const fetchAsyncSingleProducts = createAsyncThunk(
  "product-single/fetch",
  async (id: number) => {
    const response = await fetch(`${BASE_URL}products/${id}`);
    const data = await response.json();
    return data;
  }
);

export default productsSlice.reducer;
