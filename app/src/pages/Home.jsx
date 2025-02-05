import { Link } from "react-router-dom";

function Home() {
  return (
    <div class="Home">
      <div class="title-button">
        <h1>Website Title</h1>
        <button><Link to="/savedrecipes" class="link">Saved Recipes</Link></button>
      </div>
    </div>
  );
}

export default Home;