import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../core/Layout";
import Menu from "../../core/Menu";
import { getProducts, deleteProduct } from "../ApiAdmin";

function ManageProducts(props) {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const { data } = await getProducts();
    setProducts(data);
  };
  const delProduct = async (productId) => {
    await deleteProduct(productId);
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);
  return (
    <React.Fragment>
      <Menu />
      <Layout
        title="Manage Products"
        description="Perform CRUD Operations on Products.."
        className="container-fluid"
      >
        <div className="row">
          <h2 className="text-center">Total Products: {products.length}</h2>
          <div className="col-12">
            <ul className="list-group">
              {products?.map((p, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {p.name}
                  <Link to={`/admin/update/product/${p._id}`}>
                    <button className="btn btn-warning">Update</button>
                  </Link>
                  <button
                    onClick={() => {
                      delProduct(p._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
}

export default ManageProducts;
