import { Link, useParams } from "react-router-dom";
import { useAppHooks } from "../store/hooks";
import { useEffect, useState } from "react";
import { Products, fetchAsyncSingleProducts } from "../store/productsSlice";
import { STATUS } from "../utils/status";
import { CartMessage, Loader } from "../components";
import { calculateDiscountPrice, formatPrice } from "../utils/formatPrice";
import {
  addToCart,
  setCartMessageOff,
  setCartMessageOn,
} from "../store/cartSlice";

const ProductsPage = () => {
  const { productId } = useParams();

  const { dispatch, productsState, cartState } = useAppHooks();
  const singleProduct = productsState.productSingle;
  const singleProductStatus = productsState.productSingleStatus;
  const cartMessageStatus = cartState.isCartMessageOn;

  const [qty, setQty] = useState(1);

  //for fetching data
  useEffect(() => {
    dispatch(fetchAsyncSingleProducts(Number(productId)));
  }, [productId]);

  //for update cart message in and out
  useEffect(() => {
    if (cartMessageStatus) {
      setTimeout(() => {
        dispatch(setCartMessageOff());
      }, 2000);
    }
  }, [cartMessageStatus]);

  let discountedPrice = calculateDiscountPrice(
    singleProduct.price,
    singleProduct.discountPercentage
  );

  const increaseQty = () => {
    setQty((prev) => {
      let tempQty = prev + 1;
      if (tempQty > singleProduct.stock) tempQty = singleProduct.stock;
      return tempQty;
    });
  };

  const decreaseQty = () => {
    setQty((prev) => {
      let tempQty = prev - 1;
      if (tempQty < 1) tempQty = 1;
      return tempQty;
    });
  };

  const addToCartHandler = (product: Products) => {
    let discountedPrice = calculateDiscountPrice(
      product.price,
      product.discountPercentage
    );

    let totalPrices = qty * discountedPrice;

    dispatch(
      addToCart({ ...product, quantity: qty, totalPrices, discountedPrice })
    );
    dispatch(setCartMessageOn());
  };

  if (singleProductStatus === STATUS.LOADING) return <Loader />;

  return (
    <main className="py-5 bg-gray-100">
      <div className="product-single">
        <div className="container px-4 mx-auto md:py-8">
          <div className="product-single-content bg-white grid gap-y-8 p-0 md:py-3">
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
                      <div className="thumb-item mx-1 h-[120px] border-2 border-white hover:border-primary transition-all">
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
                      <div className="thumb-item mx-1 h-[120px] border-2 border-white hover:border-primary transition-all">
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
                      <div className="thumb-item mx-1 h-[120px] border-2 border-white hover:border-primary transition-all">
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
                      <div className="thumb-item mx-1 h-[120px] border-2 border-white hover:border-primary transition-all">
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
                <div className="title pb-2 border-b-2 border-black/20 text-xl capitalize">
                  {singleProduct.title}
                </div>
                <div>
                  <p className="para my-4 mx-0 opacity-90">
                    {singleProduct.description}
                  </p>
                </div>
                <div className="info flex items-center flex-wrap text-sm mb-6">
                  <div className="rating">
                    <span className="text-primary">Rating:</span>
                    <span className="mx-1">{singleProduct.rating}</span>
                  </div>
                  <div className="vert-line"></div>
                  <div className="brand">
                    <span className="text-primary">Brand:</span>
                    <span className="mx-1">{singleProduct.brand}</span>
                  </div>
                  <div className="vert-line"></div>
                  <div className="brand">
                    <span className="text-primary">Category:</span>
                    <span className="mx-1 capitalize">
                      {singleProduct.category}
                    </span>
                  </div>
                </div>

                <div className="price bg-black/5 px-1 py-2">
                  <div className="flex">
                    <div className="old-price line-through text-gray">
                      {formatPrice(singleProduct.price)}
                    </div>
                    <span className="text-black/70 mx-2">
                      Inclusive of all taxes
                    </span>
                  </div>

                  <div className="flex items-center my-1 gap-4">
                    <div className="new-price text-2xl text-primary">
                      {formatPrice(discountedPrice)}
                    </div>
                    <div className="discount bg-primary text-sm text-white font-semibold px-2 rounded-sm">
                      {singleProduct.discountPercentage}% OFF
                    </div>
                  </div>
                </div>

                <div className="qty flex items-center my-4 gap-2">
                  <div className="qty-text">Quantity:</div>
                  <div className="qty-change flex">
                    <button
                      type="button"
                      className="qty-decrease w-7 h-7 border-2 border-black/10 text-sm"
                      onClick={decreaseQty}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <div className="qty-value h-7 w-10 border-t-2 border-b-2 border-black/10 text-center">
                      {qty}
                    </div>
                    <button
                      type="button"
                      className="qty-increase w-7 h-7 border-2 border-black/10 text-sm"
                      onClick={increaseQty}
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
                    className="add-to-cart-btn text-base border-2 border-primary w-40 h-12 bg-white text-primary bg-primary/20 hover:bg-transparent transition-colors"
                    onClick={() => addToCartHandler(singleProduct)}
                  >
                    <i className="fas fa-shopping-cart"></i>
                    <span className="text-primary mx-2">Add to Cart</span>
                  </button>
                  <Link
                    to={"/cart"}
                    onClick={() => addToCartHandler(singleProduct)}
                  >
                    <button
                      type="button"
                      className="buy-now text-base border-2 border-primary bg-primary text-white w-40 h-12 hover:opacity-80 transition-colors]"
                    >
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {cartMessageStatus && <CartMessage />}
    </main>
  );
};

export default ProductsPage;
