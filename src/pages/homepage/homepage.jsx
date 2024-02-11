import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import RecipeCard from "../../components/recipeCard";
import "./homepage.css";
import Navbar from "../../components/navbar";
import { fetchRecipes } from "../../api/recipeAPI";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const recipesPerPage = 9;

  useEffect(() => {
    const fetchRecipesData = async () => {
      try {
        const recipesData = await fetchRecipes(currentPage, recipesPerPage);
        setRecipes(recipesData);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipesData();
  }, [currentPage, recipesPerPage]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-16">
          Featured Recipes
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={10}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            previousClassName={"prev"}
            nextClassName={"next"}
            disabledClassName={"disabled"}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
