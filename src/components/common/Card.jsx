import React from "react";

function Card({ title, children }) {
  return (
    <div className="card">
      <h5 className="card-header">{title}</h5>
      {children}
    </div>
  );
}

export default Card;
