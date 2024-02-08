import { Link } from "react-router-dom";
import { parseHTML } from "../utils.js/parser";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useState } from "react";

const RecipeCard = ({ recipe }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-800">
            {recipe.title}
          </h2>
          {isBookmarked ? (
            <FaBookmark
              className="text-gray-500 cursor-pointer"
              onClick={toggleBookmark}
            />
          ) : (
            <FaRegBookmark
              className="text-gray-500 cursor-pointer"
              onClick={toggleBookmark}
            />
          )}
        </div>
        <p className="text-gray-600">{parseHTML(recipe.summary)}</p>
        <Link
          to={`/recipe/${recipe.id}`}
          className="block mt-4 text-center py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md transition duration-300 ease-in-out hover:bg-indigo-800"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
