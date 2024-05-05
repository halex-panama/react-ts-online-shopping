import { loader } from "../utils/images";

const Loader = () => {
  return (
    <div className="container">
      <div className="loader flex justify-center items-center">
        <img className="w-20" src={loader} />
      </div>
    </div>
  );
};

export default Loader;
