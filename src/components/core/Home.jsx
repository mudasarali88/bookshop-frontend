import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import Search from "./Search";
import { getProducts } from "./Api";
import Layout from "./Layout";
import ProductCard from "./ProductCard";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);

  const soldProducts = async () => {
    const { data } = await getProducts("sold");

    setProductsBySell(data);
  };
  const newProducts = async () => {
    const { data } = await getProducts("createdAt");

    setProductsByArrival(data);
  };

  useEffect(() => {
    soldProducts();
    newProducts();
  }, []);
  return (
    <React.Fragment>
      <Menu />
      <Layout
        title="Book Shop"
        description="E-Commerce App for web development courses and books."
        className="container-fluid"
      >
        <Search />
        <div className="row">
          <div className="col-6">
            <h2>Best Sells</h2>
            {productsBySell?.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
          <div className="col-6">
            <h2>New Arrivals</h2>
            {productsByArrival?.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default Home;
