import React from "react";
import Layout from "../../core/Layout";
import ContentLinks from "./dashComponents/ContentLinks";
import ContentBody from "./dashComponents/ContentBody";

function UserDashboard(props) {
  return (
    <div>
      <Layout title="User Dashboard" description="" className="container mt-5">
        <div className="row">
          <div className="col-4">{<ContentLinks />}</div>
          <div className="col-8">{<ContentBody />}</div>
        </div>
      </Layout>
    </div>
  );
}

export default UserDashboard;
