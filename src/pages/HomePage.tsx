import { useEffect } from "react";
import { HeaderSlider } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchAsyncProducts } from "../store/productsSlice";
import { Loader, ProductList } from "../components";
import { STATUS } from "../utils/status";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.products.products);
  const productStatus = useSelector(
    (state: RootState) => state.products.productStatus
  );

  useEffect(() => {
    dispatch(fetchAsyncProducts(20));
  }, []);

  return (
    <main>
      <div className="my-8">
        <HeaderSlider />
      </div>

      <div className="main-content h-screen bg-gray-200">
        <div className="container px-8">
          <div className="categories py-5">
            <div className="categories-item mb-[4.8rem]">
              <div className="title-md relative mb-[2.8rem] border-b-2 bg-white py-5 pl-8">
                <h3 className="uppercase text-2xl font-semibold text-[rgba(0,0,0,0.4)] ">
                  See Our Products
                </h3>
              </div>
              {productStatus === STATUS.LOADING ? (
                <Loader />
              ) : (
                <ProductList products={data.products} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
