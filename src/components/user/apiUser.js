import { API } from "../../config";
import { getCurrentUser } from "../helper/helper";

import http from "../../services/httpService";

const user = getCurrentUser();
const token = JSON.parse(localStorage.getItem("jwt"));
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const updateUser = async (userId, body) => {
  try {
    return await http.put(`${API}/user/${userId}`, body, config);
  } catch (error) {
    console.log(error);
  }
};

export const purchaseHistory = async () => {
  try {
    return await http.get(`${API}/orders/history/${user._id}`, config);
  } catch (error) {
    console.log(error);
  }
};
