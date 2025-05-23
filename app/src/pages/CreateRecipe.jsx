import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CreateRecipe() {
  // Get recipe id from the params
  var { id: editRecipeID } = useParams();

  // Initialize page navigation
  var navigate = useNavigate();

  // Creates a state called recipeData, which uses setRecipeData to update the state.
  // The state starts with empty values
  var [recipeData, setRecipeData] = useState({
    id: 0,
    name: "",
    url: "",
    description: "",
    ingredients: [],
    directions: "",
  });

  var [ingredientText, setIngredientText] = useState("");

  // Get data from the local storage
  useEffect(() => {
    // Go back to saved recipes is user isn't logged in
    if (!localStorage.getItem("user")) {
      navigate("/savedrecipes");
    } else {
      // Gets already existing recipes and turn the JSON string back into an array
      var recipeList = JSON.parse(localStorage.getItem("user")).recipeList;

      // If an id was provided in the params, send a request to get the the details of
      // the corresponding recipe and fill the create recipe form with it's values
      if (editRecipeID && recipeList.includes(parseInt(editRecipeID))) {
        if (editRecipeID) {
          // Send a request to get the recipe details
          fetch(`http://localhost:3002/recipe/${editRecipeID}`)
            .then((response) => response.json())
            .then((data) => {
              // Update the recipe state
              setRecipeData(data);

              // For each ingredient ID in the recipe, send a request to get
              // the ingredient details and store it all in an array
              var ingredientList = data.ingredients.map((ingredient) =>
                fetch(`http://localhost:3001/ingredient/${ingredient}`).then(
                  (response) => response.json()
                )
              );

              // Once all ingredients have been retrieved, create a new array with the
              // quantity and names joined, then join the new array into one string
              Promise.all(ingredientList).then((ingredientData) => {
                var ingredientInput = [];
                ingredientData.forEach((ingredient) => {
                  ingredientInput.push(
                    ingredient.quantity + " " + ingredient.name
                  );
                });

                // Update ingredient text state with joined array
                setIngredientText(ingredientInput.join(", "));
              });
            });
        }
      }
    }
  }, []);

  // When an input field of the create recipe form changes, run handleChange
  var handleChange = (e) => {
    setRecipeData({
      // Copy over the existing data in the object
      ...recipeData,

      // Set the value of the field that changed to it's corresponding variable
      // in the object
      [e.target.name]: e.target.value,
    });
  };

  // When a new file is given, run handleFileChange
  var handleFileChange = (e) => {
    // Gets the first file from the file input
    var file = e.target.files[0];

    // Checks if the file is greater than 512 kb and returns an alert if this is true
    if (file && file.size > 512 * 1024) {
      alert(
        "Warning! File size is too large, please choose a file smaller than 2MB!"
      );
      return;
    }

    // If the file exists, create a new FileReader object which gets the contents of the file
    if (file) {
      var reader = new FileReader();

      // Once the file is read, store the file data in the url variable of the object
      reader.onloadend = () => {
        setRecipeData({
          ...recipeData,
          url: reader.result,
        });
      };

      // Turns the image into a url that can be used as a src for an img tag
      reader.readAsDataURL(file);
    }
  };

  var handleIngredientsChange = (e) => {
    setIngredientText(e.target.value);
  };

  // When the form is submitted, split up all the ingredients and send them to be
  // new ingredients in the ingredient database
  var handleIngredientsSubmit = () => {
    // Split ingredients by commas
    var ingredients = ingredientText.split(",");

    // Create an array of ingredient IDs
    var ingredientPromises = ingredients
      .map((ingredient) => {
        // Separate the quantity from the name
        var match = ingredient
          .trim()
          .match(/^(\d+(\.\d+)?\s*[a-zA-Z]+)?\s*(.*)$/);
        if (!match) return null;

        // Default to 1 unit if no quantity is given
        if (!match[1]) {
          match[1] = "1 unit";
        }

        // Set quantity and name
        var quantity = match[1];
        var name = match[3];

        // Send the new ingredient then store the returned ID in the array
        return fetch("http://localhost:3001/newIngredient", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, quantity }),
        })
          .then((response) => response.json())
          .then((data) => data.id);
      })
      .filter((promise) => promise !== null);

    // Return the array of ingredient IDs
    return Promise.all(ingredientPromises);
  };

  // Saves all the form data to local storage
  var handleSave = (e) => {
    e.preventDefault();

    // Get the array of ingredient IDs
    handleIngredientsSubmit().then((ingredientIds) => {
      // Take all the other recipe data and add the new array of ingredient IDs
      var updatedData = {
        ...recipeData,
        ingredients: ingredientIds,
      };

      var err = false;

      // Check to make sure all fields are filled out
      if (
        updatedData.name == "" ||
        updatedData.url == "" ||
        updatedData.description == "" ||
        updatedData.ingredients.length == 0 ||
        updatedData.directions == ""
      ) {
        alert("Warning! Please fill out all sections!");
        err = true;
      }

      if (!err) {
        // If an id has been passed through the params, replace an already existing
        // recipe, otherwise create a new recipe
        if (editRecipeID) {
          // Send a request to update an existing recipe
          fetch("http://localhost:3002/editRecipe", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...updatedData }),
          }).then(() => {
            clearForm();
            navigate("/savedrecipes");
          });
        } else {
          // Send a request to add a new recipe
          fetch("http://localhost:3002/newRecipe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...updatedData }),
          })
            .then((response) => response.json())
            .then((data) => {
              // Get the user ID from the local storage and the recipe ID
              // from the response
              var userID = JSON.parse(localStorage.getItem("user")).id;
              var recipeID = data.id;

              // Send a request to add a new recipe ID to the user's data
              fetch("http://localhost:3003/saveRecipe", {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ userID, recipeID }),
              })
                .then((response) => response.json())
                .then((data) => {
                  // Update the user data in local storage
                  localStorage.setItem("user", JSON.stringify(data));
                  clearForm();
                  navigate("/savedrecipes");
                });
            });
        }
      }
    });
  };

  var handleCancel = () => {
    // Send an alert when user tries to cancel creating or editing a recipe
    if (
      !window.confirm(
        "Warning! Unsaved information will be lost! Are you sure you want to continue?"
      )
    ) {
      return;
    }

    clearForm();
    navigate("/savedrecipes");
  };

  // Clear all inputs
  var clearForm = () => {
    setRecipeData({
      id: "",
      name: "",
      url: "",
      description: "",
      ingredients: "",
      directions: "",
    });
  };

  // Display create recipe form
  return (
    <div class="create-recipe">
      <h3>Create Recipe</h3>
      <div class="create-recipe-field" id="enter-name">
        <label>Recipe Name:</label>{" "}
        <input
          type="text"
          name="name"
          value={recipeData.name}
          onChange={handleChange}
        />
      </div>
      <div class="create-recipe-field" id="enter-url">
        <label>Preview Image URL:</label>{" "}
        <input
          type="text"
          name="url"
          value={recipeData.url}
          onChange={handleChange}
        />
        <label>or</label>
        <input
          type="file"
          id="upload-image"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <div class="create-recipe-field" id="enter-description">
        <label>Recipe Description:</label>
        <textarea
          name="description"
          value={recipeData.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div class="create-recipe-field" id="enter-ingredients">
        <label>Ingredient List:</label>
        <textarea
          name="ingredients"
          value={ingredientText}
          onChange={handleIngredientsChange}
        ></textarea>
      </div>
      <div class="create-recipe-field" id="enter-directions">
        <label>Recipe Directions:</label>
        <textarea
          name="directions"
          value={recipeData.directions}
          onChange={handleChange}
        ></textarea>
      </div>
      <div class="buttons">
        <button class="button" id="cancel" onClick={handleCancel}>
          Cancel
        </button>
        <button class="button" id="submit" onClick={handleSave}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default CreateRecipe;
