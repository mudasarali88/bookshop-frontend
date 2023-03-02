import React from "react";
import Layout from "../../core/Layout";
import ContentBody from "./dashComponents/ContentBody";
import ContentLinks from "./dashComponents/ContentLinks";

function AdminDashboard(props) {
  return (
    <div>
      <Layout title="Admin Dashboard" description="" className="container mb-3">
        <div className="row">
          <div className="col-4">{<ContentLinks />}</div>
          <div className="col-8">{<ContentBody />}</div>
        </div>
      </Layout>
    </div>
  );
}

export default AdminDashboard;
