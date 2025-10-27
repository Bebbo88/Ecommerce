import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { motion } from "framer-motion";
import { ProductContext } from "../context/ProductContext";
import Typewriter from "typewriter-effect";
import { WishListContext } from "../context/WishListContext";
import { AuthContext } from "../context/AuthContext";

export default function Products() {
  let { token } = useContext(AuthContext);
  let { getCartIdFromServer, addToCart } = useContext(CartContext);
  let { products, filteredProducts, isLoading, setFilteredProducts } =
    useContext(ProductContext);
  let { addItemToWishList, isPending, isAdding, deleteItemFromWishList, data } =
    useContext(WishListContext);

  const [addLoading, setAddLoading] = useState(false);

  useEffect(() => {
    if (token) getCartIdFromServer(token);
  }, [token]);

  useEffect(() => {
    if (products?.length) setFilteredProducts(products);
  }, [products]);

  // 🧭 PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // حساب أول وآخر منتج في الصفحة
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // حساب عدد الصفحات الكلي
  const totalPages = Math.ceil(filteredProducts?.length / productsPerPage);

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function isInWishList(id) {
    return data?.data?.data?.some((item) => item._id == id);
  }

  function toggleAddRemoveFromWishList(id) {
    if (isInWishList(id)) {
      deleteItemFromWishList(id);
    } else {
      if (!token)
        return toast.error(
          "You must have an account before adding to wishlist"
        );

      addItemToWishList(id);
    }
  }

  async function addItemToCartHandler(id) {
    if (!token)
      return toast.error("You must have an account before adding to cart");

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
        <motion.div className="row" initial="hidden" animate="show">
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
          >
            <Typewriter
              options={{
                strings: ["Discover Our Products ..."],
                autoStart: true,
                loop: true,
                delay: 90,
                deleteSpeed: 60,
                pauseFor: 1800,
              }}
            />
          </motion.h1>

          {currentProducts?.map((product) => (
            <motion.div
              className="product col-md-3 my-3"
              key={product.id}
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
                <h3 className="font-sm text-main mt-3 fw-bold">
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
                onClick={() => toggleAddRemoveFromWishList(product.id)}
              ></i>

              <button
                onClick={() => addItemToCartHandler(product.id)}
                className="btn bg-main w-100 text-white my-3"
              >
                Add To Cart
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* 🔹 PAGINATION BUTTONS */}
        <div className="d-flex justify-content-center my-5">
          <nav>
            <ul className="pagination gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index + 1} className="page-item">
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`btn px-4 py-2 fw-bold ${
                      currentPage === index + 1
                        ? "bg-main text-white border-0 shadow"
                        : "bg-white text-main border border-main"
                    }`}
                    style={{
                      borderRadius: "8px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
