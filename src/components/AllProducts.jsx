import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { motion } from "framer-motion";

export default function Products() {
  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.09,
        type: "spring",
        stiffness: 200,
      },
    }),
  };
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  async function getAllProducts() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "https://dummyjson.com/products?limit=0"
      );
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  // async function addItemToCart(id) {
  //   setAddLoading(true);
  //   let res = await addToCart(id);
  //   if (res.data.status === "success") {
  //     toast.success(res?.data.message);
  //   } else {
  //     toast.error(res?.data.message);
  //   }
  //   setAddLoading(false);
  // }

  useEffect(() => {
    getAllProducts();
  }, []);

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

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
          <motion.h1
            className="fw-bold text-center mt-3 mb-5 py-3 px-4"
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
            initial="hidden"
            animate="visible"
          >
            {"Enjoy Figuring Our Products ...".split("").map((char, i) => (
              <motion.span key={i} variants={letterAnimation} custom={i}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          {products?.map((product) => (
            <motion.div
              className="product col-md-2 m-3"
              key={product.id}
              variants={item}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <Link to={`/products/${product.id}`}>
                <img
                  className="w-100"
                  src={product.images?.[0]}
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
                    {product.rating}
                  </span>
                </div>
              </Link>

              <button
                // onClick={() => addItemToCart(product.id)}
                className="btn bg-main w-100 text-white my-3"
              >
                Add To Cart
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
