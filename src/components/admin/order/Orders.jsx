import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout";
import Menu from "../../core/Menu";
import moment from "moment";
import { listOrders, getStatusValues, updateStatusValues } from "../ApiAdmin";

function Orders(props) {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([]);

  const loadOrders = async () => {
    try {
      const { data } = await listOrders();
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  const loadStatus = async () => {
    try {
      const { data } = await getStatusValues();
      setStatus(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadOrders();
    loadStatus();
  }, []);

  const handleStatusChange = async (e, orderId) => {
    try {
      await updateStatusValues(orderId, { status: e.target.value });
      loadOrders();
      console.log("oka");
    } catch (error) {
      console.log(error);
    }
  };

  const showStaus = (o) => {
    return (
      <div className="form-group">
        <h3>Status: {o.status}</h3>
        <select
          className="form-control"
          onChange={(e) => handleStatusChange(e, o._id)}
        >
          <option>Select Status</option>

          {status?.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    );
  };
  return (
    <React.Fragment>
      <Menu />
      <Layout
        title="Manage Orders"
        description="Perform CRUD Operations on orders.."
        className="container-fluid"
      >
        <div className="row">
          {orders && orders.length > 0 ? (
            <h2 className="text-center">Orders : {orders.length}</h2>
          ) : (
            <h2 className="text-center">No Orders</h2>
          )}

          {orders?.map((o, i) => {
            return (
              <div key={i} style={{ borderBottom: "5px solid indigo" }}>
                <h2 className="mt-2">
                  <span className="bg-primary">Order Id :{o._id}</span>
                </h2>
                <ul className="list-group">
                  <li className="list-group-item">{showStaus(o)}</li>
                  <li className="list-group-item">
                    Transaction ID: {o.transaction_Id}
                  </li>
                  <li className="list-group-item">Amount : {o.amount} RS</li>
                  <li className="list-group-item">
                    Ordered By : {o.user.name}
                  </li>
                  <li className="list-group-item">
                    Ordered on : {moment(o.createdAt).from()}
                  </li>
                  <li className="list-group-item">
                    Delivery Address : {o.address}
                  </li>
                </ul>
                <h2 className="mt-2 mb-2 font-italic">
                  Total Products : {o.products.length}
                </h2>
                <ul className="list-group">
                  {o.products?.map((p, pIndex) => (
                    <li key={pIndex} className="list-group-item">
                      <div className="d-flex justify-content-between">
                        <h4>
                          <span className="badge bg-success">
                            Name : {p.name}
                          </span>
                        </h4>
                        <h4>
                          <span className="badge bg-info">
                            Price: {p.price}
                          </span>
                        </h4>
                        <h4>
                          <span className="badge bg-warning">
                            Quantity: {p.count}
                          </span>
                        </h4>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Layout>
    </React.Fragment>
  );
}

export default Orders;
