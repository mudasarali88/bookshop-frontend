import React from "react";
import "../../../src/styles.css";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => {
  return (
    <div className="py-2">
      <div className="rounded layoutAnimation">
        <div className="mt-5 mb-3 jumbotron">
          <h1 className="mx-2">{title}</h1>
          <p className=" mx-5 lead">{description}</p>
        </div>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Layout;
