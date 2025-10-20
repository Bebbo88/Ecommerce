import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";
import Slider from "react-slick";
import { BounceLoader } from "react-spinners";

export default function ProductDetails() {
  let { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  async function getSpicificProduct(id) {
    setIsLoading(true);
    let res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setProduct(res.data.data);
    setIsLoading(false);
  }
  async function addItemToCart(id) {
    setIsLoading(true);
    let res = await addToCart(id);
    if (res.data.status === "success") {
      setIsLoading(false);
      toast.success(res?.data.message);
    } else {
      setIsLoading(false);
      toast.error(res?.data.message);
    }
  }

  useEffect(() => {
    getSpicificProduct(id);
  }, [id]);
  return (
    <>
      {isLoading && (
        <div className="loading" style={{ height: "100vh" }}>
          <BounceLoader color="#7534b7" size={120} />
        </div>
      )}
      <div className="row align-items-center">
        <div className="col-md-4">
          <Slider {...settings}>
            {product?.images?.map((img) => (
              <img className="w-100" src={img} alt={product.title} />
            ))}
          </Slider>
        </div>
        <div className="col-md-8">
          <h1 className="h5">{product.title}</h1>
          <h6>{product.description}</h6>
          <h4 className="h6 text-main mt-3">{product.category?.name}</h4>
          <h4 className="h6 fw-bold text-main mt-4">
            Price : {product.price}EGP
          </h4>
          <div className="d-flex justify-content-between mt-3">
            <h4 className="h6">Quantity : {product.ratingsQuantity}</h4>
            <h4 className="h6">
              {" "}
              <i className="fa fa-star rating-color"></i>{" "}
              {product.ratingsAverage}
            </h4>
          </div>
          <button
            onClick={() => addItemToCart(product.id)}
            className="btn bg-main text-white mt-5 w-100"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
}
