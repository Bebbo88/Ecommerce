import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ProductContext } from "../context/ProductContext";
import Typewriter from "typewriter-effect";
import { WishListContext } from "../context/WishListContext";
import { AuthContext } from "../context/AuthContext";

export default function Products({
  selectedCategory: initialSelectedCategory,
  selectedCategoryName,
  onClearFilter,
}) {
  let { token } = useContext(AuthContext);
  let { getCartIdFromServer } = useContext(CartContext);
  useEffect(() => {
    if (token) getCartIdFromServer(token);
  }, [token, getCartIdFromServer]);
  const { addToCart } = useContext(CartContext);
  let { products, filteredProducts, isLoading, setFilteredProducts } =
    useContext(ProductContext);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
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

  useEffect(() => {
    if (products?.length) {
      if (initialSelectedCategory) {
        const filtered = products.filter(
          (product) => product.category._id === initialSelectedCategory
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(products);
      }
      setCurrentPage(1);
    }
  }, [products, initialSelectedCategory, setFilteredProducts]); // Calculate pagination for original section

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts?.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  const featuredProducts = safeProducts
    .filter((p) => p.ratingsAverage >= 4.5)
    .slice(0, 12); // Section 2 – Trending (e.g. most sold)

  const trendingProducts = safeProducts
    .filter((p) => (p.sold || 0) > 10)
    .slice(0, 12); // Section 3 – New Arrivals (sort by createdAt descending)

  const newArrivals = [...safeProducts]
    .filter((p) => !!p.createdAt)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 12); // Section 4 – Electronics (category name)

  const electronicsProducts = safeProducts
    .filter((p) => (p.category?.name || "").toLowerCase() === "electronics")
    .slice(0, 12); // Section 5 – On Sale (discount > 0)

  const onSaleProducts = safeProducts
    .filter((p) => (p.discount || 0) > 0)
    .slice(0, 12); // Section 6 – Recommended (just a slice, or use your own logic)

  const recommendedProducts = safeProducts.slice(0, 12); // --- END: Section Lists --- // Card rendering function: no logic changed

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
        <hr />
        {/* Section 2: Trending Now */}
        <div id="section-trending">
          <h2 style={sectionHeaderStyle}>🔥 Trending Now</h2>
          <div className="row">{renderProductCards(trendingProducts)}</div>
        </div>
        <hr />
        {/* Section 3: New Arrivals */}
        <div id="section-new">
          <h2 style={sectionHeaderStyle}>🆕 New Arrivals</h2>
          <div className="row">{renderProductCards(newArrivals)}</div>
        </div>
        <hr />
        {/* Section 4: Electronics */}
        <div id="section-electronics">
          <h2 style={sectionHeaderStyle}>📱 Electronics</h2>
          <div className="row">{renderProductCards(electronicsProducts)}</div>
        </div>
        <hr />
        {/* Section 5: On Sale */}
        <div id="section-sale">
          <h2 style={sectionHeaderStyle}>💸 On Sale</h2>
          <div className="row">{renderProductCards(onSaleProducts)}</div>
        </div>
        <hr />
        {/* Section 6: Recommended For You */}
        <div id="section-recommended">
          <h2 style={sectionHeaderStyle}>✨ Recommended for You</h2>
          <div className="row">{renderProductCards(recommendedProducts)}</div>
        </div>
        <hr />
        {/* ORIGINAL PAGINATED SECTION (your filtered category logic) */}
        <div id="section-pagination">
          {currentProducts?.length > 0 ? (
            <div>
              <h2 style={sectionHeaderStyle}>Paginated Results</h2>
              <div className="row">{renderProductCards(currentProducts)}</div>
            </div>
          ) : (
            <div className="col-12 text-center py-5">
              <h3 className="text-muted">No products found in this category</h3>
            </div>
          )}
          {/* Pagination Info & Controls */}
          {totalPages > 1 && (
            <div className="container my-5">
              <div className="row">
                <div className="col-12 d-flex flex-column align-items-center gap-4">
                  <div className="text-center">
                    <p className="text-muted mb-2">
                      Showing <strong>{indexOfFirstProduct + 1}</strong> to
                      <strong>
                        {indexOfLastProduct > filteredProducts?.length
                          ? filteredProducts?.length
                          : indexOfLastProduct}
                      </strong>
                      of <strong>{filteredProducts?.length}</strong> products
                    </p>
                    {initialSelectedCategory && (
                      <div className="d-flex align-items-center gap-3 flex-wrap justify-content-center">
                        <div className="filter-badge">
                          <i className="fas fa-filter me-2"></i>
                          {selectedCategoryName || "Filtered by Category"}
                        </div>
                        {onClearFilter && (
                          <button
                            onClick={onClearFilter}
                            className="btn btn-outline-danger btn-sm"
                            style={{
                              borderRadius: "20px",
                              padding: "6px 16px",
                              fontWeight: 600,
                            }}
                          >
                            <i className="fas fa-times me-2"></i>
                            Clear Filter
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="custom-pagination">
                    <button
                      className={`pagination-btn ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      aria-label="Previous"
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            className={`pagination-btn ${
                              currentPage === page ? "active" : ""
                            }`}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </button>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <span key={page} className="pagination-btn dots">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                    <button
                      className={`pagination-btn ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      aria-label="Next"
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
