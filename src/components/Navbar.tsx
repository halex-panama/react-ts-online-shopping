import { Link } from "react-router-dom";
import { setSidebarOn } from "../store/sidebarSlice";
import { useAppHooks } from "../store/hooks";
import { useEffect, useState } from "react";
import { getCartTotal } from "../store/cartSlice";

const Navbar = () => {
  const { dispatch, categoryState, cartState } = useAppHooks();
  const { categories } = categoryState;
  const { itemsCount, carts } = cartState;

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getCartTotal());
  }, [carts]);

  return (
    <nav className="navbar px-5 py-3 bg-primary text-white">
      <div className="navbar-container flex items-center sm:mx-10">
        {/* left side */}
        <div className="brand-and-button text-2xl flex items-center gap-3">
          <button
            onClick={() => dispatch(setSidebarOn())}
            type="button"
            className="sidebar-show-btn text-white"
          >
            <i className="fas fa-bars"></i>
          </button>
          <Link to="/" className="navbar-brand flex items-center">
            <span className="navbar-brand-icon">
              <i className="fa-solid fa-bag-shopping"></i>
            </span>
            <span className="navbar-brand-txt mx-2 hidden md:flex">Shopi</span>
          </Link>
        </div>

        {/* midlle side */}
        <div className="navbar-collapse w-full">
          <div className="navbar-search py-1 px-2 ml-6 rounded-sm shadow-sm bg-white">
            <div className="flex items-center">
              <input
                type="text"
                className="form-control text-sm w-full px-1 py-2 text-black font-Manrope placeholder:text-sm focus:outline-transparent"
                placeholder="Search products"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Link
                to={`/search/${searchTerm}`}
                className="text-white search-btn flex items-center justify-center bg-primary w-14 h-8"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </Link>
            </div>
          </div>

          <ul className="navbar-nav hidden font-Manrope items-center text-xs ml-6 mt-2 gap-4 lg:flex">
            {categories &&
              categories.length > 0 &&
              categories.slice(0, 8).map((cat) => (
                <li className="capitalize" key={cat}>
                  <Link to={`/category/${cat}`}>{cat}</Link>
                </li>
              ))}
          </ul>
        </div>

        {/* right side */}
        <div className="navbar-cart flex items-center ml-8 h-8 rounded-full text-2xl">
          <Link to="/cart" className="cart-btn relative">
            <i className="fa-solid fa-cart-shopping"></i>
            <div className="cart-items-value absolute text-sm text-primary bg-white w-5 h-5 rounded-full flex items-center justify-center font-medium top-[-4px] right-[-10px]">
              {itemsCount}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
