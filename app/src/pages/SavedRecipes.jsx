import recipes from "../data/recipes";

function SavedRecipes() {
  return (
    <div class="saved-recipes">
      <h1>Saved Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <img src={recipe.imageURL}></img>
            <p>{recipe.name}</p>
            <p class="edit">Edit</p>
            <p class="delete">Delete</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedRecipes;