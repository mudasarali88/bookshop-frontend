import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CategoryForm from "./CategoryForm";
import Layout from "../../core/Layout";
import { ShowError } from "../../helper/helper";
import { ShowSuccess } from "../../helper/helper";
import http from "../../../services/httpService";

import { getCurrentUser } from "../../helper/helper";
import { API } from "../../../config";

function CreateCategory(props) {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
  });

  const { name, error, success } = values;

  const user = getCurrentUser();
  const str = localStorage.getItem("jwt");

  // to remove  double quotes from the sring
  const token = str.replace(/^"(.+(?="$))"$/, "$1");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const bodyParameters = {
    name,
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // http post request
    try {
      await http.post(
        `${API}/category/create/${user._id}`,
        bodyParameters,
        config
      );
      setValues({ ...values, error: false, success: true });
    } catch (ex) {
      if (ex) {
        console.log(ex.response);
        setValues({ ...values, error: ex.response.data, success: false });
      }
    }
  };
  return (
    <div>
      <Layout
        title="Category"
        description="Let's Create a New Category.."
        className="container col-md-8 offset-md-2"
      >
        <ShowError error={error} />
        <ShowSuccess
          success={success}
          successMessage="New Category Created.."
        />
        <CategoryForm
          name="category"
          label="Category"
          value={name}
          onChange={handleChange("name")}
          onSubmit={handleSubmit}
        />
        <br />
        <NavLink style={{ textDecoration: "none" }} to="/admin/dashboard">
          Back to DashBoard
        </NavLink>
      </Layout>
    </div>
  );
}

export default CreateCategory;
