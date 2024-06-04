import { useEffect } from "react";
import { Link } from "react-router-dom";
import { setSidebarOff } from "../store/sidebarSlice";
import { fetchAsyncCategories } from "../store/categorySlice";
import { useAppHooks } from "../store/hooks";

const Sidebar = () => {
  const { dispatch, categoryState, sidebarState } = useAppHooks();

  const getSidebarStatus = sidebarState.isSideBarOn;
  const categories = categoryState.categories;

  useEffect(() => {
    dispatch(fetchAsyncCategories());
  }, [dispatch]);

  return (
    <aside
      className={`fixed top-0 left-0 w-[300px] h-full bg-white p-8 z-10 ${
        getSidebarStatus ? "translate-x-0" : "translate-x-[-100%]"
      } transition-all`}
    >
      <button
        className="absolute right-8"
        onClick={() => dispatch(setSidebarOff())}
      >
        <i className="fas fa-times"></i>
      </button>

      <div className="sidebar-container">
        <div className="pb-4 font-semibold uppercase text-lg">
          All Categories
        </div>
        <ul className="category-list overflow-x-hidden overflow-y-scroll h-[calc(100dvh-120px)]">
          {categories &&
            categories.length > 0 &&
            categories.map((category) => (
              <li
                key={category}
                onClick={() => dispatch(setSidebarOff())}
                className="py-3 mr-5 font-Manrope transition-all hover:text-primary hover:underline underline-offset-8 hover:translate-x-4 hover:scale-[1.01]"
              >
                <Link
                  className="text-sm capitalize"
                  to={`/category/${category}`}
                >
                  {category}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
