import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function RecipeDetails() {
    // Get recipe id from the params
    var { id } = useParams();

    // Creates a state called recipe, which uses setRecipe to update the state.
    // The state starts with no data (null)
    var [recipe, setRecipe] = useState(null);

    var [ingredients, setIngredients] = useState([]);

    var [summary, setSummary] = useState(null);

    var [scalar, setScalar] = useState(1);

    var [baseIngredients, setBaseIngredients] = useState([]);

    var [baseSummary, setBaseSummary] = useState(null);

    var handleScalarChange = (e) => {
        var value = e.target.value;

        if (isNaN(value)) {
            value = scalar;
        }

        setScalar(Number(value));
    };

    var handleScalarSubmit = () => {
        if (!baseIngredients.length) {
            console.error("Error: baseIngredients is missing.");
            return; 
        }
    
        if (!baseSummary) {
            console.error("Error: baseSummary is missing.");
            return;
        }

        console.log(baseSummary)
        console.log(baseIngredients)

        fetch("http://localhost:3004/scale-ingredients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ingredients: baseIngredients,
                scalar: scalar
            })
        })
            .then(response => response.json())
            .then(data => setIngredients(data.scaledIngredients));

        fetch("http://localhost:3004/scale-summary", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                calories: baseSummary.calories,
                protein: baseSummary.protein,
                carbs: baseSummary.carbs,
                fat: baseSummary.fat,
                scalar: scalar
            })
        })
            .then(response => response.json())
            .then(data => setSummary(data.summary));
    };

    // Get data from the local storage
    useEffect(() => {
        fetch(`http://localhost:3002/recipe/${id}`)
            .then(response => response.json())
            .then(data => {
                setRecipe(data);
                var ingredientList = data.ingredients.map(ingredient =>
                    fetch(`http://localhost:3001/ingredient/${ingredient}`)
                    .then(response => response.json())
                );
                
                Promise.all(ingredientList)
                    .then(ingredientData => {
                        var ingredientInput = [];
                        ingredientData.forEach(ingredient => {
                            ingredientInput.push(ingredient.quantity + " " + ingredient.name);
                        });
                        setIngredients(ingredientInput);
                        setBaseIngredients(ingredientInput);

                        fetch("http://localhost:3004/summary", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                ingredients: ingredientInput,
                                scalar: scalar
                            })
                        })
                            .then(response => response.json())
                            .then(data => {
                                setSummary(data.summary);
                                setBaseSummary(data.summary);
                            });
                    })
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
                <input type="text" id="scalar" value={scalar} name="scalar" onChange={handleScalarChange}/>
                <button id="scalar-submit" onClick={handleScalarSubmit}>Submit</button>
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
