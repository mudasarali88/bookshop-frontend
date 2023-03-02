import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../helper/helper";
import DropIn from "braintree-web-drop-in-react";
import { ShowError, ShowSuccess } from "../../helper/helper";
import { emptyCart } from "./cartHelper";
import { getBraintreeToken, processPayment, createOrder } from "../Api";

function Checkout({ products }) {
  const [data, setData] = useState({
    success: false,
    showSuccess: false,
    error: "",
    clientToken: null,
    instance: {},
    address: "",
  });

  const getToken = async () => {
    try {
      const { data } = await getBraintreeToken();
      setData({ ...data, clientToken: data.clientToken });
    } catch (err) {
      setData({ ...data, error: err });
    }
  };
  useEffect(() => {
    if (user) {
      getToken();
    }
  }, []);
  const user = getCurrentUser();
  const getTotal = () => {
    return products.reduce((currentVal, nextVal) => {
      return currentVal + nextVal.count * nextVal.price;
    }, 0);
  };
  const showCheckout = () => {
    return user ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Signin to Checkout</button>
      </Link>
    );
  };
  const handleClick = async () => {
    try {
      const { nonce } = await data.instance.requestPaymentMethod();
      const paymentData = { nonce, amount: getTotal() };
      const res = await processPayment(paymentData);
      const orderData = {
        order: {
          products: products,
          amount: res.data.transaction.amount,
          transaction_Id: res.data.transaction.id,
          address: data.address,
        },
      };
      setData({ ...data, showSuccess: res.data.success, error: "" });
      emptyCart();
      await createOrder(orderData);
    } catch (err) {
      setData({ ...data, error: err.message, success: false });
    }
  };

  const handleChange = (e) => {
    setData({ ...data, address: e.target.value });
  };

  const showDropIn = () => (
    <div>
      {data.clientToken !== null ? (
        <div>
          <div>
            <label className="mb-2" htmlFor="address">
              Delivery Address
            </label>
            <textarea
              placeholder="Type your delivery address..."
              className="form-control"
              onChange={handleChange}
              name="address"
              id="address"
            ></textarea>
          </div>
          <DropIn
            options={{
              authorization: data.clientToken,
              // paypal: { flow: "vault" },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={handleClick} className="btn btn-primary">
            Pay Amount
          </button>
        </div>
      ) : (
        <Link to="/shop">
          <button className="btn btn-primary">Add Products</button>
        </Link>
      )}
    </div>
  );

  return (
    <div>
      <ShowError error={data.error} />
      <ShowSuccess
        success={data.showSuccess}
        successMessage="Transection Successful"
      />
      <h3 className="mt-5">Total: {getTotal()} Rs</h3>
      {getTotal() > 0 && showCheckout()}
    </div>
  );
}

export default Checkout;
