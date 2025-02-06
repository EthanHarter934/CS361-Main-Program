import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function RecipeDetails() {
    // Get recipe id from the params
    var { id } = useParams();

    // Creates a state called recipe, which uses setRecipe to update the state.
    // The state starts with no data (null)
    var [recipe, setRecipe] = useState(null);

    // Get data from the local storage
    useEffect(() => {
    // Save local storage as an array
    var savedRecipes = JSON.parse(localStorage.getItem("recipes"));

    // Find the recipe with a matching id
    var singleRecipe = savedRecipes.find(recipe => recipe.id === parseInt(id));

    // Update the state to contain the single recipe details
    if (singleRecipe) {
        setRecipe(singleRecipe);
    }
    }, [id]);

    // Until a recipe is found, display nothing
    if (!recipe) {
        return <div></div>;
    }

    // Once a recipe is found, display it's info
    return (
    <div class="recipe-details">
        <h1>{recipe.name}</h1>
        <img src={recipe.url} />
        <p>{recipe.description}</p>
        <h3>Ingredients</h3>
        <ul>
        {recipe.ingredients.split(", ").map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
        ))}
        </ul>
        <h3>Directions</h3>
        <p>{recipe.directions}</p>
    </div>
    );
}

export default RecipeDetails;
