import React from "react";
import MainSlider from "../components/MainSlider";
import CategorySlider from "../components/CategorySlider";
import Products from "../components/Products";
import { CartContext } from "../context/CartContext";

export default function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <Products />
    </>
  );
}
