import { createRoot } from "react-dom/client";
import MainLayout from "./layout/MainLayout.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../src/main.css";
import { Toaster } from "react-hot-toast";

import UserContextProvider from "./context/UserContext.jsx";
import CartContextProvider from "./context/CartContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BrandContextProvider from "./context/BrandContext.jsx";
import ProductContextProvider from "./context/ProductContext.jsx";
import WishListContextProvider from "./context/WishListContext.jsx";
import CategoryContextProvider from "./context/CategoryContext.jsx";
import OrderContextProvider from "./context/OrderContext.jsx";
import ForgetPasswordContextProvider from "./context/ForgetPasswordContext.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";

const client = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={client}>
    <UserContextProvider>
      <AuthContextProvider>
        <ProductContextProvider>
          <BrandContextProvider>
            <CartContextProvider>
              <WishListContextProvider>
                <CategoryContextProvider>
                  <OrderContextProvider>
                    <ForgetPasswordContextProvider>
                      <MainLayout />
                      <Toaster />
                    </ForgetPasswordContextProvider>
                  </OrderContextProvider>
                </CategoryContextProvider>
              </WishListContextProvider>
            </CartContextProvider>
          </BrandContextProvider>
        </ProductContextProvider>
      </AuthContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
);
