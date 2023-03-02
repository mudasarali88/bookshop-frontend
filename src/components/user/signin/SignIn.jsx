import React from "react";
import Layout from "../../core/Layout";
import SignInForm from "./SignInForm";

function SignIn(props) {
  return (
    <div>
      <Layout
        title="SignIn Form"
        description="Signin for  E-Commerce Book Shop.."
        className="container col-md-8 offset-md-2"
      >
        {SignInForm()}
      </Layout>
    </div>
  );
}

export default SignIn;
