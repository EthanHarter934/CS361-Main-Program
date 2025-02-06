import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import FirstTimeHelper from './components/FirstTimeHelper';
import Home from "./pages/Home";
import SavedRecipes from "./pages/SavedRecipes";
import CreateRecipe from "./pages/CreateRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import NotFound from "./pages/NotFound";

// Main app, loads different pages as well as the navigation bar
function App() {
    return (
    <Router>
        <NavBar />
        <FirstTimeHelper />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/savedrecipes" element={<SavedRecipes />} />
        <Route path="/createrecipe" element={<CreateRecipe />} />
        <Route path="/createrecipe/:id" element={<CreateRecipe />} />
        <Route path="/recipedetails/:id" element={<RecipeDetails />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
    );
}

export default App;