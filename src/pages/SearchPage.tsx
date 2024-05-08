import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppHooks } from "../store/hooks";
import { clearSearch, fetchSearchProducts } from "../store/searchSlice";
import { STATUS } from "../utils/status";
import { Loader, ProductList } from "../components";

const SearchPage = () => {
  const { searchTerm } = useParams();

  const { dispatch, searchState } = useAppHooks();
  const searchProductStatus = searchState.searchProductsStatus;
  const searchProduct = searchState.searchProducts.products;

  useEffect(() => {
    dispatch(clearSearch());
    dispatch(fetchSearchProducts(searchTerm as string));
  }, [searchTerm]);

  console.log(searchTerm);
  console.log(searchProduct);

  return (
    <main>
      <div
        className={`main-content bg-gray-200 ${
          searchProductStatus === STATUS.LOADING
            ? "bg-transparent"
            : "bg-gray-200"
        }`}
      >
        <div className="container px-4 mx-auto md:py-8">
          <div className="categories py-5">
            <div className="categories-item mb-[4.8rem]">
              <div className="title-md relative mb-[2.8rem] border-b-2 bg-white py-5 pl-8">
                <h3 className="uppercase text-2xl font-semibold text-[rgba(0,0,0,0.4)] ">
                  Searched products for: {searchTerm}
                </h3>
              </div>
              {searchProductStatus === STATUS.LOADING ? (
                <Loader />
              ) : (
                <ProductList products={searchProduct} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchPage;