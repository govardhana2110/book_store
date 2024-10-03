import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
const PrivateRoute = ({ children }) => {
  const token = Cookies.get("authToken");
  if (!token) return <Navigate to="/login" replace></Navigate>;
  else return children;
};
export default PrivateRoute;
