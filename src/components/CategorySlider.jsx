import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import axios from "axios";

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  async function getCategortImages() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(data);
  }

  useEffect(() => {
    getCategortImages();
  }, []);
  return (
    <div className="mt-4">
      {categories?.data ? (
        <Slider {...settings} className="mt-5">
          {categories?.data.map((category) => (
            <div>
              <img
                style={{ height: "120px" }}
                key={category.id}
                src={category.image}
                alt=""
              />
            </div>
          ))}
        </Slider>
      ) : (
        ""
      )}
    </div>
  );
}
