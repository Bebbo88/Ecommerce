import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CategorySlider({ onCategorySelect, selectedCategory }) {
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
    responsive: [
      {
        breakpoint: 1536,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 1280,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
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
            <Link to={`/categories/${category._id}`}>
              <div
                className={`p-1 cursor-pointer `}
                key={category._id}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.15)";
                  e.currentTarget.style.transition = "0.3s ease";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.transition = "0.3s ease";
                }}
              >
                <img
                  style={{
                    height: "150px",
                    width: "85%",
                    borderRadius: "10px",
                  }}
                  src={category.image}
                  alt={category.name}
                />
                <p className="text-center mt-2 fw-bold">{category.name}</p>
              </div>
            </Link>
          ))}
        </Slider>
      ) : (
        ""
      )}
    </div>
  );
}
