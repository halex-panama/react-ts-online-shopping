import { failedImg } from "../utils/images";
import { Link } from "react-router-dom";

const FailedCheckout = () => {
  return (
    <div className="container my-5 flex justify-center items-center">
      <div className="empty-cart mx-auto flex flex-col items-center font-Manrope">
        <img src={failedImg} className="w-80 h-80" />
        <span className="text-center font-semibold text-base mt-4">
          Payment Failed!
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

export default FailedCheckout;
