import http from "../../services/httpService";
import { API } from "../../config";
import queryString from "query-string";
import { getCurrentUser } from "../helper/helper";

const user = getCurrentUser();
const token = JSON.parse(localStorage.getItem("jwt"));
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const getProducts = async (sortBy) => {
  try {
    return await http.get(
      `${API}/product/?sortBy=${sortBy}&order=desc&limit=8`
    );
  } catch (error) {
    console.log(error);
  }
};

export const getBraintreeToken = async () => {
  return await http.get(`${API}/braintree/getToken/${user._id}`, config);
};

export const processPayment = async (paymentData) => {
  return await http.post(
    `${API}/braintree/payment/${user._id}`,
    paymentData,
    config
  );
};

export const getCategories = async () => {
  try {
    return await http.get(`${API}/category/all`);
  } catch (error) {
    console.log(error);
  }
};

export const productBySearch = async (limit, skip, filters) => {
  const data = { limit, skip, filters };
  try {
    return await http.post(`${API}/product/by/search/`, data);
  } catch (error) {
    console.log(error);
  }
};

export const listSearch = async (params) => {
  const query = queryString.stringify(params);
  try {
    return await http.get(`${API}/product/search?${query}`);
  } catch (error) {
    console.log(error);
  }
};

export const getSingleProduct = async (productId) => {
  try {
    return await http.get(`${API}/product/${productId}`);
  } catch (error) {
    console.log(error);
  }
};

export const getRelatedProducts = async (productId) => {
  try {
    return await http.get(`${API}/product/related/${productId}`);
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (orderData) => {
  return await http.post(`${API}/orders/create/${user._id}`, orderData, config);
};
