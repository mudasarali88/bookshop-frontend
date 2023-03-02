import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCategories, productBySearch } from "../core/Api";
import CheckBox from "./CheckBox";
import RadioBtn from "./RadioBtn";
import { pricess } from "./priceRanges";
import ProductCard from "./ProductCard";

function Shop(props) {
  const [categories, setCategories] = useState([]);

  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [loadedResult, setLoadedResult] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(4);
  const [skip, setSkip] = useState(0);

  const handleFilters = (filters, filterBy) => {
    const allFilters = { ...myFilters };
    allFilters.filters[filterBy] = filters;
    loadFilteredData(myFilters.filters);

    setMyFilters(allFilters);
  };
  const loadFilteredData = async (newFilters) => {
    const { data } = await productBySearch(limit, skip, newFilters);

    setLoadedResult(data.data);
  };
  const init = async () => {
    const { data } = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    init();
    loadFilteredData(myFilters.filters);
  }, []);

  return (
    <Layout
      title="Shop Page"
      description="E-Commerce Book Shop, Let's choose courses and books accordingly."
      className="mb-5 container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Select Categories</h4>
          <ul>
            <CheckBox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
          <h4>Select Price Range</h4>
          <ul>
            <RadioBtn
              pricess={pricess}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </ul>
        </div>
        <div className="col-8">
          <h2>Products</h2>
          <div className="row">
            {loadedResult.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Shop;
