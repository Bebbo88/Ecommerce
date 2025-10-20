import axios from "axios";
import React, { createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const OrderContext = createContext();
const FRONTEND_URL = window.location.origin;

export default function OrderContextProvider(props) {
  let { token } = useContext(AuthContext);

  function onlinePayment(id, values) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${FRONTEND_URL}`,
        { shippingAddress: values },
        { headers: { token } }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function getAllOrders(id) {
    if (!token) return;
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      .then((res) => res)
      .catch((err) => err);
  }
  return (
    <>
      <OrderContext.Provider value={{ onlinePayment, getAllOrders }}>
        {props.children}
      </OrderContext.Provider>
    </>
  );
}
