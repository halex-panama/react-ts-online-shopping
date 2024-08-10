import { Link } from "react-router-dom";
import { checkoutImg } from "../utils/images";
const SuccessCheckout = () => {
  return (
    <div className="container my-5 flex justify-center items-center">
      <div className="empty-cart mx-auto flex flex-col items-center font-Manrope">
        <img src={checkoutImg} className="w-80 h-80" />
        <span className="text-center font-semibold text-base">
          Thank you for your order!
        </span>
        <Link
          className="text-white bg-primary font-medium border-primary py-2 px-5 mt-2"
          to={"/"}
        >
          Go back to homepage
        </Link>
      </div>
    </div>
  );
};

export default SuccessCheckout;
