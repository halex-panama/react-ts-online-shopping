import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiUrl";
import { STATUS } from "../utils/status";
import { ProductsArr } from "./productsSlice";

export type CategoriesType = string[];

export type initialTypeState = {
  categories: CategoriesType;
  categoriesStatus: string;
  categoryProducts: ProductsArr;
  categoryProductsStatus: string;
};

const initialState: initialTypeState = {
  categories: [],
  categoriesStatus: STATUS.IDLE,
  categoryProducts: {} as ProductsArr,
  categoryProductsStatus: STATUS.IDLE,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncCategories.pending, (state) => {
      state.categoriesStatus = STATUS.LOADING;
    });
    builder.addCase(fetchAsyncCategories.fulfilled, (state, action) => {
      state.categoriesStatus = STATUS.SUCCEEDED;
      state.categories = action.payload;
    });
    builder.addCase(fetchAsyncCategories.rejected, (state) => {
      state.categoriesStatus = STATUS.FAILED;
    });

    // get products by their categories
    builder.addCase(fetchAsyncProductsCategories.pending, (state) => {
      state.categoryProductsStatus = STATUS.LOADING;
    });
    builder.addCase(fetchAsyncProductsCategories.fulfilled, (state, action) => {
      state.categoryProductsStatus = STATUS.SUCCEEDED;
      state.categoryProducts = action.payload;
    });
    builder.addCase(fetchAsyncProductsCategories.rejected, (state) => {
      state.categoryProductsStatus = STATUS.FAILED;
    });
  },
});

export const fetchAsyncCategories = createAsyncThunk(
  "categories/fetch",
  async () => {
    const response = await fetch(`${BASE_URL}products/category-list`);
    const data = await response.json();
    return data;
  }
);

export const fetchAsyncProductsCategories = createAsyncThunk(
  "categories-products/fetch",
  async (category: string) => {
    const response = await fetch(`${BASE_URL}products/category/${category}`);
    const data = await response.json();
    return data;
  }
);

export default categorySlice.reducer;
