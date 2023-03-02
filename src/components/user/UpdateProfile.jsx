import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "../core/Menu";
import Input from "../common/Input";
import Layout from "../core/Layout";
import { getCurrentUser } from "../helper/helper";
import { saveTokenLS } from "../helper/helper";
import { updateUser } from "./apiUser";

function UpdateProfile(props) {
  const user = getCurrentUser();
  const { userId } = useParams();
  const [values, setValues] = useState({
    name: user.name,
    email: user.email,
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateUser(userId, { name, email, password });
    const { user } = res.data;
    console.log(user);
    setValues({
      ...values,
      name: user.name,
      email: user.email,
      password: user.password,
    });
    saveTokenLS(res.headers["x-auth-token"]);
    window.location = "/user/dashboard";
  };

  const profileForm = () => (
    <form onSubmit={handleSubmit} className="mt-3">
      <Input
        name="name"
        label="Name"
        value={name}
        onChange={handleChange("name")}
      />
      <Input
        name="email"
        label="Email"
        value={email}
        onChange={handleChange("email")}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        value={password}
        onChange={handleChange("password")}
      />
      <div className="mt-3">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
  return (
    <React.Fragment>
      <Menu />
      <Layout
        title="Update Profile"
        description="Make Changings to your profile.."
        className="container col-md-8 offset-md-2"
      >
        <div className="row">
          <h2>Profile</h2>
          {profileForm()}
        </div>
      </Layout>
    </React.Fragment>
  );
}

export default UpdateProfile;
