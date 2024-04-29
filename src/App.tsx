import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, CartPage } from "./pages";
import { Navbar, Sidebar } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
