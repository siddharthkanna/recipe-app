import axios from "axios";
import { bookmarkURL } from "../constants/urls";

export const fetchBookmarks = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${bookmarkURL}/getBookmarks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.bookmarks;
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    throw error;
  }
};

export const toggleBookmark = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${bookmarkURL}/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status === 200;
  } catch (error) {
    console.error("Error toggling bookmark:", error.message);
    throw error;
  }
};

export const checkBookmarkStatus = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${bookmarkURL}/getBookmarks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { bookmarks } = response.data;
    return bookmarks.includes(id);
  } catch (error) {
    console.error("Error checking bookmark status:", error);
    throw error;
  }
};
