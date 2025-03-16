import { Link } from "react-router-dom";
import { useState, useEffect  } from "react";

function Home() {

    var [showLoginButton, setShowLoginButton] = useState(false);

    useEffect(() => {
        var user = localStorage.getItem("user");
    
        if (!user) {
            setShowLoginButton(true);
        }
    }, []);

    // Display home screen
    return (
    <div class="Home">
        <div class="title-button">
        <h1>Recipedia</h1>
        <h3>Create and save your personal recipes!</h3>
        {!showLoginButton && (
            <Link to="/savedrecipes" class="link">Saved Recipes</Link>
        )}
        {showLoginButton && (
            <Link to="/login" class="link">Login/Signup</Link>
        )}
        
        </div>
    </div>
    );
}

export default Home;