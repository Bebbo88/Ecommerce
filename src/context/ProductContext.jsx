import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const ProductContext = createContext();
export default function ProductContextProvider(props) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  async function getAllProducts() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(data?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <ProductContext.Provider
        value={{
          products,
          isLoading,
          getAllProducts,
          filteredProducts,
          setFilteredProducts,
        }}
      >
        {props.children}
      </ProductContext.Provider>
    </>
  );
}
