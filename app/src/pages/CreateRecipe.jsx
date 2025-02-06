import { Link } from "react-router-dom";
import { useState, useEffect  } from "react";
import { useParams } from "react-router-dom";

function CreateRecipe() {
    // Get recipe id from the params
    var { id } = useParams();

    // Creates a state called recipeData, which uses setRecipeData to update the state.
    // The state starts with empty values except for id which defaults to the current
    // time so it acts as a unique identifier
    var [recipeData, setRecipeData] = useState({
        id: Date.now(),
        name: "",
        url: "",
        description: "",
        ingredients: "",
        directions: ""
    });

    // Get data from the local storage
    useEffect(() => {
        // Gets already existing recipes and turn the JSON string back into an array
        var savedRecipes = JSON.parse(localStorage.getItem("recipes"));

        // If an id was provided in the params, find the details of the corresponding
        // recipe and fill the create recipe form with it's values
        if (id) {
            var singleRecipe = savedRecipes.find(recipe => recipe.id === parseInt(id));
            if (singleRecipe) {
                setRecipeData(singleRecipe);
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
            alert("File size is too large, please choose a file smaller than 2MB.");
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


    // Saves all the form data to local storage
    var handleSave = () => {
        // Gets already existing recipes and turn the JSON string back into an array
        var savedRecipes = JSON.parse(localStorage.getItem("recipes"));

        // If there aren't any, sets savedRecipes to an empty array
        if (!savedRecipes) {
            savedRecipes = [];
        }

        // If an id has been passed through the params, replace an already existing
        // recipe, otherwise create a new recipe
        if (id) {
            // Loops over each recipe
            var updatedRecipes = savedRecipes.map((recipe) => {
                if (recipe.id === parseInt(id)) {
                    // If the id matches, replace old data with new data
                    return recipeData;
                } else {
                    // If the id doesn't match, keep the old data
                    return recipe;
                }
            });

            // Save the updated recipe
            localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
        } else {
            // Create a new recipe with the already existing data from the input
            // and give it a unique id
            var newRecipe = { ...recipeData, id: Date.now() };

            // Add it to the array of recipes
            savedRecipes.push(newRecipe);

            // Update the local storage
            localStorage.setItem("recipes", JSON.stringify(savedRecipes));
        }

        // Clear all inputs
        clearForm();
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
            <label>Recipe Name:</label> <input type="text" name="name" value={recipeData.name} onChange={handleChange}/>
        </div>
        <div class="create-recipe-field" id="enter-url">
            <label>Preview Image URL:</label> <input type="text" name="url" value={recipeData.url} onChange={handleChange}/> 
            <label>or</label> 
            <input type="file" id="upload-image" accept="image/*" onChange={handleFileChange}/>
        </div>
        <div class="create-recipe-field" id="enter-description">
            <label>Recipe Description:</label> 
            <textarea name="description" value={recipeData.description} onChange={handleChange}></textarea>
        </div>
        <div class="create-recipe-field" id="enter-ingredients">
            <label>Ingredient List:</label> 
            <textarea name="ingredients" value={recipeData.ingredients} onChange={handleChange}></textarea>
        </div>
        <div class="create-recipe-field" id="enter-directions">
            <label>Recipe Directions:</label> 
            <textarea name="directions" value={recipeData.directions} onChange={handleChange}></textarea>
        </div>
        <div class="buttons">
            <Link to="/savedrecipes">
                <button class="button" id="cancel" onClick={clearForm}>Cancel</button>
            </Link>
            <Link to="/savedrecipes">
                <button class="button" id="submit" onClick={handleSave}>Submit</button>
            </Link>
        </div>
      </div>
    );
  }
  
  export default CreateRecipe;