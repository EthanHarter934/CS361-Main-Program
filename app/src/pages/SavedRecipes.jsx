import { data, Link } from "react-router-dom";
import { useState, useEffect  } from "react";

function SavedRecipes() {
    // Creates a state called recipe, which uses setRecipes to update the state.
    // The state starts with no data (null)
    var [recipes, setRecipes] = useState([]);

    // Get data from the local storage
    useEffect(() => {
    // Gets already existing recipes and turn the JSON string back into an array
    var recipeList = JSON.parse(localStorage.getItem("user")).recipeList;
    // If there are existing recipes, then update the state to show those recipes
    if (recipeList) {
        console.log("Recipe IDs:", recipeList);
        var recipePromises = recipeList.map(recipe => 
            fetch(`http://localhost:3002/recipe/${recipe}`).then(response => response.json())
        );

        Promise.all(recipePromises)
            .then(data => setRecipes(data));
    }
    }, []);

    var handleDelete = (id) => {
        // Send an alert when user tries to delete a recipe
        if (!window.confirm("Warning! Deleted recipes cannot be recovered! Are you sure you want to continue?")) {
            return;
        }
        
        // Gets already existing recipes and turn the JSON string back into an array
        var savedRecipes = JSON.parse(localStorage.getItem("recipes"));

        // If there are existing recipes, delete the selected recipe
        if (savedRecipes) {
            // Initializes a new array that filters out the recipe that needs to be
            // deleted using the id to match
            var updatedRecipes = savedRecipes.filter(recipe => recipe.id !== id);

            // Stores the new array of recipes in local storage
            localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

            // Updates the state to match the new array
            setRecipes(updatedRecipes);
        }
    };

    // Display each saved recipe
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
        <Link to="/createrecipe" class="new-recipe"><i class="fa-solid fa-plus"></i></Link>
    </div>
    );
}

export default SavedRecipes;