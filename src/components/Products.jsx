import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";
import { Link, Links } from "react-router-dom";
import { BounceLoader } from "react-spinners";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ProductContext } from "../context/ProductContext";
import Typewriter from "typewriter-effect";
import { WishListContext } from "../context/WishListContext";
import { AuthContext } from "../context/AuthContext";

export default function Products() {
  let { token } = useContext(AuthContext);
  let { getCartIdFromServer } = useContext(CartContext);
  useEffect(() => {
    if (token) getCartIdFromServer(token);
  }, [token, getCartIdFromServer]);
  const { addToCart } = useContext(CartContext);
  let { products, isLoading } = useContext(ProductContext);

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
      if (!token)
        return toast.error("You must have an acount before adding to wishlist");
      addItemToWishList(id);
    }
  }
  async function addItemToCart(id) {
    if (!token)
      return toast.error("You must have an acount before adding to cart");
    setAddLoading(true);
    let res = await addToCart(id);
    if (res.data.status === "success") {
      toast.success(res?.data.message);
      setAddLoading(false);
    } else {
      toast.error(res?.data.message);
      setAddLoading(false);
    }
  } // Filter products by category for the original paginated section

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
    ); // --- BEGIN: Filtered Lists For Each Section --- // Defensive check for products array

  const safeProducts = products || []; // Section 1 – Featured (e.g. highly rated)

  const featuredProducts = safeProducts.slice(0, 12); // Section 2 – Trending (e.g. most sold)

  const trendingProducts = safeProducts.slice(13, 23); // Section 3 – New Arrivals (sort by createdAt descending)

  const newArrivals = [...safeProducts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(23, 33); // Section 4 – Electronics (category name)

  const electronicsProducts = safeProducts
    .filter((p) => (p.category?.name || "").toLowerCase() === "electronics")
    .slice(0, 12); // Section 5 – On Sale (discount > 0)

  const onSaleProducts = safeProducts.slice(33, 40); // Section 6 – Recommended (just a slice, or use your own logic)

  const recommendedProducts = safeProducts.slice(8, 20); // --- END: Section Lists --- // Card rendering function: no logic changed

  function renderProductCards(list) {
    if (!list?.length)
      return (
        <div className="col-12 text-center py-5">
          <h1
            className="fw-bold fs-1 text-main text-center mt-5"
            style={{
              fontFamily: "Poppins, sans-serif",
              letterSpacing: "2px",
            }}
          >
            <Typewriter
              options={{
                strings: ["Not Founded! ..."],
                autoStart: true,
                loop: true,
                delay: 100,
                deleteSpeed: 50,
                pauseFor: 1500,
              }}
            />
          </h1>
        </div>
      );
    return list.map((product) => (
      <motion.div
        className="product col-md-4 my-3 col-lg-2 col-sm-12"
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
          <h3 className="font-sm mt-3 text-main fw-bold">
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
    ));
  }

  const sectionHeaderStyle = {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#7534b7",
    margin: "40px 0 20px 0",
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
        <motion.div>
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
            <Typewriter
              options={{
                strings: [
                  "Featured Products ...",
                  "Top Deals 🔥",
                  "Shop the Latest Trends 🛍️",
                ],
                autoStart: true,
                loop: true,
                delay: 90,
                deleteSpeed: 60,
                pauseFor: 1800,
              }}
            />
          </motion.h1>
        </motion.div>
        {/* Section 1: Featured */}
        <div id="section-featured">
          <h2 style={sectionHeaderStyle}>🌟 Featured Products</h2>
          <div className="row">{renderProductCards(featuredProducts)}</div>
        </div>
        <div className=" text-center my-5">
          <Link to={"/allproducts"}>
            <button className="btn bg-main text-white px-5 py-2">
              View All Products
            </button>
          </Link>
        </div>
        <hr />
        {/* Section 2: Trending Now */}
        <div id="section-trending">
          <h2 style={sectionHeaderStyle}>🔥 Trending Now</h2>
          <div className="row">{renderProductCards(trendingProducts)}</div>
        </div>
        <div className=" text-center my-5">
          <Link to={"/allproducts"}>
            <button className="btn bg-main text-white px-5 py-2">
              View All Products
            </button>
          </Link>
        </div>
        <hr />
        {/* Section 3: New Arrivals */}
        <div id="section-new">
          <h2 style={sectionHeaderStyle}>🆕 New Arrivals</h2>
          <div className="row">{renderProductCards(newArrivals)}</div>
        </div>
        <div className=" text-center my-5">
          <Link to={"/allproducts"}>
            <button className="btn bg-main text-white px-5 py-2">
              View All Products
            </button>
          </Link>
        </div>
        <hr />
        {/* Section 4: Electronics */}
        <div id="section-electronics">
          <h2 style={sectionHeaderStyle}>📱 Electronics</h2>
          <div className="row">{renderProductCards(electronicsProducts)}</div>
        </div>
        <div className=" text-center my-5">
          <Link to={"/allproducts"}>
            <button className="btn bg-main text-white px-5 py-2">
              View All Products
            </button>
          </Link>
        </div>
        <hr />
        {/* Section 5: On Sale */}
        <div id="section-sale">
          <h2 style={sectionHeaderStyle}>💸 On Sale</h2>
          <div className="row">{renderProductCards(onSaleProducts)}</div>
        </div>
        <div className=" text-center my-5">
          <Link to={"/allproducts"}>
            <button className="btn bg-main text-white px-5 py-2">
              View All Products
            </button>
          </Link>
        </div>
        <hr />
        {/* Section 6: Recommended For You */}
        <div id="section-recommended">
          <h2 style={sectionHeaderStyle}>✨ Recommended for You</h2>
          <div className="row">{renderProductCards(recommendedProducts)}</div>
        </div>
        <div className=" text-center my-5">
          <Link to={"/allproducts"}>
            <button className="btn bg-main text-white px-5 py-2">
              View All Products
            </button>
          </Link>
        </div>
        <hr />
      </div>
    </>
  );
}
