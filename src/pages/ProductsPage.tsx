import { useParams } from "react-router-dom";
import { useAppHooks } from "../store/hooks";
import { useEffect } from "react";
import { fetchAsyncSingleProducts } from "../store/productsSlice";
import { STATUS } from "../utils/status";
import { Loader } from "../components";
import { calculateDiscountPrice, formatPrice } from "../utils/formatPrice";

const ProductsPage = () => {
  const { productId } = useParams();

  const { dispatch, productsState } = useAppHooks();
  const singleProduct = productsState.productSingle;
  const singleProductStatus = productsState.productSingleStatus;

  useEffect(() => {
    dispatch(fetchAsyncSingleProducts(Number(productId)));
  }, [productId]);

  let discountedPrice = calculateDiscountPrice(
    singleProduct.price,
    singleProduct.discountPercentage
  );

  if (singleProductStatus === STATUS.LOADING) return <Loader />;

  console.log(singleProduct);

  return (
    <main className="py-5 bg-gray-100">
      <div className="product-single">
        <div className="container px-4 mx-auto md:py-8">
          <div className="product-single-content bg-white grid gap-y-8 p-3">
            <div className="product-single-l">
              <div className="product-img">
                <div className="product-img-zoom h-96 overflow-hidden">
                  <img
                    src={singleProduct.thumbnail}
                    className="object-cover h-full w-full"
                    alt=""
                  />
                </div>

                <div className="product-img-thumbs flex items-center my-2 overflow-x-scroll">
                  {singleProduct &&
                    singleProduct.images &&
                    singleProduct.images[1] && (
                      <div className="thumb-item mx-1 h-[120px] border-2 border-white hover:border-orange-500">
                        <img
                          className="hover:scale-95 object-cover h-full w-full"
                          src={singleProduct.images[1]}
                          alt=""
                        />
                      </div>
                    )}
                  {singleProduct &&
                    singleProduct.images &&
                    singleProduct.images[2] && (
                      <div className="thumb-item mx-1 h-[120px] border-2 border-white hover:border-orange-500">
                        <img
                          className="hover:scale-95 object-cover h-full w-full"
                          src={singleProduct.images[2]}
                          alt=""
                        />
                      </div>
                    )}
                  {singleProduct &&
                    singleProduct.images &&
                    singleProduct.images[3] && (
                      <div className="thumb-item mx-1 h-[120px] border-2 border-white hover:border-orange-500">
                        <img
                          className="hover:scale-95 object-cover h-full w-full"
                          src={singleProduct.images[3]}
                          alt=""
                        />
                      </div>
                    )}
                  {singleProduct &&
                    singleProduct.images &&
                    singleProduct.images[4] && (
                      <div className="thumb-item mx-1 h-[120px] border-2 border-white hover:border-orange-500">
                        <img
                          className="hover:scale-95 object-cover h-full w-full"
                          src={singleProduct.images[4]}
                          alt=""
                        />
                      </div>
                    )}
                </div>
              </div>
            </div>

            <div className="product-single-r">
              <div className="product-details ">
                <div className="title pb-2 border-b-2 text-xl">
                  {singleProduct.title}
                </div>
                <div>
                  <p className="para my-4 mx-0 opacity-90">
                    {singleProduct.description}
                  </p>
                </div>
                <div className="info flex items-center flex-wrap text-sm mb-6">
                  <div className="rating">
                    <span className="text-orange-500">Rating:</span>
                    <span className="mx-1">{singleProduct.rating}</span>
                  </div>
                  <div className="vert-line"></div>
                  <div className="brand">
                    <span className="text-orange-500">Brand:</span>
                    <span className="mx-1">{singleProduct.brand}</span>
                  </div>
                  <div className="vert-line"></div>
                  <div className="brand">
                    <span className="text-orange-500">Category:</span>
                    <span className="mx-1 capitalize">
                      {singleProduct.category}
                    </span>
                  </div>
                </div>

                <div className="price bg-black/5">
                  <div className="flex">
                    <div className="old-price line-through text-gray-500">
                      {formatPrice(singleProduct.price)}
                    </div>
                    <span className="text-gray-800 mx-2">
                      Inclusive of all taxes
                    </span>
                  </div>

                  <div className="flex items-center my-1 gap-4">
                    <div className="new-price text-2xl text-orange-500">
                      {formatPrice(discountedPrice)}
                    </div>
                    <div className="discount bg-orange-500 text-sm text-white font-semibold px-2 rounded-sm">
                      {singleProduct.discountPercentage}% OFF
                    </div>
                  </div>
                </div>

                <div className="qty flex items-center my-4">
                  <div className="qty-text">Quantity:</div>
                  <div className="qty-change flex">
                    <button
                      type="button"
                      className="qty-decrease w-7 h-7 border-2 border-black/10 text-sm"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <div className="qty-value h-7 w-10 border-t-2 border-b-2 border-black/10 text-center">
                      0
                    </div>
                    <button
                      type="button"
                      className="qty-increase w-7 h-7 border-2 border-black/10 text-sm"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>

                  {singleProduct && singleProduct.stock === 0 && (
                    <div className="qty-error p-2 rounded-sm">Out of Stock</div>
                  )}
                </div>

                <div className="btns flex gap-2">
                  <button
                    type="button"
                    className="add-to-cart-btn h-10 text-base border-2 border-orange-500 px-7 bg-white text-orange-500"
                  >
                    <i className="fas fa-shopping-cart"></i>
                    <span className="text-orange-500 mx-2">Add to Cart</span>
                  </button>
                  <button
                    type="button"
                    className="buy-now h-10 text-base border-2 border-orange-500 bg-orange-500 text-white px-7"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
