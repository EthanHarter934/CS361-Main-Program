import { Link } from "react-router-dom";

function NavBar() {
    // Display navigation bar
    return (
        <nav class="navbar">
            <ul>
                <li><Link to="/">Recipedia</Link></li>
                <li><Link to="/savedrecipes">Saved Recipes</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;