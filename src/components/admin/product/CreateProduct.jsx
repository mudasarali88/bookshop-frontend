import React from "react";
import ProductForm from "./ProductForm";
import Layout from "../../core/Layout";

import { NavLink } from "react-router-dom";

function CreateProduct(props) {
  return (
    <div>
      <Layout
        title="Product"
        description="Let's Create a New Product.."
        className="container col-md-8 offset-md-2"
      >
        <ProductForm />
        <br />
        <NavLink style={{ textDecoration: "none" }} to="/admin/dashboard">
          Back to DashBoard
        </NavLink>
      </Layout>
    </div>
  );
}

export default CreateProduct;
