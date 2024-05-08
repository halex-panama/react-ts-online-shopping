import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";
import { ProductsArr } from "./productsSlice";
import { BASE_URL } from "../utils/apiUrl";

export type initialTypeState = {
  searchProducts: ProductsArr;
  searchProductsStatus: string;
};

const initialState: initialTypeState = {
  searchProducts: {} as ProductsArr,
  searchProductsStatus: STATUS.IDLE,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchProducts = {} as ProductsArr;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchSearchProducts.pending, (state) => {
      state.searchProductsStatus = STATUS.LOADING;
    });
    builder.addCase(fetchSearchProducts.fulfilled, (state, action) => {
      state.searchProductsStatus = STATUS.SUCCEEDED;
      state.searchProducts = action.payload;
    });
    builder.addCase(fetchSearchProducts.rejected, (state) => {
      state.searchProductsStatus = STATUS.FAILED;
    });
  },
});

export const fetchSearchProducts = createAsyncThunk(
  "search/fetch",
  async (searhTerm: string) => {
    const response = await fetch(`${BASE_URL}products/search?q=${searhTerm}`);
    const data = await response.json();
    return data;
  }
);

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
