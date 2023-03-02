import React, { Fragment } from "react";
import Input from "../../common/Input";

function CategoryForm({ name, label, value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="mt-2">
      <div>
        <Input name={name} label={label} value={value} onChange={onChange} />
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Create
      </button>
    </form>
  );
}

export default CategoryForm;
