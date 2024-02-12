import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchRecipes } from "../api/recipeAPI";
import { HiHome, HiHeart, HiLogout, HiMenu } from "react-icons/hi";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const name = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await searchRecipes(searchQuery);
        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (searchQuery.trim() !== "") {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSelectRecipe = () => {
    setSearchResults([]);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 hidden md:block">
            <Link to="/" className="text-white font-bold text-lg">
              Recipe App
            </Link>
          </div>
          <div className="md:hidden">
            <button
              className="text-white p-2 focus:outline-none"
              onClick={toggleMenu}
            >
              <HiMenu />
            </button>
          </div>
          <div
            className={`${isMenuOpen ? "block" : "hidden"} md:block relative`}
          >
            <div className="ml-4 flex items-center md:ml-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes"
                className="bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              />
              {searchResults.length > 0 && (
                <div className="absolute z-10 mt-48 bg-white border rounded-md shadow-lg w-full max-w-md">
                  {searchResults.map((result) => (
                    <Link
                      key={result.id}
                      to={`/recipe/${result.id}`}
                      onClick={handleSelectRecipe}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      {result.title}
                    </Link>
                  ))}
                </div>
              )}
              {name && <p className="text-white mr-4 hidden md:block">Hi, {name}</p>}
              <Link
                to="/home"
                className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-lg "
              >
                <HiHome />
              </Link>
              <Link
                to="/favoriteRecipes"
                className="text-gray-300 hover:bg-gray-700  px-3 py-2 rounded-md text-lg "
              >
                <HiHeart />
              </Link>
              <Link
                to="/"
                className="text-gray-300 hover:bg-gray-700  px-3 py-2 rounded-md text-lg "
                onClick={handleLogout}
              >
                <HiLogout />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
