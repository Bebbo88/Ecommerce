import React, { useContext, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SharedLayout from "../layout/SharedLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";
import OrderShipped from "../pages/OrderShipped";
import Profile from "../pages/Profile";
import { UserContext } from "../context/UserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ProductsPage from "../pages/ProductsPage";
import Brands from "../pages/Brands";
import BrandProducts from "../pages/BrandProducts";
import NotFoundPage from "../pages/NotFoundPage404";
import WishList from "../pages/WishList";
import Categories from "../pages/Categories";
import CategoryProducts from "../pages/CategoryProducts";
import AllOrders from "../pages/AllOrders";
import AllProducts from "../pages/AllProducts";

let router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/products",
        element: (
          <ProtectedRoute>
            <AllProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "/products/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "/brands/:id",
        element: (
          <ProtectedRoute>
            <BrandProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "/ordering",
        element: (
          <ProtectedRoute>
            <OrderShipped />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            {" "}
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "/categories/:id",
        element: (
          <ProtectedRoute>
            <CategoryProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "/allproducts",
        element: (
          <ProtectedRoute>
            <AllProducts />
          </ProtectedRoute>
        ),
      },

      {
        path: "/allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
export default function MainLayout() {
  const { setUserToken } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("UserToken") !== null) {
      setUserToken(localStorage.getItem("UserToken"));
    }
  }, []);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
