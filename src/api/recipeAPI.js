import axios from "axios";
export const fetchRecipe = async (id) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=f3e2d20fbd7647d8b818eec1bd545c68`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw error;
  }
};
