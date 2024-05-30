import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiUrl";
import { STATUS } from "../utils/status";

export type ReviewsProducts = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

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
  tags: string[];
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ReviewsProducts[];
  returnPolicy: string;
  minimumOrderQuantity: string;
};

export type ProductsArr = {
  limit: number;
  products: Products[];
  skip: number;
  total: number;
};

export type initialTypeState = {
  allProducts: ProductsArr;
  allProductsStatus: string;
  productSingle: Products;
  productSingleStatus: string;
};

const initialState: initialTypeState = {
  allProducts: {} as ProductsArr,
  allProductsStatus: STATUS.IDLE,
  productSingle: {} as Products,
  productSingleStatus: STATUS.IDLE,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAsyncProducts.pending, (state) => {
      state.allProductsStatus = STATUS.LOADING;
    });
    builder.addCase(fetchAsyncProducts.fulfilled, (state, action) => {
      state.allProductsStatus = STATUS.SUCCEEDED;
      state.allProducts = action.payload;
    });
    builder.addCase(fetchAsyncProducts.rejected, (state) => {
      state.allProductsStatus = STATUS.FAILED;
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
