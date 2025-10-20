import axios from "axios";
import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export default function CartContextProvider(props) {
  const [numberOfcartItems, setNumberOfCartItems] = useState(0);
  const { token } = useContext(AuthContext);

  function getUserLoggedItems() {
    if (!token) return;

    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token },
      })
      .then((res) => {
        setNumberOfCartItems(res.data.numOfCartItems);
        return res;
      })
      .catch((err) => err);
  }
  function addToCart(id) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: id },
        { headers: { token } }
      )
      .then((res) => {
        setNumberOfCartItems(res.data.numOfCartItems);
        localStorage.setItem("cartId", res.data.data._id);

        return res;
      })
      .catch((err) => err);
  }
  async function getCartIdFromServer(token) {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers: { token } }
      );

      if (data?.data?._id) {
        localStorage.setItem("cartId", data.data._id);
        console.log("Cart ID saved:", data.data._id);
      } else {
        localStorage.removeItem("cartId");
      }
    } catch (err) {
      console.log("Error getting cart:", err);
      localStorage.removeItem("cartId");
    }
  }
  function updateCart(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        { headers: { token } }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function removeItem(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: { token },
      })
      .then((res) => res)
      .catch((err) => err);
  }
  function clearCart() {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token },
      })
      .then((res) => res)
      .catch((err) => err);
  }
  return (
    <CartContext.Provider
      value={{
        addToCart,
        getUserLoggedItems,
        updateCart,
        removeItem,
        clearCart,
        setNumberOfCartItems,
        numberOfcartItems,
        getCartIdFromServer,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
