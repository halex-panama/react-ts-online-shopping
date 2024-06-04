import { Link } from "react-router-dom";
import { useAppHooks } from "../store/hooks";
import { shopping_cart } from "../utils/images";
import { formatPrice } from "../utils/formatPrice";
import {
  clearCart,
  getCartTotal,
  removeFromCart,
  toggleCartQty,
} from "../store/cartSlice";
import { useEffect } from "react";

const CartPage = () => {
  const { dispatch, cartState } = useAppHooks();
  const { carts, totalAmount, itemsCount } = cartState;

  //get total amount and items count
  useEffect(() => {
    dispatch(getCartTotal());
  }, [carts]);

  if (carts.length === 0) {
    return (
      <div className="container my-5 flex justify-center items-center">
        <div className="empty-cart mx-auto flex flex-col items-center font-Manrope">
          <img src={shopping_cart} alt="" />
          <span className="text-center font-semibold text-base">
            Your cart is empty
          </span>
          <Link
            className="text-white bg-primary font-medium border-primary py-2 px-5 mt-2"
            to={"/"}
          >
            Go shopping now!
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart bg-gray-50 overflow-x-scroll">
      <div className="container p-0 mx-auto">
        <div className="cart-ctable md:min-w-[1000px]:">
          <div className="cart-chead my-8 px-8 rounded-sm bg-white hidden md:grid">
            <div className="cart-ctr grid min-h-10 items-center border-black/10 border-y-2 font-semibold font-Manrope">
              <div className="cart cth">
                <span className="cart-ctxt">S.N</span>
              </div>
              <div className="cart cth">
                <span className="cart-ctxt">Product</span>
              </div>
              <div className="cart cth">
                <span className="cart-ctxt">Unit Price</span>
              </div>
              <div className="cart cth">
                <span className="cart-ctxt">Quantity</span>
              </div>
              <div className="cart cth">
                <span className="cart-ctxt">Total Prices</span>
              </div>
              <div className="cart cth">
                <span className="cart-ctxt">Actions</span>
              </div>
            </div>
          </div>

          <div className="cart-cbody px-8 rounded-sm bg-white my-2">
            {carts.map((cart, index) => (
              <div
                className="cart-ctr min-h-10  py-2 border-b-2 flex flex-col gap-2 border-black/10 md:grid md:border-0 font-Manrope"
                key={cart.id}
              >
                <div className="card-ctd hidden md:grid">
                  <span className="cart-ctxt">{index + 1}</span>
                </div>
                <div className="card-ctd">
                  <Link to={`/products/${cart.id}`}>
                    <span className="cart-ctxt hover:text-primary">
                      {cart.title}
                    </span>
                  </Link>
                </div>
                <div className="card-ctd">
                  <span className="cart-ctxt text-primary md:text-black">
                    {formatPrice(cart.discountedPrice)}
                  </span>
                </div>
                <div className="card-ctd">
                  <div className="qty-change flex items-center">
                    <button
                      type="button"
                      className="w-7 h-7 border-2 border-black/10"
                      onClick={() =>
                        dispatch(
                          toggleCartQty({
                            id: cart.id,
                            type: "DEC",
                          })
                        )
                      }
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <div className="qty-value w-9 h-7 text-center border-y-2 border-black/10">
                      {cart.quantity}
                    </div>
                    <button
                      type="button"
                      className="w-7 h-7 border-2 border-black/10"
                      onClick={() =>
                        dispatch(
                          toggleCartQty({
                            id: cart.id,
                            type: "INC",
                          })
                        )
                      }
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
                <div className="card-ctd hidden md:grid">
                  <span className="cart-ctxt text-primary">
                    {formatPrice(cart.totalPrices)}
                  </span>
                </div>
                <div className="card-ctd">
                  <button
                    type="button"
                    onClick={() => dispatch(removeFromCart(cart.id))}
                    className="delete-btn hover:text-primary"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-cfoot gap-4 grid my-8 px-8  md:flex md:items-center  md:justify-between">
            <div className="cart-cfoot-l">
              <button
                className="clear-cart border-2 border-warning text-warning uppercase p-2 flex items-center gap-1"
                type="button"
                onClick={() => dispatch(clearCart())}
              >
                <i className="fas fa-trash"></i>
                <span>Clear Cart</span>
              </button>
            </div>

            <div className="cart-cfoot-r flex flex-col justify-end">
              <div className="total-txt  flex items-center justify-end gap-2 font-Manrope">
                <div>
                  Total ({itemsCount}) items: {""}
                </div>
                <span className="text-primary text-2xl">
                  {formatPrice(totalAmount)}
                </span>
              </div>

              <button className="mt-3 text-white bg-primary py-2">
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
