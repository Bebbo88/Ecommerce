import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute(props) {
  let { token } = useContext(AuthContext);

  if (token !== null) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
