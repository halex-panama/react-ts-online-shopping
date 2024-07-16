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

  if (searchProduct && searchProduct.length <= 0)
    return (
      <div className="container h-[70vh]">
        <div className="py-5 max-w-screen-xl my-auto px-2">
          No products found
        </div>
      </div>
    );

  return (
    <main>
      <div
        className={`main-content  ${
          searchProductStatus === STATUS.LOADING
            ? "bg-transparent"
            : "bg-gray/30"
        }`}
      >
        <div className="container px-4 mx-auto md:py-8">
          <div className="categories py-5">
            <div className="categories-item mb-[4.8rem]">
              <div className="title-md relative mb-[2.8rem] border-b-2 border-black/10 bg-white py-5 pl-8">
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
