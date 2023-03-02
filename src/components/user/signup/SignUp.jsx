import Layout from "../../core/Layout";
import SignUpForm from "./SignUpForm";

function SignUp(props) {
  return (
    <div>
      <Layout
        title="SignUp Form"
        description="Signup for  E-Commerce Book Shop.."
        className="container col-md-8 offset-md-2"
      >
        {<SignUpForm />}
      </Layout>
    </div>
  );
}

export default SignUp;
