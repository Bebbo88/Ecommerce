import React, { useContext, useEffect } from "react";
import { CategoryContext } from "../context/CategoryContext";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { motion } from "framer-motion";

export default function Categories() {
  let { data, isLoading } = useContext(CategoryContext);

  if (isLoading)
    return (
      <div
        className="loading d-flex justify-content-center align-items-center"
        style={{
          height: "100vh",
          background: "rgba(0, 0, 0, 0.05)",
        }}
      >
        <BounceLoader color="#7534b7" size={120} />
      </div>
    );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="container">
        <motion.div
          className="row"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            className="fw-bold text-center mt-5 py-3 px-4"
            style={{
              fontSize: "2.5rem",
              color: "#fff",
              letterSpacing: "2px",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, rgba(117,52,183,0.85), rgba(160,120,255,0.45))",
              backdropFilter: "blur(5px)",
              boxShadow: "0 4px 20px rgba(117, 52, 183, 0.3)",
            }}
            initial="hidden"
            animate="visible"
          >
            <Typewriter
              options={{
                strings: ["Categories ..."],
                autoStart: true,
                loop: true,
                delay: 90,
                deleteSpeed: 60,
                pauseFor: 1800,
              }}
            />
          </motion.h1>

          {data?.data?.data?.map((category) => (
            <motion.div
              className="product col-md-3 my-3"
              key={category._id}
              variants={item}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <Link to={`/categories/${category._id}`}>
                <img
                  className="w-100 h-100"
                  src={category.image}
                  alt={category.name}
                  style={{ borderRadius: "10px" }}
                />
                <h3 className="font-sm text-main fw-bold">{category.name}</h3>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
