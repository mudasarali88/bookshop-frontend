import React, { useState, useEffect } from "react";
import { pricess } from "./priceRanges";

function RadioBtn({ pricess, handleFilters }) {
  const [price, setPrice] = useState([]);
  const handleChange = (e) => {
    let priceArray = [];
    for (let key in pricess) {
      if (pricess[key]._id == e.target.value) {
        priceArray = pricess[key].array;
        setPrice(priceArray);
      }
    }
    handleFilters(priceArray);
  };

  return pricess.map((p, i) => (
    <li key={i} className="list-unstyled">
      <input
        onChange={handleChange}
        value={p._id}
        name={p}
        className="form-check-input mx-2"
        type="radio"
      />
      <label className="form-check-label">{p.name}</label>
    </li>
  ));
}

export default RadioBtn;
