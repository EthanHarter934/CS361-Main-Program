import { Link } from "react-router-dom";
import { useState, useEffect  } from "react";

function SavedRecipes() {
  var [recipes, setRecipes] = useState([]);

  useEffect(() => {
    var savedRecipes = JSON.parse(localStorage.getItem("recipes"));
    if (savedRecipes) {
      setRecipes(savedRecipes);
    }
  }, []);

  var handleDelete = (id) => {
    var savedRecipes = JSON.parse(localStorage.getItem("recipes"));
    if (savedRecipes) {
      var updatedRecipes = savedRecipes.filter(recipe => recipe.id !== id);
      localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
      setRecipes(updatedRecipes);
    }
  };

  return (
    <div class="saved-recipes">
      <h1>Saved Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/recipedetails/${recipe.id}`} class="saved-recipe-link">
              <img src={recipe.url} class="preview-image"></img>
              <p>{recipe.name}</p>
            </Link>
            <Link to={`/createrecipe/${recipe.id}`} class="edit-recipe-link">
              <img src="edit.png" class="edit"></img>
            </Link>
            <img src="trashcan.png" class="delete" onClick={() => handleDelete(recipe.id)}></img>
          </li>
        ))}
      </ul>
      <Link to="/createrecipe" class="new-recipe"><i class="fas fa-plus"></i></Link>
    </div>
  );
}

export default SavedRecipes;