import React from "react";
import UpdateProductForm from "./UpdateProductForm";
import Layout from "../../core/Layout";

import { NavLink } from "react-router-dom";

function UpdateProduct(props) {
  return (
    <div>
      <Layout
        title="Product"
        description="Let's Update Product.."
        className="container col-md-8 offset-md-2"
      >
        <UpdateProductForm />
        <br />
        <NavLink style={{ textDecoration: "none" }} to="/admin/products">
          Back to Products
        </NavLink>
      </Layout>
    </div>
  );
}

export default UpdateProduct;
