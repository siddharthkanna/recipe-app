import axios from "axios";
import { favouriteURL } from "../constants/urls";

export const fetchFavourites = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${favouriteURL}/getFavourites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.favourites;
  } catch (error) {
    console.error("Error fetching Favourites:", error);
    throw error;
  }
};

export const toggleFavourite = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${favouriteURL}/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status === 200;
  } catch (error) {
    console.error("Error toggling Favourites:", error.message);
    throw error;
  }
};

export const checkFavouriteStatus = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${favouriteURL}/getFavourites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { favourites } = response.data;
    return favourites.includes(id);
  } catch (error) {
    console.error("Error checking Favourite status:", error);
    throw error;
  }
};
