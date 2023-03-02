import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../helper/helper";
import UserDashboard from "../user/dashboard/UserDashboard";

const Protected = ({ children }) => {
  const user = getCurrentUser();
  const isAdmin = user && user.role === 1;

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (isAdmin) {
    return <Navigate to="/admin/dashboard" />;
  }

  if (children) {
    return children;
  }
  return <UserDashboard />;
};

export default Protected;
