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
      <div className="container my-0 mx-auto py-0 px-2 max-w-7xl md:px-8">
        <div className="slider-content overflow-hidden rounded-md">
          <Slider {...settings}>
            <div className="slider-item max-h-[300px] rounded-md">
              <img
                src={sliderImgs[0]}
                className="rounded-md"
                alt="slider-image"
                loading="lazy"
              />
            </div>
            <div className="slider-item">
              <img
                src={sliderImgs[1]}
                className="rounded-md"
                alt="slider-image"
                loading="lazy"
              />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HeaderSlider;
