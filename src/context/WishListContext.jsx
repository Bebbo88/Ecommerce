import axios from "axios";
import React, { createContext, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const WishListContext = createContext();

export default function WishListContextProvider(props) {
  let { token } = useContext(AuthContext);
  const queryClient = useQueryClient();

  function addToWishList(id) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: id },
        { headers: { token } }
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res?.data.message);
        } else if (!token) {
          toast.error("You must have an acount before adding");
        } else {
          toast.error(res?.data.message);
        }
      })
      .catch((err) => err);
  }

  async function getLoggedWishList() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token },
      })
      .then((res) => res)
      .catch((err) => err);
  }
  async function deleteFromWishList(id) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: { token },
      })
      .then((res) => res)
      .catch((err) => err);
  }
  const { mutate: addItemToWishList, isPending: isAdding } = useMutation({
    mutationFn: (id) => addToWishList(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["getLoggedWishList"]);
    },
  });

  const { mutate: deleteItemFromWishList, isPending } = useMutation({
    mutationFn: (id) => deleteFromWishList(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["getLoggedWishList"]);
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["getLoggedWishList", token],
    queryFn: getLoggedWishList,
    enabled: !!token,
  });

  return (
    <>
      <WishListContext.Provider
        value={{
          addItemToWishList,
          isAdding,
          data,
          isLoading,
          isPending,
          deleteItemFromWishList,
        }}
      >
        {props.children}
      </WishListContext.Provider>
    </>
  );
}
