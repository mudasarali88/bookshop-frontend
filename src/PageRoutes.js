import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "./components/user/signin/SignIn";
import Signup from "./components/user/signup/SignUp";
import Signout from "./components/user/signout/SignOut";
import Menu from "./components/core/Menu";
import NotFound from "./components/core/NotFound";
import Protected from "./components/auth/Protected";
import AdminProtected from "./components/auth/AdminProtected";

import CreateCategory from "./components/admin/category/CreateCategory";
import CreateProduct from "./components/admin/product/CreateProduct";
import UpdateProduct from "./components/admin/product/UpdateProduct";

import Home from "./components/core/Home";
import Shop from "./components/core/Shop";
import Cart from "./components/core/cart/Cart";

import SingleProduct from "./components/core/SingleProduct";
import ManageProducts from "./components/admin/product/ManageProducts";
import Orders from "./components/admin/order/Orders";
import UpdateProfile from "./components/user/UpdateProfile";

const PageRoutes = (props) => {
  return (
    <Fragment>
      <Menu />

      <Routes>
        <Route
          path="/singleProduct/:productId"
          exact
          element={<SingleProduct />}
        />
        <Route path="/" exact element={<Home />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/shop" exact element={<Shop />} />
        <Route path="/signin" exact element={<Signin />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/signout" exact element={<Signout />} />
        <Route
          path="/profile/:userId"
          exact
          element={<Protected children={<UpdateProfile />} />}
        />
        <Route path="/user/dashboard" exact element={<Protected />} />

        <Route path="/admin/dashboard" exact element={<AdminProtected />} />
        <Route
          path="/create/category"
          exact
          element={<AdminProtected children={<CreateCategory />} />}
        />
        <Route
          path="/admin/update/product/:productId"
          exact
          element={<AdminProtected children={<UpdateProduct />} />}
        />
        <Route
          path="/admin/profile/:userId"
          exact
          element={<AdminProtected children={<UpdateProfile />} />}
        />
        <Route
          path="/create/product"
          exact
          element={<AdminProtected children={<CreateProduct />} />}
        />
        <Route
          path="/admin/products"
          exact
          element={<AdminProtected children={<ManageProducts />} />}
        />
        <Route
          path="/admin/orders"
          exact
          element={<AdminProtected children={<Orders />} />}
        />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
};

export default PageRoutes;
