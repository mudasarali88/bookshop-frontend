import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cart/cartHelper";

function ProductCard({
  product,
  viewProductBtn = true,
  viewCartBtn = true,
  viewRemoveBtn = false,
  moreInfo = false,
  update = false,
}) {
  const [count, setCount] = useState(product.count);

  const productInfo = (product) => {
    return (
      <div>
        <p className="lead">
          Category = {product.category && product.category.name}
        </p>
        <p className="lead">Added on {moment(product.createdAt).fromNow()}</p>
        <div>
          {product.quantity > 0 ? (
            <span className="mb-2 badge bg-primary">In Stock</span>
          ) : (
            <span className="mb-2 badge bg-danger">Out of Stock</span>
          )}
        </div>
      </div>
    );
  };

  const addToCart = () => {
    addItem(product);
  };

  const cartUpdate = (id) => (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">Adjust Quantity</span>
      </div>
      <input
        type="number"
        className="form-control"
        value={count}
        onChange={handleChange(id)}
      />
    </div>
  );
  const handleChange = (id) => (e) => {
    setCount(e.target.value < 1 ? 1 : e.target.value);
    updateItem(id, e.target.value);
  };

  return (
    <div className="my-3">
      <div className="card">
        <div className="card-header">{product.name}</div>
        <div className="card-body">
          <p className="lead"> {product.description}</p>
          <p className="lead">Price = {product.price}</p>
          {moreInfo && productInfo(product)}
          {update && cartUpdate(product._id)}

          <div className="mb-3">
            <img
              alt={product.name}
              src={product && product.photo && product.photo.url}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
          {viewProductBtn && (
            <Link to={`/singleProduct/${product._id}`}>
              <button className="btn btn-outline-primary mx-2">
                View Product
              </button>
            </Link>
          )}
          {viewCartBtn && product.quantity > 0 && (
            <Link to="/cart">
              <button onClick={addToCart} className="btn btn-outline-warning">
                Add to Cart
              </button>
            </Link>
          )}
          {viewRemoveBtn && (
            <button
              onClick={() => {
                removeItem(product._id);
                window.location = "/cart";
              }}
              className="ml-2 btn btn-outline-danger"
            >
              Remove Product
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
