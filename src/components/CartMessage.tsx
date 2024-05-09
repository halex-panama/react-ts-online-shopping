import { correct } from "../utils/images";

const CartMessage = () => {
  return (
    <div className="cart-message text-center p-8 fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-black/70 rounded-sm">
      <div className="cart-message-icon mb-7">
        <img src={correct} alt="" className="w-10 h-10 mx-auto" />
      </div>
      <h6 className="text-white text-sm font-medium">
        An item has been added to your shopping cart
      </h6>
    </div>
  );
};

export default CartMessage;
