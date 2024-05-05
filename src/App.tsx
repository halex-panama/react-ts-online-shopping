import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, CartPage, Category } from "./pages";
import { Navbar, Sidebar } from "./components";

import { Provider } from "react-redux";
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/category" element={<Category />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
