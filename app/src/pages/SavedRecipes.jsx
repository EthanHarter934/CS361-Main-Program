import recipes from "../data/recipes";
import { Link } from "react-router-dom";

function SavedRecipes() {
  return (
    <div class="saved-recipes">
      <h1>Saved Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <img src={recipe.imageURL} class="preview-image"></img>
            <p>{recipe.name}</p>
            <img src="edit.png" class="edit"></img>
            <img src="trashcan.png" class="delete"></img>
          </li>
        ))}
      </ul>
      <Link to="/createrecipe" class="new-recipe"><i class="fas fa-plus"></i></Link>
    </div>
  );
}

export default SavedRecipes;