import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { fetchAsyncProductsCategories } from "../store/categorySlice";
import { useParams } from "react-router-dom";
import { ProductList, Loader } from "../components";
import { STATUS } from "../utils/status";

const CategoryPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categoryProducts = useSelector(
    (state: RootState) => state.category.categoryProducts
  );
  const categoryProductsStatus = useSelector(
    (state: RootState) => state.category.categoryProductsStatus
  );

  const { category } = useParams();

  useEffect(() => {
    dispatch(fetchAsyncProductsCategories(category as string));
  }, [category]);

  console.log(categoryProducts);

  return (
    <main>
      <div
        className={`main-content bg-gray-200 ${
          categoryProductsStatus === STATUS.LOADING
            ? "bg-transparent"
            : "bg-gray-200"
        }`}
      >
        <div className="container px-4 mx-auto md:py-8">
          <div className="categories py-5">
            <div className="categories-item mb-[4.8rem]">
              <div className="title-md relative mb-[2.8rem] border-b-2 bg-white py-5 pl-8">
                <h3 className="uppercase text-2xl font-semibold text-[rgba(0,0,0,0.4)] ">
                  {category}
                </h3>
              </div>
              {categoryProductsStatus === STATUS.LOADING ? (
                <Loader />
              ) : (
                <ProductList products={categoryProducts.products} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
