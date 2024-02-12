import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { parseHTML } from "../utils/parser";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useState, useEffect } from "react";
import { checkFavouriteStatus, toggleFavourite } from "../api/favouritesAPI";

const RecipeCard = ({ recipe }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const favouriteStatus = await checkFavouriteStatus(recipe.id);
        setIsFavourite(favouriteStatus);
      } catch (error) {
        console.error("Error fetching Favourites:", error);
      }
    };

    fetchFavourites();
  }, [recipe.id]);

  const handleToggleFavourites = async () => {
    try {
      if (isFavourite) {
        await toggleFavourite(recipe.id);
        setIsFavourite(false);
      } else {
        const success = await toggleFavourite(recipe.id);
        setIsFavourite(success);
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
          {isFavourite ? (
            <IoMdHeart
              className="text-gray-500 cursor-pointer"
              onClick={handleToggleFavourites}
            />
          ) : (
            <IoMdHeartEmpty
              className="text-gray-500 cursor-pointer"
              onClick={handleToggleFavourites}
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
