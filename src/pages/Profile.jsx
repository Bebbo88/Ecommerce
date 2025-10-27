import React, { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { OrderContext } from "../context/OrderContext";
import { WishListContext } from "../context/WishListContext";
import { jwtDecode } from "jwt-decode";
import { BounceLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const { token } = useContext(AuthContext);
  const { numberOfcartItems } = useContext(CartContext);
  const { data: wishlistData } = useContext(WishListContext);
  const { getAllOrders } = useContext(OrderContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userOrders, setUserOrders] = useState([]);

  const fetchUserData = useCallback(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUserData(decoded);

      // Get user orders
      if (decoded.id) {
        getAllOrders(decoded.id).then((res) => {
          if (res?.data?.length > 0) {
            setUserOrders(res.data);
          }
        });
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error decoding token:", error);
      setIsLoading(false);
    }
  }, [token, navigate, getAllOrders]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const getTotalOrders = () => userOrders.length;
  const getTotalSpent = () => {
    return userOrders.reduce(
      (total, order) => total + (order.totalOrderPrice || 0),
      0
    );
  };
  const getWishlistCount = () => wishlistData?.data?.data?.length || 0;

  if (isLoading) {
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
  }

  return (
    <div className="container my-5">
      <div className="row">
        {/* Profile Header */}
        <div className="col-12 mb-4">
          <div
            className="profile-header p-5 text-white"
            style={{
              background:
                "linear-gradient(135deg, rgba(117,52,183,0.85), rgba(160,120,255,0.45))",
              borderRadius: "20px",
              boxShadow: "0 10px 40px rgba(117, 52, 183, 0.3)",
            }}
          >
            <div className="d-flex align-items-center gap-4">
              <div className="profile-picture">
                <img
                  src="/Assets/images/profile.webp"
                  alt="Profile"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    border: "5px solid rgba(255,255,255,0.3)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                  }}
                />
              </div>
              <div className="flex-grow-1">
                <h1 className="display-5 fw-bold mb-2">
                  {userData?.name || "User"}
                </h1>
                <p
                  className="mb-2"
                  style={{ fontSize: "1.1rem", opacity: 0.9 }}
                >
                  <i className="fas fa-envelope me-2"></i>
                  {userData?.email || "user@example.com"}
                </p>
                <p style={{ fontSize: "1rem", opacity: 0.8 }}>
                  <i className="fas fa-phone me-2"></i>
                  {userData?.phone || "No phone number"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="col-lg-3 col-md-6 mb-4">
          <div
            className="stat-card p-4 text-center"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "15px",
              color: "white",
              boxShadow: "0 8px 30px rgba(102, 126, 234, 0.4)",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <i className="fas fa-shopping-cart fa-3x mb-3"></i>
            <h3 className="display-6 fw-bold">{numberOfcartItems}</h3>
            <p className="mb-0">Cart</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div
            className="stat-card p-4 text-center"
            style={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              borderRadius: "15px",
              color: "white",
              boxShadow: "0 8px 30px rgba(245, 87, 108, 0.4)",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <i className="fas fa-heart fa-3x mb-3"></i>
            <h3 className="display-6 fw-bold">{getWishlistCount()}</h3>
            <p className="mb-0">Wishlist</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div
            className="stat-card p-4 text-center"
            style={{
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              borderRadius: "15px",
              color: "white",
              boxShadow: "0 8px 30px rgba(79, 172, 254, 0.4)",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <i className="fas fa-shopping-bag fa-3x mb-3"></i>
            <h3 className="display-6 fw-bold">{getTotalOrders()}</h3>
            <p className="mb-0">Orders</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div
            className="stat-card p-4 text-center"
            style={{
              background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
              borderRadius: "15px",
              color: "white",
              boxShadow: "0 8px 30px rgba(250, 112, 154, 0.4)",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <i className="fas fa-dollar-sign fa-3x mb-3"></i>
            <h3 className="display-6 fw-bold">{getTotalSpent().toFixed(0)}</h3>
            <p className="mb-0">Total Spent</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-12 mb-4">
          <div
            className="p-4"
            style={{
              background: "white",
              borderRadius: "15px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h3 className="fw-bold mb-4 text-main">
              <i className="fas fa-bolt me-2"></i>Quick Actions
            </h3>
            <div className="row g-3">
              <div className="col-md-4">
                <Link to="/cart" className="text-decoration-none">
                  <div
                    className="action-btn p-3 text-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(117,52,183,0.1), rgba(160,120,255,0.1))",
                      borderRadius: "10px",
                      border: "2px solid rgba(117,52,183,0.2)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, rgba(117,52,183,0.2), rgba(160,120,255,0.2))";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, rgba(117,52,183,0.1), rgba(160,120,255,0.1))";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <i className="fas fa-cart-shopping fa-2x text-main mb-2"></i>
                    <p className="mb-0 fw-bold text-dark">View Cart</p>
                  </div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/wishlist" className="text-decoration-none">
                  <div
                    className="action-btn p-3 text-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(117,52,183,0.1), rgba(160,120,255,0.1))",
                      borderRadius: "10px",
                      border: "2px solid rgba(117,52,183,0.2)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, rgba(117,52,183,0.2), rgba(160,120,255,0.2))";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, rgba(117,52,183,0.1), rgba(160,120,255,0.1))";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <i className="fas fa-heart fa-2x text-danger mb-2"></i>
                    <p className="mb-0 fw-bold text-dark">Wishlist</p>
                  </div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/allorders" className="text-decoration-none">
                  <div
                    className="action-btn p-3 text-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(117,52,183,0.1), rgba(160,120,255,0.1))",
                      borderRadius: "10px",
                      border: "2px solid rgba(117,52,183,0.2)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, rgba(117,52,183,0.2), rgba(160,120,255,0.2))";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, rgba(117,52,183,0.1), rgba(160,120,255,0.1))";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <i className="fas fa-box fa-2x text-main mb-2"></i>
                    <p className="mb-0 fw-bold text-dark">My Orders</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="col-12">
          <div
            className="p-4"
            style={{
              background: "white",
              borderRadius: "15px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h3 className="fw-bold mb-4 text-main">
              <i className="fas fa-history me-2"></i>Recent Orders
            </h3>
            {userOrders.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userOrders.slice(0, 5).map((order) => (
                      <tr key={order._id}>
                        <td>{order._id.slice(-8)}</td>
                        <td>{new Date(order.paidAt).toLocaleDateString()}</td>
                        <td>
                          <span
                            className="badge"
                            style={{
                              background: order.isDelivered
                                ? "linear-gradient(135deg, #28a745, #20c997)"
                                : "linear-gradient(135deg, #ffc107, #ff9800)",
                              color: "white",
                            }}
                          >
                            {order.isDelivered ? "Delivered" : "Processing"}
                          </span>
                        </td>
                        <td className="fw-bold text-main">
                          {order.totalOrderPrice} EGP
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted text-center py-4">
                <i className="fas fa-inbox fa-3x mb-3"></i>
                <br />
                No orders yet. Start shopping!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
