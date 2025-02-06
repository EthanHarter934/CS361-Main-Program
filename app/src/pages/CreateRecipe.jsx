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

    // When an input field of the create recipe form changes, 
    var handleChange = (e) => {
        setRecipeData({
            ...recipeData,
            [e.target.name]: e.target.value,
        });
    };

    var handleFileChange = (e) => {
        var file = e.target.files[0];

        if (file && file.size > 512 * 1024) {
            alert("File size is too large, please choose a file smaller than 2MB.");
            return;
        }

        if (file) {
          var reader = new FileReader();
          reader.onloadend = () => {
            setRecipeData({
              ...recipeData,
              url: reader.result,
          });
          };
          reader.readAsDataURL(file);
        }
    };

    var handleSave = () => {
        var savedRecipes = JSON.parse(localStorage.getItem("recipes"));
        if (!savedRecipes) {
            savedRecipes = [];
        }

        if (id) {
            var updatedRecipes = savedRecipes.map((recipe) => recipe.id === parseInt(id) ? recipeData : recipe);
            localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
        } else {
            var newRecipe = { ...recipeData, id: Date.now() };
            savedRecipes.push(newRecipe);
            localStorage.setItem("recipes", JSON.stringify(savedRecipes));
        }

        clearForm();
    };

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