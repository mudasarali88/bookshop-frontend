import React, { useEffect, useState } from "react";
import { cartItems } from "./cartHelper";
import Menu from "../Menu";
import Layout from "../Layout";
import ProductCard from "../ProductCard";
import Checkout from "./Checkout";

function Cart(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(cartItems());
  }, []);
  return (
    <React.Fragment>
      <Menu />
      <Layout
        title="Shopping Cart"
        description="Add, Remove & Update Products in the Cart.."
        className="container-fluid"
      >
        <div className="row">
          <div className="col-6">
            <h2>You have {items && items.length} items in your cart</h2>
            {items?.map((item, i) => (
              <ProductCard
                key={i}
                product={item}
                viewProductBtn={false}
                viewCartBtn={false}
                viewRemoveBtn={true}
                moreInfo={true}
                update={true}
              />
            ))}
          </div>
          <div className="col-6">
            <h2>Cart Summary</h2>
            <Checkout products={items} />
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
}

export default Cart;
