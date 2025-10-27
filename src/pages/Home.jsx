import React, { useState } from "react";
import MainSlider from "../components/MainSlider";
import CategorySlider from "../components/CategorySlider";
import Products from "../components/Products";
import { CartContext } from "../context/CartContext";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  const handleCategorySelect = (categoryId, categoryName) => {
    if (categoryId === selectedCategory) {
      setSelectedCategory(null);
      setSelectedCategoryName("");
    } else {
      setSelectedCategory(categoryId);
      setSelectedCategoryName(categoryName);
    }
  };

  const handleClearFilter = () => {
    setSelectedCategory(null);
    setSelectedCategoryName("");
  };

  return (
    <>
      <MainSlider />
      <CategorySlider
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />
      <Products
        selectedCategory={selectedCategory}
        selectedCategoryName={selectedCategoryName}
        onClearFilter={handleClearFilter}
      />
    </>
  );
}
