import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { sliderImgs } from "../utils/images";

const HeaderSlider = () => {
  let settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider">
      <div className="container my-0 mx-auto py-0 px-8 max-w-7xl">
        <div className="slider-content overflow-hidden">
          <Slider {...settings}>
            <div className="slider-item max-h-[300px]">
              <img src={sliderImgs[0]} alt="slider-image" />
            </div>
            <div className="slider-item">
              <img src={sliderImgs[1]} alt="slider-image" />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HeaderSlider;
