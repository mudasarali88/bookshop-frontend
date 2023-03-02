import React from "react";

const TextArea = ({ name, label, onChange, value, type = "text" }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label text-muted">
        {label}
      </label>
      <textarea
        onChange={onChange}
        type={type}
        className="form-control"
        id={name}
        value={value}
      />
    </div>
  );
};

export default TextArea;
