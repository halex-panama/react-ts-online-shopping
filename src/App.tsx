import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  HomePage,
  CartPage,
  CategoryPage,
  ProductsPage,
  SearchPage,
} from "./pages";
import { Footer, Navbar, Sidebar } from "./components";

import { Provider } from "react-redux";
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app m-0 p-0 flex flex-col min-h-screen">
          <Navbar />
          <Sidebar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/products/:productId" element={<ProductsPage />} />
            <Route path="/search/:searchTerm" element={<SearchPage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
