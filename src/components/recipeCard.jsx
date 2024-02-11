import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { parseHTML } from "../utils/parser";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

const RecipeCard = ({ recipe }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/bookmark/getBookmarks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { bookmarks } = response.data;
        setIsBookmarked(bookmarks.includes(recipe.id));
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, [recipe.id]);

  const toggleBookmark = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3000/bookmark/${recipe.id}`,
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

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeCard;
