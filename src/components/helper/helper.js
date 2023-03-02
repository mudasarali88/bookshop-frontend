import { Link, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const ShowError = ({ error }) => {
  return (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
};

export const ShowSuccess = ({ success, successMessage }) => {
  return (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      {successMessage}
    </div>
  );
};

export const RedirectUser = ({ redirect }) => {
  if (redirect) return <Navigate to="/" />;
};

export function getCurrentUser() {
  try {
    const jwtToken = localStorage.getItem("jwt");
    return jwtDecode(jwtToken);
  } catch (error) {
    return null;
  }
}

export const saveTokenLS = (data) => {
  localStorage.setItem("jwt", JSON.stringify(data));
};
