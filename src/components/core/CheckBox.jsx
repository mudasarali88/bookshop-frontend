import React, { useEffect, useState } from "react";

function CheckBox({ categories, handleFilters }) {
  const [checked, setChecked] = useState([]);

  const handleChange = (c) => () => {
    const currentCat = checked.indexOf(c);
    const newCat = [...checked];

    if (currentCat === -1) {
      newCat.push(c);
    } else {
      newCat.splice(currentCat, 1);
    }
    // console.log(newCat);
    setChecked(newCat);
    handleFilters(newCat);
  };

  return categories.map((c, i) => (
    <li key={i} className="list-unstyled">
      <input
        onChange={handleChange(c._id)}
        className="form-check-input mx-2"
        type="checkbox"
      />
      <label className="form-check-label">{c.name}</label>
    </li>
  ));
}

export default CheckBox;
