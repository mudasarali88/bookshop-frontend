import React, { useState } from "react";

import http from "../../../services/httpService";
import Input from "../../common/Input";
import { ShowSuccess, ShowError } from "../../helper/helper";

import { API } from "../../../config";

function SignUpForm(props) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: "", [name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reponse = await http.post(`${API}/signup`, {
        name,
        email,
        password,
      });

      setValues({ ...values, error: "", success: true });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response);
        setValues({ ...values, error: ex.response.data, success: false });
      }
    }
  };

  return (
    <React.Fragment>
      <ShowError error={error} />
      <ShowSuccess
        success={success}
        label="SignIn"
        link="/signin"
        successMessage="Account Successfully Created.."
      />
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
          value={password}
          onChange={handleChange("password")}
        />

        <div className="mt-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}

export default SignUpForm;
