import React from "react";
import { getCurrentUser } from "../../../helper/helper";
import { NavLink } from "react-router-dom";
import Card from "../../../common/Card";

function ContentLinks(props) {
  const user = getCurrentUser();
  const isAdmin = user && user.role === 1;

  const userLinks = [
    { name: "My Cart", link: "/cart" },
    { name: "Update Profile", link: `/profile/${user._id}` },
  ];
  const adminLinks = [
    { name: "Update Profile", link: `/admin/profile/${user._id}` },
    { name: "Create Category", link: "/create/category" },
    { name: "Create Product", link: "/create/product" },
    { name: "View Orders", link: "/admin/orders" },
    { name: "Manage Products", link: "/admin/products" },
  ];

  const links = isAdmin ? adminLinks : userLinks;
  const title = user.role === 1 ? "Admin Links" : "User Links";

  return (
    <Card title={title}>
      <ul className="list-group">
        {links.map((l) => (
          <li key={l.name} className="list-group-item">
            <NavLink className="nav-link" to={l.link}>
              {l.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default ContentLinks;
