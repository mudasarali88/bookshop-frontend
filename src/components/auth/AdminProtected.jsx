import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../helper/helper";
import AdminDashboard from "../user/dashboard/AdminDashboard";

const AdminProtected = ({ children }) => {
  const user = getCurrentUser();
  const isAdmin = user && user.role === 1;

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (!isAdmin) {
    return <Navigate to="/user/dashboard" />;
  }

  if (children) {
    return children;
  }
  return <AdminDashboard />;
};

export default AdminProtected;
