import { useNavigate } from "react-router-dom";
import { useState, useEffect  } from "react";
import { useParams } from "react-router-dom";

function CreateRecipe() {
    // Get recipe id from the params
    var { id } = useParams();

    // Initialize page navigation
    var navigate = useNavigate();

    // Creates a state called recipeData, which uses setRecipeData to update the state.
    // The state starts with empty values except for id which defaults to the current
    // time so it acts as a unique identifier
    var [recipeData, setRecipeData] = useState({
        id: Date.now(),
        name: "",
        url: "",
        description: "",
        ingredients: [],
        directions: ""
    });

    // Get data from the local storage
    useEffect(() => {
        // Gets already existing recipes and turn the JSON string back into an array
        var recipeList = JSON.parse(localStorage.getItem("user")).recipeList;

        // If an id was provided in the params, find the details of the corresponding
        // recipe and fill the create recipe form with it's values
        if (id && recipeList.includes(parseInt(id))) {
            if (id) {
                fetch(`http://localhost:3002/recipe/${id}`)
                    .then(response => response.json())
                    .then(data => setRecipeData(data))
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
            alert("Warning! File size is too large, please choose a file smaller than 2MB!");
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
        var err = false;

        // Gets already existing recipes and turn the JSON string back into an array
        var recipeList = JSON.parse(localStorage.getItem("user")).recipeList;

        // If an id has been passed through the params, replace an already existing
        // recipe, otherwise create a new recipe
        if (id) {
            if (recipeData.name == "" || recipeData.url == "" || recipeData.description == "" || recipeData.ingredients.length === 0 || recipeData.directions == "") {
                alert("Warning! Please fill out all sections!");
                err = true;
            }

            if (!err) {
                // Save the updated recipe
                var userID = JSON.parse(localStorage.getItem("user")).id;

                fetch("http://localhost:3002/saveRecipe", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ userID, id })
                })
                    .then(response => response.json())
                    .then(data => localStorage.setItem("user", JSON.stringify(data)));
            }
        } else {
            if (recipeData.name == "" || recipeData.url == "" || recipeData.description == "" || recipeData.ingredients.length === 0 || recipeData.directions == "") {
                alert("Warning! Please fill out all sections!");
                err = true;
            }

            if (!err) {
                fetch("http://localhost:3002/saveRecipe", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ recipeData })
                })
                    .then(response => response.json())
                    .then(data => {
                        var userID = JSON.parse(localStorage.getItem("user")).id;
                        var id = data.id;

                        fetch("http://localhost:3002/saveRecipe", {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ userID, id })
                        })
                            .then(response => response.json())
                            .then(data => localStorage.setItem("user", JSON.stringify(data)));
                    });
            }
        }

        if (!err) {
            // Clear all inputs
            clearForm();

            // Navigate back to saved recipes
            navigate("/savedrecipes");
        }
    };

    var handleCancel = () => {
        // Send an alert when user tries to cancel creating or editing a recipe
        if (!window.confirm("Warning! Unsaved information will be lost! Are you sure you want to continue?")) {
            return;
        }
        
        clearForm();
        navigate("/savedrecipes")
    }

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
            <button class="button" id="cancel" onClick={handleCancel}>Cancel</button>
            <button class="button" id="submit" onClick={handleSave}>Submit</button>
        </div>
      </div>
    );
  }
  
  export default CreateRecipe;