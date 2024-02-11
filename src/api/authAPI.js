import axios from "axios";
import { authURL } from "../constants/urls";

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${authURL}/login`, formData);
    return response.data;
  } catch (error) {
    throw new Error(`Login error: ${error.message}`);
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${authURL}/register`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Registration error: ${error.message}`);
  }
};
