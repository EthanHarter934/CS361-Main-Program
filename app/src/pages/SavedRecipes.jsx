import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function SavedRecipes() {
  // Creates a state called recipe, which uses setRecipes to update the state.
  // The state starts with no data (null)
  var [recipes, setRecipes] = useState([]);

  // Creates a state called defaultText, which uses setDefaultText to update the state.
  // The state starts with no data ("")
  var [defaultText, setDefaultText] = useState("");

  // Get data from the local storage
  useEffect(() => {
    // Gets user data from the local storage
    var user = JSON.parse(localStorage.getItem("user"));

    // If the user data exists, then start getting the info for each recipe
    if (user) {
      var recipePromises = user.recipeList.map((recipe) =>
        fetch(`http://localhost:3002/recipe/${recipe}`).then((response) =>
          response.json()
        )
      );

      Promise.all(recipePromises).then((data) => {
        // Once all recipes have been loaded, check if there are no recipes, and if so, add a message to get started
        if (data.length == 0) {
          setDefaultText(
            "Not seeing any recipes, click the create recipe button in the bottom right to get started!"
          );
        }

        // Otherwise save the recipes to the recipes state
        setRecipes(data);
      });
    } else {
      // If user isn't logged in, display the following message
      setDefaultText(
        "Looks like you need to login, click the signup button in the top right!"
      );
    }
  }, []);

  var handleDelete = (id) => {
    // Send an alert when user tries to delete a recipe
    if (
      !window.confirm(
        "Warning! Deleted recipes cannot be recovered! Are you sure you want to continue?"
      )
    ) {
      return;
    }

    // Gets user ID from the local storage
    var userID = JSON.parse(localStorage.getItem("user")).id;

    // Send a request to delete the recipe with the given ID
    // from the user with the ID of the currently logged in user
    fetch("http://localhost:3003/deleteRecipe", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, recipeID: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Once the recipe has been deleted, update the user
        // data in the local storage
        localStorage.setItem("user", JSON.stringify(data));
        window.location.reload();
      });
  };

  // Display each saved recipe
  return (
    <div class="saved-recipes">
      <h1>Saved Recipes</h1>
      <div>
        <h3 class="registeredUser">{defaultText}</h3>
      </div>
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
            <img
              src="trashcan.png"
              class="delete"
              onClick={() => handleDelete(recipe.id)}
            ></img>
          </li>
        ))}
      </ul>
      <Link to="/createrecipe" class="new-recipe">
        <i class="fa-solid fa-plus"></i>
      </Link>
    </div>
  );
}

export default SavedRecipes;
