import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { BrandContext } from "../context/BrandContext";
import { motion } from "framer-motion";

export default function Brands() {
  const { brands, isLoading } = useContext(BrandContext);

  // Animation container (to stagger child animations)
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  // Animation for each brand image
  const item = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    },
  };

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
    <div className="container">
      <motion.div
        className="row justify-content-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {brands?.map((brand) => (
          <motion.div
            className="col-md-3 col-sm-6 my-3 d-flex justify-content-center"
            key={brand._id}
            variants={item}
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <Link
              to={`/brands/${brand._id}`}
              className="w-100 d-block"
              style={{ textDecoration: "none" }}
            >
              <motion.img
                className="w-100 shadow-sm"
                src={brand.image}
                alt={brand.name}
                style={{
                  borderRadius: "12px",
                  objectFit: "cover",
                  height: "250px",
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
