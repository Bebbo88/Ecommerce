import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../context/CategoryContext";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";
import { WishListContext } from "../context/WishListContext";
import toast from "react-hot-toast";
import { BounceLoader } from "react-spinners";
import { motion } from "framer-motion";

export default function CategoryProducts() {
  const { id } = useParams();
  let { getSpecificCategoryProducts, data: categorydata } =
    useContext(CategoryContext);
  let { data: specificDataOfCategory, isLoading } = useQuery({
    queryKey: ["getSpecificCategoryProducts", id],
    queryFn: () => getSpecificCategoryProducts(id),
  });
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

  let { addItemToWishList, isPending, isAdding, deleteItemFromWishList, data } =
    useContext(WishListContext);

  const [addLoading, setAddLoading] = useState(false);

  function isInWishList(id) {
    return data?.data?.data?.some((item) => item._id == id);
  }

  function toggleAddRemoveFromWishList(id) {
    if (isInWishList(id)) {
      deleteItemFromWishList(id);
    } else {
      addItemToWishList(id);
    }
  }
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
  //   useEffect(() => {
  //       if (products?.length) {
  //         setFilteredProducts(products);
  //       }

  //   }, []);

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
      {(addLoading || isPending || isAdding) && (
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
            initial="hidden"
            animate="visible"
          >
            {categorydata?.data?.data?.map((category) => {
              if (category._id == id) return category.name;
            })}
          </motion.h1>

          {specificDataOfCategory?.data?.data?.map((product) => (
            <motion.div
              className="product col-md-2 my-3"
              key={product._id}
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
                  {product.category?.name}
                </h3>
                <h3 className="h6">
                  {product.title?.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="d-flex justify-content-between mt-3">
                  <span>{product.price} EGP</span>
                  <span>
                    <i className="fa fa-star rating-color"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>
              <i
                style={{
                  position: "absolute",
                  top: 5,
                  left: "75%",
                  fontSize: 24,
                }}
                className={
                  isInWishList(product.id)
                    ? "btn fa-solid fa-heart text-danger"
                    : "btn fa-regular fa-heart"
                }
                onClick={() => {
                  toggleAddRemoveFromWishList(product.id);
                }}
              ></i>

              <button
                onClick={() => addItemToCart(product.id)}
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
