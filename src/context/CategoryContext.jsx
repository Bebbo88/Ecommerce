import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CategoryContext = createContext();

export default function CategoryContextProvider(props) {
  const { token } = useContext(AuthContext);
  async function getAllCategories() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => res)
      .catch((err) => err);
  }
  async function getSpecificCategoryProducts(id) {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`)
      .then((res) => res)
      .catch((err) => err);
  }

  let { data, isLoading } = useQuery({
    queryKey: ["getAllCategories"],
    queryFn: getAllCategories,
    enabled: !!token,
  });

  return (
    <>
      <CategoryContext.Provider
        value={{ data, isLoading, getSpecificCategoryProducts }}
      >
        {props.children}
      </CategoryContext.Provider>
    </>
  );
}
