import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiUrl";
import { STATUS } from "../utils/status";

export type CategoriesType = string[];

export type initialTypeState = {
  categories: CategoriesType;
  categoriesStatus: string;
};

const initialState: initialTypeState = {
  categories: [],
  categoriesStatus: STATUS.IDLE,
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
  },
});

export const fetchAsyncCategories = createAsyncThunk(
  "categories/fetch",
  async () => {
    const response = await fetch(`${BASE_URL}products/categories`);
    const data = await response.json();
    return data;
  }
);

export default categorySlice.reducer;
