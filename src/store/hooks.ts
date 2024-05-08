import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppHooks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sidebarState = useSelector((state: RootState) => state.sidebar);
  const categoryState = useSelector((state: RootState) => state.category);
  const productsState = useSelector((state: RootState) => state.products);
  const searchState = useSelector((state: RootState) => state.search);

  return { dispatch, sidebarState, categoryState, productsState, searchState };
};
