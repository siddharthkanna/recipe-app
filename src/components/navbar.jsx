import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const name = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/autocomplete?query=${searchQuery}&number=5&apiKey=f3e2d20fbd7647d8b818eec1bd545c68`
        );
        setSearchResults(response.data);
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      const encodedQuery = encodeURIComponent(searchQuery);
      navigate(`/search?q=${encodedQuery}`);
    }
  };

  const handleSelectRecipe = () => {
    setSearchResults([]);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-white font-bold text-lg">
              Recipe App
            </Link>
          </div>
          <div className="hidden md:block relative">
            <div className="ml-4 flex items-center md:ml-6">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search recipes"
                  className="bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                />
              </form>
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
              {name && <p className="text-white mr-4">Hi, {name}</p>}
              <Link
                to="/home"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/favoriteRecipes"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Your Favourites
              </Link>
              <Link
                to="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
