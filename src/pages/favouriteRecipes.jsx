import { useState, useEffect } from "react";
import RecipeCard from "../components/recipeCard";
import Navbar from "../components/navbar";
import { fetchRecipe } from "../api/recipeAPI";
import { fetchFavourites } from "../api/favouritesAPI";

const FavoriteRecipesPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLoggedInStatus();
  }, []);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const favouriteIds = await fetchFavourites();
        const recipeDetails = favouriteIds.map(async (id) => {
          try {
            return await fetchRecipe(id);
          } catch (error) {
            console.error(`Error fetching recipe with ID ${id}:`, error);
            return null;
          }
        });
        const recipeData = await Promise.all(recipeDetails);
        setFavoriteRecipes(recipeData.filter((recipe) => recipe !== null));
      } catch (error) {
        console.error("Error fetching favorite recipes:", error);
      }
    };

    if (isLoggedIn) {
      fetchFavoriteRecipes();
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-16">
          Favorite Recipes
        </h1>
        {!isLoggedIn && (
          <div className="text-center text-gray-600">
            User must be logged in to view this page
          </div>
        )}
        {isLoggedIn && favoriteRecipes.length === 0 ? (
          <div className="text-center text-gray-600">No favorite recipes</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {favoriteRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} isBookmarked={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteRecipesPage;
