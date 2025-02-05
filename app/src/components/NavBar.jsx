import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav class="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/savedrecipes">Saved Recipes</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;