import React, { Fragment, useState, useEffect } from "react";
import { getCategories } from "../ApiAdmin";
import Input from "../../common/Input";
import TextArea from "../../common/TextArea";
import Select from "../../common/Select";
import { ShowError } from "../../helper/helper";
import { ShowSuccess } from "../../helper/helper";
import { getProduct, updateProduct } from "../ApiAdmin";
import { useParams } from "react-router-dom";

function UpdateProductForm() {
  const { productId } = useParams();

  const [values, setValues] = useState({
    name: "",
    description: "",
    categories: [],
    price: "",
    category: "",
    quantity: "",
    photo: "",
    formData: "",
    loading: false,
    error: false,
    success: false,
  });

  const {
    name,
    description,
    price,
    quantity,
    categories,
    category,
    loading,
    formData,
    success,
    error,
  } = values;

  const init = async () => {
    const { data } = await getCategories();
    const res = await getProduct(productId);
    setValues({
      name: res.data.name,
      description: res.data.description,
      quantity: res.data.quantity,
      price: res.data.price,
      category: res.data.category,
      formData: new FormData(),
      categories: data,
    });
  };

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    init();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(productId, formData);
      setValues({ ...values, success: true, error: "" });
    } catch (ex) {
      setValues({ ...values, error: ex.response.data, success: false });
    }
  };

  return (
    <Fragment>
      <ShowError error={error} />
      <ShowSuccess success={success} successMessage="Product is Updated.." />
      <form onSubmit={handleSubmit} className="mt-2">
        <div>
          <Input
            name="name"
            label="Name"
            value={name}
            onChange={handleChange("name")}
          />
        </div>
        <div>
          <TextArea
            name="description"
            label="Description"
            value={description}
            onChange={handleChange("description")}
          />
        </div>
        <div>
          <Select
            name="category"
            label="Category"
            categories={categories}
            category={category}
            onChange={handleChange("category")}
          />
        </div>
        <div>
          <Input
            name="price"
            label="Price"
            type="number"
            value={price}
            onChange={handleChange("price")}
          />
        </div>
        <div>
          <Input
            name="quantity"
            label="Quantity"
            type="number"
            value={quantity}
            onChange={handleChange("quantity")}
          />
        </div>

        <div className="form-group mt-3">
          <input type="file" name="photo" onChange={handleChange("photo")} />
        </div>

        <button className="btn btn-warning mt-3">Update Product</button>
      </form>
    </Fragment>
  );
}

export default UpdateProductForm;
