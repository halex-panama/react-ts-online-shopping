import { useEffect } from "react";
import { HeaderSlider } from "../components";
import { Products, fetchAsyncProducts } from "../store/productsSlice";
import { Loader, ProductList } from "../components";
import { STATUS } from "../utils/status";
import { useAppHooks } from "../store/hooks";

const HomePage = () => {
  const { dispatch, productsState } = useAppHooks();
  const allProducts = productsState.allProducts.products;
  const productStatus = productsState.allProductsStatus;

  useEffect(() => {
    dispatch(fetchAsyncProducts(40));
  }, []);

  const randomProducts = [] as Products[];

  if (allProducts && allProducts.length > 0) {
    for (let i in allProducts) {
      let randomIndex = Math.floor(Math.random() * allProducts.length);

      while (randomProducts.includes(allProducts[randomIndex])) {
        randomIndex = Math.floor(Math.random() * allProducts.length);
      }
      randomProducts[i] = allProducts[randomIndex];
    }
  }

  return (
    <main>
      <div className="my-2 md:my-8">
        <HeaderSlider />
      </div>

      <div className="main-content h-full bg-gray/30">
        <div className="container px-4 mx-auto md:py-8">
          <div className="categories py-5">
            <div className="categories-item mb-[4.8rem]">
              <div className="title-md relative mb-[2.8rem] border-b-2 border-black/10 bg-white py-5 pl-8">
                <h3 className="uppercase text-2xl font-semibold text-[rgba(0,0,0,0.4)] ">
                  See Our Products
                </h3>
              </div>
              {productStatus === STATUS.LOADING ? (
                <Loader />
              ) : (
                <ProductList products={randomProducts} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
