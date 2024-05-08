import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import categoryReducer from "./categorySlice";
import productsReducer from "./productsSlice";
import searchReducer from "./searchSlice";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    category: categoryReducer,
    products: productsReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
