import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { parseHTML } from "../utils/parser";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import Navbar from "../components/navbar";
import { fetchRecipe } from "../api/recipeAPI";
import axios from "axios";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipeData = await fetchRecipe(id);
        setRecipe(recipeData);
        setIsLoading(false);
        checkBookmarkStatus();
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const checkBookmarkStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/bookmark/getBookmarks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { bookmarks } = response.data;
      setIsBookmarked(bookmarks.includes(id));
    } catch (error) {
      console.error("Error checking bookmark status:", error);
    }
  };

  const toggleBookmark = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3000/bookmark/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);
      } else {
        console.error("Failed to toggle bookmark");
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Loading...</h2>
          <p className="text-gray-500">
            Just a moment, fetching your recipe...
          </p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return <div>Error fetching recipe...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8 relative">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 object-cover object-center"
            />
            <div
              className="absolute top-0 right-0 m-4 cursor-pointer"
              onClick={toggleBookmark}
            >
              {isBookmarked ? (
                <FaBookmark size={24} className="text-white-500" />
              ) : (
                <FaRegBookmark size={24} className="text-white-500" />
              )}
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold text-xl mb-2">{recipe.title}</div>
                <p className="text-gray-700 text-base">
                  {parseHTML(recipe.summary)}
                </p>
              </div>
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Ingredients</div>
            <ul className="list-disc list-inside">
              {recipe.extendedIngredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700 text-base">
                  {ingredient.original}
                </li>
              ))}
            </ul>
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Instructions</div>
            <p className="text-gray-700 text-base whitespace-pre-line">
              {recipe.instructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
