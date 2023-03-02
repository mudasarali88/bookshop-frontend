import React from "react";
import { Navigate } from "react-router-dom";
import http from "../../../services/httpService";
import { API } from "../../../config";

const SignOut = () => {
  localStorage.removeItem("jwt");
  window.location = "/";
  return <Navigate to="/signin" />;
};

export default SignOut;
