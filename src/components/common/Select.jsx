import React from "react";

const Select = ({ name, label, categories, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label text-muted">
        {label}
      </label>
      <select {...rest} name={name} id={name} className="form-control">
        <option>Please Select the Category</option>
        {/* <option value="6304ab0316d2ae2972267f55">Node</option>
        <option value="6304ab1116d2ae2972267f59">React</option>
        <option value="6304ab2316d2ae2972267f5f">Java Script</option> */}
        {categories.map((c, i) => (
          <option key={i} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* {error && <div className="alert alert-danger">{error}</div>} */}
    </div>
  );
};

export default Select;
