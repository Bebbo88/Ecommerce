import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function SharedLayout() {
  return (
    <>
      <div id="root">
        {" "}
        <NavBar />
        <main>
          {" "}
          <div className="container">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
