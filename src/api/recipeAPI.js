import axios from "axios";
import { apiKey, recipeURL } from "../constants/urls";

export const fetchRecipe = async (id) => {
  try {
    const response = await axios.get(
      `${recipeURL}/${id}/information?apiKey=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw error;
  }
};

export const searchRecipes = async (query) => {
  try {
    const response = await axios.get(
      `${recipeURL}/autocomplete?query=${query}&number=5&apiKey=${apiKey}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching search results: ${error.message}`);
  }
};

export const fetchRecipes = async (currentPage, recipesPerPage) => {
  try {
    const response = await axios.get(
      `${recipeURL}/random?number=${recipesPerPage}&apiKey=${apiKey}&page=${
        currentPage + 1
      }`
    );
    return response.data.recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};
