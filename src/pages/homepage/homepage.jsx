import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import RecipeCard from "../../components/recipeCard";
import Navbar from "../../components/navbar";
import { fetchRecipes } from "../../api/recipeAPI";
import '../homepage/homepage.css';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const recipesPerPage = 9;
  const [mealTypeFilter, setMealTypeFilter] = useState("");

  useEffect(() => {
    const fetchRecipesData = async () => {
      try {
        const recipesData = await fetchRecipes(currentPage, recipesPerPage);
        setRecipes(recipesData);
        setFilteredRecipes(recipesData);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipesData();
  }, [currentPage, recipesPerPage]);

  useEffect(() => {
    filterRecipesByMealType(mealTypeFilter);
  }, [mealTypeFilter, recipes]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  const filterRecipesByMealType = (mealType) => {
    if (mealType === "") {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter((recipe) =>
        recipe.dishTypes.includes(mealType)
      );
      setFilteredRecipes(filtered);
    }
  };

  const handleMealTypeChange = (event) => {
    const type = event.target.value;
    setMealTypeFilter(type);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-16">
          Featured Recipes
        </h1>
        <div className="flex justify-center mb-4">
          <select value={mealTypeFilter} onChange={handleMealTypeChange}>
            <option value="">All</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snacks">Snacks</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <ReactPaginate
            pageCount={10} 
            onPageChange={handlePageClick} 
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
