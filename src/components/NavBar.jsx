import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { ProductContext } from "../context/ProductContext";
import { WishListContext } from "../context/WishListContext";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { ForgetPasswordContext } from "../context/ForgetPasswordContext";
import { BounceLoader } from "react-spinners";

export default function NavBar() {
  let { token, setToken } = useContext(AuthContext);
  const decode = token ? jwtDecode(token) : "";
  let { products, setFilteredProducts } = useContext(ProductContext);
  let { data } = useContext(WishListContext);
  const { setStep } = useContext(ForgetPasswordContext);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      search: "",
    },
  });

  useEffect(() => {
    let searchContent = formik.values.search.toLowerCase().trim();

    if (searchContent.length == 0 || searchContent === "") {
      setFilteredProducts(products);
      return;
    }
    setFilteredProducts(
      products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchContent) ||
          product.category.name.toLowerCase().includes(searchContent)
      )
    );
  }, [formik.values.search, products]);

  const navigate = useNavigate();

  const { numberOfcartItems, getUserLoggedItems } = useContext(CartContext);

  useEffect(() => {
    if (localStorage.getItem("UserToken")) {
      getUserLoggedItems();
    }
  }, [token]);
  function logOut() {
    setIsLoading(true);

    localStorage.removeItem("UserToken");
    localStorage.removeItem("cartId");

    setToken(null);
    navigate("/");
    setIsLoading(false);
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
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-0 ">
        <div className="container-fluid ">
          <Link className="navbar-brand" style={{ height: "60px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 80"
              style={{ height: "60px" }}
            >
              <defs>
                {/* Gradient for the shopping bag */}
                <linearGradient
                  id="bagGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#667eea" stopOpacity="1" />
                  <stop offset="100%" stopColor="#764ba2" stopOpacity="1" />
                </linearGradient>

                {/* Gradient for the text */}
                <linearGradient
                  id="textGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#4facfe" stopOpacity="1" />
                  <stop offset="100%" stopColor="#00f2fe" stopOpacity="1" />
                </linearGradient>

                {/* Shadow filter */}
                <filter
                  id="shadow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feDropShadow
                    dx="2"
                    dy="2"
                    stdDeviation="3"
                    floodOpacity="0.3"
                  />
                </filter>
              </defs>

              {/* Background circle */}
              <circle
                cx="35"
                cy="40"
                r="30"
                fill="url(#bagGradient)"
                opacity="0.1"
                filter="url(#shadow)"
              />

              {/* Shopping bag icon */}
              <g transform="translate(20, 20)">
                {/* Bag body */}
                <path
                  d="M5 15 L25 15 L23 35 C23 37 21 39 19 39 L11 39 C9 39 7 37 7 35 Z"
                  fill="url(#bagGradient)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  filter="url(#shadow)"
                />

                {/* Bag handles */}
                <path
                  d="M10 15 L10 10 C10 7 12 5 15 5 C18 5 20 7 20 10 L20 15"
                  fill="none"
                  stroke="url(#bagGradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Shopping items inside bag */}
                <circle cx="12" cy="25" r="1.5" fill="#ffffff" opacity="0.8" />
                <circle cx="18" cy="28" r="1.5" fill="#ffffff" opacity="0.8" />
                <circle cx="15" cy="31" r="1.5" fill="#ffffff" opacity="0.8" />

                {/* Sparkle effects */}
                <g opacity="0.7">
                  <path d="M25 8 L27 10 L25 12 L23 10 Z" fill="#ffd700" />
                  <path d="M8 32 L9 34 L8 36 L7 34 Z" fill="#ffd700" />
                  <circle cx="28" cy="25" r="1" fill="#ffd700" />
                </g>
              </g>

              {/* Company name */}
              <text
                x="75"
                y="35"
                fontFamily="Arial, sans-serif"
                fontSize="18"
                fontWeight="bold"
                fill="url(#textGradient)"
              >
                SHOP
              </text>

              <text
                x="75"
                y="55"
                fontFamily="Arial, sans-serif"
                fontSize="12"
                fill="#666666"
                letterSpacing="2px"
              >
                ONLINE
              </text>

              {/* Decorative elements */}
              <g opacity="0.6">
                <circle cx="160" cy="25" r="2" fill="#4facfe" />
                <circle cx="170" cy="35" r="1.5" fill="#667eea" />
                <circle cx="165" cy="45" r="1" fill="#764ba2" />
              </g>

              {/* Underline decoration */}
              <path
                d="M75 60 L130 60"
                stroke="url(#textGradient)"
                strokeWidth="2"
                opacity="0.5"
              />
            </svg>
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {token !== null ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/products"
                    >
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/categories"
                    >
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/brands"
                    >
                      Brands
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center">
                <i
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  className="fab fa-facebook mx-2 cursor-pointer"
                  style={{ color: "#1877F2" }}
                ></i>
                <i
                  onClick={() =>
                    window.open(
                      "https://www.twitter.com",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  className="fab fa-twitter mx-2 cursor-pointer"
                  style={{ color: "#1DA1F2" }}
                ></i>
                <i
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  className="fab fa-instagram mx-2 cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                ></i>
                <i
                  className="fab fa-tiktok mx-2"
                  style={{
                    color: "#EE1D52",
                    textShadow: "1px 1px 0 #69C9D0, -1px -1px 0 #69C9D0",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    window.open(
                      "https://www.tiktok.com",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                />
                <i
                  onClick={() =>
                    window.open(
                      "https://www.youtube.com",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  className="fab fa-youtube mx-2 cursor-pointer"
                  style={{ color: "#FF0000" }}
                ></i>
              </li>

              {token !== null ? (
                <>
                  <Form className="d-flex ms-5">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      name="search"
                      value={formik.values.search}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="me-2"
                      aria-label="Search"
                    />
                  </Form>{" "}
                  <Link
                    className="nav-link active ms-5"
                    aria-current="page"
                    to="/cart"
                  >
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span
                      style={{ fontSize: "10px" }}
                      className="position-absolute translate-middle badge rounded-pill bg-danger"
                    >
                      {numberOfcartItems == 0 ? "" : numberOfcartItems}
                    </span>
                  </Link>
                  <Link
                    className="nav-link active ms-1 me-3"
                    aria-current="page"
                    to="/wishlist"
                  >
                    <i className="fa-regular fa-heart"></i>
                    <span
                      style={{ fontSize: "10px" }}
                      className="position-absolute translate-middle badge rounded-pill bg-danger"
                    >
                      {data?.data.count == 0 ? "" : data?.data.count}
                    </span>
                  </Link>
                  <Dropdown className="ms-2">
                    <Dropdown.Toggle
                      className="rounded-5 text-black d-flex align-items-center"
                      style={{ border: "none", background: "none" }}
                      id="dropdown-basic"
                    >
                      <img
                        style={{ width: 30, borderRadius: "50%" }}
                        src="/Assets/images/profile.webp"
                        alt="profile"
                      />
                      <h4 className="h6 mx-1"> {decode.name}</h4>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="px-4 py-3 ">
                      <Dropdown.Item>
                        <span
                          onClick={() => navigate("/profile")}
                          className=" fs-4"
                          aria-current="page"
                        >
                          <img
                            style={{
                              width: 50,
                              borderRadius: "50%",
                              marginRight: 20,
                            }}
                            src="/Assets/images/profile.webp"
                            alt="profile"
                          />
                          {decode.name}
                        </span>
                      </Dropdown.Item>
                      <hr className="mt-0 mb-2" />
                      <Dropdown.Item className="my-3 p-2">
                        Settings & privacy
                      </Dropdown.Item>
                      <Dropdown.Item className="my-3 p-2">
                        Help & support
                      </Dropdown.Item>
                      <Dropdown.Item className="my-3 p-2">
                        Give feedback
                      </Dropdown.Item>
                      <Dropdown.Item className="ps-0">
                        <span
                          onClick={() => logOut()}
                          className="nav-link active cursor-pointer"
                          aria-current="page"
                        >
                          <i className="fa-solid fa-right-from-bracket  fs-5"></i>{" "}
                          Log Out
                        </span>{" "}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/login"
                      onClick={() => setStep("login")}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
