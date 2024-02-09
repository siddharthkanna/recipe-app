import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/Register";
import HomePage from "./pages/homepage/homepage";
import RecipeDetailPage from "./pages/recipeDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/recipe/:id" element={<RecipeDetailPage />} />
    </Routes>
  );
}

export default App;
