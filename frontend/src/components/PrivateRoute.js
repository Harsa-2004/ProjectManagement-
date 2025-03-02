import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, allowedRoles }) => {
  const userRole = localStorage.getItem("role"); // Get role from local storage

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />; // Redirect to Unauthorized page
  }

  return element;
};

export default PrivateRoute;
