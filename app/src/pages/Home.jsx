import { Link } from "react-router-dom";

function Home() {
    // Display home screen
    return (
    <div class="Home">
        <div class="title-button">
        <h1>Recipedia</h1>
        <h3>Create and save your personal recipes!</h3>
        <Link to="/savedrecipes" class="link">Saved Recipes</Link>
        </div>
    </div>
    );
}

export default Home;