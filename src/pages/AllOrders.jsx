import React, { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { BounceLoader } from "react-spinners";
import { AuthContext } from "../context/AuthContext";

export default function AllOrders() {
  let { token } = useContext(AuthContext);
  const decode = token ? jwtDecode(token) : "";
  let { getAllOrders } = useContext(OrderContext);
  let { data, isLoading } = useQuery({
    queryKey: ["getAllOrders", decode.id],
    queryFn: () => getAllOrders(decode.id),
    enabled: !!decode.id,
  });

  if (isLoading)
    return (
      <div
        className="loading d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <BounceLoader color="#7534b7" size={120} />
      </div>
    );

  return (
    <>
      <div className=" text-center my-5">
        <h1 className=" text-main fw-bold">All your Orders ...</h1>
      </div>

      <div style={{ gap: "10rem" }} className="row justify-content-center">
        {data?.data.map((order) => (
          <div className=" col-md-4 cart-product " key={order.id}>
            {order.cartItems.map((item) => (
              <div
                key={item._id}
                className="row justify-content-between align-items-center"
              >
                <div className="col-md-3 p-2">
                  <img className="w-100" src={item.product.imageCover} alt="" />
                </div>
                <div className="col-md-6">
                  <h4 className="h6">{item.product.title}</h4>
                  <h4 className="h6">Price: {item.price}EGP</h4>
                </div>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between mt-5">
              <h4 className="h6">
                Date: {order.paidAt.split("T").slice(0, 1).join("")}
              </h4>
              <h4 className="h6 text-main">
                {" "}
                Totall Price {order.totalOrderPrice}EGP
              </h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
