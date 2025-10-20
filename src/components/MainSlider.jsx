import React from "react";
import Slider from "react-slick";
import img1 from "../../Assets/images/slider-image-1.jpeg";
import img2 from "../../Assets/images/slider-image-2.jpeg";
import img3 from "../../Assets/images/slider-image-3.jpeg";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };
  return (
    <>
      <Slider {...settings}>
        <div>
          <img
            src={img3}
            className="w-100"
            style={{ height: "300px" }}
            alt=""
          />
        </div>
        <div>
          <img
            src={img1}
            className="w-100"
            style={{ height: "300px" }}
            alt=""
          />
        </div>
        <div>
          <img
            src={img2}
            className="w-100"
            style={{ height: "300px" }}
            alt=""
          />
        </div>
      </Slider>
    </>
  );
}
