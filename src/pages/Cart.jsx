import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { AuthContext } from "../context/AuthContext";

export default function Cart() {
  const [cartItems, setCartItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [smallLoadind, setSmallLoading] = useState(false);
  const { token } = useContext(AuthContext);

  let {
    getUserLoggedItems,
    updateCart,
    removeItem,
    clearCart,
    setNumberOfCartItems,
  } = useContext(CartContext);
  const navigate = useNavigate();

  async function getAllInCart() {
    setIsLoading(true);
    let { data } = await getUserLoggedItems();
    setCartItems(data.data);
    setIsLoading(false);
  }
  async function updateCartItem(id, count) {
    setSmallLoading(true);
    let { data } = await updateCart(id, count);
    setCartItems(data.data);
    setSmallLoading(false);
  }
  async function removeCartItem(id) {
    setSmallLoading(true);
    let { data } = await removeItem(id);
    setCartItems(data.data);
    setNumberOfCartItems(data.numOfCartItems);
    setSmallLoading(false);
  }
  async function clearCartItems() {
    setIsLoading(true);
    let { data } = await clearCart();
    setCartItems(data.data);
    setNumberOfCartItems(0);
    setIsLoading(false);
  }

  useEffect(() => {
    getAllInCart();
  }, []);

  if (isLoading)
    return (
      <div className="loading" style={{ height: "100vh" }}>
        <BounceLoader color="#7534b7" size={120} />
      </div>
    );
  return (
    <>
      {smallLoadind && (
        <div className="loading" style={{ height: "100vh" }}>
          <BounceLoader color="#7534b7" size={120} />
        </div>
      )}
      <div className=" p-3">
        <h1>Shopping Cart</h1>
        <button
          onClick={() => clearCartItems()}
          className="btn btn-danger "
          style={{ position: "relative", left: "85%" }}
        >
          Clear Cart
        </button>

        {cartItems ? (
          <>
            <div style={{ gap: "10rem" }} className="row">
              <div className="col-md-6">
                {cartItems?.products.map((product) => (
                  <div
                    key={product.product._id}
                    className="row mt-3 cart-product"
                  >
                    <div className="col-md-2">
                      <Link to={`/products/${product.product._id}`}>
                        <img
                          className="w-100"
                          src={product.product.imageCover}
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="col-md-10">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <Link
                            to={`/products/${product.product._id}`}
                            className="h4"
                          >
                            {product.product.title
                              .split(" ")
                              .slice(0, 8)
                              .join(" ")}
                          </Link>
                          <h4 className="h6 text-main my-2">
                            {" "}
                            Price {product.price}EGP
                          </h4>

                          <div>
                            <button
                              onClick={() =>
                                updateCartItem(
                                  product.product._id,
                                  product.count + 1
                                )
                              }
                              className="btn bg-main text-white "
                            >
                              +
                            </button>
                            <span className="mx-3 fw-bold">
                              {product.count}
                            </span>
                            <button
                              onClick={() =>
                                product.count > 1 &&
                                updateCartItem(
                                  product.product._id,
                                  product.count - 1
                                )
                              }
                              className="btn bg-main text-white "
                            >
                              -
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeCartItem(product.product._id)}
                          className=" btn p-0"
                        >
                          <i className="fa fa-trash text-danger"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-4 mt-5 pt-5">
                <h4>Cart Sammury</h4>
                <hr />

                {cartItems?.products.map((product) => (
                  <div
                    key={product.product.id}
                    className="d-flex justify-content-between"
                  >
                    {" "}
                    <h5 className="h6">
                      {product.product.title.split(" ").slice(0, 3).join(" ")}
                    </h5>
                    <h5 className="h6 text-end">
                      Price {product.price * product.count}EGP
                    </h5>
                  </div>
                ))}

                <hr />
                <h4 className="h6 text-end fw-bold">
                  Totall Cart price : {cartItems?.totalCartPrice}EGP
                </h4>
                <div className="d-flex justify-content-between mt-3">
                  <button
                    onClick={() => {
                      navigate(`/ordering`);
                    }}
                    className="btn bg-main text-white "
                  >
                    Online Payment
                  </button>
                  <button className="btn bg-main text-white ">
                    Cash On Delivery
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
