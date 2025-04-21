import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function RecipeDetails() {
  // Get recipe id from the params
  var { id } = useParams();

  // Creates states which all start with empty values except for scalar which defaults to 1
  var [recipe, setRecipe] = useState(null);
  var [ingredients, setIngredients] = useState([]);
  var [summary, setSummary] = useState(null);
  var [scalar, setScalar] = useState(1);
  var [baseIngredients, setBaseIngredients] = useState([]);
  var [baseSummary, setBaseSummary] = useState(null);

  // Checks for valid scalar input
  var handleScalarChange = (e) => {
    var value = e.target.value;

    if (isNaN(value)) {
      value = scalar;
    }

    setScalar(Number(value));
  };

  var handleScalarSubmit = () => {
    // Check that baseIngredients and baseSummary exist
    if (!baseIngredients.length) {
      return;
    }

    if (!baseSummary) {
      return;
    }

    // Send a request to scale the array of ingredients
    // based off the given scalar
    fetch("http://localhost:3004/scale-ingredients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: baseIngredients,
        scalar: scalar,
      }),
    })
      .then((response) => response.json())
      .then((data) => setIngredients(data.scaledIngredients));

    // Send a request to scale the summary based
    // off the given scalar
    fetch("http://localhost:3004/scale-summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        calories: baseSummary.calories,
        protein: baseSummary.protein,
        carbs: baseSummary.carbs,
        fat: baseSummary.fat,
        scalar: scalar,
      }),
    })
      .then((response) => response.json())
      .then((data) => setSummary(data.summary));
  };

  // Get data from recipe and ingredient databases then get the nutritional summary
  useEffect(() => {
    // Send a request to retrieve the recipe with the given ID
    fetch(`http://localhost:3002/recipe/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the recipe state and for each ingredient, send a request to
        // get the ingredient details
        setRecipe(data);
        var ingredientList = data.ingredients.map((ingredient) =>
          fetch(`http://localhost:3001/ingredient/${ingredient}`).then(
            (response) => response.json()
          )
        );

        // Wait for all ingredients to be retrieved
        Promise.all(ingredientList).then((ingredientData) => {
          // Create an array with the ingredient quantity and name combined
          var ingredientInput = [];
          ingredientData.forEach((ingredient) => {
            ingredientInput.push(ingredient.quantity + " " + ingredient.name);
          });
          // Update the ingredients and baseIngredients states
          setIngredients(ingredientInput);
          setBaseIngredients(ingredientInput);

          // Send a request to get the nutritional summary from the array of
          // ingredients and the scalar which defaults to 1
          fetch("http://localhost:3004/summary", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ingredients: ingredientInput,
              scalar: scalar,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              // Update the summary and baseSummary states
              setSummary(data.summary);
              setBaseSummary(data.summary);
            });
        });
      });
  }, [id]);

  // Until a recipe is found, display nothing
  if (!recipe || !summary) {
    return <div></div>;
  }

  // Once a recipe is found, display it's info
  return (
    <div class="recipe-details">
      <h1>{recipe.name}</h1>
      <img src={recipe.url} />
      <p class="recipe-description">{recipe.description}</p>
      <div class="ingredients-nutrition-section">
        <div class="meal-multiplier">
          <h3>Meal Multiplier</h3>
          <input
            type="text"
            id="scalar"
            value={scalar}
            name="scalar"
            onChange={handleScalarChange}
          />
          <button id="scalar-submit" onClick={handleScalarSubmit}>
            Submit
          </button>
        </div>
        <div class="ingredients">
          <h3>Ingredients</h3>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div class="summary">
          <h3>Nutritional Summary</h3>
          <ul>
            <li>Calories: {summary.calories}</li>
            <li>Protein: {summary.protein}</li>
            <li>Carbs: {summary.carbs}</li>
            <li>Fat: {summary.fat}</li>
          </ul>
        </div>
      </div>

      <h3>Directions</h3>
      <p>{recipe.directions}</p>
    </div>
  );
}

export default RecipeDetails;
