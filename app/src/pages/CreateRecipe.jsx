import { Link } from "react-router-dom";

function CreateRecipe() {
    return (
      <div class="create-recipe">
        <h3>Create Recipe</h3>
        <div class="create-recipe-field" id="enter-name">
            <label>Recipe Name:</label> <input type="text" />
        </div>
        <div class="create-recipe-field" id="enter-url">
            <label>Preview Image URL:</label> <input type="text" /> <label>or</label> <input type="file" id="imageUpload" accept="image/*" />
        </div>
        <div class="create-recipe-field" id="enter-description">
            <label>Recipe Description:</label> 
            <textarea></textarea>
        </div>
        <div class="create-recipe-field" id="enter-ingredients">
            <label>Ingredient List:</label> <input type="text" />
        </div>
        <div class="create-recipe-field" id="enter-directions">
            <label>Recipe Directions:</label> 
            <textarea></textarea>
        </div>
        <div class="buttons">
            <button class="button" id="cancel">Cancel</button>
            <button class="button" id="submit">Submit</button>
        </div>
      </div>
    );
  }
  
  export default CreateRecipe;