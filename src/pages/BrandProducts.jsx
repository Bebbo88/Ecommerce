import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { BrandContext } from "../context/BrandContext";

import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

export default function BrandProducts() {
  let { id } = useParams();
  const [spacificBrandProducts, setSpacificBrandProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { brands } = useContext(BrandContext);

  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        type: "spring",
        stiffness: 200,
      },
    }),
  };
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };
  async function getProductsOfSpecificBrand() {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`
      );

      setSpacificBrandProducts(data?.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProductsOfSpecificBrand();
  }, [id]);

  async function addItemToCart(id) {
    setAddLoading(true);
    let res = await addToCart(id);
    if (res.data.status === "success") {
      toast.success(res?.data.message);
    } else {
      toast.error(res?.data.message);
    }
    setAddLoading(false);
  }

  if (isLoading)
    return (
      <div
        className="loading d-flex justify-content-center align-items-center"
        style={{
          height: "100vh",
          background: "rgba(0, 0, 0, 0.05)",
        }}
      >
        <BounceLoader color="#7534b7" size={120} />
      </div>
    );

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <>
      {addLoading && (
        <div
          className="loading d-flex justify-content-center align-items-center"
          style={{
            height: "100vh",
            background: "rgba(0, 0, 0, 0.3)",
            position: "fixed",
            inset: 0,
            zIndex: 9999,
          }}
        >
          <BounceLoader color="#7534b7" size={120} />
        </div>
      )}

      <div className="container">
        <motion.div
          className="row"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <h1
            className="fw-bold text-center mt-5 py-3 px-4"
            style={{
              fontSize: "2.5rem",
              color: "#fff",
              letterSpacing: "2px",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, rgba(117,52,183,0.85), rgba(160,120,255,0.45))",
              backdropFilter: "blur(5px)",
              boxShadow: "0 4px 20px rgba(117, 52, 183, 0.3)",
            }}
          >
            {brands?.map((brand) => {
              if (brand._id == id) return brand.name;
            })}
          </h1>
          {spacificBrandProducts.length === 0 ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "60vh" }}
            >
              <h1
                className="fw-bold fs-1 text-main text-center mt-5"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  letterSpacing: "2px",
                }}
              >
                <Typewriter
                  options={{
                    strings: ["Coming Soon! ..."],
                    autoStart: true,
                    loop: true,
                    delay: 100,
                    deleteSpeed: 50,
                    pauseFor: 1500,
                  }}
                />
              </h1>
            </div>
          ) : (
            spacificBrandProducts.map((product) => (
              <motion.div
                className="product col-md-4 my-3"
                key={product.id}
                variants={item}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                <Link to={`/products/${product.id}`}>
                  <img
                    className="w-100"
                    src={product.imageCover}
                    alt={product.title}
                    style={{ borderRadius: "10px" }}
                  />
                  <h3 className="font-sm text-main fw-bold">
                    {product.category.name}
                  </h3>
                  <h3 className="h6">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="d-flex justify-content-between mt-3">
                    <span>{product.price} EGP</span>
                    <span>
                      <i className="fa fa-star rating-color"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>

                <button
                  onClick={() => addItemToCart(product.id)}
                  className="btn bg-main w-100 text-white my-3"
                >
                  Add To Cart
                </button>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </>
  );
}
