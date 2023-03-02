import React, { Fragment, useState, useEffect } from "react";
import Card from "../../../common/Card";

import { getCurrentUser } from "../../../helper/helper";
import { purchaseHistory } from "../../apiUser";

function ContentBody(props) {
  const [history, setHistory] = useState([]);

  const init = async () => {
    const { data } = await purchaseHistory();
    setHistory(data);
  };

  useEffect(() => {
    init();
  }, []);
  const user = getCurrentUser();
  const isAdmin = user && user.role === 1;
  const title = user.role === 1 ? "Admin Information" : "User Information";
  const userRole = user.role === 1 ? "Admin" : "Registered User";

  const userInfo = [
    { keys: `${user.name}` },
    { keys: `${user.email}` },
    { keys: `${userRole}` },
  ];
  const adminInfo = [
    { keys: `${user.name}` },
    { keys: `${user.email}` },
    { keys: `${userRole}` },
  ];
  const info = isAdmin ? adminInfo : userInfo;

  return (
    <Fragment>
      <div>
        <Card title={title}>
          <ul className="list-group">
            {info.map((i) => (
              <li key={i.keys} className="list-group-item">
                {i.keys}
              </li>
            ))}
          </ul>
        </Card>
      </div>
      {history && (
        <div className="mt-5">
          <Card title="Purchase History">
            <ul className="list-group">
              {history.map((h, i) => {
                return (
                  <div key={i} style={{ borderBottom: "3px solid black" }}>
                    <li className="list-group-item"> Status : {h.status}</li>
                    {h.products?.map((p, i) => (
                      <li
                        key={i}
                        className="d-flex justify-content-between list-group-item"
                      >
                        <span>Name : {p.name}</span>
                        <span>Price : {p.price}</span>
                        <span>Quantity : {p.count}</span>
                      </li>
                    ))}
                  </div>
                );
              })}
            </ul>
          </Card>
        </div>
      )}
    </Fragment>
  );
}

export default ContentBody;
