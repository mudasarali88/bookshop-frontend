import http from "../../services/httpService";
import { API } from "../../config";
import { getCurrentUser } from "../helper/helper";

const user = getCurrentUser();
const token = JSON.parse(localStorage.getItem("jwt"));
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const getCategories = async () => {
  try {
    return await http.get(`${API}/category/all`);
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (data) => {
  await http.post(`${API}/product/create/${user._id}`, data, config);
};

export const getProduct = async (productId) => {
  try {
    return await http.get(`${API}/product/${productId}`);
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    return await http.get(`${API}/product/?limit=''`);
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (productId, data) => {
  await http.put(
    `${API}/product/update/${productId}/${user._id}`,
    data,
    config
  );
};

export const deleteProduct = async (productId) => {
  try {
    return await http.delete(
      `${API}/product/delete/${productId}/${user._id}`,
      config
    );
  } catch (ex) {
    if (ex) {
      console.log(ex.response);
    }
  }
};

export const listOrders = async () => {
  return await http.get(`${API}/orders/list/${user._id}`, config);
};

export const getStatusValues = async () => {
  return await http.get(`${API}/orders/status-values/${user._id}`, config);
};

export const updateStatusValues = async (orderId, body) => {
  return await http.put(
    `${API}/orders/status-update/${orderId}/${user._id}`,
    body,
    config
  );
};
