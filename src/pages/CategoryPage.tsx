import { useEffect } from "react";
import { fetchAsyncProductsCategories } from "../store/categorySlice";
import { useParams } from "react-router-dom";
import { ProductList, Loader } from "../components";
import { STATUS } from "../utils/status";
import { useAppHooks } from "../store/hooks";

const CategoryPage = () => {
  const { category } = useParams();

  const { dispatch, categoryState } = useAppHooks();
  const categoryProducts = categoryState.categoryProducts.products;
  const categoryProductsStatus = categoryState.categoryProductsStatus;

  useEffect(() => {
    dispatch(fetchAsyncProductsCategories(category as string));
  }, [category]);

  return (
    <main>
      <div
        className={`main-content ${
          categoryProductsStatus === STATUS.LOADING
            ? "bg-transparent"
            : "bg-gray/30"
        }`}
      >
        <div className="container px-4 mx-auto md:py-8">
          <div className="categories py-5">
            <div className="categories-item mb-[4.8rem]">
              <div className="title-md relative mb-[2.8rem] border-b-2 border-black/10 bg-white py-5 pl-8">
                <h3 className="uppercase text-2xl font-semibold  text-[rgba(0,0,0,0.4)] ">
                  {category}
                </h3>
              </div>
              {categoryProductsStatus === STATUS.LOADING ? (
                <Loader />
              ) : (
                <ProductList products={categoryProducts} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
