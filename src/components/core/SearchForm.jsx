import React, { useState, useEffect } from "react";
import { getCategories, listSearch } from "./Api";
import ProductCard from "./ProductCard";

function SearchForm(props) {
  const [myData, setMyData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });
  const { categories, category, results, search, searched } = myData;

  const searchData = async () => {
    if (search) {
      const { data } = await listSearch({
        search: search || undefined,
        category: category,
      });
      setMyData({ ...myData, results: data });
    }
  };

  const init = async () => {
    const { data } = await getCategories();
    setMyData({ categories: data });
  };
  useEffect(() => {
    init();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    searchData();
  };
  const handleChange = (name) => (e) => {
    setMyData({ ...myData, [name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <span className="input-group-text">
          {/* <div className="input-group input-group-lg"> */}
          <div className="input-group-prepend">
            <select
              onChange={handleChange("category")}
              className="btn btn-secondary"
              style={{ border: "none" }}
            >
              <option value="all">Select Category</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="search"
            className="form-control"
            placeholder="Search By Name"
            onChange={handleChange("search")}
          />
          <div className="btn input-group-append" style={{ border: "none" }}>
            <button className="input-group-text">Search</button>
          </div>
        </span>
      </form>
      {results && (
        <div className="mb-3 mt-3">
          {results.length !== 0 ? (
            <h2>Searched Results</h2>
          ) : (
            <h3>No Results Found</h3>
          )}
          {results?.map((r, i) => (
            <ProductCard key={i} product={r} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchForm;
